'use client';

import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Section from '@/components/ui/Section';
import Container from '@/components/ui/Container';
import { fadeUp, stagger, VIEWPORT } from '@/lib/motion';
import styles from './Testimonials.module.css';

const TESTIMONIALS = [
  {
    quote: 'The weight management programme changed my life. The doctors were supportive every step of the way — I finally have a plan that works.',
    name:  'Amara L.',
    role:  'Weight Management Programme',
  },
  {
    quote: 'I came in for help managing a long-term condition and left feeling genuinely heard. The level of care here is unlike any GP I\'ve visited.',
    name:  'David R.',
    role:  'Health & Wellbeing',
  },
  {
    quote: 'From the first call to my follow-up, everything felt seamless and professional. The clinic is calm, the team is brilliant.',
    name:  'Priya S.',
    role:  'Medical Aesthetics',
  },
];

const SLIDE = {
  enter:  (dir: number) => ({ x: dir > 0 ? 80 : -80, opacity: 0 }),
  center: { x: 0, opacity: 1, transition: { duration: 0.45, ease: [0.25, 0.1, 0.25, 1] as const } },
  exit:   (dir: number) => ({ x: dir > 0 ? -80 : 80, opacity: 0, transition: { duration: 0.3, ease: [0.25, 0.1, 0.25, 1] as const } }),
};

export default function Testimonials() {
  const [active, setActive]       = useState(0);
  const [direction, setDirection] = useState(1);
  const touchStartX               = useRef(0);

  function goTo(index: number) {
    setDirection(index > active ? 1 : -1);
    setActive(index);
  }

  function prev() {
    const next = (active - 1 + TESTIMONIALS.length) % TESTIMONIALS.length;
    setDirection(-1);
    setActive(next);
  }

  function next() {
    const nextIdx = (active + 1) % TESTIMONIALS.length;
    setDirection(1);
    setActive(nextIdx);
  }

  function onTouchStart(e: React.TouchEvent) {
    touchStartX.current = e.touches[0].clientX;
  }

  function onTouchEnd(e: React.TouchEvent) {
    const delta = e.changedTouches[0].clientX - touchStartX.current;
    if (delta < -50) next();
    if (delta >  50) prev();
  }

  const t = TESTIMONIALS[active];

  return (
    <Section variant="dark" data-section-theme="dark">
      <Container>
        {/* Header */}
        <motion.div
          className={styles.header}
          variants={stagger()}
          initial="hidden"
          whileInView="show"
          viewport={VIEWPORT}
        >
          <motion.p className={styles.eyebrow} variants={fadeUp}>
            Testimonials
          </motion.p>
          <motion.h2 className={styles.heading} variants={fadeUp}>
            What Our Patients Say
          </motion.h2>
        </motion.div>

        {/* Slider */}
        <motion.div
          className={styles.sliderWrap}
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={VIEWPORT}
        >
          {/* Slide area */}
          <div
            className={styles.slideArea}
            onTouchStart={onTouchStart}
            onTouchEnd={onTouchEnd}
          >
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={active}
                custom={direction}
                variants={SLIDE}
                initial="enter"
                animate="center"
                exit="exit"
                className={styles.slide}
              >
                {/* Decorative quote mark */}
                <span className={styles.quoteIcon} aria-hidden="true">"</span>

                <blockquote className={styles.quote}>
                  <p>{t.quote}</p>
                </blockquote>

                <footer className={styles.footer}>
                  <div className={styles.avatar} aria-hidden="true">
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <cite className={styles.name}>{t.name}</cite>
                    <p className={styles.role}>{t.role}</p>
                  </div>
                </footer>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Controls row */}
          <div className={styles.controls}>
            {/* Prev arrow */}
            <button
              className={styles.arrowBtn}
              onClick={prev}
              aria-label="Previous testimonial"
            >
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
                <path d="M11 4L6 9L11 14" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>

            {/* Pagination dots */}
            <div className={styles.dots} role="tablist" aria-label="Testimonial navigation">
              {TESTIMONIALS.map((_, i) => (
                <button
                  key={i}
                  className={`${styles.dot} ${i === active ? styles.dotActive : ''}`}
                  onClick={() => goTo(i)}
                  role="tab"
                  aria-selected={i === active}
                  aria-label={`Testimonial ${i + 1} of ${TESTIMONIALS.length}`}
                />
              ))}
            </div>

            {/* Next arrow */}
            <button
              className={styles.arrowBtn}
              onClick={next}
              aria-label="Next testimonial"
            >
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
                <path d="M7 4L12 9L7 14" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
        </motion.div>
      </Container>
    </Section>
  );
}
