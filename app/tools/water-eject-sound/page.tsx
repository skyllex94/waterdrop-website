import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import FrequencyPlayer from "@/components/FrequencyPlayer";
import AppleMark from "@/components/AppleMark";
import { APP_STORE_URL, GUIDES, SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Free Water Eject Sound: 165Hz & 300Hz Tones (Play Online)",
  description:
    "Play free water eject sounds right in your browser — 165Hz bass, 300Hz sweep, or alternating, with a 60-second timer. Push water out of your iPhone speaker with no download.",
  keywords: [
    "water eject sound",
    "165hz water eject",
    "300hz water eject",
    "play water eject sound",
    "fix my speaker online",
    "speaker cleaner sound",
    "eject water sound",
  ],
  alternates: { canonical: "/tools/water-eject-sound" },
  openGraph: {
    type: "website",
    url: `${SITE_URL}/tools/water-eject-sound`,
    title: "Free Water Eject Sound: 165Hz & 300Hz Tones",
    description:
      "Push water out of your speaker right from your browser. Pick 165Hz, 300Hz, or alternating — free, no download.",
    images: [{ url: "/assets/screenshot-1.png", width: 392, height: 696, alt: "Water eject tone player" }],
  },
};

const TOOL_FAQS = [
  {
    q: "Is it safe to play 165Hz or 300Hz through my speaker?",
    a: "Yes. These tones play at normal loudness within your speaker's operating range — no louder than max-volume music, just tuned to vibrate more. Run them in short sessions (30–120 seconds), not for hours.",
  },
  {
    q: "165Hz or 300Hz — which ejects water better?",
    a: "165Hz is the classic deep ejection tone that moves the most air. 300Hz catches finer droplets higher in the mesh. Alternating between them covers both, which is why it's the default here — and exactly what the WaterDrop app automates with vibration added.",
  },
  {
    q: "How long should I play the water eject sound?",
    a: "Start with 60 seconds, wipe the grille, and repeat 2–3 times. Light splashes often clear in one round; a full dunk needs several rounds plus air-drying time.",
  },
  {
    q: "Why use the app instead of this free player?",
    a: "This player is one clean tone through your browser. The app adds alternating sweeps with vibration assist, dedicated AirPods and earpiece programs, a decibel meter, and 15+ sound tests to prove the fix — plus it holds max output steadier than a browser tab.",
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

export default function WaterEjectSoundPage() {
  const related = GUIDES.filter((g) =>
    ["how-to-get-water-out-of-iphone-speaker", "how-to-get-water-out-of-airpods", "dropped-iphone-in-water-speaker-muffled"].includes(g.slug)
  );

  return (
    <main className="min-h-screen">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />

      <header className="sticky top-0 z-50 border-b border-white/10 bg-deep/85 backdrop-blur-xl">
        <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
          <Link href="/" className="flex items-center gap-2.5">
            <Image src="/assets/icon.jpg" alt="WaterDrop app icon" width={36} height={36} className="rounded-xl" />
            <span className="font-extrabold">Water<span className="text-gradient">Drop</span></span>
          </Link>
          <div className="flex items-center gap-3">
            <Link href="/#guides" className="hidden text-sm text-slate-300 hover:text-white sm:block">All guides</Link>
            <a href={APP_STORE_URL} target="_blank" rel="noopener" className="rounded-xl bg-cyan-400 px-4 py-2 text-sm font-bold text-deep hover:bg-cyan-300">
              Get the app
            </a>
          </div>
        </nav>
      </header>

      <article className="mx-auto max-w-3xl px-4 pb-20 pt-10">
        <nav className="text-xs text-slate-400" aria-label="Breadcrumb">
          <Link href="/" className="hover:text-cyan-300">Home</Link> <span className="mx-1">/</span>
          <span className="text-slate-200">Free water eject sounds</span>
        </nav>

        <p className="mt-6 inline-flex items-center gap-2 rounded-full border border-cyan-400/30 bg-cyan-400/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-cyan-300">
          🔊 Free online tool · No download
        </p>
        <h1 className="mt-4 text-3xl font-black leading-tight tracking-tight md:text-5xl">
          Free water eject sounds: 165Hz &amp; 300Hz tones
        </h1>
        <p className="mt-4 text-lg leading-8 text-slate-300">
          Speaker sounds underwater and you need it fixed <em>right now</em>? Play an ejection
          tone below — <strong className="text-white">volume to max, speaker facing down</strong> —
          and let vibration shake the droplets out of the mesh. Free, right here in your browser.
        </p>

        <div className="mt-8">
          <FrequencyPlayer />
        </div>

        <div className="prose-dark mt-8">
          <h2>How to use these tones (60 seconds to clear sound)</h2>
          <ol>
            <li><strong>Disconnect Bluetooth</strong> so the tone plays through the phone speakers, not your earbuds.</li>
            <li><strong>Volume to 100%.</strong> Louder means stronger vibration, which means more water out.</li>
            <li><strong>Lay the phone speaker-down</strong> on a cloth so gravity helps droplets fall out.</li>
            <li><strong>Pick alternating 165 ⇄ 300 Hz and 60 seconds</strong>, press play, and watch the grille — you&apos;ll often see tiny droplets creep out.</li>
            <li><strong>Wipe and repeat 2–3 times</strong>, then test with music. Still dull? Let it air-dry and run another round.</li>
          </ol>

          <h2>165Hz vs 300Hz: what&apos;s the difference?</h2>
          <p>
            <strong>165Hz</strong> is the internet-famous ejection frequency — deep bass that moves
            the maximum amount of air through the speaker grille. It&apos;s the same tone behind the
            Siri Water Eject shortcut and most &quot;fix my speaker&quot; websites.
          </p>
          <p>
            <strong>300Hz</strong> sits higher: less rumble, but better at shaking fine droplets
            clinging to the upper mesh. <strong>Alternating between the two</strong> hits both
            depths, which is why researchers and the best eject apps use sweeps instead of a single
            flat tone. If you only try one thing here, try alternating.
          </p>

          <h2>What these free tones can&apos;t do</h2>
          <ul>
            <li><strong>AirPods:</strong> tiny drivers need gentler fine-speaker tuning — a raw 165Hz blast is the wrong tool. Use the app&apos;s AirPods program instead.</li>
            <li><strong>Earpiece:</strong> the call speaker needs its own focused frequency, not the main-speaker tone.</li>
            <li><strong>Proof:</strong> this page can&apos;t measure anything. The app&apos;s free decibel meter + 15 sound tests show you before-and-after numbers.</li>
            <li><strong>Hardware damage:</strong> no sound fixes a fried board, a dead mic, or a phone that won&apos;t charge. Tones clear mesh water — that&apos;s it.</li>
          </ul>
        </div>

        <div className="mt-10 overflow-hidden rounded-3xl border border-cyan-400/25 bg-gradient-to-br from-abyss to-deep p-8 text-center shadow-glow">
          <Image src="/assets/icon.jpg" alt="WaterDrop app icon" width={72} height={72} className="mx-auto rounded-3xl" />
          <h2 className="!mb-2 !mt-4 text-2xl font-black text-white">Tone helped? The app finishes the job.</h2>
          <p className="mx-auto max-w-md text-sm leading-6 text-slate-300">
            Alternating sweeps with vibration, AirPods + earpiece modes, dust cleaning, dB meter and
            15+ tests. 4.3★ rated.
          </p>
          <a href={APP_STORE_URL} target="_blank" rel="noopener" className="mt-5 inline-flex items-center gap-2 rounded-2xl bg-white px-7 py-4 font-bold text-black hover:-translate-y-0.5">
            <AppleMark size={22} /> Get the app
          </a>
        </div>

        <h2 className="mb-4 mt-12 text-2xl font-extrabold text-white">Tone questions, answered</h2>
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

        <p className="mt-10 text-center">
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
