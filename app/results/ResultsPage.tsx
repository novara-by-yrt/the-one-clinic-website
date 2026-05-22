'use client';

import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Container from '@/components/ui/Container';
import Section from '@/components/ui/Section';
import LeadForm from '@/components/sections/LeadForm/LeadForm';
import { fadeUp, stagger, VIEWPORT } from '@/lib/motion';
import styles from './page.module.css';

const IMAGES = [
  { src: '/images/Endolift B-A.jpg',                  alt: 'Endolift before and after results',          title: 'Endolift' },
  { src: '/images/Endolift 1 B-A.jpg',                alt: 'Endolift before and after result 1',         title: 'Endolift' },
  { src: '/images/Endolift 2 B-A.jpg',                alt: 'Endolift before and after result 2',         title: 'Endolift' },
  { src: '/images/Endolift 3 B-A.jpg',                alt: 'Endolift before and after result 3',         title: 'Endolift' },
  { src: '/images/Endolift 4 B-A.jpg',                alt: 'Endolift before and after result 4',         title: 'Endolift' },
  { src: '/images/Endolift 5 B-A.jpg',                alt: 'Endolift before and after result 5',         title: 'Endolift' },
  { src: '/images/Lumecca Before & After 2.jpg',      alt: 'Lumecca laser before and after results',     title: 'Lumecca Laser' },
  { src: '/images/Lumecca IPL B-A.jpg',               alt: 'Lumecca IPL before and after results',       title: 'Lumecca IPL' },
  { src: '/images/Morpheus8 Before & After 2.jpg',    alt: 'Morpheus 8 before and after results',        title: 'Morpheus 8' },
  { src: '/images/Morpheus8 1 B-A.jpg',               alt: 'Morpheus8 before and after result 1',        title: 'Morpheus 8' },
  { src: '/images/Morpheus8 2  B-A.jpg',              alt: 'Morpheus8 before and after result 2',        title: 'Morpheus 8' },
  { src: '/images/Lip Filler  Before & After.jpg',    alt: 'Lip filler before and after results',        title: 'Lip Filler' },
  { src: '/images/Pigmentation Before & After 2.jpg', alt: 'Pigmentation treatment before and after',    title: 'Pigmentation Treatment' },
  { src: '/images/Mole Removal Before & After.jpg',   alt: 'Mole removal before and after results',      title: 'Mole Removal' },
  { src: '/images/ACNE Before & After.jpg',           alt: 'Acne treatment before and after results',    title: 'Acne Treatment' },
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
    if (Math.abs(dx) > 44 && Math.abs(dx) > dy) go(active + (dx < 0 ? 1 : -1));
  }

  const variants = {
    enter:  (dir: number) => ({ x: dir > 0 ? '100%' : '-100%', opacity: 0 }),
    center: { x: '0%', opacity: 1 },
    exit:   (dir: number) => ({ x: dir > 0 ? '-100%' : '100%', opacity: 0 }),
  };

  return (
    <div className={styles.slideshow}>
      <p className={styles.imageTitle}>{IMAGES[active].title}</p>
      <div className={styles.slideshowInner}>
        <div className={styles.slideshowTrack} onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
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
        <button className={`${styles.arrow} ${styles.arrowPrev}`} onClick={() => go(active - 1)} aria-label="Previous">
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <polyline points="11,3 5,9 11,15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        <button className={`${styles.arrow} ${styles.arrowNext}`} onClick={() => go(active + 1)} aria-label="Next">
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <polyline points="7,3 13,9 7,15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>
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

// ── Main page ────────────────────────────────────────────────────
export default function ResultsPage() {
  return (
    <>
      {/* ── Hero ──────────────────────────────────────────────── */}
      <section className={styles.hero} aria-label="Results hero" data-section-theme="dark">
        <div className={styles.heroGrid} aria-hidden="true" />
        <Container>
          <motion.div
            className={styles.heroContent}
            variants={stagger(0.15)}
            initial="hidden"
            animate="show"
          >
            <motion.p className={styles.heroEyebrow} variants={fadeUp}>Patient Outcomes</motion.p>
            <motion.h1 className={styles.heroTitle} variants={fadeUp}>Real Transformations</motion.h1>
            <motion.p className={styles.heroDesc} variants={fadeUp}>
              Genuine before and after results from our patients, delivered by
              experienced, qualified doctors at The One Clinic Leicester.
            </motion.p>
          </motion.div>
        </Container>
      </section>

      {/* ── Before & After Images ─────────────────────────────── */}
      <Section variant="dark" data-section-theme="dark" className={styles.imagesSection}>
        <div className={styles.imagesBg} aria-hidden="true">
          <Image
            src="/images/Black background image.jpg"
            alt=""
            fill
            className={styles.imagesBgImg}
            sizes="100vw"
          />
        </div>

        <Container className={styles.imagesContent}>
          {/* Desktop grid */}
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
                    sizes="(max-width: 768px) 0vw, (max-width: 1024px) 50vw, 25vw"
                  />
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Mobile slideshow */}
          <div className={styles.mobileOnly}>
            <MobileSlideshow />
          </div>

          {/* Coming soon notice */}
          <motion.div
            className={styles.comingSoon}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <div className={styles.comingSoonInner}>
              <span className={styles.comingSoonDot} aria-hidden="true" />
              <p className={styles.comingSoonText}>
                More transformations are on their way, check back soon for new results
                across our full range of treatments.
              </p>
            </div>
          </motion.div>
        </Container>
      </Section>

      {/* ── Form + Map ────────────────────────────────────────── */}
      <LeadForm />
    </>
  );
}
