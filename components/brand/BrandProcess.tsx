'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import Image from 'next/image';
import Section from '@/components/ui/Section';
import Container from '@/components/ui/Container';
import { fadeUp, VIEWPORT } from '@/lib/motion';
import styles from './BrandProcess.module.css';

const STEPS = [
  {
    number: '01',
    title:       'Consultation',
    description: 'A private, no-obligation consultation with a qualified doctor to discuss your health, concerns, and goals.',
  },
  {
    number: '02',
    title:       'Assessment',
    description: 'A thorough clinical assessment to understand your full medical picture and identify the right approach.',
  },
  {
    number: '03',
    title:       'Personalised Treatment Plan',
    description: 'A plan built specifically for you, combining the right treatments, timeline, and support for your needs.',
  },
  {
    number: '04',
    title:       'Ongoing Care & Results',
    description: 'Regular check-ins, progress reviews, and ongoing clinical support to ensure lasting, meaningful results.',
  },
];

const SLIDES = [
  { src: '/images/location1.jpg', alt: 'The One Clinic, Leicester' },
  { src: '/images/location2.jpg', alt: 'The One Clinic, interior' },
  { src: '/images/location3.jpg', alt: 'The One Clinic, treatment room' },
];

const EASE     = [0.25, 0.1, 0.25, 1] as const;
const INTERVAL = 4500;

const HEADER_VARIANTS = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
};

export default function BrandProcess() {
  const [hoveredStep, setHoveredStep] = useState<number | null>(null);
  const [autoSlide,   setAutoSlide]   = useState(0);
  const [seqIdx,      setSeqIdx]      = useState(-1);

  const stepsRef = useRef<HTMLOListElement>(null);
  const inView   = useInView(stepsRef, { once: true, amount: 0.25 });

  /* Active image: step hover overrides auto-advance */
  const activeSlide  = hoveredStep !== null ? hoveredStep % SLIDES.length : autoSlide;
  const previewSlide = (activeSlide + 1) % SLIDES.length;

  /* Auto-advance (paused while a step is hovered) */
  useEffect(() => {
    if (hoveredStep !== null) return;
    const t = setInterval(() => setAutoSlide(i => (i + 1) % SLIDES.length), INTERVAL);
    return () => clearInterval(t);
  }, [hoveredStep]);

  /* One-shot entrance sequence on scroll-in */
  useEffect(() => {
    if (!inView) return;
    let idx = 0;
    let handle: ReturnType<typeof setTimeout>;
    function next() {
      setSeqIdx(idx++);
      if (idx < STEPS.length) handle = setTimeout(next, 620);
      else handle = setTimeout(() => setSeqIdx(-1), 620);
    }
    handle = setTimeout(next, 300);
    return () => clearTimeout(handle);
  }, [inView]);

  return (
    <Section variant="light" data-section-theme="light" className={styles.section}>
      <Container>
        <div className={styles.layout}>

          {/* ══════════════════════════════════════════════
              LEFT — Layered media canvas
          ══════════════════════════════════════════════ */}
          <motion.div
            className={styles.mediaCol}
            initial={{ opacity: 0, x: -52 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={VIEWPORT}
            transition={{ duration: 0.95, ease: EASE }}
          >
            <div className={styles.mediaCanvas}>

              {/* ── Main dominant image ──────────────────── */}
              <div className={styles.imgMain}>
                <AnimatePresence mode="sync">
                  <motion.div
                    key={activeSlide}
                    className={styles.imgFill}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.9, ease: 'easeInOut' }}
                  >
                    <Image
                      src={SLIDES[activeSlide].src}
                      alt={SLIDES[activeSlide].alt}
                      fill
                      className={styles.imgCover}
                      sizes="(max-width: 900px) 100vw, 48vw"
                      priority={activeSlide === 0}
                    />
                  </motion.div>
                </AnimatePresence>
                <div className={styles.imgGrad} aria-hidden="true" />
              </div>

              {/* ── Secondary stacked preview image ──────── */}
              <motion.div
                className={styles.imgSecondary}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={VIEWPORT}
                transition={{ duration: 0.85, ease: EASE, delay: 0.32 }}
              >
                <AnimatePresence mode="sync">
                  <motion.div
                    key={previewSlide}
                    className={styles.imgFill}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.75, ease: 'easeInOut', delay: 0.1 }}
                  >
                    <Image
                      src={SLIDES[previewSlide].src}
                      alt={SLIDES[previewSlide].alt}
                      fill
                      className={styles.imgCover}
                      sizes="(max-width: 900px) 40vw, 22vw"
                    />
                  </motion.div>
                </AnimatePresence>
              </motion.div>

              {/* ── Floating stat card ───────────────────── */}
              <motion.div
                className={styles.floatStat}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={VIEWPORT}
                transition={{ duration: 0.6, ease: EASE, delay: 0.5 }}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
              >
                <p className={styles.floatNum}>500+</p>
                <p className={styles.floatLabel}>Patients treated</p>
              </motion.div>

              {/* ── Active step label ─────────────────────── */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={hoveredStep ?? 'idle'}
                  className={styles.stepLabel}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  transition={{ duration: 0.28, ease: EASE }}
                >
                  <span className={styles.stepLabelDot} aria-hidden="true" />
                  <span className={styles.stepLabelText}>
                    {hoveredStep !== null ? STEPS[hoveredStep].title : 'Our Process'}
                  </span>
                </motion.div>
              </AnimatePresence>

              {/* ── Pagination dots ───────────────────────── */}
              <div className={styles.dots} role="tablist" aria-label="Clinic image slideshow">
                {SLIDES.map((_, i) => (
                  <button
                    key={i}
                    className={`${styles.dot} ${i === activeSlide ? styles.dotActive : ''}`}
                    onClick={() => setAutoSlide(i)}
                    role="tab"
                    aria-selected={i === activeSlide}
                    aria-label={`Image ${i + 1} of ${SLIDES.length}`}
                  />
                ))}
              </div>

            </div>
          </motion.div>

          {/* ══════════════════════════════════════════════
              RIGHT — Header + vertical timeline
          ══════════════════════════════════════════════ */}
          <div className={styles.textCol}>

            {/* Header */}
            <motion.div
              className={styles.header}
              variants={HEADER_VARIANTS}
              initial="hidden"
              whileInView="show"
              viewport={VIEWPORT}
            >
              <motion.p className={styles.eyebrow} variants={fadeUp}>The Journey</motion.p>
              <motion.h2 className={styles.heading} variants={fadeUp}>How It Works</motion.h2>
              <motion.p className={styles.subtext} variants={fadeUp}>
                From your first visit to long-term results, here&apos;s what to expect
                when you choose The One Clinic.
              </motion.p>
            </motion.div>

            {/* Vertical timeline */}
            <ol
              className={styles.timeline}
              ref={stepsRef}
              aria-label="Treatment process steps"
            >
              {STEPS.map((step, i) => {
                const isActive = hoveredStep === i ||
                  (hoveredStep === null && seqIdx === i);

                return (
                  <motion.li
                    key={step.number}
                    className={`${styles.stepItem} ${isActive ? styles.isActive : ''}`}
                    initial={{ opacity: 0, x: 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: '-40px 0px' }}
                    transition={{ duration: 0.7, ease: EASE, delay: i * 0.11 }}
                    onMouseEnter={() => setHoveredStep(i)}
                    onMouseLeave={() => setHoveredStep(null)}
                  >
                    {/* ── Left: circle + connector line ──── */}
                    <div className={styles.stepLeft} aria-hidden="true">
                      <div className={styles.stepCircle}>{step.number}</div>
                      {i < STEPS.length - 1 && (
                        <div className={styles.connector} />
                      )}
                    </div>

                    {/* ── Right: glass card ─────────────── */}
                    <div className={styles.stepCard}>
                      <h3 className={styles.stepTitle}>{step.title}</h3>
                      <p className={styles.stepDesc}>{step.description}</p>
                    </div>
                  </motion.li>
                );
              })}
            </ol>

          </div>
        </div>
      </Container>
    </Section>
  );
}
