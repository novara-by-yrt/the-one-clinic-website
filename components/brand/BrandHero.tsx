'use client';

import { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import Image from 'next/image';
import Container from '@/components/ui/Container';
import styles from './BrandHero.module.css';

/* ─────────────────────────────────────────────────────────────
   CINEMATIC EASING , extra-slow exponential decel.
   Almost no starting velocity, glides into a full stop.
───────────────────────────────────────────────────────────── */
const EC   = [0.16, 1, 0.30, 1] as const;
const EC_R = [0.25, 0.1, 0.25, 1] as const;

/* ─── Secondary text , large left-side travel + soft blur ── */
function cineText(delay: number, prefersReduced: boolean | null) {
  if (prefersReduced) {
    return {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      transition: { duration: 0.5, ease: EC_R, delay: delay * 0.2 },
    };
  }
  return {
    initial: { opacity: 0, x: -180, filter: 'blur(4px)' },
    animate: { opacity: 1, x: 0,    filter: 'blur(0px)' },
    transition: {
      opacity: { duration: 1.40, ease: EC, delay },
      x:       { duration: 1.70, ease: EC, delay },
      filter:  { duration: 1.00, ease: EC, delay },
    },
  };
}

/* ─── Headline lines , much wider travel + stronger blur ─── */
function cineH1(delay: number, prefersReduced: boolean | null) {
  if (prefersReduced) {
    return {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      transition: { duration: 0.5, ease: EC_R, delay: delay * 0.2 },
    };
  }
  return {
    initial: { opacity: 0, x: -260, filter: 'blur(10px)' },
    animate: { opacity: 1, x: 0,    filter: 'blur(0px)' },
    transition: {
      opacity: { duration: 1.55, ease: EC, delay },
      x:       { duration: 1.95, ease: EC, delay },
      filter:  { duration: 1.20, ease: EC, delay },
    },
  };
}

/* ─── Trust badges , gentle rise + fade, no x-travel ─────── */
function cineBadge(delay: number, prefersReduced: boolean | null) {
  if (prefersReduced) {
    return {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      transition: { duration: 0.5, ease: EC_R, delay: delay * 0.2 },
    };
  }
  return {
    initial: { opacity: 0, y: 18, filter: 'blur(3px)' },
    animate: { opacity: 1, y: 0,  filter: 'blur(0px)' },
    transition: {
      opacity: { duration: 1.10, ease: EC, delay },
      y:       { duration: 1.20, ease: EC, delay },
      filter:  { duration: 0.85, ease: EC, delay },
    },
  };
}

/* ── Inline SVG icons ─────────────────────────────────────── */
function GoogleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true" className={styles.trustIcon}>
      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
    </svg>
  );
}

function TrustpilotIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true" className={styles.trustIcon}>
      <path fill="#00B67A" d="M12 2l2.582 7.952H22.9l-6.832 4.962 2.608 8.024L12 18.012l-6.676 4.926 2.608-8.024L1.1 9.952H9.418z"/>
    </svg>
  );
}

const BG_IMAGES = [
  '/images/Updated Hero Background 1.png',
  '/images/Updated Hero Background 2.png',
];

/* ── Component ────────────────────────────────────────────── */
export default function BrandHero() {
  const sectionRef     = useRef<HTMLElement>(null);
  const prefersReduced = useReducedMotion();
  const [bgIndex, setBgIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setBgIndex(prev => (prev + 1) % BG_IMAGES.length);
    }, 4000);
    return () => clearInterval(id);
  }, []);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });
  const contentY = useTransform(scrollYProgress, [0, 1], ['0%', '10%']);
  const opacity  = useTransform(scrollYProgress, [0, 0.65], [1, 0]);

  return (
    <section
      ref={sectionRef}
      className={styles.hero}
      aria-label="Hero"
      data-section-theme="dark"
    >
      {/* ── Background slideshow ─────────────────────────── */}
      <div className={styles.heroBg} aria-hidden="true">
        {BG_IMAGES.map((src, i) => (
          <div
            key={src}
            className={styles.heroBgSlide}
            style={{ opacity: bgIndex === i ? 1 : 0 }}
          >
            <Image
              src={src}
              alt=""
              fill
              priority={i === 0}
              className={styles.heroBgImg}
              sizes="100vw"
            />
          </div>
        ))}
      </div>

      {/* ── Cinematic overlay layers ─────────────────────── */}
      <div className={styles.overlayGradient}  aria-hidden="true" />
      <div className={styles.overlayVignette}  aria-hidden="true" />
      <div className={styles.overlaySpotlight} aria-hidden="true" />

      {/* ── Scroll-parallax content wrapper ──────────────── */}
      <motion.div
        className={styles.contentWrapper}
        style={{ y: contentY, opacity }}
      >
        <Container>
          <div className={styles.layout}>

            {/* Open content column , no glass panel */}
            <div className={styles.content}>

              {/* ── Eyebrow ── */}
              <motion.p
                className={styles.eyebrow}
                {...cineText(0.15, prefersReduced)}
              >
                Medical &amp; Aesthetic Care, Leicester
              </motion.p>

              {/* ── Headline , three lines, ultra-slow stagger ── */}
              <h1 className={styles.headline}>
                <motion.span
                  className={styles.headlineLine}
                  {...cineH1(0.30, prefersReduced)}
                >
                  Where
                </motion.span>
                <motion.span
                  className={styles.headlineLine}
                  {...cineH1(0.52, prefersReduced)}
                >
                  Expertise
                </motion.span>
                <motion.span
                  className={`${styles.headlineLine} ${styles.headlineLineAccent}`}
                  {...cineH1(0.74, prefersReduced)}
                >
                  <span className={styles.headlineAccent}>Meets Care</span>
                </motion.span>
              </h1>

              {/* ── Tagline , eye-catching ── */}
              <motion.p
                className={styles.tagline}
                {...cineText(0.90, prefersReduced)}
              >
                Empowering Happy Patients
              </motion.p>

              {/* ── Subtext ── */}
              <motion.p
                className={styles.subtext}
                {...cineText(1.00, prefersReduced)}
              >
                Advanced medical, aesthetic and wellness care,
                all under one roof.
              </motion.p>

              {/* ── CTA button ── */}
              <motion.div
                className={styles.ctaRow}
                {...cineText(1.20, prefersReduced)}
              >
                <button
                  className={styles.ctaBtn}
                  onClick={() => window.dispatchEvent(new CustomEvent('openBookConsultationModal'))}
                >
                  Book a Consultation
                  <svg
                    width="15" height="15" viewBox="0 0 15 15" fill="none"
                    aria-hidden="true" className={styles.ctaArrow}
                  >
                    <path
                      d="M2.5 7.5h10M8 3l4.5 4.5L8 12"
                      stroke="currentColor" strokeWidth="1.7"
                      strokeLinecap="round" strokeLinejoin="round"
                    />
                  </svg>
                </button>
              </motion.div>

              {/* ── Trust strip , 4 badges in a row ── */}
              <div className={styles.trustRow} role="region" aria-label="Trust indicators">

                {/* Google Reviews */}
                <motion.div
                  className={styles.trustBadge}
                  {...cineBadge(1.40, prefersReduced)}
                >
                  <div className={styles.trustBadgeHeader}>
                    <GoogleIcon />
                    <span className={styles.trustPlatform}>Google</span>
                  </div>
                  <div className={styles.trustStars}>
                    {Array.from({ length: 5 }).map((_, i) => (
                      <svg key={i} width="13" height="13" viewBox="0 0 24 24" aria-hidden="true">
                        <path fill="#FBBC04" d="M12 2l2.582 7.952H22.9l-6.832 4.962 2.608 8.024L12 18.012l-6.676 4.926 2.608-8.024L1.1 9.952H9.418z"/>
                      </svg>
                    ))}
                  </div>
                  <p className={styles.trustSummary}>
                    <strong className={styles.trustScore}>5.0</strong>
                    <span className={styles.trustDot} aria-hidden="true" />
                    <span className={styles.trustCount}>120+ reviews</span>
                  </p>
                </motion.div>

                {/* Trustpilot */}
                <motion.div
                  className={styles.trustBadge}
                  {...cineBadge(1.55, prefersReduced)}
                >
                  <div className={styles.trustBadgeHeader}>
                    <TrustpilotIcon />
                    <span className={styles.trustPlatform}>Trustpilot</span>
                  </div>
                  <div className={styles.trustStars}>
                    {Array.from({ length: 5 }).map((_, i) => (
                      <svg key={i} width="13" height="13" viewBox="0 0 24 24" aria-hidden="true">
                        <path fill="#00B67A" d="M12 2l2.582 7.952H22.9l-6.832 4.962 2.608 8.024L12 18.012l-6.676 4.926 2.608-8.024L1.1 9.952H9.418z"/>
                      </svg>
                    ))}
                  </div>
                  <p className={styles.trustSummary}>
                    <strong className={styles.trustScore}>4.7</strong>
                    <span className={styles.trustDot} aria-hidden="true" />
                    <span className={styles.trustCount}>140+ reviews</span>
                  </p>
                </motion.div>

                {/* Aesthetics Awards Highly Commended 2025 */}
                <motion.div
                  className={`${styles.trustBadge} ${styles.trustBadgeImage}`}
                  {...cineBadge(1.70, prefersReduced)}
                >
                  <div className={styles.trustImageWrap}>
                    <Image
                      src="/images/imgi_35_Untitled-3-5-e1749493207346.png"
                      alt="Aesthetics Awards Highly Commended 2025"
                      width={400}
                      height={280}
                      className={styles.trustImage}
                    />
                  </div>
                </motion.div>

                {/* AM Awards 2025 Finalist */}
                <motion.div
                  className={`${styles.trustBadge} ${styles.trustBadgeImage}`}
                  {...cineBadge(1.85, prefersReduced)}
                >
                  <div className={styles.trustImageWrap}>
                    <Image
                      src="/images/imgi_86_AM_Awards_2025-black_FINALIST-1024x704.png"
                      alt="Aesthetic Medicine Awards 2025 Finalist"
                      width={200}
                      height={138}
                      className={styles.trustImage}
                    />
                  </div>
                </motion.div>

              </div>

            </div>
          </div>
        </Container>
      </motion.div>

      {/* ── Scroll indicator ─────────────────────────────── */}
      <motion.div
        className={styles.scrollIndicator}
        aria-hidden="true"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.4, duration: 0.9 }}
      >
        <motion.span
          className={styles.scrollLine}
          animate={{ scaleY: [0.4, 1, 0.4] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        />
        <span className={styles.scrollLabel}>Scroll</span>
      </motion.div>
    </section>
  );
}
