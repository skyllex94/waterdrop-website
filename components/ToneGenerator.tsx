"use client";

import { useEffect, useRef, useState } from "react";

type Wave = OscillatorType;

const WAVES: { id: Wave; label: string }[] = [
  { id: "sine", label: "Sine" },
  { id: "triangle", label: "Triangle" },
  { id: "square", label: "Square" },
  { id: "sawtooth", label: "Saw" },
];

const PRESETS: { label: string; hz: number; note: string }[] = [
  { label: "55 Hz", hz: 55, note: "Bass / rattle test" },
  { label: "165 Hz", hz: 165, note: "Water eject" },
  { label: "300 Hz", hz: 300, note: "Upper eject sweep" },
  { label: "440 Hz", hz: 440, note: "Pitch reference" },
  { label: "1 kHz", hz: 1000, note: "Clarity check" },
  { label: "8 kHz", hz: 8000, note: "High / dust range" },
];

const MIN_HZ = 20;
const MAX_HZ = 20000;

/** Map a 0–1000 slider position to 20–20000 Hz on a log scale (matches human hearing). */
function sliderToHz(v: number): number {
  return Math.round(MIN_HZ * Math.pow(MAX_HZ / MIN_HZ, v / 1000));
}

function hzToSlider(hz: number): number {
  return Math.round((1000 * Math.log(hz / MIN_HZ)) / Math.log(MAX_HZ / MIN_HZ));
}

/**
 * Free browser tone / frequency generator. Log-scale 20Hz–20kHz slider,
 * waveform select, output volume, presets, and a 100→8kHz sweep.
 */
export default function ToneGenerator() {
  const [hz, setHz] = useState(165);
  const [wave, setWave] = useState<Wave>("sine");
  const [volume, setVolume] = useState(70);
  const [playing, setPlaying] = useState(false);
  const [sweeping, setSweeping] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const [unsupported, setUnsupported] = useState(false);
  const ctxRef = useRef<AudioContext | null>(null);
  const oscRef = useRef<OscillatorNode | null>(null);
  const gainRef = useRef<GainNode | null>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const sweepRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const cleanup = (closeCtx = true) => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    if (sweepRef.current) {
      clearInterval(sweepRef.current);
      sweepRef.current = null;
    }
    try {
      if (oscRef.current) {
        try {
          oscRef.current.stop();
        } catch {
          /* already stopped */
        }
        oscRef.current.disconnect();
      }
    } catch {
      /* noop */
    }
    oscRef.current = null;
    gainRef.current = null;
    if (closeCtx && ctxRef.current) {
      ctxRef.current.close().catch(() => {});
      ctxRef.current = null;
    }
  };

  const stop = () => {
    cleanup();
    setPlaying(false);
    setSweeping(false);
    setElapsed(0);
  };

  const ensureCtx = async (): Promise<AudioContext | null> => {
    try {
      const AC =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext })
          .webkitAudioContext;
      if (!AC) {
        setUnsupported(true);
        return null;
      }
      if (!ctxRef.current) {
        ctxRef.current = new AC();
      }
      await ctxRef.current.resume();
      return ctxRef.current;
    } catch {
      setUnsupported(true);
      return null;
    }
  };

  const startTone = async (atHz: number, atWave: Wave) => {
    stop();
    const ctx = await ensureCtx();
    if (!ctx) return;
    const osc = ctx.createOscillator();
    osc.type = atWave;
    osc.frequency.value = Math.min(Math.max(atHz, MIN_HZ), MAX_HZ);
    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.0001, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(Math.max(0.05, volume / 100), ctx.currentTime + 0.25);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    oscRef.current = osc;
    gainRef.current = gain;
    setPlaying(true);
    setElapsed(0);
    timerRef.current = setInterval(() => setElapsed((s) => s + 1), 1000);
  };

  const startSweep = async () => {
    stop();
    const ctx = await ensureCtx();
    if (!ctx) return;
    const osc = ctx.createOscillator();
    osc.type = "sine";
    const SWEEP_SECONDS = 12;
    osc.frequency.setValueAtTime(100, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(8000, ctx.currentTime + SWEEP_SECONDS);
    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.0001, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.6, ctx.currentTime + 0.3);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    oscRef.current = osc;
    gainRef.current = gain;
    setPlaying(true);
    setSweeping(true);
    setElapsed(0);
    const t0 = Date.now();
    timerRef.current = setInterval(() => setElapsed(Math.floor((Date.now() - t0) / 1000)), 250);
    sweepRef.current = setInterval(() => {
      // Show the live frequency as the sweep glides log 100 → 8000 Hz
      const p = Math.min((Date.now() - t0) / (SWEEP_SECONDS * 1000), 1);
      setHz(Math.round(100 * Math.pow(80, p)));
      if (p >= 1) stop();
    }, 100);
  };

  // Live-update a running tone when sliders change
  useEffect(() => {
    if (playing && !sweeping && oscRef.current && gainRef.current && ctxRef.current) {
      oscRef.current.type = wave;
      oscRef.current.frequency.setTargetAtTime(
        Math.min(Math.max(hz, MIN_HZ), MAX_HZ),
        ctxRef.current.currentTime,
        0.03
      );
      gainRef.current.gain.setTargetAtTime(
        Math.max(0.05, volume / 100),
        ctxRef.current.currentTime,
        0.05
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hz, wave, volume]);

  useEffect(() => {
    return () => cleanup();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const prettyHz = hz >= 1000 ? `${(hz / 1000).toFixed(hz >= 10000 ? 0 : 1)} kHz` : `${hz} Hz`;

  return (
    <div className="overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03]">
      <div className="border-b border-white/[0.07] bg-white/[0.02] px-6 py-5">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-slate-500">Now playing</p>
            <p className="mt-1 text-4xl font-extrabold tabular-nums tracking-tight text-white">
              {playing ? prettyHz : "—"}
            </p>
          </div>
          <div className="flex items-center gap-2">
            {playing && (
              <span className="rounded-full border border-emerald-400/25 bg-emerald-400/10 px-3 py-1 text-xs font-semibold tabular-nums text-emerald-300">
                {elapsed}s
              </span>
            )}
            {!playing ? (
              <>
                <button
                  onClick={() => startTone(hz, wave)}
                  className="inline-flex h-12 items-center gap-2 rounded-full bg-cyan-400 px-7 text-sm font-bold text-deep transition hover:bg-cyan-300"
                >
                  ▶ Play
                </button>
                <button
                  onClick={startSweep}
                  className="inline-flex h-12 items-center rounded-full border border-white/15 px-5 text-sm font-semibold text-white transition hover:border-cyan-400/50 hover:text-cyan-200"
                >
                  Sweep 100→8k
                </button>
              </>
            ) : (
              <button
                onClick={stop}
                className="inline-flex h-12 items-center gap-2 rounded-full bg-red-400 px-7 text-sm font-bold text-deep transition hover:bg-red-300"
              >
                ■ Stop
              </button>
            )}
          </div>
        </div>
        <label className="mt-5 block">
          <span className="mb-2 flex justify-between text-xs font-semibold text-slate-400">
            <span>Frequency</span>
            <span className="tabular-nums text-slate-500">20 Hz – 20 kHz (log)</span>
          </span>
          <input
            type="range"
            min={0}
            max={1000}
            value={hzToSlider(Math.min(Math.max(hz, MIN_HZ), MAX_HZ))}
            onChange={(e) => setHz(sliderToHz(Number(e.target.value)))}
            className="w-full accent-cyan-400"
            aria-label="Frequency in hertz"
          />
        </label>
        <div className="mt-3 flex items-center gap-3">
          <input
            type="number"
            min={MIN_HZ}
            max={MAX_HZ}
            value={hz}
            onChange={(e) => setHz(Math.min(Math.max(Number(e.target.value) || MIN_HZ, MIN_HZ), MAX_HZ))}
            className="w-28 rounded-xl border border-white/10 bg-deep px-3 py-2 text-sm font-bold tabular-nums text-white outline-none focus:border-cyan-400/60"
            aria-label="Exact frequency"
          />
          <span className="text-sm text-slate-500">Hz</span>
        </div>
      </div>

      <div className="grid gap-5 p-5 sm:grid-cols-2 sm:p-6">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.14em] text-slate-500">Waveform</p>
          <div className="mt-2.5 flex flex-wrap gap-2">
            {WAVES.map((w) => (
              <button
                key={w.id}
                onClick={() => setWave(w.id)}
                aria-pressed={wave === w.id}
                className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                  wave === w.id
                    ? "bg-cyan-400 text-deep"
                    : "border border-white/10 text-slate-300 hover:border-cyan-400/50 hover:text-white"
                }`}
              >
                {w.label}
              </button>
            ))}
          </div>
          <p className="mt-2 text-xs leading-5 text-slate-500">
            Sine is smoothest. Square and saw are harsher — keep volume lower with those.
          </p>
        </div>
        <div>
          <p className="flex justify-between text-xs font-bold uppercase tracking-[0.14em] text-slate-500">
            <span>Output level</span>
            <span className="tabular-nums">{volume}%</span>
          </p>
          <input
            type="range"
            min={5}
            max={100}
            value={volume}
            onChange={(e) => setVolume(Number(e.target.value))}
            className="mt-2.5 w-full accent-cyan-400"
            aria-label="Output level"
          />
          <p className="mt-2 text-xs leading-5 text-slate-500">
            Start low on high frequencies — 8 kHz+ at full blast is unpleasant.
          </p>
        </div>
      </div>

      <div className="border-t border-white/[0.07] px-5 py-5 sm:px-6">
        <p className="text-xs font-bold uppercase tracking-[0.14em] text-slate-500">Presets</p>
        <div className="mt-2.5 grid grid-cols-2 gap-2 sm:grid-cols-3">
          {PRESETS.map((p) => (
            <button
              key={p.label}
              onClick={() => {
                setHz(p.hz);
                setWave("sine");
                startTone(p.hz, "sine");
              }}
              className={`rounded-2xl border p-3 text-left transition ${
                playing && hz === p.hz
                  ? "border-cyan-400/60 bg-cyan-400/10"
                  : "border-white/10 bg-white/[0.03] hover:border-cyan-400/50"
              }`}
            >
              <span className="text-sm font-bold tabular-nums text-white">{p.label}</span>
              <span className="mt-0.5 block text-xs text-slate-500">{p.note}</span>
            </button>
          ))}
        </div>
      </div>

      {unsupported && (
        <p className="px-6 pb-5 text-sm text-amber-300">
          Your browser blocked web audio — try Safari or Chrome.
        </p>
      )}
    </div>
  );
}
