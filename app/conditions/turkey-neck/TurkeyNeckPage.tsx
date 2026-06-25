'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { m } from 'framer-motion';
import Section from '@/components/ui/Section';
import Container from '@/components/ui/Container';
import Accordion from '@/components/ui/Accordion';
import BookConsultationButton from '@/components/ui/BookConsultationButton';
import TrustBadges from '@/components/ui/TrustBadges';
import Breadcrumb from '@/components/ui/Breadcrumb';
import LeadForm from '@/components/sections/LeadForm';
import MeetTheExperts from '@/components/sections/MeetTheExperts';
import Testimonials from '@/components/sections/Testimonials';
import { fadeUp, stagger, VIEWPORT } from '@/lib/motion';
import styles from './page.module.css';

/* ── Turkey Neck Types ────────────────────────────────────────── */
const TURKEY_NECK_TYPES = [
  {
    num: '01',
    title: 'Loose Skin',
    desc: 'Sagging, lax skin along the front and sides of the neck with a soft, wattled texture.',
  },
  {
    num: '02',
    title: 'Horizontal Necklines',
    desc: 'Distinct horizontal creases across the neck, often worsened by downward head posture.',
  },
  {
    num: '03',
    title: 'Neck Bands',
    desc: 'Visible vertical cords caused by the platysma muscle weakening, creating taut bands.',
  },
];

/* ── Causes ───────────────────────────────────────────────────── */
const CAUSES = [
  {
    title: 'Ageing',
    desc: 'The neck is one of the first areas to show age. Collagen and elastin break down over time.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
      </svg>
    ),
  },
  {
    title: 'Skin Laxity',
    desc: 'As structural support weakens, gravity pulls the skin downward, creating a saggy appearance.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M12 2v20M2 12h20" />
        <path d="M4.93 4.93l14.14 14.14" />
      </svg>
    ),
  },
  {
    title: 'Weight Loss',
    desc: 'Significant weight loss can leave excess, stretched skin around the neck that struggles to contract.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
  },
  {
    title: 'Sun Damage',
    desc: 'The neck is often neglected in sun care. UV exposure degrades collagen fibres, accelerating thinning.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="12" cy="12" r="5" />
        <line x1="12" y1="1" x2="12" y2="3" />
        <line x1="12" y1="21" x2="12" y2="23" />
        <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
        <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
        <line x1="1" y1="12" x2="3" y2="12" />
        <line x1="21" y1="12" x2="23" y2="12" />
        <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
        <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
      </svg>
    ),
  },
];

/* ── Risk factors ─────────────────────────────────────────────── */
const RISK_FACTORS = [
  'Adults over the age of 40.',
  'Those with a family history of neck laxity.',
  'People with a history of significant weight fluctuations.',
  'Individuals with prolonged sun exposure.',
  'Frequent mobile and screen device users.',
  'Smokers and former smokers.',
];

/* ── Diagnose steps ───────────────────────────────────────────── */
const DIAGNOSE_STEPS = [
  {
    num: '01',
    text: 'Assess the neck area to evaluate skin laxity, visible bands, and neckline severity.',
  },
  {
    num: '02',
    text: 'Discuss your medical history, lifestyle factors, and aesthetic goals for the neck.',
  },
  {
    num: '03',
    text: 'Recommend the most suitable non-surgical treatment options tailored to your needs.',
  },
];

/* ── Treatments for turkey neck ────────────────────────────────── */
const TREATMENTS = [
  {
    title: 'Endolift',
    desc: 'Advanced radiofrequency technology delivers controlled heat to stimulate collagen production, tightening loose neck tissue.',
    href: '/treatments/endolift-laser-leicester',
    image: '/images/BA1.jpg',
  },
  {
    title: 'Profhilo',
    desc: 'A highly concentrated injectable hyaluronic acid treatment that bioremodels the skin, restoring elasticity and firmness.',
    href: '/treatments/profhilo-leicester',
    image: '/images/BA2.jpg',
  },
  {
    title: 'Polynucleotides',
    desc: 'Stimulates collagen and elastin regeneration to deeply rejuvenate and tighten lax neck skin.',
    href: '/treatments/polynucleotides-leicester',
    image: '/images/BA3.jpg',
  },
  {
    title: 'Chemical Peels',
    desc: 'Resurfaces the skin to reduce the appearance of horizontal necklines and improve overall texture.',
    href: '/treatments/chemical-peels-leicester',
    image: '/images/BA4.jpg',
  },
];

/* ── When to call a doctor ────────────────────────────────────── */
const WHEN_TO_CALL = [
  'Sudden or severe sagging of the neck skin.',
  'Pain, redness, or signs of infection after treatment.',
  'Persistent difficulty swallowing or breathing.',
  'Skin changes accompanied by swelling or unusual symptoms.',
];

/* ── Results timeline ─────────────────────────────────────────── */
const RESULTS_TIMELINE = [
  {
    phase: 'Immediate',
    title: 'Firmer Neck',
    desc: 'Initial tightening and improved skin texture visible shortly after treatment.',
  },
  {
    phase: '2 to 4 Weeks',
    title: 'Collagen Building',
    desc: 'Collagen stimulation continues, with skin feeling progressively firmer.',
  },
  {
    phase: '6 to 12 Weeks',
    title: 'Full Improvement',
    desc: 'Optimal tightening and smoothing results fully visible.',
  },
  {
    phase: 'Long-term',
    title: 'Maintained Results',
    desc: 'Regular maintenance appointments help sustain a smooth, youthful neck.',
  },
];

/* ── Why choose The One Clinic ────────────────────────────────── */
const CLINIC_REASONS = [
  { n: '01', text: 'All-in-one clinic with medical and aesthetic services.' },
  { n: '02', text: 'Highly trained, compassionate, GMC-registered doctors.' },
  { n: '03', text: 'Customised treatment plans based on your individual goals.' },
  { n: '04', text: 'State-of-the-art facilities and modern equipment.' },
  { n: '05', text: 'Strong reputation with excellent patient reviews.' },
  { n: '06', text: 'Comprehensive aftercare and follow-up support.' },
];

/* ── FAQ data ──────────────────────────────────────────────────── */
const FAQS = [
  {
    question: 'What causes turkey neck?',
    answer:
      'Turkey neck is primarily caused by the natural ageing process, as collagen and elastin break down and the skin loses its ability to stay lifted. Contributing factors include genetics, significant weight loss, prolonged sun exposure, smoking, and repeated downward head movements from prolonged screen use, often referred to as tech neck.',
  },
  {
    question: 'Can turkey neck be treated without surgery?',
    answer:
      'Yes. Several effective non-surgical treatments are available, including skin-tightening energy treatments to stimulate collagen, Profhilo to bioremodel and firm the skin, Polynucleotides for deep rejuvenation, and Chemical Peels to improve surface texture. Our doctors will recommend the most suitable option after a thorough consultation.',
  },
  {
    question: 'How long do results last?',
    answer:
      'Results vary by treatment. Skin-tightening treatments can provide improvement for up to 18 to 24 months. Profhilo and Polynucleotides typically last 12 months or more with appropriate maintenance. Regular top-up appointments help to sustain and build on your results over time.',
  },
  {
    question: 'Is turkey neck treatment safe?',
    answer:
      'Yes. All treatments at The One Clinic are carried out by GMC-registered doctors with specialist training in medical aesthetics. We use clinically approved technologies and products, following strict safety protocols. A full assessment is always performed before any treatment begins.',
  },
  {
    question: 'What is the recovery time?',
    answer:
      'Most non-surgical neck treatments have very little downtime. Skin-tightening treatments may cause temporary redness or mild sensitivity for 24 to 48 hours. Injectable treatments such as Profhilo may result in minor swelling at injection sites that typically resolves within a few days. Normal activities can usually be resumed the same day.',
  },
  {
    question: 'Can I prevent turkey neck?',
    answer:
      'While ageing is inevitable, you can reduce the risk of early or severe turkey neck by protecting your neck from sun damage with SPF, maintaining good posture and limiting screen time, staying hydrated, and avoiding smoking. A healthy lifestyle and regular skincare routine also help to maintain skin elasticity.',
  },
  {
    question: 'What is the difference between turkey neck and necklines?',
    answer:
      'Turkey neck refers to loose, sagging skin and loss of definition in the neck area, while necklines are specific horizontal creases or wrinkles that develop across the neck. Both conditions are common and often appear together, but they may respond differently to various treatments.',
  },
  {
    question: 'How soon will I see results?',
    answer:
      'Some treatments, such as skin tightening, may show immediate tightening. However, full results typically develop over 4 to 12 weeks as collagen production is stimulated and the skin remodels. Results continue to improve with maintenance treatments.',
  },
];

/* ── Related data ──────────────────────────────────────────────── */
const RELATED_TREATMENTS = [
  {
    title: 'Endolift',
    desc: 'Stimulate collagen deep within the skin to firm and tighten loose neck tissue.',
    href: '/treatments/endolift-laser-leicester',
    tag: 'Medical Aesthetics',
  },
  {
    title: 'Profhilo',
    desc: 'Bioremodel and deeply hydrate the neck skin to restore elasticity and firmness.',
    href: '/treatments/profhilo-leicester',
    tag: 'Medical Aesthetics',
  },
  {
    title: 'Polynucleotides',
    desc: 'Stimulate collagen production to rejuvenate and tighten lax, ageing neck skin.',
    href: '/treatments/polynucleotides-leicester',
    tag: 'Medical Aesthetics',
  },
];

const RELATED_CONDITIONS = [
  {
    title: 'Jowls / Sagging Skin',
    desc: 'Lift and redefine sagging skin along the jawline and lower face.',
    href: '/conditions/jowls',
    tag: 'Face',
  },
  {
    title: 'Nasolabial Folds',
    desc: 'Smooth and soften smile lines running from the nose to the corners of the mouth.',
    href: '/conditions/nasolabial-folds',
    tag: 'Face',
  },
];

/* ════════════════════════════════════════════════════════════════
   PAGE
════════════════════════════════════════════════════════════════ */
export default function TurkeyNeckPage() {
  const [showAllFaqs, setShowAllFaqs] = useState(false);

  return (
    <>
      {/* ════════════════════════════════════════
          1. HERO
      ════════════════════════════════════════ */}
      <section
        className={styles.hero}
        aria-label="Turkey Neck and Necklines, hero"
        data-section-theme="dark"
      >
        {/* Breadcrumb, pinned below fixed header */}
        <div className={styles.heroBreadcrumb}>
          <Container>
            <Breadcrumb
              theme="dark"
              items={[
                { label: 'Conditions', href: '/conditions' },
                { label: 'Turkey Neck / Necklines' },
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
                Conditions &middot; Face
              </m.span>

              <m.h1 className={styles.heroTitle} variants={fadeUp}>
                Turkey Neck &amp; Necklines
              </m.h1>

              <m.p className={styles.heroDesc} variants={fadeUp}>
                Tighten and smooth loose neck skin with personalised, non-surgical
                treatments for a firmer, more youthful appearance.
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
                    <path d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
                    <path d="M4.5 20.118a7.5 7.5 0 0115 0" />
                    <path d="M18.5 15v5M16 17.5h5" />
                  </svg>
                  Led by highly trained doctors
                </span>
                <span className={styles.heroTrustDivider} aria-hidden="true" />
                <span className={styles.heroTrustItem}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
                  </svg>
                  Trusted by patients in Leicester
                </span>
                <span className={styles.heroTrustDivider} aria-hidden="true" />
                <span className={styles.heroTrustItem}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <circle cx="12" cy="12" r="9.5" />
                    <path d="M12 7.5v9M7.5 12h9" />
                  </svg>
                  Comprehensive medical &amp; aesthetic care
                </span>
              </m.div>
            </div>

            {/* Right: hero image */}
            <m.div className={styles.heroImageWrap} variants={fadeUp}>
              <Image
                src="/images/Turkey Neck_Necklines.png"
                alt="Neck area showing turkey neck and necklines, treated at The One Clinic Leicester"
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
          2. OVERVIEW & TYPES (Combined)
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
                  What Is Turkey Neck?
                </m.h2>
                <m.p
                  className={styles.combinedDesc}
                  initial="hidden"
                  whileInView="show"
                  variants={fadeUp}
                  viewport={VIEWPORT}
                >
                  Turkey neck refers to the loose, sagging skin and horizontal creases that
                  develop on the front of the neck as we age. The skin becomes lax, the
                  underlying muscles weaken, and the neck loses the smooth, taut appearance
                  of youth, often creating a wattled or wrinkled look.
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
                <h3 className={styles.typesRightHeading}>Types of Neck Ageing</h3>
              </m.div>

              <m.div
                className={styles.combinedCards}
                variants={stagger(0.1)}
                initial="hidden"
                whileInView="show"
                viewport={VIEWPORT}
              >
                {TURKEY_NECK_TYPES.map((type) => (
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
          3. CAUSES
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
              What Causes Turkey Neck?
            </m.h2>
            <m.p className={styles.sectionSubtext} variants={fadeUp}>
              Understanding what contributes to neck laxity helps identify the right
              treatment approach for lasting improvement.
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
          4. WHO IS MORE LIKELY?
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
                src="/images/Turkey Neck_Necklines.png"
                alt="Person showing turkey neck area"
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
                  Who Is More Likely to Develop Turkey Neck?
                </m.h2>
                <m.p className={styles.riskIntro} variants={fadeUp}>
                  The following individuals may be more at risk of developing turkey neck or necklines.
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
                          <polyline points="2,7 5.5,10.5 12,3.5" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
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
          5. HOW DO WE DIAGNOSE?
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
              How Do We Diagnose Turkey Neck?
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
          6. TREATMENTS FOR TURKEY NECK
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
              Treatments For Turkey Neck &amp; Necklines
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
                        <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
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
          7. WHEN TO CALL A DOCTOR?
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
                Most turkey neck concerns are cosmetic. However, see a doctor if you notice:
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
                      <circle cx="12" cy="12" r="10" />
                      <line x1="12" y1="8" x2="12" y2="12" />
                      <line x1="12" y1="16" x2="12.01" y2="16" />
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
          8. RESULTS & EXPECTATIONS
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
              After treatment for turkey neck and necklines, here is what you can expect
              at each stage of your recovery.
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
          9. MEET THE EXPERTS
      ════════════════════════════════════════ */}
      <MeetTheExperts />

      {/* ════════════════════════════════════════
          10. TESTIMONIALS
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
              Why Choose The One Clinic For Turkey Neck Treatment
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
            <Accordion items={FAQS} theme="dark" />
          </m.div>

          <div className={styles.faqToggleWrap}>
            <button
              className={styles.faqToggleBtn}
              onClick={() => setShowAllFaqs(!showAllFaqs)}
              aria-expanded={showAllFaqs}
            >
              {showAllFaqs ? 'Show Less Questions' : 'View All Questions'}
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <polyline points="6 9 12 15 18 9" />
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
        aria-label="Turkey neck consultation CTA"
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
              Ready to Tighten &amp;{' '}
              <span className={styles.ctaAccent}>Smooth Your Neck?</span>
            </m.h2>
            <m.p className={styles.ctaSubtext} variants={fadeUp}>
              Talk to our specialists today to find the best treatment for your neck
              and restore a firmer, smoother, more youthful appearance.
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
                      <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
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
                      <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
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
