"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { APP_STORE_URL } from "@/lib/site";

export type NavLink = { href: string; label: string };

/** Sticky header with desktop links + hamburger menu on mobile. */
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
      ? "block rounded-xl px-3 py-3 text-base font-semibold text-slate-200 hover:bg-white/5 hover:text-white"
      : "hover:text-white";
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
    <header className="sticky top-0 z-50 border-b border-white/10 bg-deep/85 backdrop-blur-xl">
      <nav className="mx-auto flex max-w-6xl items-center justify-between gap-2 px-4 py-3" aria-label="Main navigation">
        <Link href="/" className="flex shrink-0 items-center gap-2.5" onClick={() => setOpen(false)}>
          <Image src="/assets/icon.jpg" alt="WaterDrop app icon" width={36} height={36} className="rounded-xl shadow-glow" />
          <span className="text-lg font-extrabold tracking-tight">
            Water<span className="text-gradient">Drop</span>
          </span>
        </Link>
        <div className="hidden items-center gap-6 text-sm text-slate-300 md:flex">
          {links.map((l) => renderLink(l, false))}
        </div>
        <div className="flex shrink-0 items-center gap-2">
          <a
            href={APP_STORE_URL}
            target="_blank"
            rel="noopener"
            className="whitespace-nowrap rounded-xl bg-cyan-400 px-3 py-2 text-sm font-bold text-deep transition hover:bg-cyan-300 sm:px-4"
          >
            Get the app
          </a>
          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/15 text-xl leading-none text-white md:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((o) => !o)}
          >
            {open ? "✕" : "☰"}
          </button>
        </div>
      </nav>
      {open && (
        <div id="mobile-menu" className="border-t border-white/10 px-4 pb-5 pt-3 md:hidden">
          <ul className="space-y-1">{links.map((l) => (
            <li key={l.href + l.label}>{renderLink(l, true)}</li>
          ))}</ul>
        </div>
      )}
    </header>
  );
}
