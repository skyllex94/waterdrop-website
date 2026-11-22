"use client";

import { useEffect, useRef, useState } from "react";

type Status = "idle" | "requesting" | "active" | "denied" | "unsupported";
type Verdict = "listening" | "working" | "quiet" | "loud" | "silent";

const VERDICT_COPY: Record<Verdict, { label: string; detail: string; tone: string }> = {
  listening: {
    label: "Listening…",
    detail: "Speak at your normal volume for a few seconds.",
    tone: "text-slate-300",
  },
  working: {
    label: "✓ Mic working",
    detail: "Healthy level — callers and recordings will hear you clearly.",
    tone: "text-emerald-300",
  },
  quiet: {
    label: "Weak signal",
    detail: "Move closer, uncover the mic hole, or raise input volume.",
    tone: "text-amber-300",
  },
  loud: {
    label: "Too loud — clipping",
    detail: "The signal is distorting. Move back or lower input volume.",
    tone: "text-red-300",
  },
  silent: {
    label: "No signal",
    detail: "Nothing reaching the browser. Check mute, permissions, and device choice below.",
    tone: "text-red-300",
  },
};

/**
 * Free browser microphone test: live dBFS level meter, waveform, automatic
 * verdict (working / quiet / clipping / silent), mic picker, and a 5-second
 * record-and-playback clip. All processing stays on-device — nothing uploaded.
 */
export default function MicTestPlayer() {
  const [status, setStatus] = useState<Status>("idle");
  const [verdict, setVerdict] = useState<Verdict>("listening");
  const [peakDb, setPeakDb] = useState(-70);
  const [rmsDb, setRmsDb] = useState(-70);
  const [clips, setClips] = useState(0);
  const [devices, setDevices] = useState<MediaDeviceInfo[]>([]);
  const [deviceId, setDeviceId] = useState<string>("");
  const [recording, setRecording] = useState(false);
  const [clipUrl, setClipUrl] = useState<string | null>(null);
  const [recError, setRecError] = useState("");
  const [recSecs, setRecSecs] = useState(0);
  const recTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const [canRecord, setCanRecord] = useState(true);
  const [deniedReason, setDeniedReason] = useState<string>("");

  const streamRef = useRef<MediaStream | null>(null);
  const ctxRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const rafRef = useRef<number | null>(null);
  const statsRef = useRef({ peak: 0, sumSq: 0, n: 0, clips: 0, heard: false });
  const recorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const timeDataRef = useRef<Float32Array | null>(null);
  const statusRef = useRef<Status>("idle");
  statusRef.current = status;

  const cleanup = () => {
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
    if (recTimerRef.current) {
      clearInterval(recTimerRef.current);
      recTimerRef.current = null;
    }
    try {
      recorderRef.current?.stream.getTracks().forEach((t) => t.stop());
    } catch {
      /* noop */
    }
    recorderRef.current = null;
    try {
      streamRef.current?.getTracks().forEach((t) => t.stop());
    } catch {
      /* noop */
    }
    streamRef.current = null;
    if (ctxRef.current) {
      ctxRef.current.close().catch(() => {});
      ctxRef.current = null;
    }
    analyserRef.current = null;
  };

  const stop = () => {
    cleanup();
    setStatus("idle");
    setRecording(false);
  };

  const start = async (chosenDevice?: string) => {
    cleanup();
    if (clipUrl) {
      URL.revokeObjectURL(clipUrl);
      setClipUrl(null);
    }
    setStatus("requesting");
    setVerdict("listening");
    setClips(0);
    setRecError("");
    setRecSecs(0);
    statsRef.current = { peak: 0, sumSq: 0, n: 0, clips: 0, heard: false };

    if (
      typeof navigator === "undefined" ||
      !navigator.mediaDevices?.getUserMedia
    ) {
      setStatus("unsupported");
      return;
    }

    const baseConstraints: MediaStreamConstraints = chosenDevice
      ? {
          audio: {
            deviceId: { exact: chosenDevice },
            echoCancellation: false,
            noiseSuppression: false,
            autoGainControl: false,
          },
        }
      : {
          audio: { echoCancellation: false, noiseSuppression: false, autoGainControl: false },
        };

    let stream: MediaStream;
    try {
      try {
        stream = await navigator.mediaDevices.getUserMedia(baseConstraints);
      } catch {
        // iOS Safari and some browsers reject advanced constraints — retry plain
        stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      }
    } catch (err) {
      const name = err instanceof DOMException ? err.name : "";
      setDeniedReason(
        name === "NotAllowedError"
          ? "Permission was blocked. Allow microphone access in the browser prompt (or the lock icon in the address bar), then try again."
          : name === "NotFoundError"
            ? "No microphone was found on this device."
            : "The microphone could not be opened. Close apps that may hold it (Zoom, Teams, voice memos), then try again."
      );
      setStatus("denied");
      return;
    }

    try {
      const AC =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      const ctx = new AC();
      await ctx.resume();
      const src = ctx.createMediaStreamSource(stream);
      const analyser = ctx.createAnalyser();
      analyser.fftSize = 2048;
      src.connect(analyser);
      streamRef.current = stream;
      ctxRef.current = ctx;
      analyserRef.current = analyser;
      timeDataRef.current = new Float32Array(analyser.fftSize);

      // Mic labels appear only after permission — refresh the picker now
      try {
        const all = await navigator.mediaDevices.enumerateDevices();
        setDevices(all.filter((d) => d.kind === "audioinput"));
        const activeTrack = stream.getAudioTracks()[0];
        if (activeTrack) setDeviceId(activeTrack.getSettings().deviceId ?? "");
      } catch {
        /* labels unavailable — picker stays hidden */
      }

      setStatus("active");
      setCanRecord(typeof window !== "undefined" && "MediaRecorder" in window);

      const buf = new Float32Array(analyser.fftSize);
      const tick = () => {
        if (statusRef.current !== "active" && statusRef.current !== "requesting") return;
        const an = analyserRef.current;
        const canvas = canvasRef.current;
        if (an) {
          an.getFloatTimeDomainData(buf);
          if (timeDataRef.current) timeDataRef.current.set(buf);
          let peak = 0;
          let sumSq = 0;
          for (let i = 0; i < buf.length; i++) {
            const v = Math.abs(buf[i]);
            if (v > peak) peak = v;
            sumSq += buf[i] * buf[i];
          }
          const s = statsRef.current;
          if (peak > s.peak) s.peak = peak;
          s.sumSq += sumSq;
          s.n += buf.length;
          if (peak >= 0.99) {
            s.clips += 1;
          }
          if (peak > 0.003) s.heard = true;

          const peakDbNow = peak > 0 ? 20 * Math.log10(peak) : -70;
          const rms = Math.sqrt(sumSq / buf.length);
          const rmsDbNow = rms > 0 ? 20 * Math.log10(rms) : -70;
          setPeakDb(Math.max(-70, Math.min(0, peakDbNow)));
          setRmsDb(Math.max(-70, Math.min(0, rmsDbNow)));
          setClips(s.clips);
          setVerdict(
            s.clips >= 3 ? "loud" : s.heard ? (s.peak >= 0.03 ? "working" : "quiet") : "listening"
          );

          // Draw waveform
          if (canvas) {
            const g = canvas.getContext("2d");
            if (g) {
              const w = canvas.width;
              const h = canvas.height;
              g.clearRect(0, 0, w, h);
              g.strokeStyle = "rgba(34,211,238,0.9)";
              g.lineWidth = 2;
              g.beginPath();
              const step = Math.max(1, Math.floor(buf.length / w));
              for (let x = 0; x < w; x++) {
                const v = buf[Math.min(buf.length - 1, x * step)] ?? 0;
                const y = h / 2 + v * (h / 2 - 2);
                if (x === 0) g.moveTo(x, y);
                else g.lineTo(x, y);
              }
              g.stroke();
            }
          }
        }
        rafRef.current = requestAnimationFrame(tick);
      };
      rafRef.current = requestAnimationFrame(tick);
    } catch {
      cleanup();
      setStatus("unsupported");
    }
  };

  const recordClip = () => {
    const stream = streamRef.current;
    if (!stream || recording) return;
    setRecError("");
    try {
      if (typeof MediaRecorder === "undefined") {
        throw new Error("unsupported");
      }
      const supported = (m: string) => {
        try {
          return MediaRecorder.isTypeSupported(m);
        } catch {
          return false;
        }
      };
      const mime = supported("audio/webm;codecs=opus")
        ? "audio/webm;codecs=opus"
        : supported("audio/webm")
          ? "audio/webm"
          : supported("audio/mp4")
            ? "audio/mp4"
            : "";
      const rec = new MediaRecorder(stream, mime ? { mimeType: mime } : undefined);
      chunksRef.current = [];
      rec.ondataavailable = (e) => {
        if (e.data && e.data.size > 0) chunksRef.current.push(e.data);
      };
      rec.onerror = () => {
        if (recTimerRef.current) {
          clearInterval(recTimerRef.current);
          recTimerRef.current = null;
        }
        setRecError(
          "Recording hit an error in this browser — the live meter above still works. Try Safari or Chrome, or use the tests in the free app."
        );
        setRecording(false);
      };
      rec.onstop = () => {
        if (recTimerRef.current) {
          clearInterval(recTimerRef.current);
          recTimerRef.current = null;
        }
        if (chunksRef.current.length === 0) {
          setRecError(
            "The recording came back empty — this happens on some iPhone browsers. Tap record again and keep talking, or hold the phone closer."
          );
        } else {
          const blob = new Blob(chunksRef.current, { type: rec.mimeType || "audio/mp4" });
          setClipUrl(URL.createObjectURL(blob));
        }
        setRecording(false);
      };
      recorderRef.current = rec;
      rec.start(250); // timeslices so audio arrives even if auto-stop misbehaves
      setRecording(true);
      setRecSecs(0);
      recTimerRef.current = setInterval(() => {
        setRecSecs((s) => {
          if (s + 1 >= 5) {
            try {
              if (rec.state !== "inactive") rec.stop();
            } catch {
              /* noop */
            }
            return 5;
          }
          return s + 1;
        });
      }, 1000);
    } catch {
      setRecError(
        "Recording isn't supported in this browser — the live meter above still works. Try Safari or Chrome."
      );
    }
  };

  const stopRecording = () => {
    try {
      const rec = recorderRef.current;
      if (rec && rec.state !== "inactive") rec.stop();
    } catch {
      /* noop */
    }
  };

  useEffect(() => {
    return () => {
      cleanup();
      if (clipUrl) URL.revokeObjectURL(clipUrl);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const levelPct = Math.max(0, Math.min(100, ((peakDb + 60) / 60) * 100));
  const v = VERDICT_COPY[verdict];
  const showSilentHint = verdict === "listening" && status === "active";

  return (
    <div className="overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03]">
      <div className="border-b border-white/[0.07] bg-white/[0.02] px-6 py-5">
        {status === "idle" && (
          <div className="text-center">
            <p className="text-5xl">🎤</p>
            <p className="mt-3 text-lg font-bold text-white">Test your microphone in seconds</p>
            <p className="mx-auto mt-1 max-w-md text-sm leading-6 text-slate-400">
              Your browser will ask for microphone access. Everything is measured on this
              device — <strong className="text-slate-200">no audio is uploaded or stored</strong>.
            </p>
            <button
              onClick={() => start()}
              className="mt-4 inline-flex h-12 items-center gap-2 rounded-full bg-cyan-400 px-8 text-sm font-bold text-deep transition hover:bg-cyan-300"
            >
              🎤 Start mic test
            </button>
          </div>
        )}

        {status === "requesting" && (
          <p className="py-6 text-center text-sm font-semibold text-slate-300">
            Opening your microphone… allow access when the browser asks.
          </p>
        )}

        {status === "unsupported" && (
          <p className="py-4 text-center text-sm leading-6 text-amber-300">
            This browser can&apos;t open the microphone (needs Safari, Chrome, Edge or Firefox
            over HTTPS). The mic checks in the free WaterDrop app work without a browser.
          </p>
        )}

        {status === "denied" && (
          <div className="py-2 text-center">
            <p className="text-sm font-bold text-red-300">Microphone blocked</p>
            <p className="mx-auto mt-1 max-w-md text-sm leading-6 text-slate-400">{deniedReason}</p>
            <button
              onClick={() => start()}
              className="mt-4 inline-flex h-11 items-center rounded-full border border-white/15 px-6 text-sm font-semibold text-white transition hover:border-cyan-400/50"
            >
              Try again
            </button>
          </div>
        )}

        {status === "active" && (
          <div>
            <div className="flex flex-wrap items-center justify-between gap-2">
              <p className={`text-lg font-extrabold ${v.tone}`}>{v.label}</p>
              <div className="flex items-center gap-3 text-xs tabular-nums text-slate-400">
                <span>
                  Peak <strong className="text-slate-200">{peakDb <= -70 ? "—" : `${Math.round(peakDb)} dB`}</strong>
                </span>
                <span>
                  Level <strong className="text-slate-200">{rmsDb <= -70 ? "—" : `${Math.round(rmsDb)} dB`}</strong>
                </span>
                {clips > 0 && <span className="font-bold text-red-300">Clips: {clips}</span>}
              </div>
            </div>
            <p className="mt-1 text-[13px] text-slate-400">{showSilentHint ? "Not hearing anything yet — speak up, then check the mic picker below." : v.detail}</p>

            <div
              className="mt-4 h-3 overflow-hidden rounded-full bg-white/10"
              role="meter"
              aria-label="Microphone input level"
              aria-valuenow={Math.round(levelPct)}
              aria-valuemin={0}
              aria-valuemax={100}
            >
              <div
                className={`h-full rounded-full transition-[width] duration-100 ${
                  verdict === "loud"
                    ? "bg-gradient-to-r from-amber-400 to-red-400"
                    : "bg-gradient-to-r from-cyan-300 to-emerald-400"
                }`}
                style={{ width: `${levelPct}%` }}
              />
            </div>
            <div className="mt-1 flex justify-between text-[11px] tabular-nums text-slate-500">
              <span>-60</span>
              <span>-30</span>
              <span>-12</span>
              <span>0 dB</span>
            </div>

            <canvas
              ref={canvasRef}
              width={640}
              height={90}
              className="mt-3 h-[90px] w-full rounded-2xl border border-white/[0.07] bg-deep/60"
              aria-hidden
            />

            <div className="mt-4 flex flex-wrap items-center gap-2.5">
              {canRecord &&
                (clipUrl ? (
                  <audio src={clipUrl} controls playsInline className="h-10 w-full sm:w-auto" />
                ) : recording ? (
                  <>
                    <span className="inline-flex h-11 items-center gap-2 rounded-full bg-red-400/15 px-6 text-sm font-bold tabular-nums text-red-300">
                      <span className="h-2 w-2 animate-pulse rounded-full bg-red-400" />
                      Recording {recSecs}s / 5s
                    </span>
                    <button
                      onClick={stopRecording}
                      className="inline-flex h-11 items-center rounded-full bg-white px-6 text-sm font-bold text-black transition hover:-translate-y-0.5"
                    >
                      Stop & listen
                    </button>
                  </>
                ) : (
                  <button
                    onClick={recordClip}
                    className="inline-flex h-11 items-center gap-2 rounded-full bg-white px-6 text-sm font-bold text-black transition hover:-translate-y-0.5"
                  >
                    ⏺ Record 5s & play back
                  </button>
                ))}
              <button
                onClick={stop}
                className="inline-flex h-11 items-center rounded-full border border-white/10 px-6 text-sm font-semibold text-slate-300 transition hover:border-red-400/50 hover:text-white"
              >
                Stop test
              </button>
            </div>
            {recError && (
              <p className="mt-2 text-sm leading-6 text-amber-300">{recError}</p>
            )}

            {devices.length > 1 && (
              <label className="mt-4 block">
                <span className="mb-1.5 block text-xs font-bold uppercase tracking-[0.14em] text-slate-500">
                  Microphone
                </span>
                <select
                  value={deviceId}
                  onChange={(e) => start(e.target.value)}
                  className="w-full rounded-xl border border-white/10 bg-deep px-3 py-2.5 text-sm text-white outline-none focus:border-cyan-400/60"
                >
                  {devices.map((d, i) => (
                    <option key={d.deviceId || i} value={d.deviceId}>
                      {d.label || `Microphone ${i + 1}`}
                    </option>
                  ))}
                </select>
              </label>
            )}
          </div>
        )}
      </div>

      <div className="px-6 py-4">
        <p className="text-xs leading-5 text-slate-500">
          🔒 Private by design: the meter, waveform and recording are computed in this tab and
          vanish when you leave. Use headphones when playing the clip back to avoid feedback.
          Tip: iPhone has three mics (bottom, front, back) — test the one matching your problem
          (calls → bottom, speakerphone/video → front/back).
        </p>
      </div>
    </div>
  );
}
