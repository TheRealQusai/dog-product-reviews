import { MetadataRoute } from "next";
import { siteConfig } from "@/lib/config";

const today = new Date().toISOString().split("T")[0]; // YYYY-MM-DD

export default function sitemap(): MetadataRoute.Sitemap {
  const articles = [
    "/blog/best-gps-trackers-for-dogs",
    "/blog/best-dog-food-for-small-breeds",
    "/blog/best-indestructible-dog-toys",
    "/blog/tractive-vs-fi-dog-collar",
    "/blog/best-dog-beds-for-large-dogs",
  ];

  return [
    {
      url: siteConfig.url,
      lastModified: today,
      changeFrequency: "weekly",
      priority: 1.0,
    },
    ...articles.map((path) => ({
      url: `${siteConfig.url}${path}`,
      lastModified: today,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    {
      url: `${siteConfig.url}/blog/best-dog-food-2026`,
      lastModified: today,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${siteConfig.url}/privacy-policy`,
      lastModified: today,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${siteConfig.url}/terms-of-service`,
      lastModified: today,
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];
}
