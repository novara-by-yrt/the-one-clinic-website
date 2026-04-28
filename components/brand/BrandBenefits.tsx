'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Section from '@/components/ui/Section';
import Container from '@/components/ui/Container';
import Button from '@/components/ui/Button';
import { fadeUp, fadeRight, staggerLeft, VIEWPORT } from '@/lib/motion';
import styles from './BrandBenefits.module.css';

const BENEFITS = [
  {
    number: '01',
    title: 'Expert-Led Care',
    description: 'Every service is led by experienced, qualified doctors, not aestheticians. Your safety is the priority.',
  },
  {
    number: '02',
    title: 'Everything Under One Roof',
    description: 'Medical care, aesthetics, and wellbeing in a single clinic. No referrals, no gaps, no compromise.',
  },
  {
    number: '03',
    title: 'Personalised Treatment Plans',
    description: 'Your consultation shapes everything. We build plans around your health, goals, and lifestyle.',
  },
  {
    number: '04',
    title: 'Advanced Technology',
    description: 'We use the latest clinical techniques and evidence-based treatments to deliver lasting results.',
  },
];

const EASE = [0.25, 0.1, 0.25, 1] as const;

export default function BrandBenefits() {
  return (
    <Section variant="light" data-section-theme="light" className={styles.section}>
      <Container>
        <div className={styles.layout}>

          {/* ── Left: editorial text + feature list ──────── */}
          <motion.div
            className={styles.textCol}
            variants={staggerLeft(0.08)}
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
          >
            <motion.p className={styles.eyebrow} variants={fadeUp}>
              Why Choose Us
            </motion.p>

            <motion.h2 className={styles.heading} variants={fadeUp}>
              Carefully considered.<br />
              <em className={styles.headingAccent}>Genuinely</em> yours.
            </motion.h2>

            <motion.div className={styles.rule} variants={fadeUp} aria-hidden="true" />

            <motion.p className={styles.subtext} variants={fadeUp}>
              Every patient is met with genuine attention and a step-by-step plan
              built around their health, goals and lifestyle. Here&rsquo;s what sets us apart.
            </motion.p>

            {/* Always-visible feature list — no accordion */}
            <div className={styles.features}>
              {BENEFITS.map((b) => (
                <motion.div key={b.number} className={styles.feature} variants={fadeUp}>
                  <span className={styles.featureNum}>{b.number}</span>
                  <div className={styles.featureBody}>
                    <p className={styles.featureTitle}>{b.title}</p>
                    <p className={styles.featureDesc}>{b.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div variants={fadeUp}>
              <Button
                variant="primary"
                theme="light"
                onClick={() => window.dispatchEvent(new CustomEvent('openCallbackModal'))}
              >
                Book a Consultation
              </Button>
            </motion.div>
          </motion.div>

          {/* ── Right: layered image composition ─────────── */}
          <motion.div
            className={styles.imageCol}
            variants={fadeRight}
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
          >
            <div className={styles.canvas}>

              {/* Dominant image — fills most of the canvas */}
              <div className={styles.imgMain}>
                <Image
                  src="/images/imgi_78_GTR_0328-1-1.jpg"
                  alt="The One Clinic team"
                  fill
                  className={styles.img}
                  sizes="(max-width: 900px) 100vw, 45vw"
                  priority
                />
                <div className={styles.imgOverlay} />
              </div>

              {/* Secondary image — offset lower-left, elevated with white frame */}
              <motion.div
                className={styles.imgSecondary}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={VIEWPORT}
                transition={{ duration: 0.8, ease: EASE, delay: 0.3 }}
              >
                <Image
                  src="/images/Doctor2.jpg"
                  alt="Doctor at The One Clinic"
                  fill
                  className={styles.img}
                  sizes="(max-width: 900px) 50vw, 22vw"
                />
              </motion.div>

              {/* Float card 1 — top area, doctor-led trust signal */}
              <motion.div
                className={`${styles.floatCard} ${styles.floatCard1}`}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={VIEWPORT}
                transition={{ duration: 0.65, ease: EASE, delay: 0.48 }}
                whileHover={{ y: -5, transition: { duration: 0.22 } }}
              >
                <div className={styles.floatIconWrap} aria-hidden="true">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M3 8.5l3 3 7-7" stroke="currentColor" strokeWidth="2"
                      strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <div>
                  <p className={styles.floatTitle}>Doctor-Led</p>
                  <p className={styles.floatSub}>Every treatment</p>
                </div>
              </motion.div>

              {/* Float card 2 — bottom-right, stat card */}
              <motion.div
                className={`${styles.floatCard} ${styles.floatCard2}`}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={VIEWPORT}
                transition={{ duration: 0.65, ease: EASE, delay: 0.62 }}
                whileHover={{ y: -5, transition: { duration: 0.22 } }}
              >
                <p className={styles.floatStat}>500+</p>
                <p className={styles.floatSub}>Patients treated</p>
              </motion.div>

              {/* Float card 3 — mid-left, comprehensive care */}
              <motion.div
                className={`${styles.floatCard} ${styles.floatCard3}`}
                initial={{ opacity: 0, x: -18 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={VIEWPORT}
                transition={{ duration: 0.65, ease: EASE, delay: 0.55 }}
                whileHover={{ y: -5, transition: { duration: 0.22 } }}
              >
                <div className={styles.floatIconWrap} aria-hidden="true">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <rect x="7" y="2" width="2" height="5" rx="1" fill="currentColor"/>
                    <rect x="7" y="9" width="2" height="5" rx="1" fill="currentColor"/>
                    <rect x="2" y="7" width="5" height="2" rx="1" fill="currentColor"/>
                    <rect x="9" y="7" width="5" height="2" rx="1" fill="currentColor"/>
                  </svg>
                </div>
                <div>
                  <p className={styles.floatTitle}>All Under One Roof</p>
                  <p className={styles.floatSub}>Medical &amp; aesthetics</p>
                </div>
              </motion.div>

            </div>
          </motion.div>

        </div>
      </Container>
    </Section>
  );
}
