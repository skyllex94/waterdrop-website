"use client";

import { useEffect, useRef, useState } from "react";
import { APP_STORE_URL } from "@/lib/site";

type Device = "iphone" | "airpods" | "ipad" | "samsung" | "android";
type Issue = "heavy" | "light" | "muffled";
type Intensity = "gentle" | "standard" | "deep";

const DEVICES: { id: Device; emoji: string; label: string; hint: string }[] = [
  { id: "iphone", emoji: "📱", label: "iPhone", hint: "Main + earpiece speakers" },
  { id: "airpods", emoji: "🎧", label: "AirPods", hint: "Pro, 3rd/4th gen, Max" },
  { id: "ipad", emoji: "🖥️", label: "iPad", hint: "Larger speaker chambers" },
  { id: "samsung", emoji: "🤖", label: "Samsung", hint: "Galaxy stereo speakers" },
  { id: "android", emoji: "📲", label: "Other Android", hint: "Pixel, OnePlus, Xiaomi…" },
];

const ISSUES: { id: Issue; emoji: string; label: string; hint: string }[] = [
  { id: "heavy", emoji: "🌊", label: "Heavy water exposure", hint: "Washer, pool, dunked, toilet" },
  { id: "light", emoji: "💧", label: "Light water exposure", hint: "Rain, sweat, splash, steam" },
  { id: "muffled", emoji: "🔊", label: "Muffled sound", hint: "Dull audio, cause unknown" },
];

type Texture = "glide" | "pulse" | "rumble";

type Program = {
  /** Frequency waypoints: the tone glides gradually through each in turn (~20s each). */
  stages: number[];
  stageMs: number;
  /** Gentle amplitude swell rate. Slow on purpose — no harsh chopping. */
  amHz: number;
  gain: number;
  seconds: number;
  summary: string;
  texture: Texture;
  rests?: boolean;
};

/**
 * Slow, gradual multi-stage sweeps through the proven 150–500Hz band.
 * Heavy programs glide deep with rest breaks; light ones glide gently;
 * muffled ones roam wider to catch residue anywhere in the mesh.
 */
function programFor(device: Device, issue: Issue): Program {
  if (device === "airpods") {
    if (issue === "heavy")
      return { stages: [200, 300, 350, 250], stageMs: 20000, amHz: 3, gain: 0.6, seconds: 90, summary: "Intensive clean · 90 seconds", texture: "pulse", rests: true };
    if (issue === "light")
      return { stages: [220, 330, 260], stageMs: 20000, amHz: 0, gain: 0.55, seconds: 45, summary: "Gentle clean · 45 seconds", texture: "glide" };
    return { stages: [180, 260, 300, 220], stageMs: 20000, amHz: 3, gain: 0.55, seconds: 60, summary: "Deep clean · 60 seconds", texture: "pulse", rests: true };
  }
  if (device === "ipad") {
    if (issue === "heavy")
      return { stages: [140, 190, 160], stageMs: 20000, amHz: 3, gain: 0.9, seconds: 75, summary: "Intensive clean · 75 seconds", texture: "rumble", rests: true };
    if (issue === "light")
      return { stages: [165, 300], stageMs: 20000, amHz: 0, gain: 0.85, seconds: 45, summary: "Quick clean · 45 seconds", texture: "glide" };
    return { stages: [150, 350, 500, 250], stageMs: 20000, amHz: 0, gain: 0.85, seconds: 60, summary: "Deep clean · 60 seconds", texture: "glide" };
  }
  // iPhone, Samsung, other Android: full-size phone speakers.
  // Samsung-class drivers skew higher, so their waypoints sit higher.
  const heavyStages = device === "iphone" ? [150, 200, 165] : [170, 220, 190];
  if (issue === "heavy")
    return { stages: heavyStages, stageMs: 20000, amHz: 4, gain: 0.9, seconds: 60, summary: "Intensive clean · 60 seconds", texture: "rumble", rests: true };
  if (issue === "light")
    return { stages: [165, 300], stageMs: 20000, amHz: 0, gain: 0.8, seconds: 40, summary: "Quick clean · 40 seconds", texture: "glide" };
  return { stages: [150, 300, 500, 250], stageMs: 20000, amHz: 0, gain: 0.85, seconds: 60, summary: "Deep clean · 60 seconds", texture: "glide" };
}

const INTENSITY_GAIN: Record<Intensity, number> = { gentle: 0.6, standard: 0.85, deep: 1 };
const INTENSITY_LABEL: Record<Intensity, string> = {
  gentle: "Gentle — quiet room, sensitive ears",
  standard: "Standard — the right default for most",
  deep: "Deep — stubborn water, max safe push",
};

/**
 * Guided water-removal wizard: pick device → pick issue → run a slow,
 * gradual multi-stage sweep with rest breaks → verify the result.
 * All audio is synthesized live with WebAudio. Nothing uploaded.
 */
export default function WaterRemovalWizard({ initialDevice = null }: { initialDevice?: Device | null } = {}) {
  const [step, setStep] = useState(initialDevice ? 1 : 0);
  const [device, setDevice] = useState<Device | null>(initialDevice);
  const [issue, setIssue] = useState<Issue | null>(null);
  const [intensity, setIntensity] = useState<Intensity>("standard");
  const [running, setRunning] = useState(false);
  const [resting, setResting] = useState(false);
  const [left, setLeft] = useState(0);
  const [total, setTotal] = useState(0);
  const [done, setDone] = useState(false);
  const [unsupported, setUnsupported] = useState(false);

  const ctxRef = useRef<AudioContext | null>(null);
  const nodesRef = useRef<{ stop: () => void } | null>(null);
  const flipRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const gapRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const cleanupAudio = () => {
    if (flipRef.current) {
      clearInterval(flipRef.current);
      flipRef.current = null;
    }
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    if (gapRef.current) {
      clearInterval(gapRef.current);
      gapRef.current = null;
    }
    try {
      nodesRef.current?.stop();
    } catch {
      /* already stopped */
    }
    nodesRef.current = null;
    if (ctxRef.current) {
      ctxRef.current.close().catch(() => {});
      ctxRef.current = null;
    }
  };

  const stop = () => {
    cleanupAudio();
    setRunning(false);
    setResting(false);
  };

  useEffect(() => {
    return () => cleanupAudio();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const program = device && issue ? programFor(device, issue) : null;

  const startRun = async () => {
    if (!program) return;
    stop();
    setDone(false);
    try {
      const AC =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AC) {
        setUnsupported(true);
        return;
      }
      const ctx = new AC();
      await ctx.resume();
      ctxRef.current = ctx;

      const targetGain = Math.min(1, program.gain * INTENSITY_GAIN[intensity]);
      const master = ctx.createGain();
      master.gain.setValueAtTime(0.0001, ctx.currentTime);
      master.gain.exponentialRampToValueAtTime(Math.max(0.05, targetGain), ctx.currentTime + 2);
      master.connect(ctx.destination);

      const oscs: OscillatorNode[] = [];
      const play = (o: OscillatorNode) => {
        oscs.push(o);
        try {
          o.start();
        } catch {
          /* noop */
        }
        return o;
      };

      // Gentle amplitude swell (slow breathing, never choppy)
      let amDepth: GainNode | null = null;
      if (program.amHz > 0) {
        const lfo = ctx.createOscillator();
        lfo.type = "sine";
        lfo.frequency.value = program.amHz;
        amDepth = ctx.createGain();
        amDepth.gain.value = targetGain * 0.3;
        lfo.connect(amDepth);
        amDepth.connect(master.gain);
        play(lfo);
      }

      // Slow glide through each stage (~20s per leg, smooth ramps)
      const glideTo = (f: number, oscsToMove: OscillatorNode[], ratio = 1) => {
        try {
          oscsToMove.forEach((o) =>
            o.frequency.setTargetAtTime(f * ratio, ctx.currentTime, 4)
          );
        } catch {
          /* noop */
        }
      };

      if (program.texture === "rumble") {
        // Warm beating pair that glides together through the stages
        const o1 = ctx.createOscillator();
        o1.type = "sine";
        o1.frequency.value = program.stages[0];
        const o2 = ctx.createOscillator();
        o2.type = "sine";
        o2.frequency.value = program.stages[0] * 1.02;
        o1.connect(master);
        o2.connect(master);
        play(o1);
        play(o2);
        let stageIdx = 0;
        flipRef.current = setInterval(() => {
          stageIdx += 1;
          const f = program.stages[stageIdx % program.stages.length];
          glideTo(f, [o1]);
          glideTo(f, [o2], 1.02);
        }, program.stageMs);
      } else {
        const osc = ctx.createOscillator();
        osc.type = "sine";
        osc.frequency.value = program.stages[0];
        osc.connect(master);
        play(osc);
        let stageIdx = 0;
        flipRef.current = setInterval(() => {
          stageIdx += 1;
          glideTo(program.stages[stageIdx % program.stages.length], [osc]);
        }, program.stageMs);
      }

      if (program.rests) {
        // Rest breaks: pump a while, then settle so water migrates out
        let gapStep = 0;
        gapRef.current = setInterval(() => {
          gapStep += 1;
          try {
            if (gapStep % 6 === 5) {
              master.gain.setTargetAtTime(0.0001, ctx.currentTime, 0.5);
              if (amDepth) amDepth.gain.setTargetAtTime(0.0001, ctx.currentTime, 0.5);
              setResting(true);
            } else if (gapStep % 6 === 0) {
              master.gain.setTargetAtTime(targetGain, ctx.currentTime, 1);
              if (amDepth) amDepth.gain.setTargetAtTime(targetGain * 0.3, ctx.currentTime, 1);
              setResting(false);
            }
          } catch {
            /* noop */
          }
        }, 2000);
      }

      nodesRef.current = {
        stop: () => {
          try {
            master.gain.cancelScheduledValues(ctx.currentTime);
            master.gain.setTargetAtTime(0.0001, ctx.currentTime, 0.15);
            oscs.forEach((o) => {
              try {
                o.stop(ctx.currentTime + 0.6);
              } catch {
                /* noop */
              }
            });
          } catch {
            /* noop */
          }
        },
      };

      setTotal(program.seconds);
      setLeft(program.seconds);
      setRunning(true);
      timerRef.current = setInterval(() => {
        setLeft((s) => {
          if (s <= 1) {
            window.setTimeout(() => {
              stop();
              setDone(true);
            }, 150);
            return 0;
          }
          return s - 1;
        });
      }, 1000);
    } catch {
      setUnsupported(true);
    }
  };

  const reset = () => {
    stop();
    setDone(false);
    setLeft(0);
    setStep(0);
    setDevice(null);
    setIssue(null);
  };

  const deviceLabel = DEVICES.find((d) => d.id === device)?.label ?? "";
  const issueLabel = ISSUES.find((i) => i.id === issue)?.label ?? "";
  const pct = total > 0 ? ((total - left) / total) * 100 : 0;
  const progress = Math.min(100, ((step + 1) / 3) * 100);

  const optionCls = (selected: boolean) =>
    `flex items-center gap-3.5 rounded-2xl border p-4 text-left transition ${
      selected
        ? "border-cyan-400/60 bg-cyan-400/10"
        : "border-white/10 bg-white/[0.02] hover:border-cyan-400/40 hover:bg-white/[0.04]"
    }`;

  return (
    <div className="overflow-hidden rounded-[1.75rem] border border-white/10 bg-[#0A1430]">
      {/* progress */}
      <div className="border-b border-white/[0.07] bg-white/[0.02] px-6 py-4 sm:px-8">
        <div className="h-1.5 overflow-hidden rounded-full bg-white/10">
          <div
            className="h-full rounded-full bg-gradient-to-r from-cyan-300 to-emerald-400 transition-all duration-500"
            style={{ width: `${done ? 100 : progress}%` }}
          />
        </div>
        <p className="mt-2.5 text-center text-[11px] font-bold uppercase tracking-[0.22em] text-slate-400">
          {done ? "Cycle complete" : `Step ${step + 1} / 3`}
        </p>
      </div>

      <div className="px-5 py-7 sm:px-8 sm:py-8">
        {/* STEP 1 — device */}
        {step === 0 && (
          <div>
            <p className="text-center text-sm font-bold uppercase tracking-[0.18em] text-cyan-300">
              › What device got wet?
            </p>
            <p className="mt-1 text-center text-[13px] text-slate-400">
              Different speakers need different cleaning programs. Pick yours.
            </p>
            <div className="mx-auto mt-6 grid max-w-lg gap-2.5">
              {DEVICES.map((d) => (
                <button key={d.id} onClick={() => setDevice(d.id)} aria-pressed={device === d.id} className={optionCls(device === d.id)}>
                  <span className="text-2xl">{d.emoji}</span>
                  <span className="flex-1">
                    <span className="block text-[15px] font-bold text-white">{d.label}</span>
                    <span className="block text-xs text-slate-500">{d.hint}</span>
                  </span>
                  <span className={`flex h-6 w-6 items-center justify-center rounded-full border text-xs transition ${device === d.id ? "border-cyan-300 bg-cyan-400 text-deep" : "border-white/20 text-transparent"}`}>✓</span>
                </button>
              ))}
            </div>
            <div className="mx-auto mt-6 max-w-lg">
              <button
                onClick={() => device && setStep(1)}
                disabled={!device}
                className="h-14 w-full rounded-full bg-gradient-to-r from-blue-500 to-blue-600 text-[15px] font-bold text-white shadow-glow transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-40 disabled:shadow-none disabled:hover:brightness-100"
              >
                Remove water from speaker →
              </button>
              <p className="mt-2.5 text-center text-xs text-slate-500">
                {device ? `${deviceLabel} selected` : "Select your device above to continue"}
              </p>
            </div>
          </div>
        )}

        {/* STEP 2 — issue */}
        {step === 1 && (
          <div>
            <p className="text-center text-sm font-bold uppercase tracking-[0.18em] text-cyan-300">
              › What happened?
            </p>
            <p className="mt-1 text-center text-[13px] text-slate-400">
              Different issues need different cleaning programs.
            </p>
            <div className="mx-auto mt-6 grid max-w-lg gap-2.5">
              {ISSUES.map((i) => (
                <button key={i.id} onClick={() => setIssue(i.id)} aria-pressed={issue === i.id} className={optionCls(issue === i.id)}>
                  <span className="text-2xl">{i.emoji}</span>
                  <span className="flex-1">
                    <span className="block text-[15px] font-bold text-white">{i.label}</span>
                    <span className="block text-xs text-slate-500">{i.hint}</span>
                  </span>
                  <span className={`flex h-6 w-6 items-center justify-center rounded-full border text-xs transition ${issue === i.id ? "border-cyan-300 bg-cyan-400 text-deep" : "border-white/20 text-transparent"}`}>✓</span>
                </button>
              ))}
            </div>
            <div className="mx-auto mt-6 max-w-lg">
              <button
                onClick={() => issue && setStep(2)}
                disabled={!issue}
                className="h-14 w-full rounded-full bg-gradient-to-r from-blue-500 to-blue-600 text-[15px] font-bold text-white shadow-glow transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-40 disabled:shadow-none disabled:hover:brightness-100"
              >
                Continue →
              </button>
              <p className="mt-2.5 text-center text-xs text-slate-500">
                {issue ? `${issueLabel} selected` : "Select what happened above to continue"}
              </p>
            </div>
            <button onClick={() => setStep(0)} className="mx-auto mt-5 block text-[13px] font-semibold text-slate-500 underline underline-offset-4 hover:text-slate-300">
              ← Back: change device ({deviceLabel})
            </button>
          </div>
        )}

        {/* STEP 3 — run */}
        {step === 2 && program && (
          <div>
            <div className="mx-auto max-w-lg text-center">
              <h2 className="text-2xl font-extrabold tracking-tight text-white sm:text-3xl">
                Eject water in one tap
              </h2>
              <p className="mt-2 text-sm leading-6 text-slate-400">
                {device === "airpods" ? "Set phone volume to 70–80%" : "Turn your volume to max, hold the speaker facing down"}, then tap once to run the cleaning program.
              </p>
            </div>

            <div className="mx-auto mt-6 max-w-lg rounded-2xl border border-white/10 bg-white/[0.02] p-5">
              <p className="text-xs font-bold uppercase tracking-[0.14em] text-slate-400">
                Your program · {deviceLabel} · {issueLabel}
              </p>
              <p className="mt-1.5 text-sm font-bold text-cyan-300">{program.summary}</p>
              <p className="mt-1 text-xs leading-5 text-slate-500">
                A slow, gradual sweep{program.rests ? " with rest breaks" : ""}. Just hold still and let it work.
              </p>
              <label className="mt-4 block">
                <span className="mb-1.5 block text-xs font-bold uppercase tracking-[0.14em] text-slate-400">
                  Intensity
                </span>
                <div className="grid grid-cols-3 gap-2">
                  {(["gentle", "standard", "deep"] as Intensity[]).map((v) => (
                    <button
                      key={v}
                      onClick={() => setIntensity(v)}
                      disabled={running}
                      aria-pressed={intensity === v}
                      className={`rounded-xl border py-2.5 text-[13px] font-bold capitalize transition disabled:opacity-60 ${
                        intensity === v
                          ? "border-cyan-400/60 bg-cyan-400/10 text-white"
                          : "border-white/10 text-slate-400 hover:border-white/25 hover:text-white"
                      }`}
                    >
                      {v}
                    </button>
                  ))}
                </div>
                <span className="mt-1.5 block text-xs text-slate-500">{INTENSITY_LABEL[intensity]}</span>
              </label>
            </div>

            <div className="mx-auto mt-5 max-w-lg">
              {!running && !done && (
                <button
                  onClick={startRun}
                  className="h-14 w-full rounded-full bg-gradient-to-r from-blue-500 to-blue-600 text-[15px] font-bold text-white shadow-glow transition hover:brightness-110"
                >
                  Start Water Removal
                </button>
              )}
              {(running || done) && (
                <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-5">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-bold text-white">
                      {done ? "✓ Cycle complete" : resting ? "Resting…" : "Removing water…"}
                    </span>
                    <span className="font-extrabold tabular-nums text-cyan-300">
                      {done ? "done" : `${left}s`}
                    </span>
                  </div>
                  <div className="mt-3 h-2.5 overflow-hidden rounded-full bg-white/10" role="progressbar" aria-valuenow={running || done ? total - left : 0} aria-valuemin={0} aria-valuemax={total}>
                    <div className="h-full rounded-full bg-gradient-to-r from-cyan-300 to-emerald-400 transition-all duration-500" style={{ width: `${done ? 100 : pct}%` }} />
                  </div>
                  <p className="mt-2 text-center text-xs tabular-nums text-slate-500">
                    {done ? "Wipe the grille — droplets should be visible" : running ? "Keep the speaker facing down" : "Ready to start"}
                  </p>
                  <p className="mt-4 text-center text-xs text-slate-500">
                    Free app adds better alternating frequencies + haptic vibration
                  </p>
                  <div className="mt-2 flex flex-col gap-2 sm:flex-row">
                    {running ? (
                      <button onClick={stop} className="min-h-[44px] flex-1 rounded-full border border-red-400/40 px-4 py-2.5 text-center text-sm font-bold leading-tight text-red-300 transition hover:bg-red-400/10">
                        ■ Stop
                      </button>
                    ) : (
                      <button onClick={startRun} className="min-h-[44px] flex-1 rounded-full bg-white px-4 py-2.5 text-center text-sm font-bold leading-tight text-black transition hover:-translate-y-0.5">
                        ↻ Run again
                      </button>
                    )}
                    <a
                      href={APP_STORE_URL}
                      target="_blank"
                      rel="noopener"
                      className="flex min-h-[44px] flex-1 items-center justify-center rounded-full bg-white px-4 py-2.5 text-center text-sm font-bold leading-tight text-black transition hover:-translate-y-0.5"
                    >
                      Get the free app →
                    </a>
                  </div>
                </div>
              )}
              {!running && !done && (
                <button onClick={() => setStep(1)} className="mx-auto mt-5 block text-[13px] font-semibold text-slate-500 underline underline-offset-4 hover:text-slate-300">
                  ← Back: change issue ({issueLabel})
                </button>
              )}
              {done && (
                <div className="mt-4 rounded-2xl border border-cyan-400/30 bg-cyan-400/[0.06] p-4 text-center">
                  <p className="text-sm font-bold text-white">Want a stronger clean?</p>
                  <p className="mx-auto mt-1 max-w-sm text-xs leading-5 text-slate-400">
                    The free app adds better alternating frequencies + haptic vibration for stubborn water.
                  </p>
                  <div className="mt-3 grid gap-2 sm:grid-cols-2">
                    <a
                      href={APP_STORE_URL}
                      target="_blank"
                      rel="noopener"
                      className="flex h-11 items-center justify-center rounded-full bg-cyan-400 text-sm font-bold text-deep transition hover:bg-cyan-300"
                    >
                      Download free app →
                    </a>
                    <button onClick={reset} className="h-11 rounded-full border border-white/10 text-sm font-semibold text-slate-300 transition hover:border-white/25 hover:text-white">
                      Start over (different device)
                    </button>
                  </div>
                </div>
              )}
            </div>
            {unsupported && (
              <p className="mx-auto mt-4 max-w-lg text-center text-sm text-amber-300">
                Your browser blocked web audio — try Safari or Chrome, or run the program in the free app.
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
