# The One Clinic — Website

Premium aesthetic and wellness clinic website built with Next.js App Router, TypeScript, CSS Modules, and Framer Motion.

## Tech Stack

| Layer | Choice |
|---|---|
| Framework | Next.js 16 (App Router, Turbopack) |
| Language | TypeScript |
| Styling | CSS Modules + CSS custom properties |
| Animation | Framer Motion |
| Font | Inter Variable (self-hosted) |

## Project Structure

```
├── app/
│   ├── layout.tsx          # Root layout, metadata, skip-link
│   ├── page.tsx            # Homepage (all sections)
│   └── treatments/
│       ├── page.tsx        # Treatments listing page
│       └── [slug]/
│           └── page.tsx    # Dynamic treatment page
├── components/
│   ├── layout/
│   │   ├── Header/         # Fixed, animated navbar
│   │   └── Footer/
│   ├── sections/           # Page sections (one folder per section)
│   └── ui/                 # Reusable primitives (Button, Card, Input, …)
├── data/
│   └── treatments.ts       # Treatment data + helper functions
├── lib/
│   └── motion.ts           # Shared Framer Motion variants
├── public/
│   └── fonts/              # Self-hosted Inter Variable woff2
└── styles/
    ├── variables.css        # Design tokens
    └── globals.css          # Reset, typography, utilities
```

## Getting Started

### Prerequisites

- Node.js >= 20
- npm >= 10

### Install

```bash
npm install
```

### Run locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Build

```bash
npm run build
npm start
```

### Lint

```bash
npm run lint
```

## Design System

The site uses a black/white premium palette. All design tokens live in `styles/variables.css`. Sections alternate between light (`--color-bg-light`) and dark (`--color-bg-dark`) backgrounds using the `variant` prop on the `Section` component.

## Adding a Treatment

1. Add an entry to the `treatments` array in `data/treatments.ts` following the `Treatment` type.
2. That's it — `generateStaticParams` picks it up automatically and a new page is built at `/treatments/[slug]`.

## Deployment

See [docs/deployment.md](docs/deployment.md).
