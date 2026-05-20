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
    title: 'Grounded in Science',
    desc: 'Every formula is meticulously crafted with clinically active ingredients at optimal concentrations.',
  },
  {
    title: 'Honest Communication',
    desc: 'Clear messaging, no misleading language — only integrity, efficacy, and results you can trust.',
  },
  {
    title: 'Premium Actives',
    desc: 'Only the most refined, skin-compatible actives are selected, ensuring exceptional performance with minimal irritation.',
  },
];

const DEVELOPMENT_STEPS = [
  {
    n: '01',
    title: 'The Discovery',
    desc: 'Dr. Dev Patel began speaking with labs globally, learning from the world\'s best chemists about cutting-edge skincare technology and formulation science.',
  },
  {
    n: '02',
    title: 'Meticulous Development',
    desc: 'Over 40 formulations were refined before arriving at the final range — luxurious, high-quality formulas with an obsessive attention to detail.',
  },
  {
    n: '03',
    title: 'Clinical Validation',
    desc: 'In clinical case studies, patients showed dramatic improvements from a single CellDerma product in just 2–6 weeks, far exceeding expectations.',
  },
];

const EXPERTISE_FACTS = [
  {
    label: 'Multiple Industry Awards',
    value: 'Dr. Dev Patel',
    desc: 'Globally-reputed aesthetic physician and winner of multiple industry awards.',
  },
  {
    label: 'Best Clinic South England',
    value: '2022 & 2024',
    desc: 'Perfect Skin Solutions — Aesthetic Awards Best Clinic South England.',
  },
  {
    label: 'Products in Clinical Use',
    value: '15+',
    desc: 'Launched in 2020, refined through in-clinic trials at Perfect Skin Solutions.',
  },
  {
    label: 'Clean Science Commitment',
    value: 'Free From',
    desc: 'No phthalates, sulphates, or parabens — and almost entirely fragrance-free.',
  },
];

export default function CellDermaPage() {
  return (
    <>
      {/* ════════════════════════════════════════
          HERO — compact, centered, no image
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
              High-performance skincare formulations created by award-winning aesthetic physician Dr. Dev Patel,
              combining clinical science with intelligent formulations that deliver visible, transformative results.
            </motion.p>
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
                src="/images/CellDerma 2.jpg"
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
                at optimal concentrations — ensuring visible, transformative results with minimal irritation.
              </p>
            </div>
          </motion.div>
        </Container>
      </Section>

      {/* ════════════════════════════════════════
          FROM VISION TO CLINICAL EXCELLENCE
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
              How Dr. Dev Patel turned an obsession with science into a world-class skincare range
            </motion.p>
          </motion.div>

          {/* Horizontal steps */}
          <motion.div
            className={styles.stepsRow}
            variants={stagger(0.12)}
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
          >
            {DEVELOPMENT_STEPS.map((step, idx) => (
              <motion.div key={idx} className={styles.stepItem} variants={fadeUp}>
                <span className={styles.stepNumber}>{step.n}</span>
                <div className={styles.stepDivider} />
                <h3 className={styles.stepTitle}>{step.title}</h3>
                <p className={styles.stepDesc}>{step.desc}</p>
              </motion.div>
            ))}
          </motion.div>

          {/* Dr. Patel quote */}
          <motion.blockquote
            className={styles.quoteBlock}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={VIEWPORT}
            transition={{ duration: 0.7 }}
          >
            <p className={styles.quoteText}>
              "This range is too good to only sell in our clinic — it needs to be available to everyone."
            </p>
            <footer className={styles.quoteFooter}>
              <span className={styles.quoteAuthor}>Dr. Dev Patel</span>
              <span className={styles.quoteRole}>Founder, CellDerma · Award-Winning Aesthetic Physician</span>
            </footer>
          </motion.blockquote>

          {/* Expertise facts grid */}
          <motion.div
            className={styles.factsGrid}
            variants={stagger(0.1)}
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
          >
            {EXPERTISE_FACTS.map((fact, idx) => (
              <motion.div key={idx} className={styles.factCard} variants={fadeUp}>
                <span className={styles.factValue}>{fact.value}</span>
                <span className={styles.factLabel}>{fact.label}</span>
                <p className={styles.factDesc}>{fact.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </Container>
      </Section>

      <FinalCTA />
    </>
  );
}
