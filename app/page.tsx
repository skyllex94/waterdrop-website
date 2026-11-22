import Image from "next/image";
import Link from "next/link";
import { APP_STORE_URL, FAQS, GUIDES, SITE_URL } from "@/lib/site";
import ToneDemo from "@/components/ToneDemo";
import SiteHeader from "@/components/SiteHeader";

function Stars() {
  return (
    <span className="inline-flex items-center gap-0.5 text-amber-400" aria-label="Rated 4.3 out of 5 stars">
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
      className={`group inline-flex items-center justify-center gap-3 rounded-full bg-white font-bold text-black transition hover:-translate-y-0.5 hover:shadow-glow ${
        large ? "h-[60px] px-8 text-lg" : "h-[60px] px-6 text-[15px]"
      }`}
    >
      <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
        <path d="M17.05 12.54c-.03-2.9 2.37-4.29 2.48-4.36-1.35-1.98-3.46-2.25-4.21-2.28-1.79-.18-3.5 1.06-4.4 1.06-.91 0-2.31-1.03-3.8-1-1.95.03-3.75 1.14-4.76 2.88-2.03 3.53-.52 8.76 1.46 11.63.96 1.39 2.11 2.95 3.62 2.89 1.45-.06 2-.94 3.75-.94s2.25.94 3.78.91c1.56-.03 2.55-1.41 3.5-2.81 1.1-1.61 1.55-3.17 1.58-3.25-.04-.02-3.03-1.16-3-4.73zM14.16 4.06c.8-.97 1.34-2.32 1.19-3.66-1.15.05-2.55.77-3.38 1.74-.74.86-1.39 2.23-1.22 3.55 1.29.1 2.6-.65 3.41-1.63z" />
      </svg>
      <span className="text-left leading-none">
        <span className="block text-[10px] font-semibold uppercase tracking-wide opacity-60">
          Download on the
        </span>
        <span className="block text-xl font-extrabold">App Store</span>
      </span>
    </a>
  );
}

function Sparkline({ color }: { color: string }) {
  return (
    <svg viewBox="0 0 120 28" className="mt-3 h-7 w-full" fill="none" aria-hidden>
      <path
        d="M1 22 L15 20 L30 21 L45 15 L60 16 L75 10 L90 12 L105 6 L119 7"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
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

      <SiteHeader
        links={[
          { href: "#how", label: "How it works" },
          { href: "#reviews", label: "Reviews" },
          { href: "#screenshots", label: "Screenshots" },
          { href: "#guides", label: "Guides" },
          { href: "#faq", label: "FAQ" },
        ]}
      />

      {/* ── HERO (Swokei-style, centered) ─────── */}
      <section className="hero-clean relative overflow-hidden">
        <div className="mx-auto max-w-4xl px-4 pt-12 text-center sm:pt-16">
          <div className="flex justify-center">
            <Stars />
          </div>
          <p className="mt-2 text-[13px] font-medium text-slate-400">
            Loved by iPhone &amp; AirPods owners · <strong className="font-bold text-slate-200">4.3★ · 97 ratings</strong> · 4,300+ fixes
          </p>
          <h1 className="mx-auto mt-5 max-w-3xl text-[2.6rem] font-bold leading-[1.04] tracking-[-0.03em] sm:text-6xl md:text-[4.4rem]">
            From muffled speaker
            <br />
            to <span className="text-gradient">clear sound</span> in 60 seconds
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-[17px] leading-7 text-slate-300/90">
            Phone took a swim or AirPods went through the wash? WaterDrop plays tested
            alternating frequencies + vibration that shake trapped water and dust out of
            the speaker mesh. Free to try — no signup.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <AppStoreButton large />
            <Link
              href="/tools/water-eject-sound"
              className="inline-flex h-[60px] items-center gap-2 rounded-full border border-white/15 bg-white/5 px-7 text-[15px] font-semibold text-white backdrop-blur transition hover:border-cyan-400/50 hover:text-cyan-200"
            >
              🔊 Try free tones in browser
            </Link>
          </div>
          <p className="mt-5 flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-[13px] text-slate-400">
            <span>✅ Free download</span>
            <span>🔒 No data collected</span>
            <span>📱 iOS 15.1+</span>
            <a href="#how" className="font-semibold text-slate-300 underline decoration-white/20 underline-offset-4 hover:text-white">
              See how it works ↓
            </a>
          </p>
        </div>

        {/* Floating proof cards (desktop only, like Swokei) */}
        <div className="pointer-events-none absolute left-[max(0px,calc(50%-640px))] top-64 hidden w-52 xl:block">
          <div className="glass -rotate-2 rounded-2xl p-4 text-left shadow-card">
            <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-slate-400">Speakers fixed</p>
            <p className="mt-1 text-3xl font-extrabold tracking-tight">4,300</p>
            <p className="mt-1 text-xs"><span className="font-bold text-emerald-400">↑ 38%</span> <span className="text-slate-400">vs last quarter</span></p>
            <Sparkline color="#34d399" />
          </div>
        </div>
        <div className="pointer-events-none absolute right-[max(0px,calc(50%-640px))] top-64 hidden w-52 xl:block">
          <div className="glass rotate-2 rounded-2xl p-4 text-left shadow-card">
            <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-slate-400">Washed AirPods saved</p>
            <p className="mt-1 text-3xl font-extrabold tracking-tight">$250<span className="text-base font-bold text-slate-400"> kept</span></p>
            <p className="mt-1 text-xs"><span className="font-bold text-cyan-300">4.3★ average</span> <span className="text-slate-400">· real reviews</span></p>
            <Sparkline color="#22d3ee" />
          </div>
        </div>

        {/* ── APP SHOWCASE ── */}
        <div className="mx-auto max-w-5xl px-4 pb-16 pt-12">
          <div className="showcase-ring overflow-hidden rounded-[1.75rem] border border-white/10 bg-[#0A1430]">
            <div className="flex items-center justify-between border-b border-white/[0.07] bg-white/[0.02] px-5 py-3.5">
              <div className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-[#FF5F57]" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#FEBC2E]" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#28C840]" />
                <span className="ml-3 hidden text-[13px] font-medium text-slate-400 sm:block">WaterDrop — Water Eject</span>
              </div>
              <div className="flex items-center gap-2 text-xs">
                <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-400/25 bg-emerald-400/10 px-3 py-1.5 font-semibold text-emerald-300">
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="absolute h-full w-full animate-ping rounded-full bg-emerald-400 opacity-70" />
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                  </span>
                  165Hz → sweep + vibration
                </span>
              </div>
            </div>
            <div className="grid gap-6 bg-gradient-to-b from-cyan-400/[0.06] to-transparent p-6 sm:p-8 md:grid-cols-[1fr_1.2fr] md:items-center">
              <div className="mx-auto grid w-full max-w-sm grid-cols-3 gap-2.5">
                {["/assets/screenshot-1.png", "/assets/screenshot-2.png", "/assets/screenshot-3.png"].map((s, i) => (
                  <div
                    key={s}
                    className={`overflow-hidden rounded-[1.4rem] border border-white/10 bg-deep shadow-card ${i === 1 ? "-mt-3" : "mt-3"}`}
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
              </div>
              <div className="text-left">
                <p className="inline-flex items-center gap-2 rounded-full border border-cyan-400/25 bg-cyan-400/10 px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-[0.14em] text-cyan-300">
                  💧 Water Eject for iPhone &amp; AirPods
                </p>
                <h2 className="mt-4 text-2xl font-bold leading-tight tracking-tight sm:text-[2rem]">
                  One tap runs the full eject program. Then prove it worked.
                </h2>
                <ul className="mt-5 space-y-3 text-[15px] leading-6 text-slate-300">
                  <li className="flex gap-3"><span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-400/15 text-sm">✓</span><span><strong className="text-white">AirPods + earpiece modes</strong> — tuned for tiny drivers, not just the main speaker</span></li>
                  <li className="flex gap-3"><span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-400/15 text-sm">✓</span><span><strong className="text-white">Alternating sweep + vibration</strong> — deeper than a flat 165Hz tone</span></li>
                  <li className="flex gap-3"><span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-400/15 text-sm">✓</span><span><strong className="text-white">Free dB meter + 15 tests</strong> — hear the before / after difference</span></li>
                </ul>
                <div className="mt-6 flex flex-wrap items-center gap-3">
                  <a href={APP_STORE_URL} target="_blank" rel="noopener" className="inline-flex items-center gap-2 rounded-full bg-cyan-400 px-6 py-3 text-sm font-bold text-deep transition hover:bg-cyan-300">
                    Get the free app →
                  </a>
                  <span className="text-[13px] text-slate-400">“Saved my AirPods and saved me $250.” ★★★★★</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── QUICK START ─────────────────────── */}
      <section id="download" className="border-y border-white/[0.07] bg-white/[0.015]">
        <div className="mx-auto grid max-w-5xl items-center gap-8 px-4 py-14 md:grid-cols-[1fr_auto]">
          <div>
            <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
              Hearing that underwater gurgle? Fix it in the next 60 seconds.
            </h2>
            <p className="mt-2 text-[15px] text-slate-400">
              Every hour water sits in the mesh, sound gets duller. Here&apos;s all it takes:
            </p>
            <ol className="mt-5 grid gap-2.5 sm:grid-cols-3">
              {[
                ["1", "Max volume, speaker facing down"],
                ["2", "Run the free water-eject program"],
                ["3", "Test sound, repeat 2–3× if needed"],
              ].map(([n, t]) => (
                <li key={t} className="rounded-2xl border border-white/[0.08] bg-white/[0.03] px-4 py-3.5 text-sm font-medium text-slate-200">
                  <span className="mb-1.5 flex h-6 w-6 items-center justify-center rounded-full bg-cyan-400/15 text-xs font-bold text-cyan-300">{n}</span>
                  {t}
                </li>
              ))}
            </ol>
          </div>
          <div className="flex flex-col items-start gap-3 md:items-end">
            <AppStoreButton />
            <p className="text-xs text-slate-500">Free · In-app purchases · Lifetime $29.99 available</p>
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ────────────────────── */}
      <section id="how" className="mx-auto max-w-5xl px-4 py-20">
        <div className="text-center">
          <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-cyan-300">How water eject works</p>
          <h2 className="mx-auto mt-3 max-w-2xl text-3xl font-bold tracking-tight sm:text-4xl">
            Sound shakes the water out. Physics does the rest.
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-[15px] leading-7 text-slate-400">
            Low frequencies vibrate the diaphragm and push air through the grille — droplets work loose and fall out.
          </p>
        </div>
        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {[
            { n: "01", t: "Position it", d: "Disconnect Bluetooth. Volume to 100%. Lay the iPhone speaker-down so gravity helps droplets fall out of the mesh." },
            { n: "02", t: "Run the sweep", d: "Start the free program. Alternating low + high frequencies blast air through the grille — watch droplets creep out." },
            { n: "03", t: "Test & repeat", d: "Play a speaker test + check the dB meter. Still dull? Run 2–3 cycles, then air-dry. For AirPods, use fine-speaker mode." },
          ].map((s) => (
            <div key={s.t} className="card-hover rounded-3xl border border-white/[0.08] bg-white/[0.03] p-7">
              <p className="text-sm font-extrabold tracking-widest text-cyan-400/70">{s.n}</p>
              <h3 className="mt-2 text-xl font-bold">{s.t}</h3>
              <p className="mt-2 text-[14px] leading-6 text-slate-400">{s.d}</p>
            </div>
          ))}
        </div>

        <div className="mt-4 grid gap-4 md:grid-cols-2">
          <div className="rounded-3xl border border-white/[0.08] bg-white/[0.03] p-7">
            <h3 className="text-[17px] font-bold text-white">Why WaterDrop beats the free shortcut</h3>
            <ul className="mt-4 space-y-2.5 text-sm leading-6 text-slate-400">
              <li>✓ <strong className="text-slate-100">AirPods + earpiece modes</strong> — the Shortcut only does the main speaker</li>
              <li>✓ <strong className="text-slate-100">Alternating frequencies + vibration</strong> — not one flat 165Hz tone</li>
              <li>✓ <strong className="text-slate-100">Free dB meter + 15 sound tests</strong> — prove the fix, don&apos;t guess</li>
            </ul>
            <Link href="/guides/water-eject-shortcut-vs-app" className="mt-5 inline-block text-sm font-semibold text-cyan-300 underline decoration-cyan-400/30 underline-offset-4 hover:text-cyan-200">
              Read the full comparison →
            </Link>
          </div>
          <div className="rounded-3xl border border-white/[0.08] bg-white/[0.03] p-7">
            <h3 className="text-[17px] font-bold text-white">Pro tips for best ejection</h3>
            <ul className="mt-4 space-y-2.5 text-sm leading-6 text-slate-400">
              <li>🔊 Max volume — louder = stronger vibration = more water out</li>
              <li>🎧 Disconnect Bluetooth so sound comes from phone speakers</li>
              <li>🧻 Wipe + tap phone gently against your hand first, grille down</li>
              <li>🚫 Skip rice and hair-dryer heat — don&apos;t charge while wet</li>
            </ul>
          </div>
        </div>

        <ToneDemo />
        <p className="mt-4 text-center text-sm text-slate-400">
          On a laptop right now? Play the full 60-second{" "}
          <Link href="/tools/water-eject-sound" className="font-semibold text-cyan-300 underline underline-offset-4 hover:text-cyan-200">
            free 165Hz + 300Hz eject tones in your browser
          </Link>{" "}
          or run the{" "}
          <Link href="/tools/speaker-test" className="font-semibold text-cyan-300 underline underline-offset-4 hover:text-cyan-200">
            free left/right speaker test →
          </Link>
        </p>
      </section>

      {/* ── SCREENSHOTS ─────────────────────── */}
      <section id="screenshots" className="border-y border-white/[0.07] bg-white/[0.015]">
        <div className="mx-auto max-w-5xl px-4 py-20">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-cyan-300">Inside the app</p>
              <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
                One tap. Real frequencies. Proof it worked.
              </h2>
            </div>
            <a href={APP_STORE_URL} target="_blank" rel="noopener" className="rounded-full border border-white/15 px-5 py-2.5 text-sm font-semibold text-white transition hover:border-cyan-400/50 hover:text-cyan-200">
              View on App Store →
            </a>
          </div>
          <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-5">
            {[1, 2, 3, 4, 5].map((n) => (
              <figure key={n} className="card-hover group overflow-hidden rounded-[1.4rem] border border-white/[0.08] bg-deep">
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
        </div>
      </section>

      {/* ── REVIEWS ─────────────────────────── */}
      <section id="reviews" className="mx-auto max-w-5xl px-4 py-20">
        <div className="text-center">
          <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-cyan-300">Real reviews</p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">Washed AirPods, fixed.</h2>
          <p className="mt-3 flex items-center justify-center gap-2 text-sm text-slate-400"><Stars /> <strong className="text-white">4.3/5</strong> from 97 App Store ratings</p>
        </div>
        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {[
            { n: "HANNNAHHH", t: "AirPods Pro sat in water for hours. Ran the app ~1hr, dried overnight — good as new. I was so skeptical. ♥️", s: "Lifesaver for my AirPods" },
            { n: "NikiD81", t: "Accidentally washed my AirPods. Squealing every time. Ran water eject for AirPods ONE time — back to normal.", s: "Works like a charm!" },
            { n: "Devikamohan", t: "Washer accident, high-pitched voice. Rice + silica gel failed. Other eject apps failed. This one's AirPods mode worked. Saved $250.", s: "Saved me $250" },
          ].map((r) => (
            <blockquote key={r.n} className="card-hover rounded-3xl border border-white/[0.08] bg-white/[0.03] p-7">
              <Stars />
              <p className="mt-3 font-bold text-white">“{r.s}”</p>
              <p className="mt-2 text-sm leading-6 text-slate-400">“{r.t}”</p>
              <footer className="mt-5 text-xs text-slate-500">— {r.n} · App Store review</footer>
            </blockquote>
          ))}
        </div>
      </section>

      {/* ── GUIDES ──────────────────────────── */}
      <section id="guides" className="border-y border-white/[0.07] bg-white/[0.015]">
        <div className="mx-auto max-w-5xl px-4 py-20">
          <div className="text-center">
            <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-cyan-300">Fix guides</p>
            <h2 className="mx-auto mt-3 max-w-xl text-3xl font-bold tracking-tight sm:text-4xl">
              Find your exact problem. Fix it now.
            </h2>
          </div>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {GUIDES.map((g) => (
              <Link
                key={g.slug}
                href={`/guides/${g.slug}`}
                className="card-hover group rounded-3xl border border-white/[0.08] bg-deep/60 p-6"
              >
                <div className="text-3xl">{g.emoji}</div>
                {g.slug === "how-to-get-water-out-of-airpods" && (
                  <p className="mt-3 inline-block rounded-full bg-amber-400/10 px-3 py-1 text-[11px] font-bold uppercase tracking-widest text-amber-300">
                    🔥 Most popular fix
                  </p>
                )}
                <h3 className="mt-3 font-bold leading-snug text-white group-hover:text-cyan-200">{g.title}</h3>
                <p className="mt-2 line-clamp-3 text-sm leading-6 text-slate-500">{g.description}</p>
                <p className="mt-4 text-sm font-semibold text-cyan-300">
                  Read guide · {g.readMinutes} min →
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ─────────────────────────────── */}
      <section id="faq" className="mx-auto max-w-3xl px-4 py-20">
        <div className="text-center">
          <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-cyan-300">FAQ</p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
            Water eject questions, answered.
          </h2>
        </div>
        <div className="mt-10 space-y-2.5">
          {FAQS.map((f) => (
            <details key={f.q} className="group rounded-2xl border border-white/[0.08] bg-white/[0.03] px-5 py-4">
              <summary className="flex cursor-pointer items-center justify-between gap-4 text-[15px] font-semibold text-white">
                {f.q}
                <span className="faq-chevron text-cyan-300">▾</span>
              </summary>
              <p className="mt-3 text-sm leading-7 text-slate-400">{f.a}</p>
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
      <section className="mx-auto max-w-5xl px-4 pb-20">
        <div className="showcase-ring relative overflow-hidden rounded-[2rem] border border-cyan-400/20 bg-[#0A1430] px-6 py-14 text-center sm:py-16">
          <div className="hero-clean absolute inset-0" aria-hidden />
          <div className="relative">
            <Image src="/assets/icon.jpg" alt="WaterDrop app icon — blue droplet" width={72} height={72} className="mx-auto rounded-[1.4rem] shadow-glow" />
            <h2 className="mx-auto mt-6 max-w-2xl text-3xl font-bold tracking-tight sm:text-4xl">
              Speaker sounds underwater? <span className="text-gradient">Eject it now.</span>
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-[15px] leading-7 text-slate-400">
              A free water-eject run, AirPods + earpiece modes, dust cleaning, and a dB meter with
              15+ tests to prove it worked. No data collected, ever.
            </p>
            <div className="mt-8 flex justify-center">
              <AppStoreButton large />
            </div>
            <p className="mt-4 text-xs text-slate-500">
              Free download · iPhone &amp; iPad · iOS 15.1+ · 4.3★ (97 ratings)
            </p>
          </div>
        </div>
      </section>

      {/* ── FOOTER ──────────────────────────── */}
      <footer className="border-t border-white/[0.07]">
        <div className="mx-auto grid max-w-5xl gap-10 px-4 py-14 md:grid-cols-4">
          <div>
            <div className="flex items-center gap-2.5">
              <Image src="/assets/icon.jpg" alt="WaterDrop icon" width={32} height={32} className="rounded-full" />
              <span className="font-bold">WaterDrop</span>
            </div>
            <p className="mt-3 text-sm leading-6 text-slate-500">
              Water eject &amp; speaker cleaner for iPhone, AirPods &amp; iPad. By Zion Studios LLC.
            </p>
            <p className="mt-3 text-xs text-slate-600">Support: zionstudiosapps@gmail.com</p>
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-slate-400">Guides</p>
            <ul className="mt-4 space-y-2.5 text-sm text-slate-500">
              {GUIDES.slice(0, 4).map((g) => (
                <li key={g.slug}><Link href={`/guides/${g.slug}`} className="hover:text-cyan-300">{g.shortTitle}</Link></li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-slate-400">More guides</p>
            <ul className="mt-4 space-y-2.5 text-sm text-slate-500">
              {GUIDES.slice(4).map((g) => (
                <li key={g.slug}><Link href={`/guides/${g.slug}`} className="hover:text-cyan-300">{g.shortTitle}</Link></li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-slate-400">App</p>
            <ul className="mt-4 space-y-2.5 text-sm text-slate-500">
              <li><a href={APP_STORE_URL} target="_blank" rel="noopener" className="hover:text-cyan-300">Download on App Store</a></li>
              <li><Link href="/tools/water-eject-sound" className="hover:text-cyan-300">Free eject tones (play online)</Link></li>
              <li><Link href="/tools/speaker-test" className="hover:text-cyan-300">Free speaker test (left/right)</Link></li>
              <li><Link href="/tools/tone-generator" className="hover:text-cyan-300">Free tone generator (any Hz)</Link></li>
              <li><Link href="/tools/mic-test" className="hover:text-cyan-300">Free mic test (private)</Link></li>
              <li><Link href="/tools/decibel-meter" className="hover:text-cyan-300">Free decibel meter (dB)</Link></li>
              <li><a href="https://sites.google.com/view/water-clearance/privacy-policy" target="_blank" rel="noopener" className="hover:text-cyan-300">Privacy Policy</a></li>
              <li><a href="https://sites.google.com/view/water-clearance/terms-conditions" target="_blank" rel="noopener" className="hover:text-cyan-300">Terms of Use</a></li>
              <li><Link href={SITE_URL} className="hover:text-cyan-300">Home</Link></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-white/[0.07] py-5 text-center text-xs text-slate-600">
          © {new Date().getFullYear()} Zion Studios LLC · Water-resistant ≠ waterproof — act fast after exposure.
        </div>
      </footer>
    </main>
  );
}
