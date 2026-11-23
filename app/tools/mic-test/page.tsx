import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import MicTestPlayer from "@/components/MicTestPlayer";
import AppleMark from "@/components/AppleMark";
import SiteHeader from "@/components/SiteHeader";
import { APP_STORE_URL, GUIDES, SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Free Online Mic Test: iPhone & AirPods Microphone Test (No Download)",
  description:
    "Test your microphone free in your browser — live level meter, waveform, automatic verdict and 5-second playback. Works for iPhone mics and AirPods. Nothing uploaded.",
  keywords: [
    "test my microphone",
    "iphone mic test",
    "mic test online",
    "airpods mic not working",
    "microphone test iphone",
    "caller can't hear me",
    "test mic online",
    "bluetooth mic test",
  ],
  alternates: { canonical: "/tools/mic-test" },
  openGraph: {
    type: "website",
    url: `${SITE_URL}/tools/mic-test`,
    title: "Free Online Mic Test: iPhone & AirPods",
    description:
      "Caller can't hear you? Check your mic in seconds — live meter, verdict and playback. Free, private, no download.",
    images: [{ url: "/assets/screenshot-1.png", width: 392, height: 696, alt: "Microphone test tool" }],
  },
};

const TOOL_FAQS = [
  {
    q: "How do I test my iPhone microphone?",
    a: "Press Start mic test above and allow access, then speak normally for a few seconds. The meter shows your live level and gives a verdict: working, weak, or clipping. Record the 5-second clip and play it back with earbuds in — that is exactly how you sound to callers.",
  },
  {
    q: "People can't hear me on calls but I hear them — is it the mic?",
    a: "Almost always, yes: hearing them uses your speaker, being heard uses your mic — different hardware. If this test shows no signal while your speaker test plays fine, the mic path is blocked: check the mic hole for lint, confirm no Bluetooth device stole the input, and restart the phone.",
  },
  {
    q: "My AirPods mic is not working on calls. How do I check it?",
    a: "Put your AirPods in, open this page, start the test, and pick your AirPods in the microphone picker if it appears. Speak — if the meter moves, the buds' mic works and the problem is call settings (try Settings > Bluetooth > your AirPods > Microphone > Automatic). If nothing moves, clean the mic holes and re-pair the buds.",
  },
  {
    q: "My mic stopped working after water exposure. Can a sound fix it?",
    a: "Honestly: no. Water-eject tones move water out of speaker meshes, but a microphone is an input — playing sound through it does not dry it. Power the phone off, let it air-dry 24–48 hours (no rice, no heat), then re-test here. If it is still dead after two dry days, that is hardware damage and needs service.",
  },
  {
    q: "Is this mic test private? Where does my voice go?",
    a: "Nowhere. The level meter, waveform and recording are computed inside this browser tab and deleted when you leave. No audio is uploaded, streamed, or stored on any server — if you record a clip, it lives only in your tab's memory.",
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
    { "@type": "ListItem", position: 3, name: "Mic test", item: `${SITE_URL}/tools/mic-test` },
  ],
};

export default function MicTestPage() {
  const related = GUIDES.filter((g) =>
    ["how-to-get-water-out-of-airpods", "dropped-iphone-in-water-speaker-muffled", "decibel-meter-speaker-test"].includes(g.slug)
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
          <span className="text-slate-200">Free mic test</span>
        </nav>

        <p className="mt-6 inline-flex items-center gap-2 rounded-full border border-cyan-400/30 bg-cyan-400/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-cyan-300">
          🎤 Free online tool · Private · No download
        </p>
        <h1 className="mt-4 text-3xl font-black leading-tight tracking-tight md:text-5xl">
          Free mic test: check your iPhone &amp; AirPods microphone
        </h1>
        <p className="mt-4 text-lg leading-8 text-slate-300">
          Caller can&apos;t hear you? Test your mic right here —{" "}
          <strong className="text-white">live level meter, waveform, automatic verdict</strong>{" "}
          and a 5-second playback clip. Works for iPhone mics and AirPods. Nothing is uploaded, ever.
        </p>

        <div className="mt-8">
          <MicTestPlayer />
        </div>

        <div className="prose-dark mt-8">
          <h2>How to test your mic in 30 seconds</h2>
          <ol>
            <li><strong>Press Start mic test and allow access.</strong> Use Safari on iPhone — it has the fullest mic support. If you blocked access before, tap the lock icon in the address bar and set Microphone to Allow.</li>
            <li><strong>Speak normally for a few seconds.</strong> Watch the meter: healthy speech dances between −30 and −10 dB. Flat line means no signal; pinned red means clipping.</li>
            <li><strong>Record the 5-second clip and play it back with earbuds in.</strong> Listen for muffling, hiss, or cutouts — that is what your callers hear.</li>
            <li><strong>Testing AirPods?</strong> Put them in first, then pick them in the microphone picker if one appears. Test one bud at a time by wearing a single AirPod.</li>
          </ol>

          <h2>What your result means</h2>
          <p>
            <strong>No signal, but speakers play fine:</strong> the mic path is blocked or hijacked.
            Check the mic hole for lint, make sure no Bluetooth speaker grabbed the input, and confirm
            the app you use (Phone, WhatsApp, Zoom) has microphone permission in Settings.
          </p>
          <p>
            <strong>Weak or muffled:</strong> usually a clogged mic hole or a case covering it. Remove
            the case, brush the hole gently with a dry soft brush, and re-test. After water exposure,
            give it 24–48 hours of air-drying — mic membranes dry slower than speaker meshes.
          </p>
          <p>
            <strong>Clipping at normal distance:</strong> move back from the mic or lower input volume.
            Constant distortion even when quiet points to a damaged mic, not settings.
          </p>
          <p>
            <strong>Works here but not in calls:</strong> the hardware is fine — the calling app&apos;s
            audio route is wrong. On AirPods, check <strong>Settings → Bluetooth → your AirPods →
            Microphone</strong> (Automatic is usually best), and make sure calls aren&apos;t routing
            to a car or speaker.
          </p>

          <h2>Mic vs. speaker: which one is broken?</h2>
          <ul>
            <li><strong>They hear you, you can&apos;t hear them</strong> → speaker/earpiece problem. Run our <Link href="/tools/speaker-test">free speaker test</Link>.</li>
            <li><strong>You hear them, they can&apos;t hear you</strong> → microphone problem. You are in the right place.</li>
            <li><strong>Neither direction works</strong> → Bluetooth routing or a dead audio path. Disconnect Bluetooth entirely and re-test both tools.</li>
            <li><strong>Muffled sound after water</strong> → speaker mesh water. Play our <Link href="/tools/water-eject-sound">free water-eject tones</Link>, then verify with the speaker test.</li>
          </ul>
        </div>

        <div className="mt-10 overflow-hidden rounded-3xl border border-cyan-400/25 bg-gradient-to-br from-abyss to-deep p-8 text-center shadow-glow">
          <Image src="/assets/icon.jpg" alt="WaterDrop app icon" width={72} height={72} className="mx-auto rounded-3xl" />
          <h2 className="!mb-2 !mt-4 text-2xl font-black text-white">Speaker problems? The app fixes those.</h2>
          <p className="mx-auto max-w-md text-sm leading-6 text-slate-300">
            Alternating water-eject sweeps with vibration, AirPods + earpiece programs, dust cleaning,
            dB meter and 15+ tests. 4.3★ rated.
          </p>
          <a href={APP_STORE_URL} target="_blank" rel="noopener" className="mt-5 inline-flex items-center gap-2 rounded-2xl bg-white px-7 py-4 font-bold text-black hover:-translate-y-0.5">
            <AppleMark size={22} /> Get the app
          </a>
        </div>

        <h2 className="mb-4 mt-12 text-2xl font-extrabold text-white">Mic test questions, answered</h2>
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
            Play water-eject tones →
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
