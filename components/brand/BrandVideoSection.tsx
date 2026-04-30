'use client';

import Script from 'next/script';
import { motion } from 'framer-motion';
import Section from '@/components/ui/Section';
import Container from '@/components/ui/Container';
import { fadeUp, stagger, VIEWPORT } from '@/lib/motion';
import styles from './BrandVideoSection.module.css';

const EASE = [0.25, 0.1, 0.25, 1] as const;

export default function BrandVideoSection() {
  return (
    <Section variant="dark" data-section-theme="dark" className={styles.section}>
      <Script src="https://fast.wistia.net/player.js" strategy="lazyOnload" />

      {/* Ambient background glows */}
      <div className={styles.glowLeft}  aria-hidden="true" />
      <div className={styles.glowRight} aria-hidden="true" />

      <Container className={styles.inner}>

        {/* ══ Header ══════════════════════════════════════ */}
        <motion.div
          className={styles.header}
          variants={stagger(0.14)}
          initial="hidden"
          whileInView="show"
          viewport={VIEWPORT}
        >
          <motion.p className={styles.eyebrow} variants={fadeUp}>
            See It For Yourself
          </motion.p>

          <motion.h2 className={styles.heading} variants={fadeUp}>
            Our Story
          </motion.h2>

          <motion.div className={styles.rule} variants={fadeUp} aria-hidden="true" />

          <motion.p className={styles.subtext} variants={fadeUp}>
            Meet our founder and discover how The One Clinic combines medical expertise
            with genuine, personalised care.
          </motion.p>
        </motion.div>

        {/* ══ Single centred video ════════════════════════ */}
        <motion.div
          className={styles.videoCard}
          initial={{ opacity: 0, y: 56 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VIEWPORT}
          transition={{ duration: 0.85, ease: EASE }}
        >
          {/* ── Floating label chip ──────────────────────── */}
          <div className={styles.labelChip}>
            <span className={styles.labelDot} aria-hidden="true" />
            Our Story
          </div>

          {/* ── 16:9 video embed ─────────────────────────── */}
          <div className={styles.videoWrapper}>
            <iframe
              src="https://fast.wistia.net/embed/iframe/hu75ttgmlm?web_component=true&seo=true"
              title="TOC - Intro Video (LP)"
              allow="autoplay; fullscreen"
              allowTransparency
              frameBorder="0"
              scrolling="no"
              className={styles.embed}
              name="wistia_embed"
            />
            <div className={styles.videoGrad} aria-hidden="true" />
          </div>

          {/* ── Hover radial glow ──────────────────────────── */}
          <div className={styles.cardGlow} aria-hidden="true" />
        </motion.div>

      </Container>
    </Section>
  );
}
