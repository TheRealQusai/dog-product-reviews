# HonestPawFinds Agents

Automated agents for SEO maintenance and analytics reporting. Content is created manually via Claude Code.

## Quick Start

```bash
# Run full monthly maintenance (all agents in sequence)
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

**Requires:** No credentials — reads/writes local files only.

**Output:** Report saved to `agents/affiliate-report.json`

---

### Sitemap Agent (`sitemap-agent.js`)

Scans `/content/blog/` and `/src/app/blog/` for articles and generates `public/sitemap.xml`.

```bash
npm run update-sitemap
```

Runs automatically before every build via the `prebuild` npm script.

**Requires:** No credentials — reads files only.

---

### Analytics Agent (`analytics-agent.js`)

Pulls monthly GA4 stats via the Google Analytics Data API.

```bash
# Current month
npm run analytics-report

# Specific month
npm run analytics-report -- 2026-02
```

**Requires:**
- `GOOGLE_ANALYTICS_PROPERTY_ID` — numeric property ID from GA4 Admin
- `GOOGLE_APPLICATION_CREDENTIALS` — path to service account JSON key

See setup instructions at the top of `analytics-agent.js`.

**Output:** Report saved to `agents/analytics-reports/YYYY-MM.json`

---

### Monthly Orchestrator (`run-all.js`)

Runs maintenance agents in sequence: affiliate audit → sitemap rebuild → analytics report.

```bash
npm run monthly-maintenance
```

Skips analytics gracefully if credentials are not configured.

---

### Content Agent (`content-agent.js`)

Standalone tool for generating MDX articles via Claude claude-sonnet-4-20250514. Not part of the monthly routine — content is created manually via Claude Code.

```bash
# Requires ANTHROPIC_API_KEY in environment
node agents/content-agent.js --type review --title "Best Dog Crates in 2026"
node agents/content-agent.js --next
node agents/content-agent.js --slug best-dog-gear-for-winter-2026
```

**Content types:** `review`, `comparison`, `seasonal`, `guide`

## Environment Variables

| Variable | Used By | Required |
| --- | --- | --- |
| `GOOGLE_ANALYTICS_PROPERTY_ID` | Analytics Agent | For GA reports |
| `GOOGLE_APPLICATION_CREDENTIALS` | Analytics Agent | For GA reports |
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
