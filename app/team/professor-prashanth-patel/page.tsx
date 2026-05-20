'use client';

import Link from 'next/link';
import BookConsultationButton from '@/components/ui/BookConsultationButton';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { fadeUp, stagger, VIEWPORT } from '@/lib/motion';
import Container from '@/components/ui/Container';
import LeadForm from '@/components/sections/LeadForm';
import styles from './page.module.css';

const STATS = [
  { value: 'FRCPath, FRCP', label: 'Royal College Fellow' },
  { value: 'Head of Service', label: 'Chemical Pathology' },
  { value: '15+', label: 'Years Consultant' },
];

const SPECIALTIES = [
  'Metabolic Bone Disease',
  'Osteoporosis Management',
  'Vitamin D Disorders',
  'Parathyroid Disorders',
  'Lipid Disorders',
  'Cardiovascular Prevention',
];

const BIO = [
  'Professor Prashanth Patel is a Consultant Metabolic Physician and Chemical Pathologist at the University Hospitals of Leicester. His clinical interests are in the management of metabolic bone disease, osteoporosis, vitamin D disorders, parathyroid disorders and the management of health cholesterol and other lipid disorders.',
  'He is Head of Service for the Department of Chemical Pathology and Metabolic Medicine at UHL. He is Chair of the Leicester Osteoporosis Group and the Clinical lead for Metabolic Bone Disease at UHL.',
  'In addition to his clinical work, he also works as an honorary senior lecturer in Cardiovascular Science and is a Clinical Teacher in Metabolic Medicine and Chemical Pathology at the University of Leicester. His research interests include metabolic bone disorders, cholesterol, hypertension and prevention of cardiovascular diseases. He has published numerous papers in these fields and holds an honorary senior lecturer position in the Department of Cardiovascular Science at the University of Leicester.',
];

export default function ProfessorPrashanathPatelPage() {
  return (
    <>
      {/* ─────────────────────────────────────────
          HERO ,  text left, photo right
      ───────────────────────────────────────── */}
      <section className={styles.hero} data-section-theme="dark">
        <Container>
          <motion.div
            className={styles.heroGrid}
            variants={stagger(0.1)}
            initial="hidden"
            animate="show"
          >
            {/* Left, text content */}
            <div className={styles.heroLeft}>
              <motion.div variants={fadeUp}>
                <Link href="/our-team" className={styles.back}>
                  <span aria-hidden="true">←</span> Our Team
                </Link>
              </motion.div>

              <motion.div className={styles.heroText} variants={stagger(0.08)}>
                <motion.p className={styles.eyebrow} variants={fadeUp}>
                  The One Clinic
                </motion.p>
                <motion.h1 className={styles.name} variants={fadeUp}>
                  Professor<br />Prashanth Patel
                </motion.h1>
                <motion.p className={styles.credentials} variants={fadeUp}>
                  MBBS, MSc, FRCPath, FRCP Edin
                </motion.p>
                <motion.p className={styles.role} variants={fadeUp}>
                  Consultant Metabolic Physician &amp; Chemical Pathologist
                </motion.p>
              </motion.div>

              <motion.div className={styles.heroCtas} variants={fadeUp}>
                <BookConsultationButton className={styles.btnPrimary}>
                  Book Consultation
                </BookConsultationButton>
                <Link href="/our-team" className={styles.btnGhost}>
                  View All Team
                </Link>
              </motion.div>
            </div>

            {/* Right, photo */}
            <motion.div className={styles.heroPhoto} variants={fadeUp}>
              <Image
                src="/images/Dr. Prashanth Patel-image.png"
                alt="Professor Prashanth Patel"
                fill
                priority
                className={styles.photo}
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 300px, 400px"
              />
            </motion.div>
          </motion.div>
        </Container>
      </section>

      {/* ─────────────────────────────────────────
          STATS STRIP ,  dark
      ───────────────────────────────────────── */}
      <section className={styles.statsSection} data-section-theme="dark">
        <Container>
          <motion.div
            className={styles.statsRow}
            variants={stagger(0.1)}
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
          >
            {STATS.map((s) => (
              <motion.div key={s.label} className={styles.stat} variants={fadeUp}>
                <span className={styles.statValue}>{s.value}</span>
                <span className={styles.statLabel}>{s.label}</span>
              </motion.div>
            ))}
          </motion.div>
        </Container>
      </section>

      {/* ─────────────────────────────────────────
          BIO ,  light
      ───────────────────────────────────────── */}
      <section className={styles.bioSection} data-section-theme="light">
        <Container>
          <motion.div
            className={styles.bioLayout}
            variants={stagger(0.1)}
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
          >
            {/* Sidebar label */}
            <motion.aside className={styles.bioSidebar} variants={fadeUp}>
              <p className={styles.sidebarLabel}>About</p>
              <div className={styles.sidebarLine} />
            </motion.aside>

            {/* Body text */}
            <motion.div className={styles.bioBody} variants={stagger(0.08)}>
              {BIO.map((para, i) => (
                <motion.p key={i} className={styles.bio} variants={fadeUp}>
                  {para}
                </motion.p>
              ))}

              {/* Specialties */}
              <motion.div className={styles.specialtiesWrap} variants={fadeUp}>
                <p className={styles.specialtiesLabel}>Areas of Expertise</p>
                <div className={styles.tags}>
                  {SPECIALTIES.map((s) => (
                    <span key={s} className={styles.tag}>{s}</span>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        </Container>
      </section>

      {/* ─────────────────────────────────────────
          BOOK CTA ,  dark
      ───────────────────────────────────────── */}
      <section className={styles.ctaSection} data-section-theme="dark">
        <Container>
          <motion.div
            className={styles.ctaInner}
            variants={stagger(0.1)}
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
          >
            <motion.p className={styles.ctaEyebrow} variants={fadeUp}>
              Ready to begin?
            </motion.p>
            <motion.h2 className={styles.ctaHeading} variants={fadeUp}>
              Book a Consultation<br />with Professor Patel
            </motion.h2>
            <motion.p className={styles.ctaSubtext} variants={fadeUp}>
              Take the first step towards exceptional care. Our team will be in touch to
              confirm your appointment.
            </motion.p>
            <motion.div variants={fadeUp}>
              <BookConsultationButton className={styles.ctaBtn}>
                Book Consultation
              </BookConsultationButton>
            </motion.div>
          </motion.div>
        </Container>
      </section>

      <LeadForm />
    </>
  );
}
