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
  { n: '01', text: 'Experienced GMC-registered doctors trained in minor foot surgery and PNA technique.' },
  { n: '02', text: 'Local anaesthetic ring block ensuring a completely pain-free procedure and recovery.' },
  { n: '03', text: 'Sterile, professional surgical environment with strict infection-control measures.' },
  { n: '04', text: 'Phenol application technique proven to provide 95% permanent cure rate.' },
  { n: '05', text: 'Comprehensive aftercare plan, dressing supplies, and follow-up appointment included.' },
  { n: '06', text: 'Convenient Leicester location with same-day appointments available.' },
];

const FAQS = [
  {
    question: 'What is Partial Nail Avulsion (PNA)?',
    answer:
      'Partial Nail Avulsion is a minor surgical procedure where the problematic edge of the ingrown toenail is removed. The nail root (matrix) is then treated with phenol, a chemical that destroys the tissue responsible for nail growth in that area. This prevents the ingrown edge from ever regrowing, resulting in a 95% cure rate. Only the affected portion is removed, so your toe maintains normal appearance and function.',
  },
  {
    question: 'Will the procedure be painful?',
    answer:
      'No. A local anaesthetic ring block is administered to the toe before the procedure, completely numbing the entire toe. You will feel no pain during treatment — only sensations of pressure or minor vibration. Some mild discomfort is normal for a few days post-procedure, and your doctor will provide clear pain management advice and aftercare guidance to keep you as comfortable as possible.',
  },
  {
    question: 'How long does the procedure take?',
    answer:
      'The Partial Nail Avulsion procedure typically takes between 15 and 30 minutes from start to finish. After the procedure is complete, you will be able to leave the clinic almost immediately. Most patients are able to walk normally straight away, though we recommend arranging transport home to ensure your comfort.',
  },
  {
    question: 'What is the recovery time after ingrown toenail removal?',
    answer:
      'You can resume light activities immediately. Most people experience relief as soon as the anaesthetic wears off. The wound typically heals within 2 to 4 weeks depending on your body\'s healing response. Light exercise and walking can resume within days, and you can return to sport and gym activities once the wound has fully healed (usually 3–4 weeks). Your doctor will provide specific guidance based on your activities.',
  },
  {
    question: 'What aftercare is required following ingrown toenail removal?',
    answer:
      'Following your procedure, you will receive detailed written aftercare instructions. These typically include keeping the wound clean and dry, regular dressing changes as advised, keeping weight off the toe initially, avoiding prolonged standing or tight footwear, soaking the foot in warm salt water daily, maintaining proper toenail trimming to prevent recurrence, and attending your follow-up appointment to monitor healing and check for any signs of infection.',
  },
  {
    question: 'Can an ingrown toenail return after PNA treatment?',
    answer:
      'The recurrence rate following Partial Nail Avulsion with phenol is extremely low — typically less than 5% when proper aftercare is followed. Because phenol permanently destroys the germinal tissue that produces nail growth, that edge of the nail simply cannot return. However, the other side of the nail could potentially develop an ingrown edge in the future if predisposing factors (poor trimming, tight shoes, trauma) are not avoided. Proper nail trimming and footwear are key to prevention.',
  },
  {
    question: 'When can I return to sport and exercise?',
    answer:
      'Light walking can resume immediately. Most patients can return to light exercise and activities within 2–3 days. However, you should avoid high-impact activities, running, and gym work until the wound has fully healed — typically 3 to 4 weeks. Your doctor will provide specific advice based on your sporting activities and the healing progress observed at your follow-up appointment.',
  },
  {
    question: 'Do I need a GP referral to book an appointment at The One Clinic?',
    answer:
      'No, you do not need a GP referral to book a consultation at The One Clinic. However, if you would like your GP to be informed of your treatment, we can send them a letter following your appointment. You can book your consultation directly with us online or by phone, and our team will arrange an appointment at a time that suits your schedule.',
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
              How Does Treatment Work?
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
                  The most effective way to treat a recurring ingrown toenail is Partial Nail Avulsion (PNA).
                  This is a minor surgical procedure. At The One Clinic, we do not just cut the nail. We remove
                  the offending edge of the nail straight down to the root. We then use a chemical to destroy
                  the nail matrix (the root). This prevents that specific part of the nail from regrowing,
                  providing a permanent cure.
                </p>
              </motion.div>
            </motion.div>

            {/* Right: image */}
            <motion.div className={styles.whatIsVideoWrap} variants={fadeUp}>
              <Image
                src="/images/Doctor1.jpg"
                alt="Ingrown toenail removal procedure illustration at The One Clinic"
                fill
                className={styles.whatIsVideoFrame}
                sizes="(max-width: 900px) 100vw, 50vw"
              />
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
                title: 'Pain Relief',
                items: [
                  'We use a local anaesthetic ring block.',
                  'This completely numbs the toe, so the removal is pain-free.',
                ],
              },
              {
                title: 'Infection Control',
                items: [
                  'By removing the nail spike piercing the skin, we allow the wound to heal.',
                  'We drain any infection present.',
                ],
              },
              {
                title: 'Permanent Prevention',
                items: [
                  'We apply phenol to the nail root.',
                  'This prevents the nail edge from regrowing, preventing future issues.',
                ],
              },
            ].map((benefit) => (
              <motion.div key={benefit.title} className={styles.treatedBenefit} variants={fadeUp}>
                <h3 className={styles.treatedBenefitTitle}>{benefit.title}</h3>
                <ul className={styles.treatedBenefitDesc} role="list">
                  {benefit.items.map((item, idx) => (
                    <li key={idx} style={{ marginBottom: '8px', lineHeight: '1.6', fontSize: '0.95rem' }}>
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
              Results, Aftercare &amp; Side Effects
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
                <h3 className={styles.resultsAfterCardTitle}>When Will You See Results?</h3>
              </div>
              <p className={styles.resultsAfterCardBody}>
                Pain relief is often experienced immediately as the ingrown edge is removed. Swelling,
                redness, and inflammation gradually subside over the first one to two weeks. The wound
                itself heals by secondary intention, which typically takes 2 to 4 weeks depending on
                your body's healing response and adherence to aftercare instructions.
              </p>
              <div className={styles.resultsAfterCardSpacer} />
              <p className={styles.resultsAfterCardNote}>
                Long-term results are excellent, with a 95% permanent cure rate. The ingrown edge
                will not return because phenol has permanently destroyed the tissue that produces nail
                in that area.
              </p>
            </motion.div>

            {/* Card 2: Side Effects */}
            <motion.div className={styles.resultsAfterCard} variants={fadeUp}>
              <div className={styles.resultsAfterCardHead}>
                <span className={styles.resultsAfterCardIcon} aria-hidden="true">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
                  </svg>
                </span>
                <h3 className={styles.resultsAfterCardTitle}>Side Effects</h3>
              </div>
              <p className={styles.resultsAfterCardBody}>
                Ingrown toenail removal is a very safe procedure. Most patients experience only mild,
                temporary effects in the post-procedure period:
              </p>
              <ul className={styles.resultsAfterCardList} role="list">
                {[
                  'Mild to moderate soreness for 3–5 days',
                  'Slight swelling or bruising around the treated area',
                  'Mild bleeding or clear drainage initially when dressing is changed',
                  'Temporary discomfort when walking initially',
                  'Minimal drainage or exudate from the wound during healing',
                ].map((item) => (
                  <li key={item} className={styles.resultsAfterCardListItem}>
                    <span className={styles.resultsAfterDot} aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
              <div className={styles.resultsAfterCardSpacer} />
              <p className={styles.resultsAfterCardNote}>
                Serious complications are rare. Infection is prevented through sterile technique and
                proper aftercare. Your doctor will provide clear guidance to minimise discomfort.
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
              Get Permanent Relief<br />from Ingrown Toenails
            </motion.h2>
            <motion.p className={styles.ctaBannerSub} variants={fadeUp}>
              Book your consultation with our expert doctors and take the first step towards
              pain-free feet and normal activity.
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
              <p className={styles.eyebrowDark}>Expert Treatment</p>
              <h2 className={styles.combinedHeading}>
                Best Ingrown Toenail<br />Removal Leicester
              </h2>
            </motion.div>
            <motion.p className={styles.clinicIntroDesc} variants={fadeUp}>
              Experience expert ingrown toenail removal at The One Clinic in Leicester. Our
              experienced, GMC-registered doctors deliver safe, effective Partial Nail Avulsion
              under local anaesthetic with a proven 95% cure rate. We combine clinical expertise
              with compassionate care to help you achieve permanent relief and return to normal
              activities without pain or recurrence.
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
              Our fee covers the consultation, procedure, local anaesthetic, phenol application,
              sterile dressing, and follow-up appointment. A personalised quote will be provided
              following your initial consultation with our doctor.
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
              Why Choose The One Clinic for Ingrown Toenail Removal
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
