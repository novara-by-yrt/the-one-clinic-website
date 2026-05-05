'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Section from '@/components/ui/Section';
import Container from '@/components/ui/Container';
import Button from '@/components/ui/Button';
import { fadeUp, fadeRight, staggerLeft, VIEWPORT } from '@/lib/motion';
import styles from './Benefits.module.css';

const BENEFITS = [
  {
    number: '01',
    title: 'Expert-Led Care',
    description: 'Every service is led by experienced, qualified doctors, not aestheticians. Your safety is the priority.',
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

const IMAGES = [
  { src: '/images/imgi_78_GTR_0328-1-1.jpg', alt: 'The One Clinic team' },
  { src: '/images/Doctor2.jpg',               alt: 'The One Clinic doctor' },
  { src: '/images/Doctor1.jpg',               alt: 'The One Clinic doctor' },
];

export default function Benefits() {
  const [expanded, setExpanded] = useState<number | null>(null);

  return (
    <Section variant="light" data-section-theme="light" className={styles.section}>
      <Container>
        <div className={styles.layout}>

          {/* ── Left: text col ──────────────────────────────── */}
          <motion.div
            className={styles.textCol}
            variants={staggerLeft(0.08)}
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
          >
            <motion.div className={styles.header} variants={fadeUp}>
              <p className={styles.eyebrow}>Why Choose Us</p>
              <h2 className={styles.heading}>
                Carefully considered.<br />
                <em className={styles.headingAccent}>Genuinely</em> yours.
              </h2>
              <p className={styles.subtext}>
                Every patient is met with genuine attention and a step-by-step plan built around their health, goals and lifestyle. Here&rsquo;s what sets us apart.
              </p>
            </motion.div>

            {/* ── Accordion items ──────────────────────────── */}
            <div className={styles.items}>
              {BENEFITS.map((b, i) => (
                <motion.div key={b.number} className={styles.itemWrap} variants={fadeUp}>
                  <button
                    className={styles.item}
                    onClick={() => setExpanded(expanded === i ? null : i)}
                    aria-expanded={expanded === i}
                  >
                    <div className={styles.itemMain}>
                      <span className={styles.number}>{b.number}</span>
                      <span className={styles.title}>{b.title}</span>
                    </div>
                    <svg
                      className={`${styles.chevron} ${expanded === i ? styles.chevronOpen : ''}`}
                      width="18" height="18" viewBox="0 0 18 18" fill="none"
                      aria-hidden="true"
                    >
                      <path d="M4.5 6.75L9 11.25L13.5 6.75" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>

                  <AnimatePresence initial={false}>
                    {expanded === i && (
                      <motion.div
                        className={styles.desc}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.28, ease: [0.25, 0.1, 0.25, 1] }}
                      >
                        <p className={styles.descText}>{b.description}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>

            {/* ── CTAs ─────────────────────────────────────── */}
            <motion.div className={styles.ctas} variants={fadeUp}>
              <Button
                variant="primary"
                theme="light"
                onClick={() => window.dispatchEvent(new CustomEvent('openCallbackModal'))}
              >
                Book a Consultation
              </Button>
            </motion.div>
          </motion.div>

          {/* ── Right: image collage ─────────────────────────── */}
          <motion.div
            className={styles.imageCol}
            variants={fadeRight}
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
          >
            <div className={styles.collage}>
              <div className={styles.collageLarge}>
                <Image
                  src={IMAGES[0].src}
                  alt={IMAGES[0].alt}
                  fill
                  className={styles.collageImg}
                  sizes="(max-width: 900px) 100vw, 30vw"
                  priority
                />
              </div>
              <div className={styles.collageStack}>
                <div className={styles.collageSmall}>
                  <Image
                    src={IMAGES[1].src}
                    alt={IMAGES[1].alt}
                    fill
                    className={styles.collageImg}
                    sizes="(max-width: 900px) 50vw, 20vw"
                  />
                </div>
                <div className={styles.collageSmall}>
                  <Image
                    src={IMAGES[2].src}
                    alt={IMAGES[2].alt}
                    fill
                    className={styles.collageImg}
                    sizes="(max-width: 900px) 50vw, 20vw"
                  />
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </Container>
    </Section>
  );
}
