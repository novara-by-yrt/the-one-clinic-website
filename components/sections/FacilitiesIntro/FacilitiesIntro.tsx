'use client';

import { m } from 'framer-motion';
import Section from '@/components/ui/Section';
import Container from '@/components/ui/Container';
import { fadeUp, stagger, VIEWPORT } from '@/lib/motion';
import styles from './FacilitiesIntro.module.css';

const PILLARS = [
  { label: 'Heritage Building', value: '19th Century' },
  { label: 'Location', value: 'Leicester, UK' },
  { label: 'Clinical Floors', value: '3 Floors' },
  { label: 'Parking', value: '15 Spaces' },
];

export default function FacilitiesIntro() {
  return (
    <Section variant="light" data-section-theme="light">
      <Container>
        <div className={styles.layout}>
          {/* Left, text */}
          <m.div
            className={styles.textCol}
            variants={stagger(0.1)}
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
          >
            <m.p className={styles.eyebrow} variants={fadeUp}>
              About Our Clinic
            </m.p>
            <m.h2 className={styles.heading} variants={fadeUp}>
              Our Facilities
            </m.h2>
            <m.p className={styles.body} variants={fadeUp}>
              Behind our charming 19th Century building you&apos;ll find convenient parking which has
              space for 15 cars. Patients can feel safe in the knowledge that as a CQC registered
              clinic, every step has been taken to ensure their safety, as well as using ICU data
              protection and adhering to GDPR guidance.
            </m.p>
            <m.p className={styles.body} variants={fadeUp}>
              Our reception area is located at the front of the building, where our front-of-house
              representative will book you in. You&apos;ll be offered some refreshments while you wait
              for treatment, and you&apos;ll be shown our &lsquo;skincare bar&rsquo; where we display a collection
              of the products available at our clinic, which you are free to sample.
            </m.p>
          </m.div>

          {/* Right, fact card */}
          <m.div
            className={styles.cardCol}
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
          >
            <div className={styles.factCard}>
              <p className={styles.cardEyebrow}>At a Glance</p>
              <ul className={styles.pillars} role="list">
                {PILLARS.map((p) => (
                  <li key={p.label} className={styles.pillar}>
                    <span className={styles.pillarValue}>{p.value}</span>
                    <span className={styles.pillarLabel}>{p.label}</span>
                  </li>
                ))}
              </ul>
              <div className={styles.cardDivider} />
              <p className={styles.cardQuote}>
                &ldquo;A space that inspires confidence before your consultation even begins.&rdquo;
              </p>
            </div>
          </m.div>
        </div>
      </Container>
    </Section>
  );
}
