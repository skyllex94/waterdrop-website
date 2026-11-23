"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { APP_STORE_URL } from "@/lib/site";

export type NavLink = { href: string; label: string };

const TOOLS: NavLink[] = [
  { href: "/tools/remove-water", label: "Remove Water (Guided)" },
  { href: "/tools/water-eject-sound", label: "Water Eject Tones" },
  { href: "/tools/speaker-test", label: "Speaker Test" },
  { href: "/tools/tone-generator", label: "Tone Generator" },
  { href: "/tools/mic-test", label: "Mic Test" },
  { href: "/tools/decibel-meter", label: "Decibel Meter" },
];

/** Floating pill header, Swokei-style — centered, rounded, clean. */
export default function SiteHeader({ links }: { links: NavLink[] }) {
  const [open, setOpen] = useState(false);
  const [toolsOpen, setToolsOpen] = useState(false);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        setToolsOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const renderLink = (l: NavLink, mobile: boolean) => {
    const cls = mobile
      ? "block rounded-2xl px-4 py-3 text-[15px] font-medium text-slate-200 hover:bg-white/5 hover:text-white"
      : "rounded-full px-1 py-1 text-[14px] font-medium text-slate-300 transition hover:text-white";
    const onClick = mobile ? () => setOpen(false) : undefined;
    return l.href.startsWith("#") ? (
      <a key={l.href + l.label} href={l.href} className={cls} onClick={onClick}>
        {l.label}
      </a>
    ) : (
      <Link key={l.href + l.label} href={l.href} className={cls} onClick={onClick}>
        {l.label}
      </Link>
    );
  };

  return (
    <div className="sticky top-3 z-50 mx-auto w-full max-w-5xl px-3 sm:top-5 sm:px-4">
      <header className="pill-nav rounded-full border border-white/10 bg-[#0A1430]/85 py-2 pl-3 pr-2 backdrop-blur-xl sm:pl-5">
        <nav className="flex items-center justify-between gap-2" aria-label="Main navigation">
          <Link href="/" className="flex shrink-0 items-center gap-2.5 rounded-full" onClick={() => setOpen(false)}>
            <Image src="/assets/icon.jpg" alt="WaterDrop app icon" width={32} height={32} className="rounded-full" />
            <span className="text-[17px] font-bold tracking-tight">
              Water<span className="text-gradient">Drop</span>
            </span>
          </Link>
          <div className="hidden items-center gap-5 lg:flex">
            {links.map((l) => renderLink(l, false))}
            <div
              className="relative"
              onMouseEnter={() => setToolsOpen(true)}
              onMouseLeave={() => setToolsOpen(false)}
            >
              <button
                type="button"
                aria-expanded={toolsOpen}
                aria-haspopup="true"
                onClick={() => setToolsOpen((o) => !o)}
                className="flex items-center gap-1 rounded-full px-1 py-1 text-[14px] font-medium text-slate-300 transition hover:text-white"
              >
                Free tools
                <span className={`text-[10px] transition-transform ${toolsOpen ? "rotate-180" : ""}`}>▾</span>
              </button>
              {toolsOpen && (
                <div className="absolute right-0 top-full w-60 pt-2">
                  <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#0A1430] p-1.5 shadow-card">
                    {TOOLS.map((t) => (
                      <Link
                        key={t.href}
                        href={t.href}
                        onClick={() => setToolsOpen(false)}
                        className="block rounded-xl px-3.5 py-2.5 text-[14px] font-medium text-slate-200 transition hover:bg-white/5 hover:text-white"
                      >
                        {t.label}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="flex shrink-0 items-center gap-2">
            <a
              href={APP_STORE_URL}
              target="_blank"
              rel="noopener"
              className="inline-flex items-center gap-2 whitespace-nowrap rounded-full bg-white px-5 py-2.5 text-sm font-bold text-black transition hover:-translate-y-0.5 hover:shadow-glow"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                <path d="M17.05 12.54c-.03-2.9 2.37-4.29 2.48-4.36-1.35-1.98-3.46-2.25-4.21-2.28-1.79-.18-3.5 1.06-4.4 1.06-.91 0-2.31-1.03-3.8-1-1.95.03-3.75 1.14-4.76 2.88-2.03 3.53-.52 8.76 1.46 11.63.96 1.39 2.11 2.95 3.62 2.89 1.45-.06 2-.94 3.75-.94s2.25.94 3.78.91c1.56-.03 2.55-1.41 3.5-2.81 1.1-1.61 1.55-3.17 1.58-3.25-.04-.02-3.03-1.16-3-4.73zM14.16 4.06c.8-.97 1.34-2.32 1.19-3.66-1.15.05-2.55.77-3.38 1.74-.74.86-1.39 2.23-1.22 3.55 1.29.1 2.6-.65 3.41-1.63z" />
              </svg>
              Download
            </a>
            <button
              type="button"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-lg leading-none text-white lg:hidden"
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? "Close menu" : "Open menu"}
              onClick={() => setOpen((o) => !o)}
            >
              {open ? "✕" : "☰"}
            </button>
          </div>
        </nav>
      </header>
      {open && (
        <div id="mobile-menu" className="pill-nav mt-2 rounded-3xl border border-white/10 bg-[#0A1430]/95 p-3 backdrop-blur-xl lg:hidden">
          <ul className="space-y-0.5">{links.map((l) => (
            <li key={l.href + l.label}>{renderLink(l, true)}</li>
          ))}</ul>
          <p className="px-4 pb-1 pt-3 text-[11px] font-bold uppercase tracking-[0.14em] text-slate-500">
            Free tools
          </p>
          <ul className="space-y-0.5">
            {TOOLS.map((t) => (
              <li key={t.href}>
                <Link
                  href={t.href}
                  onClick={() => setOpen(false)}
                  className="block rounded-2xl px-4 py-3 text-[15px] font-medium text-slate-200 hover:bg-white/5 hover:text-white"
                >
                  {t.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
