'use client';

import { motion } from 'framer-motion';
import Section      from '@/components/ui/Section';
import Container    from '@/components/ui/Container';
import Accordion    from '@/components/ui/Accordion';
import BookConsultationButton from '@/components/ui/BookConsultationButton';
import LeadForm     from '@/components/sections/LeadForm';
import Testimonials from '@/components/sections/Testimonials';
import FinalCTA     from '@/components/sections/FinalCTA';
import { fadeUp, stagger, VIEWPORT } from '@/lib/motion';
import styles from './page.module.css';

/* ── Static data ──────────────────────────────────────────────── */
const AT_A_GLANCE = [
  { label: 'Expected Outcome', value: 'Cardiovascular analysis' },
  { label: 'Appointment Time', value: '30 minutes' },
  { label: 'Appointment Type', value: 'In-clinic' },
  { label: 'Frequency',        value: 'As directed' },
];

const JOURNEY_STEPS = [
  { n: '01', title: 'Initial Consultation & Assessment',
    desc: 'A thorough review of your health history, lifestyle factors, and any existing concerns before proceeding.' },
  { n: '02', title: 'Cardiovascular Screening Procedures',
    desc: 'Advanced diagnostic screenings to assess heart health, blood pressure, and cardiovascular risk indicators.' },
  { n: '03', title: 'Results Review & Recommendations',
    desc: 'Your doctor discusses findings in detail and recommends a tailored care plan or interventions where needed.' },
  { n: '04', title: 'Follow-Up if Required',
    desc: 'Ongoing monitoring or referral to specialist services to ensure your long-term health is supported.' },
];

const BENEFITS = [
  { title: 'Early Detection of Health Issues',
    desc: 'Identify cardiovascular and lifestyle conditions before symptoms become serious, enabling proactive treatment.' },
  { title: 'Prevent Progression of Disease',
    desc: 'Evidence-based intervention at the earliest stage dramatically reduces the risk of serious health events.' },
  { title: 'Personalised Care & Monitoring',
    desc: 'A plan built around your individual risk profile, health goals, and clinical findings.' },
  { title: 'Trusted Medical Professionals',
    desc: 'GMC-registered doctors with extensive experience in cardiovascular health and preventive medicine.' },
];

const CONDITIONS = [
  'Risk of heart disease',
  'High blood pressure',
  'Lifestyle-related health risks',
  'Early-stage cardiovascular issues',
];

const FAQS = [
  {
    question: 'Who is suitable for cardiac screening?',
    answer: 'Recommended for those over 40 or at risk, including individuals with a family history of heart disease, those who are overweight, smokers, those with high blood pressure, excessive alcohol use, or a sedentary lifestyle.',
  },
  {
    question: 'What are the benefits of health screening?',
    answer: 'Screening helps detect potential issues early, allowing for intervention before conditions progress. Early detection can significantly improve outcomes and quality of life.',
  },
  {
    question: 'Will I always see the same practitioner?',
    answer: 'We aim to provide continuity of care and will endeavour to ensure you see the same doctor where possible, helping you build a trusted relationship with your practitioner.',
  },
  {
    question: 'Will all appointments be at The One Clinic?',
    answer: 'The majority of appointments take place at our Leicester clinic. In some cases, certain procedures may involve external specialists, and we will coordinate this on your behalf.',
  },
  {
    question: 'Will I need to visit regularly?',
    answer: 'Those assessed as low risk are typically advised to return every 3 years. Higher-risk individuals may require more frequent visits depending on their individual health needs and clinical findings.',
  },
];

const RELATED = [
  { title: 'General Health Check',     href: '/treatments/health-screening',  desc: 'A broad assessment of your overall health and well-being.' },
  { title: 'Blood Tests',              href: '/treatments/health-screening',  desc: 'Diagnostic blood analysis to identify underlying conditions.' },
  { title: 'Weight Management',        href: '/treatments/weight-management', desc: 'Clinician-led programmes to achieve sustainable weight goals.' },
  { title: 'Private GP Consultation',  href: '/treatments/private-gp',       desc: 'Expert GP care without the wait, at a time that suits you.' },
];

/* ── Page component ───────────────────────────────────────────── */
export default function HealthScreeningPage() {
  return (
    <>
      {/* ════════════════════════════════════════
          1. HERO
      ════════════════════════════════════════ */}
      <section
        className={styles.hero}
        aria-label="Health Screening Leicester – hero"
        data-section-theme="dark"
      >
        <div className={styles.heroGrid} aria-hidden="true" />
        <div className={styles.heroGradient} aria-hidden="true" />

        <Container>
          <motion.div
            className={styles.heroContent}
            variants={stagger(0.15)}
            initial="hidden"
            animate="show"
          >
            <motion.span className={styles.heroCategory} variants={fadeUp}>
              Health &amp; Wellbeing
            </motion.span>

            <motion.h1 className={styles.heroTitle} variants={fadeUp}>
              Health Screening Leicester
            </motion.h1>

            <motion.p className={styles.heroDesc} variants={fadeUp}>
              Proactive care through advanced cardiovascular screening
            </motion.p>

            <motion.div className={styles.heroCtas} variants={fadeUp}>
              <BookConsultationButton className={styles.heroCtaPrimary}>
                Book Appointment
              </BookConsultationButton>
            </motion.div>

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
          </motion.div>
        </Container>
      </section>

      {/* ════════════════════════════════════════
          2. WHAT IS HEALTH SCREENING
      ════════════════════════════════════════ */}
      <Section variant="light" data-section-theme="light">
        <Container>
          <motion.div
            className={styles.overviewGrid}
            variants={stagger(0.12)}
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
          >
            <motion.div className={styles.overviewLabel} variants={fadeUp}>
              <p className={styles.eyebrowDark}>About This Treatment</p>
            </motion.div>

            <div className={styles.overviewBody}>
              <motion.h2 className={styles.overviewHeading} variants={fadeUp}>
                What is Health Screening?
              </motion.h2>
              <motion.p className={styles.overviewPara} variants={fadeUp}>
                Health screening at Leicester&apos;s One Clinic explores and treats a wide range of
                different health and well-being issues. Our experienced medical team conducts
                thorough assessments designed to identify risk factors early, giving you the best
                chance of maintaining and improving your long-term health.
              </motion.p>
            </div>
          </motion.div>
        </Container>
      </Section>

      {/* ════════════════════════════════════════
          3. PATIENT REVIEWS
      ════════════════════════════════════════ */}
      <Testimonials />

      {/* ════════════════════════════════════════
          4. AT A GLANCE
      ════════════════════════════════════════ */}
      <Section variant="dark" data-section-theme="dark" className={styles.glanceSection}>
        <Container>
          <motion.div
            className={styles.sectionHeaderCentre}
            variants={stagger(0.1)}
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
          >
            <motion.p className={styles.eyebrowLight} variants={fadeUp}>
              Treatment Overview
            </motion.p>
            <motion.h2 className={styles.headingLight} variants={fadeUp}>
              At a Glance
            </motion.h2>
          </motion.div>

          <motion.div
            className={styles.glanceGrid}
            variants={stagger(0.1)}
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
          >
            {AT_A_GLANCE.map((item) => (
              <motion.div key={item.label} className={styles.glanceCard} variants={fadeUp}>
                <span className={styles.glanceLabel}>{item.label}</span>
                <span className={styles.glanceValue}>{item.value}</span>
              </motion.div>
            ))}
          </motion.div>
        </Container>
      </Section>

      {/* ════════════════════════════════════════
          4. TREATMENT JOURNEY
      ════════════════════════════════════════ */}
      <Section variant="light" data-section-theme="light">
        <Container>
          <motion.div
            className={styles.sectionHeaderCentre}
            variants={stagger(0.1)}
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
          >
            <motion.p className={styles.eyebrowDark} variants={fadeUp}>
              What to Expect
            </motion.p>
            <motion.h2 className={styles.headingDark} variants={fadeUp}>
              Your Treatment Journey
            </motion.h2>
          </motion.div>

          <motion.ol
            className={styles.journeyList}
            variants={stagger(0.12)}
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
            aria-label="Health screening journey steps"
          >
            {JOURNEY_STEPS.map((step) => (
              <motion.li key={step.n} className={styles.journeyStep} variants={fadeUp}>
                <span className={styles.stepNum} aria-hidden="true">{step.n}</span>
                <div className={styles.stepBody}>
                  <h3 className={styles.stepTitle}>{step.title}</h3>
                  <p className={styles.stepDesc}>{step.desc}</p>
                </div>
              </motion.li>
            ))}
          </motion.ol>
        </Container>
      </Section>

      {/* ════════════════════════════════════════
          5. WHY CHOOSE THIS TREATMENT
      ════════════════════════════════════════ */}
      <Section variant="dark" data-section-theme="dark">
        <Container>
          <motion.div
            className={styles.sectionHeaderCentre}
            variants={stagger(0.1)}
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
          >
            <motion.p className={styles.eyebrowLight} variants={fadeUp}>
              Key Benefits
            </motion.p>
            <motion.h2 className={styles.headingLight} variants={fadeUp}>
              Why Choose Health Screening
            </motion.h2>
          </motion.div>

          <motion.div
            className={styles.benefitsGrid}
            variants={stagger(0.1)}
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
          >
            {BENEFITS.map((b) => (
              <motion.div key={b.title} className={styles.benefitCard} variants={fadeUp}>
                <div className={styles.benefitIcon} aria-hidden="true">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none"
                    stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="3,10 8,15 17,5" />
                  </svg>
                </div>
                <h3 className={styles.benefitTitle}>{b.title}</h3>
                <p className={styles.benefitDesc}>{b.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </Container>
      </Section>

      {/* ════════════════════════════════════════
          6. HOW DOES IT WORK
      ════════════════════════════════════════ */}
      <Section variant="light" data-section-theme="light">
        <Container>
          <motion.div
            className={styles.howGrid}
            variants={stagger(0.12)}
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
          >
            <div className={styles.howText}>
              <motion.p className={styles.eyebrowDark} variants={fadeUp}>
                The Science
              </motion.p>
              <motion.h2 className={styles.headingDark} variants={fadeUp}>
                How Does Health Screening Work
              </motion.h2>
              <motion.p className={styles.howPara} variants={fadeUp}>
                Screening evaluates cardiovascular health and identifies risk factors such as high
                blood pressure, lifestyle risks, and underlying conditions to support early
                intervention. Using a combination of clinical assessment and diagnostic technology,
                our doctors build a comprehensive picture of your cardiovascular health.
              </motion.p>
              <motion.p className={styles.howPara} variants={fadeUp}>
                Results are reviewed in detail with your clinician, who will explain findings in
                plain language and outline the most appropriate next steps, whether that is
                lifestyle guidance, medication, further investigation, or a structured monitoring
                programme.
              </motion.p>
            </div>

            <motion.div className={styles.howCard} variants={fadeUp}>
              <p className={styles.howCardEyebrow}>Screening Covers</p>
              <ul className={styles.howCardList} role="list">
                {['Blood pressure analysis', 'Heart rate & rhythm', 'Cholesterol levels', 'BMI & lifestyle review', 'Family history assessment', 'Risk stratification'].map((item) => (
                  <li key={item} className={styles.howCardItem}>
                    <span className={styles.howCardDot} aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          </motion.div>
        </Container>
      </Section>

      {/* ════════════════════════════════════════
          7. TREATABLE CONDITIONS
      ════════════════════════════════════════ */}
      <Section variant="light" data-section-theme="light" className={styles.conditionsSection}>
        <Container>
          <motion.div
            className={styles.sectionHeaderCentre}
            variants={stagger(0.1)}
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
          >
            <motion.p className={styles.eyebrowDark} variants={fadeUp}>
              Treatable Concerns
            </motion.p>
            <motion.h2 className={styles.headingDark} variants={fadeUp}>
              Health Screening Treatable Concerns
            </motion.h2>
          </motion.div>

          <motion.ul
            className={styles.conditionsList}
            variants={stagger(0.1)}
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
            role="list"
            aria-label="Treatable conditions"
          >
            {CONDITIONS.map((c) => (
              <motion.li key={c} className={styles.conditionPill} variants={fadeUp}>
                <span className={styles.conditionDot} aria-hidden="true" />
                {c}
              </motion.li>
            ))}
          </motion.ul>
        </Container>
      </Section>

      {/* ════════════════════════════════════════
          8. FAQ
      ════════════════════════════════════════ */}
      <Section variant="dark" data-section-theme="dark">
        <Container>
          <motion.div
            className={styles.sectionHeaderCentre}
            variants={stagger(0.1)}
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
          >
            <motion.p className={styles.eyebrowLight} variants={fadeUp}>FAQ</motion.p>
            <motion.h2 className={styles.headingLight} variants={fadeUp}>
              Frequently Asked Questions
            </motion.h2>
          </motion.div>

          <motion.div
            className={styles.faqBody}
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
          >
            <Accordion items={FAQS} theme="dark" />
          </motion.div>
        </Container>
      </Section>

      {/* ════════════════════════════════════════
          9. BOOKING FORM
      ════════════════════════════════════════ */}
      <LeadForm />

      {/* ════════════════════════════════════════
          10. RELATED TREATMENTS
      ════════════════════════════════════════ */}
      <Section variant="light" data-section-theme="light">
        <Container>
          <motion.div
            className={styles.sectionHeaderCentre}
            variants={stagger(0.1)}
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
          >
            <motion.p className={styles.eyebrowDark} variants={fadeUp}>
              Explore More
            </motion.p>
            <motion.h2 className={styles.headingDark} variants={fadeUp}>
              Related Treatments
            </motion.h2>
          </motion.div>

          <motion.div
            className={styles.relatedGrid}
            variants={stagger(0.1)}
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
          >
            {RELATED.map((r) => (
              <motion.div key={r.title} variants={fadeUp}>
                <Link href={r.href} className={styles.relatedCard}>
                  <h3 className={styles.relatedTitle}>{r.title}</h3>
                  <p className={styles.relatedDesc}>{r.desc}</p>
                  <span className={styles.relatedArrow} aria-hidden="true">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path d="M3 8h10M9 4l4 4-4 4"
                        stroke="currentColor" strokeWidth="1.5"
                        strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </span>
                </Link>
              </motion.div>
            ))}
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
