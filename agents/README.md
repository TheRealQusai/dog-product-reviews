# HonestPawFinds Agents

Automated agents for SEO maintenance. Content is created manually via Claude Code. Analytics are checked manually via the GA4 dashboard.

## Quick Start

```bash
# Run full monthly maintenance
npm run monthly-maintenance
```

## Agents

### Affiliate Agent (`affiliate-agent.js`)

Audits all MDX files for Amazon affiliate link issues (missing tag, missing rel, missing target, placeholders).

```bash
# Dry run — report issues without changing files
npm run audit-links

# Auto-fix all issues
npm run fix-links
```

**Output:** Report saved to `agents/affiliate-report.json`

---

### Sitemap Agent (`sitemap-agent.js`)

Scans `/content/blog/` and `/src/app/blog/` for articles and generates `public/sitemap.xml`.

```bash
npm run update-sitemap
```

Runs automatically before every build via the `prebuild` npm script.

---

### Analytics Reminder (`analytics-agent.js`)

Prints links to check GA4 and Amazon earnings manually, and logs a timestamp.

```bash
npm run analytics-report
```

**Output:** Timestamp saved to `agents/analytics-reports/YYYY-MM.json`

---

### Content Agent (`content-agent.js`)

Standalone tool for generating MDX articles via Claude claude-sonnet-4-20250514. Not part of the monthly routine — content is created manually via Claude Code.

```bash
# Requires ANTHROPIC_API_KEY in environment
node agents/content-agent.js --type review --title "Best Dog Crates in 2026"
node agents/content-agent.js --next
node agents/content-agent.js --slug best-dog-gear-for-winter-2026
```

---

### Monthly Orchestrator (`run-all.js`)

Runs all maintenance agents in sequence: affiliate audit → sitemap rebuild → analytics reminder.

```bash
npm run monthly-maintenance
```

No environment variables required.

## Environment Variables

No env vars are required to run any agent. All agents work out of the box.

| Variable | Used By | Notes |
| --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Sitemap Agent | Falls back to honestpawfinds.xyz |

## Adding Topics to the Content Queue

Edit `agents/content-queue.json` and add entries to the `planned` array:

```json
{
  "slug": "best-dog-crates-for-apartment-living",
  "title": "Best Dog Crates for Apartment Living",
  "type": "review",
  "scheduledMonth": "2027-01",
  "status": "planned"
}
```

Valid types: `review`, `comparison`, `seasonal`, `guide`

Set status to `"planned"`. Mark as `"generated"` after writing the article.
