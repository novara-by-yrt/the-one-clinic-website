'use client';

import { motion } from 'framer-motion';
import Section from '@/components/ui/Section';
import Container from '@/components/ui/Container';
import Card from '@/components/ui/Card';
import { fadeUp, stagger, VIEWPORT } from '@/lib/motion';
import styles from './Testimonials.module.css';

const TESTIMONIALS = [
  {
    quote: 'The weight management programme changed my life. The doctors were supportive every step of the way — I finally have a plan that works.',
    name:  'Amara L.',
    role:  'Weight Management Programme',
  },
  {
    quote: 'I came in for help managing a long-term condition and left feeling genuinely heard. The level of care here is unlike any GP I\'ve visited.',
    name:  'David R.',
    role:  'Health & Wellbeing',
  },
  {
    quote: 'From the first call to my follow-up, everything felt seamless and professional. The clinic is calm, the team is brilliant.',
    name:  'Priya S.',
    role:  'Medical Aesthetics',
  },
];

export default function Testimonials() {
  return (
    <Section variant="dark" data-section-theme="dark">
      <Container>
        <motion.div
          className={styles.header}
          variants={stagger()}
          initial="hidden"
          whileInView="show"
          viewport={VIEWPORT}
        >
          <motion.p className={styles.eyebrow} variants={fadeUp}>
            Testimonials
          </motion.p>
          <motion.h2 className={styles.heading} variants={fadeUp}>
            What Our Patients Say
          </motion.h2>
        </motion.div>

        <motion.div
          className={styles.grid}
          variants={stagger(0.12)}
          initial="hidden"
          whileInView="show"
          viewport={VIEWPORT}
        >
          {TESTIMONIALS.map((t) => (
            <motion.div key={t.name} variants={fadeUp}>
              <Card theme="dark" className={styles.card}>
                <span className={styles.quoteIcon} aria-hidden="true">"</span>
                <blockquote className={styles.quote}>
                  <p>{t.quote}</p>
                </blockquote>
                <footer className={styles.footer}>
                  <div className={styles.avatar} aria-hidden="true">
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <cite className={styles.name}>{t.name}</cite>
                    <p className={styles.role}>{t.role}</p>
                  </div>
                </footer>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </Section>
  );
}
