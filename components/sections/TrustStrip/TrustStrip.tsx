'use client';

import { motion } from 'framer-motion';
import Section from '@/components/ui/Section';
import Container from '@/components/ui/Container';
import { fadeIn, stagger, VIEWPORT } from '@/lib/motion';
import styles from './TrustStrip.module.css';

const ITEMS = [
  'Led by highly trained doctors',
  'Trusted by patients in Leicester',
  'Comprehensive medical & aesthetic care',
];

export default function TrustStrip() {
  return (
    <Section variant="light" data-section-theme="light" className={styles.strip}>
      <Container>
        <motion.ul
          className={styles.list}
          variants={stagger(0.08)}
          initial="hidden"
          whileInView="show"
          viewport={VIEWPORT}
          role="list"
          aria-label="Trust indicators"
        >
          {ITEMS.map((text) => (
            <motion.li key={text} className={styles.item} variants={fadeIn}>
              <span className={styles.check} aria-hidden="true">
                <span className={styles.checkMark} />
              </span>
              <span className={styles.label}>{text}</span>
            </motion.li>
          ))}
        </motion.ul>
      </Container>
    </Section>
  );
}
