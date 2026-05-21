'use client';

import BookConsultationButton from '@/components/ui/BookConsultationButton';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { fadeUp, stagger, VIEWPORT } from '@/lib/motion';
import Container from '@/components/ui/Container';
import LeadForm from '@/components/sections/LeadForm';
import styles from './page.module.css';

const STATS = [
  { value: '15+', label: 'Years in Medicine' },
  { value: 'MRCGP', label: 'Royal College of GPs' },
  { value: 'Aesthetic Medicine', label: 'Specialist Trained' },
];

const SPECIALTIES = [
  'Minor Surgery',
  'Skin Lesion Excision',
  'Body Contouring',
  'Hair Rejuvenation',
  'GP Services',
  'Aesthetic Medicine',
];

const BIO = [
  'Dr Sumit Virmani is co-founder of The One Clinic. He has extensive experience having worked as a medical doctor for over 15 years, with over 12 of these years working as a local GP.',
  'His particular skills are in performing minor surgery, and the excision of skin lesions. Throughout his work he has been rewarded by the help he has given to his patients. He is especially proud when a person completes their treatment feeling elated by the transformation in their appearance. This has led to a growing interest in aesthetics, particularly with body contouring procedures and hair rejuvenation.',
  'Dr Virmani is currently a locally practising GP. He aims to continue this service within his role at The One Clinic, as well as focusing on aesthetic procedures and ensuring his patients have access to a wide range of health and well-being treatments.',
];

export default function DrVirmaniPage() {
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
              <motion.div className={styles.heroText} variants={stagger(0.08)}>
                <motion.h1 className={styles.name} variants={fadeUp}>
                  Dr Sumit<br />Virmani
                </motion.h1>
                <motion.p className={styles.credentials} variants={fadeUp}>
                  MBBS, MRCGP
                </motion.p>
                <motion.p className={styles.role} variants={fadeUp}>
                  Co-Founder &amp; GP
                </motion.p>
              </motion.div>

              <motion.div className={styles.heroCtas} variants={fadeUp}>
                <BookConsultationButton className={styles.btnPrimary}>
                  Book Consultation
                </BookConsultationButton>
              </motion.div>
            </div>

            {/* Right, photo */}
            <motion.div className={styles.heroPhoto} variants={fadeUp}>
              <Image
                src="/DR-SUMIT.jpg"
                alt="Dr Sumit Virmani"
                fill
                priority
                className={styles.photo}
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 300px, 380px"
                quality={90}
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
              Book a Consultation<br />with Dr Virmani
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
