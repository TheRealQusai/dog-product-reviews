#!/usr/bin/env node

/**
 * HonestPawFinds Affiliate Link Audit Agent
 *
 * Scans all MDX files for Amazon affiliate links and checks for:
 * - Missing affiliate tag (honestpawfind-20)
 * - Missing rel="nofollow sponsored"
 * - Missing target="_blank"
 * - Broken/placeholder URLs
 *
 * Usage:
 *   node agents/affiliate-agent.js          # audit only (dry run)
 *   node agents/affiliate-agent.js --fix    # audit and auto-fix
 */

const fs = require("fs");
const path = require("path");

// ─── Config ──────────────────────────────────────────────────────
const AFFILIATE_TAG = "honestpawfind-20";
const REPORT_PATH = path.join(__dirname, "affiliate-report.json");
const SCAN_DIRS = [
  path.join(__dirname, "..", "content", "blog"),
  path.join(__dirname, "..", "src", "app", "blog"),
];

const FIX_MODE = process.argv.includes("--fix");

// ─── Helpers ─────────────────────────────────────────────────────
function findMdxFiles(dir) {
  if (!fs.existsSync(dir)) return [];
  const results = [];

  function walk(d) {
    for (const entry of fs.readdirSync(d, { withFileTypes: true })) {
      const full = path.join(d, entry.name);
      if (entry.isDirectory()) walk(full);
      else if (entry.name.endsWith(".mdx") || entry.name.endsWith(".tsx"))
        results.push(full);
    }
  }

  walk(dir);
  return results;
}

function isAmazonUrl(url) {
  return /amazon\.com/i.test(url);
}

function isPlaceholderUrl(url) {
  return (
    /example\.com/i.test(url) ||
    /PLACEHOLDER/i.test(url) ||
    /yourtag-20/.test(url) ||
    url === "#" ||
    url === ""
  );
}

// ─── Link extraction ─────────────────────────────────────────────
// Matches href="..." in JSX/HTML and affiliateUrl="..." or affiliateUrl: "..."
const LINK_PATTERNS = [
  /href="([^"]+)"/g,
  /affiliateUrl[=:]\s*"([^"]+)"/g,
];

function extractLinks(content) {
  const links = [];
  for (const pattern of LINK_PATTERNS) {
    const regex = new RegExp(pattern.source, pattern.flags);
    let match;
    while ((match = regex.exec(content)) !== null) {
      links.push({ url: match[1], index: match.index, full: match[0] });
    }
  }
  return links;
}

// ─── Auditing ────────────────────────────────────────────────────
function auditFile(filePath) {
  const content = fs.readFileSync(filePath, "utf-8");
  const links = extractLinks(content);
  const issues = [];
  let fixedContent = content;

  for (const link of links) {
    // Skip non-Amazon links (privacy-policy, anchor links, etc.)
    if (!isAmazonUrl(link.url) && !isPlaceholderUrl(link.url)) continue;

    const linkIssues = [];

    // Check for placeholder URLs
    if (isPlaceholderUrl(link.url)) {
      linkIssues.push("placeholder-url");
    }

    // Check for missing affiliate tag
    if (isAmazonUrl(link.url) && !link.url.includes(`tag=${AFFILIATE_TAG}`)) {
      linkIssues.push("missing-affiliate-tag");

      if (FIX_MODE) {
        const hasTag = /tag=[^&"]+/.test(link.url);
        let fixedUrl;
        if (hasTag) {
          fixedUrl = link.url.replace(/tag=[^&"]+/, `tag=${AFFILIATE_TAG}`);
        } else {
          fixedUrl = link.url + (link.url.includes("?") ? "&" : "?") + `tag=${AFFILIATE_TAG}`;
        }
        fixedContent = fixedContent.split(link.url).join(fixedUrl);
      }
    }

    // For href= links (not affiliateUrl props), check rel and target
    if (link.full.startsWith("href=") && isAmazonUrl(link.url)) {
      // Find the surrounding tag context (look back ~200 chars for the opening <a or similar)
      const contextStart = Math.max(0, link.index - 200);
      const context = fixedContent.slice(contextStart, link.index + link.full.length + 200);

      if (!context.includes('rel="noopener noreferrer nofollow sponsored"')) {
        linkIssues.push("missing-rel-nofollow-sponsored");

        if (FIX_MODE) {
          // Replace old rel or add rel
          if (/rel="[^"]*"/.test(context)) {
            fixedContent = fixedContent.replace(
              new RegExp(`(href="${escapeRegex(link.url)}"[^>]*?)rel="[^"]*"`),
              `$1rel="noopener noreferrer nofollow sponsored"`
            );
          }
        }
      }

      if (!context.includes('target="_blank"')) {
        linkIssues.push("missing-target-blank");

        if (FIX_MODE) {
          // Add target="_blank" after the href
          fixedContent = fixedContent.replace(
            new RegExp(`href="${escapeRegex(link.url)}"(?!\\s*target=)`),
            `href="${link.url}" target="_blank"`
          );
        }
      }
    }

    if (linkIssues.length > 0) {
      issues.push({
        url: link.url,
        issues: linkIssues,
      });
    }
  }

  // Write fixes if any
  if (FIX_MODE && fixedContent !== content) {
    fs.writeFileSync(filePath, fixedContent);
  }

  return {
    file: path.relative(process.cwd(), filePath),
    totalLinks: links.filter((l) => isAmazonUrl(l.url) || isPlaceholderUrl(l.url)).length,
    issues,
    fixed: FIX_MODE && fixedContent !== content,
  };
}

function escapeRegex(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

// ─── Main ────────────────────────────────────────────────────────
function main() {
  console.log(`Affiliate Link Audit${FIX_MODE ? " (FIX MODE)" : " (dry run)"}\n`);

  const allFiles = [];
  for (const dir of SCAN_DIRS) {
    allFiles.push(...findMdxFiles(dir));
  }

  if (allFiles.length === 0) {
    console.log("No MDX/TSX files found to scan.");
    return;
  }

  let totalLinks = 0;
  let totalIssues = 0;
  let totalFixed = 0;
  const fileResults = [];
  const needsManualReview = [];

  for (const file of allFiles) {
    const result = auditFile(file);
    totalLinks += result.totalLinks;
    totalIssues += result.issues.length;
    if (result.fixed) totalFixed++;
    fileResults.push(result);

    // Placeholder URLs need manual review — can't auto-fix
    for (const issue of result.issues) {
      if (issue.issues.includes("placeholder-url")) {
        needsManualReview.push({
          file: result.file,
          url: issue.url,
          reason: "Placeholder URL needs a real Amazon search link",
        });
      }
    }

    // Print per-file results
    if (result.issues.length > 0) {
      console.log(`${result.fixed ? "FIXED" : "ISSUES"} ${result.file}`);
      for (const issue of result.issues) {
        console.log(`  ${issue.issues.join(", ")} → ${issue.url.slice(0, 80)}`);
      }
    } else if (result.totalLinks > 0) {
      console.log(`  OK   ${result.file} (${result.totalLinks} links)`);
    }
  }

  // Summary
  console.log(`\n${"─".repeat(60)}`);
  console.log(`Files scanned:    ${allFiles.length}`);
  console.log(`Affiliate links:  ${totalLinks}`);
  console.log(`Issues found:     ${totalIssues}`);
  console.log(`Files fixed:      ${totalFixed}`);
  console.log(`Manual review:    ${needsManualReview.length}`);

  if (!FIX_MODE && totalIssues > 0) {
    console.log(`\nRun with --fix to auto-fix: node agents/affiliate-agent.js --fix`);
  }

  // Write report
  const report = {
    lastAudit: new Date().toISOString(),
    mode: FIX_MODE ? "fix" : "audit",
    summary: {
      filesScanned: allFiles.length,
      totalLinks,
      issuesFound: totalIssues,
      filesFixed: totalFixed,
      needsManualReview: needsManualReview.length,
    },
    needsManualReview,
    files: fileResults,
  };

  fs.writeFileSync(REPORT_PATH, JSON.stringify(report, null, 2) + "\n");
  console.log(`\nReport saved: ${REPORT_PATH}`);
}

main();
