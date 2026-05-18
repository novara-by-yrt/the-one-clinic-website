# Blog System Architecture

## 1. MDX Frontmatter Schema

```typescript
interface BlogPostFrontmatter {
  // Core metadata
  title: string;                    // Post headline
  slug: string;                     // URL-safe identifier (must be unique)
  description: string;              // SEO meta description (120-160 chars)
  excerpt?: string;                 // Short preview (used in listings, auto-trimmed if missing)
  
  // Publishing
  publishedAt: string;              // ISO 8601 date (2026-05-18)
  updatedAt?: string;               // ISO 8601 date (optional, defaults to publishedAt)
  
  // Authorship & Medical Authority
  author: string;                   // Team member name (e.g., "Dr Sumit Virmani")
                                    // Must match data/team.ts entry for byline + author schema
  medicalReviewer?: string;         // Secondary team member who reviewed (E-E-A-T signal)
  reviewedAt?: string;              // Date reviewed (ISO 8601, shown in byline)
  
  // Organization
  category: string;                 // Single category (e.g., "Medical Aesthetics", "Skin Health")
  tags: string[];                   // Multiple tags (e.g., ["anti-wrinkle", "prevention", "collagen"])
  
  // Media
  heroImage: string;                // Path to hero image (e.g., "/blog/endolift-guide.jpg")
  heroImageAlt: string;             // Alt text for hero
  
  // SEO & Discovery
  featured?: boolean;               // Show in homepage "Featured Posts" section
  relatedTreatments?: string[];     // Treatment slugs to link internally (e.g., ["endolift", "dermal-fillers"])
  relatedConditions?: string[];     // Condition slugs (e.g., ["jowls", "nasolabial-folds"])
  
  // Internal tracking
  readingTime?: number;             // Auto-calculated if not provided (override if needed)
}
```

### Example Frontmatter:

```mdx
---
title: "Endolift vs Fillers: Which Lifting Treatment Is Right for You?"
slug: "endolift-vs-dermal-fillers-leicester"
description: "Compare Endolift laser skin tightening with dermal fillers. Learn which non-surgical lifting treatment suits your goals in Leicester."
excerpt: "Two popular non-surgical options for skin lifting: Endolift laser vs dermal fillers. We break down the differences, costs, and results."

publishedAt: "2026-05-15"
updatedAt: "2026-05-18"

author: "Dr Gunjan Bedi"
medicalReviewer: "Dr Sumit Virmani"
reviewedAt: "2026-05-18"

category: "Medical Aesthetics"
tags: ["endolift", "dermal-fillers", "skin-lifting", "non-surgical", "comparison"]

heroImage: "/blog/endolift-vs-fillers-hero.jpg"
heroImageAlt: "Comparison of Endolift and dermal filler results for face lifting"

featured: true
relatedTreatments: ["endolift", "dermal-fillers", "morpheus8"]
relatedConditions: ["jowls", "nasolabial-folds", "thin-lips"]
---

## Your Post Content Here

Markdown + JSX components...
```

---

## 2. Folder Structure

```
/home/user/The-One-Clinic-Website/
├── /content
│   └── /blog
│       ├── endolift-vs-dermal-fillers-leicester.mdx
│       ├── guide-to-collagen-induction-therapy.mdx
│       ├── 5-signs-your-skin-needs-professional-help.mdx
│       ├── post-treatment-aftercare-essentials.mdx
│       └── ... (more posts)
│
├── /lib
│   ├── blog.ts                  // Blog utilities: parse, filter, sort posts
│   ├── mdx.ts                   // MDX loader config
│   └── blog-schema.ts           // JSON-LD generators for blog posts
│
├── /components
│   └── /blog
│       ├── BlogCard.tsx         // Listing card component
│       ├── BlogHero.tsx         // Post header with image, title, meta
│       ├── AuthorByline.tsx     // Author + reviewer byline with team links
│       ├── SocialShare.tsx      // Consent-gated share buttons
│       ├── RelatedPosts.tsx     // Similar posts recommendation
│       ├── TableOfContents.tsx  // Auto-generated from H2/H3 headings
│       ├── ReadingTime.tsx      // "X min read" estimate
│       └── PostMetadata.tsx     // Date, category, tags display
│
├── /app
│   └── /blog
│       ├── page.tsx             // /blog — index with filtering & pagination
│       ├── layout.tsx           // Blog layout wrapper
│       ├── [slug]
│       │   ├── page.tsx         // /blog/[slug] — post detail
│       │   └── layout.tsx       
│       ├── category
│       │   ├── [category]
│       │   │   ├── page.tsx     // /blog/category/[category] — archive
│       │   │   └── layout.tsx
│       └── author
│           ├── [author]
│               ├── page.tsx     // /blog/author/[author] — archive
│               └── layout.tsx
│
└── /data
    └── blog-authors.ts          // Author definitions (tied to /data/team.ts)
```

---

## 3. Route Behavior

| Route | Component | Behavior |
|-------|-----------|----------|
| `/blog` | BlogIndex | List all posts, filter by category (sidebar), paginate (10/page) |
| `/blog?category=medical-aesthetics` | BlogIndex | Filter posts by category |
| `/blog?tag=endolift` | BlogIndex | Filter posts by tag (optional) |
| `/blog/page/2` | BlogIndex | Pagination (10 posts per page) |
| `/blog/[slug]` | BlogPost | Full post with schema, byline, related posts, share buttons |
| `/blog/category/medical-aesthetics` | CategoryArchive | All posts in category, paginated |
| `/blog/author/dr-gunjan-bedi` | AuthorArchive | All posts by author, links to `/team/dr-gunjan-bedi` |

---

## 4. Data Layer (`lib/blog.ts`)

### Core Functions:

```typescript
// Parse all MDX posts and return with metadata
export async function getAllPosts(): Promise<BlogPost[]>

// Get single post by slug with full content
export async function getPostBySlug(slug: string): Promise<BlogPost>

// Get all unique categories
export async function getCategories(): Promise<string[]>

// Get all unique authors
export async function getAuthors(): Promise<string[]>

// Filter posts by multiple criteria
export async function filterPosts(opts: {
  category?: string;
  author?: string;
  tag?: string;
  featured?: boolean;
}): Promise<BlogPost[]>

// Paginate results
export function paginate<T>(items: T[], page: number, perPage: number): {
  items: T[];
  totalPages: number;
  currentPage: number;
}

// Calculate reading time (words ÷ 200 = minutes)
export function calculateReadingTime(markdown: string): number

// Get related posts (by tags, category, or treatment)
export async function getRelatedPosts(slug: string, limit?: number): Promise<BlogPost[]>
```

---

## 5. Blog Post Interface

```typescript
export interface BlogPost {
  // Metadata
  slug: string;
  title: string;
  description: string;
  excerpt: string;
  
  // Dates
  publishedAt: Date;
  updatedAt: Date;
  
  // Authorship
  author: {
    name: string;
    role?: string;
    image?: string;           // Team member photo
    bio?: string;
    linkedinUrl?: string;
    gmcNumber?: string;       // From team data
  };
  medicalReviewer?: {
    name: string;
    role?: string;
    reviewedAt: Date;
  };
  
  // Content & Organization
  category: string;
  tags: string[];
  heroImage: string;
  heroImageAlt: string;
  content: string;           // Compiled MDX as JSX string
  readingTime: number;       // Minutes
  
  // SEO & Discovery
  featured: boolean;
  relatedTreatments: string[];
  relatedConditions: string[];
  relatedPosts?: BlogPost[];  // Populated on detail page
}
```

---

## 6. SEO & Schema Requirements

### Metadata Generation (per post):

```typescript
export async function generateMetadata(slug: string): Promise<Metadata> {
  // Canonical: https://the-oneclinic.net/blog/{slug}
  // OG Image: heroImage or fallback
  // Twitter Card: summary_large_image
  // Description: SEO description field (120-160 chars)
}
```

### JSON-LD Schemas:

1. **Article Schema** (on every post)
   - `headline`: title
   - `description`: SEO description
   - `image`: heroImage
   - `author`: Physician schema (from team)
   - `creator`: Author name
   - `datePublished`: publishedAt
   - `dateModified`: updatedAt
   - `publisher`: LocalBusiness schema (clinic)

2. **Physician Schema** (author link to team authority)
   - `name`: Dr X
   - `givenName` / `familyName`
   - `identifier`: GMC number (if available)
   - `url`: link to `/team/{slug}`
   - `affiliation`: The One Clinic

3. **BreadcrumbList** (on every post)
   - Home → Blog → Category → Post Title

4. **VideoObject** (if post embeds Wistia video)

---

## 7. Author & Medical Reviewer Data

### Sync with `/data/team.ts`:

```typescript
// lib/blog-authors.ts
export const blogAuthors = {
  "Dr Sumit Virmani": {
    teamSlug: "dr-sumit-virmani",
    role: "Co-Founder, GP",
    gmcNumber: "..." // from team data
  },
  "Dr Gunjan Bedi": {
    teamSlug: "dr-gunjan-bedi",
    role: "Aesthetics Practitioner",
    gmcNumber: "..."
  },
  // ... other clinicians
};
```

When rendering author byline on blog post:
- Link author name to `/team/{teamSlug}`
- Display medical reviewer as "Reviewed by Dr X on May 18, 2026"
- Link reviewer to their team page

---

## 8. Sitemap Integration

Add to `/app/sitemap.ts`:

```typescript
// For each blog post, add:
{
  url: `${SITE_URL}/blog/${post.slug}`,
  lastModified: post.updatedAt,
  changeFrequency: 'monthly',
  priority: 0.8,
}

// For each category:
{
  url: `${SITE_URL}/blog/category/${category}`,
  priority: 0.7,
}

// For each author:
{
  url: `${SITE_URL}/blog/author/${author}`,
  priority: 0.6,
}
```

---

## 9. Component Examples

### BlogCard (listing):
```
┌─────────────────────────────┐
│  [Hero Image]               │
│  Category Tag               │
│  Title (2 lines)            │
│  Excerpt (100 chars)        │
│  Dr X · 5 min read · May 18 │
└─────────────────────────────┘
```

### BlogHero (post detail):
```
┌─────────────────────────────────────┐
│  [Full-width Hero Image]            │
│  Category · Reading Time            │
│  Title                              │
│  Description                        │
│  By Dr X | Reviewed by Dr Y         │
│  Published May 18 · Updated May 18  │
│  [Share Buttons - Consent-Gated]    │
└─────────────────────────────────────┘
```

### AuthorByline (post):
```
┌──────────────────────────────────┐
│  👤 Dr Gunjan Bedi               │
│  Aesthetics Practitioner         │
│  Reviewed by Dr Sumit Virmani    │
│  on May 18, 2026                 │
│  [View Profile] → /team/...      │
└──────────────────────────────────┘
```

---

## 10. Content Management Flow

1. **Create post**: Add `.mdx` file to `/content/blog/`
2. **Frontmatter**: Include all required fields
3. **Build**: `npm run build` parses all posts
4. **Routes**: Automatically generated from slugs
5. **Sitemap**: Auto-updated from blog data
6. **Metadata**: Generated from frontmatter + team data

---

## Questions Before Implementation:

1. **Categories** — Should we use fixed categories (e.g., "Medical Aesthetics", "Skin Health", "Patient Stories") or allow any string?
2. **Social Share** — Which platforms? (Twitter, LinkedIn, Facebook, Email, Copy Link)
3. **Related Posts** — Max 3? Show by tags or category?
4. **Pagination** — 10 posts/page confirmed, or adjust?
5. **Search** — Should `/blog` have a search box, or just category filter?
6. **Comments** — Enable reader comments (Disqus, native) or keep read-only?
7. **First Posts** — Should I scaffold 3-5 sample posts to seed the blog?

