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
    value: '45–60 minutes (Includes numbing time)',
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
    label: 'Downtime',
    value: '1–2 days',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
      </svg>
    ),
  },
  {
    label: 'Results Longevity',
    value: 'Permanent',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/>
      </svg>
    ),
  },
  {
    label: 'Cost',
    value: 'Contact us to inquire about the cost.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
      </svg>
    ),
  },
  {
    label: 'Appointment Type',
    value: 'In-clinic (Minor Surgery)',
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
    title: 'Local Anaesthetic',
    desc: 'We start by injecting a local anaesthetic into the base of the toe. This is called a ring block. It stings for a moment, then the whole toe goes numb.',
  },
  {
    num: '02',
    title: 'Nail Removal',
    desc: 'Once numb, our experts carefully lift and remove the side of the nail that is cutting into the skin. We then apply a chemical solution to the root to kill the nail cells in that corner.',
  },
  {
    num: '03',
    title: 'Dressing & Discharge',
    desc: 'We dress the toe with a sterile bandage. You feel no pain during the surgery.',
  },
];

const TREATMENT_BENEFITS = [
  {
    title: 'Immediate Relief',
    desc: 'The pain from the nail spike stops as soon as the anaesthetic wears off.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>
      </svg>
    ),
  },
  {
    title: 'High Cure Rate',
    desc: 'Using phenolisation helps ensure the ingrown section rarely regrows.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
      </svg>
    ),
  },
  {
    title: 'Cosmetic Result',
    desc: 'We only remove the side of the nail. The rest of the nail stays intact.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
      </svg>
    ),
  },
  {
    title: 'Quick Recovery',
    desc: 'You can walk immediately afterwards (wearing open-toed shoes).',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M3 21h18"/><path d="M5 21V7l8-4v4"/><path d="M19 21V11l-6-4"/>
      </svg>
    ),
  },
  {
    title: 'Medical Safety',
    desc: 'Performed by a doctor in a sterile environment, reducing infection risk.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/>
      </svg>
    ),
  },
  {
    title: 'No More Antibiotics',
    desc: 'By removing the cause (an ingrown nail), the infection resolves naturally.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/>
      </svg>
    ),
  },
];

const ELIGIBILITY = [
  'Suffering from recurring infections',
  'Unable to wear your favourite shoes due to pain',
  'Finding that antibiotics or home remedies are ineffective',
  'Noticing the toe is bleeding or weeping',
  'Wanting a permanent solution rather than a temporary fix',
];

const CAUSES = [
  {
    n: '01',
    title: 'Incorrect Cutting',
    desc: 'Cutting nails too short or curbing the edges.',
  },
  {
    n: '02',
    title: 'Footwear',
    desc: 'Tight or narrow shoes that press the toes together.',
  },
  {
    n: '03',
    title: 'Trauma',
    desc: 'Stubbing your toe or dropping something on it.',
  },
  {
    n: '04',
    title: 'Genetics',
    desc: 'Some people naturally have curved (involuted) nails.',
  },
  {
    n: '05',
    title: 'Sweaty Feet',
    desc: 'Soft skin makes it easier for the nail to pierce through.',
  },
];

const CLINIC_REASONS = [
  { n: '01', text: 'Expert doctors with minor surgery qualifications.' },
  { n: '02', text: 'Usage of proper local anaesthetic blocks.' },
  { n: '03', text: 'Permanent solution using phenolisation.' },
  { n: '04', text: 'No long waiting lists - quick relief.' },
  { n: '05', text: 'Sterile, clinical environment (better than a salon).' },
  { n: '06', text: 'Honest advice and transparent pricing.' },
];

const FAQS = [
  {
    question: 'Does the injection hurt?',
    answer:
      'The injection into the toe can sting for a few seconds. However, it works very quickly. Within minutes, the toe is completely numb, and you will not feel the surgery at all.',
  },
  {
    question: 'Can I walk afterwards?',
    answer:
      'Yes. You can walk out of the clinic. However, your toe will be numb for a few hours, and you will have a bulky dressing on. We recommend bringing open-toed sandals to wear home.',
  },
  {
    question: 'Will I lose the whole nail?',
    answer:
      'Usually, no. We perform a Partial Nail Avulsion (PNA). We only remove the side strip that is ingrown. The rest of the nail stays. It will just look slightly narrower.',
  },
  {
    question: 'Can I drive home?',
    answer:
      'It is better not to. Your foot will be numb, which can affect your control of the pedals. Please arrange a lift or use a taxi.',
  },
  {
    question: 'Do I need antibiotics?',
    answer:
      'Not always. Removing the nail spike usually allows the infection to drain and heal. If the infection is severe, Dr Virmani may prescribe antibiotics.',
  },
  {
    question: 'How long will it take for me to wear normal shoes?',
    answer:
      'You can usually wear wide, comfortable shoes after a few days. Avoid tight-fitting shoes or high heels for at least two weeks while the wound heals.',
  },
  {
    question: 'Why not consult a chiropodist?',
    answer:
      'Many chiropodists are excellent. However, at The One Clinic, we are medical doctors. We can use stronger anaesthetics and perform the surgical chemical ablation (phenolisation) to ensure a permanent cure.',
  },
  {
    question: 'Will it grow back?',
    answer:
      'Without chemical treatment, the nail often grows back. We use phenol to kill the root in the corner. This means the recurrence rate is very low (less than 5%).',
  },
  {
    question: 'Can you do both feet at once?',
    answer:
      'Yes. If you have ingrown nails on both big toes, we can treat them in a single appointment to save you time.',
  },
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
                Ingrown Toenail Treatment in Leicester
              </motion.h1>

              <motion.p className={styles.heroDesc} variants={fadeUp}>
                Stop the pain and infection. Get expert, permanent removal of ingrown toenails
                with our safe, minimally invasive surgical procedures.
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
                  An ingrown toenail occurs when the side of your nail grows into the surrounding skin.
                  It usually happens on the big toe. It pierces the skin like a splinter. This causes pain,
                  redness, and swelling. If you ignore it, the skin often gets infected. It might bleed or
                  produce pus. It can make wearing shoes or even walking difficult.
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
              Toenail Surgery At A Glance
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
              Ingrown Toenail Removal Procedure
            </motion.h2>
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
              Ingrown Toenail Removal Treatment Benefits
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
              Why Choose Surgical Removal?
            </motion.h2>
            <motion.p className={styles.combinationIntroText} variants={fadeUp}>
              You should consider minor surgery for your toenail if you are:
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
            <motion.p className={styles.eligibilityClosing} variants={fadeUp} style={{ marginTop: '24px' }}>
              Cutting the corner of the nail yourself often makes it worse. Surgery resolves it once and for all.
            </motion.p>
            <motion.div variants={fadeUp} style={{ marginTop: '24px' }}>
              <BookConsultationButton className={`${styles.combinedCta} ${styles.ctaWhiteInvert}`}>
                Book Your Consultation
              </BookConsultationButton>
            </motion.div>
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
              Several factors can cause this painful condition. We can treat it regardless of the cause:
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
      <Section variant="dark" data-section-theme="dark" className={styles.howWorksSection}>
        <Container>
          <motion.div
            className={styles.sectionHeaderCentre}
            variants={stagger(0.1)}
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
          >
            <motion.p className={styles.eyebrowLight} variants={fadeUp}>The Science</motion.p>
            <motion.h2 className={styles.headingLight} variants={fadeUp}>
              How Does Treatment Work?
            </motion.h2>
          </motion.div>

          <motion.div
            className={styles.howWorksGrid}
            variants={stagger(0.12)}
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
          >
            {/* Left: explanation */}
            <motion.div className={styles.howWorksText} variants={fadeUp}>
              <p className={styles.howWorksPara}>
                The most effective way to treat a recurring ingrown toenail is Partial Nail Avulsion (PNA).
                This is a minor surgical procedure performed under local anaesthetic.
              </p>
              <p className={styles.howWorksPara}>
                At The One Clinic, we do not just cut the nail. We remove the offending edge straight down
                to the root. We then apply a chemical (phenol) to destroy the nail matrix — the tissue that
                grows that specific section of nail. This prevents regrowth in that area, providing a
                permanent cure.
              </p>
            </motion.div>

            {/* Right: key facts */}
            <motion.div className={styles.howWorksStats} variants={stagger(0.1)}>
              {[
                { stat: '95%', label: 'Permanent cure rate with phenolisation' },
                { stat: '~45 min', label: 'Total procedure time including numbing' },
                { stat: 'Same day', label: 'Walk out of the clinic after treatment' },
              ].map((item) => (
                <motion.div key={item.stat} className={styles.howWorksStat} variants={fadeUp}>
                  <span className={styles.howWorksStatNum}>{item.stat}</span>
                  <span className={styles.howWorksStatLabel}>{item.label}</span>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </Container>
      </Section>

      {/* ════════════════════════════════════════
          SURGICAL ADVANTAGE: TRIPLE ACTION
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
            <motion.h2 className={styles.headingDark} variants={fadeUp}>
              The Surgical Advantage: A Triple Action Approach
            </motion.h2>
            <motion.p className={styles.combinationIntroText} variants={fadeUp}>
              We combine medical precision with long-term prevention. We treat the problem at the source,
              so you do not have to keep suffering.
            </motion.p>
          </motion.div>

          <motion.div
            className={styles.treatedBenefitsGrid}
            variants={stagger(0.08)}
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
          >
            {[
              {
                num: '01',
                title: 'Pain Relief',
                items: [
                  'We use a local anaesthetic ring block.',
                  'This completely numbs the toe, so the removal is pain-free.',
                ],
              },
              {
                num: '02',
                title: 'Infection Control',
                items: [
                  'By removing the nail spike piercing the skin, we allow the wound to heal.',
                  'We drain any infection present.',
                ],
              },
              {
                num: '03',
                title: 'Permanent Prevention',
                items: [
                  'We apply phenol to the nail root.',
                  'This prevents the nail edge from regrowing, preventing future issues.',
                ],
              },
            ].map((benefit) => (
              <motion.div key={benefit.title} className={styles.advantageCard} variants={fadeUp}>
                <span className={styles.advantageCardNum}>{benefit.num}</span>
                <h3 className={styles.advantageCardTitle}>{benefit.title}</h3>
                <ul className={styles.advantageCardList} role="list">
                  {benefit.items.map((item, idx) => (
                    <li key={idx} className={styles.advantageCardItem}>
                      <span className={styles.advantageCardDot} aria-hidden="true" />
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            className={styles.sectionHeaderCentre}
            variants={stagger(0.1)}
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
            style={{ marginTop: '48px' }}
          >
            <motion.p className={styles.combinedDesc} variants={fadeUp}>
              <strong>Final Results:</strong> The procedure provides immediate pressure relief. The toe heals
              within a few weeks, looking normal but slightly narrower.
            </motion.p>
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
              Ingrown Toenail Removal Results, Aftercare &amp; Side Effects
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
                <h3 className={styles.resultsAfterCardTitle}>When Will You See The Results?</h3>
              </div>
              <p className={styles.resultsAfterCardBody}>
                You will feel relief straightaway. The wound takes about 2 to 4 weeks to heal completely.
                During this time, you will need to change the dressing regularly.
              </p>
              <div className={styles.resultsAfterCardSpacer} />
              <p className={styles.resultsAfterCardNote}>
                Long-term results are excellent, with a 95% permanent cure rate. The ingrown edge
                will not return because phenol has permanently destroyed the tissue that produces nail
                in that area.
              </p>
            </motion.div>

            {/* Card 2: Is The Removal Permanent */}
            <motion.div className={styles.resultsAfterCard} variants={fadeUp}>
              <div className={styles.resultsAfterCardHead}>
                <span className={styles.resultsAfterCardIcon} aria-hidden="true">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>
                  </svg>
                </span>
                <h3 className={styles.resultsAfterCardTitle}>Is The Removal Permanent?</h3>
              </div>
              <p className={styles.resultsAfterCardBody}>
                Yes. Because we use chemical cauterisation (phenol) on the root, the risk of the nail
                growing back into the skin is very low (less than 5%).
              </p>
            </motion.div>

            {/* Card 3: Potential Side Effects */}
            <motion.div className={styles.resultsAfterCard} variants={fadeUp}>
              <div className={styles.resultsAfterCardHead}>
                <span className={styles.resultsAfterCardIcon} aria-hidden="true">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
                  </svg>
                </span>
                <h3 className={styles.resultsAfterCardTitle}>Potential Side Effects</h3>
              </div>
              <p className={styles.resultsAfterCardBody}>
                Toenail surgery is very safe. Common, temporary side effects include:
              </p>
              <ul className={styles.resultsAfterCardList} role="list">
                {[
                  'Soreness once the anaesthetic wears off (paracetamol helps).',
                  'Weeping from the wound (this is normal as it heals).',
                  'Mild swelling.',
                  'Infection (rare if you follow aftercare instructions).',
                ].map((item) => (
                  <li key={item} className={styles.resultsAfterCardListItem}>
                    <span className={styles.resultsAfterDot} aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
              <div className={styles.resultsAfterCardSpacer} />
              <p className={styles.resultsAfterCardNote}>
                We provide full aftercare instructions to manage healing at home.
              </p>
            </motion.div>

            {/* Card 3: Aftercare Tips */}
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
                  'Keep dressing clean and dry; change daily or as instructed',
                  'Soak foot in warm salt water 2–3 times daily to aid healing',
                  'Wear loose, open-toed footwear or sandals during healing',
                  'Keep weight off the toe initially; elevate when possible',
                  'Trim remaining toenail straight across, never down the sides',
                  'Attend follow-up appointment to monitor healing and prevent recurrence',
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
      <section className={styles.ctaBanner} data-section-theme="dark" aria-label="Book ingrown toenail removal consultation">
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
              Step Into Comfort<br />Again
            </motion.h2>
            <motion.p className={styles.ctaBannerSub} variants={fadeUp}>
              Do not limp around in pain any longer. Let our experts sort it out for you.
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
          13. BEST INGROWN TOENAIL TREATMENT LEICESTER
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
              <p className={styles.eyebrowDark}>Expert Care</p>
              <h2 className={styles.combinedHeading}>
                Best Minor Surgery<br />Experience in Leicester
              </h2>
            </motion.div>
            <motion.p className={styles.clinicIntroDesc} variants={fadeUp}>
              Experience the best medical care at The One Clinic. We are not just a beauty clinic;
              we are a medical facility. We provide a sterile, safe environment to sort out painful
              problems like ingrown toenails permanently. You get expert doctor-led care without the
              long NHS waiting times.
            </motion.p>
          </motion.div>
        </Container>
      </Section>

      {/* ════════════════════════════════════════
          14. COST BANNER
      ════════════════════════════════════════ */}
      <section className={styles.costBanner} data-section-theme="dark" aria-label="Ingrown toenail removal cost Leicester">
        <Container>
          <motion.div
            className={styles.costBannerInner}
            variants={stagger(0.12)}
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
          >
            <motion.p className={styles.costBannerEyebrow} variants={fadeUp}>
              Ingrown Toenail Removal Cost at The One Clinic
            </motion.p>
            <motion.p className={styles.costBannerPrice} variants={fadeUp}>
              From £350
            </motion.p>
            <motion.p className={styles.costBannerNote} variants={fadeUp}>
              This price includes the surgery, the chemical treatment, and the dressings. We will
              confirm the exact cost for one or both toes during your consultation.
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
              Why Choose The One Clinic For Ingrown Toenail Removal
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
                of medical expertise, with a decade as a trusted local GP. With advanced training
                in minor surgical procedures and a meticulous approach to technique, Dr Virmani
                specialises in minor foot surgery including ingrown toenail removal using the
                latest PNA methodology.
              </motion.p>

              <motion.p className={styles.expertCardBio} variants={fadeUp}>
                His expertise in Partial Nail Avulsion combined with a compassionate, patient-centred
                approach ensures every patient receives safe, effective treatment with a 95% cure rate.
                Dr Virmani continues to combine his ongoing GP practice with expert surgical treatment
                at The One Clinic.
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
