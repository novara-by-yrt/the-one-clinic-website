'use client';

import BookConsultationButton from '@/components/ui/BookConsultationButton';
import Image from 'next/image';
import { m } from 'framer-motion';
import { fadeUp, stagger, VIEWPORT } from '@/lib/motion';
import Container from '@/components/ui/Container';
import LeadForm from '@/components/sections/LeadForm';
import styles from './page.module.css';

const STATS = [
  { value: 'FRCP', label: 'Royal College Physician' },
  { value: 'FHEA', label: 'Higher Education Fellow' },
  { value: 'Rheumatology', label: 'Consultant Specialist' },
];

const SPECIALTIES = [
  'Rheumatoid Arthritis',
  'Psoriatic Arthritis',
  'Ankylosing Spondylitis',
  'Osteoarthritis',
  'Connective Tissue Diseases',
  'Metabolic Bone Disorders',
];

const BIO = [
  'Dr Veena Patel is a Consultant Rheumatologist at Nuffield Health Leicester Hospital and also works at the University Hospital of Leicester.',
  'As a specialist, she has extensive experience in managing conditions such as rheumatoid arthritis, psoriatic arthritis, ankylosing spondylitis (commonly presenting as back pains), soft tissue rheumatism, connective tissue diseases, metabolic bone disorders, osteoporosis, muscle disorders and osteoarthritis.',
  'She regularly teaches both undergraduate and postgraduate medical students. She has published many papers in peer-reviewed journals and has the title of Senior Lecturer (Honorary) at the University of Leicester.',
];

export default function DrVeenaPatelPage() {
  return (
    <>
      {/* ─────────────────────────────────────────
          HERO ,  text left, photo right
      ───────────────────────────────────────── */}
      <section className={styles.hero} data-section-theme="dark">
        <Container>
          <m.div
            className={styles.heroGrid}
            variants={stagger(0.1)}
            initial="hidden"
            animate="show"
          >
            {/* Left, text content */}
            <div className={styles.heroLeft}>
              <m.div className={styles.heroText} variants={stagger(0.08)}>
                <m.h1 className={styles.name} variants={fadeUp}>
                  Dr Veena<br />Patel
                </m.h1>
                <m.p className={styles.credentials} variants={fadeUp}>
                  MBBS, MEd, FHEA, FRCP
                </m.p>
                <m.p className={styles.role} variants={fadeUp}>
                  Consultant Rheumatologist
                </m.p>
              </m.div>

              <m.div className={styles.heroCtas} variants={fadeUp}>
                <BookConsultationButton className={styles.btnPrimary}>
                  Book Consultation
                </BookConsultationButton>
              </m.div>
            </div>

            {/* Right, photo */}
            <m.div className={styles.heroPhoto} variants={fadeUp}>
              <Image
                src="/DR-VEENA-PATEL.jpg"
                alt="Dr Veena Patel"
                fill
                priority
                className={styles.photo}
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 300px, 380px"
                quality={90}
              />
            </m.div>
          </m.div>
        </Container>
      </section>

      {/* ─────────────────────────────────────────
          STATS STRIP ,  dark
      ───────────────────────────────────────── */}
      <section className={styles.statsSection} data-section-theme="dark">
        <Container>
          <m.div
            className={styles.statsRow}
            variants={stagger(0.1)}
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
          >
            {STATS.map((s) => (
              <m.div key={s.label} className={styles.stat} variants={fadeUp}>
                <span className={styles.statValue}>{s.value}</span>
                <span className={styles.statLabel}>{s.label}</span>
              </m.div>
            ))}
          </m.div>
        </Container>
      </section>

      {/* ─────────────────────────────────────────
          BIO ,  light
      ───────────────────────────────────────── */}
      <section className={styles.bioSection} data-section-theme="light">
        <Container>
          <m.div
            className={styles.bioLayout}
            variants={stagger(0.1)}
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
          >
            {/* Sidebar label */}
            <m.aside className={styles.bioSidebar} variants={fadeUp}>
              <p className={styles.sidebarLabel}>About</p>
              <div className={styles.sidebarLine} />
            </m.aside>

            {/* Body text */}
            <m.div className={styles.bioBody} variants={stagger(0.08)}>
              {BIO.map((para, i) => (
                <m.p key={i} className={styles.bio} variants={fadeUp}>
                  {para}
                </m.p>
              ))}

              {/* Specialties */}
              <m.div className={styles.specialtiesWrap} variants={fadeUp}>
                <p className={styles.specialtiesLabel}>Areas of Expertise</p>
                <div className={styles.tags}>
                  {SPECIALTIES.map((s) => (
                    <span key={s} className={styles.tag}>{s}</span>
                  ))}
                </div>
              </m.div>
            </m.div>
          </m.div>
        </Container>
      </section>

      {/* ─────────────────────────────────────────
          BOOK CTA ,  dark
      ───────────────────────────────────────── */}
      <section className={styles.ctaSection} data-section-theme="dark">
        <Container>
          <m.div
            className={styles.ctaInner}
            variants={stagger(0.1)}
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
          >
            <m.p className={styles.ctaEyebrow} variants={fadeUp}>
              Ready to begin?
            </m.p>
            <m.h2 className={styles.ctaHeading} variants={fadeUp}>
              Book a Consultation<br />with Dr Patel
            </m.h2>
            <m.p className={styles.ctaSubtext} variants={fadeUp}>
              Take the first step towards exceptional care. Our team will be in touch to
              confirm your appointment.
            </m.p>
            <m.div variants={fadeUp}>
              <BookConsultationButton className={styles.ctaBtn}>
                Book Consultation
              </BookConsultationButton>
            </m.div>
          </m.div>
        </Container>
      </section>

      <LeadForm />
    </>
  );
}
