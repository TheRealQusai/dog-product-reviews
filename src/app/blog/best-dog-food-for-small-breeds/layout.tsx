import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { siteConfig } from "@/lib/config";

export const metadata: Metadata = {
  title: "Best Dog Food for Small Breeds in 2026 — Vet-Informed Picks",
  description:
    "We reviewed the 5 best dog food for small breeds in 2026 including Royal Canin, Blue Buffalo, Hill's Science Diet, Wellness CORE, and Merrick Lil Plates. Kibble size, calorie density, and ingredient breakdowns.",
  openGraph: {
    title: "Best Dog Food for Small Breeds in 2026 — Vet-Informed Picks",
    description:
      "Expert-tested picks for small breed dog food. Detailed reviews of Royal Canin, Blue Buffalo, Hill's, Wellness CORE, and Merrick with pros, cons, and pricing.",
    type: "article",
    images: [
      {
        url: "/og-best-small-breed-dog-food.png",
        width: 1200,
        height: 630,
        alt: "Best Dog Food for Small Breeds in 2026",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Best Dog Food for Small Breeds in 2026",
    description:
      "5 small-breed dog foods reviewed head-to-head. See which formula came out on top.",
    images: ["/og-best-small-breed-dog-food.png"],
  },
  alternates: {
    canonical:
      `${siteConfig.url}/blog/best-dog-food-for-small-breeds`,
  },
};

export default function SmallBreedFoodLayout({
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
