import type { Metadata } from 'next';
import { motion } from 'framer-motion';
import Container from '@/components/ui/Container';
import Section from '@/components/ui/Section';
import BlogCard from '@/components/blog/BlogCard';
import Breadcrumb from '@/components/ui/Breadcrumb';
import { getAllPosts, getCategories, paginate } from '@/lib/blog';
import { fadeUp, stagger, VIEWPORT } from '@/lib/motion';
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
          <motion.div
            className={styles.heroContent}
            variants={stagger(0.15)}
            initial="hidden"
            animate="show"
          >
            <motion.h1 className={styles.heroTitle} variants={fadeUp}>
              The One Clinic Blog
            </motion.h1>
            <motion.p className={styles.heroDesc} variants={fadeUp}>
              Expert insights, treatment guides, and wellness tips from our team of GMC-registered doctors.
            </motion.p>
          </motion.div>
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
            <motion.a
              href="/blog"
              className={`${styles.filterTag} ${!selectedCategory ? styles.active : ''}`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              All Posts
            </motion.a>
            {categories.map((cat) => (
              <motion.a
                key={cat}
                href={`/blog?category=${encodeURIComponent(cat)}`}
                className={`${styles.filterTag} ${selectedCategory === cat ? styles.active : ''}`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {cat}
              </motion.a>
            ))}
          </div>
        </Container>
      </Section>

      {/* Posts Grid */}
      <Section variant="light" data-section-theme="light">
        <Container>
          {/* Featured post */}
          {featuredPost && currentPage === 1 && (
            <motion.div
              className={styles.featuredWrap}
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={VIEWPORT}
            >
              <BlogCard post={featuredPost} variant="featured" />
            </motion.div>
          )}

          {/* Regular posts grid */}
          <motion.div
            className={styles.postsGrid}
            variants={stagger(0.1)}
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
          >
            {regularPosts.map((post) => (
              <BlogCard key={post.slug} post={post} />
            ))}
          </motion.div>

          {/* Empty state */}
          {posts.length === 0 && (
            <motion.div
              className={styles.emptyState}
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
            >
              <p>No posts found in this category. Check back soon!</p>
            </motion.div>
          )}
        </Container>
      </Section>

      {/* Pagination */}
      {totalPages > 1 && (
        <Section variant="light" data-section-theme="light" className={styles.paginationSection}>
          <Container>
            <nav className={styles.pagination} aria-label="Blog pagination">
              {currentPage > 1 && (
                <motion.a
                  href={`/blog${selectedCategory ? `?category=${encodeURIComponent(selectedCategory)}` : ''}${currentPage > 2 ? `?page=${currentPage - 1}` : ''}`}
                  className={styles.paginationBtn}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  ← Previous
                </motion.a>
              )}

              <div className={styles.pageNumbers}>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <motion.a
                    key={page}
                    href={`/blog${selectedCategory ? `?category=${encodeURIComponent(selectedCategory)}&` : '?'}page=${page}`}
                    className={`${styles.pageNumber} ${page === currentPage ? styles.active : ''}`}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {page}
                  </motion.a>
                ))}
              </div>

              {currentPage < totalPages && (
                <motion.a
                  href={`/blog${selectedCategory ? `?category=${encodeURIComponent(selectedCategory)}&` : '?'}page=${currentPage + 1}`}
                  className={styles.paginationBtn}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Next →
                </motion.a>
              )}
            </nav>
          </Container>
        </Section>
      )}
    </>
  );
}
