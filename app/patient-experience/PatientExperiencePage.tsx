'use client';

import { motion } from 'framer-motion';
import Container              from '@/components/ui/Container';
import BookConsultationButton from '@/components/ui/BookConsultationButton';
import ArrivalExperience      from '@/components/sections/ArrivalExperience';
import Process                from '@/components/sections/Process';
import TestimonialVideos      from '@/components/sections/TestimonialVideos';
import Testimonials           from '@/components/sections/Testimonials';
import CaseStudies            from '@/components/sections/CaseStudies';
import MeetTheExperts         from '@/components/sections/MeetTheExperts';
import LeadForm               from '@/components/sections/LeadForm';
import { fadeUp, stagger } from '@/lib/motion';
import styles from './page.module.css';

export default function PatientExperiencePage() {
  return (
    <>
      {/* ════════════════════════════════════════
          HERO
      ════════════════════════════════════════ */}
      <section
        className={styles.hero}
        aria-label="Patient Experience, hero"
        data-section-theme="dark"
      >
        <div className={styles.heroGrid} aria-hidden="true" />

        <Container>
          <motion.div
            className={styles.heroContent}
            variants={stagger(0.15)}
            initial="hidden"
            animate="show"
          >
            <motion.span className={styles.heroEyebrow} variants={fadeUp}>
              Patient Experience
            </motion.span>

            <motion.h1 className={styles.heroTitle} variants={fadeUp}>
              The One Clinic<br />
              <span className={styles.heroTitleAccent}>Patient Experience</span>
            </motion.h1>

            <motion.p className={styles.heroDesc} variants={fadeUp}>
              Achieving a patient&apos;s happiness is why The One Clinic practises.
              We believe that each patient is entitled to their own bespoke journey,
              as it&apos;s this approach that ensures a patient&apos;s needs are
              truly fulfilled.
            </motion.p>

            <motion.div className={styles.heroCtas} variants={fadeUp}>
              <BookConsultationButton className={styles.heroCtaPrimary}>
                Book a Consultation
              </BookConsultationButton>
            </motion.div>
          </motion.div>
        </Container>
      </section>

      {/* ════════════════════════════════════════
          HOW IT WORKS — PROCESS STEPS
      ════════════════════════════════════════ */}
      <Process />

      {/* ════════════════════════════════════════
          HEAR FROM OUR PATIENTS — VIDEO TESTIMONIALS
      ════════════════════════════════════════ */}
      <TestimonialVideos />

      {/* ════════════════════════════════════════
          THE ARRIVAL EXPERIENCE
      ════════════════════════════════════════ */}
      <ArrivalExperience />

      {/* ════════════════════════════════════════
          EXCELLENT PATIENT REVIEWS
      ════════════════════════════════════════ */}
      <Testimonials />

      {/* ════════════════════════════════════════
          MEET THE EXPERTS
      ════════════════════════════════════════ */}
      <MeetTheExperts />

      {/* ════════════════════════════════════════
          REAL TRANSFORMATIONS — BEFORE & AFTER
      ════════════════════════════════════════ */}
      <CaseStudies />

      {/* ════════════════════════════════════════
          START YOUR JOURNEY TODAY — LEAD FORM
      ════════════════════════════════════════ */}
      <div id="contact">
        <LeadForm />
      </div>
    </>
  );
}
