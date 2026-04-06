'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
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
            Our Team
          </motion.h1>
          <motion.p className={styles.subheading} variants={fadeUp}>
            Meet the experts behind your care
          </motion.p>
          <motion.div className={styles.ctas} variants={fadeUp}>
            <Link href="#lead-form" className={styles.btnPrimary}>
              Book Consultation
            </Link>
            <Link href="#lead-form" className={styles.btnSecondary}>
              Contact Us
            </Link>
          </motion.div>
        </motion.div>
      </Container>
    </Section>
  );
}
