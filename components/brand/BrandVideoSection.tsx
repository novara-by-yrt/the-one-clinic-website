'use client';

import { m } from 'framer-motion';
import Section from '@/components/ui/Section';
import Container from '@/components/ui/Container';
import WistiaFacade from '@/components/ui/WistiaFacade';
import { fadeUp, stagger, VIEWPORT } from '@/lib/motion';
import styles from './BrandVideoSection.module.css';

const VIDEOS = [
  { id: 'hu75ttgmlm', title: 'TOC - Intro Video (LP)' },
  { id: 't8y82cnp5e', title: 'TOC - Patient Stories' },
];

export default function BrandVideoSection() {
  return (
    <Section variant="dark" data-section-theme="dark" className={styles.section}>

      {/* Ambient glows */}
      <div className={styles.glowLeft}  aria-hidden="true" />
      <div className={styles.glowRight} aria-hidden="true" />

      <Container className={styles.inner}>

        {/* ── Header ── */}
        <m.div
          className={styles.header}
          variants={stagger(0.1)}
          initial="hidden"
          whileInView="show"
          viewport={VIEWPORT}
        >
          <m.div variants={fadeUp}>
            <span className={styles.chip}>
              <span className={styles.chipDot} aria-hidden="true" />
              See It For Yourself
            </span>
          </m.div>

          <m.h2 className={styles.heading} variants={fadeUp}>
            Our Story &amp;<br />
            <em className={styles.headingAccent}>Real Patient</em> Results
          </m.h2>

          <m.div className={styles.rule} variants={fadeUp} aria-hidden="true" />

          <m.p className={styles.subtext} variants={fadeUp}>
            Hear directly from our founder and the patients whose lives we&apos;ve helped transform.
          </m.p>
        </m.div>

        {/* ── Video grid ── */}
        <div className={styles.grid}>
          {VIDEOS.map((video, i) => (
            <m.div
              key={video.id}
              className={styles.videoCard}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={VIEWPORT}
              transition={{ duration: 0.8, delay: i * 0.15, ease: [0.25, 0.1, 0.25, 1] }}
            >
              {/* 16:9 embed — click-to-play facade keeps the Wistia player
                  off the initial load */}
              <div className={styles.videoWrapper}>
                <WistiaFacade
                  videoId={video.id}
                  title={video.title}
                  iframeClassName={styles.embed}
                />
              </div>

              {/* Hover glow */}
              <div className={styles.cardGlow} aria-hidden="true" />
            </m.div>
          ))}
        </div>

      </Container>
    </Section>
  );
}
