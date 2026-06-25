'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { m } from 'framer-motion';
import Section            from '@/components/ui/Section';
import Container          from '@/components/ui/Container';
import Accordion          from '@/components/ui/Accordion';
import BookConsultationButton from '@/components/ui/BookConsultationButton';
import TrustBadges        from '@/components/ui/TrustBadges';
import Breadcrumb         from '@/components/ui/Breadcrumb';
import LeadForm           from '@/components/sections/LeadForm';
import MeetTheExperts     from '@/components/sections/MeetTheExperts';
import Testimonials       from '@/components/sections/Testimonials';
import FinalCTA           from '@/components/sections/FinalCTA';
import { fadeUp, stagger, VIEWPORT } from '@/lib/motion';
import styles from './page.module.css';

/* ── Static data ──────────────────────────────────────────────── */
const AT_A_GLANCE = [
  {
    label: 'Session Time',
    value: '20 to 30 minutes',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="12" cy="12" r="10"/>
        <polyline points="12 6 12 12 16 14"/>
      </svg>
    ),
  },
  {
    label: 'Anaesthetic',
    value: 'None required',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
      </svg>
    ),
  },
  {
    label: 'Downtime',
    value: 'None',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"/>
        <path d="M9 12l2 2 4-4"/>
      </svg>
    ),
  },
  {
    label: 'Sessions Recommended',
    value: '3 sessions',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <polyline points="1 4 1 10 7 10"/>
        <path d="M3.51 15a9 9 0 1 0 .49-3.1"/>
      </svg>
    ),
  },
  {
    label: 'Results Duration',
    value: 'Up to 12 months',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/>
        <polyline points="17 6 23 6 23 12"/>
      </svg>
    ),
  },
  {
    label: 'Cost',
    value: 'From £400',
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
    title: 'Initial Consultation',
    desc: 'A thorough assessment of your snoring, sleep quality, and palatal anatomy allows our doctor to confirm your suitability and create a personalised laser snoring treatment plan tailored to your needs.',
  },
  {
    n: '02',
    title: 'Sleep Assessment',
    desc: 'We review your sleep history, snoring severity, and any underlying concerns such as mild sleep apnoea to ensure the treatment programme is right for you and to set realistic expectations.',
  },
  {
    n: '03',
    title: 'Treatment Course (3 Sessions)',
    desc: 'Three laser sessions are delivered approximately three weeks apart. Each session takes 20 to 30 minutes, with the laser gently tightening soft palate and uvular tissue to progressively reduce snoring vibration.',
  },
  {
    n: '04',
    title: 'Long-term Results',
    desc: 'Noticeable snoring reduction is typically experienced after the second session, with full results lasting up to 12 to 14 months. A maintenance session is recommended annually to sustain the benefit.',
  },
];

const APPROACH_CARDS = [
  {
    eyebrow: '01',
    title: 'ENT-Style Assessment',
    desc: 'Our doctors perform a thorough ENT-style evaluation of your palatal anatomy and snoring pattern before treatment, ensuring laser parameters are precisely calibrated for your individual anatomy.',
  },
  {
    eyebrow: '02',
    title: 'Laser Palate Treatment',
    desc: 'Advanced Er:YAG-type laser energy is delivered to the soft palate and uvula, stimulating collagen contraction and tissue tightening that reduces the laxity responsible for snoring vibration.',
  },
  {
    eyebrow: '03',
    title: 'Maintenance Protocol',
    desc: 'Following the initial course of three sessions, a personalised maintenance protocol is recommended to preserve results, typically an annual top-up session for long-term snoring control.',
  },
];

const BENEFITS = [
  {
    title: 'Reduces Snoring Volume',
    desc: 'Laser energy tightens the soft palate and uvula, directly targeting the anatomical structures responsible for snoring vibration, resulting in measurable reduction of snoring sound and frequency.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
      </svg>
    ),
  },
  {
    title: 'Non-Surgical & Painless',
    desc: 'No incisions, no stitches, no general anaesthesia. Treatment is performed with topical comfort measures only, making it a genuinely painless and patient-friendly alternative to surgical palatoplasty.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/>
        <polyline points="17 6 23 6 23 12"/>
      </svg>
    ),
  },
  {
    title: 'No Downtime',
    desc: 'Return to work, exercise, and all normal activities immediately after each session. There are no restrictions, no recovery period, and no time away from your daily life.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
        <polyline points="22 4 12 14.01 9 11.01"/>
      </svg>
    ),
  },
  {
    title: 'Improves Sleep Quality',
    desc: 'By reducing or eliminating snoring, patients and their partners enjoy deeper, uninterrupted sleep, leading to improved daytime energy, mood, and long-term wellbeing.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
      </svg>
    ),
  },
  {
    title: 'Partner Benefits',
    desc: 'Restoring quiet, peaceful nights benefits not only the snorer but their partner. Many couples report dramatically improved relationship quality and shared sleep satisfaction following treatment.',
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
    title: 'Long-Lasting Results',
    desc: 'Results last up to 12 to 14 months from a course of three sessions, with an annual maintenance session recommended to sustain the benefit for years to come.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="12" cy="12" r="10"/>
        <polyline points="12 6 12 12 16 14"/>
      </svg>
    ),
  },
];

const ELIGIBILITY_SUITABLE = [
  'Habitual snorers whose snoring disrupts sleep quality or relationships',
  'Those seeking support for mild to moderate sleep apnoea alongside other management',
  'Individuals who have tried lifestyle changes without achieving satisfactory snoring reduction',
  'Anyone wanting a non-surgical, comfortable, and fast-recovery snoring solution',
  'Patients wishing to avoid CPAP or surgical procedures for simple snoring',
];

const ELIGIBILITY_NOT_SUITABLE = [
  'Severe obstructive sleep apnoea (CPAP or surgical management required)',
  'Structural airway obstruction requiring surgical correction',
  'Active throat infection or acute upper respiratory illness',
  'Certain bleeding disorders or anticoagulant medications (discuss with our team)',
];

const CONDITIONS_TISSUE = [
  'Soft palate',
  'Uvula',
  'Tonsillar pillars',
  'Lateral pharyngeal walls',
  'Posterior pharynx',
  'Oropharynx',
];

const CONDITIONS_CAUSES = [
  'Soft palate vibration',
  'Uvula laxity',
  'Airway narrowing',
  'Tissue relaxation during sleep',
  'Positional snoring',
  'Obesity-related laxity',
];

const CONDITIONS_ADDRESSED = [
  {
    title: 'Primary Snoring',
    desc: 'Simple habitual snoring caused by soft palate vibration with no underlying apnoea, the most common indication for laser snoring treatment.',
  },
  {
    title: 'Mild Sleep Apnoea',
    desc: 'Laser tightening can reduce the degree of upper airway collapse in mild obstructive sleep apnoea, complementing other management strategies.',
  },
  {
    title: 'Soft Palate Vibration',
    desc: 'Directly targets the vibratory laxity of the soft palate that produces the characteristic snoring sound during sleep.',
  },
  {
    title: 'Uvula Laxity',
    desc: 'Tightens and firms the uvula to reduce its contribution to airway turbulence and snoring vibration during breathing.',
  },
  {
    title: 'Mouth Breathing',
    desc: 'Improved palatal tone can reduce mouth-breathing related snoring by restoring more efficient nasal and pharyngeal airflow during sleep.',
  },
  {
    title: 'Sleep Disruption (Partner)',
    desc: 'Restoring quiet sleep benefits not only the patient but their sleeping partner, improving shared sleep quality and relationship wellbeing.',
  },
  {
    title: 'Post-Weight Gain Snoring',
    desc: 'Addresses increased tissue laxity and airway narrowing associated with weight gain, reducing snoring severity even where weight loss is ongoing.',
  },
];

const CLINIC_REASONS = [
  { n: '01', text: 'All-in-one clinic with medical & aesthetic services.' },
  { n: '02', text: 'Highly trained, compassionate doctors.' },
  { n: '03', text: 'Customised treatments based on listening & expertise.' },
  { n: '04', text: 'State-of-the-art facilities & modern equipment.' },
  { n: '05', text: 'Strong reputation & excellent reviews.' },
  { n: '06', text: 'Comprehensive care and referrals with specialists.' },
];

const FAQS = [
  {
    question: 'How does laser snoring treatment work?',
    answer:
      'The laser delivers controlled heat energy to the soft palate and uvula, stimulating collagen contraction and tissue remodelling. This tightens lax tissues that vibrate during sleep and cause snoring. The process continues after treatment as new collagen forms, progressively improving snoring reduction over several weeks.',
  },
  {
    question: 'How many sessions will I need?',
    answer:
      'We recommend a course of three sessions spaced approximately three weeks apart for optimal and lasting results. Some patients notice significant improvement after the first or second session, but the full three-session course maximises tissue tightening and extends results to up to 12 to 14 months.',
  },
  {
    question: 'Is laser snoring treatment painful?',
    answer:
      'No. Treatment is very comfortable. Most patients feel only a gentle warmth during the procedure. Any mild throat soreness that follows typically resolves within 24 to 48 hours and is easily managed with standard pain relief if needed.',
  },
  {
    question: 'Is there any downtime after treatment?',
    answer:
      'There is no downtime whatsoever. You can return to work, exercise, and all normal activities immediately. Soft foods and cool drinks are recommended for the first 24 hours, but there are no restrictions on activity or daily life.',
  },
  {
    question: 'How long do the results last?',
    answer:
      'Results from a full course of three sessions typically last 12 to 14 months. An annual maintenance session is recommended to sustain long-term snoring control. Some patients enjoy excellent results for longer depending on lifestyle and individual tissue response.',
  },
  {
    question: 'Can laser snoring treatment help with sleep apnoea?',
    answer:
      'Laser snoring treatment is designed primarily for simple snoring and mild sleep apnoea. Moderate to severe obstructive sleep apnoea requires dedicated management such as CPAP therapy. Our team will assess your sleep history at consultation and advise the most appropriate treatment pathway for your situation.',
  },
];

const RELATED = [
  { title: 'Private GP',        href: '/services/private-gp',       desc: 'Comprehensive private GP appointments for all health concerns.' },
  { title: "Men's Health",      href: '/services/mens-health',       desc: 'Specialist men\'s health services including sexual health and hormones.' },
  { title: 'Health Screening',  href: '/services/health-screening',  desc: 'Full health MOTs and targeted screening programmes.' },
  { title: 'Weight Management', href: '/services/weight-management', desc: 'Medically supervised weight management and lifestyle support.' },
];

/* ── Page component ───────────────────────────────────────────── */
export default function LaserSnoringPage() {
  const [showAllFaqs, setShowAllFaqs] = useState(false);

  return (
    <>
      {/* ════════════════════════════════════════
          1. HERO
      ════════════════════════════════════════ */}
      <section
        className={styles.hero}
        aria-label="Laser Snoring Treatment Leicester, hero"
        data-section-theme="dark"
      >
        {/* Breadcrumb, pinned to top of hero */}
        <div className={styles.heroBreadcrumb}>
          <Container>
            <Breadcrumb
              theme="dark"
              items={[
                { label: 'Treatments', href: '/treatments' },
                { label: 'Laser Snoring Treatment' },
              ]}
            />
          </Container>
        </div>

        <Container>
          <m.div
            className={styles.heroInner}
            variants={stagger(0.12)}
            initial="hidden"
            animate="show"
          >
            {/* Left: text */}
            <div className={styles.heroLeft}>
              <m.span className={styles.heroCategory} variants={fadeUp}>
                Sleep Medicine
              </m.span>

              <m.h1 className={styles.heroTitle} variants={fadeUp}>
                Laser Snoring Treatment Leicester
              </m.h1>

              <m.p className={styles.heroDesc} variants={fadeUp}>
                Non-surgical solution to snoring and sleep disruption , no anaesthetic,
                no downtime, lasting results.
              </m.p>

              <m.div className={styles.heroCtas} variants={fadeUp}>
                <BookConsultationButton className={styles.heroCtaPrimary}>
                  Book Appointment
                </BookConsultationButton>
              </m.div>

              {/* Review badges */}
              <m.div variants={fadeUp}>
                <TrustBadges theme="dark" />
              </m.div>

              {/* Trust items */}
              <m.div className={styles.heroTrust} variants={fadeUp}>
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
              </m.div>
            </div>

            {/* Right: image */}
            <m.div className={styles.heroImageWrap} variants={fadeUp}>
              <Image
                src="/images/Laser snoring treatment1.png"
                alt="Laser snoring treatment in progress at The One Clinic Leicester"
                fill
                priority
                className={styles.heroImage}
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              {/* Subtle bottom-fade to blend with section */}
              <div className={styles.heroImageFade} aria-hidden="true" />
            </m.div>
          </m.div>
        </Container>
      </section>

      {/* ════════════════════════════════════════
          2. WHAT IS LASER SNORING TREATMENT?
      ════════════════════════════════════════ */}
      <Section variant="light" data-section-theme="light" className={styles.sectionGray}>
        <Container>
          <m.div
            className={styles.whatIsGrid}
            variants={stagger(0.12)}
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
          >
            {/* Left: text */}
            <m.div className={styles.whatIsContent} variants={stagger(0.12)}>
              <m.div className={styles.whatIsTextGroup} variants={fadeUp}>
                <p className={styles.eyebrowDark}>About This Treatment</p>
                <h2 className={styles.combinedHeading}>What is Laser Snoring Treatment?</h2>
                <p className={styles.combinedDesc}>
                  Laser snoring treatment uses advanced Er:YAG laser energy to gently tighten the
                  soft palate and uvular tissue , the structures whose vibration during sleep
                  produces snoring. By stimulating collagen contraction and remodelling, the
                  treatment reduces tissue laxity and narrows the airway opening just enough to
                  eliminate the turbulence that causes snoring.
                </p>
                <p className={styles.combinedDesc}>
                  The procedure is entirely non-invasive: no anaesthetic injections, no incisions,
                  no downtime. Most patients complete a course of three sessions spaced three weeks
                  apart and notice a noticeable reduction after the second session, with results
                  lasting up to 12 months.
                </p>
              </m.div>
              <m.div className={styles.combinedCtaWrapper} variants={fadeUp}>
                <BookConsultationButton className={styles.combinedCta}>
                  Book Your Consultation
                </BookConsultationButton>
              </m.div>
            </m.div>

            {/* Right: image panel */}
            <m.div className={styles.whatIsVideoWrap} variants={fadeUp}>
              <Image
                src="/images/Doctor1.jpg"
                alt="Doctor at The One Clinic performing laser snoring treatment assessment"
                fill
                className={styles.whatIsVideoFrame}
                sizes="(max-width: 768px) 100vw, 50vw"
                style={{ objectFit: 'cover', borderRadius: '12px' }}
              />
            </m.div>
          </m.div>
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
          <m.div
            className={styles.sectionHeaderCentre}
            variants={stagger(0.1)}
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
          >
            <m.p className={styles.eyebrowDark} variants={fadeUp}>Quick Facts</m.p>
            <m.h2 className={styles.headingDark} variants={fadeUp}>
              Laser Snoring Treatment at a Glance
            </m.h2>
          </m.div>

          <m.div
            className={styles.glanceStandaloneGrid}
            variants={stagger(0.08)}
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
          >
            {AT_A_GLANCE.map((item) => (
              <m.div key={item.label} className={styles.glanceCard} variants={fadeUp}>
                <span className={styles.glanceIcon}>{item.icon}</span>
                <span className={styles.glanceLabel}>{item.label}</span>
                <span className={styles.glanceValue}>{item.value}</span>
              </m.div>
            ))}
          </m.div>
        </Container>
      </Section>

      {/* ════════════════════════════════════════
          4. OUR LASER SNORING APPROACH
      ════════════════════════════════════════ */}
      <Section variant="dark" data-section-theme="dark">
        <Container>
          <m.div
            className={styles.sectionHeaderCentre}
            variants={stagger(0.1)}
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
          >
            <m.p className={styles.eyebrowLight} variants={fadeUp}>
              Our Approach
            </m.p>
            <m.h2 className={styles.headingLight} variants={fadeUp}>
              Our Laser Snoring Approach
            </m.h2>
            <m.p className={styles.combinationIntroText} variants={fadeUp}>
              At The One Clinic, our laser snoring programme combines clinical assessment,
              precise laser delivery, and a structured maintenance protocol to deliver lasting
              relief from snoring.
            </m.p>
          </m.div>

          <m.div
            className={styles.techCardsGrid}
            variants={stagger(0.1)}
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
          >
            {APPROACH_CARDS.map((card) => (
              <m.div
                key={card.title}
                className={styles.techCard}
                variants={fadeUp}
                whileHover={{ y: -8, transition: { type: 'spring', stiffness: 280, damping: 18 } }}
              >
                <span className={styles.techCardEyebrow}>{card.eyebrow}</span>
                <h3 className={styles.techCardTitle}>{card.title}</h3>
                <p className={styles.techCardDesc}>{card.desc}</p>
              </m.div>
            ))}
          </m.div>

          <m.div
            className={styles.finalResultsBanner}
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
          >
            <p className={styles.finalResultsEyebrow}>The Result</p>
            <p className={styles.finalResultsText}>
              Our structured three-step approach , clinical assessment, laser palate treatment,
              and ongoing maintenance , delivers progressive, measurable snoring reduction with
              results that last up to 12 to 14 months from a single course.
            </p>
          </m.div>
        </Container>
      </Section>

      {/* ════════════════════════════════════════
          5. TREATMENT JOURNEY
      ════════════════════════════════════════ */}
      <Section variant="light" data-section-theme="light" className={styles.journeySection}>
        <Container>
          <m.div
            className={styles.sectionHeaderCentre}
            variants={stagger(0.1)}
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
          >
            <m.p className={styles.eyebrowDark} variants={fadeUp}>
              What to Expect
            </m.p>
            <m.h2 className={styles.headingDark} variants={fadeUp}>
              Your Treatment Journey
            </m.h2>
          </m.div>

          <m.ol
            className={styles.journeyList}
            variants={stagger(0.12)}
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
            aria-label="Laser snoring treatment journey steps"
          >
            {JOURNEY_STEPS.map((step) => (
              <m.li key={step.n} className={styles.journeyStep} variants={fadeUp}>
                <div className={styles.stepLeft}>
                  <div className={styles.stepNumCircle} aria-hidden="true">{step.n}</div>
                  <div className={styles.stepConnector} aria-hidden="true" />
                </div>
                <div className={styles.stepBody}>
                  <h3 className={styles.stepTitle}>{step.title}</h3>
                  <p className={styles.stepDesc}>{step.desc}</p>
                </div>
              </m.li>
            ))}
          </m.ol>
        </Container>
      </Section>

      {/* ════════════════════════════════════════
          6. BENEFITS
      ════════════════════════════════════════ */}
      <Section variant="light" data-section-theme="light" className={styles.whiteBgSection}>
        <div className={styles.whiteBgWrap} aria-hidden="true">
          <Image src="/bg-image-white.png" alt="" fill className={styles.whiteBgImg} sizes="100vw" />
        </div>
        <Container className={styles.whiteBgContent}>
          <m.div
            className={styles.sectionHeaderCentre}
            variants={stagger(0.1)}
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
          >
            <m.h2 className={styles.headingDark} variants={fadeUp}>
              Laser Snoring Treatment Benefits
            </m.h2>
          </m.div>

          <m.div
            className={styles.treatedBenefitsGrid}
            variants={stagger(0.08)}
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
          >
            {BENEFITS.map((b) => (
              <m.div
                key={b.title}
                className={styles.treatedBenefitCard}
                variants={fadeUp}
                whileHover={{ y: -8, transition: { type: 'spring', stiffness: 280, damping: 18 } }}
              >
                <span className={styles.treatedBenefitIconWrap} aria-hidden="true">
                  {b.icon}
                </span>
                <h3 className={styles.treatedBenefitTitle}>{b.title}</h3>
                <p className={styles.treatedBenefitDesc}>{b.desc}</p>
              </m.div>
            ))}
          </m.div>
        </Container>
      </Section>

      {/* ════════════════════════════════════════
          7. ELIGIBILITY
      ════════════════════════════════════════ */}
      <Section variant="dark" data-section-theme="dark">
        <Container>
          <m.div
            className={styles.sectionHeaderCentre}
            variants={stagger(0.1)}
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
          >
            <m.p className={styles.eyebrowLight} variants={fadeUp}>
              Is This Right for You?
            </m.p>
            <m.h2 className={styles.headingLight} variants={fadeUp}>
              Who is Suitable for Laser Snoring Treatment?
            </m.h2>
          </m.div>

          <m.div
            className={styles.eligibilityWrap}
            variants={stagger(0.1)}
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
          >
            <m.p className={styles.eligibilityIntro} variants={fadeUp}>
              Laser snoring treatment is suitable for:
            </m.p>
            <m.ul className={styles.eligibilityList} role="list" variants={stagger(0.1)}>
              {ELIGIBILITY_SUITABLE.map((item) => (
                <m.li key={item} className={styles.eligibilityItem} variants={fadeUp}>
                  <span className={styles.eligibilityCheck} aria-hidden="true">
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <polyline points="2,7 5.5,10.5 12,3.5" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </span>
                  <span>{item}</span>
                </m.li>
              ))}
            </m.ul>
            <m.p className={styles.eligibilityIntro} variants={fadeUp} style={{ marginTop: '1.5rem' }}>
              Treatment is NOT suitable for:
            </m.p>
            <m.ul className={styles.eligibilityList} role="list" variants={stagger(0.1)}>
              {ELIGIBILITY_NOT_SUITABLE.map((item) => (
                <m.li key={item} className={styles.eligibilityItem} variants={fadeUp}>
                  <span className={styles.eligibilityCheck} aria-hidden="true">
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <line x1="3" y1="3" x2="11" y2="11" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round"/>
                      <line x1="11" y1="3" x2="3" y2="11" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round"/>
                    </svg>
                  </span>
                  <span>{item}</span>
                </m.li>
              ))}
            </m.ul>
            <m.p className={styles.eligibilityClosing} variants={fadeUp}>
              If you are unsure whether laser snoring treatment is right for you, book a consultation and our doctors will advise you.
            </m.p>
            <m.div variants={fadeUp}>
              <BookConsultationButton className={`${styles.combinedCta} ${styles.ctaWhiteInvert}`}>
                Book Your Consultation
              </BookConsultationButton>
            </m.div>
          </m.div>
        </Container>
      </Section>

      {/* ════════════════════════════════════════
          8. HOW IT WORKS , THE SCIENCE
      ════════════════════════════════════════ */}
      <Section variant="light" data-section-theme="light" className={styles.howSection}>
        <Container>
          <m.div
            className={styles.sectionHeaderCentre}
            variants={stagger(0.1)}
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
          >
            <m.h2 className={styles.headingDark} variants={fadeUp}>
              How Does Laser Snoring Treatment Work?
            </m.h2>
          </m.div>

          <m.div
            className={styles.howTextGrid}
            variants={stagger(0.1)}
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
          >
            <m.p className={styles.howPara} variants={fadeUp}>
              Snoring occurs when the soft palate and uvula , the soft tissues at the back of the
              throat , relax and vibrate as air passes through during sleep. Our laser delivers
              precise, controlled heat energy to these tissues, causing immediate collagen
              contraction that tightens the structures and reduces their tendency to vibrate.
            </m.p>
            <m.p className={styles.howPara} variants={fadeUp}>
              Beyond the immediate thermal effect, the laser stimulates the body&apos;s own collagen
              remodelling response. New collagen fibres form over the following weeks, progressively
              firming and stabilising the soft palate and uvula. This ongoing biological response
              means results continue to improve for several weeks after each session.
            </m.p>
          </m.div>

          <m.div
            className={styles.howCoversWrap}
            variants={stagger(0.08)}
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
          >
            <m.p className={styles.howCoversLabel} variants={fadeUp}>Laser Snoring Treatment Addresses</m.p>
            <m.ul className={styles.howCoversList} role="list" variants={stagger(0.08)}>
              {[
                'Soft palate laxity',
                'Uvular vibration',
                'Oropharyngeal narrowing',
                'Tissue relaxation during sleep',
                'Positional and habitual snoring',
                'Post-weight gain tissue laxity',
              ].map((item) => (
                <m.li key={item} className={styles.howCoversItem} variants={fadeUp}>
                  <span className={styles.howCoversCheck} aria-hidden="true">
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                      <polyline points="2,6 5,9 10,3" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </span>
                  {item}
                </m.li>
              ))}
            </m.ul>
          </m.div>
        </Container>
      </Section>

      {/* ════════════════════════════════════════
          9. RESULTS & AFTERCARE
      ════════════════════════════════════════ */}
      <Section variant="dark" data-section-theme="dark">
        <Container>
          <m.div
            className={styles.sectionHeaderCentre}
            variants={stagger(0.1)}
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
          >
            <m.p className={styles.eyebrowLight} variants={fadeUp}>
              Post-Treatment
            </m.p>
            <m.h2 className={styles.headingLight} variants={fadeUp}>
              What to Expect After Treatment
            </m.h2>
          </m.div>

          <m.div
            className={styles.resultsAfterGrid}
            variants={stagger(0.1)}
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
          >
            {/* Card 1 , Results Timeline */}
            <m.div className={styles.resultsAfterCard} variants={fadeUp}>
              <div className={styles.resultsAfterCardHead}>
                <span className={styles.resultsAfterCardIcon} aria-hidden="true">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/>
                    <polyline points="17 6 23 6 23 12"/>
                  </svg>
                </span>
                <h3 className={styles.resultsAfterCardTitle}>When Will You See Results?</h3>
              </div>
              <p className={styles.resultsAfterCardBody}>
                Mild throat soreness may be present for 24 to 48 hours after each session. A
                noticeable reduction in snoring is typically experienced after the second session,
                with full results developing by the end of the three-session course.
              </p>
              <div className={styles.resultsAfterCardSpacer} />
              <p className={styles.resultsAfterCardNote}>
                Results last up to 12 to 14 months from a full course. An annual maintenance
                session is recommended to sustain long-term snoring control.
              </p>
            </m.div>

            {/* Card 2 , Side Effects */}
            <m.div className={styles.resultsAfterCard} variants={fadeUp}>
              <div className={styles.resultsAfterCardHead}>
                <span className={styles.resultsAfterCardIcon} aria-hidden="true">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10"/>
                    <line x1="12" y1="8" x2="12" y2="12"/>
                    <line x1="12" y1="16" x2="12.01" y2="16"/>
                  </svg>
                </span>
                <h3 className={styles.resultsAfterCardTitle}>Side Effects</h3>
              </div>
              <p className={styles.resultsAfterCardBody}>
                Laser snoring treatment is very well tolerated. Typical temporary effects include:
              </p>
              <ul className={styles.resultsAfterCardList} role="list">
                {[
                  'Mild throat soreness for 24 to 48 hours',
                  'Slight warmth or tingling sensation in the throat',
                  'Occasional mild swelling, resolving within days',
                ].map((item) => (
                  <li key={item} className={styles.resultsAfterCardListItem}>
                    <span className={styles.resultsAfterDot} aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
              <div className={styles.resultsAfterCardSpacer} />
              <p className={styles.resultsAfterCardNote}>
                Serious side effects are extremely rare when treatment is performed by a
                trained clinician. Most patients experience no significant discomfort.
              </p>
            </m.div>

            {/* Card 3 , Aftercare */}
            <m.div className={styles.resultsAfterCard} variants={fadeUp}>
              <div className={styles.resultsAfterCardHead}>
                <span className={styles.resultsAfterCardIcon} aria-hidden="true">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                    <polyline points="22 4 12 14.01 9 11.01"/>
                  </svg>
                </span>
                <h3 className={styles.resultsAfterCardTitle}>Aftercare Tips</h3>
              </div>
              <ul className={styles.resultsAfterCardList} role="list">
                {[
                  'Prefer soft foods and cool drinks for the first 24 hours',
                  'Avoid smoking, alcohol, and very hot food for 48 hours',
                  'Stay well hydrated to support tissue healing',
                  'Follow your doctor\'s personalised aftercare guidance for best results',
                ].map((item) => (
                  <li key={item} className={styles.resultsAfterCardListItem}>
                    <span className={styles.resultsAfterDot} aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
            </m.div>
          </m.div>
        </Container>
      </Section>

      {/* ════════════════════════════════════════
          10. CONDITIONS WE ADDRESS
      ════════════════════════════════════════ */}
      <Section variant="light" data-section-theme="light" className={styles.whiteBgSection}>
        <div className={styles.whiteBgWrap} aria-hidden="true">
          <Image src="/bg-image-white.png" alt="" fill className={styles.whiteBgImg} sizes="100vw" />
        </div>
        <Container className={styles.whiteBgContent}>
          <m.div
            className={styles.sectionHeaderCentre}
            variants={stagger(0.1)}
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
          >
            <m.p className={styles.eyebrowDark} variants={fadeUp}>
              Conditions We Address
            </m.p>
            <m.h2 className={styles.headingDark} variants={fadeUp}>
              Snoring Conditions Treated at The One Clinic
            </m.h2>
            <m.p className={styles.beforeAfterSubheading} variants={fadeUp}>
              Our laser snoring programme addresses a wide range of snoring causes and associated sleep disruption.
            </m.p>
          </m.div>

          <m.div
            className={styles.treatedBenefitsGrid}
            variants={stagger(0.08)}
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
          >
            {CONDITIONS_ADDRESSED.map((c) => (
              <m.div
                key={c.title}
                className={styles.treatedBenefitCard}
                variants={fadeUp}
                whileHover={{ y: -8, transition: { type: 'spring', stiffness: 280, damping: 18 } }}
              >
                <h3 className={styles.treatedBenefitTitle}>{c.title}</h3>
                <p className={styles.treatedBenefitDesc}>{c.desc}</p>
              </m.div>
            ))}
          </m.div>
        </Container>
      </Section>

      {/* ════════════════════════════════════════
          11. TESTIMONIALS
      ════════════════════════════════════════ */}
      <Testimonials />

      {/* ════════════════════════════════════════
          12. CTA BANNER
      ════════════════════════════════════════ */}
      <section className={styles.ctaBanner} data-section-theme="dark" aria-label="Book laser snoring treatment consultation">
        {/* Watermark logo */}
        <div className={styles.ctaBannerLogoWrap} aria-hidden="true">
          <Image
            src="/images/Background-logo.png"
            alt=""
            fill
            className={styles.ctaBannerLogo}
            sizes="100vw"
          />
        </div>
        <Container>
          <m.div
            className={styles.ctaBannerContent}
            variants={stagger(0.12)}
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
          >
            <m.h2 className={styles.ctaBannerHeading} variants={fadeUp}>
              Sleep Better. Live Better.
            </m.h2>
            <m.p className={styles.ctaBannerSub} variants={fadeUp}>
              Let our experts create your personalised laser snoring treatment plan.
            </m.p>
            <m.div variants={fadeUp}>
              <BookConsultationButton className={styles.ctaBannerBtn}>
                Book Consultation
              </BookConsultationButton>
            </m.div>
          </m.div>
        </Container>
      </section>

      {/* ════════════════════════════════════════
          13. TREATMENT AREAS
      ════════════════════════════════════════ */}
      <Section variant="dark" data-section-theme="dark" className={styles.conditionsSection}>
        <Container>
          <m.div
            className={styles.sectionHeaderCentre}
            variants={stagger(0.1)}
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
          >
            <m.p className={styles.eyebrowLight} variants={fadeUp}>
              Treatment Areas
            </m.p>
            <m.h2 className={styles.headingLight} variants={fadeUp}>
              Tissue Areas Treated &amp; Snoring Causes Addressed
            </m.h2>
            <m.p className={styles.conditionsIntro} variants={fadeUp}>
              Laser snoring treatment precisely targets the upper airway tissues responsible for
              snoring, addressing both the anatomy and the underlying causes.
            </m.p>
          </m.div>

          <m.div
            className={styles.areasColumns}
            variants={stagger(0.1)}
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
          >
            <m.div
              className={styles.areasGroup}
              variants={fadeUp}
              whileHover={{ y: -6, transition: { type: 'spring', stiffness: 280, damping: 20 } }}
            >
              <p className={styles.areasGroupLabel}>Tissue Areas Treated</p>
              <ul className={styles.areasGroupList} role="list">
                {CONDITIONS_TISSUE.map((area) => (
                  <li key={area} className={styles.areasGroupItem}>
                    <span className={styles.areasItemDot} aria-hidden="true" />
                    {area}
                  </li>
                ))}
              </ul>
            </m.div>

            <m.div
              className={styles.areasGroup}
              variants={fadeUp}
              whileHover={{ y: -6, transition: { type: 'spring', stiffness: 280, damping: 20 } }}
            >
              <p className={styles.areasGroupLabel}>Snoring Causes Addressed</p>
              <ul className={styles.areasGroupList} role="list">
                {CONDITIONS_CAUSES.map((cause) => (
                  <li key={cause} className={styles.areasGroupItem}>
                    <span className={styles.areasItemDot} aria-hidden="true" />
                    {cause}
                  </li>
                ))}
              </ul>
            </m.div>
          </m.div>
        </Container>
      </Section>

      {/* ════════════════════════════════════════
          14. BEST LEICESTER EXPERIENCE
      ════════════════════════════════════════ */}
      <Section variant="light" data-section-theme="light" className={styles.clinicIntroSection}>
        <Container>
          <m.div
            className={styles.clinicIntroBody}
            variants={stagger(0.12)}
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
          >
            <m.div className={styles.clinicIntroLeft} variants={fadeUp}>
              <p className={styles.eyebrowDark}>Laser Snoring Treatment</p>
              <h2 className={styles.combinedHeading}>
                Best Laser Snoring<br />Leicester Experience
              </h2>
            </m.div>
            <m.p className={styles.clinicIntroDesc} variants={fadeUp}>
              Experience the best laser snoring treatment in Leicester at The One Clinic. Our expert
              doctors deliver safe, non-surgical palatal laser treatment to reduce snoring and restore
              peaceful sleep. Enjoy lasting results with zero downtime and personalised care
              tailored to your sleep needs.
            </m.p>
          </m.div>
        </Container>
      </Section>

      {/* ════════════════════════════════════════
          15. COST BANNER
      ════════════════════════════════════════ */}
      <section className={styles.costBanner} data-section-theme="dark" aria-label="Laser snoring treatment cost">
        <Container>
          <m.div
            className={styles.costBannerInner}
            variants={stagger(0.12)}
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
          >
            <m.p className={styles.costBannerEyebrow} variants={fadeUp}>
              Laser Snoring Treatment Cost at The One Clinic
            </m.p>
            <m.p className={styles.costBannerPrice} variants={fadeUp}>
              From £400 per Session / Course of 3 Available
            </m.p>
            <m.p className={styles.costBannerNote} variants={fadeUp}>
              The final price depends on your personalised treatment plan and will be discussed
              during your consultation with our expert.
            </m.p>
            <m.div variants={fadeUp}>
              <BookConsultationButton className={styles.ctaBannerBtn}>
                Book A Consultation
              </BookConsultationButton>
            </m.div>
          </m.div>
        </Container>
      </section>

      {/* ════════════════════════════════════════
          16. WHY CHOOSE THE ONE CLINIC
      ════════════════════════════════════════ */}
      <Section variant="dark" data-section-theme="dark">
        <Container>
          <m.div
            className={styles.sectionHeaderCentre}
            variants={stagger(0.1)}
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
          >
            <m.h2 className={styles.headingLight} variants={fadeUp}>
              Why Choose The One Clinic For Laser Snoring Treatment
            </m.h2>
          </m.div>

          <m.div
            className={styles.clinicReasonsGrid}
            variants={stagger(0.08)}
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
          >
            {CLINIC_REASONS.map((r) => (
              <m.div
                key={r.n}
                className={styles.clinicReasonCard}
                variants={fadeUp}
                whileHover={{ y: -6, transition: { type: 'spring', stiffness: 280, damping: 20 } }}
              >
                <span className={styles.clinicReasonNumber}>{r.n}</span>
                <p className={styles.clinicReasonText}>{r.text}</p>
              </m.div>
            ))}
          </m.div>
        </Container>
      </Section>

      {/* ════════════════════════════════════════
          17. MEET THE EXPERTS
      ════════════════════════════════════════ */}
      <MeetTheExperts />

      {/* ════════════════════════════════════════
          18. FAQ
      ════════════════════════════════════════ */}
      <section className={styles.faqSection} data-section-theme="dark">
        <div className={styles.faqInner}>
          <Container>
            <m.div
              className={styles.sectionHeaderCentre}
              variants={stagger(0.1)}
              initial="hidden"
              whileInView="show"
              viewport={VIEWPORT}
            >
              <m.p className={styles.eyebrowLight} variants={fadeUp}>FAQ</m.p>
              <m.h2 className={styles.headingLight} variants={fadeUp}>
                Frequently Asked Questions
              </m.h2>
            </m.div>

            <m.div
              className={styles.faqBody}
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={VIEWPORT}
            >
              <Accordion items={showAllFaqs ? FAQS : FAQS.slice(0, 5)} theme="dark" />

              {FAQS.length > 5 && (
                <div className={styles.faqToggleWrap}>
                  <button
                    className={styles.faqToggleBtn}
                    onClick={() => setShowAllFaqs((v) => !v)}
                    aria-expanded={showAllFaqs}
                  >
                    {showAllFaqs ? (
                      <>
                        Show Less
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                          <path d="M4 10l4-4 4 4" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </>
                    ) : (
                      <>
                        Show More
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                          <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </>
                    )}
                  </button>
                </div>
              )}
            </m.div>
          </Container>
        </div>
      </section>

      {/* ════════════════════════════════════════
          19. BOOKING FORM
      ════════════════════════════════════════ */}
      <LeadForm />

      {/* ════════════════════════════════════════
          20. RELATED TREATMENTS
      ════════════════════════════════════════ */}
      <Section variant="light" data-section-theme="light" className={styles.sectionGray}>
        <Container>
          <m.div
            className={styles.sectionHeaderCentre}
            variants={stagger(0.1)}
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
          >
            <m.p className={styles.eyebrowDark} variants={fadeUp}>
              Explore More
            </m.p>
            <m.h2 className={styles.headingDark} variants={fadeUp}>
              Related Treatments
            </m.h2>
          </m.div>

          <m.div
            className={styles.relatedGrid}
            variants={stagger(0.1)}
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
          >
            {RELATED.map((r) => (
              <m.div key={r.title} variants={fadeUp}>
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
              </m.div>
            ))}
          </m.div>
        </Container>
      </Section>

      {/* ════════════════════════════════════════
          21. FINAL CTA
      ════════════════════════════════════════ */}
      <FinalCTA />
    </>
  );
}
