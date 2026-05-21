'use client';

import BookConsultationButton from '@/components/ui/BookConsultationButton';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { fadeUp, stagger, VIEWPORT } from '@/lib/motion';
import Container from '@/components/ui/Container';
import LeadForm from '@/components/sections/LeadForm';
import styles from './page.module.css';

const STATS = [
  { value: '30+', label: 'Years in Surgery' },
  { value: 'FRCS', label: 'Royal College of Surgeons' },
  { value: 'Colorectal', label: 'Sub-speciality' },
];

const SPECIALTIES = [
  'Colorectal Cancer',
  'Hernia Surgery',
  'Haemorrhoid Treatment',
  'Anal Fissure Surgery',
  'Gallbladder Surgery',
  'Laparoscopic Surgery',
];

const BIO = [
  'Mr Ashish Kelkar is a mightily experienced and highly regarded consultant general and colorectal surgeon who specialises in colorectal cancer, rectal bleeding, haemorrhoids, hernias and hernia surgery, anal fissures, and gallbladder surgery. He is currently practising at the Woodlands Hospital in Kettering.',
  'Mr Kelkar, who also possesses expertise in inflammatory bowel disease, rectal prolapse surgery, and pelvic floor function, successfully completed an MBBS in medicine at the Seth GS Medical College and King Edward Memorial Hospital in Mumbai in 1991, and shortly afterwards followed this up by obtaining a masters in surgery from the King Edward Memorial Hospital in 1995.',
  'Mr Kelkar is also an expert when it comes to performing both laparoscopic surgery and open cholecystectomies. He is a member of the Royal College of Surgeons of Edinburgh and has published an extensive amount of peer-reviewed articles in well-established medical journals, with a particular focus on colorectal cancer and lymph node retrieval in colorectal cancer patients.',
];

export default function MrAshishKelkarPage() {
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
                  Mr Ashish<br />Kelkar
                </motion.h1>
                <motion.p className={styles.credentials} variants={fadeUp}>
                  MBBS, MS, FRCS
                </motion.p>
                <motion.p className={styles.role} variants={fadeUp}>
                  Consultant General &amp; Colorectal Surgeon
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
                src="/DR-ASHISH.jpg"
                alt="Mr Ashish Kelkar"
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
              Book a Consultation<br />with Mr Kelkar
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
