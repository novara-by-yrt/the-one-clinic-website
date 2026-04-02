# Progress — The One Clinic Website

> Updated after each major change. Newest entries at the top of each section.

---

## Current Status

Production-ready build. All homepage sections, dynamic treatment pages, and core optimisations are complete. Clean TypeScript build with 11 static pages and zero errors.

---

## Completed

### Infrastructure
- [x] Next.js 16 App Router scaffold with TypeScript and Turbopack
- [x] CSS Modules architecture established — no CSS-in-JS
- [x] Inter Variable font self-hosted via `next/font/local`
- [x] Design tokens in `styles/variables.css` (palette, spacing, typography, radii)
- [x] Global reset, typography scale, and section theme utilities in `globals.css`
- [x] Security headers in `next.config.ts` (X-Frame-Options, CSP-adjacent headers)
- [x] `prefers-reduced-motion` media query
- [x] Skip-to-content link for keyboard accessibility

### Layout
- [x] Header — fixed, transparent→solid on scroll, theme-aware via IntersectionObserver, animated mobile menu
- [x] Footer

### UI Components
- [x] Button (primary / ghost, light / dark theme)
- [x] Card (light / dark theme)
- [x] Input (text input + textarea via discriminated union props)
- [x] Accordion (CSS `grid-template-rows` animation)
- [x] Container
- [x] Section (light / dark variant, `:where()` cascade fix)

### Homepage Sections
- [x] Hero (full-screen dark, parallax, staggered animation)
- [x] TrustStrip
- [x] Services
- [x] Benefits
- [x] CaseStudies
- [x] Process
- [x] Testimonials
- [x] LeadForm
- [x] FAQ
- [x] FinalCTA

### Treatment Pages
- [x] `/treatments` listing page
- [x] `/treatments/[slug]` dynamic route with `generateStaticParams`
- [x] `TreatmentTemplate` component (hero, overview, benefits, process, FAQ, CTA)
- [x] `TreatmentsListing` component
- [x] 6 treatments: anti-wrinkle, dermal-fillers, laser-resurfacing, hair-restoration, body-contouring, iv-wellness
- [x] Per-page `generateMetadata` for SEO

### Animation
- [x] Shared `lib/motion.ts` variants (fadeUp, fadeIn, stagger, VIEWPORT)

### SEO & Metadata
- [x] Root layout metadata with OpenGraph and Twitter card
- [x] Per-treatment page metadata

### Documentation
- [x] `README.md`
- [x] `docs/foundation.md`
- [x] `docs/progress.md`
- [x] `docs/ai-context.md`
- [x] `docs/deployment.md`

---

## In Progress

- [ ] Nothing currently in progress

---

## Next Steps

- [ ] Connect "Book Consultation" buttons to a real booking flow or external URL
- [ ] Add treatment images / before-after photography to CaseStudies and TreatmentTemplate
- [ ] Integrate a CMS (e.g. Sanity, Contentful) to make treatment content editable without code
- [ ] Add contact/booking page (`/book`)
- [ ] Analytics integration (e.g. Plausible, GA4)
- [ ] Set up custom domain and production Vercel deployment

---

## Notes

- **CSS cascade**: Section.module.css uses `:where()` wrappers so descendent rules have specificity `(0,0,1)`. Component classes `(0,1,0)` always win. Never use `!important` for colour overrides.
- **Next.js 16 params**: `params` is `Promise<{slug: string}>` — must be `await`ed in `generateMetadata` and page components.
- **Inter font**: Google Fonts is blocked in the build environment. Font is served from `public/fonts/` via `next/font/local`.
- **`role="list"` on `<ol>`**: Removed — redundant on semantic list elements and flagged by accessibility audits.

---

<!-- PROGRESS LOG — append new entries below this line, newest first -->
### 2026-04-02
- Created foundation.md, progress.md, and log-progress.mjs utility script

