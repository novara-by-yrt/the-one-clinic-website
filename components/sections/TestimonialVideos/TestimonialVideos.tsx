'use client';

import { motion } from 'framer-motion';
import Script from 'next/script';
import Section from '@/components/ui/Section';
import Container from '@/components/ui/Container';
import { fadeUp, stagger, VIEWPORT } from '@/lib/motion';
import styles from './TestimonialVideos.module.css';

const VIDEOS = [
  {
    id:    'idcb1vywka',
    title: 'Customer Testimonial',
  },
  {
    id:    'onscmatqmy',
    title: 'Customer Testimonial — Oxana',
  },
  {
    id:    'fm142sxmlw',
    title: 'Customer Testimonial — Mahanoor',
  },
];

export default function TestimonialVideos() {
  return (
    <Section variant="dark" data-section-theme="dark" className={styles.section}>
      <Script src="https://fast.wistia.net/player.js" strategy="lazyOnload" />

      <Container>
        {/* ── Header ─────────────────────────────────────────── */}
        <motion.div
          className={styles.header}
          variants={stagger(0.15)}
          initial="hidden"
          whileInView="show"
          viewport={VIEWPORT}
        >
          <motion.p className={styles.eyebrow} variants={fadeUp}>
            Patient Stories
          </motion.p>
          <motion.h2 className={styles.heading} variants={fadeUp}>
            Hear From Our Patients
          </motion.h2>
          <motion.p className={styles.subtext} variants={fadeUp}>
            Real people, real results — in their own words.
          </motion.p>
        </motion.div>

        {/* ── Video grid ─────────────────────────────────────── */}
        <motion.div
          className={styles.grid}
          variants={stagger(0.12)}
          initial="hidden"
          whileInView="show"
          viewport={VIEWPORT}
        >
          {VIDEOS.map((v) => (
            <motion.div key={v.id} className={styles.videoCard} variants={fadeUp}>
              {/* Portrait 9:16 aspect wrapper */}
              <div className={styles.videoWrap}>
                <iframe
                  src={`https://fast.wistia.net/embed/iframe/${v.id}?web_component=true&seo=true`}
                  title={v.title}
                  allow="autoplay; fullscreen"
                  allowFullScreen
                  frameBorder="0"
                  scrolling="no"
                  className={styles.iframe}
                />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </Section>
  );
}
