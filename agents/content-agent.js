#!/usr/bin/env node

/**
 * HonestPawFinds Content Generation Agent
 *
 * Generates SEO-optimized MDX blog articles using Claude claude-sonnet-4-20250514.
 *
 * Usage:
 *   node agents/content-agent.js --type review --title "Best Dog Crates in 2026"
 *   node agents/content-agent.js --slug best-dog-gear-for-winter-2026   # from queue
 *   node agents/content-agent.js --next                                 # next planned
 */

require("dotenv").config();

const Anthropic = require("@anthropic-ai/sdk").default;
const fs = require("fs");
const path = require("path");

// ─── Config ──────────────────────────────────────────────────────
const QUEUE_PATH = path.join(__dirname, "content-queue.json");
const OUTPUT_DIR = path.join(__dirname, "..", "content", "blog");
const AFFILIATE_TAG = "honestpawfind-20";
const MODEL = "claude-sonnet-4-20250514";

// ─── Helpers ─────────────────────────────────────────────────────
function slugify(text) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function today() {
  return new Date().toISOString().split("T")[0];
}

function readQueue() {
  if (!fs.existsSync(QUEUE_PATH)) {
    return { generated: [], planned: [] };
  }
  return JSON.parse(fs.readFileSync(QUEUE_PATH, "utf-8"));
}

function writeQueue(queue) {
  fs.writeFileSync(QUEUE_PATH, JSON.stringify(queue, null, 2) + "\n");
}

function parseArgs() {
  const args = process.argv.slice(2);
  const parsed = {};
  for (let i = 0; i < args.length; i++) {
    if (args[i] === "--type" && args[i + 1]) parsed.type = args[++i];
    else if (args[i] === "--title" && args[i + 1]) parsed.title = args[++i];
    else if (args[i] === "--slug" && args[i + 1]) parsed.slug = args[++i];
    else if (args[i] === "--next") parsed.next = true;
  }
  return parsed;
}

// ─── Prompt builders ─────────────────────────────────────────────
const SYSTEM_PROMPT = `You are a senior SEO content writer for HonestPawFinds.xyz, a pet product review and affiliate website. You write expert-level, conversion-optimized blog articles in MDX format for a Next.js site.

CRITICAL RULES:
1. Every article MUST start with these exact MDX imports:
\`\`\`
import AffiliateDisclosure from "@/components/mdx/AffiliateDisclosure";
import QuickComparisonTable from "@/components/mdx/QuickComparisonTable";
import ProductReviewCard from "@/components/mdx/ProductReviewCard";
import FAQSection from "@/components/mdx/FAQSection";
\`\`\`

2. After the H1, include this byline:
\`\`\`
<p className="text-sm text-gray-500 -mt-4 mb-8">
  By the HonestPawFinds Team &middot; Updated {TODAY'S DATE} &middot; {X} min read
</p>
\`\`\`

3. Then include: <AffiliateDisclosure />

4. ALL Amazon affiliate links MUST use this exact format:
   https://www.amazon.com/s?k={Product+Name+Keywords}&tag=${AFFILIATE_TAG}

5. ALL affiliate links in raw HTML must have:
   target="_blank" rel="noopener noreferrer nofollow sponsored"

6. Use the QuickComparisonTable component for the comparison table. Its props are:
   products: array of { name, rating, price, monthlyFee (use for a key spec), battery (use for another key spec), bestFor, affiliateUrl }

7. Use ProductReviewCard for each individual review. Its props are:
   rank, name, tagline, rating, price, image (emoji), bestFor, overview, pros (string[]), cons (string[]), affiliateUrl

8. Use FAQSection for the FAQ. Its props are:
   items: array of { question, answer }

9. Include proper H1 > H2 > H3 hierarchy. The keyphrase should appear naturally 5-8 times.

10. For the final CTA block, use this exact JSX:
\`\`\`
<div className="mt-10 rounded-xl bg-gradient-to-r from-orange-50 to-amber-50 border border-orange-100 p-6 sm:p-8 text-center">
  <p className="text-lg font-bold text-gray-900">HEADLINE</p>
  <p className="mt-1 text-sm text-gray-600">SUBTEXT</p>
  <a href="AFFILIATE_URL" target="_blank" rel="noopener noreferrer nofollow sponsored"
    className="mt-4 inline-flex items-center gap-2 px-8 py-3 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 text-white font-semibold text-sm hover:from-orange-600 hover:to-amber-600 shadow-lg shadow-orange-200 transition-all">
    Check Price on Amazon
  </a>
  <p className="mt-2 text-[10px] text-gray-400">Affiliate link — we may earn a commission</p>
</div>
\`\`\`

OUTPUT ONLY the raw MDX content. No markdown code fences. No explanations. Just the MDX file content.`;

function buildUserPrompt(type, title) {
  const date = today();

  const typeInstructions = {
    review: `Write a full SEO-optimized product roundup blog post titled "${title}".

Structure:
- Introduction (~150 words) explaining why this category matters
- Quick comparison table with 5 products using QuickComparisonTable
- 5 individual product reviews (~150 words each) using ProductReviewCard with: overview, 4-5 pros, 3-4 cons, best for, Amazon affiliate link
- Buying guide section with 4 H2 subsections relevant to the product category
- FAQ section with 5 questions using FAQSection (include JSON-LD via the component)
- Conclusion recommending the #1 pick with final CTA

Include the primary keyphrase from the title naturally 5-8 times throughout.`,

    comparison: `Write a full SEO-optimized head-to-head comparison blog post titled "${title}".

Structure:
- Introduction (~150 words) positioning both products
- Side-by-side specs comparison using a markdown table (8-10 categories with a Winner column)
- Product A deep dive (~200 words) using ProductReviewCard with 5-6 pros, 3-4 cons
- Product B deep dive (~200 words) using ProductReviewCard with 5-6 pros, 3-4 cons
- Head-to-head breakdown with 4 H2 sections (e.g., Price & Value, Key Feature 1, Key Feature 2, App/Usability)
- Verdict section: who should buy Product A, who should buy Product B (each with a CTA button)
- FAQ section with 4 questions using FAQSection
- Final CTA block with the overall winner

Include the primary keyphrase from the title naturally 5-8 times throughout.`,

    seasonal: `Write a full SEO-optimized seasonal/holiday blog post titled "${title}".

Structure:
- Introduction (~150 words) tying the season/holiday to pet product needs
- Quick comparison table with 5 products using QuickComparisonTable
- 5 individual product picks (~150 words each) using ProductReviewCard with: overview, 4-5 pros, 2-3 cons, best for, Amazon affiliate link
- Seasonal tips section with 3-4 H2 subsections (practical advice related to the season)
- FAQ section with 5 questions using FAQSection
- Conclusion with top pick and final CTA

Make it timely and emotionally engaging. Include the primary keyphrase naturally 5-8 times.`,

    guide: `Write a full SEO-optimized pet care guide blog post titled "${title}".

Structure:
- Introduction (~150 words) explaining why this topic matters for pet owners
- Quick comparison table with 5 recommended products using QuickComparisonTable
- Detailed guide section with 5-6 H2 subsections covering the topic thoroughly (mix of advice and product recommendations)
- For 3 key products, include ProductReviewCard with full pros/cons
- FAQ section with 5 questions using FAQSection
- Conclusion with actionable takeaways and a final product CTA

Be authoritative and practical. Include the primary keyphrase naturally 5-8 times.`,
  };

  return `${typeInstructions[type]}

Today's date for the byline: ${date}
Amazon affiliate tag: ${AFFILIATE_TAG}
All product affiliate URLs must use: https://www.amazon.com/s?k={Product+Name+Here}&tag=${AFFILIATE_TAG}

IMPORTANT: Output ONLY raw MDX. No code fences. No commentary. Start directly with the import statements.`;
}

// ─── Main ────────────────────────────────────────────────────────
async function main() {
  const args = parseArgs();
  const queue = readQueue();

  let title, type, slug;

  // Determine what to generate
  if (args.next) {
    const nextItem = queue.planned.find((p) => p.status === "planned");
    if (!nextItem) {
      console.log("No planned articles remaining in the queue.");
      process.exit(0);
    }
    title = nextItem.title;
    type = nextItem.type;
    slug = nextItem.slug;
    console.log(`Generating next planned article: "${title}" (${type})`);
  } else if (args.slug) {
    const item = queue.planned.find((p) => p.slug === args.slug);
    if (!item) {
      console.error(`Slug "${args.slug}" not found in content-queue.json`);
      process.exit(1);
    }
    if (item.status === "generated") {
      console.error(`Article "${item.title}" has already been generated.`);
      process.exit(1);
    }
    title = item.title;
    type = item.type;
    slug = item.slug;
    console.log(`Generating queued article: "${title}" (${type})`);
  } else if (args.type && args.title) {
    type = args.type;
    title = args.title;
    slug = slugify(title);

    if (!["review", "comparison", "seasonal", "guide"].includes(type)) {
      console.error('Invalid type. Use: review, comparison, seasonal, or guide');
      process.exit(1);
    }

    // Check for duplicates
    const isDuplicate =
      queue.generated.some((g) => g.slug === slug) ||
      queue.planned.some((p) => p.slug === slug && p.status === "generated");
    if (isDuplicate) {
      console.error(`Article with slug "${slug}" already exists.`);
      process.exit(1);
    }

    console.log(`Generating new ${type} article: "${title}"`);
  } else {
    console.log(`
HonestPawFinds Content Agent

Usage:
  node agents/content-agent.js --next
  node agents/content-agent.js --slug best-dog-gear-for-winter-2026
  node agents/content-agent.js --type review --title "Best Dog Crates in 2026"

Content types: review, comparison, seasonal, guide
    `);
    process.exit(0);
  }

  // Validate API key (only after we know we need it)
  if (!process.env.ANTHROPIC_API_KEY) {
    console.error("Error: ANTHROPIC_API_KEY not set in environment.");
    console.error("Add it to .env or export it: export ANTHROPIC_API_KEY=sk-...");
    process.exit(1);
  }

  // Generate with Claude
  const client = new Anthropic();

  console.log(`\nCalling Claude ${MODEL}...`);
  const startTime = Date.now();

  const response = await client.messages.create({
    model: MODEL,
    max_tokens: 8000,
    system: SYSTEM_PROMPT,
    messages: [
      {
        role: "user",
        content: buildUserPrompt(type, title),
      },
    ],
  });

  const mdxContent = response.content[0].text;
  const elapsed = ((Date.now() - startTime) / 1000).toFixed(1);
  console.log(`Generated in ${elapsed}s (${response.usage.output_tokens} tokens)`);

  // Write MDX file
  const outputPath = path.join(OUTPUT_DIR, `${slug}.mdx`);
  fs.writeFileSync(outputPath, mdxContent);
  console.log(`Saved: ${outputPath}`);

  // Update queue
  const queueItem = queue.planned.find((p) => p.slug === slug);
  if (queueItem) {
    queueItem.status = "generated";
    queueItem.generatedDate = today();
  }

  queue.generated.push({
    slug,
    title,
    type,
    generatedDate: today(),
    file: `content/blog/${slug}.mdx`,
    tokens: response.usage.output_tokens,
  });

  // If this was an ad-hoc article, also add to planned for tracking
  if (!queueItem) {
    queue.planned.push({
      slug,
      title,
      type,
      scheduledMonth: today().slice(0, 7),
      status: "generated",
      generatedDate: today(),
    });
  }

  writeQueue(queue);
  console.log("Updated content-queue.json");

  // Print next steps
  console.log(`
Next steps to publish:
  1. Copy to Next.js app directory:
     mkdir -p src/app/blog/${slug}
     cp ${outputPath} src/app/blog/${slug}/page.mdx

  2. Create a layout.tsx for SEO metadata (see existing layouts for reference)

  3. Add the route to src/app/sitemap.ts

  4. Run: npm run build && vercel --prod
`);
}

main().catch((err) => {
  console.error("Error:", err.message);
  process.exit(1);
});
