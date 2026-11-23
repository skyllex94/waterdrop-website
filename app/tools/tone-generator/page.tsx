import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import ToneGenerator from "@/components/ToneGenerator";
import AppleMark from "@/components/AppleMark";
import SiteHeader from "@/components/SiteHeader";
import { APP_STORE_URL, GUIDES, SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Free Online Tone Generator: 20Hz–20kHz Frequency Generator (Play 165Hz)",
  description:
    "Play any frequency free in your browser — 20Hz to 20kHz sine, triangle, square & saw waves with presets for 165Hz water eject, bass tests and speaker checks. No download.",
  keywords: [
    "online tone generator",
    "frequency generator online",
    "play 165hz",
    "sine wave generator",
    "play frequency sound",
    "hz generator",
    "speaker frequency test",
    "water eject frequency",
  ],
  alternates: { canonical: "/tools/tone-generator" },
  openGraph: {
    type: "website",
    url: `${SITE_URL}/tools/tone-generator`,
    title: "Free Online Tone Generator: Any Frequency, 20Hz–20kHz",
    description:
      "Dial any frequency and play it instantly — 165Hz water eject, bass tests, speaker checks. Free, no download.",
    images: [{ url: "/assets/screenshot-1.png", width: 392, height: 696, alt: "Tone generator tool" }],
  },
};

const TOOL_FAQS = [
  {
    q: "What frequency removes water from a speaker?",
    a: "Around 150–180Hz — 165Hz is the classic choice. Low frequencies move the speaker cone far enough to break the surface tension holding droplets in the mesh. Tap the 165 Hz preset above, volume to max, speaker facing down, and run it for 60 seconds.",
  },
  {
    q: "Can I play 165Hz right here without downloading anything?",
    a: "Yes — tap the 165 Hz preset and press Play. That is the same frequency most water-eject tools and the Siri shortcut use. For actual water in your speaker, our guided water-eject tones walk you through the full routine.",
  },
  {
    q: "What is the difference between sine, square and saw waves?",
    a: "Sine is a smooth pure tone — best for speaker tests and water ejection. Square and sawtooth add harsh harmonics that make the same pitch sound louder and rougher. Use sine for cleaning and testing; the others are for synth and electronics experiments at lower volume.",
  },
  {
    q: "Why can't I hear very low or very high frequencies?",
    a: "Two limits stack up: your hearing (most adults top out around 15–17kHz, not a full 20kHz) and your speaker (phone speakers barely reproduce anything below ~100Hz or above ~18kHz). If 30Hz is silent on your phone but audible on headphones, the phone speaker is the limit — not your ears.",
  },
  {
    q: "Is it safe to play these tones through my phone speaker?",
    a: "Yes at normal volumes and short sessions — it is the same as playing music. Avoid max volume on square/saw waves and on very high frequencies (8kHz+), which are unpleasant and stressful on tiny drivers. Stop if you hear harsh rattling from a case or screen protector.",
  },
];

const faqLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: TOOL_FAQS.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

const breadcrumbLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
    { "@type": "ListItem", position: 2, name: "Tools", item: `${SITE_URL}/tools/water-eject-sound` },
    { "@type": "ListItem", position: 3, name: "Tone generator", item: `${SITE_URL}/tools/tone-generator` },
  ],
};

export default function ToneGeneratorPage() {
  const related = GUIDES.filter((g) =>
    ["how-to-get-water-out-of-iphone-speaker", "how-to-clean-iphone-speaker-dust", "decibel-meter-speaker-test"].includes(g.slug)
  );

  return (
    <main className="min-h-screen">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />

      <SiteHeader
        links={[
          { href: "/guides", label: "Blog" },
          { href: "/tools/water-eject-sound", label: "Water eject tones" },
          { href: "/tools/speaker-test", label: "Speaker test" },
        ]}
      />

      <article className="mx-auto max-w-3xl px-4 pb-20 pt-10">
        <nav className="text-xs text-slate-400" aria-label="Breadcrumb">
          <Link href="/" className="hover:text-cyan-300">Home</Link> <span className="mx-1">/</span>
          <span className="text-slate-200">Free tone generator</span>
        </nav>

        <p className="mt-6 inline-flex items-center gap-2 rounded-full border border-cyan-400/30 bg-cyan-400/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-cyan-300">
          🎛️ Free online tool · No download
        </p>
        <h1 className="mt-4 text-3xl font-black leading-tight tracking-tight md:text-5xl">
          Free tone generator: play any frequency 20Hz–20kHz
        </h1>
        <p className="mt-4 text-lg leading-8 text-slate-300">
          Dial any frequency and play it instantly — <strong className="text-white">165Hz water eject</strong>,
          bass tests, speaker checks, or synth experiments. Sine, triangle, square and saw waves,
          free in your browser.
        </p>

        <div className="mt-8">
          <ToneGenerator />
        </div>

        <div className="prose-dark mt-8">
          <h2>How to use the tone generator</h2>
          <ol>
            <li><strong>Drag the slider or type an exact frequency.</strong> The slider is logarithmic, like human hearing — small moves at the bass end, big moves at the top.</li>
            <li><strong>Pick a waveform.</strong> Sine for smooth tones (testing, cleaning). Square/saw for harsh buzzy tones (keep the level lower).</li>
            <li><strong>Set the output level, then press Play.</strong> Start low on unfamiliar or very high frequencies.</li>
            <li><strong>Use a preset for common jobs:</strong> 165Hz for water eject, 55Hz for bass/rattle checks, 8kHz to probe the dusty high end.</li>
          </ol>

          <h2>Popular frequencies and what they are good for</h2>
          <ul>
            <li><strong>55Hz — bass &amp; rattle test.</strong> Moves the driver hardest. Buzzing here means a loose case, screen protector, or lint in the grille.</li>
            <li><strong>165Hz — water eject.</strong> The classic ejection frequency: deep enough to throw droplets off the mesh, clean enough for a phone speaker to reproduce.</li>
            <li><strong>300Hz — upper eject sweep.</strong> Catches finer droplets higher in the mesh. Alternating 165 ⇄ 300Hz covers both depths.</li>
            <li><strong>440Hz — pitch reference.</strong> Concert A. Handy for tuning instruments or checking a speaker sounds clean at normal pitch.</li>
            <li><strong>1kHz — clarity check.</strong> The middle of voices and most audio. Distortion here means real trouble.</li>
            <li><strong>8kHz — high-end &amp; dust probe.</strong> Sibilance and air live here. If highs vanished after water or dust, compare before/after cleaning.</li>
          </ul>

          <h2>Water in your speaker? Don&apos;t stop at one tone</h2>
          <p>
            A single 165Hz tone helps, but an alternating sweep with vibration clears more water —
            that is exactly what our <Link href="/tools/water-eject-sound">guided water-eject tones</Link> run,
            and what the WaterDrop app automates with AirPods and earpiece programs. After ejecting,
            confirm the fix with our <Link href="/tools/speaker-test">free left/right speaker test</Link>.
          </p>
        </div>

        <div className="mt-10 overflow-hidden rounded-3xl border border-cyan-400/25 bg-gradient-to-br from-abyss to-deep p-8 text-center shadow-glow">
          <Image src="/assets/icon.jpg" alt="WaterDrop app icon" width={72} height={72} className="mx-auto rounded-3xl" />
          <h2 className="!mb-2 !mt-4 text-2xl font-black text-white">Ejecting water? Let the app do it properly.</h2>
          <p className="mx-auto max-w-md text-sm leading-6 text-slate-300">
            Alternating sweeps with vibration, AirPods + earpiece programs, dust cleaning, dB meter and
            15+ tests. 4.3★ rated.
          </p>
          <a href={APP_STORE_URL} target="_blank" rel="noopener" className="mt-5 inline-flex items-center gap-2 rounded-2xl bg-white px-7 py-4 font-bold text-black hover:-translate-y-0.5">
            <AppleMark size={22} /> Get the app
          </a>
        </div>

        <h2 className="mb-4 mt-12 text-2xl font-extrabold text-white">Tone generator questions, answered</h2>
        <div className="space-y-3">
          {TOOL_FAQS.map((f) => (
            <details key={f.q} className="glass rounded-2xl px-5 py-4">
              <summary className="flex cursor-pointer items-center justify-between gap-4 font-semibold text-white">
                {f.q}<span className="faq-chevron text-cyan-300">▾</span>
              </summary>
              <p className="mt-3 text-sm leading-7 text-slate-300">{f.a}</p>
            </details>
          ))}
        </div>

        <h2 className="mb-4 mt-12 text-2xl font-extrabold text-white">Deeper fixes</h2>
        <div className="grid gap-3 sm:grid-cols-3">
          {related.map((r) => (
            <Link key={r.slug} href={`/guides/${r.slug}`} className="rounded-2xl border border-white/10 bg-white/5 p-5 transition hover:border-cyan-400/50">
              <div className="text-2xl">{r.emoji}</div>
              <p className="mt-2 text-sm font-bold leading-snug text-white">{r.title}</p>
              <p className="mt-2 text-xs font-semibold text-cyan-300">Read →</p>
            </Link>
          ))}
        </div>

        <p className="mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-center">
          <Link href="/tools/water-eject-sound" className="text-sm font-semibold text-cyan-300 underline underline-offset-4 hover:text-cyan-200">
            Play water-eject tones →
          </Link>
          <Link href="/tools/speaker-test" className="text-sm font-semibold text-cyan-300 underline underline-offset-4 hover:text-cyan-200">
            Test your speaker →
          </Link>
          <Link href="/" className="text-sm font-semibold text-slate-400 underline underline-offset-4 hover:text-cyan-300">
            ← Back to WaterDrop home
          </Link>
        </p>
      </article>

      <footer className="border-t border-white/10 py-6 text-center text-xs text-slate-500">
        © {new Date().getFullYear()} Zion Studios LLC · <Link href="/" className="hover:text-cyan-300">WaterDrop</Link>
      </footer>
    </main>
  );
}
