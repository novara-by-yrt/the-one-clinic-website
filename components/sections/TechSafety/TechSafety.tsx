'use client';

import { motion } from 'framer-motion';
import Section from '@/components/ui/Section';
import Container from '@/components/ui/Container';
import { fadeUp, stagger, VIEWPORT } from '@/lib/motion';
import styles from './TechSafety.module.css';

const TECHNOLOGY = [
  'State-of-the-art equipment',
  'Medically approved devices',
  'Innovative technology',
];

const SAFETY = [
  'CQC registered',
  'GDPR compliant',
  'ICU-grade data protection',
];

function CheckIcon() {
  return (
    <span className={styles.check} aria-hidden="true">
      <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="2,6 5,9 10,3" />
      </svg>
    </span>
  );
}

export default function TechSafety() {
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
            Standards &amp; Technology
          </motion.p>
          <motion.h2 className={styles.heading} variants={fadeUp}>
            Equipped for Excellence
          </motion.h2>
          <motion.p className={styles.subtext} variants={fadeUp}>
            All machines and equipment used at the clinic are modern, state-of-the-art devices
            that are medically approved for safety and efficiency. We select world-leading,
            innovative devices and first-rate products to help our patients achieve the best
            results possible.
          </motion.p>
        </motion.div>

        {/* Two-column grid */}
        <motion.div
          className={styles.grid}
          variants={stagger(0.1)}
          initial="hidden"
          whileInView="show"
          viewport={VIEWPORT}
        >
          {/* Technology */}
          <motion.div className={styles.column} variants={fadeUp}>
            <div className={styles.columnHead}>
              <span className={styles.columnIcon} aria-hidden="true">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="3" width="20" height="14" rx="2" />
                  <line x1="8" y1="21" x2="16" y2="21" />
                  <line x1="12" y1="17" x2="12" y2="21" />
                </svg>
              </span>
              <h3 className={styles.columnTitle}>Technology</h3>
            </div>
            <ul className={styles.itemList} role="list">
              {TECHNOLOGY.map((item) => (
                <li key={item} className={styles.item}>
                  <CheckIcon />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Safety */}
          <motion.div className={styles.column} variants={fadeUp}>
            <div className={styles.columnHead}>
              <span className={styles.columnIcon} aria-hidden="true">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                </svg>
              </span>
              <h3 className={styles.columnTitle}>Safety &amp; Compliance</h3>
            </div>
            <ul className={styles.itemList} role="list">
              {SAFETY.map((item) => (
                <li key={item} className={styles.item}>
                  <CheckIcon />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </motion.div>
      </Container>
    </Section>
  );
}
