#!/usr/bin/env node

/**
 * HonestPawFinds Monthly Maintenance Orchestrator
 *
 * Runs all agents in sequence:
 *   1. Analytics report (pull last month's stats)
 *   2. Content generation (next scheduled article)
 *   3. Affiliate link audit + fix
 *   4. Sitemap rebuild
 *
 * Usage:
 *   node agents/run-all.js
 *   npm run monthly-maintenance
 */

require("dotenv").config();

const { execSync } = require("child_process");
const fs = require("fs");
const path = require("path");

const QUEUE_PATH = path.join(__dirname, "content-queue.json");

function run(label, command) {
  console.log(`\n${"═".repeat(60)}`);
  console.log(`  ${label}`);
  console.log("═".repeat(60));

  try {
    const output = execSync(command, {
      cwd: path.join(__dirname, ".."),
      encoding: "utf-8",
      stdio: "pipe",
    });
    console.log(output);
    return { success: true, output };
  } catch (err) {
    console.log(err.stdout || "");
    console.error(err.stderr || err.message);
    return { success: false, output: err.stdout || "", error: err.stderr || err.message };
  }
}

function getLastMonth() {
  const d = new Date();
  d.setMonth(d.getMonth() - 1);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
}

function main() {
  console.log("🐾 HonestPawFinds Monthly Maintenance");
  console.log(`   ${new Date().toISOString().split("T")[0]}\n`);

  const results = {};

  // 1. Analytics
  const hasAnalytics =
    process.env.GOOGLE_ANALYTICS_PROPERTY_ID &&
    process.env.GOOGLE_APPLICATION_CREDENTIALS;

  if (hasAnalytics) {
    const month = getLastMonth();
    results.analytics = run(
      `1/4  Analytics Report (${month})`,
      `node agents/analytics-agent.js ${month}`
    );
  } else {
    console.log(`\n${"═".repeat(60)}`);
    console.log("  1/4  Analytics Report — SKIPPED (credentials not configured)");
    console.log("═".repeat(60));
    results.analytics = { success: false, skipped: true };
  }

  // 2. Content generation
  const hasApiKey = !!process.env.ANTHROPIC_API_KEY;
  if (hasApiKey) {
    results.content = run(
      "2/4  Content Generation (next in queue)",
      "node agents/content-agent.js --next"
    );
  } else {
    console.log(`\n${"═".repeat(60)}`);
    console.log("  2/4  Content Generation — SKIPPED (ANTHROPIC_API_KEY not set)");
    console.log("═".repeat(60));
    results.content = { success: false, skipped: true };
  }

  // 3. Affiliate audit + fix
  results.affiliate = run(
    "3/4  Affiliate Link Audit & Fix",
    "node agents/affiliate-agent.js --fix"
  );

  // 4. Sitemap rebuild
  results.sitemap = run("4/4  Sitemap Rebuild", "node agents/sitemap-agent.js");

  // ── Final Summary ────────────────────────────────────────────
  console.log(`\n${"═".repeat(60)}`);
  console.log("  MONTHLY MAINTENANCE SUMMARY");
  console.log("═".repeat(60));

  // Analytics
  if (results.analytics.skipped) {
    console.log("  ⏭️  Analytics: skipped (no credentials)");
  } else if (results.analytics.success) {
    console.log("  ✅ Analytics report saved");
  } else {
    console.log("  ❌ Analytics report failed");
  }

  // Content
  if (results.content.skipped) {
    console.log("  ⏭️  Content: skipped (no API key)");
  } else if (results.content.success) {
    // Extract article title from output
    const titleMatch = results.content.output.match(/article:\s*"(.+?)"/);
    const title = titleMatch ? titleMatch[1] : "new article";
    console.log(`  ✅ New article generated: ${title}`);
  } else {
    console.log("  ❌ Content generation failed");
  }

  // Affiliate
  if (results.affiliate.success) {
    const fixedMatch = results.affiliate.output.match(/Issues found:\s+(\d+)/);
    const fixed = fixedMatch ? fixedMatch[1] : "0";
    const linksMatch = results.affiliate.output.match(/Affiliate links:\s+(\d+)/);
    const links = linksMatch ? linksMatch[1] : "?";
    console.log(`  ✅ Affiliate links audited: ${links} links, ${fixed} issues fixed`);
  } else {
    console.log("  ❌ Affiliate audit failed");
  }

  // Sitemap
  if (results.sitemap.success) {
    const urlMatch = results.sitemap.output.match(/(\d+) total URLs/);
    const urls = urlMatch ? urlMatch[1] : "?";
    console.log(`  ✅ Sitemap updated: ${urls} URLs`);
  } else {
    console.log("  ❌ Sitemap rebuild failed");
  }

  // Next scheduled article
  try {
    const queue = JSON.parse(fs.readFileSync(QUEUE_PATH, "utf-8"));
    const nextPlanned = queue.planned.find((p) => p.status === "planned");
    if (nextPlanned) {
      console.log(
        `\n  📅 Next scheduled: "${nextPlanned.title}" — ${nextPlanned.scheduledMonth}`
      );
    } else {
      console.log("\n  📅 No more articles in the queue");
    }
  } catch {
    // queue file missing — not critical
  }

  console.log("");
}

main();
