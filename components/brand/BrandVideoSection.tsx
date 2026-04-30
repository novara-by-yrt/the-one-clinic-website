'use client';

import Script from 'next/script';
import { motion } from 'framer-motion';
import Section from '@/components/ui/Section';
import Container from '@/components/ui/Container';
import { fadeUp, stagger, VIEWPORT } from '@/lib/motion';
import styles from './BrandVideoSection.module.css';

const VIDEOS = [
  {
    id:    'hu75ttgmlm',
    label: 'Our Story',
    title: 'TOC - Intro Video (LP)',
  },
  {
    id:    't8y82cnp5e',
    label: 'Testimonials',
    title: 'TOC - Patient Stories',
  },
];

export default function BrandVideoSection() {
  return (
    <Section variant="dark" data-section-theme="dark" className={styles.section}>
      <Script src="https://fast.wistia.net/player.js" strategy="lazyOnload" />

      {/* Ambient glows */}
      <div className={styles.glowLeft}  aria-hidden="true" />
      <div className={styles.glowRight} aria-hidden="true" />

      <Container className={styles.inner}>

        {/* ── Header ── */}
        <motion.div
          className={styles.header}
          variants={stagger(0.1)}
          initial="hidden"
          whileInView="show"
          viewport={VIEWPORT}
        >
          <motion.p className={styles.eyebrow} variants={fadeUp}>
            See It For Yourself
          </motion.p>

          <motion.h2 className={styles.heading} variants={fadeUp}>
            Our Story &amp;<br />
            <em className={styles.headingAccent}>Real Patient</em> Results
          </motion.h2>

          <motion.div className={styles.rule} variants={fadeUp} aria-hidden="true" />

          <motion.p className={styles.subtext} variants={fadeUp}>
            Hear directly from our founder and the patients whose lives we&apos;ve helped transform.
          </motion.p>
        </motion.div>

        {/* ── Video grid ── */}
        <div className={styles.grid}>
          {VIDEOS.map((video, i) => (
            <motion.div
              key={video.id}
              className={styles.videoCard}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={VIEWPORT}
              transition={{ duration: 0.8, delay: i * 0.15, ease: [0.25, 0.1, 0.25, 1] }}
            >
              {/* Floating label chip */}
              <div className={styles.labelChip}>
                <span className={styles.labelDot} aria-hidden="true" />
                {video.label}
              </div>

              {/* 16:9 embed */}
              <div className={styles.videoWrapper}>
                <iframe
                  src={`https://fast.wistia.net/embed/iframe/${video.id}?web_component=true&seo=true`}
                  title={video.title}
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
            </motion.div>
          ))}
        </div>

      </Container>
    </Section>
  );
}
