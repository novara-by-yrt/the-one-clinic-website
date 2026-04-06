'use client';

import { motion } from 'framer-motion';
import Section from '@/components/ui/Section';
import Container from '@/components/ui/Container';
import { fadeUp, stagger, VIEWPORT } from '@/lib/motion';
import styles from './FacilityStats.module.css';

const STATS = [
  { value: '5', label: 'Consulting Rooms' },
  { value: '2', label: 'Treatment Rooms' },
  { value: '3', label: 'Floors' },
  { value: '15', label: 'Parking Spaces' },
];

const ACCESS = [
  {
    label: 'Disabled Access',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="12" cy="4" r="2" />
        <path d="M10 10h4l2 6H8l2-6z" />
        <path d="M8 22l2-6M16 22l-2-6" />
      </svg>
    ),
  },
  {
    label: 'Accessible Toilets',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <path d="M9 9h6M9 12h6M9 15h4" />
      </svg>
    ),
  },
  {
    label: 'Shower Room',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M4 12h16M4 12a8 8 0 0 1 16 0" />
        <line x1="8" y1="16" x2="8" y2="20" />
        <line x1="12" y1="16" x2="12" y2="20" />
        <line x1="16" y1="16" x2="16" y2="20" />
      </svg>
    ),
  },
];

export default function FacilityStats() {
  return (
    <Section variant="light" data-section-theme="light">
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
            By The Numbers
          </motion.p>
          <motion.h2 className={styles.heading} variants={fadeUp}>
            Built to Meet Every Need
          </motion.h2>
          <motion.p className={styles.subtext} variants={fadeUp}>
            Wide range of treatments under one roof
          </motion.p>
        </motion.div>

        {/* Stats row */}
        <motion.div
          className={styles.statsRow}
          variants={stagger(0.08)}
          initial="hidden"
          whileInView="show"
          viewport={VIEWPORT}
        >
          {STATS.map((s) => (
            <motion.div key={s.label} className={styles.stat} variants={fadeUp}>
              <span className={styles.statValue}>{s.value}</span>
              <span className={styles.statLabel}>{s.label}</span>
            </motion.div>
          ))}
        </motion.div>

        {/* Accessibility callout */}
        <motion.div
          className={styles.accessBar}
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={VIEWPORT}
        >
          <p className={styles.accessTitle}>Inclusive for All</p>
          <ul className={styles.accessList} role="list">
            {ACCESS.map((a) => (
              <li key={a.label} className={styles.accessItem}>
                <span className={styles.accessIcon}>{a.icon}</span>
                <span className={styles.accessLabel}>{a.label}</span>
              </li>
            ))}
          </ul>
        </motion.div>
      </Container>
    </Section>
  );
}
