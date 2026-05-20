import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import Container from '@/components/ui/Container';
import Section from '@/components/ui/Section';
import BlogCard from '@/components/blog/BlogCard';
import Breadcrumb from '@/components/ui/Breadcrumb';
import { getAllPosts, paginate } from '@/lib/blog';
import styles from './page.module.css';

interface ReviewerPageProps {
  params: Promise<{ reviewer: string }>;
  searchParams: Promise<{ page?: string }>;
}

interface ReviewerData {
  name: string;
  title: string;
  photo: string;
  expertise: string;
  experience: string;
  highlights: string[];
  about: string[];
  aboutClinic: string;
  teamSlug: string;
}

const REVIEWERS: Record<string, ReviewerData> = {
  'dr-sumit-virmani': {
    name: 'Dr Sumit Virmani',
    title: 'Co-Founder of The One Clinic',
    photo: '/images/imgi_20_team-thumb-VIRMANI.jpg',
    expertise: 'Minor surgical procedures, clinical skin assessments, evidence-based treatment planning.',
    experience: 'Specialist consultations, delivering patient-focused care, and overseeing aesthetic results.',
    highlights: [
      'Co-founder of The One Clinic.',
      'Over 15 years of medical experience.',
      'More than 12 years working as a local GP.',
      'Skilled in minor surgery and removing skin lesions.',
      'Special interest in body contouring and hair restoration.',
      'Focused on safe, effective treatments with natural results.',
      'Helps patients feel healthy and confident in their appearance and overall well-being.',
    ],
    about: [
      'Dr Sumit Virmani is the co-founder of The One Clinic and a highly experienced medical doctor with over 15 years of practice, including more than 12 years as a local GP. He holds an MBBS and is a member of the Royal College of General Practitioners (MRCGP).',
      'Dr Virmani specialises in minor surgery, skin lesion removal, body contouring, and hair rejuvenation, combining medical expertise with a patient-focused approach to ensure safety and natural-looking results. Alongside his aesthetic work, he continues to practise as a GP, offering trusted care for a wide range of health and well-being needs.',
    ],
    aboutClinic:
      'The One Clinic in Leicester is a doctor-led aesthetic and well-being clinic, offering a wide range of treatments, from facial aesthetics and body contouring to general health and men\'s well-being, all tailored to each patient\'s needs. With a focus on safety, personalised care, and long-term results, The One Clinic ensures patients are supported throughout their treatment journey. Their team of expert doctors works collaboratively to provide comprehensive solutions, making it a trusted destination for health, confidence, and overall well-being.',
    teamSlug: 'dr-sumit-virmani',
  },
};

export async function generateStaticParams() {
  return Object.keys(REVIEWERS).map((reviewer) => ({ reviewer }));
}

export async function generateMetadata({ params }: ReviewerPageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const reviewer = REVIEWERS[resolvedParams.reviewer];
  if (!reviewer) return { title: 'Reviewer Not Found' };

  return {
    title: `${reviewer.name} | Medical Reviewer`,
    description: `${reviewer.about[0]}`,
  };
}

export default async function ReviewerPage({ params, searchParams }: ReviewerPageProps) {
  const resolvedParams = await params;
  const resolvedSearchParams = await searchParams;

  const reviewerSlug = resolvedParams.reviewer;
  const reviewer = REVIEWERS[reviewerSlug];

  if (!reviewer) notFound();

  const allPosts = await getAllPosts();
  const reviewedPosts = allPosts.filter((post) => {
    if (!post.medicalReviewer) return false;
    return post.medicalReviewer.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') === reviewerSlug;
  });

  const currentPage = parseInt(resolvedSearchParams.page || '1', 10);
  const { items: posts, totalPages } = paginate(reviewedPosts, currentPage, 12);

  return (
    <>
      {/* Hero */}
      <section className={styles.hero} data-section-theme="dark" aria-label="Reviewer profile">
        <div className={styles.heroGrid} aria-hidden="true" />
        <Container>
          <div className={styles.heroInner}>
            {/* Left: Text */}
            <div className={styles.heroText}>
              <Breadcrumb
                theme="dark"
                items={[
                  { label: 'Blog', href: '/blog' },
                  { label: reviewer.name },
                ]}
              />

              <p className={styles.eyebrow}>Medical Reviewer</p>
              <h1 className={styles.name}>{reviewer.name}</h1>
              <p className={styles.titleText}>{reviewer.title}</p>

              <p className={styles.heroDescription}>
                {reviewer.expertise} {reviewer.experience}
              </p>

              <Link href={`/team/${reviewer.teamSlug}`} className={styles.profileBtn}>
                View Full Team Profile
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
            </div>

            {/* Right: Photo */}
            <div className={styles.photoWrap}>
              <Image
                src={reviewer.photo}
                alt={reviewer.name}
                fill
                className={styles.photo}
                sizes="(max-width: 768px) 100vw, 380px"
                priority
              />
            </div>
          </div>
        </Container>
      </section>

      {/* Highlights + About */}
      <Section variant="light" data-section-theme="light" className={styles.bioSection}>
        <Container>
          <div className={styles.bioGrid}>
            {/* Highlights */}
            <div className={styles.highlights}>
              <h2 className={styles.sectionHeading}>Highlights</h2>
              <ul className={styles.highlightList}>
                {reviewer.highlights.map((item, i) => (
                  <li key={i} className={styles.highlightItem}>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true" className={styles.checkIcon}>
                      <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.5" />
                      <path d="M5 8l2 2 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* About */}
            <div className={styles.about}>
              <h2 className={styles.sectionHeading}>About</h2>
              {reviewer.about.map((para, i) => (
                <p key={i} className={styles.aboutPara}>{para}</p>
              ))}

              <div className={styles.clinicCard}>
                <h3 className={styles.clinicHeading}>About The One Clinic</h3>
                <p className={styles.aboutPara}>{reviewer.aboutClinic}</p>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* Reviewed Articles */}
      {reviewedPosts.length > 0 && (
        <Section variant="light" data-section-theme="light" className={styles.articlesSection}>
          <Container>
            <h2 className={styles.articlesHeading}>
              Articles Reviewed by {reviewer.name}
            </h2>
            <p className={styles.articlesCount}>
              {reviewedPosts.length} {reviewedPosts.length === 1 ? 'article' : 'articles'} reviewed
            </p>

            <div className={styles.postsGrid}>
              {posts.map((post) => (
                <BlogCard key={post.slug} post={post} />
              ))}
            </div>
          </Container>
        </Section>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <Section variant="light" data-section-theme="light" className={styles.paginationSection}>
          <Container>
            <nav className={styles.pagination} aria-label="Reviewer articles pagination">
              {currentPage > 1 && (
                <a href={`/reviewer/${reviewerSlug}${currentPage > 2 ? `?page=${currentPage - 1}` : ''}`} className={styles.paginationBtn}>
                  ← Previous
                </a>
              )}
              <div className={styles.pageNumbers}>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <a
                    key={page}
                    href={`/reviewer/${reviewerSlug}${page > 1 ? `?page=${page}` : ''}`}
                    className={`${styles.pageNumber} ${page === currentPage ? styles.active : ''}`}
                  >
                    {page}
                  </a>
                ))}
              </div>
              {currentPage < totalPages && (
                <a href={`/reviewer/${reviewerSlug}?page=${currentPage + 1}`} className={styles.paginationBtn}>
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
