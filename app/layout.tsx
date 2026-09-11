import type { Metadata, Viewport } from "next";
import "./globals.css";
import { SITE_URL } from "@/lib/site";

export const viewport: Viewport = {
  themeColor: "#050B1E",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "WaterDrop: Water Eject — Get Water Out of iPhone Speaker & AirPods",
    template: "%s | WaterDrop",
  },
  description:
    "Water in your iPhone speaker or washed AirPods? WaterDrop's water eject uses tested alternating frequencies + vibration to push water & dust out, with free decibel meter and 15+ speaker tests. 4.3★ rated. Free download.",
  keywords: [
    "water eject",
    "eject water from iphone",
    "how to get water out of iphone speaker",
    "water eject airpods",
    "washed airpods",
    "iphone speaker cleaner",
    "speaker cleaner",
    "fix my speakers",
    "iphone speaker muffled after water",
    "decibel meter app",
    "clear wave",
  ],
  authors: [{ name: "Zion Studios LLC" }],
  creator: "Zion Studios LLC",
  publisher: "Zion Studios LLC",
  category: "Utilities",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: "WaterDrop",
    locale: "en_US",
    title: "WaterDrop: Water Eject — Get Water Out of iPhone Speaker & AirPods",
    description:
      "Muffled speaker after water? Run the 60-second water eject. AirPods mode, dust cleaning, free dB meter + 15 speaker tests. 4.3★ rated.",
    images: [{ url: "/assets/screenshot-1.png", width: 392, height: 696, alt: "WaterDrop water eject app screens" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "WaterDrop: Water Eject for iPhone & AirPods",
    description: "Eject water, fix muffled sound, test your speaker. Free iOS app — 4.3★ rated.",
    images: ["/assets/screenshot-1.png"],
  },
  robots: { index: true, follow: true },
  appleWebApp: { capable: true, title: "WaterDrop", statusBarStyle: "black-translucent" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const softwareJsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Water Eject Airpods: WaterDrop",
    applicationCategory: "UtilitiesApplication",
    operatingSystem: "iOS 15.1+",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    aggregateRating: { "@type": "AggregateRating", ratingValue: "4.3", ratingCount: "97" },
    downloadUrl: "https://apps.apple.com/us/app/water-eject-airpods-waterdrop/id6449911513",
  };

  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/assets/icon.jpg" type="image/jpeg" />
        <link rel="apple-touch-icon" href="/assets/icon.jpg" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareJsonLd) }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
