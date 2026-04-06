'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import Section from '@/components/ui/Section';
import Container from '@/components/ui/Container';
import { fadeUp, stagger, VIEWPORT } from '@/lib/motion';
import styles from './FacilitiesServices.module.css';

const SERVICES = [
  {
    number: '01',
    title: 'General Health',
    description: 'Comprehensive health assessments and ongoing care for your overall wellbeing.',
  },
  {
    number: '02',
    title: 'Health Screening',
    description: 'Advanced screening programmes to detect and prevent health concerns early.',
  },
  {
    number: '03',
    title: 'Private GP',
    description: 'Same-day and next-day appointments with experienced private general practitioners.',
  },
  {
    number: '04',
    title: 'Dermatology',
    description: 'Expert diagnosis and treatment for all skin conditions, from acne to complex disorders.',
  },
  {
    number: '05',
    title: 'Weight Management',
    description: 'Clinician-led programmes combining medical expertise with personalised lifestyle guidance.',
  },
  {
    number: '06',
    title: 'Medical Aesthetics',
    description: 'A full suite of aesthetic treatments delivered by experienced medical professionals.',
  },
];

export default function FacilitiesServices() {
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
            What We Offer
          </motion.p>
          <motion.h2 className={styles.heading} variants={fadeUp}>
            Services Under One Roof
          </motion.h2>
          <motion.p className={styles.subtext} variants={fadeUp}>
            Our range of treatments provide solutions for a number of wellbeing concerns.
            With everything you need under one roof, a visit to The One Clinic will leave
            you glowing from head to toe, inside and out.
          </motion.p>
        </motion.div>

        {/* Services grid */}
        <motion.div
          className={styles.grid}
          variants={stagger(0.08)}
          initial="hidden"
          whileInView="show"
          viewport={VIEWPORT}
        >
          {SERVICES.map((s) => (
            <motion.div key={s.number} className={styles.card} variants={fadeUp}>
              <div className={styles.cardTop}>
                <span className={styles.number}>{s.number}</span>
                <span className={styles.arrow} aria-hidden="true">↗</span>
              </div>
              <h3 className={styles.cardTitle}>{s.title}</h3>
              <p className={styles.cardDesc}>{s.description}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Team trust block */}
        <motion.div
          className={styles.teamTrust}
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={VIEWPORT}
        >
          <div className={styles.trustContent}>
            <p className={styles.trustQuote}>
              Next to our patients, a highly treasured part of our provision is our team.
              Our proficient doctors are fully qualified and trained to the highest standards.
              We all appear on the GMC register and boast over 45 years of valuable experience between us.
            </p>
            <Link href="#team" className={styles.trustCta}>
              Meet Our Team
              <span aria-hidden="true" className={styles.ctaArrow}>→</span>
            </Link>
          </div>
        </motion.div>
      </Container>
    </Section>
  );
}
