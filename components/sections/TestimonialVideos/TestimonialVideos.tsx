'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Script from 'next/script';
import Section from '@/components/ui/Section';
import Container from '@/components/ui/Container';
import { fadeUp, stagger, VIEWPORT } from '@/lib/motion';
import styles from './TestimonialVideos.module.css';

const VIDEOS = [
  { id: 'idcb1vywka', label: 'Treatment Experience' },
  { id: 'onscmatqmy', label: 'Patient Story' },
];

export default function TestimonialVideos() {
  const [playing, setPlaying] = useState<Set<string>>(new Set());

  function play(id: string) {
    setPlaying((prev) => new Set([...prev, id]));
  }

  return (
    <Section variant="light" data-section-theme="light" className={styles.section}>
      <Script src="https://fast.wistia.net/player.js" strategy="lazyOnload" />

      <Container>
        <motion.div
          className={styles.header}
          variants={stagger(0.15)}
          initial="hidden"
          whileInView="show"
          viewport={VIEWPORT}
        >
          <motion.p className={styles.eyebrow} variants={fadeUp}>Patient Stories</motion.p>
          <motion.h2 className={styles.heading} variants={fadeUp}>Hear From Our Patients</motion.h2>
          <motion.p className={styles.subtext} variants={fadeUp}>
            Real people, real results, in their own words.
          </motion.p>
        </motion.div>

        <motion.div
          className={styles.grid}
          variants={stagger(0.12)}
          initial="hidden"
          whileInView="show"
          viewport={VIEWPORT}
        >
          {VIDEOS.map((v) => (
            <motion.div key={v.id} className={styles.card} variants={fadeUp}>
              <div className={styles.videoWrap}>
                <iframe
                  src={`https://fast.wistia.net/embed/iframe/${v.id}?web_component=true&seo=true${playing.has(v.id) ? '&autoPlay=true' : ''}`}
                  title={v.label}
                  allow="autoplay; fullscreen"
                  allowFullScreen
                  frameBorder="0"
                  scrolling="no"
                  className={styles.iframe}
                />

                {/* Play overlay — shown until user clicks to play */}
                {!playing.has(v.id) && (
                  <div
                    className={styles.overlay}
                    onClick={() => play(v.id)}
                    role="button"
                    tabIndex={0}
                    aria-label={`Play video`}
                    onKeyDown={(e) => e.key === 'Enter' && play(v.id)}
                  >
                    <div className={styles.playBtn} aria-hidden="true">
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                        <path d="M6 4.5L15.5 10 6 15.5V4.5Z" fill="currentColor"/>
                      </svg>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </Section>
  );
}
