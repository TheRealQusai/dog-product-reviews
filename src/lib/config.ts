/** Central site configuration — reads from environment variables at build time. */

export const siteConfig = {
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://doggearreviews.com",
  name: "DogGearReviews",
  contactEmail:
    process.env.NEXT_PUBLIC_CONTACT_EMAIL || "contact@doggearreviews.com",
} as const;
