# AI Context — The One Clinic Website

This document describes the architecture so that AI assistants (and new contributors) can understand how to extend the codebase correctly.

---

## Architecture Overview

Next.js 16 App Router project. All routes live under `app/`. There is no `pages/` directory.

### Key conventions

- **`'use client'`** is required on any component that uses hooks, browser APIs, or Framer Motion.
- **`params` is a `Promise`** in Next.js 16. Always `await params` in `generateMetadata` and page components: `const { slug } = await params;`
- **CSS Modules** for all component styles. No Tailwind, no styled-components.
- **No barrel `index.ts` re-exports** — import directly from the file path.

---

## Section Theme System

The site alternates between light and dark sections. This is implemented in two places:

### 1. Section component (`components/ui/Section.tsx`)

Pass `variant="light"` or `variant="dark"`. The component applies `.light` or `.dark` CSS Module class and sets a `data-section-theme` attribute.

```tsx
<Section variant="dark" data-section-theme="dark">
  ...
</Section>
```

### 2. Cascade rules (`components/ui/Section.module.css`)

Descendent selectors are wrapped in `:where()` to keep specificity at `(0,0,1)`, which allows component CSS Module classes `(0,1,0)` to override without `!important`.

```css
:where(.dark) h1, :where(.dark) h2 { color: var(--color-text-light); }
:where(.dark) p { color: rgb(255 255 255 / 0.65); }
```

**Rule**: never use `color: ... !important` in section CSS modules — it is unnecessary and will be removed.

### 3. Header theme detection

The Header watches `[data-section-theme]` elements via `IntersectionObserver` with `rootMargin: '-64px 0px -88% 0px'`. When a section enters the thin band just below the fixed header, `data-theme` is set on the header element and CSS selectors change logo/link colours accordingly.

---

## Component Structure

### UI Primitives (`components/ui/`)

| Component | Purpose |
|---|---|
| `Button` | Primary/ghost variants, light/dark theme |
| `Card` | Surface container, light/dark theme |
| `Input` | Text input + textarea (discriminated union props) |
| `Accordion` | CSS-only animation via `grid-template-rows: 0fr → 1fr` |
| `Container` | Max-width centred wrapper |
| `Section` | Section wrapper with theme variant |

### Layout (`components/layout/`)

- **Header** — fixed, transparent on dark hero, solid on light sections. Uses `useScroll` for scroll detection and `IntersectionObserver` for theme detection.
- **Footer** — static.

### Sections (`components/sections/`)

Each section has its own folder with `ComponentName.tsx` and `ComponentName.module.css`. No shared CSS between sections — each is fully self-contained.

---

## Animation System (`lib/motion.ts`)

All Framer Motion variants are centralised:

```ts
fadeUp    // opacity 0→1, y 20→0 over 0.6s
fadeIn    // opacity only
stagger() // parent container variant with staggerChildren
VIEWPORT  // { once: true, margin: '-80px' } — standard whileInView config
```

Always use `whileInView` (not `animate`) for below-the-fold sections. Always pass `viewport={VIEWPORT}` for consistent behaviour.

---

## Treatments Data (`data/treatments.ts`)

The `Treatment` type:

```ts
type Treatment = {
  slug: string;
  title: string;
  category: string;
  shortDescription: string;
  description: string;       // paragraphs separated by \n\n
  benefits: { title: string; description: string }[];
  process: { number: string; title: string; description: string }[];
  faq?: { question: string; answer: string }[];
};
```

Helper functions: `getTreatmentBySlug(slug)`, `getAllSlugs()`.

---

## Design Tokens (`styles/variables.css`)

All colours, spacing, typography, and radii are CSS custom properties. Never hardcode values — always reference a variable.

Key tokens:
- `--color-bg-light` / `--color-bg-dark` — section backgrounds
- `--color-text-dark` / `--color-text-light` — body text
- `--color-text-muted` — secondary text on light backgrounds
- `--space-1` through `--space-10` — 8px-based spacing scale
- `--container-width: 1200px` / `--container-padding: 1.5rem`

---

## How to Extend

### Add a new section to the homepage

1. Create `components/sections/MySectionName/MySectionName.tsx` and `MySectionName.module.css`.
2. Use `<Section variant="light|dark">` as the outer wrapper.
3. Import and add to `app/page.tsx`.

### Add a new UI component

1. Create `components/ui/MyComponent/MyComponent.tsx` and `MyComponent.module.css`.
2. Accept a `theme?: 'light' | 'dark'` prop if the component appears in both section types.

### Add a new treatment

Add to the `treatments` array in `data/treatments.ts`. `generateStaticParams` handles the rest automatically.

### Add a new page route

Create `app/my-page/page.tsx`. Export `metadata` for SEO. The root `layout.tsx` wraps all pages in `<Header>` and `<Footer>` automatically.
