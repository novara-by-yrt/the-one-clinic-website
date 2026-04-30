'use client';

import Script from 'next/script';
import { motion } from 'framer-motion';
import Section from '@/components/ui/Section';
import Container from '@/components/ui/Container';
import { fadeUp, stagger, VIEWPORT } from '@/lib/motion';
import styles from './BrandVideoSection.module.css';

const EASE = [0.25, 0.1, 0.25, 1] as const;

const VIDEOS = [
  {
    id:         'hu75ttgmlm',
    label:      'Our Story',
    title:      'About The One Clinic',
    desc:       'Meet the team and discover how we combine medical expertise with personalised care.',
    embedTitle: 'TOC - Intro Video (LP)',
  },
  {
    id:         't8y82cnp5e',
    label:      'Testimonials',
    title:      'Patient Stories',
    desc:       'Hear directly from patients whose health and confidence were transformed by our care.',
    embedTitle: 'Testimonials Compilation - TOC Video',
  },
];

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
            Our Story &amp;<br />
            <em className={styles.headingEm}>Real Patient</em>
            {' '}Results
          </motion.h2>

          <motion.div className={styles.rule} variants={fadeUp} aria-hidden="true" />

          <motion.p className={styles.subtext} variants={fadeUp}>
            Hear directly from our founder and the patients whose lives we've helped transform.
          </motion.p>
        </motion.div>

        {/* ══ Video grid ══════════════════════════════════ */}
        <div className={styles.grid}>
          {VIDEOS.map((video, i) => (
            <motion.div
              key={video.id}
              className={styles.videoCard}
              initial={{ opacity: 0, y: 56 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={VIEWPORT}
              transition={{ duration: 0.85, ease: EASE, delay: i * 0.2 }}
            >
              {/* ── Floating label chip ──────────────────── */}
              <div className={styles.labelChip}>
                <span className={styles.labelDot} aria-hidden="true" />
                {video.label}
              </div>

              {/* ── 16:9 video embed ─────────────────────── */}
              <div className={styles.videoWrapper}>
                <iframe
                  src={`https://fast.wistia.net/embed/iframe/${video.id}?web_component=true&seo=true`}
                  title={video.embedTitle}
                  allow="autoplay; fullscreen"
                  allowTransparency
                  frameBorder="0"
                  scrolling="no"
                  className={styles.embed}
                  name="wistia_embed"
                />
                <div className={styles.videoGrad} aria-hidden="true" />
              </div>

              {/* ── Hover radial glow ────────────────────── */}
              <div className={styles.cardGlow} aria-hidden="true" />
            </motion.div>
          ))}
        </div>

      </Container>
    </Section>
  );
}
