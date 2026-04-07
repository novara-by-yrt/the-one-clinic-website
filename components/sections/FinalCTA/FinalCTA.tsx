'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Section from '@/components/ui/Section';
import Container from '@/components/ui/Container';
import Button from '@/components/ui/Button';
import { fadeUp, stagger, VIEWPORT } from '@/lib/motion';
import styles from './FinalCTA.module.css';

export default function FinalCTA() {
  return (
    <Section variant="dark" data-section-theme="dark" className={styles.section}>
      {/* Background image with dark overlay */}
      <div className={styles.bgWrap} aria-hidden="true">
        <Image
          src="/images/Background image.jpg"
          alt=""
          fill
          className={styles.bgImage}
          sizes="100vw"
          priority={false}
        />
        <div className={styles.overlay} />
      </div>

      <Container className={styles.container}>
        <motion.div
          className={styles.content}
          variants={stagger(0.2)}
          initial="hidden"
          whileInView="show"
          viewport={VIEWPORT}
        >
          <motion.p className={styles.eyebrow} variants={fadeUp}>
            Take the First Step
          </motion.p>
          <motion.h2 className={styles.heading} variants={fadeUp}>
            Ready to Feel
            <br />
            <em className={styles.headingAccent}>Your Best?</em>
          </motion.h2>
          <motion.p className={styles.subtext} variants={fadeUp}>
            Our team is here to help. Book your consultation today and
            take control of your health and confidence.
          </motion.p>
          <motion.div className={styles.cta} variants={fadeUp}>
            <Button variant="primary" theme="dark" onClick={() => window.dispatchEvent(new CustomEvent('openCallbackModal'))}>
              Book Your Consultation
            </Button>
          </motion.div>
        </motion.div>
      </Container>
    </Section>
  );
}
