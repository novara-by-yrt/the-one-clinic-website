'use client';

import { motion } from 'framer-motion';
import Section from '@/components/ui/Section';
import Container from '@/components/ui/Container';
import { fadeUp, stagger, VIEWPORT } from '@/lib/motion';
import styles from './ArrivalExperience.module.css';

const CARDS = [
  {
    title: 'Reception & Check-in',
    description:
      'Our welcoming front-of-house team greets you from the moment you arrive, handling check-in promptly so you can settle in and look forward to your appointment.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
        <polyline points="9 22 9 12 15 12 15 22" />
      </svg>
    ),
  },
  {
    title: 'Complimentary Refreshments',
    description:
      "Settle in with a complimentary drink of your choice. We take pride in creating a calm, unhurried atmosphere so you feel completely at ease before your treatment begins.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M18 8h1a4 4 0 0 1 0 8h-1" />
        <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z" />
        <line x1="6" y1="1" x2="6" y2="4" />
        <line x1="10" y1="1" x2="10" y2="4" />
        <line x1="14" y1="1" x2="14" y2="4" />
      </svg>
    ),
  },
  {
    title: 'Skincare Bar',
    description:
      'Browse our curated selection of clinic-approved skincare products, all available to sample freely. Our team are on hand to recommend what best suits your skin type and treatment goals.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M12 2a10 10 0 0 1 0 20 10 10 0 0 1 0-20" />
        <path d="M12 8c-2.2 0-4 1.8-4 4s1.8 4 4 4 4-1.8 4-4" />
        <path d="M12 2v2M12 20v2M2 12h2M20 12h2" />
      </svg>
    ),
  },
  {
    title: 'Personalised Experience',
    description:
      'No two patients are alike. Every element of your visit, from your consultation notes to your aftercare plan, is tailored specifically to your goals, concerns, and medical history.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
      </svg>
    ),
  },
];

export default function ArrivalExperience() {
  return (
    <Section variant="light" data-section-theme="light" className={styles.section}>
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
            From the Moment You Arrive
          </motion.p>
          <motion.h2 className={styles.heading} variants={fadeUp}>
            The Arrival Experience
          </motion.h2>
          <motion.p className={styles.subtext} variants={fadeUp}>
            Every visit is curated to make you feel at ease from the moment you step through our doors.
          </motion.p>
        </motion.div>

        {/* Cards */}
        <motion.div
          className={styles.grid}
          variants={stagger(0.1)}
          initial="hidden"
          whileInView="show"
          viewport={VIEWPORT}
        >
          {CARDS.map((card) => (
            <motion.div key={card.title} className={styles.card} variants={fadeUp}>
              <div className={styles.iconWrap}>{card.icon}</div>
              <h3 className={styles.cardTitle}>{card.title}</h3>
              <p className={styles.cardDesc}>{card.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </Section>
  );
}
