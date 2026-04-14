'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import Container           from '@/components/ui/Container';
import Section             from '@/components/ui/Section';
import BookConsultationButton from '@/components/ui/BookConsultationButton';
import ArrivalExperience   from '@/components/sections/ArrivalExperience';
import Process             from '@/components/sections/Process';
import TestimonialVideos   from '@/components/sections/TestimonialVideos';
import Testimonials        from '@/components/sections/Testimonials';
import CaseStudies         from '@/components/sections/CaseStudies';
import MeetTheExperts      from '@/components/sections/MeetTheExperts';
import LeadForm            from '@/components/sections/LeadForm';
import { fadeUp, stagger, VIEWPORT } from '@/lib/motion';
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
          YOUR CONSULTATION
      ════════════════════════════════════════ */}
      <Section variant="light" data-section-theme="light">
        <Container>
          <motion.div
            className={styles.consultGrid}
            variants={stagger(0.12)}
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
          >
            {/* Text */}
            <motion.div className={styles.consultText} variants={stagger(0.1)}>
              <motion.p className={styles.consultEyebrow} variants={fadeUp}>
                Your Journey Begins
              </motion.p>
              <motion.h2 className={styles.consultHeading} variants={fadeUp}>
                Your Consultation
              </motion.h2>
              <motion.p className={styles.consultPara} variants={fadeUp}>
                [PASTE YOUR CONSULTATION TEXT HERE]
              </motion.p>
            </motion.div>

            {/* Image */}
            <motion.div className={styles.consultImageWrap} variants={fadeUp}>
              <Image
                src="/images/Private GP.jpg"
                alt="Consultation at The One Clinic Leicester"
                fill
                className={styles.consultImage}
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </motion.div>
          </motion.div>
        </Container>
      </Section>

      {/* ════════════════════════════════════════
          YOUR JOURNEY — PROCESS STEPS
      ════════════════════════════════════════ */}
      <Process />

      {/* ════════════════════════════════════════
          ARRIVAL EXPERIENCE
      ════════════════════════════════════════ */}
      <ArrivalExperience />

      {/* ════════════════════════════════════════
          PATIENT VIDEO TESTIMONIALS
      ════════════════════════════════════════ */}
      <TestimonialVideos />

      {/* ════════════════════════════════════════
          GOOGLE REVIEWS
      ════════════════════════════════════════ */}
      <Testimonials />

      {/* ════════════════════════════════════════
          BEFORE & AFTER RESULTS
      ════════════════════════════════════════ */}
      <CaseStudies />

      {/* ════════════════════════════════════════
          MEET THE EXPERTS
      ════════════════════════════════════════ */}
      <MeetTheExperts />

      {/* ════════════════════════════════════════
          LEAD FORM
      ════════════════════════════════════════ */}
      <div id="contact">
        <LeadForm />
      </div>
    </>
  );
}
