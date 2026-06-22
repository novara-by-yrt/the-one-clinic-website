'use client';

import BookConsultationButton from '@/components/ui/BookConsultationButton';
import Image from 'next/image';
import { m } from 'framer-motion';
import { fadeUp, stagger, VIEWPORT } from '@/lib/motion';
import Container from '@/components/ui/Container';
import LeadForm from '@/components/sections/LeadForm';
import styles from './page.module.css';

const STATS = [
  { value: '20+', label: 'Years in Medicine' },
  { value: 'BCAM', label: 'British Academy Aesthetics' },
  { value: 'Advanced Aesthetics', label: 'Specialization' },
];

const SPECIALTIES = [
  'Advanced Aesthetics',
  'Dermatology',
  'Psychiatric Medicine',
  'Injectable Treatments',
  'Radiofrequency',
  'GP Services',
];

const BIO = [
  'Dr Gunjan Bedi is a highly skilled, advanced aesthetics practitioner at The One Clinic. She is a highly experienced doctor, having worked in the medical sector for over 20 years, with over 10 years service as a GP.',
  'Dr Bedi has completed extensive training in dermatology and aesthetic medicine, as well as achieving her qualifications to practice as a GP. Prior to her work in General Practice in Whitwick, Dr Bedi worked in psychiatry.',
  'She brings her passion for patient safety and patient care to her role at The One Clinic, approaching treatments with meticulous precision. Dr Bedi knows that a great result comes from vast medical knowledge combined with a good eye for detail. Her less is more attitude ensures patients receive an outcome that is natural-looking, with healthy results that last. She will take the lead in aesthetic medicine at The One Clinic and will continue to provide our patients with an appearance that benefits their overall well-being. She specialises in combining various treatment modalities, e.g. injectables with radiofrequency treatments, to achieve a more enhanced outcome for our patients.',
];

export default function DrBediPage() {
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
                  Dr Gunjan<br />Bedi
                </m.h1>
                <m.p className={styles.credentials} variants={fadeUp}>
                  MBBS, MRCpsych, MRCGP, BCAM
                </m.p>
                <m.p className={styles.role} variants={fadeUp}>
                  Advanced Aesthetics Practitioner
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
                src="/DR-GUNJAN.jpg"
                alt="Dr Gunjan Bedi"
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
              Book a Consultation<br />with Dr Bedi
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
