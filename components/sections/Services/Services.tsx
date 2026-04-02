'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Section from '@/components/ui/Section';
import Container from '@/components/ui/Container';
import { fadeUp, stagger, VIEWPORT } from '@/lib/motion';
import styles from './Services.module.css';

const SERVICES = [
  {
    number: '01',
    title: 'Medical Aesthetics',
    description:
      'Laser treatments, skin resurfacing, and anti-ageing procedures delivered by qualified medical professionals.',
  },
  {
    number: '02',
    title: 'Health & Wellbeing',
    description:
      'GP-led services including health screenings, chronic condition management, and mental health support.',
  },
  {
    number: '03',
    title: 'Body Treatments',
    description:
      'Medically supervised weight management and body confidence programmes tailored to your goals.',
  },
  {
    number: '04',
    title: 'Minor Surgery',
    description:
      'Safe, clinical removal of moles, cysts, and skin lesions by experienced doctors in a sterile environment.',
  },
];

export default function Services() {
  return (
    <Section id="treatments" variant="dark" data-section-theme="dark">
      <Container>
        {/* Section header */}
        <motion.div
          className={styles.header}
          variants={stagger()}
          initial="hidden"
          whileInView="show"
          viewport={VIEWPORT}
        >
          <motion.p className={styles.eyebrow} variants={fadeUp}>
            What We Offer
          </motion.p>
          <motion.h2 className={styles.heading} variants={fadeUp}>
            Our Services
          </motion.h2>
          <motion.p className={styles.subtext} variants={fadeUp}>
            Medical expertise and aesthetic care combined — everything you
            need for your health and confidence, under one roof.
          </motion.p>
        </motion.div>

        {/* 2 × 2 grid */}
        <motion.div
          className={styles.grid}
          variants={stagger(0.1)}
          initial="hidden"
          whileInView="show"
          viewport={VIEWPORT}
        >
          {SERVICES.map((s) => (
            <motion.div key={s.number} className={styles.card} variants={fadeUp}>
              <div className={styles.cardTop}>
                <span className={styles.number} aria-hidden="true">{s.number}</span>
                <span className={styles.arrow} aria-hidden="true">↗</span>
              </div>
              <h3 className={styles.cardTitle}>{s.title}</h3>
              <p className={styles.cardDesc}>{s.description}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          className={styles.cta}
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={VIEWPORT}
        >
          <Link href="/treatments" className={styles.ctaLink}>
            Explore All Treatments
            <span aria-hidden="true" className={styles.ctaArrow}>→</span>
          </Link>
        </motion.div>
      </Container>
    </Section>
  );
}
