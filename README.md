# HonestPawFinds

**Honest Reviews. Happy Pets.**

Pet product review and affiliate website built with Next.js 14, Tailwind CSS, and MDX.

**Live:** [honestpawfinds.xyz](https://honestpawfinds.xyz)

## Stack

- **Framework:** Next.js 14 (App Router)
- **Styling:** Tailwind CSS
- **Content:** MDX for blog posts
- **Deployment:** Vercel
- **SEO:** Per-page metadata, Open Graph, Twitter cards, sitemap.xml, robots.txt, FAQ JSON-LD

## Getting Started

```bash
cp .env.example .env.local
npm install
npm run dev
```

## Environment Variables

See `.env.example` for all available variables. Key ones:

| Variable | Description |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Canonical site URL |
| `NEXT_PUBLIC_CONTACT_EMAIL` | Contact email on legal pages |
| `NEXT_PUBLIC_GA_MEASUREMENT_ID` | Google Analytics ID |
| `NEXT_PUBLIC_AMAZON_TAG` | Amazon Associates tag |

## Project Structure

```
src/
├── app/                    # Pages and layouts
│   ├── reviews/            # MDX blog posts
│   ├── privacy-policy/
│   └── terms-of-service/
├── components/             # Reusable UI components
│   └── mdx/                # MDX-specific components
└── lib/                    # Shared config
```
