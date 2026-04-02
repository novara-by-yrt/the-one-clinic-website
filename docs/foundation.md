# Foundation — The One Clinic Website

> Single source of truth for the project. This file should rarely change.

---

## Project Overview

**Purpose**
A premium clinic website for The One Clinic — an aesthetic and wellness brand. The site presents treatments, builds trust, and converts visitors into booked consultations.

**Design Goals**
- Premium, minimal aesthetic — black and white palette, no decorative colour
- High-end UX with purposeful motion (Framer Motion, `whileInView`)
- Clinician-led credibility: clean typography, structured content, no visual noise
- Mobile-first, fully responsive across all breakpoints

---

## Tech Stack

| Layer | Choice |
|---|---|
| Framework | Next.js 16 (App Router, Turbopack) |
| Language | TypeScript |
| Styling | CSS Modules + CSS custom properties |
| Animation | Framer Motion |
| Font | Inter Variable (self-hosted via `next/font/local`) |
| Deployment | Vercel |

---

## Architecture

```
app/                        # Next.js App Router routes
  layout.tsx                # Root layout: Header, Footer, metadata, skip-link
  page.tsx                  # Homepage — composes all 10 sections
  treatments/
    page.tsx                # Treatments listing
    [slug]/page.tsx         # Dynamic treatment page (SSG)

components/
  ui/                       # Reusable primitives
    Button/
    Card/
    Input/                  # text input + textarea (discriminated union)
    Accordion/              # CSS grid-template-rows animation, no JS height
    Container/
    Section/                # Theme wrapper (light / dark variant)
  sections/                 # Page sections — each self-contained
    Hero/
    TrustStrip/
    Services/
    Benefits/
    CaseStudies/
    Process/
    Testimonials/
    LeadForm/
    FAQ/
    FinalCTA/
    TreatmentTemplate/      # Reusable template for /treatments/[slug]
    TreatmentsListing/      # Grid for /treatments
  layout/
    Header/                 # Fixed, animated, theme-aware navbar
    Footer/

data/
  treatments.ts             # All treatment data + getTreatmentBySlug()

lib/
  motion.ts                 # Shared Framer Motion variants (fadeUp, stagger, VIEWPORT)

styles/
  variables.css             # All design tokens
  globals.css               # Reset, typography, utilities, reduced-motion

docs/                       # Project documentation
public/
  fonts/                    # Self-hosted Inter Variable woff2
```

---

## Design System

### Palette
Pure black (`#0a0a0a`) and white (`#fafafa`) only. No accent colours.

### Section Theme System
Sections alternate light/dark using the `variant` prop on `<Section>`:

```tsx
<Section variant="dark" data-section-theme="dark">...</Section>
```

The `Section` component applies `.light` or `.dark` CSS Module classes. Descendent typography rules in `Section.module.css` use `:where()` wrappers to keep specificity at `(0,0,1)`, ensuring component-level classes `(0,1,0)` always win without `!important`.

The Header reads `data-section-theme` via `IntersectionObserver` to adapt its text colour as sections scroll past.

### Typography Hierarchy

| Tag | Size | Weight | Usage |
|---|---|---|---|
| `h1` | `--text-h1` (4rem) | 700 | Hero titles |
| `h2` | `--text-h2` (3rem) | 700 | Section headings |
| `h3` | `--text-h3` (1.75rem) | 500 | Card/step titles |
| `h4` | `--text-body` | 500 | Eyebrow labels (uppercase) |
| `p` | `--text-body` (1.125rem) | 400 | Body copy |

Responsive breakpoints: `≤1024px` and `≤768px` scale headings down.

### Spacing Scale
8px base unit. Tokens: `--space-1` (0.5rem) through `--space-10` (5rem).

### Layout
- Container max-width: `1200px`
- Container padding: `1.5rem` inline
- Section padding-block: `--space-8` (4rem), scales to `--space-5` on mobile

---

## Page Structure

### Homepage (`/`)

Sections render in this order:

1. **Hero** — full-screen dark, parallax background, staggered headline animation
2. **TrustStrip** — light, credential badges
3. **Services** — dark, treatment category cards
4. **Benefits** — light, why choose us
5. **CaseStudies** — dark, before/after or results
6. **Process** — light, 4-step numbered journey
7. **Testimonials** — dark, patient quotes
8. **LeadForm** — light, consultation enquiry form
9. **FAQ** — dark, accordion questions
10. **FinalCTA** — dark, booking call-to-action

### Treatments Listing (`/treatments`)
Grid of all treatment cards linking to individual pages.

### Treatment Pages (`/treatments/[slug]`)
Static pages generated via `generateStaticParams`. Template sections:
1. Hero (dark)
2. Overview / description (light)
3. Benefits grid (dark)
4. Process steps (light)
5. FAQ accordion (dark, optional)
6. Booking CTA (dark)

**Current treatments:**
- `/treatments/anti-wrinkle`
- `/treatments/dermal-fillers`
- `/treatments/laser-resurfacing`
- `/treatments/hair-restoration`
- `/treatments/body-contouring`
- `/treatments/iv-wellness`

---

## Key Principles

- **Reusability** — UI primitives accept `theme="light|dark"` and are used across all sections
- **Clean code** — no `!important`, no magic numbers, no inline styles
- **Minimal UI** — every element earns its place; no decorative noise
- **Performance-first** — static generation, self-hosted fonts, no runtime CSS-in-JS
- **Accessibility** — skip-link, semantic HTML, `aria-label` on interactive elements, `prefers-reduced-motion` respected
- **`'use client'` only where needed** — server components by default; client boundary only for hooks and animations
