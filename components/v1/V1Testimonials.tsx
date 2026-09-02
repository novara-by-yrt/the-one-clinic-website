'use client';

import { useState, useCallback } from 'react';
import { m, AnimatePresence } from 'framer-motion';
import { REVIEWS } from '@/components/sections/Testimonials/Testimonials';
import { useTilt } from './useTilt';
import styles from './V1Testimonials.module.css';

const PER_PAGE = 3;
const PAGES = Math.ceil(REVIEWS.length / PER_PAGE);
const EASE = [0.22, 1, 0.36, 1] as const;

function Stars() {
  return (
    <span className={styles.stars}>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} width="13" height="13" viewBox="0 0 20 20" aria-hidden="true"
             className={styles.starSvg}>
          <path d="M10 1.5l2.47 5.01 5.53.8-4 3.9.94 5.49L10 14.25l-4.94 2.6.94-5.49-4-3.9 5.53-.8z" />
        </svg>
      ))}
    </span>
  );
}

type Review = (typeof REVIEWS)[number];

function ReviewCard({ review, index, dir }: { review: Review; index: number; dir: number }) {
  const { ref, tiltProps } = useTilt<HTMLElement>({ max: 6, lift: 30 });

  return (
    <m.div
      className={styles.stage}
      initial={{ opacity: 0, x: dir >= 0 ? 46 : -46, rotateY: dir >= 0 ? -8 : 8 }}
      animate={{ opacity: 1, x: 0, rotateY: 0 }}
      exit={{ opacity: 0, x: dir >= 0 ? -46 : 46, rotateY: dir >= 0 ? 8 : -8 }}
      transition={{ duration: 0.5, delay: index * 0.07, ease: EASE }}
    >
      <article ref={ref} className={styles.card} {...tiltProps}>
        <span className={styles.quoteMark} aria-hidden="true">&ldquo;</span>

        <header className={styles.head}>
          <span className={styles.avatar} aria-hidden="true">{review.initial}</span>
          <span className={styles.who}>
            <span className={styles.name}>{review.name}</span>
            <span className={styles.metaRow}>
              <Stars />
              <span className={styles.when}>{review.timeAgo}</span>
            </span>
          </span>
        </header>

        <p className={styles.body}>{review.review}</p>

        <footer className={styles.foot}>
          <svg width="15" height="15" viewBox="0 0 24 24" aria-hidden="true">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
          </svg>
          <span className={styles.source}>Google Review</span>
        </footer>
      </article>
    </m.div>
  );
}

export default function V1Testimonials() {
  const [[page, dir], setPage] = useState<[number, number]>([0, 0]);

  const go = useCallback((next: number, d: number) => {
    setPage([(next + PAGES) % PAGES, d]);
  }, []);

  const shown = REVIEWS.slice(page * PER_PAGE, page * PER_PAGE + PER_PAGE);

  return (
    <>
      <div className={styles.grid}>
        <AnimatePresence mode="wait" initial={false}>
          {shown.map((review, i) => (
            <ReviewCard key={`${page}-${i}`} review={review} index={i} dir={dir} />
          ))}
        </AnimatePresence>
      </div>

      <div className={styles.controls}>
        <button type="button" className={styles.arrow} aria-label="Previous reviews"
                onClick={() => go(page - 1, -1)}>
          <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor"
               strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>

        <div className={styles.dots}>
          {Array.from({ length: PAGES }).map((_, i) => (
            <button
              key={i}
              type="button"
              className={`${styles.dot} ${i === page ? styles.dotOn : ''}`}
              aria-label={`Reviews page ${i + 1} of ${PAGES}`}
              aria-current={i === page ? 'true' : undefined}
              onClick={() => go(i, i > page ? 1 : -1)}
            />
          ))}
        </div>

        <button type="button" className={styles.arrow} aria-label="Next reviews"
                onClick={() => go(page + 1, 1)}>
          <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor"
               strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>
      </div>
    </>
  );
}
