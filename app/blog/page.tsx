import type { Metadata } from 'next';
import Container from '@/components/ui/Container';
import Section from '@/components/ui/Section';
import BlogCard from '@/components/blog/BlogCard';
import { getAllPosts, getCategories } from '@/lib/blog';
import BlogPageContent from './BlogPageContent';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: 'Blog - The One Clinic',
  description: 'Expert insights on aesthetic treatments, skin health, and wellness from our GMC-registered doctors in Leicester.',
};

interface BlogIndexPageProps {
  searchParams: Promise<{ category?: string }>;
}

export default async function BlogIndexPage({ searchParams }: BlogIndexPageProps) {
  const params = await searchParams;
  const selectedCategory = params.category || '';

  const allPosts = await getAllPosts();
  const categories = await getCategories();

  // Filter by category if selected
  const filteredPosts = selectedCategory
    ? allPosts.filter((post) => post.category === selectedCategory)
    : allPosts;

  // Sort by published date descending
  const sortedPosts = [...filteredPosts].sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );

  return (
    <>
      {/* Hero Section */}
      <section className={styles.hero} data-section-theme="dark">
        <div className={styles.heroBackground} aria-hidden="true" />
        <Container>
          <div className={styles.heroContent}>
            <span className={styles.eyebrow}>The One Clinic</span>
            <h1 className={styles.heroTitle}>
              Insights & Expert Guidance
            </h1>
            <p className={styles.heroDesc}>
              Comprehensive guides, treatment insights, and wellness tips from our team of GMC-registered doctors. Learn from the experts at The One Clinic.
            </p>
          </div>
        </Container>
      </section>

      {/* Category Filter Section */}
      <Section variant="light" data-section-theme="light">
        <Container>
          <div className={styles.filterSection}>
            <div className={styles.filterLabel}>
              <span>Filter by Category</span>
            </div>
            <div className={styles.filterTags}>
              <a
                href="/blog"
                className={`${styles.filterTag} ${!selectedCategory ? styles.active : ''}`}
              >
                All Posts
              </a>
              {categories.map((cat) => (
                <a
                  key={cat}
                  href={`/blog?category=${encodeURIComponent(cat)}`}
                  className={`${styles.filterTag} ${selectedCategory === cat ? styles.active : ''}`}
                >
                  {cat}
                </a>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      {/* Blog Grid Section - with client-side animations */}
      <Section variant="light" data-section-theme="light">
        <Container>
          {sortedPosts.length === 0 ? (
            <div className={styles.emptyState}>
              <p>No posts found in this category. Check back soon for new insights!</p>
            </div>
          ) : (
            <BlogPageContent posts={sortedPosts} />
          )}
        </Container>
      </Section>
    </>
  );
}
