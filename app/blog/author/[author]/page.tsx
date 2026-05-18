import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Container from '@/components/ui/Container';
import Section from '@/components/ui/Section';
import BlogCard from '@/components/blog/BlogCard';
import Breadcrumb from '@/components/ui/Breadcrumb';
import { getAllPosts, getAuthors, paginate } from '@/lib/blog';
import { getTeamMemberByName } from '@/data/team';


import styles from './page.module.css';

interface AuthorPageProps {
  params: Promise<{ author: string }>;
  searchParams: Promise<{ page?: string }>;
}

export async function generateStaticParams() {
  const authors = await getAuthors();
  return authors.map((author) => ({
    author: author.toLowerCase().replace(/\s+/g, '-'),
  }));
}

export async function generateMetadata({ params }: AuthorPageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const authorName = decodeURIComponent(resolvedParams.author)
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

  return {
    title: `Articles by ${authorName}`,
    description: `Read articles written by ${authorName} from The One Clinic in Leicester.`,
  };
}

export default async function AuthorPage({ params, searchParams }: AuthorPageProps) {
  const resolvedParams = await params;
  const resolvedSearchParams = await searchParams;

  const authorName = decodeURIComponent(resolvedParams.author)
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

  const allPosts = await getAllPosts();
  const authorPosts = allPosts.filter((post) => post.author === authorName);

  if (authorPosts.length === 0) {
    notFound();
  }

  // Get team member info
  const teamMember = getTeamMemberByName(authorName);

  const currentPage = parseInt(resolvedSearchParams.page || '1', 10);
  const { items: posts, totalPages } = paginate(authorPosts, currentPage, 10);

  return (
    <>
      {/* Hero */}
      <section className={styles.hero} data-section-theme="dark" aria-label="Author archive, hero">
        <div className={styles.heroGrid} aria-hidden="true" />
        <Container>
          <div className={styles.heroContent}>
            <div>
              <Breadcrumb
                theme="dark"
                items={[
                  { label: 'Blog', href: '/blog' },
                  { label: authorName },
                ]}
              />
            </div>

            <h1 className={styles.heroTitle}>
              By {authorName}
            </h1>

            {teamMember && (
              <div className={styles.authorInfo}>
                <p className={styles.authorRole}>{teamMember.role}</p>
                <p className={styles.authorCount}>
                  {authorPosts.length} {authorPosts.length === 1 ? 'article' : 'articles'}
                </p>
                <Link
                  href={`/team/${teamMember.slug}`}
                  className={styles.profileLink}
                >
                  View Full Profile
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                    <path
                      d="M3 8h10M9 4l4 4-4 4"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </Link>
              </div>
            )}
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
            <nav className={styles.pagination} aria-label="Author pagination">
              {currentPage > 1 && (
                <a
                  href={`/blog/author/${resolvedParams.author}${currentPage > 2 ? `?page=${currentPage - 1}` : ''}`}
                  className={styles.paginationBtn}
                >
                  ← Previous
                </a>
              )}

              <div className={styles.pageNumbers}>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <a
                    key={page}
                    href={`/blog/author/${resolvedParams.author}${page > 1 ? `?page=${page}` : ''}`}
                    className={`${styles.pageNumber} ${page === currentPage ? styles.active : ''}`}
                  >
                    {page}
                  </a>
                ))}
              </div>

              {currentPage < totalPages && (
                <a
                  href={`/blog/author/${resolvedParams.author}?page=${currentPage + 1}`}
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
