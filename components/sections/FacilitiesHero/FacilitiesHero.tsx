'use client';

import Link from 'next/link';
import BookConsultationButton from '@/components/ui/BookConsultationButton';
import Image from 'next/image';
import { m } from 'framer-motion';
import Section from '@/components/ui/Section';
import Container from '@/components/ui/Container';
import { fadeUp, stagger } from '@/lib/motion';
import styles from './FacilitiesHero.module.css';

export default function FacilitiesHero() {
  return (
    <Section variant="dark" data-section-theme="dark" className={styles.hero}>
      {/* Background image */}
      <div className={styles.bgWrap}>
        <Image
          src="/images/location1.jpg"
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
            Our Facilities
          </m.h1>
          <m.p className={styles.subheading} variants={fadeUp}>
            The One Clinic is a purpose built facility that takes care of all your needs.
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
