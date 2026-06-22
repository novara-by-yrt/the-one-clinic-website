'use client';

import Link from 'next/link';
import BookConsultationButton from '@/components/ui/BookConsultationButton';
import Image from 'next/image';
import { m } from 'framer-motion';
import Section from '@/components/ui/Section';
import Container from '@/components/ui/Container';
import { fadeUp, stagger } from '@/lib/motion';
import styles from './TeamHero.module.css';

export default function TeamHero() {
  return (
    <Section variant="dark" data-section-theme="dark" className={styles.hero}>
      <div className={styles.bgWrap}>
        <Image
          src="/images/Doctor2.jpg"
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
            Our Team
          </m.h1>
          <m.p className={styles.subheading} variants={fadeUp}>
            Meet the experts behind your care
          </m.p>
          <m.div className={styles.ctas} variants={fadeUp}>
            <BookConsultationButton className={styles.btnPrimary}>
              Book Consultation
            </BookConsultationButton>
            <Link href="/contact" className={styles.btnSecondary}>
              Contact Us
            </Link>
          </m.div>
        </m.div>
      </Container>
    </Section>
  );
}
