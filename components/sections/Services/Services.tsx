'use client';

import { useRef, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import Section from '@/components/ui/Section';
import Container from '@/components/ui/Container';
import { fadeUp, stagger, VIEWPORT } from '@/lib/motion';
import styles from './Services.module.css';

const TREATMENTS = [
  {
    title: 'Anti-Wrinkle',
    category: 'Injections',
    desc: 'Smooth fine lines and restore a naturally refreshed look with expertly placed muscle-relaxing injections.',
    href: '/treatments/anti-wrinkle',
    image: '/images/service-anti-wrinkle.jpg',
    bg: 'linear-gradient(160deg,#0d1117 0%,#1c2333 100%)',
  },
  {
    title: 'Dermal Fillers',
    category: 'Enhancement',
    desc: 'Restore lost volume and define facial contours with precision-placed hyaluronic acid fillers.',
    href: '/treatments/dermal-fillers',
    image: '/images/service-dermal-fillers.jpg',
    bg: 'linear-gradient(160deg,#0d1714 0%,#162a24 100%)',
  },
  {
    title: 'Laser Hair Removal',
    category: 'Permanent Reduction',
    desc: 'Permanently reduce unwanted hair with our advanced laser system — safe, fast, and effective on all skin tones.',
    href: '/treatments/laser-resurfacing',
    image: '/images/service-laser-hair-removal.jpg',
    bg: 'linear-gradient(160deg,#100d17 0%,#1e1633 100%)',
  },
  {
    title: 'Morpheus8',
    category: 'Skin Remodeling',
    desc: 'Combine microneedling with radiofrequency energy to tighten skin, reduce wrinkles, and remodel deep collagen.',
    href: '/treatments/body-contouring',
    image: '/images/service-morpheus8.jpg',
    bg: 'linear-gradient(160deg,#17100d 0%,#2e1c16 100%)',
  },
  {
    title: 'Hydrafacial',
    category: 'Deep Cleanse',
    desc: 'A multi-step treatment that cleanses, extracts, and hydrates for instantly radiant, glowing skin.',
    href: '/treatments/anti-wrinkle',
    image: '/images/service-hydrafacial.jpg',
    bg: 'linear-gradient(160deg,#0d1317 0%,#132030 100%)',
  },
  {
    title: 'Fat Freezing',
    category: 'Body Contouring',
    desc: 'Cryolipolysis safely targets and permanently eliminates stubborn fat cells without surgery or downtime.',
    href: '/treatments/body-contouring',
    image: '/images/service-fat-freezing.jpg',
    bg: 'linear-gradient(160deg,#0d1117 0%,#131c2a 100%)',
  },
];

// Pixels per animation frame — slow, elegant pace (~21 px/s at 60fps)
const SPEED = 0.35;
const CARD_STEP = 380; // card width (360) + gap (20)

export default function Services() {
  const trackRef      = useRef<HTMLDivElement>(null);
  const posRef        = useRef(0);
  const rafRef        = useRef<number>(0);
  const draggingRef   = useRef(false);
  const hoveredRef    = useRef(false);
  const touchStartX   = useRef(0);
  const touchStartPos = useRef(0);

  useEffect(() => {
    function tick() {
      const track = trackRef.current;
      if (track && !draggingRef.current && !hoveredRef.current) {
        // Left-to-right: increment posRef; wrap when it reaches 0
        posRef.current += SPEED;
        const halfWidth = track.scrollWidth / 2;
        if (posRef.current >= 0) posRef.current -= halfWidth;
        track.style.transform = `translateX(${posRef.current}px)`;
      }
      rafRef.current = requestAnimationFrame(tick);
    }
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  function onTouchStart(e: React.TouchEvent) {
    draggingRef.current   = true;
    touchStartX.current   = e.touches[0].clientX;
    touchStartPos.current = posRef.current;
  }

  function onTouchMove(e: React.TouchEvent) {
    if (!draggingRef.current || !trackRef.current) return;
    const delta     = e.touches[0].clientX - touchStartX.current;
    const halfWidth = trackRef.current.scrollWidth / 2;
    let next        = touchStartPos.current + delta;
    while (next <= -halfWidth) next += halfWidth;
    while (next > 0)           next -= halfWidth;
    posRef.current = next;
    trackRef.current.style.transform = `translateX(${next}px)`;
  }

  function onTouchEnd() {
    draggingRef.current = false;
  }

  function scrollBy(amount: number) {
    const track = trackRef.current;
    if (!track) return;
    const halfWidth = track.scrollWidth / 2;
    let next = posRef.current + amount;
    while (next <= -halfWidth) next += halfWidth;
    while (next > 0)           next -= halfWidth;
    posRef.current = next;
    track.style.transform = `translateX(${next}px)`;
  }

  return (
    <Section id="treatments" variant="light" data-section-theme="light" className={styles.section}>
      <Container>
        {/* ── Header ─────────────────────────────────────────── */}
        <motion.div
          className={styles.header}
          variants={stagger(0.12)}
          initial="hidden"
          whileInView="show"
          viewport={VIEWPORT}
        >
          <motion.p className={styles.eyebrow} variants={fadeUp}>
            Our
          </motion.p>
          <motion.h2 className={styles.heading} variants={fadeUp}>
            Popular Treatments
          </motion.h2>
        </motion.div>
      </Container>

      {/* ── Carousel (full viewport width, no Container) ───── */}
      <div
        className={styles.carouselOuter}
        onMouseEnter={() => { hoveredRef.current = true; }}
        onMouseLeave={() => { hoveredRef.current = false; }}
      >
        {/* Arrow buttons */}
        <button
          className={`${styles.arrowBtn} ${styles.arrowPrev}`}
          onClick={() => scrollBy(-CARD_STEP)}
          aria-label="Previous treatments"
        >
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
            <path d="M11 4L6 9L11 14" stroke="currentColor" strokeWidth="2"
              strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        <button
          className={`${styles.arrowBtn} ${styles.arrowNext}`}
          onClick={() => scrollBy(CARD_STEP)}
          aria-label="Next treatments"
        >
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
            <path d="M7 4L12 9L7 14" stroke="currentColor" strokeWidth="2"
              strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>

        {/* Edge fade masks */}
        <div className={styles.fadeLeft}  aria-hidden="true" />
        <div className={styles.fadeRight} aria-hidden="true" />

        {/* Scrolling track — items duplicated for seamless loop */}
        <div
          ref={trackRef}
          className={styles.track}
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
          aria-label="Popular treatments carousel"
        >
          {[...TREATMENTS, ...TREATMENTS].map((t, i) => (
            <div
              key={i}
              className={styles.card}
              aria-hidden={i >= TREATMENTS.length ? true : undefined}
            >
              {/* Background gradient fallback */}
              <div className={styles.cardBg} style={{ background: t.bg }} aria-hidden="true" />
              {/* Treatment image */}
              <div className={styles.cardImg} aria-hidden="true">
                <Image
                  src={t.image}
                  alt={t.title}
                  fill
                  className={styles.img}
                  sizes="300px"
                  draggable={false}
                />
              </div>
              {/* Dark overlay */}
              <div className={styles.overlay} aria-hidden="true" />
              {/* Text content */}
              <Link
                href={t.href}
                className={styles.cardContent}
                tabIndex={i >= TREATMENTS.length ? -1 : 0}
              >
                <p className={styles.cardCategory}>{t.category}</p>
                <h3 className={styles.cardTitle}>{t.title}</h3>
                <p className={styles.cardDesc}>{t.desc}</p>
                <div className={styles.exploreRow}>
                  <span className={styles.exploreLine} aria-hidden="true" />
                  <span className={styles.exploreLabel}>Explore</span>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>

      {/* ── Explore all treatments CTA ─────────────────────── */}
      <Container>
        <motion.div
          className={styles.exploreCta}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <Link href="/treatments" className={styles.exploreAllBtn}>
            Explore All Treatments
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
