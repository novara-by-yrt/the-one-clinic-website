'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Section from '@/components/ui/Section';
import Container from '@/components/ui/Container';
import Card from '@/components/ui/Card';
import { fadeUp, stagger, VIEWPORT } from '@/lib/motion';
import styles from './Services.module.css';

const SERVICES = [
  {
    title: 'Medical Aesthetics',
    description:
      'Laser treatments, skin resurfacing, and anti-ageing procedures delivered by qualified medical professionals.',
  },
  {
    title: 'Health & Wellbeing',
    description:
      'GP-led services including health screenings, chronic condition management, and mental health support.',
  },
  {
    title: 'Body Treatments',
    description:
      'Medically supervised weight management and body confidence programmes tailored to your goals.',
  },
  {
    title: 'Minor Surgery',
    description:
      'Safe, clinical removal of moles, cysts, and skin lesions by experienced doctors in a sterile environment.',
  },
];

export default function Services() {
  return (
    <Section
      id="treatments"
      variant="dark"
      data-section-theme="dark"
    >
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

        {/* Cards grid */}
        <motion.div
          className={styles.grid}
          variants={stagger(0.1)}
          initial="hidden"
          whileInView="show"
          viewport={VIEWPORT}
        >
          {SERVICES.map((s) => (
            <motion.div key={s.title} variants={fadeUp}>
              <Card theme="dark" hover className={styles.card}>
                <h3 className={styles.cardTitle}>{s.title}</h3>
                <p className={styles.cardDesc}>{s.description}</p>
              </Card>
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
          <Link href="#contact" className={styles.ctaLink}>
            Explore All Treatments
            <span aria-hidden="true" className={styles.arrow}>→</span>
          </Link>
        </motion.div>
      </Container>
    </Section>
  );
}
