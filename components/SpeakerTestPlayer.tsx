"use client";

import { useEffect, useRef, useState } from "react";

type TestId = "left" | "right" | "sweep" | "freq" | "bass";

const TESTS: { id: TestId; label: string; hint: string; seconds: number }[] = [
  { id: "left", label: "◀ Left only", hint: "Sound plays from the left channel only", seconds: 5 },
  { id: "right", label: "Right only ▶", hint: "Sound plays from the right channel only", seconds: 5 },
  { id: "sweep", label: "L ⇄ R sweep", hint: "Pans left → right so you can compare both sides", seconds: 8 },
  { id: "freq", label: "Frequency sweep", hint: "Glides 100Hz → 8kHz — catches rattles and dead spots", seconds: 10 },
  { id: "bass", label: "Bass / rattle test", hint: "Deep 55Hz tone — reveals buzzing or loose parts", seconds: 6 },
];

/**
 * Free browser speaker test: left/right channel checks, stereo pan sweep,
 * frequency sweep and bass rattle test. All synthesized live with WebAudio —
 * no audio files, no permissions needed.
 */
export default function SpeakerTestPlayer() {
  const [active, setActive] = useState<TestId | null>(null);
  const [left, setLeft] = useState(0);
  const [total, setTotal] = useState(0);
  const [unsupported, setUnsupported] = useState(false);
  const ctxRef = useRef<AudioContext | null>(null);
  const nodesRef = useRef<{ stop: () => void } | null>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const cleanup = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
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
    cleanup();
    setActive(null);
    setLeft(0);
  };

  const start = async (id: TestId) => {
    stop();
    const meta = TESTS.find((t) => t.id === id)!;
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
      ctxRef.current = ctx;

      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0.0001, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.7, ctx.currentTime + 0.3);

      const pan: StereoPannerNode | null =
        typeof ctx.createStereoPanner === "function" ? ctx.createStereoPanner() : null;
      const out = pan ?? gain;
      if (pan) {
        pan.connect(gain);
      }
      gain.connect(ctx.destination);

      const osc = ctx.createOscillator();
      osc.type = id === "bass" ? "sine" : "triangle";
      const stops: OscillatorNode[] = [osc];

      if (id === "left" || id === "right") {
        osc.frequency.value = 440;
        if (pan) pan.pan.value = id === "left" ? -1 : 1;
      } else if (id === "sweep") {
        osc.frequency.value = 440;
        if (pan) {
          const lfo = ctx.createOscillator();
          lfo.type = "sine";
          lfo.frequency.value = 2 / meta.seconds; // one full L→R→L pass
          const depth = ctx.createGain();
          depth.gain.value = 1;
          lfo.connect(depth);
          depth.connect(pan.pan);
          lfo.start();
          stops.push(lfo);
        }
      } else if (id === "freq") {
        osc.frequency.setValueAtTime(100, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(8000, ctx.currentTime + meta.seconds);
        if (pan) pan.pan.value = 0;
      } else {
        osc.frequency.value = 55;
        if (pan) pan.pan.value = 0;
      }

      osc.connect(out);
      osc.start();

      const stopAll = () => {
        try {
          gain.gain.cancelScheduledValues(ctx.currentTime);
          gain.gain.setTargetAtTime(0.0001, ctx.currentTime, 0.08);
          stops.forEach((o) => {
            try {
              o.stop(ctx.currentTime + 0.4);
            } catch {
              /* noop */
            }
          });
        } catch {
          /* noop */
        }
      };
      nodesRef.current = { stop: stopAll };

      setActive(id);
      setTotal(meta.seconds);
      setLeft(meta.seconds);
      timerRef.current = setInterval(() => {
        setLeft((s) => {
          if (s <= 1) {
            stop();
            return 0;
          }
          return s - 1;
        });
      }, 1000);

      // Hard auto-stop at the end of the test
      window.setTimeout(() => {
        if (ctxRef.current === ctx) stop();
      }, meta.seconds * 1000 + 600);
    } catch {
      setUnsupported(true);
    }
  };

  useEffect(() => {
    return () => cleanup();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const pct = total > 0 && active ? ((total - left) / total) * 100 : 0;
  const activeMeta = TESTS.find((t) => t.id === active);

  return (
    <div className="overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03]">
      <div className="border-b border-white/[0.07] bg-white/[0.02] px-6 py-4">
        <p className="text-sm font-bold text-white">
          {active && activeMeta
            ? `Playing: ${activeMeta.label} — ${left}s left`
            : "Pick a test below — sound plays instantly"}
        </p>
        <p className="mt-1 text-[13px] text-slate-400">
          Volume to <strong className="text-white">70–100%</strong>. Wear both AirPods / earbuds
          for channel tests so left and right are obvious.
        </p>
        <div
          className="mt-3 h-2 overflow-hidden rounded-full bg-white/10"
          role="progressbar"
          aria-valuenow={active ? total - left : 0}
          aria-valuemin={0}
          aria-valuemax={total || 1}
        >
          <div
            className="h-full rounded-full bg-gradient-to-r from-cyan-300 to-emerald-400 transition-all duration-1000"
            style={{ width: `${active ? pct : 0}%` }}
          />
        </div>
      </div>
      <div className="grid gap-2.5 p-5 sm:grid-cols-2">
        {TESTS.map((t) => {
          const isActive = active === t.id;
          return (
            <button
              key={t.id}
              onClick={() => (isActive ? stop() : start(t.id))}
              aria-pressed={isActive}
              className={`rounded-2xl border p-4 text-left transition ${
                isActive
                  ? "border-red-400/50 bg-red-400/10"
                  : "border-white/10 bg-white/[0.03] hover:border-cyan-400/50"
              }`}
            >
              <span className="flex items-center justify-between gap-2">
                <span className="text-[15px] font-bold text-white">{t.label}</span>
                <span
                  className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-sm font-bold transition ${
                    isActive ? "bg-red-400 text-deep" : "bg-cyan-400 text-deep"
                  }`}
                >
                  {isActive ? "■" : "▶"}
                </span>
              </span>
              <span className="mt-1 block text-[13px] leading-5 text-slate-400">{t.hint}</span>
              <span className="mt-1 block text-xs font-semibold text-slate-500">{t.seconds}s test</span>
            </button>
          );
        })}
      </div>
      {active && (
        <div className="px-5 pb-5">
          <button
            onClick={stop}
            className="w-full rounded-2xl border border-white/10 py-3 text-sm font-semibold text-slate-300 transition hover:border-red-400/50 hover:text-white"
          >
            Stop test
          </button>
        </div>
      )}
      {unsupported && (
        <p className="px-6 pb-5 text-sm text-amber-300">
          Your browser blocked web audio — try Safari or Chrome, or run the 15+ tests inside the free app.
        </p>
      )}
    </div>
  );
}
