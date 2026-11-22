"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { APP_STORE_URL } from "@/lib/site";

export type NavLink = { href: string; label: string };

/** Floating pill header, Swokei-style — centered, rounded, clean. */
export default function SiteHeader({ links }: { links: NavLink[] }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
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
          </div>
          <div className="flex shrink-0 items-center gap-2">
            <Link
              href="/tools/water-eject-sound"
              className="hidden whitespace-nowrap rounded-full px-4 py-2.5 text-sm font-semibold text-slate-200 transition hover:bg-white/5 hover:text-white sm:block"
            >
              Free tones
            </Link>
            <a
              href={APP_STORE_URL}
              target="_blank"
              rel="noopener"
              className="whitespace-nowrap rounded-full bg-cyan-400 px-4 py-2.5 text-sm font-bold text-[#050B1E] transition hover:bg-cyan-300 sm:px-5"
            >
              Get the app
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
        </div>
      )}
    </div>
  );
}
