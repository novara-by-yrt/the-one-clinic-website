'use client';

import { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import { m, useScroll, useTransform, useSpring, useReducedMotion } from 'framer-motion';
import { CLINIC_INFO } from '@/lib/clinic-info';
import styles from './V1Hero.module.css';

const BG_IMAGES = [
  '/images/Updated Hero Background 1.png',
  '/images/Updated Hero Background 2.png',
];

const EASE = [0.22, 1, 0.36, 1] as const;

/** Headline lines rise and rotate out of the page plane. */
const LINE = {
  hidden: { opacity: 0, y: '55%', rotateX: -58 },
  show: { opacity: 1, y: '0%', rotateX: 0 },
};

const FADE = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0 },
};

/** Rating stars: the brand is monochrome, so they read by shape, not hue. */
function Stars() {
  return (
    <span className={styles.stars}>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} width="13" height="13" viewBox="0 0 24 24" aria-hidden="true">
          <path
            fill="currentColor"
            d="M12 2l2.582 7.952H22.9l-6.832 4.962 2.608 8.024L12 18.012l-6.676 4.926 2.608-8.024L1.1 9.952H9.418z"
          />
        </svg>
      ))}
    </span>
  );
}

export default function V1Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const [bgIndex, setBgIndex] = useState(0);
  const [mounted, setMounted] = useState(false);
  const reduced = useReducedMotion();

  useEffect(() => {
    setMounted(true);
    const id = setInterval(() => setBgIndex((p) => (p + 1) % BG_IMAGES.length), 5200);
    return () => clearInterval(id);
  }, []);

  // Scroll parallax: the plate recedes while the copy drifts up, which
  // separates the two depth planes as the section leaves.
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });
  const soft = useSpring(scrollYProgress, { stiffness: 90, damping: 26, mass: 0.4 });
  const plateZ = useTransform(soft, [0, 1], [0, -180]);
  const plateY = useTransform(soft, [0, 1], ['0%', '12%']);
  const copyY = useTransform(soft, [0, 1], ['0%', '-16%']);
  const copyOpacity = useTransform(soft, [0, 0.72], [1, 0]);

  const openModal = () =>
    window.dispatchEvent(new CustomEvent('openBookConsultationModal'));

  return (
    <section
      ref={sectionRef}
      className={`${styles.hero} v1-surface-black`}
      aria-label="The One Clinic — medical and aesthetic care in Leicester"
      data-section-theme="dark"
    >
      {/* ── Receding background plate ── */}
      <m.div
        className={styles.bgStage}
        style={reduced ? undefined : { translateZ: plateZ, y: plateY }}
        aria-hidden="true"
      >
        {BG_IMAGES.map((src, i) =>
          i === 0 || mounted ? (
            <div
              key={src}
              className={`${styles.bgSlide} ${bgIndex === i ? styles.bgSlideOn : ''}`}
            >
              <Image
                src={src}
                alt=""
                fill
                preload={i === 0}
                fetchPriority={i === 0 ? 'high' : undefined}
                quality={72}
                sizes="100vw"
                className={styles.bgImg}
              />
            </div>
          ) : null,
        )}
      </m.div>

      <div className={styles.grade} aria-hidden="true" />
      <div className={styles.spot} aria-hidden="true" />
      <div className={styles.grain} aria-hidden="true" />

      {/* ── Copy plane ── */}
      <m.div
        className={styles.inner}
        style={reduced ? undefined : { y: copyY, opacity: copyOpacity }}
      >
        <m.div
          className={styles.content}
          initial="hidden"
          animate="show"
          transition={{ staggerChildren: 0.11, delayChildren: 0.12 }}
        >
          <m.p
            className={styles.eyebrow}
            variants={FADE}
            transition={{ duration: 0.7, ease: EASE }}
          >
            <span className={styles.eyebrowDot} aria-hidden="true" />
            Medical &amp; Aesthetic Care, Leicester
          </m.p>

          <h1 className={styles.headline}>
            {['Where', 'Expertise'].map((word) => (
              <m.span
                key={word}
                className={styles.line}
                variants={LINE}
                transition={{ duration: 1.05, ease: EASE }}
              >
                {word}
              </m.span>
            ))}
            <m.span
              className={`${styles.line} ${styles.lineAccent}`}
              variants={LINE}
              transition={{ duration: 1.05, ease: EASE }}
            >
              Meets Care
            </m.span>
          </h1>

          <m.p
            className={styles.tagline}
            variants={FADE}
            transition={{ duration: 0.75, ease: EASE }}
          >
            Empowering Happy Patients
          </m.p>

          <m.p
            className={styles.sub}
            variants={FADE}
            transition={{ duration: 0.75, ease: EASE }}
          >
            Advanced medical, aesthetic and wellness care, all under one roof.
          </m.p>

          <m.div
            className={styles.ctaRow}
            variants={FADE}
            transition={{ duration: 0.75, ease: EASE }}
          >
            <button type="button" className={styles.cta} onClick={openModal}>
              <span>Book a Consultation</span>
              <svg
                className={styles.ctaArrow}
                width="15" height="15" viewBox="0 0 15 15" fill="none" aria-hidden="true"
              >
                <path
                  d="M2.5 7.5h10M8 3l4.5 4.5L8 12"
                  stroke="currentColor" strokeWidth="1.8"
                  strokeLinecap="round" strokeLinejoin="round"
                />
              </svg>
            </button>
            <a href={`tel:${CLINIC_INFO.phone.tel}`} className={styles.ctaGhost}>
              {CLINIC_INFO.phone.display}
            </a>
          </m.div>

          <m.div
            className={styles.trustRow}
            variants={FADE}
            transition={{ duration: 0.8, ease: EASE }}
            role="group"
            aria-label="Review ratings"
          >
            <div className={styles.trustCard}>
              <div className={styles.trustHead}>
                <svg width="17" height="17" viewBox="0 0 24 24" aria-hidden="true">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                <span className={styles.trustName}>Google</span>
              </div>
              <Stars />
              <p className={styles.trustMeta}>
                <strong className={styles.score}>5.0</strong>
                <span className={styles.metaDot} aria-hidden="true" />
                120+ reviews
              </p>
            </div>

            <div className={styles.trustCard}>
              <div className={styles.trustHead}>
                <svg width="17" height="17" viewBox="0 0 24 24" aria-hidden="true">
                  <path fill="#00B67A" d="M12 2l2.582 7.952H22.9l-6.832 4.962 2.608 8.024L12 18.012l-6.676 4.926 2.608-8.024L1.1 9.952H9.418z"/>
                </svg>
                <span className={styles.trustName}>Trustpilot</span>
              </div>
              <Stars />
              <p className={styles.trustMeta}>
                <strong className={styles.score}>4.7</strong>
                <span className={styles.metaDot} aria-hidden="true" />
                140+ reviews
              </p>
            </div>
          </m.div>
        </m.div>
      </m.div>

      <div className={styles.scrollCue} aria-hidden="true">
        <span className={styles.scrollTrack}>
          <span className={styles.scrollBead} />
        </span>
        <span className={styles.scrollLabel}>Scroll</span>
      </div>
    </section>
  );
}
