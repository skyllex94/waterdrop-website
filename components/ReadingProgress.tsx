"use client";

import { useEffect, useState } from "react";

/** Thin scroll-progress bar pinned to the top of guide pages. */
export default function ReadingProgress() {
  const [p, setP] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement;
      const max = h.scrollHeight - h.clientHeight;
      setP(max > 0 ? Math.min(100, (h.scrollTop / max) * 100) : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="fixed left-0 top-0 z-[60] h-1 w-full bg-white/10" aria-hidden>
      <div
        className="h-full bg-gradient-to-r from-cyan-300 to-emerald-400"
        style={{ width: `${p}%` }}
      />
    </div>
  );
}
