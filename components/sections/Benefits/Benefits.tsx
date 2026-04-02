'use client';

import { motion } from 'framer-motion';
import Section from '@/components/ui/Section';
import Container from '@/components/ui/Container';
import { fadeUp, stagger, VIEWPORT } from '@/lib/motion';
import styles from './Benefits.module.css';

const BENEFITS = [
  {
    number: '01',
    title: 'Expert Practitioners',
    description: 'Every treatment is delivered by fully qualified clinicians with years of specialist experience.',
  },
  {
    number: '02',
    title: 'Personalised Care',
    description: 'No two patients are the same. Your plan is built around your unique anatomy and goals.',
  },
  {
    number: '03',
    title: 'Proven Results',
    description: 'We use only clinically validated treatments and technologies that deliver measurable outcomes.',
  },
  {
    number: '04',
    title: 'Ongoing Support',
    description: 'Your journey doesn\'t end after treatment. We provide continuous guidance and aftercare.',
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
