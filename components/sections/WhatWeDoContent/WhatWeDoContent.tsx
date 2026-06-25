'use client';

import { m } from 'framer-motion';
import Section from '@/components/ui/Section';
import Container from '@/components/ui/Container';
import { fadeUp, stagger, VIEWPORT } from '@/lib/motion';
import styles from './WhatWeDoContent.module.css';

const PILLARS = [
  { value: 'Whole Patient', label: 'Approach to every case' },
  { value: '7 Days', label: 'Emergency access' },
  { value: '1 Clinic', label: 'All needs met here' },
  { value: 'GMC', label: 'Registered doctors' },
];

export default function WhatWeDoContent() {
  return (
    <>
      {/* ── Section 1: Who We Are ─────────────────────────────── */}
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
                What We Do
              </m.h2>
              <m.p className={styles.body} variants={fadeUp}>
                The One Clinic is made up of a team of esteemed medical
                professionals who believe that aesthetic medicine should be
                available to all who want it. Collectively, our doctors have a
                range of skills and knowledge, and work as a team to provide
                patients with whatever solution(s) they need.
              </m.p>
              <m.p className={styles.body} variants={fadeUp}>
                It is often the case that a person visits a clinic having more
                than one concern on their mind. Continuity of care means patients
                will most often be seen by the same practitioner, with whom they
                can build a long and trusted relationship. However, as our doctors
                possess their own area of specialty, we can conveniently liaise
                with another colleague to ensure the patient&apos;s entire needs
                are met.
              </m.p>
            </m.div>

            {/* Right, stat card */}
            <m.div
              className={styles.cardCol}
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={VIEWPORT}
            >
              <div className={styles.factCard}>
                <p className={styles.cardEyebrow}>Our Approach</p>
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
                  &ldquo;Our doctors possess their own area of specialty, ensuring
                  every patient&apos;s entire needs are met.&rdquo;
                </p>
              </div>
            </m.div>
          </div>
        </Container>
      </Section>

    </>
  );
}
