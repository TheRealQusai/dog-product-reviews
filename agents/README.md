# HonestPawFinds Agents

Automated agents for content generation, SEO maintenance, and analytics reporting.

## Quick Start

```bash
# Run full monthly maintenance (all agents in sequence)
npm run monthly-maintenance
```

## Agents

### Content Agent (`content-agent.js`)

Generates SEO-optimized MDX blog articles using Claude claude-sonnet-4-20250514.

```bash
# Generate the next scheduled article from the queue
npm run generate-content -- --next

# Generate a specific queued article by slug
npm run generate-content -- --slug best-dog-gear-for-winter-2026

# Generate an ad-hoc article
npm run generate-content -- --type review --title "Best Dog Crates in 2026"
```

**Content types:** `review`, `comparison`, `seasonal`, `guide`

**Requires:** `ANTHROPIC_API_KEY`

**Output:** Saves MDX to `/content/blog/{slug}.mdx` and updates `content-queue.json`

---

### Sitemap Agent (`sitemap-agent.js`)

Scans `/content/blog/` and `/src/app/blog/` for articles and generates `public/sitemap.xml`.

```bash
npm run update-sitemap
```

Runs automatically before every build via the `prebuild` npm script.

**Requires:** No credentials — reads files only.

---

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

Runs all agents in sequence: analytics → content → affiliate audit → sitemap rebuild.

```bash
npm run monthly-maintenance
```

Skips analytics and content generation gracefully if credentials are missing.

## Environment Variables

| Variable | Used By | Required |
| --- | --- | --- |
| `ANTHROPIC_API_KEY` | Content Agent | For content generation |
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

Set status to `"planned"`. The content agent changes it to `"generated"` after writing the article.
