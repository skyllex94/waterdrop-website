"use client";

import { useEffect, useRef, useState } from "react";

const DEMO_SECONDS = 15;

/**
 * Interactive 165Hz water-eject demo tone, generated live with WebAudio.
 * Single wobbling bass tone — a small taste of the app's alternating sweep.
 */
export default function ToneDemo() {
  const [playing, setPlaying] = useState(false);
  const [left, setLeft] = useState(DEMO_SECONDS);
  const [unsupported, setUnsupported] = useState(false);
  const audioRef = useRef<AudioContext | null>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const stop = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    if (audioRef.current) {
      audioRef.current.close().catch(() => {});
      audioRef.current = null;
    }
    setPlaying(false);
    setLeft(DEMO_SECONDS);
  };

  const start = async () => {
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

      // 165Hz bass carrier — the classic ejection frequency…
      const osc = ctx.createOscillator();
      osc.type = "sine";
      osc.frequency.value = 165;

      // …wobbled ±30Hz a couple of times per second, like an alternating sweep
      const wobble = ctx.createOscillator();
      wobble.type = "sine";
      wobble.frequency.value = 2;
      const wobbleAmt = ctx.createGain();
      wobbleAmt.gain.value = 30;
      wobble.connect(wobbleAmt);
      wobbleAmt.connect(osc.frequency);

      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0.0001, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.9, ctx.currentTime + 0.4);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      wobble.start();

      audioRef.current = ctx;
      setPlaying(true);
      setLeft(DEMO_SECONDS);
      timerRef.current = setInterval(() => {
        setLeft((s) => {
          if (s <= 1) {
            stop();
            return DEMO_SECONDS;
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
      if (audioRef.current) audioRef.current.close().catch(() => {});
    };
  }, []);

  const pct = ((DEMO_SECONDS - left) / DEMO_SECONDS) * 100;

  return (
    <div className="glass mt-6 rounded-3xl p-6 md:p-8">
      <div className="flex flex-wrap items-center gap-5">
        <button
          onClick={playing ? stop : start}
          aria-pressed={playing}
          className={`inline-flex h-16 w-16 shrink-0 items-center justify-center rounded-full text-2xl font-bold shadow-glow transition hover:scale-105 active:scale-95 ${
            playing ? "bg-red-400 text-deep" : "bg-cyan-400 text-deep"
          }`}
          aria-label={playing ? "Stop demo tone" : "Play 15 second water eject demo tone"}
        >
          {playing ? "■" : "▶"}
        </button>
        <div className="min-w-[220px] flex-1">
          <p className="font-bold text-white">
            {playing
              ? `Ejecting… ${left}s left — watch the grille 👀`
              : "Try a 15-second demo tone right here"}
          </p>
          <p className="mt-1 text-sm leading-6 text-slate-300">
            Volume <strong className="text-white">up</strong>, speaker{" "}
            <strong className="text-white">facing down</strong>. This browser demo is one
            wobbling tone — the app&apos;s alternating sweep + vibration hits way harder.
          </p>
          <div
            className="mt-3 h-2 overflow-hidden rounded-full bg-white/10"
            role="progressbar"
            aria-valuenow={playing ? DEMO_SECONDS - left : 0}
            aria-valuemin={0}
            aria-valuemax={DEMO_SECONDS}
          >
            <div
              className="h-full rounded-full bg-gradient-to-r from-cyan-300 to-emerald-400 transition-all duration-1000"
              style={{ width: `${playing ? pct : 0}%` }}
            />
          </div>
        </div>
      </div>
      {unsupported && (
        <p className="mt-3 text-sm text-amber-300">
          Your browser blocked web audio — no worries, the full program lives in the free app.
        </p>
      )}
    </div>
  );
}
