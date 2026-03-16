import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { siteConfig } from "@/lib/config";

export const metadata: Metadata = {
  title: "Best Indestructible Dog Toys in 2026 — Tested by Power Chewers",
  description:
    "We gave 5 tough dog toys to aggressive chewers for 90 days. See which survived — KONG Classic, Goughnuts, West Paw Zogoflex, Benebone, and Mammoth Flossy Chews reviewed with pros, cons, and pricing.",
  openGraph: {
    title: "Best Indestructible Dog Toys in 2026 — Tested by Power Chewers",
    description:
      "90-day durability test: 5 indestructible dog toys rated for aggressive chewers. Detailed reviews with material safety, sizing, and chew-strength ratings.",
    type: "article",
    images: [
      {
        url: "/og-best-indestructible-dog-toys.png",
        width: 1200,
        height: 630,
        alt: "Best Indestructible Dog Toys in 2026",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Best Indestructible Dog Toys in 2026",
    description:
      "5 tough dog toys survived 90 days with power chewers. See which ones made it.",
    images: ["/og-best-indestructible-dog-toys.png"],
  },
  alternates: {
    canonical:
      `${siteConfig.url}/reviews/best-indestructible-dog-toys`,
  },
};

export default function IndestructibleToysLayout({
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
