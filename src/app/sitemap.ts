import { MetadataRoute } from "next";
import { siteConfig } from "@/lib/config";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages = [
    "",
    "/privacy-policy",
    "/terms-of-service",
    "/reviews/best-dog-food-2026",
    "/reviews/best-gps-trackers-for-dogs",
    "/reviews/best-dog-food-for-small-breeds",
    "/reviews/best-indestructible-dog-toys",
    "/reviews/tractive-vs-fi-dog-collar",
    "/reviews/best-dog-beds-for-large-dogs",
  ];

  return staticPages.map((path) => ({
    url: `${siteConfig.url}${path}`,
    lastModified: new Date(),
    changeFrequency: path === "" ? "weekly" : "monthly",
    priority: path === "" ? 1 : 0.7,
  }));
}
