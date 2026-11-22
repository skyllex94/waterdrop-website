import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import DecibelMeter from "@/components/DecibelMeter";
import AppleMark from "@/components/AppleMark";
import SiteHeader from "@/components/SiteHeader";
import { APP_STORE_URL, GUIDES, SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Free Online Decibel Meter: Measure Speaker Loudness (dB)",
  description:
    "Measure how loud your speaker really is — free online dB meter with peak hold and before/after baseline comparison. Prove your water eject worked. Nothing uploaded.",
  keywords: [
    "decibel meter online",
    "measure speaker loudness",
    "how loud is my speaker",
    "db meter online",
    "iphone decibel meter",
    "speaker loudness test",
    "sound level meter",
  ],
  alternates: { canonical: "/tools/decibel-meter" },
  openGraph: {
    type: "website",
    url: `${SITE_URL}/tools/decibel-meter`,
    title: "Free Online Decibel Meter: Prove Your Speaker Is Fixed",
    description:
      "Measure speaker loudness before and after ejecting water — see the dB difference. Free, private, no download.",
    images: [{ url: "/assets/screenshot-1.png", width: 392, height: 696, alt: "Decibel meter tool" }],
  },
};

const TOOL_FAQS = [
  {
    q: "How accurate is an online decibel meter?",
    a: "Approximate (±5–10 dB) for absolute values, because phone microphones are not lab-calibrated. But back-to-back comparisons on the same phone at the same distance are genuinely valid — if your speaker reads 6 dB higher after ejecting water, it really is audibly louder. Use this tool for before/after proof, not for legal noise measurements.",
  },
  {
    q: "How do I prove my water eject worked with this?",
    a: "Play the same test tone (from our free speaker test) at the same volume, holding the measuring phone 30cm away. Tap Save as baseline, run your water-eject tones, then measure again. A rise of 3+ dB means clearly audible improvement — 6–10 dB sounds roughly twice as loud.",
  },
  {
    q: "What dB should my iPhone speaker reach?",
    a: "An iPhone loudspeaker at max volume, measured from 30cm, typically reads roughly 85–100 dB on a real meter. This tool reads a little lower or higher depending on your measuring phone's mic — what matters is the gap between your before and after readings, not the absolute number.",
  },
  {
    q: "Why does the reading jump around?",
    a: "Real sound fluctuates, and the meter reacts fast on purpose. Play a steady tone (not music) for the most stable number, keep the room quiet, hold the measuring phone still, and watch the MAX hold value — that is your most repeatable figure.",
  },
  {
    q: "Does this work for AirPods too?",
    a: "Yes — play the test tone through one AirPod held near the measuring phone's mic at a fixed distance. It is the easiest way to prove one bud is quieter than the other with numbers instead of guesses.",
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
    { "@type": "ListItem", position: 3, name: "Decibel meter", item: `${SITE_URL}/tools/decibel-meter` },
  ],
};

export default function DecibelMeterPage() {
  const related = GUIDES.filter((g) =>
    ["decibel-meter-speaker-test", "how-to-get-water-out-of-iphone-speaker", "how-to-clean-iphone-speaker-dust"].includes(g.slug)
  );

  return (
    <main className="min-h-screen">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />

      <SiteHeader
        links={[
          { href: "/guides", label: "All guides" },
          { href: "/tools/water-eject-sound", label: "Water eject tones" },
          { href: "/tools/speaker-test", label: "Speaker test" },
        ]}
      />

      <article className="mx-auto max-w-3xl px-4 pb-20 pt-10">
        <nav className="text-xs text-slate-400" aria-label="Breadcrumb">
          <Link href="/" className="hover:text-cyan-300">Home</Link> <span className="mx-1">/</span>
          <span className="text-slate-200">Free decibel meter</span>
        </nav>

        <p className="mt-6 inline-flex items-center gap-2 rounded-full border border-cyan-400/30 bg-cyan-400/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-cyan-300">
          📊 Free online tool · Private · No download
        </p>
        <h1 className="mt-4 text-3xl font-black leading-tight tracking-tight md:text-5xl">
          Free decibel meter: measure your speaker in dB
        </h1>
        <p className="mt-4 text-lg leading-8 text-slate-300">
          Wondering if your speaker is <em>actually</em> fixed? Measure it —{" "}
          <strong className="text-white">live dB readout, peak hold, and a baseline mode</strong>{" "}
          that shows your before/after difference in numbers. Fully private, nothing uploaded.
        </p>

        <div className="mt-8">
          <DecibelMeter />
        </div>

        <div className="prose-dark mt-8">
          <h2>The 2-minute before/after proof protocol</h2>
          <ol>
            <li><strong>Set up once, change nothing.</strong> Use a second phone (or laptop) for this meter. Play a steady tone — e.g. 1kHz from our <Link href="/tools/tone-generator">tone generator</Link> — on the phone you are testing, at max volume.</li>
            <li><strong>Fix the distance at 30cm.</strong> Hold the measuring phone 30cm from the speaker, same angle both times. Distance changes readings more than anything else.</li>
            <li><strong>Tap Save as baseline.</strong> Note the number with the speaker still muffled.</li>
            <li><strong>Run the fix.</strong> Play our <Link href="/tools/water-eject-sound">water-eject tones</Link> (or clean the grille), then measure again without moving anything.</li>
            <li><strong>Read the delta.</strong> +3 dB is clearly audible, +6–10 dB sounds roughly twice as loud. No rise after 3 cycles means the mesh needs drying time — or the damage isn&apos;t water.</li>
          </ol>

          <h2>What the numbers mean</h2>
          <ul>
            <li><strong>~30 dB</strong> — whisper / quiet bedroom. Your baseline room floor.</li>
            <li><strong>~60 dB</strong> — normal conversation. A healthy earpiece on a call lands near here.</li>
            <li><strong>~85 dB</strong> — loud traffic. A healthy phone loudspeaker easily passes this at 30cm.</li>
            <li><strong>~110 dB</strong> — concert front row. Uncomfortable — don&apos;t hold the meter (or your ears) this close for long.</li>
          </ul>

          <h2>Why your speaker got quieter in the first place</h2>
          <p>
            Water clinging to the mesh and dust packed into the grille both force the driver to work
            against resistance — output drops and highs vanish first. Ejection tones shake the
            blockage loose; the meter above tells you whether it worked. For the full story, read our
            guide on <Link href="/guides/decibel-meter-speaker-test">decibel testing your speaker</Link>.
          </p>
        </div>

        <div className="mt-10 overflow-hidden rounded-3xl border border-cyan-400/25 bg-gradient-to-br from-abyss to-deep p-8 text-center shadow-glow">
          <Image src="/assets/icon.jpg" alt="WaterDrop app icon" width={72} height={72} className="mx-auto rounded-3xl" />
          <h2 className="!mb-2 !mt-4 text-2xl font-black text-white">Want the meter built into the fix?</h2>
          <p className="mx-auto max-w-md text-sm leading-6 text-slate-300">
            WaterDrop pairs alternating eject sweeps with a free dB meter and 15+ sound tests, so
            every cleaning ends with proof. 4.3★ rated.
          </p>
          <a href={APP_STORE_URL} target="_blank" rel="noopener" className="mt-5 inline-flex items-center gap-2 rounded-2xl bg-white px-7 py-4 font-bold text-black hover:-translate-y-0.5">
            <AppleMark size={22} /> Get the app
          </a>
        </div>

        <h2 className="mb-4 mt-12 text-2xl font-extrabold text-white">Decibel meter questions, answered</h2>
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
          <Link href="/tools/speaker-test" className="text-sm font-semibold text-cyan-300 underline underline-offset-4 hover:text-cyan-200">
            Test your speaker →
          </Link>
          <Link href="/tools/mic-test" className="text-sm font-semibold text-cyan-300 underline underline-offset-4 hover:text-cyan-200">
            Test your mic →
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
