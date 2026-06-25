'use client';

import { useRef, useState, useEffect } from 'react';
import { m, useScroll, useTransform } from 'framer-motion';
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
export default function Hero({ showVideo = true }: { showVideo?: boolean }) {
  const sectionRef = useRef<HTMLElement>(null);

  // Facade: the static black background image is shown instantly as the
  // hero poster, and the ambient Wistia loop is mounted only once the
  // browser is idle after first paint — keeping the heavy embed off the
  // critical path so it never delays LCP. No visible change: the video
  // still auto-plays in the background a moment later.
  const [mountVideo, setMountVideo] = useState(false);
  useEffect(() => {
    if (!showVideo) return;
    let idleId = 0;
    let timeoutId: ReturnType<typeof setTimeout> | undefined;
    const mount = () => setMountVideo(true);
    const ric = (window as typeof window & {
      requestIdleCallback?: (cb: () => void, opts?: { timeout: number }) => number;
      cancelIdleCallback?: (id: number) => void;
    });
    if (typeof ric.requestIdleCallback === 'function') {
      idleId = ric.requestIdleCallback(mount, { timeout: 3000 });
    } else {
      timeoutId = setTimeout(mount, 1500);
    }
    return () => {
      if (idleId && typeof ric.cancelIdleCallback === 'function') ric.cancelIdleCallback(idleId);
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [showVideo]);

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

      {/* ── Wistia background video (deferred until browser idle) ── */}
      {showVideo && mountVideo && (
        <>
          <div className={styles.videoBg} aria-hidden="true">
            <div className={styles.videoSizer}>
              <iframe
                src="https://fast.wistia.net/embed/iframe/2ny75uwy3d?web_component=true&seo=false&autoPlay=true&silentAutoPlay=true&muted=true&loop=true&endVideoBehavior=loop&controlsVisibleOnLoad=false&playbar=false&fullscreenButton=false&volumeControl=false&settingsControl=false&playButton=false&playsinline=true"
                title=""
                allow="autoplay; fullscreen"
                allowFullScreen
                frameBorder="0"
                scrolling="no"
                loading="lazy"
                className={styles.videoIframe}
              />
            </div>
          </div>
          <Script src="https://fast.wistia.net/player.js" strategy="lazyOnload" />
        </>
      )}
      {/* ── Dark overlay so text stays readable ─────────────── */}
      <div className={styles.videoOverlay} aria-hidden="true" />

      {/* ── Subtle grid background texture ─────────────────── */}
      <div className={styles.gridOverlay} aria-hidden="true" />

      {/* ── Animated content wrapper ────────────────────────── */}
      <m.div className={styles.contentWrapper} style={{ y: contentY, opacity }}>
        <Container>
          <m.div
            className={styles.content}
            variants={CONTAINER_VARIANTS}
            initial="hidden"
            animate="show"
          >
            {/* Eyebrow label */}
            <m.p
              className={styles.eyebrow}
              variants={FADE_UP}
              transition={TRANSITION_SMOOTH}
            >
              Medical &amp; Aesthetic Care, Leicester
            </m.p>

            {/* H1 Headline */}
            <m.h1
              className={styles.headline}
              variants={FADE_UP}
              transition={TRANSITION_SMOOTH}
            >
              Where Expertise
              <br />
              <span className={styles.headlineAccent}>Meets Care</span>
            </m.h1>

            {/* Subtext */}
            <m.p
              className={styles.subtext}
              variants={FADE_UP}
              transition={TRANSITION_SMOOTH}
            >
              Advanced medical, aesthetic and wellness care, 
              all under one roof.
            </m.p>

            {/* CTAs */}
            <m.div
              className={styles.ctas}
              variants={FADE_UP}
              transition={TRANSITION_SMOOTH}
            >
              <Button variant="primary" theme="dark" onClick={() => window.dispatchEvent(new CustomEvent('openBookConsultationModal'))}>
                Book a Consultation
              </Button>
            </m.div>

            {/* Trust badges */}
            <m.div
              variants={FADE_UP}
              transition={{ ...TRANSITION_SMOOTH, delay: 0.1 }}
            >
              <TrustBadges theme="dark" />
            </m.div>
          </m.div>
        </Container>
      </m.div>

      {/* ── Scroll indicator ─────────────────────────────────── */}
      <m.div
        className={styles.scrollIndicator}
        aria-hidden="true"
        variants={FADE_IN}
        initial="hidden"
        animate="show"
        transition={{ delay: 1.4, duration: 0.8 }}
      >
        <m.span
          className={styles.scrollLine}
          animate={{ scaleY: [0.4, 1, 0.4] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
        />
        <span className={styles.scrollLabel}>Scroll</span>
      </m.div>
    </section>
  );
}
