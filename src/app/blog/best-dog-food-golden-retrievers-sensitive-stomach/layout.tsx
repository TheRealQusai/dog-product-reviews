import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ArticleJsonLd from "@/components/mdx/ArticleJsonLd";
import { siteConfig } from "@/lib/config";

export const metadata: Metadata = {
  title: "Best Dog Food for Golden Retrievers with Sensitive Stomach (2026)",
  description:
    "We tested 5 top dog foods for golden retrievers with sensitive stomachs. Vet-informed picks including Hill's Science Diet, Purina Pro Plan, Royal Canin, Blue Buffalo Basics, and Wellness Simple with detailed ingredient analysis.",
  openGraph: {
    title: "Best Dog Food for Golden Retrievers with Sensitive Stomach (2026)",
    description:
      "Expert-tested picks for golden retrievers with digestive issues. Detailed reviews of 5 sensitive stomach formulas with pros, cons, and pricing.",
    type: "article",
    images: [
      {
        url: "/og-best-golden-retriever-sensitive-stomach-food.png",
        width: 1200,
        height: 630,
        alt: "Best Dog Food for Golden Retrievers with Sensitive Stomach",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Best Dog Food for Golden Retrievers with Sensitive Stomach (2026)",
    description:
      "5 sensitive stomach dog foods for golden retrievers reviewed head-to-head. See which formula came out on top.",
    images: ["/og-best-golden-retriever-sensitive-stomach-food.png"],
  },
  alternates: {
    canonical:
      `${siteConfig.url}/blog/best-dog-food-golden-retrievers-sensitive-stomach`,
  },
};

export default function GoldenRetrieverSensitiveStomachLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <ArticleJsonLd
        title="Best Dog Food for Golden Retrievers with Sensitive Stomach (2026)"
        description="We tested 5 top dog foods for golden retrievers with sensitive stomachs. Vet-informed picks including Hill's Science Diet, Purina Pro Plan, Royal Canin, Blue Buffalo Basics, and Wellness Simple with detailed ingredient analysis."
        url={`${siteConfig.url}/blog/best-dog-food-golden-retrievers-sensitive-stomach`}
        datePublished="2026-03-31"
        dateModified="2026-03-31"
        image="/og-best-golden-retriever-sensitive-stomach-food.png"
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
