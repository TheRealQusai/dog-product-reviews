import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { siteConfig } from "@/lib/config";

export const metadata: Metadata = {
  title: "Best GPS Trackers for Dogs in 2026 — Expert Tested & Ranked",
  description:
    "We tested the 5 best GPS trackers for dogs in 2026 including Tractive, Fi Series 3, Whistle Go Explore, Apple AirTag, and Jiobit. See real-world battery life, range tests, and subscription costs.",
  openGraph: {
    title: "Best GPS Trackers for Dogs in 2026 — Expert Tested & Ranked",
    description:
      "We tested the 5 best GPS trackers for dogs including Tractive, Fi, Whistle, AirTag, and Jiobit. Detailed reviews with pros, cons, and pricing.",
    type: "article",
    images: [
      {
        url: "/og-best-gps-trackers.png",
        width: 1200,
        height: 630,
        alt: "Best GPS Trackers for Dogs in 2026",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Best GPS Trackers for Dogs in 2026",
    description:
      "5 GPS dog trackers tested head-to-head. See which one came out on top.",
    images: ["/og-best-gps-trackers.png"],
  },
  alternates: {
    canonical: `${siteConfig.url}/blog/best-gps-trackers-for-dogs`,
  },
};

export default function GPSTrackersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <main className="bg-white">
        <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20">
          {children}
        </article>
      </main>
      <Footer />
    </>
  );
}
