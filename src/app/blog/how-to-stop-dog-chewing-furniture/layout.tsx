import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ArticleJsonLd from "@/components/mdx/ArticleJsonLd";
import { siteConfig } from "@/lib/config";

export const metadata: Metadata = {
  title: "How to Stop a Dog from Chewing Furniture (+ Best Products)",
  description:
    "Proven tips to stop destructive chewing — why dogs chew furniture, behavioral fixes, and the best deterrent sprays and redirect toys to protect your home.",
  openGraph: {
    title: "How to Stop a Dog from Chewing Furniture (+ Best Products)",
    description:
      "Why dogs chew furniture and how to stop it. Behavioral tips, bitter sprays, redirect toys, and 5 product recommendations reviewed.",
    type: "article",
    images: [
      {
        url: "/og-how-to-stop-dog-chewing-furniture.png",
        width: 1200,
        height: 630,
        alt: "How to Stop a Dog from Chewing Furniture",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "How to Stop a Dog from Chewing Furniture",
    description:
      "Proven behavioral tips and the best products to stop destructive chewing for good.",
    images: ["/og-how-to-stop-dog-chewing-furniture.png"],
  },
  alternates: {
    canonical:
      `${siteConfig.url}/blog/how-to-stop-dog-chewing-furniture`,
  },
};

export default function StopChewingFurnitureLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <ArticleJsonLd
        title="How to Stop a Dog from Chewing Furniture (+ Best Products)"
        description="Proven tips to stop destructive chewing — why dogs chew furniture, behavioral fixes, and the best deterrent sprays and redirect toys to protect your home."
        url={`${siteConfig.url}/blog/how-to-stop-dog-chewing-furniture`}
        datePublished="2026-03-31"
        dateModified="2026-03-31"
        image="/og-how-to-stop-dog-chewing-furniture.png"
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
