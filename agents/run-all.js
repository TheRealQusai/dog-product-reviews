#!/usr/bin/env node

/**
 * HonestPawFinds Monthly Maintenance Orchestrator
 *
 * Runs maintenance agents in sequence:
 *   1. Affiliate link audit + auto-fix
 *   2. Sitemap rebuild
 *   3. Analytics reminder (manual check)
 *
 * Content is created manually via Claude Code — not part of this routine.
 *
 * Usage:
 *   node agents/run-all.js
 *   npm run monthly-maintenance
 */

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

function main() {
  console.log("🐾 HonestPawFinds Monthly Maintenance");
  console.log(`   ${new Date().toISOString().split("T")[0]}\n`);

  const results = {};

  // 1. Affiliate audit + fix
  results.affiliate = run(
    "1/3  Affiliate Link Audit & Fix",
    "node agents/affiliate-agent.js --fix"
  );

  // 2. Sitemap rebuild
  results.sitemap = run("2/3  Sitemap Rebuild", "node agents/sitemap-agent.js");

  // 3. Analytics reminder
  results.analytics = run("3/3  Analytics Reminder", "node agents/analytics-agent.js");

  // ── Final Summary ────────────────────────────────────────────
  console.log(`${"═".repeat(60)}`);
  console.log("  MONTHLY MAINTENANCE SUMMARY");
  console.log("═".repeat(60));

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

  // Analytics
  console.log("  📊 Check analytics manually at: analytics.google.com");
  console.log("  🔗 Check earnings manually at: affiliate-program.amazon.com");

  // Next scheduled article
  try {
    const queue = JSON.parse(fs.readFileSync(QUEUE_PATH, "utf-8"));
    const nextPlanned = queue.planned.find((p) => p.status === "planned");
    if (nextPlanned) {
      console.log(
        `  📅 Next article due: "${nextPlanned.title}" — ${nextPlanned.scheduledMonth}`
      );
    } else {
      console.log("  📅 No more articles in the queue");
    }
  } catch {
    // queue file missing
  }

  console.log("");
}

main();
