'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Section from '@/components/ui/Section';
import Container from '@/components/ui/Container';
import FinalCTA from '@/components/sections/FinalCTA';
import { fadeUp, stagger, VIEWPORT } from '@/lib/motion';
import styles from './page.module.css';

const MISSION_POINTS = [
  {
    icon: '🔬',
    title: 'Clean Medical-Grade Science',
    desc: 'Pioneering professionally dispensed skincare with the cleanest formulations scientifically available.',
  },
  {
    icon: '🌍',
    title: 'Global Network',
    desc: 'Over 4,500 trusted clinics worldwide, delivering authentic, professional-grade skincare.',
  },
  {
    icon: '✨',
    title: 'Transformative Results',
    desc: 'Clinically proven ingredients combined with advanced technologies for visible, lasting improvements.',
  },
];

const JOURNEY_STEPS = [
  {
    n: '01',
    year: '2016',
    title: 'Brand Launch',
    desc: 'AlumierMD launched to pioneer clean, medical-grade skincare with uncompromising scientific standards.',
  },
  {
    n: '02',
    year: '2016-2019',
    title: 'Innovation & Development',
    desc: 'Developed patented anti-diversion technology ensuring authentic products exclusively through qualified professionals.',
  },
  {
    n: '03',
    year: '2020-Present',
    title: 'Global Expansion',
    desc: 'Became one of the fastest-growing professionally dispensed brands with over 4,500 partner clinics across the world.',
  },
];

const EXPERTISE_STATS = [
  { stat: '100+', label: 'Years of combined industry experience' },
  { stat: '4,500+', label: 'Partner clinics globally' },
  { stat: '2016', label: 'Year brand launched' },
];

const CATEGORIES = [
  { label: 'Cleansers',           src: '/images/Category_Cleansers.png' },
  { label: 'Facial Exfoliants',   src: '/images/Category_Exfoliants.png' },
  { label: 'Serums',              src: '/images/Category_Serums.png' },
  { label: 'Moisturisers',        src: '/images/Category_Moisturizers.png' },
  { label: 'Eye Creams & Serums', src: '/images/Category_Eye_Creams&Serums.png' },
];

export default function AlumierMDPage() {
  return (
    <>
      {/* ════════════════════════════════════════
          HERO
      ════════════════════════════════════════ */}
      <section className={styles.hero} aria-label="AlumierMD brand" data-section-theme="dark">
        <Container>
          <motion.div
            className={styles.heroInner}
            variants={stagger(0.12)}
            initial="hidden"
            animate="show"
          >
            <motion.span className={styles.heroCategory} variants={fadeUp}>
              Professional Skincare Brand
            </motion.span>

            <motion.h1 className={styles.heroTitle} variants={fadeUp}>
              AlumierMD
            </motion.h1>

            <motion.p className={styles.heroDesc} variants={fadeUp}>
              Clean, medical-grade skincare empowering you to feel confident in your own skin with
              clinically proven ingredients and advanced technologies.
            </motion.p>

            <motion.div className={styles.heroStats} variants={fadeUp}>
              {EXPERTISE_STATS.map((item, idx) => (
                <div key={idx} className={styles.statItem}>
                  <span className={styles.statValue}>{item.stat}</span>
                  <span className={styles.statLabel}>{item.label}</span>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </Container>
      </section>

      {/* ════════════════════════════════════════
          MISSION & VALUES
      ════════════════════════════════════════ */}
      <Section variant="light" className={styles.compact}>
        <Container>
          <motion.div
            className={styles.sectionHeader}
            variants={stagger(0.12)}
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
          >
            <motion.h2 className={styles.sectionTitle} variants={fadeUp}>
              Our Mission
            </motion.h2>
            <motion.p className={styles.sectionSubtitle} variants={fadeUp}>
              Empowering skin health through science-driven innovation and professional expertise
            </motion.p>
          </motion.div>

          <motion.div
            className={styles.missionGrid}
            variants={stagger(0.1)}
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
          >
            {MISSION_POINTS.map((point, idx) => (
              <motion.div key={idx} className={styles.missionCard} variants={fadeUp}>
                <h3 className={styles.missionTitle}>{point.title}</h3>
                <p className={styles.missionDesc}>{point.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </Container>
      </Section>

      {/* ════════════════════════════════════════
          CATEGORIES
      ════════════════════════════════════════ */}
      <section className={styles.categoriesSection}>
        <Container>
          <motion.div
            className={styles.categoriesHeader}
            variants={stagger(0.12)}
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
          >
            <motion.h2 className={styles.categoriesTitle} variants={fadeUp}>
              Our Product Range
            </motion.h2>
            <motion.p className={styles.categoriesSubtitle} variants={fadeUp}>
              AlumierMD offers a comprehensive range of professionally dispensed skincare across these categories
            </motion.p>
          </motion.div>

          <motion.div
            className={styles.categoriesGrid}
            variants={stagger(0.1)}
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
          >
            {CATEGORIES.map((cat, idx) => (
              <motion.div key={idx} className={styles.categoryCard} variants={fadeUp}>
                <div className={styles.categoryImageWrap}>
                  <Image
                    src={cat.src}
                    alt={cat.label}
                    fill
                    className={styles.categoryImage}
                    sizes="(max-width: 640px) 50vw, 20vw"
                  />
                </div>
                <span className={styles.categoryLabel}>{cat.label}</span>
              </motion.div>
            ))}
          </motion.div>
        </Container>
      </section>

      {/* ════════════════════════════════════════
          BRAND JOURNEY
      ════════════════════════════════════════ */}
      <Section variant="light" className={styles.compact}>
        <Container>
          <motion.div
            className={styles.sectionHeader}
            variants={stagger(0.12)}
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
          >
            <motion.h2 className={styles.sectionTitle} variants={fadeUp}>
              The AlumierMD Story
            </motion.h2>
            <motion.p className={styles.sectionSubtitle} variants={fadeUp}>
              From pioneering innovation to global leadership in professional skincare
            </motion.p>
          </motion.div>

          <motion.div
            className={styles.journeySteps}
            variants={stagger(0.12)}
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
          >
            {JOURNEY_STEPS.map((step, idx) => (
              <motion.div key={idx} className={styles.journeyCard} variants={fadeUp}>
                <div className={styles.journeyNumber}>{step.n}</div>
                <span className={styles.journeyYear}>{step.year}</span>
                <h3 className={styles.journeyTitle}>{step.title}</h3>
                <p className={styles.journeyDesc}>{step.desc}</p>
                {idx < JOURNEY_STEPS.length - 1 && <div className={styles.journeyLine} />}
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            className={styles.missionStatement}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={VIEWPORT}
            transition={{ duration: 0.6 }}
          >
            <p className={styles.missionText}>
              AlumierMD is built on a foundation of 100+ years of combined industry expertise.
              Our commitment to clean science, professional integrity, and transformative results
              has made us one of the fastest-growing professionally dispensed skincare brands globally.
            </p>
          </motion.div>
        </Container>
      </Section>

      {/* ════════════════════════════════════════
          FINAL CTA
      ════════════════════════════════════════ */}
      <FinalCTA />
    </>
  );
}
