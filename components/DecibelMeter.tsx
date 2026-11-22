"use client";

import { useEffect, useRef, useState } from "react";

type Status = "idle" | "requesting" | "active" | "denied" | "unsupported";

/**
 * Free browser decibel meter: live pseudo-SPL readout from the mic with
 * smoothing, peak hold, and a baseline snapshot so users can compare
 * speaker loudness before vs. after water ejection. On-device only.
 *
 * Honest limitation: phone mics are not calibrated, so absolute dB values
 * are approximate — but back-to-back comparisons on the same device are valid.
 */
export default function DecibelMeter() {
  const [status, setStatus] = useState<Status>("idle");
  const [db, setDb] = useState(0);
  const [maxDb, setMaxDb] = useState(0);
  const [baseline, setBaseline] = useState<number | null>(null);
  const [deniedReason, setDeniedReason] = useState("");

  const streamRef = useRef<MediaStream | null>(null);
  const ctxRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const rafRef = useRef<number | null>(null);
  const smoothRef = useRef(0);
  const maxRef = useRef(0);
  const statusRef = useRef<Status>("idle");
  statusRef.current = status;

  const cleanup = () => {
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
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
  };

  const start = async () => {
    cleanup();
    setStatus("requesting");
    setMaxDb(0);
    maxRef.current = 0;
    smoothRef.current = 0;

    if (typeof navigator === "undefined" || !navigator.mediaDevices?.getUserMedia) {
      setStatus("unsupported");
      return;
    }

    let stream: MediaStream;
    try {
      try {
        stream = await navigator.mediaDevices.getUserMedia({
          audio: { echoCancellation: false, noiseSuppression: false, autoGainControl: false },
        });
      } catch {
        stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      }
    } catch (err) {
      const name = err instanceof DOMException ? err.name : "";
      setDeniedReason(
        name === "NotAllowedError"
          ? "Permission was blocked. Allow microphone access in the browser prompt (or the lock icon in the address bar), then try again."
          : "The microphone could not be opened. Close apps that may hold it, then try again."
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
      setStatus("active");

      const buf = new Float32Array(analyser.fftSize);
      const tick = () => {
        if (statusRef.current !== "active") return;
        const an = analyserRef.current;
        if (an) {
          an.getFloatTimeDomainData(buf);
          let sumSq = 0;
          for (let i = 0; i < buf.length; i++) sumSq += buf[i] * buf[i];
          const rms = Math.sqrt(sumSq / buf.length);
          const rmsDb = rms > 0 ? 20 * Math.log10(rms) : -100;
          const spl = Math.max(0, Math.min(130, rmsDb + 100));
          // Fast attack, slow release so the number feels like a real meter
          const prev = smoothRef.current;
          smoothRef.current = spl > prev ? spl : prev + (spl - prev) * 0.15;
          if (smoothRef.current > maxRef.current) maxRef.current = smoothRef.current;
          setDb(Math.round(smoothRef.current * 10) / 10);
          setMaxDb(Math.round(maxRef.current * 10) / 10);
        }
        rafRef.current = requestAnimationFrame(tick);
      };
      rafRef.current = requestAnimationFrame(tick);
    } catch {
      cleanup();
      setStatus("unsupported");
    }
  };

  useEffect(() => {
    return () => cleanup();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const delta = baseline !== null ? db - baseline : null;
  const barPct = Math.max(0, Math.min(100, (db / 130) * 100));

  return (
    <div className="overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03]">
      <div className="border-b border-white/[0.07] bg-white/[0.02] px-6 py-5">
        {status === "idle" && (
          <div className="text-center">
            <p className="text-5xl">📊</p>
            <p className="mt-3 text-lg font-bold text-white">Measure how loud your speaker really is</p>
            <p className="mx-auto mt-1 max-w-md text-sm leading-6 text-slate-400">
              Uses your mic to estimate loudness. Save a baseline, run your fix, and see the
              difference in numbers. <strong className="text-slate-200">Nothing is uploaded.</strong>
            </p>
            <button
              onClick={start}
              className="mt-4 inline-flex h-12 items-center gap-2 rounded-full bg-cyan-400 px-8 text-sm font-bold text-deep transition hover:bg-cyan-300"
            >
              📊 Start decibel meter
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
            over HTTPS). The free WaterDrop app includes a decibel meter that works without a browser.
          </p>
        )}

        {status === "denied" && (
          <div className="py-2 text-center">
            <p className="text-sm font-bold text-red-300">Microphone blocked</p>
            <p className="mx-auto mt-1 max-w-md text-sm leading-6 text-slate-400">{deniedReason}</p>
            <button
              onClick={start}
              className="mt-4 inline-flex h-11 items-center rounded-full border border-white/15 px-6 text-sm font-semibold text-white transition hover:border-cyan-400/50"
            >
              Try again
            </button>
          </div>
        )}

        {status === "active" && (
          <div>
            <div className="flex flex-wrap items-end justify-between gap-3">
              <div>
                <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-slate-500">Live level</p>
                <p className="mt-1 text-5xl font-extrabold tabular-nums tracking-tight text-white">
                  {Math.round(db)}
                  <span className="ml-1 text-xl font-bold text-slate-400">dB</span>
                </p>
              </div>
              <div className="text-right text-xs tabular-nums text-slate-400">
                <p>
                  MAX <strong className="text-slate-200">{Math.round(maxDb)} dB</strong>
                </p>
                {baseline !== null && delta !== null && (
                  <p className="mt-1">
                    vs baseline{" "}
                    <strong className={delta >= 0 ? "text-emerald-300" : "text-red-300"}>
                      {delta >= 0 ? "+" : ""}
                      {delta.toFixed(1)} dB
                    </strong>
                  </p>
                )}
              </div>
            </div>

            <div
              className="relative mt-4 h-3 overflow-hidden rounded-full bg-white/10"
              role="meter"
              aria-label="Sound level in decibels"
              aria-valuenow={Math.round(db)}
              aria-valuemin={0}
              aria-valuemax={130}
            >
              <div
                className={`h-full rounded-full transition-[width] duration-150 ${
                  db >= 100
                    ? "bg-gradient-to-r from-amber-400 to-red-400"
                    : "bg-gradient-to-r from-cyan-300 to-emerald-400"
                }`}
                style={{ width: `${barPct}%` }}
              />
            </div>
            <div className="relative mt-1 h-4 text-[10px] tabular-nums text-slate-500">
              <span className="absolute" style={{ left: `${(30 / 130) * 100}%` }}>30 whisper</span>
              <span className="absolute" style={{ left: `${(60 / 130) * 100}%` }}>60 talk</span>
              <span className="absolute" style={{ left: `${(85 / 130) * 100}%` }}>85 loud</span>
              <span className="absolute" style={{ left: `${(110 / 130) * 100}%` }}>110 concert</span>
            </div>

            <div className="mt-3 flex flex-wrap items-center gap-2.5">
              {baseline === null ? (
                <button
                  onClick={() => setBaseline(Math.round(db * 10) / 10)}
                  className="inline-flex h-11 items-center rounded-full bg-white px-6 text-sm font-bold text-black transition hover:-translate-y-0.5"
                >
                  📌 Save as baseline ({Math.round(db)} dB)
                </button>
              ) : (
                <button
                  onClick={() => setBaseline(null)}
                  className="inline-flex h-11 items-center rounded-full border border-white/15 px-6 text-sm font-semibold text-slate-200 transition hover:border-cyan-400/50 hover:text-white"
                >
                  Clear baseline ({baseline.toFixed(0)} dB)
                </button>
              )}
              <button
                onClick={() => {
                  maxRef.current = smoothRef.current;
                  setMaxDb(Math.round(smoothRef.current * 10) / 10);
                }}
                className="inline-flex h-11 items-center rounded-full border border-white/10 px-5 text-sm font-semibold text-slate-300 transition hover:border-white/25 hover:text-white"
              >
                Reset max
              </button>
              <button
                onClick={stop}
                className="inline-flex h-11 items-center rounded-full border border-white/10 px-5 text-sm font-semibold text-slate-300 transition hover:border-red-400/50 hover:text-white"
              >
                Stop
              </button>
            </div>
          </div>
        )}
      </div>

      <div className="px-6 py-4">
        <p className="text-xs leading-5 text-slate-500">
          📏 Phone mics aren&apos;t lab-calibrated, so treat the absolute number as approximate (±5–10 dB).
          Back-to-back comparisons on the <em>same phone, same distance</em> are what matter: measure
          before ejecting water, then measure again — a rise of 3+ dB means clearly audible improvement.
        </p>
      </div>
    </div>
  );
}
