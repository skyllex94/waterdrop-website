import type { Metadata } from "next";
import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";
import ReviewsCarousel from "@/components/ReviewsCarousel";
import { APP_STORE_URL, SITE_URL } from "@/lib/site";
import { RATING_COUNT, RATING_VALUE, REVIEWS } from "@/lib/reviews";

export const metadata: Metadata = {
  title: `WaterDrop Reviews: What Users Say (${RATING_VALUE}★ on the App Store)`,
  description:
    `Real WaterDrop reviews from the App Store — washed AirPods saved, muffled speakers fixed, $250 replacements avoided. ${RATING_VALUE} stars from ${RATING_COUNT} ratings. Free download.`,
  keywords: [
    "waterdrop reviews",
    "water eject app reviews",
    "waterdrop app rating",
    "does waterdrop work",
  ],
  alternates: { canonical: "/reviews" },
  openGraph: {
    type: "website",
    url: `${SITE_URL}/reviews`,
    title: "WaterDrop Reviews: What Users Say",
    description:
      `Real App Store reviews — washed AirPods saved, muffled speakers fixed. ${RATING_VALUE} stars from ${RATING_COUNT} ratings.`,
    images: [{ url: "/assets/screenshot-1.png", width: 392, height: 696, alt: "WaterDrop reviews" }],
  },
};

function Stars() {
  return (
    <span className="inline-flex items-center gap-0.5 text-amber-400" aria-label={`${RATING_VALUE} out of 5 stars`}>
      {"★★★★★".split("").map((s, i) => (
        <span key={i}>{s}</span>
      ))}
    </span>
  );
}

const reviewLd = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "WaterDrop App Store reviews",
  itemListElement: REVIEWS.map((r, i) => ({
    "@type": "ListItem",
    position: i + 1,
    item: {
      "@type": "Review",
      author: { "@type": "Person", name: r.name },
      datePublished: r.date,
      reviewRating: { "@type": "Rating", ratingValue: "5", bestRating: "5" },
      reviewBody: r.quote,
      name: r.title,
    },
  })),
};

const aggregateLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Water Eject Airpods: WaterDrop",
  applicationCategory: "UtilitiesApplication",
  operatingSystem: "iOS 15.1+",
  aggregateRating: { "@type": "AggregateRating", ratingValue: RATING_VALUE, ratingCount: RATING_COUNT },
};

const breadcrumbLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
    { "@type": "ListItem", position: 2, name: "Reviews", item: `${SITE_URL}/reviews` },
  ],
};

export default function ReviewsPage() {
  return (
    <main className="min-h-screen bg-[#0A1730]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(reviewLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(aggregateLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />

      <SiteHeader
        links={[
          { href: "/#how", label: "How it works" },
          { href: "/guides", label: "Blog" },
          { href: "/tools/water-eject-sound", label: "Free tones" },
          { href: "/#faq", label: "FAQ" },
        ]}
      />

      <section className="mx-auto max-w-6xl px-4 pb-20 pt-12 sm:pt-16">
        <nav className="text-center text-xs text-slate-400" aria-label="Breadcrumb">
          <Link href="/" className="hover:text-cyan-300">Home</Link> <span className="mx-1">/</span>
          <span className="text-slate-200">Reviews</span>
        </nav>

        <h1 className="mt-6 text-center text-3xl font-bold tracking-tight text-white sm:text-4xl">
          What Users Say
        </h1>

        <div className="mx-auto mt-8 flex max-w-xl items-center justify-center gap-4 rounded-2xl border border-white/10 bg-white/[0.04] px-8 py-5">
          <span className="text-5xl font-extrabold tracking-tight text-white">{RATING_VALUE}</span>
          <span className="text-left">
            <Stars />
            <span className="mt-1 block text-[13px] text-slate-300">
              {RATING_VALUE} out of 5 — based on {RATING_COUNT} App Store ratings
            </span>
          </span>
        </div>

        <div className="mt-12">
          <ReviewsCarousel variant="page" />
        </div>

        <p className="mx-auto mt-10 max-w-xl text-center text-[13px] leading-6 text-slate-500">
          Reviews quoted verbatim from the App Store listing. Ratings change over time —
          see the live listing for the current score.
        </p>

        <div className="mx-auto mt-8 max-w-2xl rounded-[2rem] border border-cyan-400/20 bg-[#0A1430] px-6 py-10 text-center">
          <h2 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
            Join 4,300+ fixed speakers.
          </h2>
          <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-slate-400">
            Free download. AirPods + earpiece modes, dust cleaning, decibel meter and 15+ tests.
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <a
              href={APP_STORE_URL}
              target="_blank"
              rel="noopener"
              className="inline-flex h-[52px] items-center rounded-full bg-white px-8 text-sm font-bold text-black transition hover:-translate-y-0.5"
            >
              Download on the App Store
            </a>
            <a
              href={`${APP_STORE_URL}?action=write-review`}
              target="_blank"
              rel="noopener"
              className="inline-flex h-[52px] items-center rounded-full border border-white/15 px-8 text-sm font-semibold text-white transition hover:border-cyan-400/50"
            >
              ★ Leave a review
            </a>
          </div>
        </div>
      </section>

      <footer className="border-t border-white/[0.07]">
        <div className="mx-auto max-w-5xl px-4 py-8 text-center text-xs text-slate-600">
          © {new Date().getFullYear()} Zion Studios LLC · <Link href="/" className="hover:text-cyan-300">WaterDrop</Link> · <Link href="/reviews" className="hover:text-cyan-300">Reviews</Link>
        </div>
      </footer>
    </main>
  );
}
