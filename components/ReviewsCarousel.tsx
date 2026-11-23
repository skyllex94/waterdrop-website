"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { REVIEWS } from "@/lib/reviews";

function Stars() {
  return (
    <span className="inline-flex items-center gap-0.5 text-amber-400" aria-label="5 out of 5 stars">
      {"★★★★★".split("").map((s, i) => (
        <span key={i}>{s}</span>
      ))}
    </span>
  );
}

/**
 * App-Store-style review carousel: snap scrolling, arrows, and slow
 * auto-advance (paused on hover, touch, focus, or reduced-motion).
 */
export default function ReviewsCarousel({ variant }: { variant: "page" | "home" }) {
  const trackRef = useRef<HTMLDivElement | null>(null);
  const [paused, setPaused] = useState(false);
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});
  const pausedRef = useRef(false);
  pausedRef.current = paused;

  const step = useCallback((dir: 1 | -1) => {
    const el = trackRef.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>("[data-card]");
    const amount = card ? card.offsetWidth + 20 : el.clientWidth * 0.8;
    const max = el.scrollWidth - el.clientWidth - 8;
    if (dir === 1 && el.scrollLeft >= max) {
      el.scrollTo({ left: 0, behavior: "smooth" });
    } else if (dir === -1 && el.scrollLeft <= 8) {
      el.scrollTo({ left: el.scrollWidth, behavior: "smooth" });
    } else {
      el.scrollBy({ left: dir * amount, behavior: "smooth" });
    }
  }, []);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setInterval(() => {
      if (!pausedRef.current) step(1);
    }, 4500);
    return () => window.clearInterval(id);
  }, [step]);

  const page = variant === "page";

  return (
    <div
      className="relative"
      onPointerEnter={() => setPaused(true)}
      onPointerLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
    >
      <div
        ref={trackRef}
        className="-mx-4 flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth px-4 pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        role="region"
        aria-label="Customer reviews carousel"
        tabIndex={0}
      >
        {REVIEWS.map((r) => (
          <figure
            key={r.name}
            data-card
            className={`flex w-[86%] shrink-0 snap-start flex-col rounded-3xl border p-7 sm:w-[58%] lg:w-[31.5%] ${
              page
                ? "border-blue-400/15 bg-[#0D1E42]/80"
                : "border-white/[0.08] bg-white/[0.03]"
            }`}
          >
            <div className="flex items-start justify-between gap-3">
              <p className={`text-[15px] font-bold ${page ? "text-white" : "text-white"}`}>
                {r.title}
              </p>
              <span className="shrink-0 text-xs tabular-nums text-slate-500">{r.date}</span>
            </div>
            <div className="mt-1.5 flex items-center justify-between gap-3">
              <Stars />
              <span className="truncate text-xs font-semibold text-slate-400">{r.name}</span>
            </div>
            {expanded[r.name] ? (
              <div className="mt-3 flex-1 space-y-3">
                {r.quote
                  .split(/\n+/)
                  .map((p) => p.trim())
                  .filter(Boolean)
                  .map((p, i) => (
                    <p
                      key={i}
                      className={`text-[14px] leading-6 ${
                        page ? "text-slate-300" : "text-slate-400"
                      }`}
                    >
                      {p}
                    </p>
                  ))}
              </div>
            ) : (
              <blockquote
                className={`mt-3 flex-1 line-clamp-4 text-[14px] leading-6 ${
                  page ? "text-slate-300" : "text-slate-400"
                }`}
              >
                {r.quote}
              </blockquote>
            )}
            {r.quote.length > 220 && (
              <button
                type="button"
                onClick={() =>
                  setExpanded((e) => ({ ...e, [r.name]: !e[r.name] }))
                }
                aria-expanded={!!expanded[r.name]}
                className="mt-2 self-start text-[13px] font-semibold text-cyan-300 underline decoration-cyan-400/30 underline-offset-4 hover:text-cyan-200"
              >
                {expanded[r.name] ? "Show less" : "…more"}
              </button>
            )}
            {r.developerResponse && (
              <div className="mt-4 rounded-2xl bg-white/[0.04] p-3.5">
                <p className="text-xs font-bold text-slate-200">Developer Response</p>
                <p className="mt-1 text-[13px] leading-5 text-slate-400">{r.developerResponse}</p>
              </div>
            )}
          </figure>
        ))}
      </div>

      <div className="mt-6 flex items-center justify-center gap-3">
        <button
          type="button"
          onClick={() => step(-1)}
          aria-label="Previous reviews"
          className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 text-xl text-white transition hover:border-cyan-400/50 hover:text-cyan-200"
        >
          ‹
        </button>
        <button
          type="button"
          onClick={() => step(1)}
          aria-label="Next reviews"
          className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 text-xl text-white transition hover:border-cyan-400/50 hover:text-cyan-200"
        >
          ›
        </button>
      </div>
    </div>
  );
}
