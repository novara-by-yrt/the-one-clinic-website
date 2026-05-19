'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import type { Treatment } from '@/data/treatments';
import Section from '@/components/ui/Section';
import Container from '@/components/ui/Container';
import Card from '@/components/ui/Card';
import Accordion from '@/components/ui/Accordion';
import Button      from '@/components/ui/Button';
import TrustBadges from '@/components/ui/TrustBadges';
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
  const paragraphs = description ? description.split('\n\n').filter(Boolean) : [];

  return (
    <>
      {/* ── 1. Hero + Overview (combined) ──────────────────────── */}
      <section
        className={styles.hero}
        aria-label={`${title}, hero`}
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
            {/* Left column */}
            <div className={styles.heroLeft}>
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
                <Button variant="primary" theme="dark" onClick={() => window.dispatchEvent(new CustomEvent('openBookConsultationModal'))}>
                  Book Consultation
                </Button>
              </motion.div>

              {/* Review badges */}
              <motion.div variants={fadeUp}>
                <TrustBadges theme="dark" />
              </motion.div>

              {/* Trust items */}
              <motion.div className={styles.heroTrust} variants={fadeUp}>
                <span className={styles.heroTrustItem}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"/>
                    <path d="M4.5 20.118a7.5 7.5 0 0115 0"/>
                    <path d="M18.5 15v5M16 17.5h5"/>
                  </svg>
                  Led by highly trained doctors
                </span>
                <span className={styles.heroTrustDivider} aria-hidden="true" />
                <span className={styles.heroTrustItem}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"/>
                  </svg>
                  Trusted by patients in Leicester
                </span>
                <span className={styles.heroTrustDivider} aria-hidden="true" />
                <span className={styles.heroTrustItem}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <circle cx="12" cy="12" r="9.5"/>
                    <path d="M12 7.5v9M7.5 12h9"/>
                  </svg>
                  Comprehensive medical &amp; aesthetic care
                </span>
              </motion.div>
            </div>

            {/* Right card: What is this treatment */}
            <motion.div className={styles.heroCard} variants={fadeUp}>
              <p className={styles.heroCardEyebrow}>About This Treatment</p>
              <h2 className={styles.heroCardHeading}>What is {title}?</h2>
              {paragraphs.map((para, i) => (
                <p key={i} className={styles.heroCardPara}>{para}</p>
              ))}
            </motion.div>
          </motion.div>
        </Container>
      </section>

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
            {benefits?.map((benefit) => (
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
            aria-label="Treatment process steps"
          >
            {process?.map((step) => (
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
              <span className={styles.ctaAccent}>Consultation Today</span>
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
