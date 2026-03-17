import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { siteConfig } from "@/lib/config";

export const metadata: Metadata = {
  title: "Best Dog Beds for Large Dogs in 2026 — Orthopedic Picks Tested",
  description:
    "We tested 5 top-rated dog beds for large dogs over 60 days including Big Barker, Furhaven, PetFusion, Casper, and Bedsure. See foam density tests, washability ratings, and real durability results.",
  openGraph: {
    title: "Best Dog Beds for Large Dogs in 2026 — Orthopedic Picks Tested",
    description:
      "60-day durability and comfort test: 5 large dog beds reviewed. Big Barker, Furhaven, PetFusion, Casper, and Bedsure compared with pros, cons, and pricing.",
    type: "article",
    images: [
      {
        url: "/og-best-dog-beds-large.png",
        width: 1200,
        height: 630,
        alt: "Best Dog Beds for Large Dogs in 2026",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Best Dog Beds for Large Dogs in 2026",
    description:
      "5 orthopedic dog beds tested for 60 days with large breeds. See which held up.",
    images: ["/og-best-dog-beds-large.png"],
  },
  alternates: {
    canonical:
      `${siteConfig.url}/blog/best-dog-beds-for-large-dogs`,
  },
};

export default function LargeDogBedsLayout({
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
