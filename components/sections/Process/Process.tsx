'use client';

import { useState, useEffect, useRef } from 'react';
import { m, AnimatePresence, useInView } from 'framer-motion';
import Image from 'next/image';
import Section from '@/components/ui/Section';
import Container from '@/components/ui/Container';
import { fadeUp, fadeLeft, staggerRight, VIEWPORT } from '@/lib/motion';
import styles from './Process.module.css';

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

const INTERVAL  = 4000;
const SEQ_STEP  = 700;
const SEQ_DELAY = 350;

export default function Process() {
  const [active, setActive] = useState(0);
  const [seqIdx, setSeqIdx] = useState(-1);

  const stepsRef = useRef<HTMLOListElement>(null);
  const inView   = useInView(stepsRef, { once: true, amount: 0.4 });

  // Slideshow auto-advance
  useEffect(() => {
    const timer = setInterval(() => {
      setActive((i) => (i + 1) % SLIDES.length);
    }, INTERVAL);
    return () => clearInterval(timer);
  }, []);

  // One-shot scroll sequence
  useEffect(() => {
    if (!inView) return;

    let idx = 0;
    let handle: ReturnType<typeof setTimeout>;

    function next() {
      setSeqIdx(idx);
      idx++;
      if (idx < STEPS.length) {
        handle = setTimeout(next, SEQ_STEP);
      } else {
        handle = setTimeout(() => setSeqIdx(-1), SEQ_STEP);
      }
    }

    handle = setTimeout(next, SEQ_DELAY);
    return () => clearTimeout(handle);
  }, [inView]);

  return (
    <Section variant="light" data-section-theme="light" className={styles.section}>
      <Container>
        <div className={styles.layout}>

          {/* ── Left: image slideshow ──────────────────────── */}
          <m.div
            className={styles.imageCol}
            variants={fadeLeft}
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
          >
            <div className={styles.imageWrap}>
              <AnimatePresence mode="sync">
                <m.div
                  key={active}
                  className={styles.slide}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.9, ease: 'easeInOut' }}
                >
                  <Image
                    src={SLIDES[active].src}
                    alt={SLIDES[active].alt}
                    fill
                    className={styles.image}
                    sizes="(max-width: 900px) 100vw, 50vw"
                    priority={active === 0}
                  />
                </m.div>
              </AnimatePresence>

              {/* Dots */}
              <div className={styles.dots} role="tablist" aria-label="Clinic image slideshow">
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
          </m.div>

          {/* ── Right: header + steps ──────────────────────── */}
          <m.div
            className={styles.textCol}
            variants={staggerRight(0.08)}
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
          >
            <m.div className={styles.header} variants={fadeUp}>
              <p className={styles.eyebrow}>The One Clinic</p>
              <h2 className={styles.heading}>Patient Experience</h2>
              <p className={styles.subtext}>
                From your first visit to long-term results, here&apos;s what to expect
                when you choose The One Clinic.
              </p>
            </m.div>

            <ol className={styles.steps} aria-label="Treatment process steps" ref={stepsRef}>
              {STEPS.map((step, i) => (
                <m.li
                  key={step.number}
                  className={`${styles.step} ${i === seqIdx ? styles.highlighted : ''}`}
                  initial={{ opacity: 0, y: 28 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-50px 0px' }}
                  transition={{ duration: 0.75, ease: [0.25, 0.1, 0.25, 1], delay: i * 0.14 }}
                >
                  <div className={styles.stepNumber} aria-hidden="true">{step.number}</div>
                  <div className={styles.stepContent}>
                    <h3 className={styles.stepTitle}>{step.title}</h3>
                    <p className={styles.stepDesc}>{step.description}</p>
                  </div>
                </m.li>
              ))}
            </ol>
          </m.div>

        </div>
      </Container>
    </Section>
  );
}
