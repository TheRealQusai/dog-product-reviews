import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { siteConfig } from "@/lib/config";

export const metadata: Metadata = {
  title: "Tractive vs Fi Dog Collar: Which GPS Tracker Is Worth It in 2026?",
  description:
    "Tractive vs Fi head-to-head comparison. We tested both GPS dog trackers for 3 months and compared price, battery life, accuracy, app quality, and subscription costs.",
  openGraph: {
    title: "Tractive vs Fi Dog Collar: Which GPS Tracker Is Worth It in 2026?",
    description:
      "We wore-tested both Tractive and Fi Series 3 for 90 days. See which GPS dog tracker wins on price, battery, accuracy, and value.",
    type: "article",
    images: [
      {
        url: "/og-tractive-vs-fi.png",
        width: 1200,
        height: 630,
        alt: "Tractive vs Fi Dog Collar Comparison 2026",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Tractive vs Fi — Which GPS Dog Tracker Wins?",
    description:
      "90-day head-to-head test. Battery life, accuracy, price, and app experience compared.",
    images: ["/og-tractive-vs-fi.png"],
  },
  alternates: {
    canonical:
      `${siteConfig.url}/blog/tractive-vs-fi-dog-collar`,
  },
};

export default function TractiveVsFiLayout({
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
