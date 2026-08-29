'use client';

import { useState, useMemo, useCallback } from 'react';
import Link from 'next/link';
import { m, AnimatePresence } from 'framer-motion';
import CardFanCarousel, { type CardItem } from '@/components/ui/CardFanCarousel';
import { SLIDES_BASE } from '@/components/brand/BrandTreatments';
import styles from './V1Treatments.module.css';

const TOTAL = SLIDES_BASE.length;
const EASE = [0.22, 1, 0.36, 1] as const;

const INFO = {
  hidden: { opacity: 0, y: 16, rotateX: -12 },
  show: { opacity: 1, y: 0, rotateX: 0, transition: { duration: 0.42, ease: EASE } },
  exit: { opacity: 0, y: -10, rotateX: 8, transition: { duration: 0.22, ease: 'easeIn' as const } },
};

const Arrow = ({ className }: { className?: string }) => (
  <svg className={className} width="15" height="15" viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.7"
      strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export default function V1Treatments() {
  const [activeIndex, setActiveIndex] = useState(TOTAL >> 1);
  const active = SLIDES_BASE[activeIndex % TOTAL] ?? SLIDES_BASE[0];

  const cards: CardItem[] = useMemo(
    () =>
      SLIDES_BASE.map((s) => ({
        imgUrl: s.src,
        alt: s.title,
        title: s.title,
        linkUrl: s.href,
      })),
    [],
  );

  const handleActiveChange = useCallback((i: number) => setActiveIndex(i), []);

  return (
    <>
      <div className={styles.fanWrap}>
        <CardFanCarousel
          cards={cards}
          label="Popular treatments"
          onActiveChange={handleActiveChange}
        />
      </div>

      <div className={styles.panel}>
        <AnimatePresence mode="wait">
          <m.div key={activeIndex} className={styles.info} variants={INFO}
                 initial="hidden" animate="show" exit="exit">
            <h3 className={styles.name}>{active.title}</h3>
            <div className={styles.rule} aria-hidden="true" />
            <p className={styles.desc}>{active.desc}</p>
            <Link href={active.href} className={styles.cta}
                  aria-label={`Learn more about ${active.title}`}>
              Learn More
              <Arrow className={styles.ctaArrow} />
            </Link>
          </m.div>
        </AnimatePresence>
      </div>

      <div className={styles.exploreRow}>
        <Link href="/treatments" className={styles.explore}>
          Explore all treatments
          <Arrow />
        </Link>
      </div>
    </>
  );
}
