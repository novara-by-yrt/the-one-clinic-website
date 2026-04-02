'use client';

import { motion } from 'framer-motion';
import Section from '@/components/ui/Section';
import Container from '@/components/ui/Container';
import { fadeIn, stagger, VIEWPORT } from '@/lib/motion';
import styles from './TrustStrip.module.css';

const ITEMS = [
  { value: '5.0',   label: 'Google Rating',     icon: '★★★★★' },
  { value: '2,000+', label: 'Patients Treated',  icon: null },
  { value: '10+',   label: 'Years of Expertise', icon: null },
  { value: '100%',  label: 'Clinically Proven',  icon: null },
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
          {ITEMS.map((item) => (
            <motion.li key={item.label} className={styles.item} variants={fadeIn}>
              <span className={styles.value}>
                {item.icon && <span className={styles.stars} aria-label="Five stars">{item.icon}</span>}
                {!item.icon && item.value}
              </span>
              <span className={styles.label}>{item.label}</span>
            </motion.li>
          ))}
        </motion.ul>
      </Container>
    </Section>
  );
}
