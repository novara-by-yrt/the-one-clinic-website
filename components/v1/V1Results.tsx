'use client';

import { useRef, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { m } from 'framer-motion';
import { SLIDES_BASE } from '@/components/sections/CaseStudies/CaseStudies';
import { useTilt } from './useTilt';
import styles from './V1Results.module.css';

const EASE = [0.22, 1, 0.36, 1] as const;
const VIEW = { once: true, margin: '-60px 0px' };

/**
 * The full library lives on /results. SLIDES_BASE is grouped by treatment,
 * so taking the first N would open the rail on fourteen Endolifts. Deal one
 * card from each treatment in turn instead, so the visible run shows the
 * breadth of what the clinic does.
 */
const SHOWN = (() => {
  const byTitle = new Map<string, typeof SLIDES_BASE>();
  for (const slide of SLIDES_BASE) {
    const group = byTitle.get(slide.title);
    if (group) group.push(slide);
    else byTitle.set(slide.title, [slide]);
  }
  const groups = [...byTitle.values()];
  const out: typeof SLIDES_BASE = [];
  for (let round = 0; out.length < 16; round++) {
    let added = false;
    for (const group of groups) {
      if (group[round]) {
        out.push(group[round]);
        added = true;
        if (out.length >= 16) break;
      }
    }
    if (!added) break;
  }
  return out;
})();

type Slide = (typeof SLIDES_BASE)[number];

function ResultCard({ slide }: { slide: Slide }) {
  const { ref, tiltProps } = useTilt<HTMLDivElement>({ max: 7, lift: 30 });
  return (
    <div ref={ref} className={styles.card} {...tiltProps}>
      <Image
        src={slide.src}
        alt={slide.alt}
        fill
        className={styles.img}
        sizes="(max-width: 620px) 60vw, 320px"
      />
      <div className={styles.scrim} aria-hidden="true" />
      <span className={styles.tag}>
        <span className={styles.tagDot} aria-hidden="true" />
        {slide.title}
      </span>
    </div>
  );
}

export default function V1Results() {
  const railRef = useRef<HTMLDivElement>(null);

  const scrollBy = useCallback((dir: 1 | -1) => {
    const rail = railRef.current;
    if (!rail) return;
    const card = rail.querySelector<HTMLElement>(`.${styles.card}`);
    const step = card ? card.offsetWidth + 20 : rail.clientWidth * 0.8;
    rail.scrollBy({ left: step * dir * 2, behavior: 'smooth' });
  }, []);

  return (
    <>
      <m.div
        ref={railRef}
        className={styles.rail}
        initial={{ opacity: 0, y: 36 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={VIEW}
        transition={{ duration: 0.85, ease: EASE }}
      >
        {SHOWN.map((slide, i) => (
          <ResultCard key={`${slide.src}-${i}`} slide={slide} />
        ))}
      </m.div>

      <div className={styles.foot}>
        <button type="button" className={styles.arrow} aria-label="Scroll results left"
                onClick={() => scrollBy(-1)}>
          <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor"
               strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>

        <Link href="/results" className={styles.moreBtn}>
          View more results
          <svg width="15" height="15" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.7"
              strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </Link>

        <button type="button" className={styles.arrow} aria-label="Scroll results right"
                onClick={() => scrollBy(1)}>
          <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor"
               strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>
      </div>
    </>
  );
}
