'use client';

import { useState } from 'react';
import Image              from 'next/image';
import { motion }         from 'framer-motion';
import Section            from '@/components/ui/Section';
import Container          from '@/components/ui/Container';
import Accordion          from '@/components/ui/Accordion';
import BookConsultationButton from '@/components/ui/BookConsultationButton';
import TrustBadges        from '@/components/ui/TrustBadges';
import Breadcrumb         from '@/components/ui/Breadcrumb';
import LeadForm           from '@/components/sections/LeadForm';
import MeetTheExperts     from '@/components/sections/MeetTheExperts';
import Testimonials       from '@/components/sections/Testimonials';
import TrustStrip         from '@/components/sections/TrustStrip';
import FinalCTA           from '@/components/sections/FinalCTA';
import { fadeUp, stagger, VIEWPORT } from '@/lib/motion';
import styles             from './page.module.css';

/* ── Static data ───────────────────────────────────────────────── */

const AT_A_GLANCE = [
  {
    label: 'Treatment Duration',
    value: 'Up to 60 minutes',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
      </svg>
    ),
  },
  {
    label: 'Treatment Frequency',
    value: 'Usually 1 time procedure',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>
      </svg>
    ),
  },
  {
    label: 'Downtime',
    value: '2–3 weeks',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
      </svg>
    ),
  },
  {
    label: 'Results Longevity',
    value: 'Generally permanent',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/>
      </svg>
    ),
  },
  {
    label: 'Haemorrhoidectomy Cost',
    value: 'Starts from £',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
      </svg>
    ),
  },
  {
    label: 'Appointment Type',
    value: 'In-clinic',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M3 21h18"/><path d="M5 21V7l8-4v4"/><path d="M19 21V11l-6-4"/><path d="M9 21v-4h6v4"/>
      </svg>
    ),
  },
];

const PROCEDURE_STEPS = [
  {
    num: '01',
    title: 'Assessment',
    desc: 'Haemorrhoids are removed under local anaesthetic. The doctor assesses the severity.',
  },
  {
    num: '02',
    title: 'Surgical Excision',
    desc: 'Internal and external haemorrhoids are carefully excised using minor surgery.',
  },
  {
    num: '03',
    title: 'Wound Management',
    desc: 'Wound is managed for quick healing and comfort.',
  },
];

const TREATMENT_BENEFITS = [
  {
    title: 'Relieves Pain & Discomfort',
    desc: 'Stops constant irritation, itching, and soreness around the anus.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>
      </svg>
    ),
  },
  {
    title: 'Stops Bleeding',
    desc: 'Gets rid of troublesome bleeding during bowel movements.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M12 2C12 2 5 10 5 15a7 7 0 0 0 14 0c0-5-7-13-7-13z"/>
      </svg>
    ),
  },
  {
    title: 'Permanent Solution',
    desc: 'Provides long-term relief, reducing the chance of recurrence.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
      </svg>
    ),
  },
  {
    title: 'Fixes Prolapse',
    desc: 'Corrects haemorrhoids that bulge or hang out of the anus.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/>
      </svg>
    ),
  },
  {
    title: 'Improves Daily Life',
    desc: 'Makes sitting, moving, and bowel movements comfortable again.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="12" cy="12" r="10"/><path d="M8 14s1.5 2 4 2 4-2 4-2"/><line x1="9" y1="9" x2="9.01" y2="9"/><line x1="15" y1="9" x2="15.01" y2="9"/>
      </svg>
    ),
  },
  {
    title: 'Emergency Relief',
    desc: 'Treats severe or thrombosed haemorrhoids quickly.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M22 12h-4l-3 9L9 3l-3 9H2"/>
      </svg>
    ),
  },
];

const ELIGIBILITY = [
  'Pain or swelling that makes sitting uncomfortable',
  'Bleeding during bowel movements',
  'Itching or irritation',
  'Recurring haemorrhoids',
  'Hygiene problems',
];

const CAUSES = [
  {
    n: '01',
    title: 'Chronic Constipation & Straining',
    desc: 'Repeated straining during bowel movements increases pressure in the veins of the lower rectum, causing them to swell and form haemorrhoids over time.',
  },
  {
    n: '02',
    title: 'Low-Fibre Diet',
    desc: 'A diet lacking in fibre produces hard, difficult-to-pass stools. This leads to straining, which is a primary driver of haemorrhoid development and worsening.',
  },
  {
    n: '03',
    title: 'Prolonged Sitting',
    desc: 'Spending long periods seated, particularly on the toilet, places sustained pressure on the rectal veins and can contribute to the formation of haemorrhoids.',
  },
  {
    n: '04',
    title: 'Pregnancy & Childbirth',
    desc: 'The growing uterus during pregnancy increases pressure on the pelvic veins. Straining during labour further elevates the risk of developing haemorrhoids.',
  },
  {
    n: '05',
    title: 'Ageing',
    desc: 'The connective tissue supporting the veins of the rectum and anus weakens naturally with age, making haemorrhoids more likely to develop or prolapse.',
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
    question: 'Who can benefit from haemorrhoid removal?',
    answer:
      'Anyone suffering from painful, bleeding, or prolapsed haemorrhoids that haven\'t improved with lifestyle changes or non-surgical treatments.',
  },
  {
    question: 'Is haemorrhoid removal painful?',
    answer:
      'Most patients feel minimal discomfort during the procedure. Post-surgery soreness is common but manageable with pain relief.',
  },
  {
    question: 'How is the procedure done?',
    answer:
      'Haemorrhoids are removed using minor surgery under local anaesthetic. Alternative methods like laser or radiofrequency may be used depending on the condition.',
  },
  {
    question: 'How long does it take to recover?',
    answer:
      'Recovery after haemorrhoidectomy may take 2-3 weeks, during which you may experience mild soreness, swelling, or occasional bleeding.',
  },
  {
    question: 'Will haemorrhoids come back?',
    answer:
      'Removing the haemorrhoids with minor surgery provides long-term relief, but new haemorrhoids can appear if lifestyle factors aren\'t managed.',
  },
  {
    question: 'Do I need follow-up appointments?',
    answer:
      'Yes, to check healing and ensure complete recovery, your doctor may schedule visits.',
  },
  {
    question: 'Can I sit and move normally after haemorrhoid removal surgery?',
    answer:
      'Yes, most patients can resume light daily activities quickly, though heavy lifting or straining should be avoided initially.',
  },
  {
    question: 'Are there any risks?',
    answer:
      'Side effects can include temporary pain, bleeding, infection, or rare anal narrowing, which your doctor will explain before treatment.',
  },
];

/* ── Page component ─────────────────────────────────────────────── */
export default function HaemorrhoidRemovalPage() {
  const [showAllFaqs, setShowAllFaqs] = useState(false);

  return (
    <>
      {/* ════════════════════════════════════════
          1. HERO
      ════════════════════════════════════════ */}
      <section
        className={styles.hero}
        aria-label="Haemorrhoid removal Leicester, hero"
        data-section-theme="dark"
      >
        <div className={styles.heroBreadcrumb}>
          <Container>
            <Breadcrumb
              theme="dark"
              items={[
                { label: 'Treatments', href: '/treatments' },
                { label: 'Haemorrhoid Removal' },
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
            {/* Left: text */}
            <div className={styles.heroLeft}>
              <motion.span className={styles.heroCategory} variants={fadeUp}>
                Health &amp; Wellbeing
              </motion.span>

              <motion.h1 className={styles.heroTitle} variants={fadeUp}>
                Haemorrhoid Removal in Leicester
              </motion.h1>

              <motion.p className={styles.heroDesc} variants={fadeUp}>
                Get expert in-clinic haemorrhoid removal for lasting relief and comfort.
              </motion.p>

              <motion.div className={styles.heroCtas} variants={fadeUp}>
                <BookConsultationButton className={styles.heroCtaPrimary}>
                  Book a Consultation
                </BookConsultationButton>
              </motion.div>

              <motion.div variants={fadeUp}>
                <TrustBadges theme="dark" />
              </motion.div>

              <motion.div className={styles.heroTrust} variants={fadeUp}>
                <span className={styles.heroTrustItem}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                  </svg>
                  GMC-registered doctors
                </span>
                <span className={styles.heroTrustDivider} aria-hidden="true" />
                <span className={styles.heroTrustItem}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M3 21h18"/><path d="M5 21V7l8-4v4"/><path d="M19 21V11l-6-4"/>
                  </svg>
                  No hospital stay required
                </span>
                <span className={styles.heroTrustDivider} aria-hidden="true" />
                <span className={styles.heroTrustItem}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
                  </svg>
                  Same-day procedures available
                </span>
              </motion.div>
            </div>

            {/* Right: image */}
            <motion.div className={styles.heroImageWrap} variants={fadeUp}>
              <Image
                src="/images/Minor Surgery.jpg"
                alt="Haemorrhoid removal procedure at The One Clinic Leicester"
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
          2. PATIENT REVIEWS
      ════════════════════════════════════════ */}
      <Testimonials />

      {/* ════════════════════════════════════════
          3. AWARDS & ACHIEVEMENTS
      ════════════════════════════════════════ */}
      <TrustStrip />

      {/* ════════════════════════════════════════
          4. WHAT IS HAEMORRHOID REMOVAL?
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
            {/* Left: text + CTA */}
            <motion.div className={styles.whatIsContent} variants={stagger(0.12)}>
              <motion.div className={styles.whatIsTextGroup} variants={fadeUp}>
                <p className={styles.eyebrowDark}>About This Condition</p>
                <h2 className={styles.combinedHeading}>What is Haemorrhoidectomy?</h2>
                <p className={styles.combinedDesc}>
                  Haemorrhoid removal is a medical procedure to treat swollen or painful veins
                  (haemorrhoids) around the anus. Haemorrhoids can cause pain, bleeding, itching,
                  and discomfort.
                </p>
                <p className={styles.combinedDesc}>
                  When conservative management — such as dietary changes, topical creams, or
                  sitz baths — fails to provide lasting relief, surgical removal offers a
                  definitive solution. At The One Clinic Leicester, our doctors assess your
                  case thoroughly and recommend the most appropriate procedure for your grade
                  of haemorrhoid and individual circumstances.
                </p>
              </motion.div>

              <motion.div className={styles.combinedCtaWrapper} variants={fadeUp}>
                <BookConsultationButton className={styles.combinedCta}>
                  Book Your Consultation
                </BookConsultationButton>
              </motion.div>
            </motion.div>

            {/* Right: image */}
            <motion.div className={styles.whatIsVideoWrap} variants={fadeUp}>
              <Image
                src="/images/Doctor1.jpg"
                alt="Doctor at The One Clinic Leicester consulting a patient"
                fill
                className={styles.whatIsVideoFrame}
                sizes="(max-width: 900px) 100vw, 50vw"
              />
            </motion.div>
          </motion.div>
        </Container>
      </Section>

      {/* ════════════════════════════════════════
          5. AT A GLANCE
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
            <motion.p className={styles.eyebrowDark} variants={fadeUp}>Quick Facts</motion.p>
            <motion.h2 className={styles.headingDark} variants={fadeUp}>
              Haemorrhoidectomy at a Glance
            </motion.h2>
          </motion.div>

          <motion.div
            className={styles.glanceStandaloneGrid}
            variants={stagger(0.08)}
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
          >
            {AT_A_GLANCE.map((item) => (
              <motion.div key={item.label} className={styles.glanceCard} variants={fadeUp}>
                <span className={styles.glanceIcon}>{item.icon}</span>
                <span className={styles.glanceLabel}>{item.label}</span>
                <span className={styles.glanceValue}>{item.value}</span>
              </motion.div>
            ))}
          </motion.div>
        </Container>
      </Section>

      {/* ════════════════════════════════════════
          6. THE PROCEDURE — THREE STEPS
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
            <motion.p className={styles.eyebrowLight} variants={fadeUp}>The Process</motion.p>
            <motion.h2 className={styles.headingLight} variants={fadeUp}>
              Haemorrhoidectomy Procedure
            </motion.h2>
            <motion.p className={styles.combinationIntroText} variants={fadeUp}>
              The procedure is designed to remove haemorrhoids safely and efficiently under local anaesthetic.
            </motion.p>
          </motion.div>

          <motion.div
            className={styles.techCardsGrid}
            variants={stagger(0.1)}
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
          >
            {PROCEDURE_STEPS.map((step) => (
              <motion.div key={step.num} className={styles.techCard} variants={fadeUp}>
                <span className={styles.techCardEyebrow}>{step.num}</span>
                <h3 className={styles.techCardTitle}>{step.title}</h3>
                <p className={styles.techCardDesc}>{step.desc}</p>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            className={styles.finalResultsBanner}
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
          >
            <p className={styles.finalResultsEyebrow}>After Your Procedure</p>
            <p className={styles.finalResultsText}>
              You will be able to walk out of the clinic on the day with a managed wound plan.
              Most patients experience immediate symptom relief, with complete healing occurring
              over 2–3 weeks with proper aftercare.
            </p>
          </motion.div>
        </Container>
      </Section>

      {/* ════════════════════════════════════════
          7. TREATMENT BENEFITS
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
            <motion.p className={styles.eyebrowDark} variants={fadeUp}>What You Gain</motion.p>
            <motion.h2 className={styles.headingDark} variants={fadeUp}>
              Haemorrhoid Removal Benefits
            </motion.h2>
          </motion.div>

          <motion.div
            className={styles.treatedBenefitsGrid}
            variants={stagger(0.08)}
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
          >
            {TREATMENT_BENEFITS.map((b) => (
              <motion.div
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
              </motion.div>
            ))}
          </motion.div>
        </Container>
      </Section>

      {/* ════════════════════════════════════════
          8. IS THIS RIGHT FOR YOU?
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
              Is This Right for You?
            </motion.p>
            <motion.h2 className={styles.headingLight} variants={fadeUp}>
              Why Choose Haemorrhoid Removal Treatment?
            </motion.h2>
          </motion.div>

          <motion.div
            className={styles.eligibilityWrap}
            variants={stagger(0.1)}
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
          >
            <motion.p className={styles.eligibilityIntro} variants={fadeUp}>
              You may choose haemorrhoidectomy if you have:
            </motion.p>
            <motion.ul className={styles.eligibilityList} role="list" variants={stagger(0.1)}>
              {ELIGIBILITY.map((item) => (
                <motion.li key={item} className={styles.eligibilityItem} variants={fadeUp}>
                  <span className={styles.eligibilityCheck} aria-hidden="true">
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <polyline points="2,7 5.5,10.5 12,3.5" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </span>
                  <span>{item}</span>
                </motion.li>
              ))}
            </motion.ul>
            <motion.p className={styles.eligibilityClosing} variants={fadeUp}>
              If any of the above apply to you, book a consultation and our doctor will
              assess whether surgical removal is the right course of action for your case.
            </motion.p>
            <motion.div variants={fadeUp}>
              <BookConsultationButton className={`${styles.combinedCta} ${styles.ctaWhiteInvert}`}>
                Book Your Consultation
              </BookConsultationButton>
            </motion.div>
          </motion.div>
        </Container>
      </Section>

      {/* ════════════════════════════════════════
          9. WHAT CAUSES HAEMORRHOIDS?
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
            <motion.p className={styles.eyebrowDark} variants={fadeUp}>Understanding the Causes</motion.p>
            <motion.h2 className={styles.headingDark} variants={fadeUp}>
              What Causes Haemorrhoids?
            </motion.h2>
          </motion.div>

          <motion.ol
            className={styles.journeyList}
            variants={stagger(0.12)}
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
            aria-label="Common causes of haemorrhoids"
          >
            {CAUSES.map((cause) => (
              <motion.li key={cause.n} className={styles.journeyStep} variants={fadeUp}>
                <div className={styles.stepLeft}>
                  <div className={styles.stepNumCircle} aria-hidden="true">{cause.n}</div>
                  <div className={styles.stepConnector} aria-hidden="true" />
                </div>
                <div className={styles.stepBody}>
                  <h3 className={styles.stepTitle}>{cause.title}</h3>
                  <p className={styles.stepDesc}>{cause.desc}</p>
                </div>
              </motion.li>
            ))}
          </motion.ol>
        </Container>
      </Section>

      {/* ════════════════════════════════════════
          10. HOW DOES THE PROCEDURE WORK?
      ════════════════════════════════════════ */}
      <Section variant="light" data-section-theme="light" className={styles.howSection}>
        <Container>
          <motion.div
            className={styles.sectionHeaderCentre}
            variants={stagger(0.1)}
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
          >
            <motion.p className={styles.eyebrowDark} variants={fadeUp}>The Science</motion.p>
            <motion.h2 className={styles.headingDark} variants={fadeUp}>
              How Does a Haemorrhoid Removal Work?
            </motion.h2>
          </motion.div>

          <motion.div
            className={styles.howTextGrid}
            variants={stagger(0.1)}
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
          >
            <motion.p className={styles.howPara} variants={fadeUp}>
              The procedure relieves pain, itching, and bleeding, allowing patients to sit,
              move, and use the bathroom comfortably. After healing, daily life feels easier,
              hygiene improves, and long-term relief is restored.
            </motion.p>
            <motion.p className={styles.howPara} variants={fadeUp}>
              A haemorrhoidectomy involves the surgical excision of enlarged haemorrhoidal
              tissue under local anaesthetic. Once the area is completely numb, the
              haemorrhoid is carefully isolated and removed. For suitable patients with smaller
              internal haemorrhoids, rubber band ligation may be offered as an alternative.
              During your consultation, your doctor will determine which procedure is most
              suitable for your individual case.
            </motion.p>
          </motion.div>

          <motion.div
            className={styles.howCoversWrap}
            variants={stagger(0.08)}
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
          >
            <motion.p className={styles.howCoversLabel} variants={fadeUp}>
              Procedures Offered at The One Clinic
            </motion.p>
            <motion.ul className={styles.howCoversList} role="list" variants={stagger(0.08)}>
              {[
                'Haemorrhoidectomy (surgical excision)',
                'Rubber band ligation',
                'Grade I internal haemorrhoids',
                'Grade II internal haemorrhoids',
                'Grade III haemorrhoids',
                'External haemorrhoids (selected cases)',
              ].map((item) => (
                <motion.li key={item} className={styles.howCoversItem} variants={fadeUp}>
                  <span className={styles.howCoversCheck} aria-hidden="true">
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                      <polyline points="2,6 5,9 10,3" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </span>
                  {item}
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>
        </Container>
      </Section>

      {/* ════════════════════════════════════════
          11. RESULTS, AFTERCARE & SIDE EFFECTS
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
              Post-Treatment
            </motion.p>
            <motion.h2 className={styles.headingLight} variants={fadeUp}>
              Haemorrhoid Removal Results, Aftercare &amp; Side Effects
            </motion.h2>
          </motion.div>

          <motion.div
            className={styles.resultsAfterGrid}
            variants={stagger(0.1)}
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
          >
            {/* Card 1: When Will You See Results? */}
            <motion.div className={styles.resultsAfterCard} variants={fadeUp}>
              <div className={styles.resultsAfterCardHead}>
                <span className={styles.resultsAfterCardIcon} aria-hidden="true">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/>
                  </svg>
                </span>
                <h3 className={styles.resultsAfterCardTitle}>How Long Does it Take to See Results after Haemorrhoidectomy?</h3>
              </div>
              <p className={styles.resultsAfterCardBody}>
                Most patients notice relief immediately from pain and discomfort. Complete healing and improvement usually take 2–3 weeks.
              </p>
            </motion.div>

            {/* Card 2: How Long Do Results Last */}
            <motion.div className={styles.resultsAfterCard} variants={fadeUp}>
              <div className={styles.resultsAfterCardHead}>
                <span className={styles.resultsAfterCardIcon} aria-hidden="true">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
                  </svg>
                </span>
                <h3 className={styles.resultsAfterCardTitle}>How Long Do Haemorrhoid Removal Results Last?</h3>
              </div>
              <p className={styles.resultsAfterCardBody}>
                Haemorrhoidectomy provides long-term, often permanent relief. Proper care and lifestyle adjustments help prevent new haemorrhoids.
              </p>
            </motion.div>

            {/* Card 3: Haemorrhoidectomy Side Effects */}
            <motion.div className={styles.resultsAfterCard} variants={fadeUp}>
              <div className={styles.resultsAfterCardHead}>
                <span className={styles.resultsAfterCardIcon} aria-hidden="true">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 2v20m10-10H2"/><circle cx="12" cy="12" r="10"/>
                  </svg>
                </span>
                <h3 className={styles.resultsAfterCardTitle}>Haemorrhoidectomy Side Effects</h3>
              </div>
              <ul className={styles.resultsAfterCardList} role="list">
                {[
                  'Mild pain or soreness',
                  'Bleeding or swelling at the site',
                  'Temporary difficulty with bowel movements',
                  'There is a rare risk of infection or anal narrowing',
                ].map((item) => (
                  <li key={item} className={styles.resultsAfterCardListItem}>
                    <span className={styles.resultsAfterDot} aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Card 4: Aftercare Tips */}
            <motion.div className={styles.resultsAfterCard} variants={fadeUp}>
              <div className={styles.resultsAfterCardHead}>
                <span className={styles.resultsAfterCardIcon} aria-hidden="true">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>
                  </svg>
                </span>
                <h3 className={styles.resultsAfterCardTitle}>Aftercare Tips</h3>
              </div>
              <ul className={styles.resultsAfterCardList} role="list">
                {[
                  'Keep the area clean and dry.',
                  'Use sitz baths to soothe discomfort.',
                  'Eat a high-fibre diet to ease bowel movements.',
                  'Avoid heavy lifting or straining.',
                  'Follow all doctor instructions for wound care.',
                  'You need to attend follow-up visits to ensure proper healing.',
                ].map((item) => (
                  <li key={item} className={styles.resultsAfterCardListItem}>
                    <span className={styles.resultsAfterDot} aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          </motion.div>
        </Container>
      </Section>

      {/* ════════════════════════════════════════
          12. CTA BANNER
      ════════════════════════════════════════ */}
      <section className={styles.ctaBanner} data-section-theme="dark" aria-label="Book haemorrhoid removal consultation">
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
          <motion.div
            className={styles.ctaBannerContent}
            variants={stagger(0.12)}
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
          >
            <motion.h2 className={styles.ctaBannerHeading} variants={fadeUp}>
              Sit &amp; Move Comfortably<br />After Haemorrhoid Removal!
            </motion.h2>
            <motion.p className={styles.ctaBannerSub} variants={fadeUp}>
              Let our experts help you achieve the haemorrhoidectomy results that you want.
            </motion.p>
            <motion.div variants={fadeUp}>
              <BookConsultationButton className={styles.ctaBannerBtn}>
                Book Consultation
              </BookConsultationButton>
            </motion.div>
          </motion.div>
        </Container>
      </section>

      {/* ════════════════════════════════════════
          13. BEST HAEMORRHOID TREATMENT LEICESTER
      ════════════════════════════════════════ */}
      <Section variant="light" data-section-theme="light">
        <Container>
          <motion.div
            className={styles.clinicIntroBody}
            variants={stagger(0.12)}
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
          >
            <motion.div className={styles.clinicIntroLeft} variants={fadeUp}>
              <p className={styles.eyebrowDark}>Expert Treatment</p>
              <h2 className={styles.combinedHeading}>
                Best Haemorrhoid Removal<br />Leicester Experience
              </h2>
            </motion.div>
            <motion.p className={styles.clinicIntroDesc} variants={fadeUp}>
              At The One Clinic, we provide the best haemorrhoid removal Leicester experience
              with gentle, personalised care. Our experts ensure minimal discomfort, fast recovery,
              and lasting relief, helping patients return to comfortable daily life.
            </motion.p>
          </motion.div>
        </Container>
      </Section>

      {/* ════════════════════════════════════════
          14. COST BANNER
      ════════════════════════════════════════ */}
      <section className={styles.costBanner} data-section-theme="dark" aria-label="Haemorrhoid removal cost Leicester">
        <Container>
          <motion.div
            className={styles.costBannerInner}
            variants={stagger(0.12)}
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
          >
            <motion.p className={styles.costBannerEyebrow} variants={fadeUp}>
              Haemorrhoid Removal Cost Leicester
            </motion.p>
            <motion.p className={styles.costBannerPrice} variants={fadeUp}>
              Starts from £____
            </motion.p>
            <motion.p className={styles.costBannerNote} variants={fadeUp}>
              At The One Clinic, the final price depends on your personalised treatment plan
              and will be discussed during your consultation with our expert.
            </motion.p>
            <motion.div variants={fadeUp}>
              <BookConsultationButton className={styles.ctaBannerBtn}>
                Book A Consultation
              </BookConsultationButton>
            </motion.div>
          </motion.div>
        </Container>
      </section>

      {/* ════════════════════════════════════════
          15. WHY CHOOSE THE ONE CLINIC
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
              Why Us
            </motion.p>
            <motion.h2 className={styles.headingLight} variants={fadeUp}>
              Why Choose The One Clinic For Haemorrhoidectomy in Leicester
            </motion.h2>
          </motion.div>

          <motion.div
            className={styles.clinicReasonsGrid}
            variants={stagger(0.08)}
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
          >
            {CLINIC_REASONS.map((r) => (
              <motion.div
                key={r.n}
                className={styles.clinicReasonCard}
                variants={fadeUp}
                whileHover={{ y: -6, transition: { type: 'spring', stiffness: 280, damping: 20 } }}
              >
                <span className={styles.clinicReasonNumber}>{r.n}</span>
                <p className={styles.clinicReasonText}>{r.text}</p>
              </motion.div>
            ))}
          </motion.div>
        </Container>
      </Section>

      {/* ════════════════════════════════════════
          16. MEET THE EXPERT
      ════════════════════════════════════════ */}
      <Section variant="light" data-section-theme="light" className={styles.sectionGray}>
        <Container>
          <motion.div
            className={styles.expertCard}
            variants={stagger(0.1)}
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
          >
            {/* Left: full-bleed photo panel */}
            <motion.div className={styles.expertCardPhotoPanel} variants={fadeUp}>
              <Image
                src="/images/imgi_20_team-thumb-VIRMANI.jpg"
                alt="Dr Sumit Virmani, Co-Founder, The One Clinic"
                fill
                className={styles.expertCardPhoto}
                sizes="(max-width: 768px) 100vw, 420px"
              />
            </motion.div>

            {/* Right: content */}
            <motion.div className={styles.expertCardContent} variants={stagger(0.08)}>
              <motion.p className={styles.eyebrowLight} variants={fadeUp}>
                Meet The Expert
              </motion.p>
              <motion.h2 className={styles.expertCardName} variants={fadeUp}>
                Dr Sumit Virmani
              </motion.h2>

              <motion.div className={styles.expertCardBadges} variants={fadeUp}>
                {['MBBS', 'MRCGP', 'Co-Founder'].map((credential) => (
                  <span key={credential} className={styles.expertCardBadge}>{credential}</span>
                ))}
              </motion.div>

              <motion.p className={styles.expertCardBio} variants={fadeUp}>
                Dr Sumit Virmani is the co-founder of The One Clinic and brings over 15 years
                of medical expertise, with a decade as a trusted local GP. He specialises in
                haemorrhoidectomy and minor surgical procedures with a meticulous approach to
                patient safety and comfort.
              </motion.p>

              <motion.p className={styles.expertCardBio} variants={fadeUp}>
                His expertise in haemorrhoid removal combined with compassionate care ensures
                every patient receives safe, effective treatment. Dr Virmani continues to combine
                his ongoing GP practice with expert surgical treatment at The One Clinic.
              </motion.p>
            </motion.div>
          </motion.div>
        </Container>
      </Section>

      {/* ════════════════════════════════════════
          17. MEET THE EXPERTS
      ════════════════════════════════════════ */}
      <MeetTheExperts />

      {/* ════════════════════════════════════════
          18. FAQ
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
            <Accordion items={showAllFaqs ? FAQS : FAQS.slice(0, 4)} theme="dark" />

            {FAQS.length > 4 && (
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
          </motion.div>
        </Container>
      </Section>

      {/* ════════════════════════════════════════
          19. BOOKING FORM
      ════════════════════════════════════════ */}
      <LeadForm />

      {/* ════════════════════════════════════════
          20. FINAL CTA
      ════════════════════════════════════════ */}
      <FinalCTA />
    </>
  );
}
