/** Central site configuration — reads from environment variables at build time. */

export const siteConfig = {
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://honestpawfinds.xyz",
  name: "HonestPawFinds",
  contactEmail:
    process.env.NEXT_PUBLIC_CONTACT_EMAIL || "contact@honestpawfinds.xyz",
} as const;
