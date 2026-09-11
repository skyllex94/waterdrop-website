import Image from "next/image";
import Link from "next/link";
import { APP_STORE_URL, FAQS, GUIDES, SITE_URL } from "@/lib/site";
import ToneDemo from "@/components/ToneDemo";
import SiteHeader from "@/components/SiteHeader";

function Stars() {
  return (
    <span className="inline-flex items-center gap-0.5 text-amber-400" aria-label="Rated 5 out of 5 stars">
      {"★★★★★".split("").map((s, i) => (
        <span key={i}>{s}</span>
      ))}
    </span>
  );
}

function AppStoreButton({ large = false }: { large?: boolean }) {
  return (
    <a
      href={APP_STORE_URL}
      target="_blank"
      rel="noopener"
      className={`group inline-flex items-center justify-center gap-3 rounded-2xl bg-white text-black font-semibold shadow-glow transition hover:-translate-y-0.5 hover:shadow-card ${
        large ? "px-7 py-4 text-lg" : "px-5 py-3 text-base"
      }`}
    >
      <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
        <path d="M17.05 12.54c-.03-2.9 2.37-4.29 2.48-4.36-1.35-1.98-3.46-2.25-4.21-2.28-1.79-.18-3.5 1.06-4.4 1.06-.91 0-2.31-1.03-3.8-1-1.95.03-3.75 1.14-4.76 2.88-2.03 3.53-.52 8.76 1.46 11.63.96 1.39 2.11 2.95 3.62 2.89 1.45-.06 2-.94 3.75-.94s2.25.94 3.78.91c1.56-.03 2.55-1.41 3.5-2.81 1.1-1.61 1.55-3.17 1.58-3.25-.04-.02-3.03-1.16-3-4.73zM14.16 4.06c.8-.97 1.34-2.32 1.19-3.66-1.15.05-2.55.77-3.38 1.74-.74.86-1.39 2.23-1.22 3.55 1.29.1 2.6-.65 3.41-1.63z" />
      </svg>
      <span className="text-left leading-tight">
        <span className="block text-[11px] font-medium uppercase tracking-wide opacity-60">
          Download on the
        </span>
        <span className="block text-xl font-bold -mt-0.5">App Store</span>
      </span>
    </a>
  );
}

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQS.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

export default function Home() {
  return (
    <main className="min-h-screen">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />

      {/* ── NAV ─────────────────────────────── */}
      <SiteHeader
        links={[
          { href: "#how", label: "How it works" },
          { href: "#screenshots", label: "Screenshots" },
          { href: "/tools/water-eject-sound", label: "Free tones" },
          { href: "#guides", label: "Guides" },
          { href: "#faq", label: "FAQ" },
        ]}
      />

      {/* ── HERO ────────────────────────────── */}
      <section className="hero-grid relative overflow-hidden">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 pb-16 pt-14 md:grid-cols-2 md:pt-20">
          <div>
            <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-cyan-400/30 bg-cyan-400/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-cyan-300">
              💧 Water Eject for iPhone &amp; AirPods
            </p>
            <h1 className="text-4xl font-black leading-[1.05] tracking-tight md:text-6xl">
              Get water out of your speaker in{" "}
              <span className="text-gradient">60 seconds</span>
            </h1>
            <p className="mt-5 max-w-xl text-lg leading-8 text-slate-300">
              We&apos;ve all been there — your phone takes a swim, and suddenly every call
              sounds like you&apos;re talking underwater. WaterDrop&apos;s water-eject program
              plays{" "}
              <strong className="text-white">tested alternating frequencies + vibration</strong>{" "}
              that shake trapped water and dust loose from the speaker mesh, so your clear
              sound comes back. Your first run is free, and it takes about a minute.
            </p>
            <div className="mt-6 flex flex-col items-stretch gap-3 sm:flex-row sm:flex-wrap sm:items-center">
              <AppStoreButton large />
              <a href="#how" className="rounded-2xl border border-white/20 px-6 py-4 text-center font-semibold text-white transition hover:border-cyan-400/60 hover:text-cyan-200">
                See how it works ↓
              </a>
            </div>
            <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-slate-300">
              <span className="flex items-center gap-2"><Stars /> <strong className="text-white">4.3/5</strong> · 97 ratings</span>
              <span className="hidden h-4 w-px bg-white/20 sm:block" />
              <span>✅ Free download</span>
              <span>🔒 No data collected</span>
              <span>📱 iOS 15.1+</span>
            </div>
            <p className="mt-4 rounded-xl border border-emerald-400/25 bg-emerald-400/10 p-3 text-sm leading-6 text-emerald-100">
              <strong>“This app saved my AirPods and saved me $250.”</strong> — Devikamohan, washed
              AirPods in the washer. Ran the AirPods program once. Back to normal. ★★★★★
            </p>
          </div>

          <div className="relative mx-auto grid w-full max-w-md grid-cols-3 gap-2 sm:gap-3">
            {["/assets/screenshot-1.png", "/assets/screenshot-2.png", "/assets/screenshot-3.png"].map((s, i) => (
              <div
                key={s}
                className={`overflow-hidden rounded-[1.6rem] border border-white/15 bg-abyss shadow-card ${i === 1 ? "-mt-4 float-slow" : "mt-4"}`}
              >
                <Image
                  src={s}
                  alt={`WaterDrop water eject app screenshot ${i + 1} — frequency program and speaker test`}
                  width={392}
                  height={696}
                  priority={i === 1}
                  className="h-auto w-full"
                />
              </div>
            ))}
            <div className="glass absolute -bottom-5 left-1/2 flex -translate-x-1/2 items-center gap-2 whitespace-nowrap rounded-full px-5 py-2.5 text-sm font-semibold shadow-glow">
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute h-full w-full animate-ping rounded-full bg-emerald-400 opacity-70" />
                <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
              </span>
              165Hz → alternating sweep + vibration
            </div>
          </div>
        </div>
      </section>

      {/* ── DOWNLOAD / TRUST STRIP ──────────── */}
      <section id="download" className="border-y border-white/10 bg-abyss/60">
        <div className="mx-auto grid max-w-6xl items-center gap-8 px-4 py-12 md:grid-cols-[1fr_auto]">
          <div>
            <h2 className="text-2xl font-extrabold tracking-tight md:text-3xl">
              Hearing that underwater gurgle right now? Fix it in the next 60 seconds.
            </h2>
            <p className="mt-2 text-slate-400">
              Every hour water sits in the mesh, minerals bake on and sound gets duller. Here&apos;s all it takes:
            </p>
            <ol className="mt-4 grid gap-2 text-slate-300 sm:grid-cols-3">
              {["1️⃣ Max volume, speaker facing down", "2️⃣ Run the free water-eject program", "3️⃣ Test sound, repeat 2–3× if needed"].map((t) => (
                <li key={t} className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-medium">{t}</li>
              ))}
            </ol>
          </div>
          <div className="flex flex-col items-start gap-3 md:items-end">
            <AppStoreButton />
            <p className="text-xs text-slate-400">Free · In-app purchases · Lifetime $29.99 available</p>
          </div>
        </div>
      </section>

      {/* ── SCREENSHOTS ─────────────────────── */}
      <section id="screenshots" className="mx-auto max-w-6xl px-4 py-16">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-cyan-300">Inside the app</p>
        <h2 className="mt-2 text-3xl font-black tracking-tight md:text-4xl">
          One tap. Real frequencies. Proof it worked.
        </h2>
        <p className="mt-3 max-w-2xl text-slate-300">
          Straight from the App Store listing — alternating water-eject program, AirPods &
          earpiece modes, decibel meter, and 15+ sound tests to hear the difference.
        </p>
        <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-5">
          {[1, 2, 3, 4, 5].map((n) => (
            <figure key={n} className="group overflow-hidden rounded-3xl border border-white/10 bg-abyss transition hover:border-cyan-400/50">
              <Image
                src={`/assets/screenshot-${n}.png`}
                alt={`WaterDrop screenshot ${n} — water eject and speaker cleaner for iPhone and AirPods`}
                width={392}
                height={696}
                loading="lazy"
                className="h-auto w-full transition duration-300 group-hover:scale-[1.03]"
              />
            </figure>
          ))}
        </div>
      </section>

      {/* ── HOW IT WORKS ────────────────────── */}
      <section id="how" className="border-y border-white/10 bg-abyss/60">
        <div className="mx-auto max-w-6xl px-4 py-16">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-cyan-300">How water eject works</p>
          <h2 className="mt-2 text-3xl font-black tracking-tight md:text-4xl">
            Sound shakes the water out. Physics does the rest.
          </h2>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {[
              { t: "Position it", d: "Disconnect Bluetooth. Volume to 100%. Lay the iPhone speaker-down so gravity helps droplets fall out of the mesh.", e: "📲" },
              { t: "Run the sweep", d: "Start the free program. Alternating low + high frequencies vibrate the diaphragm and blast air through the grille — watch droplets creep out.", e: "🌊" },
              { t: "Test & repeat", d: "Play a speaker test + check the dB meter. Still dull? Run 2–3 cycles, then air-dry. For AirPods, use the dedicated fine-speaker mode.", e: "✅" },
            ].map((s) => (
              <div key={s.t} className="glass rounded-3xl p-6">
                <div className="text-3xl">{s.e}</div>
                <h3 className="mt-3 text-xl font-bold">{s.t}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-300">{s.d}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-2">
            <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
              <h3 className="text-lg font-bold text-white">Why WaterDrop beats the free shortcut</h3>
              <ul className="mt-3 space-y-2 text-sm text-slate-300">
                <li>✅ <strong className="text-white">AirPods + earpiece modes</strong> — the Shortcut only does the main speaker</li>
                <li>✅ <strong className="text-white">Alternating frequencies + vibration</strong> — not one flat 165Hz tone</li>
                <li>✅ <strong className="text-white">Free dB meter + 15 sound tests</strong> — prove the fix, don&apos;t guess</li>
                <li>✅ <strong className="text-white">One-tap, no scary links</strong> — no sideloaded shortcuts asking for website access</li>
              </ul>
              <Link href="/guides/water-eject-shortcut-vs-app" className="mt-4 inline-block text-sm font-semibold text-cyan-300 underline underline-offset-4">
                Read the full comparison →
              </Link>
            </div>
            <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
              <h3 className="text-lg font-bold text-white">Pro tips for best ejection</h3>
              <ul className="mt-3 space-y-2 text-sm text-slate-300">
                <li>🔊 Max volume — louder = stronger vibration = more water out</li>
                <li>🎧 Disconnect AirPods/Bluetooth so sound comes from phone speakers</li>
                <li>🧻 Wipe + tap phone gently against your hand first, grille down</li>
                <li>🚫 Skip rice (dust gets in), skip hair-dryer heat, don&apos;t charge while wet</li>
              </ul>
            </div>
          </div>

          <ToneDemo />
          <p className="mt-4 text-center text-sm text-slate-400">
            On a laptop right now? Play the full 60-second{" "}
            <Link href="/tools/water-eject-sound" className="font-semibold text-cyan-300 underline underline-offset-4 hover:text-cyan-200">
              free 165Hz + 300Hz eject tones in your browser →
            </Link>
          </p>
        </div>
      </section>

      {/* ── REVIEWS ─────────────────────────── */}
      <section className="mx-auto max-w-6xl px-4 py-16">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-cyan-300">Real reviews</p>
            <h2 className="mt-2 text-3xl font-black tracking-tight md:text-4xl">Washed AirPods, fixed.</h2>
          </div>
          <p className="flex items-center gap-2 text-sm text-slate-300"><Stars /> <strong className="text-white">4.3/5</strong> from 97 App Store ratings</p>
        </div>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {[
            { n: "HANNNAHHH", t: "AirPods Pro sat in water for hours. Ran the app ~1hr, dried overnight — good as new. I was so skeptical. ♥️", s: "Lifesaver for my AirPods" },
            { n: "NikiD81", t: "Accidentally washed my AirPods. Squealing every time. Ran water eject for AirPods ONE time — back to normal.", s: "Works like a charm!" },
            { n: "Devikamohan", t: "Washer accident, high-pitched voice. Rice + silica gel failed. Other eject apps failed. This one's AirPods mode worked. Saved $250.", s: "Saved me $250" },
          ].map((r) => (
            <blockquote key={r.n} className="glass rounded-3xl p-6">
              <Stars />
              <p className="mt-2 font-bold text-white">“{r.s}”</p>
              <p className="mt-2 text-sm leading-6 text-slate-300">“{r.t}”</p>
              <footer className="mt-4 text-xs text-slate-400">— {r.n} · App Store review</footer>
            </blockquote>
          ))}
        </div>
      </section>

      {/* ── GUIDES ──────────────────────────── */}
      <section id="guides" className="border-y border-white/10 bg-abyss/60">
        <div className="mx-auto max-w-6xl px-4 py-16">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-cyan-300">Fix guides</p>
          <h2 className="mt-2 text-3xl font-black tracking-tight md:text-4xl">
            Find your exact problem. Fix it now.
          </h2>
          <p className="mt-3 max-w-2xl text-slate-300">
            Every guide answers the search, then shows exactly which WaterDrop program to run —
            built to rank and convert.
          </p>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {GUIDES.map((g) => (
              <Link
                key={g.slug}
                href={`/guides/${g.slug}`}
                className="group rounded-3xl border border-white/10 bg-white/5 p-6 transition hover:-translate-y-1 hover:border-cyan-400/50"
              >
                <div className="text-3xl">{g.emoji}</div>
                {g.slug === "how-to-get-water-out-of-airpods" && (
                  <p className="mt-2 inline-block rounded-full bg-amber-400/15 px-3 py-1 text-[11px] font-bold uppercase tracking-widest text-amber-300">
                    🔥 Most popular fix
                  </p>
                )}
                <h3 className="mt-3 font-bold leading-snug text-white group-hover:text-cyan-200">{g.title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-400">{g.description}</p>
                <p className="mt-4 text-sm font-semibold text-cyan-300">
                  Read guide · {g.readMinutes} min →
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ─────────────────────────────── */}
      <section id="faq" className="mx-auto max-w-4xl px-4 py-16">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-cyan-300">FAQ</p>
        <h2 className="mt-2 text-3xl font-black tracking-tight md:text-4xl">
          Water eject questions, answered.
        </h2>
        <div className="mt-8 space-y-3">
          {FAQS.map((f) => (
            <details key={f.q} className="glass group rounded-2xl px-5 py-4">
              <summary className="flex cursor-pointer items-center justify-between gap-4 font-semibold text-white">
                {f.q}
                <span className="faq-chevron text-cyan-300">▾</span>
              </summary>
              <p className="mt-3 text-sm leading-7 text-slate-300">{f.a}</p>
              <Link
                href={`/guides/${f.slug}`}
                className="mt-2 inline-block text-sm font-semibold text-cyan-300 underline underline-offset-4"
              >
                Learn more →
              </Link>
            </details>
          ))}
        </div>
      </section>

      {/* ── FINAL CTA ───────────────────────── */}
      <section className="mx-auto max-w-6xl px-4 pb-20">
        <div className="hero-grid relative overflow-hidden rounded-[2rem] border border-cyan-400/25 bg-abyss px-6 py-14 text-center shadow-glow md:py-20">
          <Image src="/assets/icon.jpg" alt="WaterDrop app icon — blue droplet" width={88} height={88} className="mx-auto rounded-3xl shadow-glow" />
          <h2 className="mx-auto mt-6 max-w-2xl text-3xl font-black tracking-tight md:text-5xl">
            Speaker sounds underwater? <span className="text-gradient">Eject it now.</span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-slate-300">
            Your speaker sounded great yesterday — let&apos;s get it back today. A free
            water-eject run, AirPods + earpiece modes, dust cleaning, and a dB meter with
            15+ tests to prove it worked. No data collected, ever.
          </p>
          <div className="mt-8 flex justify-center">
            <AppStoreButton large />
          </div>
          <p className="mt-4 text-xs text-slate-400">
            Free download · iPhone &amp; iPad · iOS 15.1+ · 4.3★ (97 ratings)
          </p>
        </div>
      </section>

      {/* ── FOOTER ──────────────────────────── */}
      <footer className="border-t border-white/10 bg-black/40">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 md:grid-cols-4">
          <div>
            <div className="flex items-center gap-2.5">
              <Image src="/assets/icon.jpg" alt="WaterDrop icon" width={36} height={36} className="rounded-xl" />
              <span className="font-extrabold">WaterDrop</span>
            </div>
            <p className="mt-3 text-sm leading-6 text-slate-400">
              Water eject &amp; speaker cleaner for iPhone, AirPods &amp; iPad. By Zion Studios LLC.
            </p>
            <p className="mt-3 text-xs text-slate-500">Support: zionstudiosapps@gmail.com</p>
          </div>
          <div>
            <p className="text-sm font-bold uppercase tracking-widest text-slate-300">Guides</p>
            <ul className="mt-3 space-y-2 text-sm text-slate-400">
              {GUIDES.slice(0, 4).map((g) => (
                <li key={g.slug}><Link href={`/guides/${g.slug}`} className="hover:text-cyan-300">{g.shortTitle}</Link></li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-sm font-bold uppercase tracking-widest text-slate-300">More guides</p>
            <ul className="mt-3 space-y-2 text-sm text-slate-400">
              {GUIDES.slice(4).map((g) => (
                <li key={g.slug}><Link href={`/guides/${g.slug}`} className="hover:text-cyan-300">{g.shortTitle}</Link></li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-sm font-bold uppercase tracking-widest text-slate-300">App</p>
            <ul className="mt-3 space-y-2 text-sm text-slate-400">
              <li><a href={APP_STORE_URL} target="_blank" rel="noopener" className="hover:text-cyan-300">Download on App Store</a></li>
              <li><Link href="/tools/water-eject-sound" className="hover:text-cyan-300">Free eject tones (play online)</Link></li>
              <li><a href="https://sites.google.com/view/water-clearance/privacy-policy" target="_blank" rel="noopener" className="hover:text-cyan-300">Privacy Policy</a></li>
              <li><a href="https://sites.google.com/view/water-clearance/terms-conditions" target="_blank" rel="noopener" className="hover:text-cyan-300">Terms of Use</a></li>
              <li><Link href={SITE_URL} className="hover:text-cyan-300">Home</Link></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-white/10 py-5 text-center text-xs text-slate-500">
          © {new Date().getFullYear()} Zion Studios LLC · Screenshots &amp; icon © Zion Studios via App Store · Water-resistant ≠ waterproof — act fast after exposure.
        </div>
      </footer>
    </main>
  );
}
