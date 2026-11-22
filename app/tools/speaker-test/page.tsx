import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import SpeakerTestPlayer from "@/components/SpeakerTestPlayer";
import AppleMark from "@/components/AppleMark";
import SiteHeader from "@/components/SiteHeader";
import { APP_STORE_URL, GUIDES, SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Free Online Speaker Test: Left/Right, Bass & Frequency (iPhone & AirPods)",
  description:
    "Test your speaker free in your browser — left/right channel check, stereo pan sweep, frequency sweep and bass rattle test. Works for iPhone speakers, AirPods and earbuds. No download.",
  keywords: [
    "iphone speaker test",
    "phone speaker test",
    "speaker test online",
    "left right speaker test",
    "airpods speaker test",
    "one airpod quieter test",
    "bass test speaker",
    "frequency sweep test",
    "earpiece speaker test",
  ],
  alternates: { canonical: "/tools/speaker-test" },
  openGraph: {
    type: "website",
    url: `${SITE_URL}/tools/speaker-test`,
    title: "Free Online Speaker Test: Left/Right, Bass & Frequency",
    description:
      "Is one side quiet? Buzzing or rattling? Run a free left/right, frequency and bass test right in your browser.",
    images: [{ url: "/assets/screenshot-1.png", width: 392, height: 696, alt: "Speaker test tool" }],
  },
};

const TOOL_FAQS = [
  {
    q: "How do I test if my left or right speaker is working?",
    a: "Run the Left only test, then the Right only test above with both earbuds in (or hold the phone normally for the loudspeaker). If one side is silent, much quieter, or distorted, that channel has a blockage or hardware issue — not a settings problem.",
  },
  {
    q: "One AirPod is quieter than the other — how do I confirm it?",
    a: "Put both AirPods in and run the L ⇄ R sweep. A healthy pair sounds evenly loud as the tone pans across. If one side dips, check Settings > Accessibility > Audio Balance first, then clean the quiet bud's mesh and run a water-eject cycle — water hits one bud harder than the other.",
  },
  {
    q: "What does the frequency sweep tell me?",
    a: "It glides from 100Hz to 8kHz. Listen for rattling, buzzing, or dropouts at specific pitches — those mark a dirty mesh, a loose screen protector vibrating, or driver damage. Note the pitch where it sounds wrong; that detail helps support diagnose it fast.",
  },
  {
    q: "Why does my speaker rattle on bass?",
    a: "Bass moves the diaphragm the most, so any loose part — a case edge, screen protector, pocket lint in the grille — buzzes along. Run the bass test with the case off. If the rattle stops, it was the case. If it persists at one pitch only, the mesh is likely clogged.",
  },
  {
    q: "I just ejected water — how do I know it worked?",
    a: "Run the Left/Right sweep plus the frequency sweep before and after ejecting, at identical volume. Clearer highs and even L/R balance mean the water is out. The WaterDrop app automates this with a free dB meter and 15+ tests so you get numbers, not guesses.",
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
    { "@type": "ListItem", position: 3, name: "Speaker test", item: `${SITE_URL}/tools/speaker-test` },
  ],
};

export default function SpeakerTestPage() {
  const related = GUIDES.filter((g) =>
    ["airpods-one-side-quiet-after-water", "how-to-get-water-out-of-iphone-speaker", "decibel-meter-speaker-test"].includes(g.slug)
  );

  return (
    <main className="min-h-screen">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />

      <SiteHeader
        links={[
          { href: "/guides", label: "All guides" },
          { href: "/tools/water-eject-sound", label: "Water eject tones" },
          { href: "/guides/airpods-one-side-quiet-after-water", label: "One AirPod quiet?" },
          { href: "/guides/how-to-get-water-out-of-iphone-speaker", label: "iPhone fix" },
        ]}
      />

      <article className="mx-auto max-w-3xl px-4 pb-20 pt-10">
        <nav className="text-xs text-slate-400" aria-label="Breadcrumb">
          <Link href="/" className="hover:text-cyan-300">Home</Link> <span className="mx-1">/</span>
          <span className="text-slate-200">Free speaker test</span>
        </nav>

        <p className="mt-6 inline-flex items-center gap-2 rounded-full border border-cyan-400/30 bg-cyan-400/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-cyan-300">
          🎧 Free online tool · No download
        </p>
        <h1 className="mt-4 text-3xl font-black leading-tight tracking-tight md:text-5xl">
          Free speaker test: left/right, bass &amp; frequency
        </h1>
        <p className="mt-4 text-lg leading-8 text-slate-300">
          One side quiet? Buzzing on bass? Run a speaker test right here —{" "}
          <strong className="text-white">volume to 70–100%</strong>, wear both earbuds for
          channel tests, and compare. Free, no signup, works for iPhone speakers, AirPods and earbuds.
        </p>

        <div className="mt-8">
          <SpeakerTestPlayer />
        </div>

        <div className="prose-dark mt-8">
          <h2>How to test your speaker in 2 minutes</h2>
          <ol>
            <li><strong>Disconnect extras, keep one output.</strong> If testing the iPhone loudspeaker, disconnect Bluetooth. If testing AirPods, put both buds in.</li>
            <li><strong>Run Left only, then Right only.</strong> Both sides should sound equally loud. A big imbalance means blockage, balance settings, or a dying driver.</li>
            <li><strong>Run the L ⇄ R sweep.</strong> The tone should glide smoothly — dips or jumps mark the exact side with the problem.</li>
            <li><strong>Run the frequency sweep.</strong> Note any pitch where it rattles, buzzes, or cuts out.</li>
            <li><strong>Run the bass test with the case off.</strong> If the rattle disappears, your case was the culprit — not the speaker.</li>
          </ol>

          <h2>What your results mean</h2>
          <p>
            <strong>One side quiet:</strong> first check <strong>Settings → Accessibility → Audio/Visual → Balance</strong>
            on iPhone — a slider knocked to one side fakes a hardware fault. Balance centered but still quiet? The mesh
            on that side is clogged with wax, water, or lint.
          </p>
          <p>
            <strong>Rattle on bass only:</strong> usually something vibrating <em>near</em> the speaker — case edge,
            screen protector, lint in the grille. Test naked (case off, grille wiped). Persistent rattle at every pitch
            points to driver damage, which no tone can fix.
          </p>
          <p>
            <strong>Muffled everywhere after water:</strong> water is clinging to the mesh. Run the{" "}
            <Link href="/tools/water-eject-sound">free water-eject tones</Link>, then re-test here — the
            before/after difference is your proof the fix worked.
          </p>

          <h2>Test on iPhone vs. AirPods vs. earpiece</h2>
          <ul>
            <li><strong>iPhone loudspeaker:</strong> hold the phone normally, bottom grille facing you. Expect strong bass; thin sound means a blocked grille.</li>
            <li><strong>AirPods / earbuds:</strong> wear both, run the channel tests. AirPods each have their own driver, so L/R imbalance is common — and usually just wax or water in one mesh.</li>
            <li><strong>Earpiece (calls):</strong> hold the phone to your ear like a call and run the frequency sweep quietly. If calls are quiet but speakerphone is loud, the earpiece slit is clogged.</li>
          </ul>
        </div>

        <div className="mt-10 overflow-hidden rounded-3xl border border-cyan-400/25 bg-gradient-to-br from-abyss to-deep p-8 text-center shadow-glow">
          <Image src="/assets/icon.jpg" alt="WaterDrop app icon" width={72} height={72} className="mx-auto rounded-3xl" />
          <h2 className="!mb-2 !mt-4 text-2xl font-black text-white">Found a problem? The app fixes it.</h2>
          <p className="mx-auto max-w-md text-sm leading-6 text-slate-300">
            Alternating water-eject sweeps with vibration, AirPods + earpiece programs, dust cleaning, dB meter and
            15+ tests. 4.3★ rated.
          </p>
          <a href={APP_STORE_URL} target="_blank" rel="noopener" className="mt-5 inline-flex items-center gap-2 rounded-2xl bg-white px-7 py-4 font-bold text-black hover:-translate-y-0.5">
            <AppleMark size={22} /> Get the app
          </a>
        </div>

        <h2 className="mb-4 mt-12 text-2xl font-extrabold text-white">Speaker test questions, answered</h2>
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
          <Link href="/tools/tone-generator" className="text-sm font-semibold text-cyan-300 underline underline-offset-4 hover:text-cyan-200">
            Open tone generator →
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
