'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import Script from 'next/script';
import Container from '@/components/ui/Container';
import Button from '@/components/ui/Button';
import TrustBadges from '@/components/ui/TrustBadges';
import styles from './Hero.module.css';

// ── Animation variants ──────────────────────────────────────────
const FADE_UP = {
  hidden: { opacity: 0, y: 24 },
  show:   { opacity: 1, y: 0 },
};

const FADE_IN = {
  hidden: { opacity: 0 },
  show:   { opacity: 1 },
};

const CONTAINER_VARIANTS = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.18,
      delayChildren:   0.15,
    },
  },
};

const TRANSITION_SMOOTH = { duration: 0.7, ease: [0.25, 0.1, 0.25, 1] as const };

// ── Component ───────────────────────────────────────────────────
export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);

  // Subtle parallax on scroll: content drifts up slightly as user scrolls
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });
  const contentY = useTransform(scrollYProgress, [0, 1], ['0%', '12%']);
  const opacity   = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section
      ref={sectionRef}
      className={styles.hero}
      aria-label="Hero"
      data-section-theme="dark"
    >
      {/* ── Black background image (visible on all devices; video plays on top) */}
      <div className={styles.heroBg} aria-hidden="true">
        <Image
          src="/images/Black background image.jpg"
          alt=""
          fill
          priority
          className={styles.heroBgImg}
          sizes="100vw"
        />
      </div>

      {/* ── Wistia background video ─────────────────────────── */}
      <div className={styles.videoBg} aria-hidden="true">
        <div className={styles.videoSizer}>
          <iframe
            src="https://fast.wistia.net/embed/iframe/2ny75uwy3d?web_component=true&seo=false&autoPlay=true&silentAutoPlay=true&muted=true&loop=true&endVideoBehavior=loop&controlsVisibleOnLoad=false&playbar=false&fullscreenButton=false&volumeControl=false&settingsControl=false&playButton=false&playsinline=true"
            title=""
            allow="autoplay; fullscreen"
            allowFullScreen
            frameBorder="0"
            scrolling="no"
            className={styles.videoIframe}
          />
        </div>
      </div>
      {/* ── Dark overlay so text stays readable ─────────────── */}
      <div className={styles.videoOverlay} aria-hidden="true" />

      {/* ── Subtle grid background texture ─────────────────── */}
      <div className={styles.gridOverlay} aria-hidden="true" />

      <Script src="https://fast.wistia.net/player.js" strategy="lazyOnload" />

      {/* ── Animated content wrapper ────────────────────────── */}
      <motion.div className={styles.contentWrapper} style={{ y: contentY, opacity }}>
        <Container>
          <motion.div
            className={styles.content}
            variants={CONTAINER_VARIANTS}
            initial="hidden"
            animate="show"
          >
            {/* Eyebrow label */}
            <motion.p
              className={styles.eyebrow}
              variants={FADE_UP}
              transition={TRANSITION_SMOOTH}
            >
              Medical &amp; Aesthetic Care, Leicester
            </motion.p>

            {/* H1 Headline */}
            <motion.h1
              className={styles.headline}
              variants={FADE_UP}
              transition={TRANSITION_SMOOTH}
            >
              Where Expertise
              <br />
              <em className={styles.headlineAccent}>Meets Care</em>
            </motion.h1>

            {/* Subtext */}
            <motion.p
              className={styles.subtext}
              variants={FADE_UP}
              transition={TRANSITION_SMOOTH}
            >
              A modern medical and aesthetics clinic offering advanced
              treatments, weight management, and holistic healthcare
              under one roof.
            </motion.p>

            {/* Credential badges */}
            <motion.div
              className={styles.credBadges}
              variants={FADE_UP}
              transition={TRANSITION_SMOOTH}
            >
              <span className={styles.credBadge}>
                <svg className={styles.credCheck} viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <circle cx="8" cy="8" r="7.25" stroke="currentColor" strokeWidth="1.25" strokeOpacity="0.5"/>
                  <path d="M5 8.25l2 2 4-4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Led by highly trained doctors
              </span>
              <span className={styles.credBadge}>
                <svg className={styles.credCheck} viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <circle cx="8" cy="8" r="7.25" stroke="currentColor" strokeWidth="1.25" strokeOpacity="0.5"/>
                  <path d="M5 8.25l2 2 4-4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Comprehensive medical &amp; aesthetic care
              </span>
            </motion.div>

            {/* CTAs */}
            <motion.div
              className={styles.ctas}
              variants={FADE_UP}
              transition={TRANSITION_SMOOTH}
            >
              <Button variant="primary" theme="dark" onClick={() => window.dispatchEvent(new CustomEvent('openCallbackModal'))}>
                Book a Consultation
              </Button>

              <Link href="#treatments" className={styles.secondaryCta}>
                Explore Treatments
                <span className={styles.arrow} aria-hidden="true">→</span>
              </Link>
            </motion.div>

            {/* Trust badges */}
            <motion.div
              variants={FADE_UP}
              transition={{ ...TRANSITION_SMOOTH, delay: 0.1 }}
            >
              <TrustBadges theme="dark" />
            </motion.div>
          </motion.div>
        </Container>
      </motion.div>

      {/* ── Scroll indicator ─────────────────────────────────── */}
      <motion.div
        className={styles.scrollIndicator}
        aria-hidden="true"
        variants={FADE_IN}
        initial="hidden"
        animate="show"
        transition={{ delay: 1.4, duration: 0.8 }}
      >
        <motion.span
          className={styles.scrollLine}
          animate={{ scaleY: [0.4, 1, 0.4] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
        />
        <span className={styles.scrollLabel}>Scroll</span>
      </motion.div>
    </section>
  );
}
