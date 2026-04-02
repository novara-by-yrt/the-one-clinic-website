'use client';

import { motion } from 'framer-motion';
import Section from '@/components/ui/Section';
import Container from '@/components/ui/Container';
import Card from '@/components/ui/Card';
import { fadeUp, stagger, VIEWPORT } from '@/lib/motion';
import styles from './Testimonials.module.css';

const TESTIMONIALS = [
  {
    quote: 'I\'ve tried several clinics but The One Clinic is in a different league. The results are subtle, natural, and exactly what I asked for.',
    name:  'Sarah M.',
    role:  'Anti-Wrinkle Treatment',
  },
  {
    quote: 'From my first consultation to my follow-up, every step felt genuinely personalised. I\'ve never felt so looked after.',
    name:  'James K.',
    role:  'Full-Face Filler',
  },
  {
    quote: 'I was nervous about my first aesthetic treatment, but the team put me completely at ease. The outcome exceeded every expectation.',
    name:  'Priya A.',
    role:  'Laser Resurfacing',
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
