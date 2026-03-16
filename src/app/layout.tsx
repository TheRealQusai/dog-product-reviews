import type { Metadata } from "next";
import Script from "next/script";
import localFont from "next/font/local";
import "./globals.css";
import AffiliateBanner from "@/components/AffiliateBanner";
import { siteConfig } from "@/lib/config";

const gaId = process.env.NEXT_PUBLIC_GA_ID;

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} — Honest Reviews. Happy Pets.`,
    template: `%s | ${siteConfig.name}`,
  },
  description:
    "Find the best products for your pets. Expert reviews, honest comparisons, and top picks for food, beds, toys, GPS trackers, and grooming.",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: `${siteConfig.name} — Honest Reviews. Happy Pets.`,
    description:
      "Expert reviews, honest comparisons, and curated top picks for pet food, beds, toys, GPS trackers, and grooming.",
    images: [
      {
        url: "/og-default.png",
        width: 1200,
        height: 630,
        alt: `${siteConfig.name} — Honest Reviews. Happy Pets.`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} — Honest Reviews. Happy Pets.`,
    description:
      "Expert reviews, honest comparisons, and curated top picks for every pet owner.",
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
      <head>
        {gaId && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
              strategy="afterInteractive"
            />
            <Script id="ga-init" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${gaId}');
              `}
            </Script>
          </>
        )}
      </head>
      <body className={`${geistSans.variable} font-sans antialiased`}>
        <AffiliateBanner />
        {children}
      </body>
    </html>
  );
}
