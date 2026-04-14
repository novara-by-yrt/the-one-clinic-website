'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import Section from '@/components/ui/Section';
import Container from '@/components/ui/Container';
import { fadeUp, stagger, VIEWPORT } from '@/lib/motion';
import styles from './FacilityStats.module.css';

const SLIDES = [
  { src: '/images/location1.jpg', alt: 'The One Clinic, Leicester' },
  { src: '/images/location2.jpg', alt: 'The One Clinic, interior' },
  { src: '/images/location3.jpg', alt: 'The One Clinic, treatment room' },
];

const STATS = [
  { value: '5', label: 'Consulting Rooms' },
  { value: '2', label: 'Treatment Rooms' },
  { value: '3', label: 'Floors' },
  { value: '15', label: 'Parking Spaces' },
];

const ACCESS = [
  {
    label: 'Disabled Access',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="12" cy="4" r="2" />
        <path d="M10 10h4l2 6H8l2-6z" />
        <path d="M8 22l2-6M16 22l-2-6" />
      </svg>
    ),
  },
  {
    label: 'Accessible Toilets',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <path d="M9 9h6M9 12h6M9 15h4" />
      </svg>
    ),
  },
  {
    label: 'Shower Room',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M4 12h16M4 12a8 8 0 0 1 16 0" />
        <line x1="8" y1="16" x2="8" y2="20" />
        <line x1="12" y1="16" x2="12" y2="20" />
        <line x1="16" y1="16" x2="16" y2="20" />
      </svg>
    ),
  },
];

const INTERVAL = 4000;

export default function FacilityStats() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActive((i) => (i + 1) % SLIDES.length);
    }, INTERVAL);
    return () => clearInterval(timer);
  }, []);

  return (
    <Section variant="light" data-section-theme="light">
      <Container>
        <div className={styles.layout}>

          {/* ── Left: image slideshow ── */}
          <motion.div
            className={styles.imageCol}
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
          >
            <div className={styles.imageWrap}>
              <AnimatePresence mode="sync">
                <motion.div
                  key={active}
                  className={styles.slide}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.9, ease: 'easeInOut' }}
                >
                  <Image
                    src={SLIDES[active].src}
                    alt={SLIDES[active].alt}
                    fill
                    className={styles.image}
                    sizes="(max-width: 900px) 100vw, 50vw"
                  />
                </motion.div>
              </AnimatePresence>

              {/* Dots */}
              <div className={styles.dots} role="tablist" aria-label="Clinic image slideshow">
                {SLIDES.map((_, i) => (
                  <button
                    key={i}
                    className={`${styles.dot} ${i === active ? styles.dotActive : ''}`}
                    onClick={() => setActive(i)}
                    role="tab"
                    aria-selected={i === active}
                    aria-label={`Show image ${i + 1} of ${SLIDES.length}`}
                  />
                ))}
              </div>
            </div>
          </motion.div>

          {/* ── Right: stats + accessibility ── */}
          <motion.div
            className={styles.textCol}
            variants={stagger(0.08)}
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
          >
            <motion.div className={styles.header} variants={fadeUp}>
              <p className={styles.eyebrow}>By The Numbers</p>
              <h2 className={styles.heading}>Built to Meet Every Need</h2>
              <p className={styles.subtext}>
                The main part of the clinic contains 5 consulting rooms and 2 treatment rooms, over 3 floors.
              </p>
            </motion.div>

            {/* Stats grid */}
            <motion.div className={styles.statsGrid} variants={stagger(0.07)}>
              {STATS.map((s) => (
                <motion.div key={s.label} className={styles.stat} variants={fadeUp}>
                  <span className={styles.statValue}>{s.value}</span>
                  <span className={styles.statLabel}>{s.label}</span>
                </motion.div>
              ))}
            </motion.div>

            {/* Accessibility */}
            <motion.div className={styles.accessBar} variants={fadeUp}>
              <p className={styles.accessTitle}>Fully Inclusive</p>
              <ul className={styles.accessList} role="list">
                {ACCESS.map((a) => (
                  <li key={a.label} className={styles.accessItem}>
                    <span className={styles.accessIcon}>{a.icon}</span>
                    <span className={styles.accessLabel}>{a.label}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </motion.div>

        </div>
      </Container>
    </Section>
  );
}
