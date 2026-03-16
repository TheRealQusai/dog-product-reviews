import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import AffiliateBanner from "@/components/AffiliateBanner";
import { siteConfig } from "@/lib/config";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} — Honest Dog Product Reviews & Comparisons`,
    template: `%s | ${siteConfig.name}`,
  },
  description:
    "Find the best products for your furry friend. Expert reviews, honest comparisons, and top picks for dog food, beds, toys, GPS trackers, and grooming.",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: `${siteConfig.name} — Honest Dog Product Reviews & Comparisons`,
    description:
      "Expert reviews, honest comparisons, and curated top picks for dog food, beds, toys, GPS trackers, and grooming.",
    images: [
      {
        url: "/og-default.png",
        width: 1200,
        height: 630,
        alt: `${siteConfig.name} — Honest Dog Product Reviews`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} — Honest Dog Product Reviews & Comparisons`,
    description:
      "Expert reviews, honest comparisons, and curated top picks for every dog owner.",
    images: ["/og-default.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: siteConfig.url,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} font-sans antialiased`}>
        <AffiliateBanner />
        {children}
      </body>
    </html>
  );
}
