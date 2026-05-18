import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Container from '@/components/ui/Container';
import Section from '@/components/ui/Section';
import BlogCard from '@/components/blog/BlogCard';
import Breadcrumb from '@/components/ui/Breadcrumb';
import { getAllPosts, getCategories, paginate } from '@/lib/blog';


import styles from './page.module.css';

interface CategoryPageProps {
  params: Promise<{ category: string }>;
  searchParams: Promise<{ page?: string }>;
}

export async function generateStaticParams() {
  const categories = await getCategories();
  return categories.map((cat) => ({
    category: cat.toLowerCase().replace(/\s+/g, '-'),
  }));
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const categoryName = decodeURIComponent(resolvedParams.category)
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

  return {
    title: `${categoryName} Articles`,
    description: `Read expert articles on ${categoryName} from The One Clinic in Leicester.`,
  };
}

export default async function CategoryPage({ params, searchParams }: CategoryPageProps) {
  const resolvedParams = await params;
  const resolvedSearchParams = await searchParams;

  const categoryName = decodeURIComponent(resolvedParams.category)
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

  const allPosts = await getAllPosts();
  const categoryPosts = allPosts.filter((post) => post.category === categoryName);

  if (categoryPosts.length === 0) {
    notFound();
  }

  const currentPage = parseInt(resolvedSearchParams.page || '1', 10);
  const { items: posts, totalPages } = paginate(categoryPosts, currentPage, 10);

  return (
    <>
      {/* Hero */}
      <section className={styles.hero} data-section-theme="dark" aria-label="Category archive, hero">
        <div className={styles.heroGrid} aria-hidden="true" />
        <Container>
          <div className={styles.heroContent}>
            <div>
              <Breadcrumb
                theme="dark"
                items={[
                  { label: 'Blog', href: '/blog' },
                  { label: categoryName },
                ]}
              />
            </div>

            <h1 className={styles.heroTitle}>
              {categoryName}
            </h1>

            <p className={styles.heroDesc}>
              {categoryPosts.length} {categoryPosts.length === 1 ? 'article' : 'articles'} on {categoryName}
            </p>
          </div>
        </Container>
      </section>

      {/* Posts Grid */}
      <Section variant="light" data-section-theme="light">
        <Container>
          <div className={styles.postsGrid}>
            {posts.map((post) => (
              <BlogCard key={post.slug} post={post} />
            ))}
          </div>
        </Container>
      </Section>

      {/* Pagination */}
      {totalPages > 1 && (
        <Section variant="light" data-section-theme="light" className={styles.paginationSection}>
          <Container>
            <nav className={styles.pagination} aria-label="Category pagination">
              {currentPage > 1 && (
                <a
                  href={`/blog/category/${resolvedParams.category}${currentPage > 2 ? `?page=${currentPage - 1}` : ''}`}
                  className={styles.paginationBtn}
                >
                  ← Previous
                </a>
              )}

              <div className={styles.pageNumbers}>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <a
                    key={page}
                    href={`/blog/category/${resolvedParams.category}${page > 1 ? `?page=${page}` : ''}`}
                    className={`${styles.pageNumber} ${page === currentPage ? styles.active : ''}`}
                  >
                    {page}
                  </a>
                ))}
              </div>

              {currentPage < totalPages && (
                <a
                  href={`/blog/category/${resolvedParams.category}?page=${currentPage + 1}`}
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
