'use client';

import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Section from '@/components/ui/Section';
import Container from '@/components/ui/Container';
import { fadeUp, stagger, VIEWPORT } from '@/lib/motion';
import styles from './MeetTheExperts.module.css';

const DOCTORS = [
  {
    name:        'Dr Sumit Virmani',
    credentials: 'MBBS, MRCGP',
    role:        'Co-Founder & GP',
    image:       '/images/imgi_20_team-thumb-VIRMANI.jpg',
    bio: [
      'Dr Sumit Virmani is co-founder of The One Clinic. He has extensive experience having worked as a medical doctor for over 15 years, with over 12 of these years working as a local GP.',
      'His particular skills are in performing minor surgery and the excision of skin lesions. He is especially proud when a person completes their treatment feeling elated by the transformation in their appearance — leading to a growing interest in aesthetics, particularly body contouring and hair rejuvenation.',
      'Dr Virmani aims to continue his GP service within his role at The One Clinic, ensuring patients have access to a wide range of health and well-being treatments.',
    ],
    tags: ['15+ Years Experience', 'Minor Surgery', 'Body Contouring', 'Hair Rejuvenation'],
  },
  {
    name:        'Dr Gunjan Bedi',
    credentials: 'MBBS, MRCpsych, MRCGP, BCAM',
    role:        'Advanced Aesthetics Practitioner',
    image:       '/images/imgi_21_team-thumb-BEDI.jpg',
    bio: [
      'Dr Gunjan Bedi is a highly skilled, advanced aesthetics practitioner at The One Clinic. She is a highly experienced doctor, having worked in the medical sector for over 20 years, with over 10 years as a GP.',
      'Dr Bedi has completed extensive training in dermatology and aesthetic medicine. Prior to her work in General Practice, she worked in psychiatry. She brings her passion for patient safety to every treatment, approaching procedures with meticulous precision.',
      'Her less-is-more attitude ensures patients receive a natural-looking outcome. She specialises in combining treatment modalities — such as injectables with radiofrequency — to achieve enhanced, lasting results.',
    ],
    tags: ['20+ Years Experience', 'Dermatology', 'Patient Safety', 'Aesthetic Medicine'],
  },
];

const SLIDE_VARIANTS = {
  enter:  (dir: number) => ({ x: dir > 0 ? 60 : -60, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit:   (dir: number) => ({ x: dir > 0 ? -60 : 60, opacity: 0 }),
};

const TRANSITION = { duration: 0.42, ease: [0.25, 0.1, 0.25, 1] as const };

export default function MeetTheExperts() {
  const [active, setActive]           = useState(0);
  const [direction, setDirection]     = useState(1);
  const [bioExpanded, setBioExpanded] = useState(false);
  const touchStartX                   = useRef(0);
  const touchStartY                   = useRef(0);

  function go(next: number) {
    const clamped = (next + DOCTORS.length) % DOCTORS.length;
    setDirection(next > active ? 1 : -1);
    setActive(clamped);
    setBioExpanded(false); // collapse bio when switching doctors
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

  const doc = DOCTORS[active];

  return (
    <Section variant="light" data-section-theme="light" className={styles.section}>
      <Container>

        {/* ── Section header ─────────────────────────────────── */}
        <motion.div
          className={styles.header}
          variants={stagger(0.15)}
          initial="hidden"
          whileInView="show"
          viewport={VIEWPORT}
        >
          <motion.p className={styles.eyebrow} variants={fadeUp}>Our Team</motion.p>
          <motion.h2 className={styles.heading} variants={fadeUp}>Meet the Experts</motion.h2>
          <motion.p className={styles.subtext} variants={fadeUp}>
            The One Clinic is led by experienced, qualified doctors committed to your safety and results.
          </motion.p>
        </motion.div>

        {/* ── Slideshow card ─────────────────────────────────── */}
        <div className={styles.slideshowOuter}>

          {/* Prev arrow */}
          <button
            className={`${styles.navBtn} ${styles.navPrev}`}
            onClick={() => go(active - 1)}
            aria-label="Previous doctor"
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <polyline points="13,4 7,10 13,16" stroke="currentColor" strokeWidth="2"
                strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>

          {/* Card */}
          <div
            className={styles.card}
            onTouchStart={onTouchStart}
            onTouchEnd={onTouchEnd}
          >
            <AnimatePresence custom={direction} mode="wait">
              <motion.div
                key={active}
                className={styles.cardInner}
                custom={direction}
                variants={SLIDE_VARIANTS}
                initial="enter"
                animate="center"
                exit="exit"
                transition={TRANSITION}
              >
                {/* ── Left: doctor photo ─────────────────── */}
                <div className={styles.imageCol}>
                  <div className={styles.imageWrap}>
                    <Image
                      src={doc.image}
                      alt={doc.name}
                      fill
                      className={styles.image}
                      sizes="(max-width: 768px) 100vw, 42vw"
                      priority={active === 0}
                    />
                    {/* Name overlay at bottom */}
                    <div className={styles.nameOverlay}>
                      <p className={styles.overlayName}>{doc.name}</p>
                      <p className={styles.overlayRole}>{doc.role}</p>
                    </div>
                  </div>
                </div>

                {/* ── Right: bio content ─────────────────── */}
                <div className={styles.contentCol}>
                  <div className={styles.contentTop}>
                    <p className={styles.credentials}>{doc.credentials}</p>
                    <h3 className={styles.doctorName}>{doc.name}</h3>
                    <p className={styles.doctorRole}>{doc.role}</p>
                  </div>

                  <div className={styles.bioText}>
                    {/* First paragraph always visible */}
                    <p className={styles.para}>{doc.bio[0]}</p>

                    {/* Remaining paragraphs — animated expand */}
                    <AnimatePresence initial={false}>
                      {bioExpanded && (
                        <motion.div
                          className={styles.bioExtra}
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
                        >
                          {doc.bio.slice(1).map((para, i) => (
                            <p key={i} className={styles.para}>{para}</p>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* See More / See Less toggle */}
                    {doc.bio.length > 1 && (
                      <button
                        className={styles.seeMoreBtn}
                        onClick={() => setBioExpanded((v) => !v)}
                        aria-expanded={bioExpanded}
                      >
                        {bioExpanded ? 'See Less ↑' : 'See More ↓'}
                      </button>
                    )}
                  </div>

                  {/* Tag pills */}
                  <div className={styles.tags}>
                    {doc.tags.map((tag) => (
                      <span key={tag} className={styles.tag}>{tag}</span>
                    ))}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Next arrow */}
          <button
            className={`${styles.navBtn} ${styles.navNext}`}
            onClick={() => go(active + 1)}
            aria-label="Next doctor"
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <polyline points="7,4 13,10 7,16" stroke="currentColor" strokeWidth="2"
                strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>

        {/* ── Pagination dots ─────────────────────────────────── */}
        <div className={styles.dots} role="tablist" aria-label="Doctor slideshow">
          {DOCTORS.map((_, i) => (
            <button
              key={i}
              className={`${styles.dot} ${i === active ? styles.dotActive : ''}`}
              onClick={() => go(i)}
              role="tab"
              aria-selected={i === active}
              aria-label={`Doctor ${i + 1} of ${DOCTORS.length}`}
            />
          ))}
        </div>

      </Container>
    </Section>
  );
}
