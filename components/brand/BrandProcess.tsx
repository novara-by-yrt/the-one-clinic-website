'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import Image from 'next/image';
import Section from '@/components/ui/Section';
import Container from '@/components/ui/Container';
import { fadeUp, VIEWPORT } from '@/lib/motion';
import styles from './BrandProcess.module.css';

const PILLARS = [
  {
    tag:     'Our Mission',
    heading: 'A Fresh Perspective on Aesthetics & Well-being',
    body:    'We bring an honest, open approach to aesthetic medicine and health in Leicester, working closely with every patient to help them achieve their goals. Our mission is to empower you to become the version of yourself you are truly happy with.',
  },
  {
    tag:     'Our Clinic',
    heading: 'A Space Built Entirely Around You',
    body:    'Step into our state-of-the-art clinic and discover modern medical equipment within a relaxing, luxurious setting. Every visit is a bespoke experience centred on your needs, delivering innovative treatments using the most advanced techniques available.',
  },
];

const SLIDES = [
  { src: '/images/Lumecca IPL Laser 2.png', alt: 'Lumecca IPL treatment at The One Clinic' },
];

const EASE     = [0.25, 0.1, 0.25, 1] as const;
const INTERVAL = 4500;

const HEADER_VARIANTS = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
};

export default function BrandProcess() {
  const [hoveredPillar, setHoveredPillar] = useState<number | null>(null);
  const [autoSlide,     setAutoSlide]     = useState(0);
  const [seqIdx,        setSeqIdx]        = useState(-1);

  const pillarsRef = useRef<HTMLDivElement>(null);
  const inView     = useInView(pillarsRef, { once: true, amount: 0.25 });

  const activeSlide  = hoveredPillar !== null ? hoveredPillar % SLIDES.length : autoSlide;
  const previewSlide = (activeSlide + 1) % SLIDES.length;

  useEffect(() => {
    if (hoveredPillar !== null) return;
    const t = setInterval(() => setAutoSlide(i => (i + 1) % SLIDES.length), INTERVAL);
    return () => clearInterval(t);
  }, [hoveredPillar]);

  useEffect(() => {
    if (!inView) return;
    let idx = 0;
    let handle: ReturnType<typeof setTimeout>;
    function next() {
      setSeqIdx(idx++);
      if (idx < PILLARS.length) handle = setTimeout(next, 680);
      else handle = setTimeout(() => setSeqIdx(-1), 680);
    }
    handle = setTimeout(next, 300);
    return () => clearTimeout(handle);
  }, [inView]);

  return (
    <Section variant="light" data-section-theme="light" className={styles.section}>
      <Container>
        <div className={styles.layout}>

          {/* ══════════════════════════════════════════════
              LEFT , Layered media canvas
          ══════════════════════════════════════════════ */}
          <motion.div
            className={styles.mediaCol}
            initial={{ opacity: 0, x: -52 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={VIEWPORT}
            transition={{ duration: 0.95, ease: EASE }}
          >
            <div className={styles.mediaCanvas}>

              <div className={styles.mediaHalo} aria-hidden="true" />

              {/* Main dominant image */}
              <motion.div
                className={styles.imgMain}
                whileHover={{ scale: 1.025 }}
                transition={{ duration: 0.8, ease: EASE }}
              >
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
              </motion.div>

              {/* Secondary preview image */}
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

              {/* Floating stat card */}
              <motion.div
                className={styles.floatStat}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={VIEWPORT}
                transition={{ duration: 0.6, ease: EASE, delay: 0.5 }}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
              >
                <p className={styles.floatNum}>2000+</p>
                <p className={styles.floatLabel}>Patients Treated</p>
              </motion.div>

              {/* Active pillar label */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={hoveredPillar ?? 'idle'}
                  className={styles.stepLabel}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  transition={{ duration: 0.28, ease: EASE }}
                >
                  <span className={styles.stepLabelDot} aria-hidden="true" />
                  <span className={styles.stepLabelText}>
                    {hoveredPillar !== null ? PILLARS[hoveredPillar].tag : 'The One Clinic'}
                  </span>
                </motion.div>
              </AnimatePresence>


            </div>
          </motion.div>

          {/* ══════════════════════════════════════════════
              RIGHT , Header + two editorial pillars
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
              <motion.div variants={fadeUp}>
                <span className={styles.chip}>
                  <span className={styles.chipDot} aria-hidden="true" />
                  About Us
                </span>
              </motion.div>
              <motion.h2 className={styles.heading} variants={fadeUp}>Our Philosophy</motion.h2>
              <motion.p className={styles.subtext} variants={fadeUp}>
                One Clinic Leicester, where a fresh approach to aesthetics meets
                genuine, lasting care for every patient.
              </motion.p>
            </motion.div>

            {/* Editorial pillar cards */}
            <div className={styles.pillars} ref={pillarsRef}>
              {PILLARS.map((pillar, i) => {
                const isActive = hoveredPillar === i ||
                  (hoveredPillar === null && seqIdx === i);

                return (
                  <motion.div
                    key={pillar.tag}
                    className={`${styles.pillarItem} ${isActive ? styles.isActive : ''}`}
                    initial={{ opacity: 0, x: 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: '-40px 0px' }}
                    transition={{ duration: 0.7, ease: EASE, delay: i * 0.15 }}
                    onMouseEnter={() => setHoveredPillar(i)}
                    onMouseLeave={() => setHoveredPillar(null)}
                  >
                    <div className={styles.pillarAccent} aria-hidden="true" />
                    <div className={styles.pillarCard}>
                      <span className={styles.pillarTag}>{pillar.tag}</span>
                      <h3 className={styles.pillarHeading}>{pillar.heading}</h3>
                      <p className={styles.pillarBody}>{pillar.body}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>

          </div>
        </div>
      </Container>
    </Section>
  );
}
