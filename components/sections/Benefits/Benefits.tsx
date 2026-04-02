'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Section from '@/components/ui/Section';
import Container from '@/components/ui/Container';
import { fadeUp, stagger, VIEWPORT } from '@/lib/motion';
import styles from './Benefits.module.css';

const BENEFITS = [
  {
    number: '01',
    title: 'Expert-Led Care',
    description: 'Every service is led by experienced, qualified doctors — not aestheticians. Your safety is the priority.',
  },
  {
    number: '02',
    title: 'Everything Under One Roof',
    description: 'Medical care, aesthetics, and wellbeing in a single clinic. No referrals, no gaps, no compromise.',
  },
  {
    number: '03',
    title: 'Personalised Treatment Plans',
    description: 'Your consultation shapes everything. We build plans around your health, goals, and lifestyle.',
  },
  {
    number: '04',
    title: 'Advanced Technology',
    description: 'We use the latest clinical techniques and evidence-based treatments to deliver lasting results.',
  },
];

const SLIDES = [
  { src: '/images/Doctor1.jpg', alt: 'The One Clinic — Doctor 1' },
  { src: '/images/Doctor2.jpg', alt: 'The One Clinic — Doctor 2' },
];

const INTERVAL = 3000; // ms

export default function Benefits() {
  const [active, setActive] = useState(0);

  // Auto-advance every 3 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setActive((i) => (i + 1) % SLIDES.length);
    }, INTERVAL);
    return () => clearInterval(timer);
  }, []);

  return (
    <Section variant="light" data-section-theme="light" className={styles.section}>
      <Container>
        <div className={styles.layout}>

          {/* ── Left: header + benefit items ────────────────── */}
          <motion.div
            className={styles.textCol}
            variants={stagger(0.08)}
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
          >
            <motion.div className={styles.header} variants={fadeUp}>
              <p className={styles.eyebrow}>Why Us</p>
              <h2 className={styles.heading}>Why Choose The One Clinic</h2>
            </motion.div>

            <div className={styles.items}>
              {BENEFITS.map((b) => (
                <motion.div key={b.number} className={styles.item} variants={fadeUp}>
                  <div className={styles.itemTop}>
                    <span className={styles.number} aria-hidden="true">{b.number}</span>
                    <h3 className={styles.title}>{b.title}</h3>
                  </div>
                  <p className={styles.desc}>{b.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* ── Right: auto-scrolling doctor image slideshow ─ */}
          <motion.div
            className={styles.imageCol}
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
          >
            <div className={styles.imageWrap}>
              {/* Crossfade slides */}
              <AnimatePresence mode="sync">
                <motion.div
                  key={active}
                  className={styles.slide}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.8, ease: 'easeInOut' }}
                >
                  <Image
                    src={SLIDES[active].src}
                    alt={SLIDES[active].alt}
                    fill
                    className={styles.image}
                    sizes="(max-width: 900px) 100vw, 50vw"
                    priority={active === 0}
                  />
                </motion.div>
              </AnimatePresence>

              {/* Pagination dots — no arrows */}
              <div className={styles.dots} role="tablist" aria-label="Doctor image slideshow">
                {SLIDES.map((_, i) => (
                  <button
                    key={i}
                    className={`${styles.dot} ${i === active ? styles.dotActive : ''}`}
                    onClick={() => setActive(i)}
                    role="tab"
                    aria-selected={i === active}
                    aria-label={`Show image ${i + 1} of ${SLIDES.length}`}
                  />
                ))}
              </div>
            </div>
          </motion.div>

        </div>
      </Container>
    </Section>
  );
}
