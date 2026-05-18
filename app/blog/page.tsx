import type { Metadata } from 'next';
import Container from '@/components/ui/Container';
import Section from '@/components/ui/Section';
import BlogCard from '@/components/blog/BlogCard';
import Breadcrumb from '@/components/ui/Breadcrumb';
import { getAllPosts, getCategories, paginate } from '@/lib/blog';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Expert insights on aesthetic treatments, skin health, and wellness from The One Clinic in Leicester.',
};

interface BlogIndexPageProps {
  searchParams: Promise<{ page?: string; category?: string }>;
}

export default async function BlogIndexPage({ searchParams }: BlogIndexPageProps) {
  const params = await searchParams;
  const currentPage = parseInt(params.page || '1', 10);
  const selectedCategory = params.category || '';

  const allPosts = await getAllPosts();
  const categories = await getCategories();

  // Filter by category if selected
  const filteredPosts = selectedCategory
    ? allPosts.filter((post) => post.category === selectedCategory)
    : allPosts;

  // Paginate
  const { items: posts, totalPages } = paginate(filteredPosts, currentPage, 10);

  const featuredPost = filteredPosts[0]; // Most recent
  const regularPosts = posts.slice(1);

  return (
    <>
      {/* Hero */}
      <section className={styles.hero} data-section-theme="dark" aria-label="Blog, hero">
        <div className={styles.heroGrid} aria-hidden="true" />
        <Container>
          <div className={styles.heroContent}>
            <h1 className={styles.heroTitle}>
              The One Clinic Blog
            </h1>
            <p className={styles.heroDesc}>
              Expert insights, treatment guides, and wellness tips from our team of GMC-registered doctors.
            </p>
          </div>
        </Container>
      </section>

      {/* Breadcrumb */}
      <Section variant="light" data-section-theme="light" className={styles.breadcrumbSection}>
        <Container>
          <Breadcrumb theme="light" items={[{ label: 'Blog' }]} />
        </Container>
      </Section>

      {/* Category Filter */}
      <Section variant="light" data-section-theme="light">
        <Container>
          <div className={styles.filterBar}>
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
        </Container>
      </Section>

      {/* Posts Grid */}
      <Section variant="light" data-section-theme="light">
        <Container>
          {/* Featured post */}
          {featuredPost && currentPage === 1 && (
            <div className={styles.featuredWrap}>
              <BlogCard post={featuredPost} variant="featured" />
            </div>
          )}

          {/* Regular posts grid */}
          <div className={styles.postsGrid}>
            {regularPosts.map((post) => (
              <BlogCard key={post.slug} post={post} />
            ))}
          </div>

          {/* Empty state */}
          {posts.length === 0 && (
            <div className={styles.emptyState}>
              <p>No posts found in this category. Check back soon!</p>
            </div>
          )}
        </Container>
      </Section>

      {/* Pagination */}
      {totalPages > 1 && (
        <Section variant="light" data-section-theme="light" className={styles.paginationSection}>
          <Container>
            <nav className={styles.pagination} aria-label="Blog pagination">
              {currentPage > 1 && (
                <a
                  href={`/blog${selectedCategory ? `?category=${encodeURIComponent(selectedCategory)}` : ''}${currentPage > 2 ? `?page=${currentPage - 1}` : ''}`}
                  className={styles.paginationBtn}
                >
                  ← Previous
                </a>
              )}

              <div className={styles.pageNumbers}>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <a
                    key={page}
                    href={`/blog${selectedCategory ? `?category=${encodeURIComponent(selectedCategory)}&` : '?'}page=${page}`}
                    className={`${styles.pageNumber} ${page === currentPage ? styles.active : ''}`}
                  >
                    {page}
                  </a>
                ))}
              </div>

              {currentPage < totalPages && (
                <a
                  href={`/blog${selectedCategory ? `?category=${encodeURIComponent(selectedCategory)}&` : '?'}page=${currentPage + 1}`}
                  className={styles.paginationBtn}
                >
                  Next →
                </a>
              )}
            </nav>
          </Container>
        </Section>
      )}
    </>
  );
}
