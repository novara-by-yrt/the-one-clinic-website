'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link  from 'next/link';
import { m } from 'framer-motion';
import Section                from '@/components/ui/Section';
import Container              from '@/components/ui/Container';
import Accordion              from '@/components/ui/Accordion';
import BookConsultationButton from '@/components/ui/BookConsultationButton';
import TrustBadges            from '@/components/ui/TrustBadges';
import Breadcrumb             from '@/components/ui/Breadcrumb';
import LeadForm               from '@/components/sections/LeadForm';
import MeetTheExperts         from '@/components/sections/MeetTheExperts';
import Testimonials           from '@/components/sections/Testimonials';
import { fadeUp, stagger, VIEWPORT } from '@/lib/motion';
import styles from './page.module.css';

/* ── Rosacea types ────────────────────────────────────────────── */
const ROSACEA_TYPES = [
  {
    num: '01',
    title: 'Erythematotelangiectatic Rosacea',
    desc: 'Persistent facial redness, flushing, and visible blood vessels, particularly across the cheeks and nose.',
  },
  {
    num: '02',
    title: 'Papulopustular Rosacea',
    desc: 'Redness accompanied by acne-like breakouts including papules and pustules, often mistaken for adult acne.',
  },
  {
    num: '03',
    title: 'Phymatous Rosacea',
    desc: 'Skin thickening and irregular surface texture, most commonly affecting the nose (rhinophyma) in more advanced cases.',
  },
];

/* ── Causes ───────────────────────────────────────────────────── */
const CAUSES = [
  {
    title: 'Genetics & Family History',
    desc: 'Rosacea often runs in families. Those with fair skin, light eyes, or a family history are significantly more predisposed to developing the condition.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M6 3c0 4.5 6 4.5 6 9s-6 4.5-6 9"/>
        <path d="M18 3c0 4.5-6 4.5-6 9s6 4.5 6 9"/>
        <line x1="3" y1="9" x2="21" y2="9"/>
        <line x1="3" y1="15" x2="21" y2="15"/>
      </svg>
    ),
  },
  {
    title: 'Abnormal Immune Response',
    desc: 'An overactive immune response triggers inflammation in the skin, causing blood vessels to dilate and producing the persistent redness associated with rosacea.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
      </svg>
    ),
  },
  {
    title: 'Sun & UV Exposure',
    desc: 'UV radiation damages blood vessels in the skin and triggers inflammatory responses, worsening facial redness and making rosacea symptoms more persistent.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="12" cy="12" r="5"/>
        <line x1="12" y1="1" x2="12" y2="3"/>
        <line x1="12" y1="21" x2="12" y2="23"/>
        <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
        <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
        <line x1="1" y1="12" x2="3" y2="12"/>
        <line x1="21" y1="12" x2="23" y2="12"/>
        <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
        <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
      </svg>
    ),
  },
  {
    title: 'Environmental Triggers',
    desc: 'Extreme heat, cold, and wind cause blood vessels to dilate rapidly, leading to flushing and prolonged facial redness in rosacea-prone individuals.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M17.7 7.7a2.5 2.5 0 1 1 1.8 4.3H2"/>
        <path d="M9.6 4.6A2 2 0 1 1 11 8H2"/>
        <path d="M12.6 19.4A2 2 0 1 0 14 16H2"/>
      </svg>
    ),
  },
  {
    title: 'Spicy Food & Alcohol',
    desc: 'Alcohol, spicy foods, caffeine, and hot drinks all trigger vasodilation and flushing, causing visible redness and flare-ups in susceptible individuals.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M18 8h1a4 4 0 0 1 0 8h-1"/>
        <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"/>
        <line x1="6" y1="1" x2="6" y2="4"/>
        <line x1="10" y1="1" x2="10" y2="4"/>
        <line x1="14" y1="1" x2="14" y2="4"/>
      </svg>
    ),
  },
  {
    title: 'Certain Skincare Products',
    desc: 'Harsh cleansers, fragranced products, and alcohol-based formulas compromise the skin barrier, aggravating inflammation and prolonging redness in rosacea-affected skin.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="12" cy="12" r="10"/>
        <line x1="12" y1="8" x2="12" y2="12"/>
        <line x1="12" y1="16" x2="12.01" y2="16"/>
      </svg>
    ),
  },
];

/* ── FAQ data ──────────────────────────────────────────────────── */
const FAQS = [
  {
    question: 'What is rosacea and what causes it?',
    answer:
      'Rosacea is a chronic inflammatory skin condition that causes persistent facial redness, flushing, and visible blood vessels. It is caused by a combination of genetic predisposition, abnormal vascular responses, and external or lifestyle triggers such as sun exposure, alcohol, spicy food, stress, and extreme temperatures.',
  },
  {
    question: 'Can rosacea be treated without medication?',
    answer:
      'Yes. While rosacea cannot be permanently cured, its appearance can be significantly improved without oral or topical medication. Lumecca IPL and laser resurfacing target broken capillaries and redness directly. AlumierMD medical-grade skincare helps to strengthen the skin barrier, reduce inflammation, and improve overall skin tone and resilience.',
  },
  {
    question: 'How many sessions are needed to see results?',
    answer:
      'Most patients notice visible improvement after 1 to 3 Lumecca IPL sessions, though this varies depending on skin type and severity. Laser resurfacing typically requires 2 to 4 sessions for optimal vascular clearance. A personalised treatment plan will be recommended following your initial consultation.',
  },
  {
    question: 'Is rosacea treatment safe for sensitive skin?',
    answer:
      'Yes. All treatments at The One Clinic are performed by GMC-registered doctors with specialist training in medical aesthetics and skin health. We use clinically appropriate settings and products carefully adjusted to suit sensitive, rosacea-prone skin. A thorough assessment is always carried out before any treatment begins.',
  },
  {
    question: 'What is the recovery time after rosacea treatment?',
    answer:
      'Recovery varies by treatment. Lumecca IPL may cause temporary redness or warmth for 24 to 72 hours. Laser resurfacing may involve light redness and sensitivity for several days. AlumierMD skincare has no downtime. In most cases you can return to daily activities the same day or the following day.',
  },
  {
    question: 'How long do the results last?',
    answer:
      'Lumecca IPL can provide significant long-term reduction in redness and visible vessels, with results often lasting 12 months or more. Results depend on ongoing trigger management and skin maintenance. Periodic top-up sessions alongside a consistent medical-grade skincare routine help sustain optimal results over time.',
  },
];

/* ── Related data ──────────────────────────────────────────────── */
const RELATED_TREATMENTS = [
  {
    title: 'Lumecca IPL',
    desc:  'Target broken capillaries and persistent facial redness with clinically proven intense pulsed light.',
    href:  '/treatments/ipl-leicester',
    tag:   'Medical Aesthetics',
  },
  {
    title: 'Laser Resurfacing',
    desc:  'Resurface and calm rosacea-prone skin to improve tone, texture, and vascular redness.',
    href:  '/treatments/deep-laser-resurfacing-leicester',
    tag:   'Medical Aesthetics',
  },
  {
    title: 'AlumierMD Skincare',
    desc:  'Medical-grade skincare formulated to strengthen the skin barrier and reduce chronic redness.',
    href:  '/treatments/skincare-alumier-md-leicester',
    tag:   'Medical Aesthetics',
  },
  {
    title: 'Private GP Consultation',
    desc:  'Expert medical assessment and personalised rosacea management from our GMC-registered doctors.',
    href:  '/treatments/private-gp-leicester',
    tag:   'Medical',
  },
];

const RELATED_CONDITIONS = [
  {
    title: 'Pigmentation',
    desc:  'Treat uneven skin tone and unwanted pigmentation with targeted aesthetic treatments.',
    href:  '/conditions/pigmentation',
    tag:   'Skin',
  },
  {
    title: 'Hyperpigmentation',
    desc:  'Reduce sun damage, freckles, and dark patches for a clearer, more even complexion.',
    href:  '/conditions/hyperpigmentation-sun-damage-freckles',
    tag:   'Skin',
  },
];

/* ── Risk factors ─────────────────────────────────────────────── */
const RISK_FACTORS = [
  'Fair-skinned individuals with light eyes or hair.',
  'Women aged 30 to 60 years old.',
  'Those with a family history of rosacea.',
  'People who flush easily in response to heat or emotion.',
  'Individuals with Celtic or Northern European heritage.',
  'Those with chronic or prolonged sun exposure.',
];

/* ── Diagnose steps ───────────────────────────────────────────── */
const DIAGNOSE_STEPS = [
  {
    num: '01',
    text: 'Visual Skin & Vascular Assessment , examining the degree of redness, flushing, and visible blood vessels across the face.',
  },
  {
    num: '02',
    text: 'Trigger Identification & History , reviewing your lifestyle, skincare routine, and known triggers to understand your rosacea pattern.',
  },
  {
    num: '03',
    text: 'Skin Sensitivity & Redness Grading , assessing skin sensitivity and grading redness severity to guide the most appropriate treatment plan.',
  },
];

/* ── Treatments ───────────────────────────────────────────────── */
const TREATMENTS = [
  {
    title:  'Lumecca IPL',
    desc:   'Clinically proven intense pulsed light that selectively targets haemoglobin to reduce redness, flushing, and visible broken capillaries.',
    href:   '/treatments/ipl-leicester',
    image:  '/images/BA1.jpg',
  },
  {
    title:  'Laser Resurfacing',
    desc:   'Targeted laser energy resurfaces the skin and reduces vascular redness, improving overall skin tone and texture.',
    href:   '/treatments/deep-laser-resurfacing-leicester',
    image:  '/images/BA2.jpg',
  },
  {
    title:  'AlumierMD Skincare',
    desc:   'Medical-grade skincare products formulated to strengthen the skin barrier, reduce inflammation, and calm rosacea-prone skin.',
    href:   '/treatments/skincare-alumier-md-leicester',
    image:  '/images/BA3.jpg',
  },
  {
    title:  'Private GP Consultation',
    desc:   'Comprehensive medical assessment of your rosacea with a personalised management plan from our GMC-registered doctors.',
    href:   '/treatments/private-gp-leicester',
    image:  '/images/BA4.jpg',
  },
];

/* ── When to call a doctor ────────────────────────────────────── */
const WHEN_TO_CALL = [
  'Worsening redness that does not respond to treatment or trigger avoidance.',
  'Eye involvement such as irritation, redness, or sensitivity (ocular rosacea).',
  'Skin thickening or changes in skin texture, particularly around the nose.',
  'Rosacea significantly impacting your confidence or daily quality of life.',
];

/* ── Results timeline ─────────────────────────────────────────── */
const RESULTS_TIMELINE = [
  {
    phase: 'After 1,2 Sessions',
    title: 'Redness Reduction Timeline',
    desc:  'Visible calming of facial redness and flushing, with broken capillaries beginning to fade following initial treatments.',
  },
  {
    phase: '4 to 8 Weeks',
    title: 'Vascular Clearance',
    desc:  'Visible blood vessels become significantly less prominent as the skin heals and vascular damage is progressively reduced.',
  },
  {
    phase: 'Long-term',
    title: 'Ongoing Trigger Management',
    desc:  'Sustained clearer skin achieved through periodic maintenance sessions combined with consistent trigger avoidance and medical-grade skincare.',
  },
];

/* ── Why choose The One Clinic ────────────────────────────────── */
const CLINIC_REASONS = [
  { n: '01', text: 'All-in-one clinic with medical & aesthetic services.' },
  { n: '02', text: 'Highly trained, compassionate doctors.' },
  { n: '03', text: 'Customised treatments based on listening & expertise.' },
  { n: '04', text: 'State-of-the-art facilities & modern equipment.' },
  { n: '05', text: 'Strong reputation & excellent reviews.' },
  { n: '06', text: 'Comprehensive care and referrals with specialists.' },
];

/* ════════════════════════════════════════════════════════════════
   PAGE
════════════════════════════════════════════════════════════════ */
export default function RosaceaPage() {
  const [showAllFaqs, setShowAllFaqs] = useState(false);

  const visibleFaqs = showAllFaqs ? FAQS : FAQS.slice(0, 4);

  return (
    <>
      {/* ════════════════════════════════════════
          1. HERO
      ════════════════════════════════════════ */}
      <section
        className={styles.hero}
        aria-label="Rosacea Treatment Leicester, hero"
        data-section-theme="dark"
      >
        {/* Breadcrumb, pinned below fixed header */}
        <div className={styles.heroBreadcrumb}>
          <Container>
            <Breadcrumb
              theme="dark"
              items={[
                { label: 'Conditions', href: '/conditions' },
                { label: 'Rosacea' },
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
            {/* Left: text content */}
            <div className={styles.heroLeft}>
              <m.span className={styles.heroCategory} variants={fadeUp}>
                Conditions · Skin
              </m.span>

              <m.h1 className={styles.heroTitle} variants={fadeUp}>
                Rosacea Treatment Leicester
              </m.h1>

              <m.p className={styles.heroDesc} variants={fadeUp}>
                Reduce facial redness, flushing, and visible blood vessels with
                clinically proven treatments tailored to your skin.
              </m.p>

              <m.div className={styles.heroCtas} variants={fadeUp}>
                <BookConsultationButton className={styles.heroCtaPrimary}>
                  Book A Consultation
                </BookConsultationButton>
              </m.div>

              {/* Trust badges */}
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

            {/* Right: hero image */}
            <m.div className={styles.heroImageWrap} variants={fadeUp}>
              <Image
                src="/images/Facial Redness_Rosacea.png"
                alt="Facial redness and rosacea treated at The One Clinic Leicester"
                fill
                className={styles.heroImage}
                sizes="(max-width: 900px) 100vw, 50vw"
                priority
              />
              <div className={styles.heroImageFade} aria-hidden="true" />
            </m.div>
          </m.div>
        </Container>
      </section>

      {/* ════════════════════════════════════════
          2. WHAT IS ROSACEA & TYPES (Combined)
      ════════════════════════════════════════ */}
      <Section variant="light" data-section-theme="light" className={styles.overviewTypesSection}>
        <Container>
          <div className={styles.combinedBody}>
            {/* Left column: Overview */}
            <div className={styles.combinedLeft}>
              <div className={styles.combinedLeftTop}>
                <m.p
                  className={styles.eyebrowDark}
                  initial="hidden"
                  whileInView="show"
                  variants={fadeUp}
                  viewport={VIEWPORT}
                >
                  About This Condition
                </m.p>
                <m.h2
                  className={styles.combinedHeading}
                  initial="hidden"
                  whileInView="show"
                  variants={fadeUp}
                  viewport={VIEWPORT}
                >
                  What Is Rosacea?
                </m.h2>
                <m.p
                  className={styles.combinedDesc}
                  initial="hidden"
                  whileInView="show"
                  variants={fadeUp}
                  viewport={VIEWPORT}
                >
                  Rosacea is a chronic inflammatory skin condition that primarily
                  affects the face, causing persistent redness, flushing, and
                  visible blood vessels. It most commonly affects the cheeks, nose,
                  chin, and forehead, and tends to come and go in cycles. While it
                  cannot be permanently cured, its appearance can be significantly
                  managed with the right professional treatments.
                </m.p>
              </div>
            </div>

            {/* Right column: Types */}
            <div className={styles.combinedRight}>
              <m.div
                className={styles.typesRightHeader}
                initial="hidden"
                whileInView="show"
                variants={fadeUp}
                viewport={VIEWPORT}
              >
                <p className={styles.combinedRightLabel}>Classification</p>
                <h3 className={styles.typesRightHeading}>Types of Rosacea</h3>
              </m.div>

              <m.div
                className={styles.combinedCards}
                variants={stagger(0.1)}
                initial="hidden"
                whileInView="show"
                viewport={VIEWPORT}
              >
                {ROSACEA_TYPES.map((type) => (
                  <m.div
                    key={type.num}
                    className={styles.typeCardCombined}
                    variants={fadeUp}
                  >
                    <span className={styles.typeNumCombined} aria-hidden="true">
                      {type.num}
                    </span>
                    <div className={styles.typeCardHeader}>
                      <h3 className={styles.typeTitleCombined}>{type.title}</h3>
                      <p className={styles.typeDescCombined}>{type.desc}</p>
                    </div>
                  </m.div>
                ))}
              </m.div>
            </div>
          </div>
        </Container>
      </Section>

      {/* ════════════════════════════════════════
          4. ROSACEA CAUSES
      ════════════════════════════════════════ */}
      <Section variant="light" data-section-theme="light" className={styles.causesSection}>
        <Container>
          <m.div
            className={styles.sectionHeaderCentre}
            variants={stagger(0.1)}
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
          >
            <m.p className={styles.eyebrowDark} variants={fadeUp}>
              Root Causes
            </m.p>
            <m.h2 className={styles.headingDark} variants={fadeUp}>
              Rosacea Causes
            </m.h2>
            <m.p className={styles.sectionSubtext} variants={fadeUp}>
              Rosacea has multiple contributing factors. Understanding your triggers
              is a key part of effective, long-term management.
            </m.p>
          </m.div>

          <m.div
            className={styles.causesGrid}
            variants={stagger(0.08)}
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
          >
            {CAUSES.map((cause) => (
              <m.div
                key={cause.title}
                className={styles.causeCard}
                variants={fadeUp}
                whileHover={{
                  y: -6,
                  transition: { type: 'spring', stiffness: 280, damping: 18 },
                }}
              >
                <span className={styles.causeIcon}>{cause.icon}</span>
                <h3 className={styles.causeTitle}>{cause.title}</h3>
                <p className={styles.causeDesc}>{cause.desc}</p>
              </m.div>
            ))}
          </m.div>
        </Container>
      </Section>

      {/* ════════════════════════════════════════
          5. WHO IS MORE LIKELY?
      ════════════════════════════════════════ */}
      <Section variant="light" data-section-theme="light">
        <Container>
          <m.div
            className={styles.riskGrid}
            variants={stagger(0.12)}
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
          >
            {/* Left: image */}
            <m.div className={styles.riskImageWrap} variants={fadeUp}>
              <Image
                src="/images/Facial Redness_Rosacea.png"
                alt="Person with facial redness and rosacea"
                fill
                className={styles.riskImage}
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className={styles.riskImageOverlay} aria-hidden="true" />
            </m.div>

            {/* Right: heading + intro + checklist */}
            <m.div className={styles.riskRight} variants={stagger(0.1)}>
              <div className={styles.riskRightInner}>
                <m.p className={styles.eyebrowDark} variants={fadeUp}>
                  Risk Factors
                </m.p>
                <m.h2 className={styles.riskHeading} variants={fadeUp}>
                  Who Is More Likely to Develop Rosacea?
                </m.h2>
                <m.p className={styles.riskIntro} variants={fadeUp}>
                  The following individuals may be more at risk of developing rosacea.
                </m.p>

                <m.ul
                  className={styles.riskList}
                  role="list"
                  variants={stagger(0.08)}
                >
                  {RISK_FACTORS.map((item) => (
                    <m.li key={item} className={styles.riskItem} variants={fadeUp}>
                      <span className={styles.riskCheck} aria-hidden="true">
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                          <polyline points="2,7 5.5,10.5 12,3.5" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </span>
                      <span>{item}</span>
                    </m.li>
                  ))}
                </m.ul>
              </div>
            </m.div>
          </m.div>
        </Container>
      </Section>

      {/* ════════════════════════════════════════
          6. HOW DO WE DIAGNOSE?
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
              Our Process
            </m.p>
            <m.h2 className={styles.headingLight} variants={fadeUp}>
              How Do We Diagnose Rosacea?
            </m.h2>
            <m.p className={styles.diagnoseIntro} variants={fadeUp}>
              Our specialists will:
            </m.p>
          </m.div>

          <m.div
            className={styles.diagnoseGrid}
            variants={stagger(0.1)}
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
          >
            {DIAGNOSE_STEPS.map((step) => (
              <m.div
                key={step.num}
                className={styles.diagnoseCard}
                variants={fadeUp}
              >
                <span className={styles.diagnoseNum} aria-hidden="true">
                  {step.num}
                </span>
                <p className={styles.diagnoseText}>{step.text}</p>
              </m.div>
            ))}
          </m.div>
        </Container>
      </Section>

      {/* ════════════════════════════════════════
          7. TREATMENTS FOR ROSACEA
      ════════════════════════════════════════ */}
      <Section variant="light" data-section-theme="light">
        <Container>
          <m.div
            className={styles.sectionHeaderCentre}
            variants={stagger(0.1)}
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
          >
            <m.p className={styles.eyebrowDark} variants={fadeUp}>
              Your Options
            </m.p>
            <m.h2 className={styles.headingDark} variants={fadeUp}>
              Treatments For Rosacea
            </m.h2>
          </m.div>

          <m.div
            className={styles.treatmentsGrid}
            variants={stagger(0.1)}
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
          >
            {TREATMENTS.map((t) => (
              <m.div
                key={t.title}
                className={styles.treatmentCard}
                variants={fadeUp}
                whileHover={{ y: -4, transition: { type: 'spring', stiffness: 280, damping: 18 } }}
              >
                <div className={styles.treatmentCardBody}>
                  <Link href={t.href} className={styles.treatmentTitleLink}>
                    <h3 className={styles.treatmentTitle}>{t.title}</h3>
                    <span className={styles.treatmentArrow} aria-hidden="true">
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </span>
                  </Link>
                  <p className={styles.treatmentDesc}>{t.desc}</p>
                </div>
              </m.div>
            ))}
          </m.div>
        </Container>
      </Section>

      {/* ════════════════════════════════════════
          8. WHEN TO CALL A DOCTOR?
      ════════════════════════════════════════ */}
      <Section variant="dark" data-section-theme="dark">
        <Container>
          <m.div
            className={styles.whenToCallWrap}
            variants={stagger(0.12)}
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
          >
            {/* Left: heading */}
            <m.div className={styles.whenToCallLeft} variants={stagger(0.1)}>
              <m.p className={styles.eyebrowLight} variants={fadeUp}>
                Medical Advice
              </m.p>
              <m.h2 className={styles.whenToCallHeading} variants={fadeUp}>
                When to Call a Doctor?
              </m.h2>
              <m.p className={styles.whenToCallIntro} variants={fadeUp}>
                Rosacea is a manageable condition, but you should seek medical advice if you notice:
              </m.p>
            </m.div>

            {/* Right: warning list */}
            <m.ul
              className={styles.whenToCallList}
              role="list"
              variants={stagger(0.08)}
            >
              {WHEN_TO_CALL.map((item) => (
                <m.li key={item} className={styles.whenToCallItem} variants={fadeUp}>
                  <span className={styles.whenToCallIcon} aria-hidden="true">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10"/>
                      <line x1="12" y1="8" x2="12" y2="12"/>
                      <line x1="12" y1="16" x2="12.01" y2="16"/>
                    </svg>
                  </span>
                  <span>{item}</span>
                </m.li>
              ))}
            </m.ul>
          </m.div>
        </Container>
      </Section>

      {/* ════════════════════════════════════════
          9. RESULTS & EXPECTATIONS
      ════════════════════════════════════════ */}
      <Section variant="light" data-section-theme="light" className={styles.resultsSection}>
        <Container>
          <m.div
            className={styles.sectionHeaderCentre}
            variants={stagger(0.1)}
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
          >
            <m.p className={styles.eyebrowDark} variants={fadeUp}>
              What To Expect
            </m.p>
            <m.h2 className={styles.headingDark} variants={fadeUp}>
              Results &amp; Expectations
            </m.h2>
            <m.p className={styles.sectionSubtext} variants={fadeUp}>
              After treatment for rosacea, here is what you can expect at each
              stage of your skin&apos;s improvement.
            </m.p>
          </m.div>

          <m.div
            className={styles.resultsGrid}
            variants={stagger(0.1)}
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
          >
            {RESULTS_TIMELINE.map((item) => (
              <m.div
                key={item.phase}
                className={styles.resultCard}
                variants={fadeUp}
                whileHover={{ y: -6, transition: { type: 'spring', stiffness: 280, damping: 18 } }}
              >
                <span className={styles.resultPhase}>{item.phase}</span>
                <h3 className={styles.resultTitle}>{item.title}</h3>
                <p className={styles.resultDesc}>{item.desc}</p>
              </m.div>
            ))}
          </m.div>
        </Container>
      </Section>

      {/* ════════════════════════════════════════
          10. MEET THE EXPERTS
      ════════════════════════════════════════ */}
      <MeetTheExperts />

      {/* ════════════════════════════════════════
          GOOGLE REVIEWS
      ════════════════════════════════════════ */}
      <Testimonials />

      {/* ════════════════════════════════════════
          11. WHY CHOOSE THE ONE CLINIC
      ════════════════════════════════════════ */}
      <Section variant="light" data-section-theme="light" className={styles.whySection}>
        <Container>
          <m.div
            className={styles.sectionHeaderCentre}
            variants={stagger(0.1)}
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
          >
            <m.p className={styles.eyebrowDark} variants={fadeUp}>
              Why Us
            </m.p>
            <m.h2 className={styles.headingDark} variants={fadeUp}>
              Why Choose The One Clinic For Rosacea Treatment
            </m.h2>
          </m.div>

          <m.div
            className={styles.whyGrid}
            variants={stagger(0.08)}
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
          >
            {CLINIC_REASONS.map((r) => (
              <m.div
                key={r.n}
                className={styles.whyCard}
                variants={fadeUp}
                whileHover={{ y: -6, transition: { type: 'spring', stiffness: 280, damping: 20 } }}
              >
                <span className={styles.whyNumber}>{r.n}</span>
                <p className={styles.whyText}>{r.text}</p>
              </m.div>
            ))}
          </m.div>
        </Container>
      </Section>

      {/* ════════════════════════════════════════
          12. FAQ
      ════════════════════════════════════════ */}
      <Section variant="light" data-section-theme="light" className={styles.faqSection}>
        <Container className={styles.faqInner}>
          <m.div
            className={styles.sectionHeaderCentre}
            variants={stagger(0.1)}
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
          >
            <m.p className={styles.eyebrowDark} variants={fadeUp}>FAQ</m.p>
            <m.h2 className={styles.headingDark} variants={fadeUp}>
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
            <Accordion items={visibleFaqs} theme="dark" />
          </m.div>

          <div className={styles.faqToggleWrap}>
            <button
              className={styles.faqToggleBtn}
              onClick={() => setShowAllFaqs((prev) => !prev)}
            >
              {showAllFaqs ? 'Show Fewer Questions' : 'View All Questions'}
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <polyline points={showAllFaqs ? '18 15 12 9 6 15' : '6 9 12 15 18 9'} />
              </svg>
            </button>
          </div>
        </Container>
      </Section>

      {/* ════════════════════════════════════════
          13. CONSULTATION CTA
      ════════════════════════════════════════ */}
      <section
        className={styles.ctaBand}
        data-section-theme="dark"
        aria-label="Rosacea consultation CTA"
      >
        {/* Background image */}
        <div className={styles.ctaBandBgWrap} aria-hidden="true">
          <Image
            src="/images/Background section image new1.jpg"
            alt=""
            fill
            className={styles.ctaBandBgImg}
            sizes="100vw"
          />
          <div className={styles.ctaBandOverlay} />
        </div>

        <Container>
          <m.div
            className={styles.ctaContent}
            variants={stagger(0.15)}
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
          >
            <m.p className={styles.eyebrowLight} variants={fadeUp}>
              Take the First Step
            </m.p>
            <m.h2 className={styles.ctaHeading} variants={fadeUp}>
              Ready for Calmer,{' '}
              <span className={styles.ctaAccent}>Clearer Skin?</span>
            </m.h2>
            <m.p className={styles.ctaSubtext} variants={fadeUp}>
              Talk to our specialists today to find the best treatment for your
              rosacea and restore an even, confident complexion.
            </m.p>
            <m.div className={styles.ctaBtns} variants={fadeUp}>
              <BookConsultationButton className={styles.ctaBtnPrimary}>
                Book a Consultation
              </BookConsultationButton>
              <Link href="#contact" className={styles.ctaBtnSecondary}>
                Contact Us
              </Link>
            </m.div>
          </m.div>
        </Container>
      </section>

      {/* ════════════════════════════════════════
          14. LEAD FORM
      ════════════════════════════════════════ */}
      <div id="contact">
        <LeadForm />
      </div>

      {/* ════════════════════════════════════════
          15. RELATED TREATMENTS
      ════════════════════════════════════════ */}
      <Section variant="light" data-section-theme="light">
        <Container>
          <m.div
            className={styles.sectionHeaderCentre}
            variants={stagger(0.1)}
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
          >
            <m.p className={styles.eyebrowDark} variants={fadeUp}>Explore</m.p>
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
            {RELATED_TREATMENTS.map((item) => (
              <m.div key={item.title} className={styles.relatedCell} variants={fadeUp}>
                <Link href={item.href} className={styles.relatedCard}>
                  <span className={styles.relatedTag}>{item.tag}</span>
                  <h3 className={styles.relatedTitle}>{item.title}</h3>
                  <p className={styles.relatedDesc}>{item.desc}</p>
                  <span className={styles.relatedArrow} aria-hidden="true">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </span>
                </Link>
              </m.div>
            ))}
          </m.div>
        </Container>
      </Section>

      {/* ════════════════════════════════════════
          16. RELATED CONDITIONS
      ════════════════════════════════════════ */}
      <Section variant="light" data-section-theme="light" className={styles.relatedConditionsSection}>
        <Container>
          <m.div
            className={styles.sectionHeaderCentre}
            variants={stagger(0.1)}
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
          >
            <m.p className={styles.eyebrowDark} variants={fadeUp}>Similar Concerns</m.p>
            <m.h2 className={styles.headingDark} variants={fadeUp}>
              Related Conditions
            </m.h2>
          </m.div>

          <m.div
            className={styles.relatedGrid}
            variants={stagger(0.1)}
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
          >
            {RELATED_CONDITIONS.map((item) => (
              <m.div key={item.title} className={styles.relatedCell} variants={fadeUp}>
                <Link href={item.href} className={styles.relatedCard}>
                  <span className={styles.relatedTag}>{item.tag}</span>
                  <h3 className={styles.relatedTitle}>{item.title}</h3>
                  <p className={styles.relatedDesc}>{item.desc}</p>
                  <span className={styles.relatedArrow} aria-hidden="true">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </span>
                </Link>
              </m.div>
            ))}
          </m.div>
        </Container>
      </Section>

    </>
  );
}
