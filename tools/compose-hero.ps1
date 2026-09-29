param(
  [string]$ShotFile = "screenshots-raw\IMG_4629.png",
  [string]$Out = "appstore-screenshots\hero-01-1320x2868.png"
)

Add-Type -AssemblyName System.Drawing

function Get-RoundedPath($x, $y, $w, $h, $r) {
  $p = New-Object System.Drawing.Drawing2D.GraphicsPath
  $d = $r * 2
  $p.AddArc($x, $y, $d, $d, 180, 90)
  $p.AddArc($x + $w - $d, $y, $d, $d, 270, 90)
  $p.AddArc($x + $w - $d, $y + $h - $d, $d, $d, 0, 90)
  $p.AddArc($x, $y + $h - $d, $d, $d, 90, 90)
  $p.CloseFigure()
  return $p
}

function Measure-FitFont($g, $lines, $fam, $style, $startSize, $maxWidth) {
  $size = $startSize
  while ($size -gt 40) {
    $f = New-Object System.Drawing.Font($fam, $size, $style)
    $ok = $true
    foreach ($ln in $lines) { if (($g.MeasureString($ln, $f)).Width -gt $maxWidth) { $ok = $false } }
    if ($ok) { return $f }
    $f.Dispose()
    $size -= 4
  }
  return (New-Object System.Drawing.Font($fam, 40, $style))
}

$W = 1320; $H = 2868
$bmp = New-Object System.Drawing.Bitmap($W, $H)
$g = [System.Drawing.Graphics]::FromImage($bmp)
$g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
$g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
$g.TextRenderingHint = [System.Drawing.Text.TextRenderingHint]::AntiAliasGridFit
$sfCenter = New-Object System.Drawing.StringFormat
$sfCenter.Alignment = [System.Drawing.StringAlignment]::Center
$sfCenter.LineAlignment = [System.Drawing.StringAlignment]::Center

# --- background: deep navy gradient ---
$bgRect = New-Object System.Drawing.Rectangle(0, 0, $W, $H)
$bgBrush = New-Object System.Drawing.Drawing2D.LinearGradientBrush(
  (New-Object System.Drawing.Point(0, 0)),
  (New-Object System.Drawing.Point(0, $H)),
  ([System.Drawing.Color]::FromArgb(11, 21, 51)),
  ([System.Drawing.Color]::FromArgb(5, 11, 30)))
$g.FillRectangle($bgBrush, $bgRect)

# --- cyan glow behind headline/phone ---
$glowPath = New-Object System.Drawing.Drawing2D.GraphicsPath
$glowPath.AddEllipse(110, 180, 1100, 900)
$glowBrush = New-Object System.Drawing.Drawing2D.PathGradientBrush($glowPath)
$glowBrush.CenterColor = [System.Drawing.Color]::FromArgb(64, 34, 211, 238)
$glowBrush.SurroundColors = @([System.Drawing.Color]::FromArgb(0, 34, 211, 238))
$g.FillPath($glowBrush, $glowPath)
$glowPath.Dispose(); $glowBrush.Dispose()

# --- faint wave lines ---
$wavePen = New-Object System.Drawing.Pen([System.Drawing.Color]::FromArgb(22, 255, 255, 255), 5)
foreach ($base in @(420, 560, 700)) {
  $pts = New-Object System.Collections.Generic.List[System.Drawing.PointF]
  for ($x = -40; $x -le $W + 40; $x += 16) {
    $y = $base + 46 * [Math]::Sin(($x / $W) * 6.28 * 1.6 + $base)
    $pts.Add((New-Object System.Drawing.PointF($x, $y)))
  }
  $g.DrawCurve($wavePen, $pts.ToArray())
}
$wavePen.Dispose()

# --- headline ---
$lines = @("Remove Water from", "your AirPods and iPhone")
$hf = Measure-FitFont $g $lines "Segoe UI" ([System.Drawing.FontStyle]::Bold) 122 1180
$lh = $hf.Height * 1.14
$hy = 176
$white = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::White)
$cyanB = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(34, 211, 238))
$g.DrawString($lines[0], $hf, $white, (New-Object System.Drawing.RectangleF(0, $hy, $W, $lh)), $sfCenter)
$g.DrawString($lines[1], $hf, $cyanB, (New-Object System.Drawing.RectangleF(0, ($hy + $lh), $W, $lh)), $sfCenter)

# --- phone (pro frame) ---
$shotImg = [System.Drawing.Image]::FromFile((Join-Path (Get-Location) $ShotFile))
$phoneW = 920; $edge = 10; $bezel = 16
$screenW = $phoneW - ($edge + $bezel) * 2
$screenH = [int]($screenW * $shotImg.Height / $shotImg.Width)
$phoneH = $screenH + ($edge + $bezel) * 2
$phoneX = ($W - $phoneW) / 2
$phoneY = 740

# floor shadow
$g.FillEllipse((New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(60, 0, 0, 0))), ($phoneX + 60), ($phoneY + $phoneH - 40), ($phoneW - 120), 110)

# titanium edge
$edgePath = Get-RoundedPath $phoneX $phoneY $phoneW $phoneH 170
$edgeBrush = New-Object System.Drawing.Drawing2D.LinearGradientBrush(
  (New-Object System.Drawing.Point($phoneX, 0)),
  (New-Object System.Drawing.Point(($phoneX + $phoneW), 0)),
  ([System.Drawing.Color]::FromArgb(62, 72, 96)),
  ([System.Drawing.Color]::FromArgb(20, 27, 48)))
$g.FillPath($edgeBrush, $edgePath)

# black bezel
$bezPath = Get-RoundedPath ($phoneX + $edge) ($phoneY + $edge) ($phoneW - 2 * $edge) ($phoneH - 2 * $edge) 160
$g.FillPath((New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(4, 6, 12))), $bezPath)

# screen (clipped rounded)
$sx = $phoneX + $edge + $bezel; $sy = $phoneY + $edge + $bezel
$scrPath = Get-RoundedPath $sx $sy $screenW $screenH 145
$oldClip = $g.Clip
$g.SetClip($scrPath)
$g.DrawImage($shotImg, $sx, $sy, $screenW, $screenH)

# glass gloss: soft diagonal sheen
$glossPts = @(
  (New-Object System.Drawing.PointF(($sx - 120), $sy)),
  (New-Object System.Drawing.PointF(($sx + 400), $sy)),
  (New-Object System.Drawing.PointF(($sx + 40), ($sy + $screenH))),
  (New-Object System.Drawing.PointF(($sx - 320), ($sy + $screenH))))
$g.FillPolygon((New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(10, 255, 255, 255))), $glossPts)
$g.Clip = $oldClip
$g.DrawPath((New-Object System.Drawing.Pen([System.Drawing.Color]::FromArgb(30, 255, 255, 255), 2)), $scrPath)

# dynamic island (small, plain black)
$isW = 300; $isH = 66
$isX = $sx + ($screenW - $isW) / 2; $isY = $sy + 30
$island = Get-RoundedPath $isX $isY $isW $isH ($isH / 2)
$g.FillPath((New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(2, 3, 6))), $island)
$island.Dispose()

# side buttons
$btnB = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(35, 45, 71))
$g.FillRectangle($btnB, ($phoneX - 9), ($phoneY + 330), 9, 64)
$g.FillRectangle($btnB, ($phoneX - 9), ($phoneY + 430), 9, 120)
$g.FillRectangle($btnB, ($phoneX - 9), ($phoneY + 565), 9, 120)
$g.FillRectangle($btnB, ($phoneX + $phoneW), ($phoneY + 450), 9, 185)
$shotImg.Dispose()

# --- airpods with ejecting water, flanking the phone ---
function Draw-AirPod($cx, $cy, $which) {
  [int]$cx = $cx; [int]$cy = $cy
  # soft top-to-bottom shading like real glossy buds
  $shade = New-Object System.Drawing.Drawing2D.LinearGradientBrush(
    (New-Object System.Drawing.Point($cx, ($cy - 200))),
    (New-Object System.Drawing.Point($cx, ($cy + 260))),
    ([System.Drawing.Color]::FromArgb(255, 255, 255)),
    ([System.Drawing.Color]::FromArgb(208, 217, 229)))
  $edgeP = New-Object System.Drawing.Pen([System.Drawing.Color]::FromArgb(175, 186, 203), 3)
  # stem
  $stem = Get-RoundedPath ($cx - 32) ($cy - 10) 64 270 30
  $g.FillPath($shade, $stem)
  $g.DrawPath($edgeP, $stem)
  $stem.Dispose()
  # force sensor indent on stem
  $g.FillRectangle((New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(225, 231, 240))), ($cx - 20), ($cy + 60), 40, 74)
  # charging contacts
  $g.FillEllipse((New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(150, 160, 178))), ($cx - 20), ($cy + 232), 15, 15)
  $g.FillEllipse((New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(150, 160, 178))), ($cx + 5), ($cy + 232), 15, 15)
  # head (pebble)
  $g.FillEllipse($shade, ($cx - 85), ($cy - 200), 170, 195)
  $g.DrawEllipse($edgeP, ($cx - 85), ($cy - 200), 170, 195)
  # silicone eartip on the phone-facing side
  if ($which -eq "R") { [int]$tipX = $cx - 85 } else { [int]$tipX = $cx - 19 }
  $g.FillEllipse((New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(52, 60, 76))), $tipX, ($cy - 142), 104, 132)
  $g.FillEllipse((New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(16, 20, 30))), ($tipX + 32), ($cy - 106), 40, 62)
  # speaker mesh dots on the outer face
  if ($which -eq "R") { [int]$mx = $cx + 52 } else { [int]$mx = $cx - 58 }
  foreach ($my in @(($cy - 120), ($cy - 96), ($cy - 72))) {
    $g.FillEllipse((New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(110, 120, 138))), $mx, $my, 9, 9)
  }
  # glossy highlight arc
  $hiP = New-Object System.Drawing.Pen([System.Drawing.Color]::FromArgb(120, 255, 255, 255), 6)
  $g.DrawArc($hiP, ($cx - 85), ($cy - 200), 170, 195, 200, 70)
  $hiP.Dispose()
  $shade.Dispose(); $edgeP.Dispose()
}

function Draw-Spray($sx0, $sy0, $which) {
  if ($which -eq "L") { $sgn = -1 } else { $sgn = 1 }
  $pts = @(
    @(0, 0, 34), @(44, -52, 27), @(92, -108, 21), @(132, -168, 15), @(66, 36, 22), @(112, 8, 15)
  )
  foreach ($pt in $pts) {
    [int]$ox = $pt[0]; [int]$oy = $pt[1]; [int]$ds = $pt[2]
    [int]$dx = [int]$sx0 + ($sgn * $ox); [int]$dy = [int]$sy0 + $oy
    [int]$a = 230 - $ox
    if ($a -lt 90) { $a = 90 }
    $dropB = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb($a, 103, 232, 249))
    $g.FillEllipse($dropB, ($dx - $ds / 2), ($dy - $ds), $ds, ($ds * 1.25))
    $dropB.Dispose()
    $hiB = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb($a, 255, 255, 255))
    $g.FillEllipse($hiB, ($dx - $ds / 2 + $ds * 0.22), ($dy - $ds + $ds * 0.2), ($ds * 0.28), ($ds * 0.28))
    $hiB.Dispose()
  }
  $arcP = New-Object System.Drawing.Pen([System.Drawing.Color]::FromArgb(110, 103, 232, 249), 5)
  if ($sgn -lt 0) {
    $g.DrawArc($arcP, ([int]$sx0 - 140), ([int]$sy0 - 170), 150, 150, 300, 120)
    $g.DrawArc($arcP, ([int]$sx0 - 100), ([int]$sy0 - 70), 100, 100, 300, 120)
  } else {
    $g.DrawArc($arcP, ([int]$sx0 - 20), ([int]$sy0 - 170), 150, 150, 240, 120)
    $g.DrawArc($arcP, ([int]$sx0 + 0), ([int]$sy0 - 70), 100, 100, 240, 120)
  }
  $arcP.Dispose()
}

function Draw-BudGlow($gx, $gy) {
  $gp = New-Object System.Drawing.Drawing2D.GraphicsPath
  $gp.AddEllipse($gx, $gy, 300, 420)
  $gb = New-Object System.Drawing.Drawing2D.PathGradientBrush($gp)
  $gb.CenterColor = [System.Drawing.Color]::FromArgb(44, 34, 211, 238)
  $gb.SurroundColors = @([System.Drawing.Color]::FromArgb(0, 34, 211, 238))
  $g.FillPath($gb, $gp)
  $gp.Dispose(); $gb.Dispose()
}

Draw-BudGlow -20 1010
Draw-BudGlow 1040 1010
Draw-AirPod 122 1250 "L"
Draw-AirPod 1198 1250 "R"
Draw-Spray 150 1080 "L"
Draw-Spray 1170 1080 "R"

$outFull = Join-Path (Get-Location) $Out
New-Item -ItemType Directory -Force -Path (Split-Path $outFull) | Out-Null
$bmp.Save($outFull, [System.Drawing.Imaging.ImageFormat]::Png)
$g.Dispose(); $bmp.Dispose()
Write-Output ("saved " + $outFull)
