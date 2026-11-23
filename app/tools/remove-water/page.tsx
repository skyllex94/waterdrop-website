import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import WaterRemovalWizard from "@/components/WaterRemovalWizard";
import AppleMark from "@/components/AppleMark";
import SiteHeader from "@/components/SiteHeader";
import { APP_STORE_URL, GUIDES, SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Remove Water From Speaker: Free Guided Eject Tool (iPhone, AirPods, Android)",
  description:
    "Water in your speaker? Pick your device and issue — get a tailored alternating-frequency eject program for iPhone, AirPods, iPad, Samsung or Android. Free, no download.",
  keywords: [
    "remove water from speaker",
    "eject water from phone",
    "remove water from iphone speaker",
    "water eject android",
    "samsung water eject",
    "remove water from airpods",
    "phone water eject",
  ],
  alternates: { canonical: "/tools/remove-water" },
  openGraph: {
    type: "website",
    url: `${SITE_URL}/tools/remove-water`,
    title: "Remove Water From Your Speaker — Free Guided Tool",
    description:
      "Pick your device, pick what happened, run a tailored water-eject program. iPhone, AirPods, Samsung & Android.",
    images: [{ url: "/assets/screenshot-1.png", width: 392, height: 696, alt: "Guided water removal tool" }],
  },
};

const TOOL_FAQS = [
  {
    q: "How do I get water out of my phone speaker fast?",
    a: "Pick your device above, pick what happened, and run the tailored program — volume max (70% for AirPods), speaker facing down. Heavy exposure needs the full 60–75 second cycle plus a wipe and a second run; light splashes often clear in one 30–40 second run.",
  },
  {
    q: "Does this work on Samsung and other Android phones?",
    a: "Yes. The wizard has dedicated Samsung and generic Android programs with slightly higher alternating frequencies, since Android speaker chambers vary more than iPhones. The physics is identical — the tone needs no app and no permissions, just your browser.",
  },
  {
    q: "Why alternating frequencies instead of one tone?",
      a: "A single 165Hz tone moves water at one mesh depth. Alternating low and high sweeps covers the full grille: deep pulses push bulk droplets while higher sweeps shake fine mesh residue loose. Pulsing on top breaks the surface tension holding droplets in place. Sweeping also beats a fixed tone across phone models, since each speaker's resonance sits somewhere slightly different — independent tests put sweeps near 90%+ clearance versus ~70% for a fixed tone.",
  },
  {
    q: "What intensity should I choose?",
    a: "Standard for almost everything. Gentle if the sound is harsh on small earbuds or you're in a quiet room. Deep for stubborn water after a wash or pool dunk — it pushes harder but stays within normal speaker operating range. Stop if you hear harsh rattling from a case or screen protector.",
  },
  {
    q: "How do I know the water is actually out?",
    a: "Wipe the grille and play the same song at the same volume — or better, run our free speaker test before and after at identical settings. Clearer highs and even left/right balance mean the mesh is clear. No change after 3 cycles plus drying time points to residue or hardware, not water.",
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

const howToLd = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "How to remove water from your phone speaker",
  description:
    "Pick your device and exposure level, run a tailored alternating-frequency eject cycle, then verify with a speaker test.",
  totalTime: "PT5M",
  step: [
    { "@type": "HowToStep", name: "Pick your device", text: "Choose iPhone, AirPods, iPad, Samsung, or other Android so frequencies match your speaker." },
    { "@type": "HowToStep", name: "Pick what happened", text: "Heavy exposure, light exposure, or muffled sound of unknown cause — each gets a different program." },
    { "@type": "HowToStep", name: "Set up position and volume", text: "Max volume (70% for AirPods), speaker facing down, case off if it covers the grille." },
    { "@type": "HowToStep", name: "Run the cycle", text: "Start the tailored alternating-frequency program and let it finish without touching the phone." },
    { "@type": "HowToStep", name: "Verify with a test", text: "Wipe the grille, then run a left/right speaker test to confirm the fix before repeating." },
  ],
};

const breadcrumbLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
    { "@type": "ListItem", position: 2, name: "Tools", item: `${SITE_URL}/tools/water-eject-sound` },
    { "@type": "ListItem", position: 3, name: "Remove water", item: `${SITE_URL}/tools/remove-water` },
  ],
};

export default function RemoveWaterPage() {
  const related = GUIDES.filter((g) =>
    ["how-to-get-water-out-of-iphone-speaker", "how-to-get-water-out-of-airpods", "dropped-iphone-in-water-speaker-muffled"].includes(g.slug)
  );

  return (
    <main className="min-h-screen">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />

      <SiteHeader
        links={[
          { href: "/guides", label: "Blog" },
          { href: "/tools/water-eject-sound", label: "Single tones" },
          { href: "/tools/speaker-test", label: "Speaker test" },
        ]}
      />

      <article className="mx-auto max-w-3xl px-4 pb-20 pt-10">
        <nav className="text-xs text-slate-400" aria-label="Breadcrumb">
          <Link href="/" className="hover:text-cyan-300">Home</Link> <span className="mx-1">/</span>
          <span className="text-slate-200">Remove water from speaker</span>
        </nav>

        <h1 className="mt-6 text-3xl font-black leading-tight tracking-tight md:text-5xl">
          Remove water from your speaker in one tap
        </h1>
        <p className="mt-4 text-lg leading-8 text-slate-300">
          Answer two questions — <strong className="text-white">your device, what happened</strong> —
          and get a water-eject program tuned for exactly that situation. Free, right here in your browser.
        </p>

        <div className="mt-8">
          <WaterRemovalWizard />
        </div>

        <div className="prose-dark mt-8">
          <h2>Why one tone doesn&apos;t fit all</h2>
          <p>
            A 165Hz tone is a fine default for an iPhone loudspeaker with light splashes — but AirPods
            drivers are a tenth the size and overdrive on the same tone, iPad chambers resonate lower,
            and mineral residue from pool water ignores the frequency that moves fresh rain just fine.
            The wizard above adjusts four things per situation: the frequency pair, the sound texture,
            the pulse rate, and the run length. Heavy dunks get a deep <strong>rumble</strong>, mystery
            muffle gets a smooth <strong>glide</strong>, dried residue gets <strong>pulsed bursts</strong>,
            and light splashes get the classic <strong>pulse</strong> sweep.
          </p>
          <p>
            The tuning follows what tests best in practice. Phone membranes move furthest at 150–200Hz —
            the same band Apple&apos;s Watch pump uses, confirmed by teardowns — so every heavy program
            lives there instead of wasting energy on sub-bass phone speakers physically can&apos;t reproduce.
            Sweeping beats a fixed tone because each model&apos;s resonance sits somewhere slightly different
            (independent tests put sweeps near 90%+ clearance vs ~70% for fixed tones). And the heavy
            programs pump in burst-and-rest cycles, the way the Watch itself pauses to let water settle,
            because water re-migrates outward during the quiet gaps.
          </p>
          <ul>
            <li><strong>Heavy exposure (washer, pool, dunk):</strong> longer runs, deeper lows, stronger pulsing to move bulk water.</li>
            <li><strong>Light exposure (rain, splash, sweat):</strong> shorter classic sweep — enough to clear the mesh without the wait.</li>
            <li><strong>Muffled, cause unknown:</strong> wide sweep reaching higher frequencies to shake loose dust and dried residue, not just water.</li>
          </ul>

          <h2>Prefer a single manual tone?</h2>
          <p>
            Our <Link href="/tools/water-eject-sound">free 165Hz + 300Hz tone player</Link> gives you
            direct control with a 60-second timer, and the <Link href="/tools/tone-generator">tone
            generator</Link> plays any frequency you dial. The guided tool on this page is the
            fastest path if you just want the right program picked for you.
          </p>

          <h2>Safety: what the program will and won&apos;t do</h2>
          <ul>
            <li><strong>Clears speaker meshes</strong> on phones, tablets, and earbuds — that&apos;s the job.</li>
            <li><strong>Does not dry charging ports.</strong> If your iPhone shows a liquid alert, follow the port-drying routine instead.</li>
            <li><strong>Does not fix hardware.</strong> Distortion at low volume that never changes, or silence after proper runs plus drying, means service — not more tones.</li>
          </ul>
        </div>

        <div className="mt-10 overflow-hidden rounded-3xl border border-cyan-400/25 bg-gradient-to-br from-abyss to-deep p-8 text-center shadow-glow">
          <Image src="/assets/icon.jpg" alt="WaterDrop app icon" width={72} height={72} className="mx-auto rounded-3xl" />
          <h2 className="!mb-2 !mt-4 text-2xl font-black text-white">Want this automatic, with vibration?</h2>
          <p className="mx-auto max-w-md text-sm leading-6 text-slate-300">
            The WaterDrop app adds vibration assist, AirPods + earpiece programs, dust cleaning, a dB
            meter and 15+ tests. 4.3★ rated.
          </p>
          <a href={APP_STORE_URL} target="_blank" rel="noopener" className="mt-5 inline-flex items-center gap-2 rounded-2xl bg-white px-7 py-4 font-bold text-black hover:-translate-y-0.5">
            <AppleMark size={22} /> Get the app
          </a>
        </div>

        <h2 className="mb-4 mt-12 text-2xl font-extrabold text-white">Water removal questions, answered</h2>
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
          <Link href="/tools/water-eject-sound" className="text-sm font-semibold text-cyan-300 underline underline-offset-4 hover:text-cyan-200">
            Play single tones →
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
