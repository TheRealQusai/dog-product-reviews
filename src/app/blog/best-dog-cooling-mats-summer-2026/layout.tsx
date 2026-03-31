import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ArticleJsonLd from "@/components/mdx/ArticleJsonLd";
import { siteConfig } from "@/lib/config";

export const metadata: Metadata = {
  title: "Best Dog Cooling Mats and Vests for Summer 2026 — Tested & Ranked",
  description:
    "We tested 5 top-rated dog cooling mats and vests including The Green Pet Shop, Arf Pets, Ruffwear Swamp Cooler, K&H Cool Bed III, and Ruffwear Jet Stream. See cooling performance, durability, and sizing results.",
  openGraph: {
    title: "Best Dog Cooling Mats and Vests for Summer 2026 — Tested & Ranked",
    description:
      "5 dog cooling mats and vests reviewed: gel pads, water-activated mats, and evaporative vests compared with pros, cons, and pricing for summer 2026.",
    type: "article",
    images: [
      {
        url: "/og-best-dog-cooling-mats.png",
        width: 1200,
        height: 630,
        alt: "Best Dog Cooling Mats and Vests for Summer 2026",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Best Dog Cooling Mats and Vests for Summer 2026",
    description:
      "5 dog cooling products tested in real heat. See which mats and vests actually keep dogs cool.",
    images: ["/og-best-dog-cooling-mats.png"],
  },
  alternates: {
    canonical:
      `${siteConfig.url}/blog/best-dog-cooling-mats-summer-2026`,
  },
};

export default function CoolingMatsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <ArticleJsonLd
        title="Best Dog Cooling Mats and Vests for Summer 2026 — Tested & Ranked"
        description="We tested 5 top-rated dog cooling mats and vests including The Green Pet Shop, Arf Pets, Ruffwear Swamp Cooler, K&H Cool Bed III, and Ruffwear Jet Stream. See cooling performance, durability, and sizing results."
        url={`${siteConfig.url}/blog/best-dog-cooling-mats-summer-2026`}
        datePublished="2026-03-31"
        dateModified="2026-03-31"
        image="/og-best-dog-cooling-mats.png"
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
