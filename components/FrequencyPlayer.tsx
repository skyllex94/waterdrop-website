"use client";

import { useEffect, useRef, useState } from "react";

type Mode = 165 | 300 | "alt";

const MODES: { id: Mode; label: string; hint: string }[] = [
  { id: 165, label: "165 Hz", hint: "Deep bass — the classic ejection tone" },
  { id: 300, label: "300 Hz", hint: "Higher sweep — shakes finer droplets loose" },
  { id: "alt", label: "165 ⇄ 300 Hz", hint: "Alternating — closest to the app (recommended)" },
];

const DURATIONS = [30, 60, 120];

/**
 * Free browser water-eject tone player.
 * Plays 165Hz, 300Hz, or an alternating sweep for a chosen duration.
 */
export default function FrequencyPlayer() {
  const [mode, setMode] = useState<Mode>("alt");
  const [duration, setDuration] = useState(60);
  const [playing, setPlaying] = useState(false);
  const [left, setLeft] = useState(60);
  const [liveHz, setLiveHz] = useState<number>(165);
  const [unsupported, setUnsupported] = useState(false);

  const ctxRef = useRef<AudioContext | null>(null);
  const oscRef = useRef<OscillatorNode | null>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const flipRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const stateRef = useRef({ left: 60, duration: 60 });
  stateRef.current = { left, duration };

  const stop = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    if (flipRef.current) {
      clearInterval(flipRef.current);
      flipRef.current = null;
    }
    if (ctxRef.current) {
      ctxRef.current.close().catch(() => {});
      ctxRef.current = null;
    }
    oscRef.current = null;
    setPlaying(false);
  };

  const start = async () => {
    stop();
    try {
      const AC =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext })
          .webkitAudioContext;
      if (!AC) {
        setUnsupported(true);
        return;
      }
      const ctx = new AC();
      await ctx.resume();

      const osc = ctx.createOscillator();
      osc.type = "sine";
      osc.frequency.value = mode === 300 ? 300 : 165;
      setLiveHz(mode === 300 ? 300 : 165);

      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0.0001, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.9, ctx.currentTime + 0.5);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();

      ctxRef.current = ctx;
      oscRef.current = osc;

      if (mode === "alt") {
        let high = false;
        flipRef.current = setInterval(() => {
          high = !high;
          const hz = high ? 300 : 165;
          osc.frequency.setTargetAtTime(hz, ctx.currentTime, 0.15);
          setLiveHz(hz);
        }, 3000);
      }

      setLeft(duration);
      setPlaying(true);
      timerRef.current = setInterval(() => {
        setLeft((s) => {
          if (s <= 1) {
            stop();
            return stateRef.current.duration;
          }
          return s - 1;
        });
      }, 1000);
    } catch {
      setUnsupported(true);
    }
  };

  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      if (flipRef.current) clearInterval(flipRef.current);
      if (ctxRef.current) ctxRef.current.close().catch(() => {});
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const elapsed = duration - left;
  const pct = playing ? (elapsed / duration) * 100 : 0;
  const mm = Math.floor(left / 60);
  const ss = String(left % 60).padStart(2, "0");

  return (
    <div className="glass rounded-3xl p-6 md:p-8">
      {/* Mode picker */}
      <p className="text-xs font-bold uppercase tracking-[0.2em] text-cyan-300">
        1 · Pick your frequency
      </p>
      <div className="mt-3 grid gap-2 sm:grid-cols-3" role="radiogroup" aria-label="Frequency">
        {MODES.map((m) => (
          <button
            key={m.label}
            role="radio"
            aria-checked={mode === m.id}
            disabled={playing}
            onClick={() => setMode(m.id)}
            className={`rounded-2xl border px-4 py-3 text-left transition ${
              mode === m.id
                ? "border-cyan-400/70 bg-cyan-400/15 shadow-glow"
                : "border-white/10 bg-white/5 hover:border-cyan-400/40"
            } ${playing ? "cursor-not-allowed opacity-50" : ""}`}
          >
            <span className="block font-extrabold text-white">{m.label}</span>
            <span className="mt-0.5 block text-xs leading-5 text-slate-400">{m.hint}</span>
          </button>
        ))}
      </div>

      {/* Duration picker */}
      <p className="mt-6 text-xs font-bold uppercase tracking-[0.2em] text-cyan-300">
        2 · Pick duration
      </p>
      <div className="mt-3 flex gap-2" role="radiogroup" aria-label="Duration in seconds">
        {DURATIONS.map((d) => (
          <button
            key={d}
            role="radio"
            aria-checked={duration === d}
            disabled={playing}
            onClick={() => {
              setDuration(d);
              setLeft(d);
            }}
            className={`rounded-xl border px-5 py-2.5 text-sm font-bold transition ${
              duration === d
                ? "border-cyan-400/70 bg-cyan-400/15 text-white shadow-glow"
                : "border-white/10 bg-white/5 text-slate-300 hover:border-cyan-400/40"
            } ${playing ? "cursor-not-allowed opacity-50" : ""}`}
          >
            {d >= 60 ? `${d / 60} min` : `${d}s`}
          </button>
        ))}
      </div>

      {/* Transport */}
      <p className="mt-6 text-xs font-bold uppercase tracking-[0.2em] text-cyan-300">
        3 · Volume up, speaker down, press play
      </p>
      <div className="mt-3 flex flex-wrap items-center gap-5">
        <button
          onClick={playing ? stop : start}
          aria-pressed={playing}
          className={`inline-flex h-20 w-20 shrink-0 items-center justify-center rounded-full text-3xl font-bold shadow-glow transition hover:scale-105 active:scale-95 ${
            playing ? "bg-red-400 text-deep" : "bg-cyan-400 text-deep"
          }`}
          aria-label={playing ? "Stop eject tone" : "Play water eject tone"}
        >
          {playing ? "■" : "▶"}
        </button>
        <div className="min-w-[220px] flex-1">
          <p className="font-mono text-4xl font-black tabular-nums text-white" aria-live="polite">
            {playing ? `${mm}:${ss}` : `${Math.floor(duration / 60)}:${String(duration % 60).padStart(2, "0")}`}
          </p>
          <p className="mt-1 text-sm text-slate-300">
            {playing ? (
              <>
                Playing <strong className="text-cyan-300">{mode === "alt" ? `${liveHz} Hz (alternating)` : `${liveHz} Hz`}</strong> — watch the grille for droplets 👀
              </>
            ) : (
              "Your tone will play here. Max volume, speaker facing down."
            )}
          </p>
          <div
            className="mt-3 h-2.5 overflow-hidden rounded-full bg-white/10"
            role="progressbar"
            aria-valuenow={Math.round(pct)}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label="Eject session progress"
          >
            <div
              className="h-full rounded-full bg-gradient-to-r from-cyan-300 to-emerald-400 transition-all duration-1000"
              style={{ width: `${pct}%` }}
            />
          </div>
        </div>
      </div>

      {unsupported && (
        <p className="mt-4 text-sm text-amber-300">
          Your browser blocked web audio — the full program lives in the free WaterDrop app.
        </p>
      )}
    </div>
  );
}
