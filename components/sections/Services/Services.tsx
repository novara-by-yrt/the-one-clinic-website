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
    title: 'Face',
    description:
      'Anti-wrinkle injections, dermal fillers, and contouring treatments to refresh and rejuvenate.',
  },
  {
    title: 'Skin',
    description:
      'Advanced peels, laser resurfacing, and medical-grade facials for radiant, healthy skin.',
  },
  {
    title: 'Hair',
    description:
      'PRP therapy and targeted treatments to restore density and promote natural regrowth.',
  },
  {
    title: 'Body',
    description:
      'Non-surgical fat reduction, skin tightening, and body contouring with proven technology.',
  },
  {
    title: 'Wellness',
    description:
      'IV drips, vitamin therapies, and holistic programmes designed for total-body vitality.',
  },
  {
    title: 'Bespoke',
    description:
      'Fully tailored treatment plans combining multiple modalities for transformative results.',
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
            Our Treatments
          </motion.h2>
          <motion.p className={styles.subtext} variants={fadeUp}>
            A comprehensive range of clinician-led aesthetic and wellness
            treatments, each personalised to your goals.
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
