'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import Section from '@/components/ui/Section';
import Container from '@/components/ui/Container';
import { fadeUp, fadeIn, stagger, VIEWPORT } from '@/lib/motion';
import styles from './TrustStrip.module.css';

const AWARDS = [
  {
    src: '/images/imgi_86_AM_Awards_2025-black_FINALIST-1024x704.png',
    alt: 'Aesthetic Medicine Awards 2025 Finalist',
    label: 'Aesthetic Medicine Awards',
    sublabel: 'Awards 2025 · Finalist',
    width: 1024,
    height: 704,
  },
  {
    src: '/images/imgi_35_Untitled-3-5-e1749493207346.png',
    alt: 'Aesthetics Awards Highly Commended 2025',
    label: 'Aesthetics Awards',
    sublabel: 'Highly Commended · 2025',
    width: 400,
    height: 280,
  },
];

const ITEMS = [
  { icon: '✦', text: 'Led by highly trained doctors' },
  { icon: '✦', text: 'Trusted by patients in Leicester' },
  { icon: '✦', text: 'Comprehensive medical & aesthetic care' },
];

export default function TrustStrip() {
  return (
    <Section variant="light" data-section-theme="light" className={styles.strip}>
      <Container>

        {/* ── Awards row ───────────────────────────────────── */}
        <motion.div
          className={styles.awardsRow}
          variants={stagger(0.12)}
          initial="hidden"
          whileInView="show"
          viewport={VIEWPORT}
        >
          <motion.p className={styles.sectionEyebrow} variants={fadeUp}>
            Awards &amp; Recognition
          </motion.p>

          <div className={styles.awardCards}>
            {AWARDS.map((award) => (
              <motion.div key={award.src} className={styles.awardCard} variants={fadeUp}>
                <div className={styles.awardImgWrap}>
                  <Image
                    src={award.src}
                    alt={award.alt}
                    width={award.width}
                    height={award.height}
                    style={{ height: '64px', width: 'auto', objectFit: 'contain' }}
                  />
                </div>
                <div className={styles.awardMeta}>
                  <p className={styles.awardLabel}>{award.label}</p>
                  <p className={styles.awardSublabel}>{award.sublabel}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* ── Divider ──────────────────────────────────────── */}
        <motion.div
          className={styles.ruleDivider}
          variants={fadeIn}
          initial="hidden"
          whileInView="show"
          viewport={VIEWPORT}
        />

        {/* ── Trust items grid ─────────────────────────────── */}
        <motion.div
          className={styles.trustGrid}
          variants={stagger(0.1)}
          initial="hidden"
          whileInView="show"
          viewport={VIEWPORT}
        >
          {ITEMS.map(({ icon, text }) => (
            <motion.div key={text} className={styles.trustBox} variants={fadeUp}>
              <span className={styles.trustIcon} aria-hidden="true">{icon}</span>
              <span className={styles.trustLabel}>{text}</span>
            </motion.div>
          ))}
        </motion.div>

      </Container>
    </Section>
  );
}
