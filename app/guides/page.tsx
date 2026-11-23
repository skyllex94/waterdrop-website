import type { Metadata } from "next";
import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";
import { APP_STORE_URL, GUIDES, SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Blog: Water Eject Guides to Fix iPhone Speaker & AirPods Water Damage",
  description:
    "Every WaterDrop fix guide in one place — water in iPhone speakers, washed AirPods, liquid-detected ports, crackling, dust, and speaker tests. Free, step-by-step, no signup.",
  keywords: [
    "water eject guide",
    "iphone speaker fix guides",
    "airpods water damage fix",
    "waterdrop blog",
  ],
  alternates: { canonical: "/guides" },
  openGraph: {
    type: "website",
    url: `${SITE_URL}/guides`,
    title: "Water Eject Guides: Fix iPhone Speaker & AirPods Water Damage",
    description:
      "Step-by-step fix guides for water in iPhone speakers, washed AirPods, liquid-detected ports, and more.",
    images: [{ url: "/assets/screenshot-1.png", width: 392, height: 696, alt: "WaterDrop guides" }],
  },
};

const CATEGORIES: { heading: string; blurb: string; slugs: string[] }[] = [
  {
    heading: "AirPods rescue",
    blurb: "Washed, rained on, or sweaty buds — bring them back.",
    slugs: [
      "3-ways-to-get-water-out-of-airpods",
      "how-to-get-water-out-of-airpods",
      "can-airpods-survive-washing-machine",
      "airpods-one-side-quiet-after-water",
      "airpods-crackling-static-after-water",
    ],
  },
  {
    heading: "iPhone water emergencies",
    blurb: "Speaker underwater, dunked phone, or a blocked port.",
    slugs: [
      "how-to-get-water-out-of-iphone-speaker",
      "dropped-iphone-in-water-speaker-muffled",
      "liquid-detected-iphone",
      "water-eject-not-working",
    ],
  },
  {
    heading: "Clean, test & compare",
    blurb: "Dust, earpieces, shortcuts, and proof your fix worked.",
    slugs: [
      "how-to-clean-iphone-speaker-dust",
      "iphone-earpiece-low-volume",
      "water-eject-shortcut-vs-app",
      "decibel-meter-speaker-test",
    ],
  },
];

const TOOLS = [
  { href: "/tools/water-eject-sound", emoji: "🔊", label: "Water Eject Tones" },
  { href: "/tools/speaker-test", emoji: "🎧", label: "Speaker Test" },
  { href: "/tools/tone-generator", emoji: "🎛️", label: "Tone Generator" },
  { href: "/tools/mic-test", emoji: "🎤", label: "Mic Test" },
  { href: "/tools/decibel-meter", emoji: "📊", label: "Decibel Meter" },
];

const breadcrumbLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
    { "@type": "ListItem", position: 2, name: "Blog", item: `${SITE_URL}/guides` },
  ],
};

const itemListLd = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "WaterDrop fix guides",
  itemListElement: GUIDES.map((g, i) => ({
    "@type": "ListItem",
    position: i + 1,
    url: `${SITE_URL}/guides/${g.slug}`,
    name: g.title,
  })),
};

export default function GuidesIndexPage() {
  const bySlug = new Map(GUIDES.map((g) => [g.slug, g]));

  return (
    <main className="min-h-screen">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListLd) }} />

      <SiteHeader
        links={[
          { href: "/#how", label: "How it works" },
          { href: "/#reviews", label: "Reviews" },
          { href: "/tools/water-eject-sound", label: "Free tones" },
          { href: "/#faq", label: "FAQ" },
        ]}
      />

      <section className="hero-clean relative overflow-hidden">
        <div className="mx-auto max-w-3xl px-4 pt-12 text-center sm:pt-16">
          <nav className="text-xs text-slate-400" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-cyan-300">Home</Link> <span className="mx-1">/</span>
            <span className="text-slate-200">Blog</span>
          </nav>
          <p className="mt-6 inline-flex items-center gap-2 rounded-full border border-cyan-400/30 bg-cyan-400/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-cyan-300">
            📚 The WaterDrop blog
          </p>
          <h1 className="mx-auto mt-5 text-4xl font-bold leading-[1.05] tracking-[-0.02em] sm:text-5xl">
            Fix guides that <span className="text-gradient">actually fix it</span>
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-[16px] leading-7 text-slate-300/90">
            Every guide answers the exact search, then shows which free tool or app program
            to run — no fluff, no rice myths. Pick your problem below.
          </p>
        </div>

        <div className="mx-auto max-w-5xl px-4 pb-8 pt-10">
          <div className="grid gap-2.5 sm:grid-cols-3 lg:grid-cols-5">
            {TOOLS.map((t) => (
              <Link
                key={t.href}
                href={t.href}
                className="card-hover rounded-2xl border border-white/[0.08] bg-[#0A1430]/80 px-4 py-3.5 text-center"
              >
                <span className="text-xl">{t.emoji}</span>
                <span className="mt-1 block text-[13px] font-bold text-white">{t.label}</span>
                <span className="text-[11px] font-semibold text-cyan-300">Free tool →</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-5xl space-y-14 px-4 pb-10 pt-6">
        {CATEGORIES.map((c) => (
          <section key={c.heading} aria-label={c.heading}>
            <h2 className="text-2xl font-bold tracking-tight">{c.heading}</h2>
            <p className="mt-1 text-sm text-slate-400">{c.blurb}</p>
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              {c.slugs.map((slug) => {
                const g = bySlug.get(slug);
                if (!g) return null;
                return (
                  <Link
                    key={g.slug}
                    href={`/guides/${g.slug}`}
                    className="card-hover group rounded-3xl border border-white/[0.08] bg-white/[0.03] p-6"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="text-3xl">{g.emoji}</div>
                      <span className="shrink-0 rounded-full bg-white/[0.05] px-3 py-1 text-[11px] font-semibold text-slate-400">
                        {g.readMinutes} min
                      </span>
                    </div>
                    {g.slug === "how-to-get-water-out-of-airpods" && (
                      <p className="mt-3 inline-block rounded-full bg-amber-400/10 px-3 py-1 text-[11px] font-bold uppercase tracking-widest text-amber-300">
                        🔥 Most popular fix
                      </p>
                    )}
                    <h3 className="mt-3 font-bold leading-snug text-white group-hover:text-cyan-200">
                      {g.title}
                    </h3>
                    <p className="mt-2 line-clamp-3 text-sm leading-6 text-slate-500">{g.description}</p>
                    <p className="mt-4 text-sm font-semibold text-cyan-300">
                      Read guide →
                    </p>
                  </Link>
                );
              })}
            </div>
          </section>
        ))}
      </div>

      <section className="mx-auto max-w-5xl px-4 pb-20">
        <div className="showcase-ring relative overflow-hidden rounded-[2rem] border border-cyan-400/20 bg-[#0A1430] px-6 py-12 text-center">
          <h2 className="mx-auto max-w-xl text-2xl font-bold tracking-tight sm:text-3xl">
            Still stuck? Run the fix, don&apos;t just read about it.
          </h2>
          <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-slate-400">
            Free water eject, speaker and mic tests, tone generator, and decibel meter —
            right in your browser. Plus the app for the full rescue.
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <a
              href={APP_STORE_URL}
              target="_blank"
              rel="noopener"
              className="inline-flex h-[52px] items-center rounded-full bg-cyan-400 px-7 text-sm font-bold text-deep transition hover:bg-cyan-300"
            >
              Get the free app
            </a>
            <Link
              href="/tools/water-eject-sound"
              className="inline-flex h-[52px] items-center rounded-full border border-white/15 px-7 text-sm font-semibold text-white transition hover:border-cyan-400/50"
            >
              Play free tones →
            </Link>
          </div>
        </div>
      </section>

      <footer className="border-t border-white/[0.07]">
        <div className="mx-auto max-w-5xl px-4 py-8 text-center text-xs text-slate-600">
          © {new Date().getFullYear()} Zion Studios LLC · <Link href="/" className="hover:text-cyan-300">WaterDrop</Link> · <Link href="/guides" className="hover:text-cyan-300">Blog</Link>
        </div>
      </footer>
    </main>
  );
}
