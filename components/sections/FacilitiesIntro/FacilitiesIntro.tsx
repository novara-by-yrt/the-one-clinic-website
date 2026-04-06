'use client';

import { motion } from 'framer-motion';
import Section from '@/components/ui/Section';
import Container from '@/components/ui/Container';
import { fadeUp, stagger, VIEWPORT } from '@/lib/motion';
import styles from './FacilitiesIntro.module.css';

const PILLARS = [
  { label: 'Heritage Building', value: '19th Century' },
  { label: 'Location', value: 'Leicester, UK' },
  { label: 'Clinical Floors', value: '3 Floors' },
  { label: 'Parking', value: '15 Spaces' },
];

export default function FacilitiesIntro() {
  return (
    <Section variant="light" data-section-theme="light">
      <Container>
        <div className={styles.layout}>
          {/* Left — text */}
          <motion.div
            className={styles.textCol}
            variants={stagger(0.1)}
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
          >
            <motion.p className={styles.eyebrow} variants={fadeUp}>
              Welcome to The One Clinic
            </motion.p>
            <motion.h2 className={styles.heading} variants={fadeUp}>
              A Premium Clinical Environment
            </motion.h2>
            <motion.p className={styles.body} variants={fadeUp}>
              At The One Clinic, our facilities are thoughtfully designed to provide a seamless,
              comfortable, and premium patient experience.
            </motion.p>
            <motion.p className={styles.body} variants={fadeUp}>
              Set within a charming 19th century building, our purpose-built clinic combines
              heritage character with modern medical innovation — creating a space where you
              feel both at home and in expert hands.
            </motion.p>
          </motion.div>

          {/* Right — fact card */}
          <motion.div
            className={styles.cardCol}
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
          >
            <div className={styles.factCard}>
              <p className={styles.cardEyebrow}>At a Glance</p>
              <ul className={styles.pillars} role="list">
                {PILLARS.map((p) => (
                  <li key={p.label} className={styles.pillar}>
                    <span className={styles.pillarValue}>{p.value}</span>
                    <span className={styles.pillarLabel}>{p.label}</span>
                  </li>
                ))}
              </ul>
              <div className={styles.cardDivider} />
              <p className={styles.cardQuote}>
                &ldquo;A space that inspires confidence before your consultation even begins.&rdquo;
              </p>
            </div>
          </motion.div>
        </div>
      </Container>
    </Section>
  );
}
