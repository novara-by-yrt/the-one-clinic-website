'use client';

import { m } from 'framer-motion';
import Section from '@/components/ui/Section';
import Container from '@/components/ui/Container';
import { fadeUp, stagger, VIEWPORT } from '@/lib/motion';
import styles from './TeamIntro.module.css';

const FACTS = [
  { value: '45+', label: 'Years Combined Experience' },
  { value: '10+',  label: 'Specialist Doctors' },
  { value: 'GMC', label: 'Registered Practitioners' },
  { value: 'CQC', label: 'Registered Clinic' },
];

export default function TeamIntro() {
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
              Our Experts
            </m.p>
            <m.h2 className={styles.heading} variants={fadeUp}>
              A Team You Can Trust
            </m.h2>
            <m.p className={styles.body} variants={fadeUp}>
              Our team is at the heart of everything we do. Fully qualified,
              GMC-registered, and trained to the highest standards, our doctors
              bring over 45 years of combined experience.
            </m.p>
            <m.p className={styles.body} variants={fadeUp}>
              From general health and private GP services to advanced medical
              aesthetics, every member of our team is committed to delivering
              exceptional, personalised care in a safe and welcoming environment.
            </m.p>
          </m.div>

          {/* Right, credentials card */}
          <m.div
            className={styles.cardCol}
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
          >
            <div className={styles.factCard}>
              <p className={styles.cardEyebrow}>Our Credentials</p>
              <ul className={styles.facts} role="list">
                {FACTS.map((f) => (
                  <li key={f.label} className={styles.fact}>
                    <span className={styles.factValue}>{f.value}</span>
                    <span className={styles.factLabel}>{f.label}</span>
                  </li>
                ))}
              </ul>
              <div className={styles.divider} />
              <p className={styles.quote}>
                &ldquo;We all appear on the GMC register and boast over 45 years
                of valuable experience between us.&rdquo;
              </p>
            </div>
          </m.div>

        </div>
      </Container>
    </Section>
  );
}
