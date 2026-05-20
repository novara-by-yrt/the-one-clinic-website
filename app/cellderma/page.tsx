'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Section from '@/components/ui/Section';
import Container from '@/components/ui/Container';
import FinalCTA from '@/components/sections/FinalCTA';
import { fadeUp, stagger, VIEWPORT } from '@/lib/motion';
import styles from './page.module.css';

const PHILOSOPHY_POINTS = [
  {
    icon: '🔬',
    title: 'Grounded in Science',
    desc: 'Every formula is meticulously crafted with clinically active ingredients at optimal concentrations.',
  },
  {
    icon: '✨',
    title: 'Honest Communication',
    desc: 'Clear messaging, no misleading language. Only delivering integrity, efficacy, and results you can trust.',
  },
  {
    icon: '🧬',
    title: 'Premium Actives',
    desc: 'Select only the most refined and skin-compatible actives, ensuring exceptional performance with minimal irritation.',
  },
];

const DEVELOPMENT_STEPS = [
  {
    n: '01',
    title: 'The Discovery',
    desc: 'Dr. Dev Patel embarked on a journey of learning, speaking with labs globally about the latest skincare technology and formulation science.',
  },
  {
    n: '02',
    title: 'Meticulous Development',
    desc: 'Through 40+ formulations and careful refinement, Dr. Patel created luxurious, high-quality formulas that out-perform market leaders.',
  },
  {
    n: '03',
    title: 'Clinical Validation',
    desc: 'In clinical trials, even single CellDerma products showed dramatic photographic improvements in just 2-6 weeks with outstanding results.',
  },
];

export default function CellDermaPage() {
  return (
    <>
      {/* ════════════════════════════════════════
          HERO
      ════════════════════════════════════════ */}
      <section className={styles.hero} aria-label="CellDerma brand" data-section-theme="dark">
        <Container>
          <motion.div
            className={styles.heroInner}
            variants={stagger(0.12)}
            initial="hidden"
            animate="show"
          >
            <motion.span className={styles.heroCategory} variants={fadeUp}>
              Science-Driven Skincare
            </motion.span>

            <motion.h1 className={styles.heroTitle} variants={fadeUp}>
              CellDerma
            </motion.h1>

            <motion.p className={styles.heroSubtitle} variants={fadeUp}>
              Skincare Begins With Truth
            </motion.p>

            <motion.p className={styles.heroDesc} variants={fadeUp}>
              High-performance skincare formulations designed by award-winning physician Dr. Dev Patel,
              combining clinical efficacy with intelligent, science-led formulations that elevate skin health.
            </motion.p>

            <motion.div className={styles.heroCredibility} variants={fadeUp}>
              <div className={styles.credItem}>
                <span className={styles.credIcon}>🏆</span>
                <div className={styles.credText}>
                  <span className={styles.credLabel}>Award-Winning Clinic</span>
                  <span className={styles.credDesc}>Perfect Skin Solutions — Aesthetic Awards Best Clinic South England 2022 & 2024</span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </Container>
      </section>

      {/* ════════════════════════════════════════
          PHILOSOPHY
      ════════════════════════════════════════ */}
      <Section variant="light">
        <Container>
          <motion.div
            className={styles.sectionHeader}
            variants={stagger(0.12)}
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
          >
            <motion.h2 className={styles.sectionTitle} variants={fadeUp}>
              Our Philosophy
            </motion.h2>
            <motion.p className={styles.sectionSubtitle} variants={fadeUp}>
              Science-driven skincare built on integrity, efficacy, and real results
            </motion.p>
          </motion.div>

          <motion.div
            className={styles.philosophyGrid}
            variants={stagger(0.1)}
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
          >
            {PHILOSOPHY_POINTS.map((point, idx) => (
              <motion.div key={idx} className={styles.philosophyCard} variants={fadeUp}>
                <h3 className={styles.philosophyTitle}>{point.title}</h3>
                <p className={styles.philosophyDesc}>{point.desc}</p>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            className={styles.scientificApproach}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={VIEWPORT}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className={styles.approachImageWrap}>
              <Image
                src="/images/Cellderma 1.jpg"
                alt="CellDerma skincare products"
                fill
                className={styles.approachImage}
                sizes="(max-width: 768px) 100vw, 45vw"
              />
            </div>
            <div className={styles.approachContent}>
              <h3 className={styles.approachTitle}>Our Commitment to Clean Science</h3>
              <p className={styles.approachText}>
                All but two of our products are fragrance-free, eliminating potential skin sensitizers.
                We've carefully excluded harsh additives, phthalates, sulphates, parabens, and unnecessary
                ingredients that promise allure but offer little real benefit.
              </p>
              <p className={styles.approachText}>
                Every formula delivers exceptional performance with only the most refined, skin-compatible actives
                at optimal concentrations, ensuring visible, transformative results with minimal irritation.
              </p>
            </div>
          </motion.div>
        </Container>
      </Section>

      {/* ════════════════════════════════════════
          DR. PATEL'S JOURNEY
      ════════════════════════════════════════ */}
      <Section variant="light">
        <Container>
          <motion.div
            className={styles.sectionHeader}
            variants={stagger(0.12)}
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
          >
            <motion.h2 className={styles.sectionTitle} variants={fadeUp}>
              From Vision to Clinical Excellence
            </motion.h2>
            <motion.p className={styles.sectionSubtitle} variants={fadeUp}>
              Dr. Dev Patel's journey in creating high-performance skincare grounded in clinical evidence
            </motion.p>
          </motion.div>

          <motion.div
            className={styles.journeyContainer}
            variants={stagger(0.12)}
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
          >
            <motion.div className={styles.journeySteps} variants={fadeUp}>
              {DEVELOPMENT_STEPS.map((step, idx) => (
                <div key={idx} className={styles.journeyCard}>
                  <div className={styles.journeyNumber}>{step.n}</div>
                  <h3 className={styles.journeyTitle}>{step.title}</h3>
                  <p className={styles.journeyDesc}>{step.desc}</p>
                </div>
              ))}
            </motion.div>

            <motion.div className={styles.journeyHighlight} variants={fadeUp}>
              <div className={styles.journeyImageWrap}>
                <Image
                  src="/images/CellDerma 2.jpg"
                  alt="CellDerma science-driven skincare"
                  fill
                  className={styles.journeyImage}
                  sizes="(max-width: 768px) 100vw, 45vw"
                />
              </div>

              <div className={styles.highlightBox}>
                <p className={styles.highlightText}>
                  <strong>"This range is too good to only sell in our Perfect Skin Solutions clinic…
                  it needs to be available to everyone."</strong>
                </p>
                <p className={styles.highlightAuthor}>— Dr. Dev Patel</p>
              </div>

              <div className={styles.resultsBox}>
                <h4 className={styles.resultsTitle}>Real, Proven Results</h4>
                <p className={styles.resultsDesc}>
                  In clinical case studies, patients showed dramatic photographic improvements from using
                  just one CellDerma product in 2-6 weeks. Results far exceeded expectations, with clinical
                  teams amazed by the efficacy.
                </p>
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            className={styles.drPatelsExpertise}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={VIEWPORT}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div className={styles.expertiseItem}>
              <span className={styles.expertiseIcon}>👨‍⚕️</span>
              <div className={styles.expertiseContent}>
                <h4 className={styles.expertiseTitle}>Award-Winning Aesthetic Physician</h4>
                <p className={styles.expertiseDesc}>
                  Dr. Dev Patel is a globally-reputed aesthetic physician and winner of multiple industry awards.
                  His clinic, Perfect Skin Solutions, has won Aesthetic Awards for Best Clinic South England in 2022 and 2024.
                </p>
              </div>
            </div>
            <div className={styles.expertiseItem}>
              <span className={styles.expertiseIcon}>🎯</span>
              <div className={styles.expertiseContent}>
                <h4 className={styles.expertiseTitle}>Commitment to Excellence</h4>
                <p className={styles.expertiseDesc}>
                  Living by his motto "strive to be better every day," Dr. Patel brings medical knowledge,
                  scientific rigor, and obsessive attention to detail to every CellDerma formulation.
                </p>
              </div>
            </div>
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
