import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Container from '@/components/ui/Container';
import Section from '@/components/ui/Section';
import BlogCard from '@/components/blog/BlogCard';
import Breadcrumb from '@/components/ui/Breadcrumb';
import { getAllPosts, getAuthors, paginate } from '@/lib/blog';
import styles from './page.module.css';

interface AuthorPageProps {
  params: Promise<{ author: string }>;
  searchParams: Promise<{ page?: string }>;
}

const AUTHOR_BIOS: Record<string, { name: string; role: string; bio: string; photo?: string }> = {
  'emily-carter': {
    name: 'Emily Carter',
    role: 'Aesthetic Content Writer',
    bio: 'Emily is a UK-based medical writer with a deep understanding of aesthetic care and holistic well-being. She writes informative and engaging content that helps readers make confident choices about their health and aesthetic choices. Emily\'s approachable writing style makes complex medical and aesthetic topics easy to understand, inspiring readers to look and feel their best.',
    photo: '/images/Emily Carter.jpg',
  },
};

export async function generateStaticParams() {
  const authors = await getAuthors();
  return authors.map((author) => ({
    author: author.toLowerCase().replace(/\s+/g, '-'),
  }));
}

export async function generateMetadata({ params }: AuthorPageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const bio = AUTHOR_BIOS[resolvedParams.author];
  const name = bio?.name ?? decodeURIComponent(resolvedParams.author)
    .split('-')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');

  return {
    title: `Articles by ${name}`,
    description: bio?.bio
      ? bio.bio.substring(0, 155) + '...'
      : `Read articles written by ${name} from The One Clinic in Leicester.`,
  };
}

export default async function AuthorPage({ params, searchParams }: AuthorPageProps) {
  const resolvedParams = await params;
  const resolvedSearchParams = await searchParams;

  const authorSlug = resolvedParams.author;
  const bio = AUTHOR_BIOS[authorSlug];
  const authorName = bio?.name ?? decodeURIComponent(authorSlug)
    .split('-')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');

  const allPosts = await getAllPosts();
  const authorPosts = allPosts.filter(
    (post) => post.author.toLowerCase().replace(/\s+/g, '-') === authorSlug
  );

  if (authorPosts.length === 0) {
    notFound();
  }

  const currentPage = parseInt(resolvedSearchParams.page || '1', 10);
  const { items: posts, totalPages } = paginate(authorPosts, currentPage, 12);

  return (
    <>
      {/* Hero */}
      <section className={styles.hero} data-section-theme="dark" aria-label="Author page">
        <div className={styles.heroGrid} aria-hidden="true" />
        <Container>
          <div className={styles.heroInner}>
            {/* Text side */}
            <div className={styles.heroContent}>
              <Breadcrumb
                theme="dark"
                items={[
                  { label: 'Blog', href: '/blog' },
                  { label: authorName },
                ]}
              />

              <p className={styles.heroEyebrow}>Author</p>
              <h1 className={styles.heroTitle}>{authorName}</h1>

              {bio && (
                <div className={styles.authorMeta}>
                  <span className={styles.authorRole}>{bio.role}</span>
                  <p className={styles.authorBio}>{bio.bio}</p>
                </div>
              )}

              <p className={styles.articleCount}>
                {authorPosts.length} {authorPosts.length === 1 ? 'article' : 'articles'} published
              </p>
            </div>

            {/* Photo side */}
            {bio?.photo && (
              <div className={styles.photoWrap}>
                <Image
                  src={bio.photo}
                  alt={authorName}
                  fill
                  className={styles.photo}
                  sizes="(max-width: 768px) 100vw, 340px"
                  priority
                />
              </div>
            )}
          </div>
        </Container>
      </section>

      {/* Posts Grid */}
      <Section variant="light" data-section-theme="light" className={styles.postsSection}>
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
                  href={`/blog/author/${authorSlug}${currentPage > 2 ? `?page=${currentPage - 1}` : ''}`}
                  className={styles.paginationBtn}
                >
                  ← Previous
                </a>
              )}
              <div className={styles.pageNumbers}>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <a
                    key={page}
                    href={`/blog/author/${authorSlug}${page > 1 ? `?page=${page}` : ''}`}
                    className={`${styles.pageNumber} ${page === currentPage ? styles.active : ''}`}
                  >
                    {page}
                  </a>
                ))}
              </div>
              {currentPage < totalPages && (
                <a
                  href={`/blog/author/${authorSlug}?page=${currentPage + 1}`}
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
