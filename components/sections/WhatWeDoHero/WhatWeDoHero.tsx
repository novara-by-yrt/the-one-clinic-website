'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import Section from '@/components/ui/Section';
import Container from '@/components/ui/Container';
import BookConsultationButton from '@/components/ui/BookConsultationButton';
import { fadeUp, stagger } from '@/lib/motion';
import styles from './WhatWeDoHero.module.css';

export default function WhatWeDoHero() {
  return (
    <Section variant="dark" data-section-theme="dark" className={styles.hero}>
      {/* Background image */}
      <div className={styles.bgWrap}>
        <Image
          src="/images/Background image.jpg"
          alt=""
          fill
          priority
          className={styles.bgImage}
          sizes="100vw"
        />
        <div className={styles.overlay} />
      </div>

      <Container className={styles.container}>
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
            What We Do
          </motion.h1>
          <motion.p className={styles.subheading} variants={fadeUp}>
            A team of esteemed medical professionals delivering aesthetic medicine
            and holistic care for every patient.
          </motion.p>
          <motion.div className={styles.ctas} variants={fadeUp}>
            <BookConsultationButton className={styles.btnPrimary}>
              Book Consultation
            </BookConsultationButton>
            <Link href="/treatments" className={styles.btnSecondary}>
              View Treatments
            </Link>
          </motion.div>
        </motion.div>
      </Container>
    </Section>
  );
}
