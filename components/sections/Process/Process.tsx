'use client';

import { motion } from 'framer-motion';
import Section from '@/components/ui/Section';
import Container from '@/components/ui/Container';
import { fadeUp, stagger, VIEWPORT } from '@/lib/motion';
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
    description: 'A plan built specifically for you — combining the right treatments, timeline, and support for your needs.',
  },
  {
    number: '04',
    title:       'Ongoing Care & Results',
    description: 'Regular check-ins, progress reviews, and ongoing clinical support to ensure lasting, meaningful results.',
  },
];

export default function Process() {
  return (
    <Section variant="light" data-section-theme="light">
      <Container>
        <motion.div
          className={styles.header}
          variants={stagger()}
          initial="hidden"
          whileInView="show"
          viewport={VIEWPORT}
        >
          <motion.p className={styles.eyebrow} variants={fadeUp}>
            The Journey
          </motion.p>
          <motion.h2 className={styles.heading} variants={fadeUp}>
            How It Works
          </motion.h2>
        </motion.div>

        <motion.ol
          className={styles.steps}
          variants={stagger(0.15)}
          initial="hidden"
          whileInView="show"
          viewport={VIEWPORT}
          aria-label="Treatment process steps"
        >
          {STEPS.map((step, i) => (
            <motion.li key={step.number} className={styles.step} variants={fadeUp}>
              <div className={styles.stepNumber} aria-hidden="true">{step.number}</div>
              {/* Connector line (hidden on last item via CSS) */}
              {i < STEPS.length - 1 && (
                <div className={styles.connector} aria-hidden="true" />
              )}
              <div className={styles.stepContent}>
                <h3 className={styles.stepTitle}>{step.title}</h3>
                <p className={styles.stepDesc}>{step.description}</p>
              </div>
            </motion.li>
          ))}
        </motion.ol>
      </Container>
    </Section>
  );
}
