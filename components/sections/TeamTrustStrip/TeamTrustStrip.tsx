'use client';

import { m } from 'framer-motion';
import Section from '@/components/ui/Section';
import Container from '@/components/ui/Container';
import { stagger, fadeIn, VIEWPORT } from '@/lib/motion';
import styles from './TeamTrustStrip.module.css';

const ITEMS = [
  'GMC Registered',
  '45+ Years Experience',
  'Highly Qualified Team',
];

export default function TeamTrustStrip() {
  return (
    <Section variant="light" data-section-theme="light" className={styles.strip}>
      <Container>
        <m.ul
          className={styles.list}
          variants={stagger(0.08)}
          initial="hidden"
          whileInView="show"
          viewport={VIEWPORT}
          role="list"
          aria-label="Team trust indicators"
        >
          {ITEMS.map((text) => (
            <m.li key={text} className={styles.item} variants={fadeIn}>
              <span className={styles.check} aria-hidden="true">
                <span className={styles.checkMark} />
              </span>
              <span className={styles.label}>{text}</span>
            </m.li>
          ))}
        </m.ul>
      </Container>
    </Section>
  );
}
