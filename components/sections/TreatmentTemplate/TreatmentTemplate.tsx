'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import type { Treatment } from '@/data/treatments';
import Section from '@/components/ui/Section';
import Container from '@/components/ui/Container';
import Card from '@/components/ui/Card';
import Accordion from '@/components/ui/Accordion';
import Button from '@/components/ui/Button';
import { fadeUp, stagger, VIEWPORT } from '@/lib/motion';
import styles from './TreatmentTemplate.module.css';

// ── Props ────────────────────────────────────────────────────────
interface Props {
  treatment: Treatment;
}

// ── Component ────────────────────────────────────────────────────
export default function TreatmentTemplate({ treatment }: Props) {
  const { title, category, shortDescription, description, benefits, process, faq } = treatment;

  // Split description into paragraphs on \n\n
  const paragraphs = description.split('\n\n').filter(Boolean);

  return (
    <>
      {/* ── 1. Hero ────────────────────────────────────────────── */}
      <section
        className={styles.hero}
        aria-label={`${title} – hero`}
        data-section-theme="dark"
      >
        <div className={styles.heroGrid} aria-hidden="true" />

        <Container>
          <motion.div
            className={styles.heroContent}
            variants={stagger(0.18)}
            initial="hidden"
            animate="show"
          >
            <motion.span className={styles.category} variants={fadeUp}>
              {category}
            </motion.span>
            <motion.h1 className={styles.heroTitle} variants={fadeUp}>
              {title}
            </motion.h1>
            <motion.p className={styles.heroDesc} variants={fadeUp}>
              {shortDescription}
            </motion.p>
            <motion.div className={styles.heroCta} variants={fadeUp}>
              <Button variant="primary" theme="dark">
                Book Consultation
              </Button>
              <Link href="/treatments" className={styles.backLink}>
                ← All Treatments
              </Link>
            </motion.div>
          </motion.div>
        </Container>
      </section>

      {/* ── 2. Overview ────────────────────────────────────────── */}
      <Section variant="light" data-section-theme="light">
        <Container>
          <motion.div
            className={styles.overviewGrid}
            variants={stagger()}
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
          >
            <div className={styles.overviewLabel}>
              <motion.p className={styles.eyebrowDark} variants={fadeUp}>
                About This Treatment
              </motion.p>
            </div>
            <div className={styles.overviewBody}>
              {paragraphs.map((para, i) => (
                <motion.p key={i} className={styles.overviewPara} variants={fadeUp}>
                  {para}
                </motion.p>
              ))}
            </div>
          </motion.div>
        </Container>
      </Section>

      {/* ── 3. Benefits ────────────────────────────────────────── */}
      <Section variant="dark" data-section-theme="dark">
        <Container>
          <motion.div
            className={styles.sectionHeader}
            variants={stagger()}
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
          >
            <motion.p className={styles.eyebrowLight} variants={fadeUp}>
              Key Benefits
            </motion.p>
            <motion.h2 className={styles.headingLight} variants={fadeUp}>
              Why Choose This Treatment
            </motion.h2>
          </motion.div>

          <motion.div
            className={styles.benefitsGrid}
            variants={stagger(0.1)}
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
          >
            {benefits.map((benefit) => (
              <motion.div key={benefit.title} variants={fadeUp}>
                <Card theme="dark" className={styles.benefitCard}>
                  <h3 className={styles.benefitTitle}>{benefit.title}</h3>
                  <p className={styles.benefitDesc}>{benefit.description}</p>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </Container>
      </Section>

      {/* ── 4. Process ─────────────────────────────────────────── */}
      <Section variant="light" data-section-theme="light">
        <Container>
          <motion.div
            className={styles.sectionHeader}
            variants={stagger()}
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
          >
            <motion.p className={styles.eyebrowDark} variants={fadeUp}>
              What to Expect
            </motion.p>
            <motion.h2 className={styles.headingDark} variants={fadeUp}>
              The Treatment Process
            </motion.h2>
          </motion.div>

          <motion.ol
            className={styles.processList}
            variants={stagger(0.12)}
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
            role="list"
          >
            {process.map((step) => (
              <motion.li key={step.number} className={styles.processStep} variants={fadeUp}>
                <span className={styles.stepNum} aria-hidden="true">
                  {step.number}
                </span>
                <div className={styles.stepBody}>
                  <h3 className={styles.stepTitle}>{step.title}</h3>
                  <p className={styles.stepDesc}>{step.description}</p>
                </div>
              </motion.li>
            ))}
          </motion.ol>
        </Container>
      </Section>

      {/* ── 5. FAQ (optional) ──────────────────────────────────── */}
      {faq && faq.length > 0 && (
        <Section variant="dark" data-section-theme="dark">
          <Container>
            <motion.div
              className={styles.sectionHeader}
              variants={stagger()}
              initial="hidden"
              whileInView="show"
              viewport={VIEWPORT}
            >
              <motion.p className={styles.eyebrowLight} variants={fadeUp}>
                FAQ
              </motion.p>
              <motion.h2 className={styles.headingLight} variants={fadeUp}>
                Common Questions
              </motion.h2>
            </motion.div>

            <motion.div
              className={styles.faqBody}
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={VIEWPORT}
            >
              <Accordion items={faq} theme="dark" />
            </motion.div>
          </Container>
        </Section>
      )}

      {/* ── 6. CTA ─────────────────────────────────────────────── */}
      <Section variant="dark" data-section-theme="dark" className={styles.ctaSection}>
        <Container>
          <motion.div
            className={styles.ctaContent}
            variants={stagger(0.2)}
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
          >
            <motion.p className={styles.eyebrowLight} variants={fadeUp}>
              Ready to Begin?
            </motion.p>
            <motion.h2 className={styles.ctaHeading} variants={fadeUp}>
              Book Your Free
              <br />
              <em className={styles.ctaAccent}>Consultation Today</em>
            </motion.h2>
            <motion.p className={styles.ctaSubtext} variants={fadeUp}>
              No obligation. A specialist will design a plan tailored to your goals.
            </motion.p>
            <motion.div variants={fadeUp}>
              <Button variant="primary" theme="dark">
                Book Free Consultation
              </Button>
            </motion.div>
          </motion.div>
        </Container>
      </Section>
    </>
  );
}
