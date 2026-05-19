'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Section from '@/components/ui/Section';
import Container from '@/components/ui/Container';
import Button from '@/components/ui/Button';
import { fadeUp, staggerLeft, VIEWPORT } from '@/lib/motion';
import styles from './BrandBenefits.module.css';

const EASE = [0.25, 0.1, 0.25, 1] as const;

export default function BrandBenefits() {
  return (
    <Section variant="light" data-section-theme="light" className={styles.section}>
      <Container>
        <div className={styles.layout}>

          {/* ══════════════════════════════════
              LEFT , oversized editorial text
          ══════════════════════════════════ */}
          <motion.div
            className={styles.textCol}
            variants={staggerLeft(0.1)}
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
          >
            <motion.p className={styles.eyebrow} variants={fadeUp}>
              Why Choose Us
            </motion.p>

            {/* Oversized heading , editorial luxury scale */}
            <motion.h2 className={styles.heading} variants={fadeUp}>
              Care&shy;fully<br />
              considered.<br />
              <em className={styles.headingEm}>Genuinely</em><br />
              <span className={styles.headingDark}>yours.</span>
            </motion.h2>

            <motion.div className={styles.rule} variants={fadeUp} aria-hidden="true" />

            <motion.p className={styles.subtext} variants={fadeUp}>
              Every patient receives genuine attention and a tailored plan built
              around their health, goals and lifestyle.
            </motion.p>

            <motion.div variants={fadeUp}>
              <Button
                variant="primary"
                theme="light"
                onClick={() => window.dispatchEvent(new CustomEvent('openBookConsultationModal'))}
              >
                Book a Consultation
              </Button>
            </motion.div>
          </motion.div>

          {/* ══════════════════════════════════
              RIGHT , layered image + float cards
          ══════════════════════════════════ */}
          <motion.div
            className={styles.imageCol}
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={VIEWPORT}
            transition={{ duration: 0.95, ease: EASE }}
          >
            <div className={styles.canvasWrap}>

              {/* ── Clipped canvas: hero image only ───── */}
              <div className={styles.canvas}>
                <div className={styles.imgMain}>
                  <Image
                    src="/images/imgi_78_GTR_0328-1-1.jpg"
                    alt="The One Clinic team"
                    fill
                    className={styles.img}
                    sizes="(max-width: 900px) 100vw, 55vw"
                    priority
                  />
                  <div className={styles.imgGrad} />
                </div>
              </div>

              {/* ── Secondary framed image (outside canvas , shadow preserved) ── */}
              <motion.div
                className={styles.imgSecondary}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={VIEWPORT}
                transition={{ duration: 0.85, ease: EASE, delay: 0.28 }}
              >
                <Image
                  src="/images/Doctor2.jpg"
                  alt="Doctor at The One Clinic"
                  fill
                  className={styles.img}
                  sizes="(max-width: 900px) 50vw, 26vw"
                />
              </motion.div>

              {/* ── Float card 1: Doctor-Led (top-left) ── */}
              <motion.div
                className={`${styles.card} ${styles.card1}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={VIEWPORT}
                transition={{ duration: 0.6, ease: EASE, delay: 0.44 }}
                whileHover={{ y: -6, transition: { duration: 0.2 } }}
              >
                <span className={styles.cardIcon} aria-hidden="true">
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M2.5 7.5l2.5 2.5 6.5-6.5" stroke="currentColor"
                      strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </span>
                <div>
                  <p className={styles.cardTitle}>Doctor-Led</p>
                  <p className={styles.cardSub}>Every treatment</p>
                </div>
              </motion.div>

              {/* ── Float card 2: stat (bottom-right) ─── */}
              <motion.div
                className={`${styles.card} ${styles.card2}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={VIEWPORT}
                transition={{ duration: 0.6, ease: EASE, delay: 0.58 }}
                whileHover={{ y: -6, transition: { duration: 0.2 } }}
              >
                <p className={styles.cardBigNum}>2000+</p>
                <p className={styles.cardSub}>Patients Treated</p>
              </motion.div>

            </div>
          </motion.div>

        </div>
      </Container>
    </Section>
  );
}
