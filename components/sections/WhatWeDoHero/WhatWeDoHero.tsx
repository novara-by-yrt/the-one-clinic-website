'use client';

import Link from 'next/link';
import Image from 'next/image';
import { m } from 'framer-motion';
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
        <m.div
          className={styles.content}
          variants={stagger(0.1)}
          initial="hidden"
          animate="show"
        >
          <m.p className={styles.eyebrow} variants={fadeUp}>
            About Our Clinic
          </m.p>
          <m.h1 className={styles.heading} variants={fadeUp}>
            What We Do
          </m.h1>
          <m.p className={styles.subheading} variants={fadeUp}>
            A team of esteemed medical professionals delivering aesthetic medicine
            and holistic care for every patient.
          </m.p>
          <m.div className={styles.ctas} variants={fadeUp}>
            <BookConsultationButton className={styles.btnPrimary}>
              Book Consultation
            </BookConsultationButton>
            <Link href="/treatments" className={styles.btnSecondary}>
              View Treatments
            </Link>
          </m.div>
        </m.div>
      </Container>
    </Section>
  );
}
