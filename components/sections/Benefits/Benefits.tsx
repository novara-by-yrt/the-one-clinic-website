'use client';

import { motion } from 'framer-motion';
import Section from '@/components/ui/Section';
import Container from '@/components/ui/Container';
import { fadeUp, stagger, VIEWPORT } from '@/lib/motion';
import styles from './Benefits.module.css';

const BENEFITS = [
  {
    number: '01',
    title: 'Expert-Led Care',
    description: 'Every service is led by experienced, qualified doctors — not aestheticians. Your safety is the priority.',
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

export default function Benefits() {
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
            Why Us
          </motion.p>
          <motion.h2 className={styles.heading} variants={fadeUp}>
            Why Choose The One Clinic
          </motion.h2>
        </motion.div>

        <motion.div
          className={styles.grid}
          variants={stagger(0.1)}
          initial="hidden"
          whileInView="show"
          viewport={VIEWPORT}
        >
          {BENEFITS.map((b) => (
            <motion.div key={b.number} className={styles.item} variants={fadeUp}>
              <span className={styles.number} aria-hidden="true">{b.number}</span>
              <h3 className={styles.title}>{b.title}</h3>
              <p className={styles.desc}>{b.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </Section>
  );
}
