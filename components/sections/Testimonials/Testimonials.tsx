'use client';

import { useState, useRef } from 'react';
import Image from 'next/image';
import Script from 'next/script';
import { motion, AnimatePresence } from 'framer-motion';
import Section from '@/components/ui/Section';
import Container from '@/components/ui/Container';
import { fadeUp, stagger, VIEWPORT } from '@/lib/motion';
import styles from './Testimonials.module.css';

/* ── Data ───────────────────────────────────────────────────── */
const REVIEWS = [
  {
    name: 'Amara L.',
    initial: 'A',
    avatarBg: '#4285F4',
    timeAgo: '2 weeks ago',
    categories: ['weight-management', 'health'],
    review:
      'The weight management programme changed my life. The doctors were supportive every step of the way. I finally have a plan that works for my lifestyle and I have never felt better.',
  },
  {
    name: 'David R.',
    initial: 'D',
    avatarBg: '#0F9D58',
    timeAgo: '1 month ago',
    categories: ['health', 'private-gp'],
    review:
      'I came in for help managing a long-term condition and left feeling genuinely heard. The level of care here is unlike any GP I have visited. Exceptional service from start to finish.',
  },
  {
    name: 'Priya S.',
    initial: 'P',
    avatarBg: '#9C27B0',
    timeAgo: '1 month ago',
    categories: ['general'],
    review:
      'From the first call to my follow-up, everything felt seamless and professional. The clinic is calm, the team is brilliant and the results speak for themselves.',
  },
  {
    name: 'James T.',
    initial: 'J',
    avatarBg: '#E53935',
    timeAgo: '2 months ago',
    categories: ['general'],
    review:
      'Absolutely brilliant experience from start to finish. Dr Virmani took time to explain everything clearly. I felt completely at ease and the outcome exceeded my expectations.',
  },
  {
    name: 'Sofia M.',
    initial: 'S',
    avatarBg: '#FF7043',
    timeAgo: '2 months ago',
    categories: ['aesthetics', 'skin'],
    review:
      'I had my skin treatment here and the results are incredible. The team was professional, friendly and made me feel completely comfortable throughout the entire process.',
  },
  {
    name: 'Ravi K.',
    initial: 'R',
    avatarBg: '#34A853',
    timeAgo: '3 months ago',
    categories: ['general'],
    review:
      'Top-class clinic. Everything from reception to the treatment itself was handled with care and precision. Will definitely be returning for follow-up treatments.',
  },
  {
    name: 'Natalia W.',
    initial: 'N',
    avatarBg: '#1565C0',
    timeAgo: '3 months ago',
    categories: ['aesthetics'],
    review:
      'Dr Bedi was amazing. She listened to all my concerns and tailored the treatment perfectly. The results are so natural-looking. Highly recommend to anyone considering aesthetics.',
  },
  {
    name: 'Michael B.',
    initial: 'M',
    avatarBg: '#F57F17',
    timeAgo: '4 months ago',
    categories: ['general'],
    review:
      'Outstanding clinic. The facilities are modern and spotless. Staff are welcoming and knowledgeable. I was impressed by the high standard throughout my visit.',
  },
];

const PATIENT_VIDEOS = [
  { id: 'idcb1vywka', title: 'Customer Testimonial' },
  { id: 'onscmatqmy', title: 'Customer Testimonial, Oxana' },
  { id: 'fm142sxmlw', title: 'Customer Testimonial, Mahanoor' },
];

const PER_PAGE = 3;

/* ── Icons ──────────────────────────────────────────────────── */
function GoogleG() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true">
      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
    </svg>
  );
}

function StarIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 20 20" aria-hidden="true" className={styles.starSvg}>
      <path d="M10 1.5l2.47 5.01 5.53.8-4 3.9.94 5.49L10 14.25l-4.94 2.6.94-5.49-4-3.9 5.53-.8z"/>
    </svg>
  );
}

function TrophyIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9V8h2v8zm4 0h-2V8h2v8z"/>
      <path d="M17 3H7v2h10V3zM7 19h10l-2 2H9l-2-2z"/>
    </svg>
  );
}

/* ── Slide animation ────────────────────────────────────────── */
const SLIDE = {
  enter:  (d: number) => ({ x: d > 0 ? 60 : -60, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit:   (d: number) => ({ x: d > 0 ? -60 : 60, opacity: 0 }),
};
const TRANSITION = { duration: 0.42, ease: [0.25, 0.1, 0.25, 1] as const };

/* ── Component ──────────────────────────────────────────────── */
export default function Testimonials({
  showVideos = false,
  filterCategory,
}: {
  showVideos?: boolean;
  filterCategory?: string;
}) {
  /* Build filtered review pool when a category is supplied */
  const pool = filterCategory
    ? (() => {
        const matched  = REVIEWS.filter(r => r.categories.includes(filterCategory));
        const generals = REVIEWS.filter(r => r.categories.includes('general') && !r.categories.includes(filterCategory));
        const combined = [...matched, ...generals];
        return combined.length >= PER_PAGE ? combined.slice(0, PER_PAGE) : REVIEWS.slice(0, PER_PAGE);
      })()
    : REVIEWS;

  /* Reviews carousel */
  const [page, setPage] = useState(0);
  const [dir,  setDir]  = useState(1);

  /* Patient video mobile slideshow */
  const [videoActive, setVideoActive] = useState(0);
  const videoTouchX = useRef(0);
  const videoTouchY = useRef(0);

  const totalPages = filterCategory ? 1 : Math.ceil(pool.length / PER_PAGE);
  const visible    = filterCategory ? pool : pool.slice(page * PER_PAGE, (page + 1) * PER_PAGE);

  function goTo(next: number, direction: number) {
    setDir(direction);
    setPage(next);
  }

  function onTouchStart(e: React.TouchEvent) { (e.currentTarget as HTMLDivElement).dataset.tx = String(e.touches[0].clientX); }
  function onTouchEnd(e: React.TouchEvent) {
    const start = Number((e.currentTarget as HTMLDivElement).dataset.tx ?? 0);
    const delta = e.changedTouches[0].clientX - start;
    if (delta < -50) goTo((page + 1) % totalPages, 1);
    if (delta >  50) goTo((page - 1 + totalPages) % totalPages, -1);
  }

  function goVideo(next: number) {
    setVideoActive((next + PATIENT_VIDEOS.length) % PATIENT_VIDEOS.length);
  }

  function onVideoTouchStart(e: React.TouchEvent) {
    videoTouchX.current = e.touches[0].clientX;
    videoTouchY.current = e.touches[0].clientY;
  }

  function onVideoTouchEnd(e: React.TouchEvent) {
    const dx = e.changedTouches[0].clientX - videoTouchX.current;
    const dy = Math.abs(e.changedTouches[0].clientY - videoTouchY.current);
    if (Math.abs(dx) > 44 && Math.abs(dx) > dy) goVideo(videoActive + (dx < 0 ? 1 : -1));
  }

  return (
    <Section variant="dark" data-section-theme="dark" className={styles.section}>
      <Script src="https://fast.wistia.net/player.js" strategy="lazyOnload" />

      {/* Background image */}
      <div className={styles.bgWrap} aria-hidden="true">
        <Image
          src="/images/Black background image.jpg"
          alt=""
          fill
          className={styles.bgImg}
          sizes="100vw"
        />
      </div>

      <Container className={styles.contentLayer}>

        {/* ── Header ────────────────────────────────────── */}
        <motion.div
          className={styles.header}
          variants={stagger(0.12)}
          initial="hidden"
          whileInView="show"
          viewport={VIEWPORT}
        >
          <motion.div className={styles.chipRow} variants={fadeUp}>
            <span className={styles.chip}>
              <TrophyIcon />
              Loved by Thousands
            </span>
          </motion.div>

          <motion.h2 className={styles.heading} variants={fadeUp}>
            What Our<br />
            <span className={styles.headingAccent}>Customers Say</span>
          </motion.h2>

          <motion.p className={styles.subtext} variants={fadeUp}>
            Don&apos;t just take our word for it. Here&apos;s what real patients have
            to say about their experience at The One Clinic.
          </motion.p>
        </motion.div>

        {/* ── Reviews carousel ──────────────────────────── */}
        <motion.div
          className={styles.carouselRow}
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={VIEWPORT}
        >
          <button
            className={styles.arrowBtn}
            onClick={() => goTo((page - 1 + totalPages) % totalPages, -1)}
            aria-label="Previous reviews"
          >
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
              <path d="M11 4L6 9L11 14" stroke="currentColor" strokeWidth="2"
                strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>

          <div
            className={styles.viewport}
            onTouchStart={onTouchStart}
            onTouchEnd={onTouchEnd}
          >
            <AnimatePresence mode="wait" custom={dir}>
              <motion.div
                key={page}
                className={styles.cardsGrid}
                custom={dir}
                variants={SLIDE}
                initial="enter"
                animate="center"
                exit="exit"
                transition={TRANSITION}
              >
                {visible.map((r) => (
                  <div key={r.name} className={styles.card}>
                    <span className={styles.quoteIcon} aria-hidden="true">&ldquo;</span>
                    <div className={styles.starsRow} aria-label="5 out of 5 stars">
                      {[...Array(5)].map((_, i) => <StarIcon key={i} />)}
                    </div>
                    <p className={styles.reviewText}>{r.review}</p>
                    <div className={styles.cardFooter}>
                      <div className={styles.avatar} style={{ background: r.avatarBg }} aria-hidden="true">
                        {r.initial}
                      </div>
                      <div className={styles.authorInfo}>
                        <p className={styles.authorName}>{r.name}</p>
                        <p className={styles.timeAgo}>{r.timeAgo}</p>
                      </div>
                      <div className={styles.googleG}><GoogleG /></div>
                    </div>
                  </div>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>

          <button
            className={styles.arrowBtn}
            onClick={() => goTo((page + 1) % totalPages, 1)}
            aria-label="Next reviews"
          >
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
              <path d="M7 4L12 9L7 14" stroke="currentColor" strokeWidth="2"
                strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </motion.div>

        {/* ── Pagination dots ───────────────────────────── */}
        <div className={styles.dots} role="tablist" aria-label="Review pages">
          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i}
              className={`${styles.dot} ${i === page ? styles.dotActive : ''}`}
              onClick={() => goTo(i, i > page ? 1 : -1)}
              role="tab"
              aria-selected={i === page}
              aria-label={`Page ${i + 1} of ${totalPages}`}
            />
          ))}
        </div>

        {/* ── Patient video stories , home/brand page only ── */}
        {showVideos && <div className={styles.patientsSection}>
          {/* Desktop: 3-column portrait grid */}
          <motion.div
            className={styles.videosGrid}
            variants={stagger(0.12)}
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
          >
            {PATIENT_VIDEOS.map((v) => (
              <motion.div key={v.id} className={styles.videoCard} variants={fadeUp}>
                <div className={styles.videoPortrait}>
                  <iframe
                    src={`https://fast.wistia.net/embed/iframe/${v.id}?web_component=true&seo=true`}
                    title={v.title}
                    allow="autoplay; fullscreen"
                    allowFullScreen
                    frameBorder="0"
                    scrolling="no"
                    className={styles.iframe}
                  />
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Mobile: slideshow */}
          <div className={styles.mobileSlideshow}>
            <div className={styles.mobileTrackRow}>
              <button
                className={styles.mobileArrow}
                onClick={() => goVideo(videoActive - 1)}
                aria-label="Previous video"
              >
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                  <polyline points="11,3 5,9 11,15" stroke="currentColor" strokeWidth="2"
                    strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>

              <div
                className={styles.mobileTrack}
                onTouchStart={onVideoTouchStart}
                onTouchEnd={onVideoTouchEnd}
              >
                <div className={styles.videoPortraitMobile}>
                  <iframe
                    key={videoActive}
                    src={`https://fast.wistia.net/embed/iframe/${PATIENT_VIDEOS[videoActive].id}?web_component=true&seo=true`}
                    title={PATIENT_VIDEOS[videoActive].title}
                    allow="autoplay; fullscreen"
                    allowFullScreen
                    frameBorder="0"
                    scrolling="no"
                    className={styles.iframe}
                  />
                </div>
              </div>

              <button
                className={styles.mobileArrow}
                onClick={() => goVideo(videoActive + 1)}
                aria-label="Next video"
              >
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                  <polyline points="7,3 13,9 7,15" stroke="currentColor" strokeWidth="2"
                    strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>

            <div className={styles.mobileDots} role="tablist" aria-label="Patient testimonial videos">
              {PATIENT_VIDEOS.map((_, i) => (
                <button
                  key={i}
                  className={`${styles.mobileDot} ${i === videoActive ? styles.mobileDotActive : ''}`}
                  onClick={() => goVideo(i)}
                  role="tab"
                  aria-selected={i === videoActive}
                  aria-label={`Video ${i + 1} of ${PATIENT_VIDEOS.length}`}
                />
              ))}
            </div>
          </div>
        </div>}

      </Container>
    </Section>
  );
}
