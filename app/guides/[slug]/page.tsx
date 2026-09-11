import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { APP_STORE_URL, GUIDES, SITE_URL } from "@/lib/site";
import { GUIDE_CONTENT } from "@/lib/guides-content";
import ReadingProgress from "@/components/ReadingProgress";
import AppleMark from "@/components/AppleMark";
import SiteHeader from "@/components/SiteHeader";

const GUIDE_UPDATED = "2026-09-11";

export function generateStaticParams() {
  return GUIDES.map((g) => ({ slug: g.slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const g = GUIDE_CONTENT[params.slug];
  if (!g) return {};
  return {
    title: g.title,
    description: g.description,
    keywords: [g.keyword, "water eject", "waterdrop app", "iphone speaker cleaner"],
    authors: [{ name: "Zion Studios LLC" }],
    alternates: { canonical: `/guides/${g.slug}` },
    openGraph: {
      type: "article",
      url: `${SITE_URL}/guides/${g.slug}`,
      title: g.title,
      description: g.description,
      publishedTime: "2026-09-09T00:00:00.000Z",
      modifiedTime: `${GUIDE_UPDATED}T00:00:00.000Z`,
      authors: ["Zion Studios LLC"],
      images: [{ url: "/assets/screenshot-1.png", width: 392, height: 696, alt: g.title }],
    },
  };
}

export default function GuidePage({ params }: { params: { slug: string } }) {
  const g = GUIDE_CONTENT[params.slug];
  if (!g) notFound();

  const related = GUIDES.filter((x) => x.slug !== g.slug).slice(0, 3);
  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: g.faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
  const howToLd = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: g.title,
    description: g.description,
    totalTime: `PT${g.readMinutes}M`,
    step: g.steps.map((s) => ({ "@type": "HowToStep", name: s.title, text: s.detail })),
  };
  const articleLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: g.title,
    description: g.description,
    image: [`${SITE_URL}/assets/screenshot-1.png`],
    author: { "@type": "Organization", name: "Zion Studios LLC" },
    publisher: { "@type": "Organization", name: "Zion Studios LLC" },
    datePublished: "2026-09-09",
    dateModified: GUIDE_UPDATED,
    mainEntityOfPage: `${SITE_URL}/guides/${g.slug}`,
  };
  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
      { "@type": "ListItem", position: 2, name: "Guides", item: `${SITE_URL}/#guides` },
      { "@type": "ListItem", position: 3, name: g.shortTitle, item: `${SITE_URL}/guides/${g.slug}` },
    ],
  };

  return (
    <main className="min-h-screen">
      <ReadingProgress />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />

      <SiteHeader
        links={[
          { href: "/#guides", label: "All guides" },
          { href: "/tools/water-eject-sound", label: "Free tones" },
          { href: "/guides/how-to-get-water-out-of-airpods", label: "AirPods fix" },
          { href: "/guides/how-to-get-water-out-of-iphone-speaker", label: "iPhone fix" },
        ]}
      />

      <article className="mx-auto max-w-3xl px-4 pb-20 pt-10">
        <nav className="text-xs text-slate-400">
          <Link href="/" className="hover:text-cyan-300">Home</Link> <span className="mx-1">/</span>
          <Link href="/#guides" className="hover:text-cyan-300">Guides</Link> <span className="mx-1">/</span>
          <span className="text-slate-200">{g.shortTitle}</span>
        </nav>
        <p className="mt-4 text-xs text-slate-500">
          By <span className="font-semibold text-slate-300">Zion Studios LLC</span> · Updated{" "}
          <time dateTime={GUIDE_UPDATED}>
            {new Date(`${GUIDE_UPDATED}T00:00:00`).toLocaleDateString("en-US", {
              month: "long",
              day: "numeric",
              year: "numeric",
            })}
          </time>{" "}
          · {g.readMinutes} min read
        </p>

        <p className="mt-6 inline-flex items-center gap-2 rounded-full border border-cyan-400/30 bg-cyan-400/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-cyan-300">
          {g.emoji} Guide · {g.readMinutes} min read
        </p>
        <h1 className="mt-4 text-3xl font-black leading-tight tracking-tight md:text-5xl">{g.title}</h1>
        <p className="mt-4 text-lg leading-8 text-slate-300">{g.description}</p>

        <div className="mt-6 flex flex-wrap items-center gap-3 rounded-2xl border border-white/10 bg-white/5 p-4">
          <Image src="/assets/icon.jpg" alt="WaterDrop icon" width={48} height={48} className="rounded-2xl" />
          <p className="flex-1 text-sm leading-6 text-slate-300">
            <strong className="text-white">TL;DR:</strong> {g.intro[0]}
          </p>
          <a href={APP_STORE_URL} target="_blank" rel="noopener" className="inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-bold text-black hover:-translate-y-0.5">
            <AppleMark size={18} /> Get the app
          </a>
        </div>

        <div className="prose-dark mt-6">
          {g.intro.slice(1).map((p, i) => <p key={i}>{p}</p>)}

          <h2>Step-by-step: {g.shortTitle.toLowerCase()} fix</h2>
          <ol>
            {g.steps.map((s) => (
              <li key={s.title}><strong>{s.title}:</strong> {s.detail}</li>
            ))}
          </ol>

          {g.sections.map((s) => (
            <div key={s.heading}>
              <h2>{s.heading}</h2>
              {s.body.map((p, i) => <p key={i}>{p}</p>)}
            </div>
          ))}

          <h2>How to do it in WaterDrop (1 tap)</h2>
          <ol>
            {g.waterdrop.map((s) => (
              <li key={s.title}><strong>{s.title}:</strong> {s.detail}</li>
            ))}
          </ol>

          <h2>Pro tips</h2>
          <ul>
            {g.tips.map((t) => <li key={t}>{t}</li>)}
          </ul>
        </div>

        <div className="mt-10 overflow-hidden rounded-3xl border border-cyan-400/25 bg-gradient-to-br from-abyss to-deep p-8 text-center shadow-glow">
          <Image src="/assets/icon.jpg" alt="WaterDrop app icon" width={72} height={72} className="mx-auto rounded-3xl" />
          <h2 className="!mb-2 !mt-4 text-2xl font-black text-white">Fix it now — free download</h2>
          <p className="mx-auto max-w-md text-sm leading-6 text-slate-300">
            Water eject + dust cleaning + AirPods &amp; earpiece modes + free dB meter and 15+ tests. 4.3★ rated.
          </p>
          <a href={APP_STORE_URL} target="_blank" rel="noopener" className="mt-5 inline-flex items-center gap-2 rounded-2xl bg-white px-7 py-4 font-bold text-black hover:-translate-y-0.5">
            <AppleMark size={22} /> Download on the App Store
          </a>
          <p className="mt-3 text-xs text-slate-500">Free · iOS 15.1+ · No data collected</p>
        </div>

        <h2 className="mb-4 mt-12 text-2xl font-extrabold text-white">Frequently asked questions</h2>
        <div className="space-y-3">
          {g.faqs.map((f) => (
            <details key={f.q} className="glass rounded-2xl px-5 py-4">
              <summary className="flex cursor-pointer items-center justify-between gap-4 font-semibold text-white">
                {f.q}<span className="faq-chevron text-cyan-300">▾</span>
              </summary>
              <p className="mt-3 text-sm leading-7 text-slate-300">{f.a}</p>
            </details>
          ))}
        </div>

        <h2 className="mb-4 mt-12 text-2xl font-extrabold text-white">Related guides</h2>
        <div className="grid gap-3 sm:grid-cols-3">
          {related.map((r) => (
            <Link key={r.slug} href={`/guides/${r.slug}`} className="rounded-2xl border border-white/10 bg-white/5 p-5 transition hover:border-cyan-400/50">
              <div className="text-2xl">{r.emoji}</div>
              <p className="mt-2 text-sm font-bold leading-snug text-white">{r.title}</p>
              <p className="mt-2 text-xs font-semibold text-cyan-300">Read →</p>
            </Link>
          ))}
        </div>

        <p className="mt-10 text-center">
          <Link href="/" className="text-sm font-semibold text-slate-400 underline underline-offset-4 hover:text-cyan-300">
            ← Back to WaterDrop home
          </Link>
        </p>
      </article>

      <footer className="border-t border-white/10 py-6 text-center text-xs text-slate-500">
        © {new Date().getFullYear()} Zion Studios LLC · <Link href="/" className="hover:text-cyan-300">WaterDrop</Link> · Support: zionstudiosapps@gmail.com
      </footer>
    </main>
  );
}
