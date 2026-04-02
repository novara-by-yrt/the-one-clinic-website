'use client';

import { motion } from 'framer-motion';
import Section from '@/components/ui/Section';
import Container from '@/components/ui/Container';
import Button from '@/components/ui/Button';
import { fadeUp, stagger, VIEWPORT } from '@/lib/motion';
import styles from './FinalCTA.module.css';

export default function FinalCTA() {
  return (
    <Section variant="dark" data-section-theme="dark" className={styles.section}>
      <Container>
        <motion.div
          className={styles.content}
          variants={stagger(0.2)}
          initial="hidden"
          whileInView="show"
          viewport={VIEWPORT}
        >
          <motion.p className={styles.eyebrow} variants={fadeUp}>
            Ready to Begin?
          </motion.p>
          <motion.h2 className={styles.heading} variants={fadeUp}>
            Begin Your
            <br />
            <em className={styles.headingAccent}>Transformation</em>
          </motion.h2>
          <motion.p className={styles.subtext} variants={fadeUp}>
            Take the first step. Your free consultation is waiting.
          </motion.p>
          <motion.div className={styles.cta} variants={fadeUp}>
            <Button variant="primary" theme="dark">
              Book Free Consultation
            </Button>
          </motion.div>
        </motion.div>
      </Container>
    </Section>
  );
}
