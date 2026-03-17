#!/usr/bin/env node

/**
 * HonestPawFinds Google Analytics Reporting Agent
 *
 * Pulls monthly stats from GA4 via the Google Analytics Data API.
 *
 * ─── SETUP INSTRUCTIONS ──────────────────────────────────────────
 * 1. Go to https://console.cloud.google.com
 * 2. Create a project (or use existing) → enable "Google Analytics Data API"
 * 3. Create a Service Account:
 *    IAM & Admin → Service Accounts → Create
 *    Name it "honestpawfinds-analytics" → Grant no roles → Done
 * 4. Create a JSON key:
 *    Click the service account → Keys → Add Key → JSON → Download
 * 5. Add the service account email to GA4:
 *    GA4 Admin → Property → Property Access Management → Add
 *    Paste the service account email, grant "Viewer" role
 * 6. Set environment variables:
 *    GOOGLE_ANALYTICS_PROPERTY_ID=123456789  (numeric, from GA4 Admin → Property Settings)
 *    GOOGLE_APPLICATION_CREDENTIALS=/path/to/service-account.json
 *
 * Usage:
 *   node agents/analytics-agent.js              # current month
 *   node agents/analytics-agent.js 2026-02      # specific month
 * ──────────────────────────────────────────────────────────────────
 */

require("dotenv").config();

const { BetaAnalyticsDataClient } = require("@google-analytics/data");
const fs = require("fs");
const path = require("path");

const REPORTS_DIR = path.join(__dirname, "analytics-reports");
const PROPERTY_ID = process.env.GOOGLE_ANALYTICS_PROPERTY_ID;

// ─── Helpers ─────────────────────────────────────────────────────
function getMonthRange(monthStr) {
  // monthStr = "2026-03"
  const [year, month] = monthStr.split("-").map(Number);
  const start = new Date(year, month - 1, 1);
  const end = new Date(year, month, 0); // last day of month
  return {
    startDate: start.toISOString().split("T")[0],
    endDate: end.toISOString().split("T")[0],
  };
}

function getPrevMonth(monthStr) {
  const [year, month] = monthStr.split("-").map(Number);
  const d = new Date(year, month - 2, 1);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
}

// ─── Main ────────────────────────────────────────────────────────
async function main() {
  if (!PROPERTY_ID) {
    console.error("Error: GOOGLE_ANALYTICS_PROPERTY_ID not set.");
    console.error("See setup instructions at the top of this file.");
    process.exit(1);
  }

  if (!process.env.GOOGLE_APPLICATION_CREDENTIALS) {
    console.error("Error: GOOGLE_APPLICATION_CREDENTIALS not set.");
    console.error("Point it to your service account JSON key file.");
    process.exit(1);
  }

  const targetMonth =
    process.argv[2] ||
    `${new Date().getFullYear()}-${String(new Date().getMonth() + 1).padStart(2, "0")}`;

  const { startDate, endDate } = getMonthRange(targetMonth);
  console.log(`Pulling GA4 data for ${targetMonth} (${startDate} → ${endDate})\n`);

  const client = new BetaAnalyticsDataClient();
  const propertyPath = `properties/${PROPERTY_ID}`;

  // ── Total visitors & session metrics ─────────────────────────
  const [metricsResponse] = await client.runReport({
    property: propertyPath,
    dateRanges: [{ startDate, endDate }],
    metrics: [
      { name: "totalUsers" },
      { name: "sessions" },
      { name: "averageSessionDuration" },
      { name: "bounceRate" },
    ],
  });

  const row = metricsResponse.rows?.[0];
  const totalUsers = row ? parseInt(row.metricValues[0].value) : 0;
  const sessions = row ? parseInt(row.metricValues[1].value) : 0;
  const avgDuration = row ? parseFloat(row.metricValues[2].value).toFixed(1) : "0";
  const bounceRate = row ? (parseFloat(row.metricValues[3].value) * 100).toFixed(1) : "0";

  // ── Top 5 pages ──────────────────────────────────────────────
  const [pagesResponse] = await client.runReport({
    property: propertyPath,
    dateRanges: [{ startDate, endDate }],
    dimensions: [{ name: "pagePath" }],
    metrics: [{ name: "screenPageViews" }],
    orderBys: [{ metric: { metricName: "screenPageViews" }, desc: true }],
    limit: 5,
  });

  const topPages = (pagesResponse.rows || []).map((r) => ({
    page: r.dimensionValues[0].value,
    views: parseInt(r.metricValues[0].value),
  }));

  // ── Traffic sources ──────────────────────────────────────────
  const [sourcesResponse] = await client.runReport({
    property: propertyPath,
    dateRanges: [{ startDate, endDate }],
    dimensions: [{ name: "sessionDefaultChannelGroup" }],
    metrics: [{ name: "sessions" }],
    orderBys: [{ metric: { metricName: "sessions" }, desc: true }],
  });

  const trafficSources = (sourcesResponse.rows || []).map((r) => ({
    source: r.dimensionValues[0].value,
    sessions: parseInt(r.metricValues[0].value),
  }));

  // ── Build report ─────────────────────────────────────────────
  const report = {
    month: targetMonth,
    generatedAt: new Date().toISOString(),
    metrics: {
      totalUsers,
      sessions,
      averageSessionDuration: `${avgDuration}s`,
      bounceRate: `${bounceRate}%`,
    },
    topPages,
    trafficSources,
  };

  // ── Load previous month for comparison ───────────────────────
  const prevMonth = getPrevMonth(targetMonth);
  const prevReportPath = path.join(REPORTS_DIR, `${prevMonth}.json`);
  let growth = null;

  if (fs.existsSync(prevReportPath)) {
    const prev = JSON.parse(fs.readFileSync(prevReportPath, "utf-8"));
    const prevUsers = prev.metrics.totalUsers;
    if (prevUsers > 0) {
      growth = (((totalUsers - prevUsers) / prevUsers) * 100).toFixed(1);
    }
    report.monthOverMonth = {
      previousUsers: prevUsers,
      currentUsers: totalUsers,
      growthPercent: growth ? `${growth}%` : "N/A",
    };
  }

  // ── Save report ──────────────────────────────────────────────
  if (!fs.existsSync(REPORTS_DIR)) {
    fs.mkdirSync(REPORTS_DIR, { recursive: true });
  }

  const reportPath = path.join(REPORTS_DIR, `${targetMonth}.json`);
  fs.writeFileSync(reportPath, JSON.stringify(report, null, 2) + "\n");

  // ── Terminal summary ─────────────────────────────────────────
  console.log(`Analytics Report: ${targetMonth}`);
  console.log("─".repeat(50));
  console.log(`Visitors:          ${totalUsers.toLocaleString()}`);
  console.log(`Sessions:          ${sessions.toLocaleString()}`);
  console.log(`Avg Duration:      ${avgDuration}s`);
  console.log(`Bounce Rate:       ${bounceRate}%`);

  if (growth !== null) {
    const arrow = parseFloat(growth) >= 0 ? "↑" : "↓";
    console.log(`MoM Growth:        ${arrow} ${growth}%`);
  }

  console.log(`\nTop Pages:`);
  for (const p of topPages) {
    console.log(`  ${p.views.toString().padStart(6)} views  ${p.page}`);
  }

  console.log(`\nTraffic Sources:`);
  for (const s of trafficSources) {
    console.log(`  ${s.sessions.toString().padStart(6)} sessions  ${s.source}`);
  }

  console.log(`\nReport saved: ${reportPath}`);
}

main().catch((err) => {
  console.error("Error:", err.message);
  process.exit(1);
});
