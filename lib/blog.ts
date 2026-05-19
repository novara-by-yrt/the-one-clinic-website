import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export interface BlogPostFrontmatter {
  title: string;
  slug: string;
  description: string;
  excerpt?: string;
  publishedAt: string;
  updatedAt?: string;
  author: string;
  medicalReviewer?: string;
  reviewedAt?: string;
  category: string;
  tags: string[];
  heroImage: string;
  heroImageAlt: string;
  featured?: boolean;
  relatedTreatments?: string[];
  relatedConditions?: string[];
}

export interface BlogPost extends BlogPostFrontmatter {
  content: string;
  readingTime: number;
}

const BLOG_DIR = path.join(process.cwd(), 'content', 'blog');

const CATEGORIES = [
  'Medical Aesthetics',
  'Skin Health',
  'Prevention & Wellness',
  'Treatment Guides',
  'Patient Stories',
] as const;

/**
 * Calculate reading time (words / 200 words per minute)
 */
export function calculateReadingTime(markdown: string): number {
  const wordCount = markdown.trim().split(/\s+/).length;
  return Math.ceil(wordCount / 200);
}

/**
 * Parse all MDX posts from /content/blog directory
 */
export async function getAllPosts(): Promise<BlogPost[]> {
  if (!fs.existsSync(BLOG_DIR)) {
    return [];
  }

  const files = fs.readdirSync(BLOG_DIR).filter((file) => file.endsWith('.mdx'));

  const posts: BlogPost[] = files.map((file) => {
    const filePath = path.join(BLOG_DIR, file);
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const { data, content } = matter(fileContent);

    const frontmatter = data as BlogPostFrontmatter;
    const readingTime = calculateReadingTime(content);

    // Set defaults
    const excerpt =
      frontmatter.excerpt ||
      frontmatter.description.substring(0, 150) + '...';
    const updatedAt = frontmatter.updatedAt || frontmatter.publishedAt;

    return {
      ...frontmatter,
      excerpt,
      updatedAt,
      content,
      readingTime,
    };
  });

  // Sort by publishedAt descending (newest first)
  return posts.sort(
    (a, b) =>
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );
}

/**
 * Get single post by slug
 */
export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  const posts = await getAllPosts();
  return posts.find((post) => post.slug === slug) || null;
}

/**
 * Get all unique categories
 */
export async function getCategories(): Promise<string[]> {
  const posts = await getAllPosts();
  const categories = new Set(posts.map((post) => post.category));
  return Array.from(categories).sort();
}

/**
 * Get all unique authors
 */
export async function getAuthors(): Promise<string[]> {
  const posts = await getAllPosts();
  const authors = new Set(posts.map((post) => post.author));
  return Array.from(authors).sort();
}

/**
 * Filter posts by criteria
 */
export async function filterPosts(options: {
  category?: string;
  author?: string;
  tag?: string;
  featured?: boolean;
}): Promise<BlogPost[]> {
  const posts = await getAllPosts();

  return posts.filter((post) => {
    if (options.category && post.category !== options.category) {
      return false;
    }
    if (options.author && post.author !== options.author) {
      return false;
    }
    if (options.tag && !post.tags.includes(options.tag)) {
      return false;
    }
    if (options.featured && !post.featured) {
      return false;
    }
    return true;
  });
}

/**
 * Paginate posts
 */
export function paginate<T>(
  items: T[],
  page: number,
  perPage: number
): {
  items: T[];
  totalPages: number;
  currentPage: number;
  totalItems: number;
} {
  const totalPages = Math.ceil(items.length / perPage);
  const currentPage = Math.max(1, Math.min(page, totalPages));
  const startIndex = (currentPage - 1) * perPage;
  const endIndex = startIndex + perPage;

  return {
    items: items.slice(startIndex, endIndex),
    totalPages,
    currentPage,
    totalItems: items.length,
  };
}

/**
 * Get related posts by shared tags or category
 */
export async function getRelatedPosts(
  slug: string,
  limit: number = 3
): Promise<BlogPost[]> {
  const currentPost = await getPostBySlug(slug);
  if (!currentPost) return [];

  const allPosts = await getAllPosts();
  const candidates = allPosts.filter((post) => post.slug !== slug);

  // Score posts by relevance
  const scored = candidates.map((post) => {
    let score = 0;

    // Shared tags (highest priority)
    const sharedTags = post.tags.filter((tag) =>
      currentPost.tags.includes(tag)
    );
    score += sharedTags.length * 10;

    // Same category
    if (post.category === currentPost.category) {
      score += 5;
    }

    // Shared treatment
    const sharedTreatments = (post.relatedTreatments || []).filter((t) =>
      (currentPost.relatedTreatments || []).includes(t)
    );
    score += sharedTreatments.length * 3;

    return { post, score };
  });

  // Sort by score and return top N
  return scored
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((item) => item.post);
}

/**
 * Get featured posts (for homepage)
 */
export async function getFeaturedPosts(limit: number = 3): Promise<BlogPost[]> {
  const posts = await filterPosts({ featured: true });
  return posts.slice(0, limit);
}

/**
 * Get all tags across all posts
 */
export async function getAllTags(): Promise<string[]> {
  const posts = await getAllPosts();
  const tags = new Set<string>();
  posts.forEach((post) => {
    post.tags.forEach((tag) => tags.add(tag));
  });
  return Array.from(tags).sort();
}

/**
 * Validate that all blog posts have required frontmatter
 */
export async function validateBlogPosts(): Promise<{
  valid: boolean;
  errors: string[];
}> {
  const posts = await getAllPosts();
  const errors: string[] = [];

  posts.forEach((post) => {
    if (!post.title) errors.push(`${post.slug}: Missing title`);
    if (!post.slug) errors.push(`Post: Missing slug`);
    if (!post.description) errors.push(`${post.slug}: Missing description`);
    if (!post.publishedAt) errors.push(`${post.slug}: Missing publishedAt`);
    if (!post.author) errors.push(`${post.slug}: Missing author`);
    if (!post.category) errors.push(`${post.slug}: Missing category`);
    if (!post.tags || post.tags.length === 0)
      errors.push(`${post.slug}: Missing tags`);
    if (!post.heroImage) errors.push(`${post.slug}: Missing heroImage`);
    if (!CATEGORIES.includes(post.category as any)) {
      errors.push(
        `${post.slug}: Invalid category "${post.category}". Must be one of: ${CATEGORIES.join(', ')}`
      );
    }
  });

  return {
    valid: errors.length === 0,
    errors,
  };
}
