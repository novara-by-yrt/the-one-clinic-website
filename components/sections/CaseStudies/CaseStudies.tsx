'use client';

import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import Section from '@/components/ui/Section';
import Container from '@/components/ui/Container';
import { fadeUp, stagger, VIEWPORT } from '@/lib/motion';
import styles from './CaseStudies.module.css';

const IMAGES = [
  { src: '/images/Before and after 1.png', alt: 'Lumecca Laser before and after',       title: 'Lumecca Laser' },
  { src: '/images/Before and after 2.png', alt: 'Endolift before and after',             title: 'Endolift' },
  { src: '/images/Before and after 3.png', alt: 'Laser Mole Removal before and after',  title: 'Laser Mole Removal' },
];

// ── Mobile slideshow ─────────────────────────────────────────────
function MobileSlideshow() {
  const [active, setActive]       = useState(0);
  const [direction, setDirection] = useState(1);
  const touchStartX               = useRef(0);
  const touchStartY               = useRef(0);

  function go(next: number) {
    setDirection(next > active ? 1 : -1);
    setActive((next + IMAGES.length) % IMAGES.length);
  }

  function onTouchStart(e: React.TouchEvent) {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  }

  function onTouchEnd(e: React.TouchEvent) {
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    const dy = Math.abs(e.changedTouches[0].clientY - touchStartY.current);
    if (Math.abs(dx) > 44 && Math.abs(dx) > dy) {
      go(active + (dx < 0 ? 1 : -1));
    }
  }

  const variants = {
    enter:  (dir: number) => ({ x: dir > 0 ? '100%' : '-100%', opacity: 0 }),
    center: { x: '0%', opacity: 1 },
    exit:   (dir: number) => ({ x: dir > 0 ? '-100%' : '100%', opacity: 0 }),
  };

  return (
    <div className={styles.slideshow}>
      {/* Treatment title — above the image */}
      <p className={styles.imageTitle}>{IMAGES[active].title}</p>

      {/* Track + arrows wrapped so arrows position relative to the image */}
      <div className={styles.slideshowInner}>
        <div
          className={styles.slideshowTrack}
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
        >
          <AnimatePresence custom={direction} mode="popLayout" initial={false}>
            <motion.div
              key={active}
              className={styles.slide}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.38, ease: [0.25, 0.1, 0.25, 1] }}
            >
              <Image
                src={IMAGES[active].src}
                alt={IMAGES[active].alt}
                fill
                className={styles.slideImage}
                sizes="100vw"
              />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Arrow buttons */}
        <button
          className={`${styles.arrow} ${styles.arrowPrev}`}
          onClick={() => go(active - 1)}
          aria-label="Previous image"
        >
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <polyline points="11,3 5,9 11,15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <button
          className={`${styles.arrow} ${styles.arrowNext}`}
          onClick={() => go(active + 1)}
          aria-label="Next image"
        >
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <polyline points="7,3 13,9 7,15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>

      {/* Pagination dots */}
      <div className={styles.dots} role="tablist" aria-label="Before and after results">
        {IMAGES.map((_, i) => (
          <button
            key={i}
            className={`${styles.dot} ${i === active ? styles.dotActive : ''}`}
            onClick={() => go(i)}
            role="tab"
            aria-selected={i === active}
            aria-label={`Image ${i + 1} of ${IMAGES.length}`}
          />
        ))}
      </div>
    </div>
  );
}

// ── Main component ───────────────────────────────────────────────
export default function CaseStudies() {
  return (
    <Section id="results" variant="dark" data-section-theme="dark" className={styles.section}>
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
        <motion.div
          className={styles.header}
          variants={stagger()}
          initial="hidden"
          whileInView="show"
          viewport={VIEWPORT}
        >
          <motion.p className={styles.eyebrow} variants={fadeUp}>
            Patient Outcomes
          </motion.p>
          <motion.h2 className={styles.heading} variants={fadeUp}>
            Real Transformations
          </motion.h2>
          <motion.p className={styles.subtext} variants={fadeUp}>
            Helping patients achieve confidence and long-term results, one
            personalised treatment at a time.
          </motion.p>
        </motion.div>

        {/* Desktop: 3-column grid */}
        <motion.div
          className={styles.grid}
          variants={stagger(0.12)}
          initial="hidden"
          whileInView="show"
          viewport={VIEWPORT}
        >
          {IMAGES.map((img, i) => (
            <motion.div key={i} className={styles.imageCardWrap} variants={fadeUp}>
              <p className={styles.imageTitle}>{img.title}</p>
              <div className={styles.imageCard}>
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  className={styles.cardImage}
                  sizes="(max-width: 768px) 0vw, (max-width: 1024px) 50vw, 33vw"
                />
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Mobile: slideshow */}
        <div className={styles.mobileOnly}>
          <MobileSlideshow />
        </div>

        {/* View more CTA */}
        <motion.div
          className={styles.viewMoreRow}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <Link href="/results" className={styles.viewMoreBtn}>
            View More Results
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.6"
                strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </Link>
        </motion.div>
      </Container>
    </Section>
  );
}
