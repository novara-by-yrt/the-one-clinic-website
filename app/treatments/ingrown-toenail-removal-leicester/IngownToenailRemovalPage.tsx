'use client';

import { useState } from 'react';
import Image              from 'next/image';
import { motion }         from 'framer-motion';
import Section            from '@/components/ui/Section';
import Container          from '@/components/ui/Container';
import BookConsultationButton from '@/components/ui/BookConsultationButton';
import TrustBadges        from '@/components/ui/TrustBadges';
import Breadcrumb         from '@/components/ui/Breadcrumb';
import Testimonials       from '@/components/sections/Testimonials';
import TrustStrip         from '@/components/sections/TrustStrip';
import { fadeUp, stagger, VIEWPORT } from '@/lib/motion';
import styles             from './page.module.css';

/* ── Static data ───────────────────────────────────────────────── */

const AT_A_GLANCE = [
  {
    label: 'Procedure Duration',
    value: '15–30 minutes',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
      </svg>
    ),
  },
  {
    label: 'Treatment Frequency',
    value: 'One-off procedure',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>
      </svg>
    ),
  },
  {
    label: 'Recovery Time',
    value: '2–4 weeks',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
      </svg>
    ),
  },
  {
    label: 'Anaesthetic',
    value: 'Local block',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/>
      </svg>
    ),
  },
  {
    label: 'Success Rate',
    value: '95% permanent',
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
    title: 'Assessment & Preparation',
    desc: 'Your doctor examines the affected toe and discusses your symptom history. A local anaesthetic ring block is administered to the toe, ensuring complete numbness before the procedure begins.',
  },
  {
    num: '02',
    title: 'Partial Nail Avulsion (PNA)',
    desc: 'The affected portion of the nail is carefully removed. Phenol is applied to the nail root (matrix) to destroy germinal tissue and prevent regrowth of that edge of the nail. This is the key to permanent results.',
  },
  {
    num: '03',
    title: 'Wound Care & Discharge',
    desc: 'The area is cleaned, dressed with a sterile dressing, and aftercare instructions provided. You leave the clinic with clear guidance on maintaining the wound and monitoring for infection during healing.',
  },
];

const TREATMENT_BENEFITS = [
  {
    title: 'Permanent Solution',
    desc: 'Partial Nail Avulsion with phenol destroys the ingrown edge permanently. With a 95% success rate, this is a definitive solution, not a temporary fix or palliative treatment.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>
      </svg>
    ),
  },
  {
    title: 'Quick & Simple Procedure',
    desc: 'The entire treatment takes just 15 to 30 minutes. You walk in, receive local anaesthetic, have the procedure, and walk out — all within an hour from arrival to discharge.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
      </svg>
    ),
  },
  {
    title: 'Pain-Free Procedure',
    desc: 'The local anaesthetic ring block numbs the entire toe. You feel no pain during treatment — only mild pressure or vibration. Any post-procedure discomfort is minimal and easily managed.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
      </svg>
    ),
  },
  {
    title: 'Expert Surgical Care',
    desc: 'All procedures are performed by experienced GMC-registered doctors who specialise in minor foot surgery. Every patient receives meticulous care and attention to sterile technique.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M3 21h18"/><path d="M5 21V7l8-4v4"/><path d="M19 21V11l-6-4"/>
      </svg>
    ),
  },
  {
    title: 'Return to Normal Activity',
    desc: 'Most patients walk normally immediately after treatment. Light exercise resumes within days, and you can return to sport and gym activities within 3 to 4 weeks once healing is complete.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/>
      </svg>
    ),
  },
  {
    title: 'Comprehensive Aftercare',
    desc: 'You receive detailed written aftercare instructions, guidance on dressing changes, signs of infection to watch for, and a follow-up appointment to ensure proper healing.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/>
      </svg>
    ),
  },
];

const ELIGIBILITY = [
  'Experiencing chronic ingrown toenail on the great toe (big toe) or other digits',
  'Suffering from pain, swelling, or infection related to an ingrown nail edge',
  'Have already tried conservative measures (antibiotic creams, oral antibiotics, proper nail trimming) without lasting resolution',
  'Willing to follow comprehensive aftercare instructions to ensure proper healing',
  'Free from active infection at the time of procedure (minor infections can be treated first)',
];

const CAUSES = [
  {
    n: '01',
    title: 'Improper Nail Trimming',
    desc: 'Trimming nails too short, cutting them in a curved shape, or cutting down the sides causes the nail edge to grow into the surrounding skin, particularly on the big toe.',
  },
  {
    n: '02',
    title: 'Tight or Ill-Fitting Footwear',
    desc: 'Shoes that are too tight, too narrow, or exert pressure on the toes can force the nail edge into the nail fold, leading to inflammation and pain over time.',
  },
  {
    n: '03',
    title: 'Foot Trauma or Injury',
    desc: 'A direct blow to the toe, dropping something on the foot, or stubbing the toe can damage the nail and cause it to grow inward during healing.',
  },
  {
    n: '04',
    title: 'Genetic Predisposition',
    desc: 'Some people inherit naturally curved nails or nail folds that make them prone to ingrowth. Genetic factors play a significant role in recurrent ingrown toenails.',
  },
  {
    n: '05',
    title: 'Poor Foot Hygiene or Moisture',
    desc: 'Persistently damp feet, fungal infections, or poor nail health can weaken the nail structure and increase ingrowth risk. Excessive sweating can soften the surrounding skin.',
  },
];

const CLINIC_REASONS = [
  { n: '01', text: 'Experienced GMC-registered doctors trained in minor foot surgery and PNA technique.' },
  { n: '02', text: 'Local anaesthetic ring block ensuring a completely pain-free procedure and recovery.' },
  { n: '03', text: 'Sterile, professional surgical environment with strict infection-control measures.' },
  { n: '04', text: 'Phenol application technique proven to provide 95% permanent cure rate.' },
  { n: '05', text: 'Comprehensive aftercare plan, dressing supplies, and follow-up appointment included.' },
  { n: '06', text: 'Convenient Leicester location with same-day appointments available.' },
];

/* ── Page component ─────────────────────────────────────────────── */
export default function IngownToenailRemovalPage() {
  const [showAllFaqs, setShowAllFaqs] = useState(false);

  return (
    <>
      {/* ════════════════════════════════════════
          1. HERO
      ════════════════════════════════════════ */}
      <section
        className={styles.hero}
        aria-label="Ingrown toenail removal Leicester, hero"
        data-section-theme="dark"
      >
        <div className={styles.heroBreadcrumb}>
          <Container>
            <Breadcrumb
              theme="dark"
              items={[
                { label: 'Treatments', href: '/treatments' },
                { label: 'Ingrown Toenail Removal' },
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
                Ingrown Toenail Removal in Leicester
              </motion.h1>

              <motion.p className={styles.heroDesc} variants={fadeUp}>
                Permanent relief from painful ingrown toenails using Partial Nail Avulsion with
                phenol. Performed by GMC-registered doctors at The One Clinic with 95% success rate.
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
                    <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
                  </svg>
                  15–30 minute procedure
                </span>
                <span className={styles.heroTrustDivider} aria-hidden="true" />
                <span className={styles.heroTrustItem}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>
                  </svg>
                  95% permanent cure rate
                </span>
              </motion.div>
            </div>

            {/* Right: image */}
            <motion.div className={styles.heroImageWrap} variants={fadeUp}>
              <Image
                src="/images/Minor Surgery.jpg"
                alt="Ingrown toenail removal procedure at The One Clinic Leicester"
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
          4. WHAT IS INGROWN TOENAIL REMOVAL?
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
                <h2 className={styles.combinedHeading}>What is an Ingrown Toenail?</h2>
                <p className={styles.combinedDesc}>
                  An ingrown toenail occurs when the edge or corner of a nail grows into the surrounding
                  skin, causing pain, swelling, redness, and often infection. This condition most commonly
                  affects the great toe (big toe) and can significantly impact daily activities such as
                  walking, exercising, and wearing normal footwear. Approximately 1 in 10 people will
                  experience an ingrown toenail at some point in their lives, making it one of the most
                  common foot problems seen in primary care.
                </p>
                <p className={styles.combinedDesc}>
                  When conservative treatments — such as proper nail trimming, antibiotics, topical creams,
                  and wider footwear — fail to resolve the problem, Partial Nail Avulsion (PNA) with phenol
                  offers a permanent solution. This minor surgical procedure removes the problematic nail edge
                  and applies phenol to prevent regrowth. At The One Clinic Leicester, our experienced doctors
                  perform this procedure with precision and care, achieving a 95% cure rate.
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
                alt="Doctor at The One Clinic Leicester consulting a patient about ingrown toenail"
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
              Ingrown Toenail Removal at a Glance
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
              What to Expect at Your Appointment
            </motion.h2>
            <motion.p className={styles.combinationIntroText} variants={fadeUp}>
              From your initial assessment through to discharge, every step is handled with
              care, precision, and your comfort in mind.
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
              You will walk out the same day and can return to normal activities immediately. Most
              patients experience relief from pain as soon as the anaesthetic wears off. Complete
              healing of the wound occurs within 2 to 4 weeks, after which you can resume all
              sport and gym activities.
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
            <motion.p className={styles.eyebrowDark} variants={fadeUp}>Why Choose This Treatment</motion.p>
            <motion.h2 className={styles.headingDark} variants={fadeUp}>
              Benefits of Ingrown Toenail Removal
            </motion.h2>
          </motion.div>

          <motion.div
            className={styles.treatedBenefitsGrid}
            variants={stagger(0.08)}
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
          >
            {TREATMENT_BENEFITS.map((benefit) => (
              <motion.div key={benefit.title} className={styles.treatedBenefit} variants={fadeUp}>
                <span className={styles.treatedBenefitIcon}>{benefit.icon}</span>
                <h3 className={styles.treatedBenefitTitle}>{benefit.title}</h3>
                <p className={styles.treatedBenefitDesc}>{benefit.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </Container>
      </Section>

      {/* ════════════════════════════════════════
          8. ELIGIBILITY
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
            <motion.p className={styles.eyebrowLight} variants={fadeUp}>Suitability</motion.p>
            <motion.h2 className={styles.headingLight} variants={fadeUp}>
              Are You a Candidate for Ingrown Toenail Removal?
            </motion.h2>
            <motion.p className={styles.combinationIntroText} variants={fadeUp}>
              Most people with painful or recurrent ingrown toenails are suitable candidates. Your doctor
              will assess your individual case during a consultation.
            </motion.p>
          </motion.div>

          <motion.div
            className={styles.eligibilityChecklistWrap}
            variants={stagger(0.08)}
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
          >
            <ul className={styles.eligibilityChecklist} role="list">
              {ELIGIBILITY.map((item, idx) => (
                <motion.li key={idx} className={styles.eligibilityItem} variants={fadeUp}>
                  <span className={styles.eligibilityCheckmark} aria-hidden="true">✓</span>
                  <span>{item}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </Container>
      </Section>

      {/* ════════════════════════════════════════
          9. CAUSES
      ════════════════════════════════════════ */}
      <Section variant="light" data-section-theme="light" className={styles.sectionGray}>
        <Container>
          <motion.div
            className={styles.sectionHeaderCentre}
            variants={stagger(0.1)}
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
          >
            <motion.p className={styles.eyebrowDark} variants={fadeUp}>Background</motion.p>
            <motion.h2 className={styles.headingDark} variants={fadeUp}>
              What Causes Ingrown Toenails?
            </motion.h2>
            <motion.p className={styles.combinationIntroText} variants={fadeUp}>
              Understanding the root causes helps prevent recurrence and guides aftercare decisions.
            </motion.p>
          </motion.div>

          <motion.div
            className={styles.causesGrid}
            variants={stagger(0.08)}
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
          >
            {CAUSES.map((cause) => (
              <motion.div key={cause.n} className={styles.causeStep} variants={fadeUp}>
                <span className={styles.causeNum}>{cause.n}</span>
                <h3 className={styles.causeTitle}>{cause.title}</h3>
                <p className={styles.causeDesc}>{cause.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </Container>
      </Section>

      {/* ════════════════════════════════════════
          10. HOW DOES IT WORK?
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
            <motion.p className={styles.eyebrowDark} variants={fadeUp}>The Science</motion.p>
            <motion.h2 className={styles.headingDark} variants={fadeUp}>
              How Does Partial Nail Avulsion Work?
            </motion.h2>
          </motion.div>

          <motion.div
            className={styles.whatIsGrid}
            variants={stagger(0.12)}
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
          >
            {/* Left: explanation */}
            <motion.div className={styles.whatIsContent} variants={stagger(0.12)}>
              <motion.div className={styles.whatIsTextGroup} variants={fadeUp}>
                <p className={styles.combinedDesc}>
                  Partial Nail Avulsion (PNA) with phenol is a minor surgical technique that permanently
                  resolves ingrown toenails by addressing the root cause. Rather than simply trimming the nail
                  edge (which often regrows), this procedure removes the problematic portion of the nail and
                  chemically ablates the nail matrix (the tissue that produces new nail).
                </p>
                <p className={styles.combinedDesc}>
                  <strong>The phenol chemical ablation step is crucial:</strong> Phenol (carbolic acid) is a
                  caustic agent that destroys the germinal cells in the nail matrix responsible for nail
                  growth. By applying phenol to the nail bed after removal of the ingrown edge, we prevent that
                  part of the nail from ever regrowing. This is why the cure rate exceeds 95% — the ingrown edge
                  simply cannot return.
                </p>
                <p className={styles.combinedDesc}>
                  The procedure requires only a local anaesthetic and takes 15 to 30 minutes. Because only a
                  portion of the nail is removed, your toe maintains normal appearance and function — the
                  remaining nail still grows normally. The wound heals by secondary intention, typically within
                  2 to 4 weeks.
                </p>
              </motion.div>
            </motion.div>

            {/* Right: image */}
            <motion.div className={styles.whatIsVideoWrap} variants={fadeUp}>
              <Image
                src="/images/Doctor1.jpg"
                alt="Medical illustration of ingrown toenail removal procedure"
                fill
                className={styles.whatIsVideoFrame}
                sizes="(max-width: 900px) 100vw, 50vw"
              />
            </motion.div>
          </motion.div>
        </Container>
      </Section>
    </>
  );
}
