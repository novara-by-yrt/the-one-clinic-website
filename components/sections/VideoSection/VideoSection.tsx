'use client';

import Script from 'next/script';
import { m } from 'framer-motion';
import Section from '@/components/ui/Section';
import Container from '@/components/ui/Container';
import { fadeUp, stagger, VIEWPORT } from '@/lib/motion';
import styles from './VideoSection.module.css';

const VIDEOS = [
  {
    id:    'hu75ttgmlm',
    title: 'About The One Clinic',
    label: 'Our Story',
    desc:  'Meet the team and discover how we combine medical expertise with personalised care.',
    embedTitle: 'TOC - Intro Video (LP)',
  },
  {
    id:    't8y82cnp5e',
    title: 'Patient Stories',
    label: 'Testimonials',
    desc:  'Hear directly from patients whose health and confidence were transformed by our care.',
    embedTitle: 'Testimonials Compilation - TOC Video',
  },
];

export default function VideoSection() {
  return (
    <Section variant="dark" data-section-theme="dark">
      <Container>
        {/* Header */}
        <m.div
          className={styles.header}
          variants={stagger()}
          initial="hidden"
          whileInView="show"
          viewport={VIEWPORT}
        >
          <m.p className={styles.eyebrow} variants={fadeUp}>
            Watch &amp; Learn
          </m.p>
          <m.h2 className={styles.heading} variants={fadeUp}>
            The One Clinic Where Expertise Meets Care
          </m.h2>
          <m.p className={styles.subtext} variants={fadeUp}>
            Experience our holistic approach and the real transformations our clients experience.
          </m.p>
        </m.div>

        {/* Video grid */}
        <m.div
          className={styles.grid}
          variants={stagger(0.15)}
          initial="hidden"
          whileInView="show"
          viewport={VIEWPORT}
        >
          {VIDEOS.map((video) => (
            <m.div key={video.id} className={styles.videoCard} variants={fadeUp}>
              {/* 16:9 responsive wrapper */}
              <div className={styles.videoWrapper}>
                <iframe
                  src={`https://fast.wistia.net/embed/iframe/${video.id}?web_component=true&seo=true`}
                  title={video.embedTitle}
                  allow="autoplay; fullscreen"
                  allowTransparency
                  frameBorder="0"
                  scrolling="no"
                  loading="lazy"
                  className={styles.embed}
                  name="wistia_embed"
                />
              </div>
            </m.div>
          ))}
        </m.div>
      </Container>

      {/* Wistia player, loaded once, lazy */}
      <Script
        src="https://fast.wistia.net/player.js"
        strategy="lazyOnload"
      />
    </Section>
  );
}
