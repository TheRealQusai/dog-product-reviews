#!/usr/bin/env node

/**
 * HonestPawFinds Analytics Reminder
 *
 * Prints links to check analytics and earnings manually,
 * and logs a timestamp so we can track when it was last reviewed.
 *
 * Usage:
 *   node agents/analytics-agent.js
 *   npm run analytics-report
 */

const fs = require("fs");
const path = require("path");

const REPORTS_DIR = path.join(__dirname, "analytics-reports");

function main() {
  const now = new Date();
  const month = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`;

  console.log("📊 Check your analytics manually at: https://analytics.google.com");
  console.log("🔗 Check your Amazon earnings at: https://affiliate-program.amazon.com");

  // Save a simple log entry
  if (!fs.existsSync(REPORTS_DIR)) {
    fs.mkdirSync(REPORTS_DIR, { recursive: true });
  }

  const report = {
    month,
    checkedAt: now.toISOString(),
    checked_manually: true,
  };

  const reportPath = path.join(REPORTS_DIR, `${month}.json`);
  fs.writeFileSync(reportPath, JSON.stringify(report, null, 2) + "\n");
  console.log(`\nLogged review to: ${reportPath}`);
}

main();
