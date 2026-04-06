'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import Section from '@/components/ui/Section';
import Container from '@/components/ui/Container';
import { fadeUp, stagger } from '@/lib/motion';
import styles from './FacilitiesHero.module.css';

export default function FacilitiesHero() {
  return (
    <Section variant="dark" data-section-theme="dark" className={styles.hero}>
      <Container>
        <motion.div
          className={styles.content}
          variants={stagger(0.1)}
          initial="hidden"
          animate="show"
        >
          <motion.p className={styles.eyebrow} variants={fadeUp}>
            About Our Clinic
          </motion.p>
          <motion.h1 className={styles.heading} variants={fadeUp}>
            Our Facilities
          </motion.h1>
          <motion.p className={styles.subheading} variants={fadeUp}>
            The One Clinic is a purpose built facility that takes care of all your needs.
          </motion.p>
          <motion.div className={styles.ctas} variants={fadeUp}>
            <Link href="#lead-form" className={styles.btnPrimary}>
              Book Consultation
            </Link>
            <Link href="/treatments" className={styles.btnSecondary}>
              View Treatments
            </Link>
          </motion.div>
        </motion.div>
      </Container>
    </Section>
  );
}
