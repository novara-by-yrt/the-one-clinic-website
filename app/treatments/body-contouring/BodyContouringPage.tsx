'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import Section                from '@/components/ui/Section';
import Container              from '@/components/ui/Container';
import Accordion              from '@/components/ui/Accordion';
import BookConsultationButton from '@/components/ui/BookConsultationButton';
import TrustBadges            from '@/components/ui/TrustBadges';
import Breadcrumb             from '@/components/ui/Breadcrumb';
import LeadForm               from '@/components/sections/LeadForm';
import MeetTheExperts         from '@/components/sections/MeetTheExperts';
import Testimonials           from '@/components/sections/Testimonials';
import FinalCTA               from '@/components/sections/FinalCTA';
import { fadeUp, stagger, VIEWPORT } from '@/lib/motion';
import styles from './page.module.css';

/* ── Static data ──────────────────────────────────────────────── */
const AT_A_GLANCE = [
  {
    label: 'Treatment Time',
    value: '30 to 60 minutes',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="12" cy="12" r="10"/>
        <polyline points="12 6 12 12 16 14"/>
      </svg>
    ),
  },
  {
    label: 'Sessions Needed',
    value: '4 to 8 sessions',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <polyline points="1 4 1 10 7 10"/>
        <path d="M3.51 15a9 9 0 1 0 .49-3.1"/>
      </svg>
    ),
  },
  {
    label: 'First Results',
    value: '2 to 4 weeks',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/>
        <polyline points="17 6 23 6 23 12"/>
      </svg>
    ),
  },
  {
    label: 'Full Results',
    value: '3 to 6 months',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"/>
        <path d="M9 12l2 2 4-4"/>
      </svg>
    ),
  },
  {
    label: 'Downtime',
    value: 'None to Minimal',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
        <line x1="16" y1="2" x2="16" y2="6"/>
        <line x1="8" y1="2" x2="8" y2="6"/>
        <line x1="3" y1="10" x2="21" y2="10"/>
      </svg>
    ),
  },
  {
    label: 'Treatment Cost',
    value: 'From £150',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <line x1="12" y1="1" x2="12" y2="23"/>
        <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
      </svg>
    ),
  },
];

const JOURNEY_STEPS = [
  {
    n: '01',
    title: 'Initial Consultation and Body Assessment',
    desc: 'Our clinical team evaluates your body shape, identifies target areas, and discusses your contouring goals. A personalised treatment plan is created with expected results and session schedule.',
  },
  {
    n: '02',
    title: 'Treatment Application and Skin Preparation',
    desc: 'The treatment area is cleansed and prepared. Cooling gel or protective barrier may be applied depending on the technology used. Protective eyewear is provided as needed.',
  },
  {
    n: '03',
    title: 'Non-Surgical Contouring Procedure',
    desc: 'Advanced technologies target stubborn fat deposits without incisions or anaesthesia. Treatment typically takes 30 to 60 minutes and is comfortable with minimal sensation.',
  },
  {
    n: '04',
    title: 'Aftercare and Results Monitoring',
    desc: 'Post-treatment instructions are provided for optimal results. You can return to normal activities immediately. Results gradually improve over weeks and months as collagen rebuilds and fat cells are naturally eliminated.',
  },
];

const BENEFITS = [
  {
    title: 'No Surgery Required',
    desc: 'Non-invasive fat reduction with no incisions, anaesthesia, or downtime required. Achieve meaningful body sculpting safely with advanced technology.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
      </svg>
    ),
  },
  {
    title: 'Targets Stubborn Fat',
    desc: 'Precisely reduces localised fat deposits resistant to diet and exercise across abdomen, flanks, thighs, arms, and more.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="12" cy="12" r="10"/>
        <polyline points="12 6 12 12 16 14"/>
      </svg>
    ),
  },
  {
    title: 'Skin Tightening Results',
    desc: 'Advanced technologies stimulate collagen production, improving skin firmness and texture for sculpted, defined results.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
        <line x1="16" y1="2" x2="16" y2="6"/>
        <line x1="8" y1="2" x2="8" y2="6"/>
        <line x1="3" y1="10" x2="21" y2="10"/>
      </svg>
    ),
  },
  {
    title: 'Personalised Treatment Plans',
    desc: 'Every programme is tailored to your body shape, goals, and target areas, ensuring the best possible results for you.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
        <circle cx="9" cy="7" r="4"/>
        <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
        <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
      </svg>
    ),
  },
  {
    title: 'Visible Results Within Weeks',
    desc: 'Many patients notice improvement in 2 to 4 weeks, with full results continuing to develop over several months.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"/>
        <path d="M4.5 20.118a7.5 7.5 0 0115 0"/>
      </svg>
    ),
  },
  {
    title: 'Immediate Resumption of Activities',
    desc: 'No downtime means you can return to your normal routine immediately, with results continuing to improve progressively.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/>
        <polyline points="17 6 23 6 23 12"/>
      </svg>
    ),
  },
];

const ELIGIBILITY = [
  'Adults in good general health with realistic treatment expectations',
  'BMI within a healthy range or willing to discuss realistic goals',
  'No significant loose or excess skin requiring surgical removal',
  'Non-pregnant and not breastfeeding',
  'Free from medical conditions that may be affected by the treatment',
];

const TREATABLE_CONCERNS = [
  'Stubborn abdominal fat and belly bloating',
  'Love handles and flank fullness',
  'Inner and outer thigh fat deposits',
  'Upper arm and back fat',
  'Double chin and submental fullness',
];

const TREATABLE_AREAS = [
  'Abdomen and waist',
  'Flanks and sides',
  'Hips and buttocks',
  'Inner and outer thighs',
  'Upper arms',
];

const CLINIC_REASONS = [
  'Expert clinical team with advanced certifications',
  'Latest FDA-approved contouring technologies',
  'Personalised treatment plans tailored to your goals',
  'Realistic expectations and transparent pricing',
  'Safe, proven non-surgical approach',
  'Same-day appointments and flexible scheduling',
];

const FAQS = [
  {
    question: 'What is body contouring?',
    answer:
      'Body contouring is a non-surgical treatment designed to reduce stubborn fat deposits and improve body shape using advanced technologies such as radiofrequency, ultrasound, or cryolipolysis. Unlike traditional surgery, it requires no incisions and minimal recovery time.',
  },
  {
    question: 'How long does a body contouring session take?',
    answer:
      'Most sessions take between 30 and 60 minutes, depending on the area being treated and the technology used. Our team will provide a clear timeframe during your consultation.',
  },
  {
    question: 'How many sessions will I need?',
    answer:
      'Typical treatment courses involve 4 to 8 sessions spaced 1 to 2 weeks apart. This varies based on your goals, the area being treated, and the specific technology. A personalised schedule will be discussed at your initial consultation.',
  },
  {
    question: 'When will I see results?',
    answer:
      'Many patients notice initial improvements within 2 to 4 weeks, with continued improvement over 3 to 6 months as the body naturally processes treated fat cells and collagen remodelling occurs.',
  },
  {
    question: 'What is the downtime?',
    answer:
      'Body contouring is non-invasive with minimal to no downtime. Most patients can return to normal activities immediately after treatment. Some may experience mild redness or temporary skin sensitivity.',
  },
  {
    question: 'Is body contouring safe?',
    answer:
      'Yes, when performed by qualified medical professionals using FDA-approved technologies. Non-surgical body contouring is a safe alternative to liposuction with minimal risks and no anaesthesia required.',
  },
  {
    question: 'Can multiple areas be treated?',
    answer:
      'Yes, multiple areas can be addressed as part of a comprehensive treatment plan. This allows for balanced, proportionate body sculpting across different zones, which is often more effective than treating isolated areas.',
  },
];

const RELATED = [
  { label: 'Morpheus8', href: '/treatments/morpheus8' },
  { label: 'Endolift', href: '/treatments/endolift' },
  { label: 'Liposuction Leicester', href: '/treatments/liposuction-leicester' },
  { label: 'Profhilo', href: '/treatments/profhilo' },
];

export default function BodyContouringPage() {
  const [showAllFaqs, setShowAllFaqs] = useState(false);

  return (
    <>
      {/* ════════════════════════════════════════
          1. HERO
      ════════════════════════════════════════ */}
      <section
        className={styles.hero}
        aria-label="Body Contouring Leicester, hero"
        data-section-theme="dark"
      >
        <div className={styles.heroBreadcrumb}>
          <Container>
            <Breadcrumb
              theme="dark"
              items={[
                { label: 'Treatments', href: '/treatments' },
                { label: 'Body Contouring' },
              ]}
            />
          </Container>
        </div>

        <Container>
          <motion.div
            className={styles.heroInner}
            variants={stagger(0.12)}
            initial="hidden"
            animate="show"
          >
            <div className={styles.heroLeft}>
              <motion.span className={styles.heroCategory} variants={fadeUp}>
                Non-Surgical Body Treatments
              </motion.span>

              <motion.h1 className={styles.heroTitle} variants={fadeUp}>
                Body Contouring in Leicester
              </motion.h1>

              <motion.p className={styles.heroDesc} variants={fadeUp}>
                Non-surgical fat reduction and body sculpting for stubborn areas. Tone, tighten, and reshape without surgery or downtime.
              </motion.p>

              <motion.div className={styles.heroCtas} variants={fadeUp}>
                <BookConsultationButton className={styles.heroCtaPrimary}>
                  Book Consultation
                </BookConsultationButton>
              </motion.div>

              <motion.div variants={fadeUp}>
                <TrustBadges theme="dark" />
              </motion.div>

              <motion.div className={styles.heroTrust} variants={fadeUp}>
                <span className={styles.heroTrustItem}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"/>
                    <path d="M4.5 20.118a7.5 7.5 0 0115 0"/>
                    <path d="M18.5 15v5M16 17.5h5"/>
                  </svg>
                  Expert clinical team
                </span>
                <span className={styles.heroTrustDivider} aria-hidden="true" />
                <span className={styles.heroTrustItem}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <circle cx="12" cy="12" r="10"/>
                    <polyline points="12 6 12 12 16 14"/>
                  </svg>
                  Same-day appointments available
                </span>
                <span className={styles.heroTrustDivider} aria-hidden="true" />
                <span className={styles.heroTrustItem}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"/>
                  </svg>
                  Trusted by patients across Leicester
                </span>
              </motion.div>
            </div>

            <motion.div className={styles.heroImageWrap} variants={fadeUp}>
              <Image
                src="/images/Minor Surgery.jpg"
                alt="Body contouring treatment at The One Clinic Leicester"
                fill
                priority
                className={styles.heroImage}
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className={styles.heroImageFade} aria-hidden="true" />
            </motion.div>
          </motion.div>
        </Container>
      </section>

      {/* ════════════════════════════════════════
          2. WHAT IS BODY CONTOURING?
      ════════════════════════════════════════ */}
      <Section variant="light" data-section-theme="light" className={styles.sectionGray}>
        <Container>
          <motion.div
            className={styles.whatIsGrid}
            variants={stagger(0.12)}
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
          >
            <motion.div className={styles.whatIsContent} variants={stagger(0.12)}>
              <motion.div className={styles.whatIsTextGroup} variants={fadeUp}>
                <p className={styles.eyebrowDark}>About This Treatment</p>
                <h2 className={styles.combinedHeading}>What is Body Contouring?</h2>
                <p className={styles.combinedDesc}>
                  Body contouring uses advanced non-surgical technologies to reduce stubborn fat
                  deposits and improve skin firmness in targeted areas. Unlike traditional surgery,
                  these treatments require no incisions and minimal recovery time. At The One
                  Clinic, our experts design a bespoke treatment programme to help you achieve
                  a more defined, confident shape.
                </p>
              </motion.div>

              <motion.div className={styles.whatIsCtaWrapper} variants={fadeUp}>
                <BookConsultationButton className={styles.whatIsCtaButton}>
                  Book Your Consultation
                </BookConsultationButton>
              </motion.div>
            </motion.div>

            <motion.div className={styles.whatIsVideoWrap} variants={fadeUp}>
              <Image
                src="/images/Doctor1.jpg"
                alt="Body contouring consultation at The One Clinic"
                fill
                className={styles.whatIsVideoFrame}
                sizes="(max-width: 900px) 100vw, 50vw"
              />
            </motion.div>
          </motion.div>
        </Container>
      </Section>

      {/* ════════════════════════════════════════
          3. AT A GLANCE
      ════════════════════════════════════════ */}
      <Section variant="light" data-section-theme="light" className={styles.whiteBgSection}>
        <div className={styles.whiteBgWrap} aria-hidden="true">
          <Image src="/bg-image-white.png" alt="" fill className={styles.whiteBgImg} sizes="100vw" />
        </div>
        <Container className={styles.whiteBgContent}>
          <motion.div
            className={styles.sectionHeaderCentre}
            variants={stagger(0.1)}
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
          >
            <motion.p className={styles.eyebrowDark} variants={fadeUp}>At a Glance</motion.p>
            <motion.h2 className={styles.headingDark} variants={fadeUp}>
              Body Contouring Overview
            </motion.h2>
          </motion.div>

          <motion.div
            className={styles.glanceGrid}
            variants={stagger(0.08)}
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
          >
            {AT_A_GLANCE.map((item) => (
              <motion.div key={item.label} className={styles.glanceCard} variants={fadeUp}>
                <div className={styles.glanceIconWrap} aria-hidden="true">{item.icon}</div>
                <p className={styles.glanceLabel}>{item.label}</p>
                <p className={styles.glanceValue}>{item.value}</p>
              </motion.div>
            ))}
          </motion.div>
        </Container>
      </Section>

      {/* ════════════════════════════════════════
          4. THE JOURNEY
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
            <motion.p className={styles.eyebrowLight} variants={fadeUp}>Your Journey</motion.p>
            <motion.h2 className={styles.headingLight} variants={fadeUp}>
              The Body Contouring Journey
            </motion.h2>
          </motion.div>

          <motion.div
            className={styles.journeySection}
            variants={stagger(0.12)}
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
          >
            {JOURNEY_STEPS.map((step) => (
              <motion.div key={step.n} className={styles.journeyCard} variants={fadeUp}>
                <div className={styles.journeyCardInner}>
                  <span className={styles.journeyNumber}>{step.n}</span>
                  <h3 className={styles.journeyTitle}>{step.title}</h3>
                  <p className={styles.journeyDesc}>{step.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </Container>
      </Section>

      {/* ════════════════════════════════════════
          5. BENEFITS
      ════════════════════════════════════════ */}
      <Section variant="light" data-section-theme="light" className={styles.whiteBgSection}>
        <div className={styles.whiteBgWrap} aria-hidden="true">
          <Image src="/bg-image-white.png" alt="" fill className={styles.whiteBgImg} sizes="100vw" />
        </div>
        <Container className={styles.whiteBgContent}>
          <motion.div
            className={styles.sectionHeaderCentre}
            variants={stagger(0.1)}
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
          >
            <motion.p className={styles.eyebrowDark} variants={fadeUp}>Why Body Contouring</motion.p>
            <motion.h2 className={styles.headingDark} variants={fadeUp}>
              The Benefits of Body Contouring
            </motion.h2>
          </motion.div>

          <motion.div
            className={styles.treatedBenefitsGrid}
            variants={stagger(0.08)}
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
          >
            {BENEFITS.map((b) => (
              <motion.div
                key={b.title}
                className={styles.treatedBenefitCard}
                variants={fadeUp}
                whileHover={{ y: -8, transition: { type: 'spring', stiffness: 280, damping: 18 } }}
              >
                <span className={styles.treatedBenefitIconWrap} aria-hidden="true">{b.icon}</span>
                <h3 className={styles.treatedBenefitTitle}>{b.title}</h3>
                <p className={styles.treatedBenefitDesc}>{b.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </Container>
      </Section>

      {/* ════════════════════════════════════════
          6. ELIGIBILITY
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
            <motion.p className={styles.eyebrowLight} variants={fadeUp}>Eligibility</motion.p>
            <motion.h2 className={styles.headingLight} variants={fadeUp}>
              Are You a Good Candidate?
            </motion.h2>
          </motion.div>

          <motion.div
            className={styles.eligibilityGrid}
            variants={stagger(0.08)}
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
          >
            {ELIGIBILITY.map((item) => (
              <motion.div key={item} className={styles.eligibilityCard} variants={fadeUp}>
                <span className={styles.eligibilityCheck} aria-hidden="true">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <polyline points="2,10 7,15 18,4" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </span>
                <p className={styles.eligibilityText}>{item}</p>
              </motion.div>
            ))}
          </motion.div>
        </Container>
      </Section>

      {/* ════════════════════════════════════════
          7. RESULTS & AFTERCARE
      ════════════════════════════════════════ */}
      <Section variant="light" data-section-theme="light" className={styles.sectionGray}>
        <Container>
          <motion.div
            className={styles.resultsGrid}
            variants={stagger(0.12)}
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
          >
            <motion.div className={styles.resultsContent} variants={stagger(0.12)}>
              <motion.div className={styles.resultsTextGroup} variants={fadeUp}>
                <p className={styles.eyebrowDark}>Results and Aftercare</p>
                <h2 className={styles.combinedHeading}>What to Expect After Treatment</h2>
                <p className={styles.combinedDesc}>
                  Body contouring is designed for immediate resumption of normal activities. Most
                  patients experience no downtime, though mild redness or sensitivity may briefly
                  occur. Results gradually appear over weeks and months as the body naturally
                  eliminates treated fat cells. Proper aftercare including hydration, sun protection,
                  and following clinical guidance maximises results and ensures optimal healing.
                </p>
              </motion.div>

              <motion.div className={styles.resultsCtaWrapper} variants={fadeUp}>
                <BookConsultationButton className={styles.resultsCtaButton}>
                  Schedule Your Treatment
                </BookConsultationButton>
              </motion.div>
            </motion.div>

            <motion.div className={styles.resultsImageWrap} variants={fadeUp}>
              <Image
                src="/images/Doctor1.jpg"
                alt="Body contouring results at The One Clinic"
                fill
                className={styles.resultsImageFrame}
                sizes="(max-width: 900px) 100vw, 50vw"
              />
            </motion.div>
          </motion.div>
        </Container>
      </Section>

      {/* ════════════════════════════════════════
          8. TESTIMONIALS
      ════════════════════════════════════════ */}
      <Testimonials />

      {/* ════════════════════════════════════════
          9. CTA BANNER
      ════════════════════════════════════════ */}
      <section className={styles.ctaBanner} data-section-theme="dark" aria-label="Book body contouring">
        <div className={styles.ctaBannerLogoWrap} aria-hidden="true">
          <Image src="/images/Background-logo.png" alt="" fill className={styles.ctaBannerLogo} sizes="100vw" />
        </div>
        <Container>
          <motion.div
            className={styles.ctaBannerContent}
            variants={stagger(0.12)}
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
          >
            <motion.h2 className={styles.ctaBannerHeading} variants={fadeUp}>
              Shape Your Body.<br />Own Your Confidence.
            </motion.h2>
            <motion.p className={styles.ctaBannerSub} variants={fadeUp}>
              Book a body contouring consultation with our expert team in Leicester.
            </motion.p>
            <motion.div variants={fadeUp}>
              <BookConsultationButton className={styles.ctaBannerBtn}>Book Consultation</BookConsultationButton>
            </motion.div>
          </motion.div>
        </Container>
      </section>

      {/* ════════════════════════════════════════
          10. TREATABLE AREAS
      ════════════════════════════════════════ */}
      <Section variant="light" data-section-theme="light" className={styles.whiteBgSection}>
        <div className={styles.whiteBgWrap} aria-hidden="true">
          <Image src="/bg-image-white.png" alt="" fill className={styles.whiteBgImg} sizes="100vw" />
        </div>
        <Container className={styles.whiteBgContent}>
          <motion.div
            className={styles.sectionHeaderCentre}
            variants={stagger(0.1)}
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
          >
            <motion.p className={styles.eyebrowDark} variants={fadeUp}>Treatment Areas</motion.p>
            <motion.h2 className={styles.headingDark} variants={fadeUp}>
              Treatable Areas
            </motion.h2>
          </motion.div>

          <motion.div
            className={styles.treatedConcernsGrid}
            variants={stagger(0.08)}
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
          >
            {TREATABLE_AREAS.map((area) => (
              <motion.div key={area} className={styles.treatedConcernCard} variants={fadeUp}>
                <h3 className={styles.treatedConcernTitle}>{area}</h3>
              </motion.div>
            ))}
          </motion.div>
        </Container>
      </Section>

      {/* ════════════════════════════════════════
          11. CLINIC INTRO
      ════════════════════════════════════════ */}
      <Section variant="light" data-section-theme="light" className={styles.sectionGray}>
        <Container>
          <motion.div
            className={styles.clinicIntroGrid}
            variants={stagger(0.12)}
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
          >
            <motion.div className={styles.clinicIntroImageWrap} variants={fadeUp}>
              <Image
                src="/images/Doctor1.jpg"
                alt="The One Clinic Leicester team"
                fill
                className={styles.clinicIntroImage}
                sizes="(max-width: 900px) 100vw, 50vw"
              />
            </motion.div>

            <motion.div className={styles.clinicIntroContent} variants={stagger(0.12)}>
              <motion.div className={styles.clinicIntroTextGroup} variants={fadeUp}>
                <p className={styles.eyebrowDark}>About Our Clinic</p>
                <h2 className={styles.combinedHeading}>Leading Body Contouring in Leicester</h2>
                <p className={styles.clinicIntroBody}>
                  The One Clinic combines medical expertise with cutting-edge technology to deliver
                  outstanding body contouring results. Our team is dedicated to creating personalised
                  treatment plans that help you achieve your ideal shape without surgery or downtime.
                </p>
              </motion.div>

              <motion.div className={styles.clinicIntroCtaWrapper} variants={fadeUp}>
                <BookConsultationButton className={styles.clinicIntroCtaButton}>
                  Meet Our Team
                </BookConsultationButton>
              </motion.div>
            </motion.div>
          </motion.div>
        </Container>
      </Section>

      {/* ════════════════════════════════════════
          12. COST BANNER
      ════════════════════════════════════════ */}
      <section className={styles.costBanner} data-section-theme="dark" aria-label="Body contouring cost">
        <Container>
          <motion.div
            className={styles.costBannerInner}
            variants={stagger(0.12)}
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
          >
            <motion.p className={styles.costBannerEyebrow} variants={fadeUp}>Body Contouring Pricing at The One Clinic</motion.p>
            <motion.p className={styles.costBannerPrice} variants={fadeUp}>From £150</motion.p>
            <motion.p className={styles.costBannerNote} variants={fadeUp}>
              Pricing varies by treatment type and number of sessions. Full details provided at your consultation.
            </motion.p>
            <motion.div variants={fadeUp}>
              <BookConsultationButton className={styles.ctaBannerBtn}>Book A Consultation</BookConsultationButton>
            </motion.div>
          </motion.div>
        </Container>
      </section>

      {/* ════════════════════════════════════════
          13. WHY CHOOSE
      ════════════════════════════════════════ */}
      <Section variant="light" data-section-theme="light" className={styles.whiteBgSection}>
        <div className={styles.whiteBgWrap} aria-hidden="true">
          <Image src="/bg-image-white.png" alt="" fill className={styles.whiteBgImg} sizes="100vw" />
        </div>
        <Container className={styles.whiteBgContent}>
          <motion.div
            className={styles.sectionHeaderCentre}
            variants={stagger(0.1)}
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
          >
            <motion.p className={styles.eyebrowDark} variants={fadeUp}>Why Choose Us</motion.p>
            <motion.h2 className={styles.headingDark} variants={fadeUp}>
              Why Choose The One Clinic?
            </motion.h2>
          </motion.div>

          <motion.div
            className={styles.whyChooseGrid}
            variants={stagger(0.08)}
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
          >
            {CLINIC_REASONS.map((reason) => (
              <motion.div key={reason} className={styles.whyChooseCard} variants={fadeUp}>
                <p className={styles.whyChooseText}>{reason}</p>
              </motion.div>
            ))}
          </motion.div>
        </Container>
      </Section>

      {/* ════════════════════════════════════════
          14. MEET THE EXPERTS
      ════════════════════════════════════════ */}
      <MeetTheExperts />

      {/* ════════════════════════════════════════
          15. FAQ
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
            <motion.h2 className={styles.headingLight} variants={fadeUp}>Frequently Asked Questions</motion.h2>
          </motion.div>
          <motion.div
            className={styles.faqBody}
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
          >
            <Accordion items={showAllFaqs ? FAQS : FAQS.slice(0, 5)} theme="dark" />
            {!showAllFaqs && FAQS.length > 5 && (
              <motion.button
                onClick={() => setShowAllFaqs(true)}
                className={styles.faqToggle}
                variants={fadeUp}
              >
                Show All FAQs
              </motion.button>
            )}
          </motion.div>
        </Container>
      </Section>

      {/* ════════════════════════════════════════
          16. LEAD FORM
      ════════════════════════════════════════ */}
      <LeadForm />

      {/* ════════════════════════════════════════
          17. RELATED TREATMENTS
      ════════════════════════════════════════ */}
      <Section variant="light" data-section-theme="light" className={styles.whiteBgSection}>
        <div className={styles.whiteBgWrap} aria-hidden="true">
          <Image src="/bg-image-white.png" alt="" fill className={styles.whiteBgImg} sizes="100vw" />
        </div>
        <Container className={styles.whiteBgContent}>
          <motion.div
            className={styles.sectionHeaderCentre}
            variants={stagger(0.1)}
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
          >
            <motion.p className={styles.eyebrowDark} variants={fadeUp}>Related Treatments</motion.p>
            <motion.h2 className={styles.headingDark} variants={fadeUp}>
              Explore Our Other Treatments
            </motion.h2>
          </motion.div>

          <motion.div
            className={styles.relatedGrid}
            variants={stagger(0.08)}
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
          >
            {RELATED.map((item) => (
              <Link key={item.href} href={item.href}>
                <motion.div className={styles.relatedCard} variants={fadeUp} whileHover={{ y: -4 }}>
                  <h3 className={styles.relatedTitle}>{item.label}</h3>
                </motion.div>
              </Link>
            ))}
          </motion.div>
        </Container>
      </Section>

      {/* ════════════════════════════════════════
          18. FINAL CTA
      ════════════════════════════════════════ */}
      <FinalCTA />
    </>
  );
}
