'use client';

import BookConsultationButton from '@/components/ui/BookConsultationButton';
import Image from 'next/image';
import { m } from 'framer-motion';
import { fadeUp, stagger, VIEWPORT } from '@/lib/motion';
import Container from '@/components/ui/Container';
import LeadForm from '@/components/sections/LeadForm';
import styles from './page.module.css';

const STATS = [
  { value: '10+', label: 'Years in Sports Medicine' },
  { value: 'International Fellowship', label: 'Advanced Training' },
  { value: 'Orthopaedic Surgeon', label: 'Specialization' },
];

const SPECIALTIES = [
  'ACL Reconstruction',
  'Meniscal Repair',
  'Knee Osteoarthritis',
  'Hip Arthroscopy',
  'Achilles Tendon Surgery',
  'Sports Injury Management',
];

const BIO = [
  'Mr Randeep Aujla is an Internationally fellowship-trained Consultant Orthopaedic Surgeon with a specialist interest in knee conditions and lower limb sporting injuries. His NHS practice is based at the University Hospitals of Leicester and private practice at Spire (Leicester) and Nuffield Health (Leicester).',
  'Specialising in ACL and multi-ligament knee reconstructions, meniscal tears, knee preservation surgery, knee osteoarthritis, hip arthroscopy, Achilles tendon issues, and tendinopathy, Mr Aujla has worked within elite sport since 2014. He has worked with many professional clubs including a 5-year stint as lead club doctor for Coventry City Football Club.',
  'His medical sporting involvement also includes professional cricket (Loughborough Lightning), professional rugby (Coventry Rugby), mixed martial arts, and multi-sport games (European Games; BUCS; School Games). Mr Aujla relishes the opportunity to treat athletes, is very rehabilitation-focused, and works hard to maximise patient function through many treatment modalities including liaising closely with physiotherapists.',
];

export default function MrRandeepAujlaPage() {
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
                  Mr Randeep<br />Aujla
                </m.h1>
                <m.p className={styles.credentials} variants={fadeUp}>
                  MBChB
                </m.p>
                <m.p className={styles.role} variants={fadeUp}>
                  Consultant Orthopaedic Surgeon
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
                src="/MR-RANDEEP-S.-AUJLA.jpg"
                alt="Mr Randeep Aujla"
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
              Book a Consultation<br />with Mr Aujla
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
