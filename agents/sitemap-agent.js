#!/usr/bin/env node

/**
 * HonestPawFinds Sitemap Agent
 *
 * Scans /content/blog/ and /src/app/blog/ for MDX articles,
 * then generates a complete sitemap.xml in /public.
 *
 * Usage:
 *   node agents/sitemap-agent.js
 *   npm run update-sitemap
 *
 * Runs automatically before every build via the "prebuild" npm script.
 */

const fs = require("fs");
const path = require("path");

// ─── Config ──────────────────────────────────────────────────────
const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://honestpawfinds.xyz";
const PUBLIC_DIR = path.join(__dirname, "..", "public");
const OUTPUT = path.join(PUBLIC_DIR, "sitemap.xml");

// Directories to scan for MDX articles
const SCAN_DIRS = [
  path.join(__dirname, "..", "content", "blog"),
  path.join(__dirname, "..", "src", "app", "blog"),
];

// Static pages that always appear in the sitemap
const STATIC_PAGES = [
  { path: "", priority: "1.0", changefreq: "weekly" },
  { path: "/privacy-policy", priority: "0.3", changefreq: "yearly" },
  { path: "/terms-of-service", priority: "0.3", changefreq: "yearly" },
];

// ─── Helpers ─────────────────────────────────────────────────────
function toDateString(date) {
  return date.toISOString().split("T")[0];
}

function getModDate(filePath) {
  try {
    const stat = fs.statSync(filePath);
    return toDateString(stat.mtime);
  } catch {
    return toDateString(new Date());
  }
}

/**
 * Scan a directory for blog article slugs.
 * Handles two layouts:
 *   /content/blog/my-article.mdx          → slug = "my-article"
 *   /src/app/blog/my-article/page.mdx     → slug = "my-article"
 */
function scanDir(dir) {
  if (!fs.existsSync(dir)) return [];

  const entries = fs.readdirSync(dir, { withFileTypes: true });
  const articles = [];

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);

    if (entry.isFile() && entry.name.endsWith(".mdx")) {
      // /content/blog/slug.mdx
      const slug = entry.name.replace(/\.mdx$/, "");
      articles.push({ slug, lastmod: getModDate(fullPath) });
    } else if (entry.isDirectory()) {
      // /src/app/blog/slug/page.mdx or page.tsx
      const mdxPath = path.join(fullPath, "page.mdx");
      const tsxPath = path.join(fullPath, "page.tsx");
      const filePath = fs.existsSync(mdxPath)
        ? mdxPath
        : fs.existsSync(tsxPath)
          ? tsxPath
          : null;

      if (filePath) {
        articles.push({ slug: entry.name, lastmod: getModDate(filePath) });
      }
    }
  }

  return articles;
}

function buildXml(urls) {
  const entries = urls
    .map(
      (u) => `  <url>
    <loc>${u.loc}</loc>
    <lastmod>${u.lastmod}</lastmod>
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority}</priority>
  </url>`
    )
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries}
</urlset>
`;
}

// ─── Main ────────────────────────────────────────────────────────
function main() {
  const todayStr = toDateString(new Date());
  const urls = [];

  // Add static pages
  for (const page of STATIC_PAGES) {
    urls.push({
      loc: `${SITE_URL}${page.path}`,
      lastmod: todayStr,
      changefreq: page.changefreq,
      priority: page.priority,
    });
  }

  // Scan all directories for blog articles
  const seen = new Set();
  let articleCount = 0;

  for (const dir of SCAN_DIRS) {
    const articles = scanDir(dir);
    for (const article of articles) {
      if (seen.has(article.slug)) continue;
      seen.add(article.slug);
      articleCount++;

      urls.push({
        loc: `${SITE_URL}/blog/${article.slug}`,
        lastmod: article.lastmod,
        changefreq: "monthly",
        priority: "0.8",
      });
    }
  }

  // Ensure /public directory exists
  if (!fs.existsSync(PUBLIC_DIR)) {
    fs.mkdirSync(PUBLIC_DIR, { recursive: true });
  }

  // Write sitemap
  const xml = buildXml(urls);
  fs.writeFileSync(OUTPUT, xml);

  // Summary
  console.log(`Sitemap generated: ${OUTPUT}`);
  console.log(
    `  ${STATIC_PAGES.length} static pages + ${articleCount} blog articles = ${urls.length} total URLs`
  );
}

main();
