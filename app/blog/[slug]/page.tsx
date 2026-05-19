import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Script from 'next/script';
import Container from '@/components/ui/Container';
import Section from '@/components/ui/Section';
import Breadcrumb from '@/components/ui/Breadcrumb';
import { getAllPosts, getPostBySlug, getRelatedPosts } from '@/lib/blog';
import { generateArticleSchema, generateBreadcrumbSchema } from '@/lib/blog-schema';
import { SITE_URL } from '@/lib/schema/clinic';
import BlogCard from '@/components/blog/BlogCard';
import DoctorCTA1 from '@/components/blog/DoctorCTA1';
import DoctorCTA2 from '@/components/blog/DoctorCTA2';
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

function splitContentForCTA(html: string): { before: string; after: string } {
  // Find all <h2> positions in the content
  const headingRegex = /<h2[^>]*>/g;
  const positions: number[] = [];
  let match;

  while ((match = headingRegex.exec(html)) !== null) {
    positions.push(match.index);
  }

  // Insert CTA two sections above the last heading (conclusion).
  // For N headings, that's heading at index N-3 (the third-to-last).
  // Fallbacks: if too few headings, place it as close to the end as makes sense.
  let splitIndex: number;

  if (positions.length >= 4) {
    splitIndex = positions[positions.length - 3];
  } else if (positions.length >= 2) {
    splitIndex = positions[positions.length - 1];
  } else if (positions.length === 1) {
    splitIndex = positions[0];
  } else {
    return { before: html, after: '' };
  }

  return {
    before: html.substring(0, splitIndex),
    after: html.substring(splitIndex),
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

  const { before: contentBefore, after: contentAfter } = splitContentForCTA(post.content);

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
        <Container>
          <div className={styles.heroContent}>
            {/* Breadcrumb */}
            <div>
              <Breadcrumb
                theme="dark"
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

      {/* LeadPipeline Script */}
      <Script src="https://link.leadpipeline.ai/js/form_embed.js" strategy="lazyOnload" />

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

              {/* Post content - split with CTA in middle */}
              <div className={styles.mdxContent}>
                {/* Content before first heading */}
                <div dangerouslySetInnerHTML={{ __html: contentBefore }} />

                {/* CTA Section - in middle of content */}
                <div className={styles.ctaSection}>
                  <DoctorCTA1 />
                </div>

                {/* Content from first heading onwards */}
                {contentAfter && <div dangerouslySetInnerHTML={{ __html: contentAfter }} />}
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
                <div className={styles.formWrap}>
                  <iframe
                    src="https://link.leadpipeline.ai/widget/form/fegqbVjvGrZqMfbk64P4"
                    style={{ width: '100%', height: '400px', border: 'none', display: 'block', borderRadius: '20px' }}
                    id="inline-fegqbVjvGrZqMfbk64P4"
                    data-layout="{'id':'INLINE'}"
                    data-trigger-type="alwaysShow"
                    data-trigger-value=""
                    data-activation-type="alwaysActivated"
                    data-activation-value=""
                    data-deactivation-type="neverDeactivate"
                    data-deactivation-value=""
                    data-form-name="Request a Call Back Form"
                    data-height="400"
                    data-layout-iframe-id="inline-fegqbVjvGrZqMfbk64P4"
                    data-form-id="fegqbVjvGrZqMfbk64P4"
                    title="Request a Call Back"
                    scrolling="no"
                  />
                </div>
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

      {/* Second CTA Section */}
      <Section variant="light" data-section-theme="light" className={styles.ctaWrapperSection}>
        <Container>
          <div className={styles.ctaSection}>
            <DoctorCTA2 />
          </div>
        </Container>
      </Section>
    </>
  );
}
