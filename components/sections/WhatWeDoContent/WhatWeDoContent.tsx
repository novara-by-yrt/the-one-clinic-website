'use client';

import { motion } from 'framer-motion';
import Section from '@/components/ui/Section';
import Container from '@/components/ui/Container';
import BookConsultationButton from '@/components/ui/BookConsultationButton';
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
            {/* Left — text */}
            <motion.div
              className={styles.textCol}
              variants={stagger(0.1)}
              initial="hidden"
              whileInView="show"
              viewport={VIEWPORT}
            >
              <motion.p className={styles.eyebrow} variants={fadeUp}>
                About Our Clinic
              </motion.p>
              <motion.h2 className={styles.heading} variants={fadeUp}>
                What We Do
              </motion.h2>
              <motion.p className={styles.body} variants={fadeUp}>
                The One Clinic is made up of a team of esteemed medical
                professionals who believe that aesthetic medicine should be
                available to all who want it. Collectively, our doctors have a
                range of skills and knowledge, and work as a team to provide
                patients with whatever solution(s) they need.
              </motion.p>
              <motion.p className={styles.body} variants={fadeUp}>
                It is often the case that a person visits a clinic having more
                than one concern on their mind. Continuity of care means patients
                will most often be seen by the same practitioner, with whom they
                can build a long and trusted relationship. However, as our doctors
                possess their own area of specialty, we can conveniently liaise
                with another colleague to ensure the patient&apos;s entire needs
                are met.
              </motion.p>
            </motion.div>

            {/* Right — stat card */}
            <motion.div
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
            </motion.div>
          </div>
        </Container>
      </Section>

      {/* ── Section 2: Our Treatments & Commitment ───────────────── */}
      <Section variant="light" data-section-theme="light" className={styles.altSection}>
        <Container>
          <div className={`${styles.layout} ${styles.layoutReverse}`}>
            {/* Left (visually right on desktop due to reverse) — quote card */}
            <motion.div
              className={styles.cardCol}
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={VIEWPORT}
            >
              <div className={styles.factCard}>
                <p className={styles.cardEyebrow}>Our Mission</p>
                <div className={styles.cardDivider} />
                <p className={styles.missionStatement}>
                  To provide <strong>ONE CLINIC</strong> without limits,{' '}
                  <strong>ONE CLINIC</strong> that meets <strong>ALL</strong> a
                  patient&apos;s aesthetic and well-being needs.
                </p>
                <div className={styles.cardDivider} />
                <p className={styles.cardQuote}>
                  &ldquo;The treatments, technologies and techniques are selected
                  with both safety and efficiency in mind.&rdquo;
                </p>
                <motion.div variants={fadeUp}>
                  <BookConsultationButton className={styles.ctaBtn}>
                    Book Consultation
                  </BookConsultationButton>
                </motion.div>
              </div>
            </motion.div>

            {/* Right (visually left) — text */}
            <motion.div
              className={styles.textCol}
              variants={stagger(0.1)}
              initial="hidden"
              whileInView="show"
              viewport={VIEWPORT}
            >
              <motion.p className={styles.body} variants={fadeUp}>
                At The One Clinic our treatments consist of various innovative
                procedures that are used to improve all areas of the physical and
                psychological being. From facial aesthetics and weight management,
                to general health and men&apos;s well-being, we&apos;re confident
                that your treatment journey will produce a healthier, happier you.
                The treatments, technologies and techniques used at the clinic are
                selected with both safety and efficiency in mind.
              </motion.p>
              <motion.p className={styles.body} variants={fadeUp}>
                We don&apos;t make compromises when it comes to our patients&apos;
                care. We understand that overall health and well-being comes from
                within, and to ensure we achieve the best results possible, we
                need to consider the patient in depth. Our commitment to excellent
                care sees that we take a whole-patient approach to each and every
                case, ensuring we really get to know the patient which helps to
                make the right decision for treatment.
              </motion.p>
              <motion.p className={styles.body} variants={fadeUp}>
                The One Clinic prides itself on providing excellent face-to-face
                care. We ensure our patients have on-going accessibility to our
                expert doctors, facilitating an emergency service which is
                available 7 days a week. When patients come to the clinic they are
                given our email and phone details, and are encouraged to contact
                the clinic if they have questions about any of our treatments, and
                if they are at all concerned.
              </motion.p>
            </motion.div>
          </div>
        </Container>
      </Section>
    </>
  );
}
