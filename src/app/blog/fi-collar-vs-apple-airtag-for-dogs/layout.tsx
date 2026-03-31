import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ArticleJsonLd from "@/components/mdx/ArticleJsonLd";
import { siteConfig } from "@/lib/config";

export const metadata: Metadata = {
  title: "Fi Collar vs Apple AirTag for Dogs: GPS Tracker or Budget Hack?",
  description:
    "Fi collar vs AirTag for dogs — we compare real-time GPS tracking against Bluetooth proximity finding. Price, range, battery life, subscriptions, and which actually keeps your dog safe.",
  openGraph: {
    title: "Fi Collar vs Apple AirTag for Dogs: GPS Tracker or Budget Hack?",
    description:
      "Fi Series 3 vs Apple AirTag for dog tracking. Full comparison of GPS accuracy, range, battery, cost, and safety features.",
    type: "article",
    images: [
      {
        url: "/og-fi-vs-airtag.png",
        width: 1200,
        height: 630,
        alt: "Fi Smart Collar vs Apple AirTag for Dogs Comparison 2026",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Fi Collar vs AirTag for Dogs — Which Should You Buy?",
    description:
      "Real GPS tracker vs Bluetooth tile. We break down when each makes sense for keeping your dog safe.",
    images: ["/og-fi-vs-airtag.png"],
  },
  alternates: {
    canonical:
      `${siteConfig.url}/blog/fi-collar-vs-apple-airtag-for-dogs`,
  },
};

export default function FiVsAirtagLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <ArticleJsonLd
        title="Fi Collar vs Apple AirTag for Dogs: GPS Tracker or Budget Hack?"
        description="Fi collar vs AirTag for dogs — we compare real-time GPS tracking against Bluetooth proximity finding. Price, range, battery life, subscriptions, and which actually keeps your dog safe."
        url={`${siteConfig.url}/blog/fi-collar-vs-apple-airtag-for-dogs`}
        datePublished="2026-03-31"
        dateModified="2026-03-31"
        image="/og-fi-vs-airtag.png"
      />
      <main className="bg-white">
        <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20">
          {children}
        </article>
      </main>
      <Footer />
    </>
  );
}
