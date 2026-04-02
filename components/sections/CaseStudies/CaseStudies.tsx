'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Section from '@/components/ui/Section';
import Container from '@/components/ui/Container';
import { fadeUp, stagger, VIEWPORT } from '@/lib/motion';
import styles from './CaseStudies.module.css';

const CASES = [
  {
    treatment: 'Weight Management',
    area:       '12-Week Programme',
    outcome:    'Patient achieved sustained weight loss through a medically supervised plan combining nutrition, medication, and lifestyle coaching.',
    tag:        'Long-Term Results',
  },
  {
    treatment: 'Skin Resurfacing',
    area:       'Full Face',
    outcome:    'Visible reduction in acne scarring and uneven texture. Patient regained confidence within weeks of treatment.',
    tag:        null,
  },
  {
    treatment: 'Holistic Health Review',
    area:       'GP & Wellbeing',
    outcome:    'Comprehensive health screening identified early risk factors. Patient now manages their condition proactively with ongoing clinic support.',
    tag:        'Patient-First Approach',
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
            Real Transformations
          </motion.h2>
          <motion.p className={styles.subtext} variants={fadeUp}>
            Helping patients achieve confidence and long-term results — one
            personalised treatment at a time.
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
