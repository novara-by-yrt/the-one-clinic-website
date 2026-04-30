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

      {/* Ambient glows */}
      <div className={styles.glowLeft}  aria-hidden="true" />
      <div className={styles.glowRight} aria-hidden="true" />

      <Container className={styles.inner}>
        <div className={styles.splitLayout}>

          {/* ══ LEFT — Video ══════════════════════════════ */}
          <motion.div
            className={styles.videoCol}
            initial={{ opacity: 0, x: -52 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={VIEWPORT}
            transition={{ duration: 0.9, ease: EASE }}
          >
            <div className={styles.videoCard}>
              {/* Floating label chip */}
              <div className={styles.labelChip}>
                <span className={styles.labelDot} aria-hidden="true" />
                Our Story
              </div>

              {/* 16:9 embed */}
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
              </div>

              {/* Hover glow */}
              <div className={styles.cardGlow} aria-hidden="true" />
            </div>
          </motion.div>

          {/* ══ RIGHT — Text ══════════════════════════════ */}
          <motion.div
            className={styles.textCol}
            variants={stagger(0.13)}
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
              with genuine, personalised care for every patient.
            </motion.p>

            {/* Attribute chips */}
            <motion.div className={styles.chips} variants={fadeUp}>
              <span className={styles.chip}>
                <span className={styles.chipDot} aria-hidden="true" />
                Doctor-Led Care
              </span>
              <span className={styles.chip}>
                <span className={styles.chipDot} aria-hidden="true" />
                Patient First
              </span>
            </motion.div>
          </motion.div>

        </div>
      </Container>
    </Section>
  );
}
