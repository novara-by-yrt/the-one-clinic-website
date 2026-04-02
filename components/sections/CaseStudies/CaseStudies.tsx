'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Section from '@/components/ui/Section';
import Container from '@/components/ui/Container';
import { fadeUp, stagger, VIEWPORT } from '@/lib/motion';
import styles from './CaseStudies.module.css';

const CASES = [
  {
    treatment: 'Anti-Wrinkle',
    area:       'Forehead & Eyes',
    outcome:    'Lines visibly softened within 72 hours. Natural, refreshed appearance maintained for 4 months.',
    tag:        'Most Popular',
  },
  {
    treatment: 'Dermal Fillers',
    area:       'Lips & Cheeks',
    outcome:    'Restored volume and symmetry with a result the patient described as "exactly what I wanted".',
    tag:        null,
  },
  {
    treatment: 'Laser Resurfacing',
    area:       'Full Face',
    outcome:    'Significant reduction in acne scarring and texture after a single treatment session.',
    tag:        'Dramatic Results',
  },
];

export default function CaseStudies() {
  return (
    <Section id="results" variant="dark" data-section-theme="dark">
      <Container>
        <motion.div
          className={styles.header}
          variants={stagger()}
          initial="hidden"
          whileInView="show"
          viewport={VIEWPORT}
        >
          <motion.p className={styles.eyebrow} variants={fadeUp}>
            Patient Outcomes
          </motion.p>
          <motion.h2 className={styles.heading} variants={fadeUp}>
            Real Results
          </motion.h2>
          <motion.p className={styles.subtext} variants={fadeUp}>
            Every result is real, every patient is unique. See the transformations our treatments deliver.
          </motion.p>
        </motion.div>

        <motion.div
          className={styles.grid}
          variants={stagger(0.12)}
          initial="hidden"
          whileInView="show"
          viewport={VIEWPORT}
        >
          {CASES.map((c) => (
            <motion.article key={c.treatment + c.area} className={styles.card} variants={fadeUp}>
              {/* Image placeholder */}
              <div className={styles.imagePlaceholder} aria-label={`Before and after: ${c.treatment}`}>
                <span className={styles.placeholderLabel}>Before / After</span>
              </div>

              <div className={styles.body}>
                {c.tag && <span className={styles.tag}>{c.tag}</span>}
                <h3 className={styles.cardTitle}>{c.treatment}</h3>
                <p className={styles.area}>{c.area}</p>
                <p className={styles.outcome}>{c.outcome}</p>
              </div>
            </motion.article>
          ))}
        </motion.div>

        <motion.div
          className={styles.cta}
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={VIEWPORT}
        >
          <Link href="#contact" className={styles.ctaLink}>
            View All Results
            <span aria-hidden="true" className={styles.arrow}>→</span>
          </Link>
        </motion.div>
      </Container>
    </Section>
  );
}
