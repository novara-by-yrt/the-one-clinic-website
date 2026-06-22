'use client';

import { useState, useRef } from 'react';
import { m } from 'framer-motion';
import Script from 'next/script';
import Section from '@/components/ui/Section';
import Container from '@/components/ui/Container';
import { fadeUp, stagger, VIEWPORT } from '@/lib/motion';
import styles from './TestimonialVideos.module.css';

const VIDEOS = [
  { id: 'idcb1vywka', title: 'Customer Testimonial' },
  { id: 'onscmatqmy', title: 'Customer Testimonial, Oxana' },
  { id: 'fm142sxmlw', title: 'Customer Testimonial, Mahanoor' },
];

export default function TestimonialVideos() {
  const [active, setActive]       = useState(0);
  const [direction, setDirection] = useState(1);
  const touchStartX               = useRef(0);
  const touchStartY               = useRef(0);

  function go(next: number) {
    const n = (next + VIDEOS.length) % VIDEOS.length;
    setDirection(next >= active ? 1 : -1);
    setActive(n);
  }

  function onTouchStart(e: React.TouchEvent) {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  }

  function onTouchEnd(e: React.TouchEvent) {
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    const dy = Math.abs(e.changedTouches[0].clientY - touchStartY.current);
    if (Math.abs(dx) > 44 && Math.abs(dx) > dy) go(active + (dx < 0 ? 1 : -1));
  }

  return (
    <Section variant="dark" data-section-theme="dark" className={styles.section}>
      <Script src="https://fast.wistia.net/player.js" strategy="lazyOnload" />

      <Container>
        <m.div
          className={styles.header}
          variants={stagger(0.15)}
          initial="hidden"
          whileInView="show"
          viewport={VIEWPORT}
        >
          <m.p className={styles.eyebrow} variants={fadeUp}>Patient Stories</m.p>
          <m.h2 className={styles.heading} variants={fadeUp}>Hear From Our Patients</m.h2>
          <m.p className={styles.subtext} variants={fadeUp}>
            Real people, real results, in their own words.
          </m.p>
        </m.div>

        {/* Desktop: 3-column portrait grid */}
        <m.div
          className={styles.grid}
          variants={stagger(0.12)}
          initial="hidden"
          whileInView="show"
          viewport={VIEWPORT}
        >
          {VIDEOS.map((v) => (
            <m.div key={v.id} className={styles.videoCard} variants={fadeUp}>
              <div className={styles.videoWrap}>
                <iframe
                  src={`https://fast.wistia.net/embed/iframe/${v.id}?web_component=true&seo=true`}
                  title={v.title}
                  allow="autoplay; fullscreen"
                  allowFullScreen
                  frameBorder="0"
                  scrolling="no"
                  loading="lazy"
                  className={styles.iframe}
                />
              </div>
            </m.div>
          ))}
        </m.div>

        {/* Mobile: slideshow with arrows + dots */}
        <div className={styles.mobileSlideshow}>
          <div className={styles.mobileTrackRow}>
            <button
              className={styles.mobileArrow}
              onClick={() => go(active - 1)}
              aria-label="Previous video"
            >
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <polyline points="11,3 5,9 11,15" stroke="currentColor" strokeWidth="2"
                  strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>

            <div
              className={styles.mobileTrack}
              onTouchStart={onTouchStart}
              onTouchEnd={onTouchEnd}
            >
              <div className={styles.mobileSlide}>
                <div className={styles.videoWrapMobile}>
                  <iframe
                    key={active}
                    src={`https://fast.wistia.net/embed/iframe/${VIDEOS[active].id}?web_component=true&seo=true`}
                    title={VIDEOS[active].title}
                    allow="autoplay; fullscreen"
                    allowFullScreen
                    frameBorder="0"
                    scrolling="no"
                    loading="lazy"
                    className={styles.iframe}
                  />
                </div>
              </div>
            </div>

            <button
              className={styles.mobileArrow}
              onClick={() => go(active + 1)}
              aria-label="Next video"
            >
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <polyline points="7,3 13,9 7,15" stroke="currentColor" strokeWidth="2"
                  strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>

          <div className={styles.mobileDots} role="tablist" aria-label="Patient testimonial videos">
            {VIDEOS.map((_, i) => (
              <button
                key={i}
                className={`${styles.mobileDot} ${i === active ? styles.mobileDotActive : ''}`}
                onClick={() => go(i)}
                role="tab"
                aria-selected={i === active}
                aria-label={`Video ${i + 1} of ${VIDEOS.length}`}
              />
            ))}
          </div>
        </div>

      </Container>
    </Section>
  );
}
