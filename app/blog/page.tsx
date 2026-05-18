import type { Metadata } from 'next';
import { motion } from 'framer-motion';
import Container from '@/components/ui/Container';
import Section from '@/components/ui/Section';
import BlogCard from '@/components/blog/BlogCard';
import { getAllPosts, getCategories } from '@/lib/blog';
import { fadeUp, stagger, VIEWPORT } from '@/lib/motion';
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
          <motion.div
            className={styles.heroContent}
            variants={stagger(0.1)}
            initial="hidden"
            animate="show"
          >
            <motion.div variants={fadeUp}>
              <span className={styles.eyebrow}>The One Clinic</span>
            </motion.div>
            <motion.h1 className={styles.heroTitle} variants={fadeUp}>
              Insights & Expert Guidance
            </motion.h1>
            <motion.p className={styles.heroDesc} variants={fadeUp}>
              Comprehensive guides, treatment insights, and wellness tips from our team of GMC-registered doctors. Learn from the experts at The One Clinic.
            </motion.p>
          </motion.div>
        </Container>
      </section>

      {/* Category Filter Section */}
      <Section variant="light" data-section-theme="light">
        <Container>
          <motion.div
            className={styles.filterSection}
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
            variants={stagger(0.05)}
          >
            <motion.div variants={fadeUp} className={styles.filterLabel}>
              <span>Filter by Category</span>
            </motion.div>
            <motion.div className={styles.filterTags} variants={fadeUp}>
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
            </motion.div>
          </motion.div>
        </Container>
      </Section>

      {/* Blog Grid Section */}
      <Section variant="light" data-section-theme="light">
        <Container>
          {sortedPosts.length === 0 ? (
            <motion.div
              className={styles.emptyState}
              initial="hidden"
              whileInView="show"
              viewport={VIEWPORT}
              variants={fadeUp}
            >
              <p>No posts found in this category. Check back soon for new insights!</p>
            </motion.div>
          ) : (
            <motion.div
              className={styles.blogGrid}
              variants={stagger(0.05)}
              initial="hidden"
              whileInView="show"
              viewport={VIEWPORT}
            >
              {sortedPosts.map((post) => (
                <motion.div key={post.slug} variants={fadeUp}>
                  <BlogCard post={post} />
                </motion.div>
              ))}
            </motion.div>
          )}
        </Container>
      </Section>
    </>
  );
}
