import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Container from '@/components/ui/Container';
import Section from '@/components/ui/Section';
import Breadcrumb from '@/components/ui/Breadcrumb';
import { getAllPosts, getPostBySlug, getRelatedPosts } from '@/lib/blog';
import { generateArticleSchema, generateBreadcrumbSchema } from '@/lib/blog-schema';
import { SITE_URL } from '@/lib/schema/clinic';
import BlogCard from '@/components/blog/BlogCard';
import Link from 'next/link';
import Image from 'next/image';
import styles from './page.module.css';

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const post = await getPostBySlug(resolvedParams.slug);

  if (!post) {
    return { title: 'Post Not Found' };
  }

  const imageUrl = post.heroImage.startsWith('http')
    ? post.heroImage
    : `${SITE_URL}${post.heroImage}`;

  return {
    title: post.title,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      type: 'article',
      url: `${SITE_URL}/blog/${post.slug}`,
      images: [{ url: imageUrl, width: 1200, height: 630, alt: post.heroImageAlt }],
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt,
      authors: [post.author],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.description,
      images: [imageUrl],
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const resolvedParams = await params;
  const post = await getPostBySlug(resolvedParams.slug);

  if (!post) {
    notFound();
  }

  const relatedPosts = await getRelatedPosts(post.slug, 3);
  const articleSchema = generateArticleSchema(post, SITE_URL);
  const breadcrumbSchema = generateBreadcrumbSchema(post, SITE_URL);

  const publishDate = new Date(post.publishedAt).toLocaleDateString('en-GB', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const updateDate = post.updatedAt
    ? new Date(post.updatedAt).toLocaleDateString('en-GB', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : null;

  return (
    <>
      {/* JSON-LD Schemas */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      {/* Hero */}
      <section className={styles.hero} data-section-theme="dark" aria-label="Blog post hero">
        <div className={styles.heroImage}>
          <Image
            src={post.heroImage}
            alt={post.heroImageAlt}
            fill
            priority
            className={styles.heroImageEl}
            sizes="100vw"
          />
          <div className={styles.heroOverlay} aria-hidden="true" />
        </div>

        <Container>
          <div className={styles.heroContent}>
            {/* Breadcrumb */}
            <div>
              <Breadcrumb
                theme="light"
                items={[
                  { label: 'Blog', href: '/blog' },
                  { label: post.category, href: `/blog?category=${encodeURIComponent(post.category)}` },
                  { label: post.title },
                ]}
              />
            </div>

            {/* Category badge */}
            <span className={styles.categoryBadge}>
              {post.category}
            </span>

            {/* Title */}
            <h1 className={styles.title}>
              {post.title}
            </h1>

            {/* Meta */}
            <div className={styles.meta}>
              <span className={styles.metaItem}>{post.author}</span>
              <span className={styles.metaDivider}>•</span>
              <span className={styles.metaItem}>{post.readingTime} min read</span>
              <span className={styles.metaDivider}>•</span>
              <time className={styles.metaItem} dateTime={post.publishedAt}>
                {publishDate}
              </time>
              {updateDate && post.updatedAt !== post.publishedAt && (
                <>
                  <span className={styles.metaDivider}>•</span>
                  <span className={styles.metaItem}>Updated {updateDate}</span>
                </>
              )}
            </div>

            {/* Medical reviewer */}
            {post.medicalReviewer && post.reviewedAt && (
              <div className={styles.reviewer}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
                </svg>
                Reviewed by {post.medicalReviewer} on {new Date(post.reviewedAt).toLocaleDateString('en-GB', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </div>
            )}
          </div>
        </Container>
      </section>

      {/* Content */}
      <Section variant="light" data-section-theme="light" className={styles.contentSection}>
        <Container>
          <div className={styles.contentWrapper}>
            <article className={styles.content}>
              {/* Featured Image */}
              {post.heroImage && (
                <div className={styles.featuredImage}>
                  <Image
                    src={post.heroImage}
                    alt={post.heroImageAlt}
                    width={800}
                    height={500}
                    priority
                    style={{ width: '100%', height: 'auto' }}
                  />
                </div>
              )}

              {/* Post content */}
              <div className={styles.mdxContent}>
                <div
                  dangerouslySetInnerHTML={{ __html: post.content }}
                />
              </div>

              {/* Tags */}
              {post.tags.length > 0 && (
                <div className={styles.tags}>
                  {post.tags.map((tag) => (
                    <a key={tag} href={`/blog?tag=${encodeURIComponent(tag)}`} className={styles.tag}>
                      #{tag}
                    </a>
                  ))}
                </div>
              )}
            </article>

            {/* Sidebar Form */}
            <aside className={styles.sidebar}>
              <div className={styles.sidebarForm}>
                <h3 className={styles.formTitle}>Request a Call Back</h3>
                <form className={styles.form}>
                  <div className={styles.formGroup}>
                    <label htmlFor="fullName" className={styles.label}>Full Name<span className={styles.required}>*</span></label>
                    <input type="text" id="fullName" name="fullName" className={styles.input} required />
                  </div>

                  <div className={styles.formGroup}>
                    <label htmlFor="phone" className={styles.label}>Phone<span className={styles.required}>*</span></label>
                    <input type="tel" id="phone" name="phone" className={styles.input} required />
                  </div>

                  <div className={styles.formGroup}>
                    <label htmlFor="email" className={styles.label}>Email<span className={styles.required}>*</span></label>
                    <input type="email" id="email" name="email" className={styles.input} required />
                  </div>

                  <div className={styles.formGroup}>
                    <label htmlFor="interested" className={styles.label}>Interested in<span className={styles.required}>*</span></label>
                    <select id="interested" name="interested" className={styles.select} required>
                      <option value="">Select a treatment</option>
                      <option value="Consultation">Consultation</option>
                      <option value="Treatment">Treatment</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  <div className={styles.formGroup}>
                    <label htmlFor="message" className={styles.label}>Message</label>
                    <textarea id="message" name="message" className={styles.textarea} rows={4}></textarea>
                  </div>

                  <button type="submit" className={styles.submitBtn}>Submit</button>
                </form>
              </div>
            </aside>
          </div>
        </Container>
      </Section>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <Section variant="light" data-section-theme="light" className={styles.relatedSection}>
          <Container>
            <div>
              <h2 className={styles.relatedTitle}>
                Related Articles
              </h2>

              <div className={styles.relatedGrid}>
                {relatedPosts.map((relPost) => (
                  <BlogCard key={relPost.slug} post={relPost} />
                ))}
              </div>
            </div>
          </Container>
        </Section>
      )}
    </>
  );
}
