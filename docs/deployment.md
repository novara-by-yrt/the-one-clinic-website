# Deployment Guide

## Vercel (Recommended)

### First deployment

1. Push your branch to GitHub.
2. Go to [vercel.com](https://vercel.com) and click **Add New Project**.
3. Import the `MangoEyes-LLC-Fz/The-One-Clinic-Website` repository.
4. Vercel auto-detects Next.js — no build settings need changing.
5. Click **Deploy**.

The live URL will be something like `the-one-clinic-website.vercel.app`.

### Environment variables

There are no required environment variables for the base project. If you add external services (CMS, booking API, analytics), add them in **Vercel Dashboard → Settings → Environment Variables**.

### Custom domain

In **Vercel Dashboard → Domains**, add your domain and follow the DNS instructions (typically an A record or CNAME).

---

## Branch Strategy

| Branch | Purpose | Vercel behaviour |
|---|---|---|
| `main` | Production | Auto-deploys to production URL |
| `claude/init-clinic-website-pJV3Y` | Feature/development | Auto-deploys to a preview URL |
| Any PR branch | Review | Preview URL posted as PR comment |

Every push to any branch creates an isolated preview deployment. Share preview URLs with stakeholders before merging to `main`.

---

## GitHub Integration

Vercel's GitHub app posts deployment status checks directly on pull requests. To enable:

1. In Vercel, go to **Settings → Git** and confirm the repository is connected.
2. Ensure the Vercel GitHub App has access to the repository in **GitHub → Settings → Applications**.

---

## Build Output

This is a statically optimised Next.js site. Treatment pages are pre-rendered at build time via `generateStaticParams`. The output is:

- `/` — static HTML
- `/treatments` — static HTML
- `/treatments/[slug]` — 6 static HTML pages (one per treatment)

No server-side rendering is used — the site can be hosted on any static CDN if needed, though Vercel's edge network is recommended.

---

## Previewing the Production Build Locally

```bash
npm run build
npm start
```

Then open [http://localhost:3000](http://localhost:3000).

---

## Lighthouse Targets

| Metric | Target |
|---|---|
| Performance | >= 90 |
| Accessibility | 100 |
| Best Practices | 100 |
| SEO | 100 |

Run Lighthouse in Chrome DevTools against the production URL after each significant change.
