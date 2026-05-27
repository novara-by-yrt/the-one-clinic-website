'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link  from 'next/link';
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
import { fadeUp, stagger, VIEWPORT } from '@/lib/motion';
import styles from './page.module.css';

/* ── Nasolabial fold types ────────────────────────────────────── */
const FOLD_TYPES = [
  {
    num: '01',
    title: 'Static Nasolabial Folds',
    desc: 'Visible at rest as deep creases running from the nose to the mouth corners, present even without facial movement.',
  },
  {
    num: '02',
    title: 'Dynamic Nasolabial Folds',
    desc: 'Appear or deepen with facial expressions such as smiling, laughing, or talking.',
  },
  {
    num: '03',
    title: 'Deep / Severe Folds',
    desc: 'Pronounced grooves that cast shadows and significantly affect the overall facial appearance and balance.',
  },
];

/* ── Causes ───────────────────────────────────────────────────── */
const CAUSES = [
  {
    title: 'Loss of Facial Volume',
    desc: 'Fat pads in the mid-face deflate over time, pulling skin downwards and accentuating the folds.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"/>
      </svg>
    ),
  },
  {
    title: 'Ageing & Collagen Loss',
    desc: 'Collagen and elastin naturally decline with age, reducing skin firmness and causing folds to deepen.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="12" cy="12" r="10"/>
        <polyline points="12 6 12 12 16 14"/>
      </svg>
    ),
  },
  {
    title: 'Gravity & Skin Laxity',
    desc: 'Loss of structural support allows gravity to pull tissue downward, deepening the creases over time.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <line x1="12" y1="2" x2="12" y2="22"/>
        <polyline points="8 18 12 22 16 18"/>
      </svg>
    ),
  },
  {
    title: 'Repeated Facial Movements',
    desc: 'Years of smiling, talking, and laughing cause repeated muscle contractions that etch lines into the skin.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="12" cy="12" r="10"/>
        <path d="M8 14s1.5 2 4 2 4-2 4-2"/>
        <line x1="9" y1="9" x2="9.01" y2="9"/>
        <line x1="15" y1="9" x2="15.01" y2="9"/>
      </svg>
    ),
  },
  {
    title: 'Sun Damage',
    desc: 'Prolonged UV exposure breaks down collagen fibres, accelerating the formation of deep smile lines.',
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
    title: 'Genetics & Bone Structure',
    desc: 'Hereditary factors, skin type, and bone structure influence how pronounced nasolabial folds become.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M6 3c0 4.5 6 4.5 6 9s-6 4.5-6 9"/>
        <path d="M18 3c0 4.5-6 4.5-6 9s6 4.5 6 9"/>
        <line x1="3" y1="9" x2="21" y2="9"/>
        <line x1="3" y1="15" x2="21" y2="15"/>
      </svg>
    ),
  },
];

/* ── Risk factors ─────────────────────────────────────────────── */
const RISK_FACTORS = [
  'Those over 35 years of age.',
  'People with thinner faces or less facial fat.',
  'Individuals with significant or prolonged sun exposure.',
  'Those who have lost weight rapidly.',
  'People with a genetic predisposition to deep smile lines.',
  'Frequent expressers , animated talkers and smilers.',
];

/* ── Diagnose steps ───────────────────────────────────────────── */
const DIAGNOSE_STEPS = [
  {
    num: '01',
    text: 'Facial Volume & Crease Depth Assessment , evaluating the severity of the folds and underlying volume loss.',
  },
  {
    num: '02',
    text: 'Dynamic vs Static Fold Analysis , determining whether folds are movement-related or present at rest.',
  },
  {
    num: '03',
    text: 'Skin Quality & Laxity Review , assessing skin texture, elasticity, and overall condition to guide treatment.',
  },
];

/* ── Treatments ───────────────────────────────────────────────── */
const TREATMENTS = [
  {
    title:  'Dermal Fillers',
    desc:   'Hyaluronic acid filler is precisely placed along the nasolabial folds to restore volume, soften the crease, and create a naturally smooth, refreshed appearance.',
    href:   '/treatments/dermal-filler-leicester',
    image:  '/images/BA1.jpg',
  },
  {
    title:  'Endolift Laser',
    desc:   'A minimally invasive laser treatment that tightens skin and stimulates collagen from within, lifting and firming the mid-face to reduce deep folds.',
    href:   '/treatments/endolift-laser-leicester',
    image:  '/images/BA2.jpg',
  },
  {
    title:  'Morpheus8',
    desc:   'Combines radiofrequency energy with microneedling to remodel deeper layers of skin, improving texture and reducing the appearance of nasolabial folds.',
    href:   '/treatments/morpheus8',
    image:  '/images/BA3.jpg',
  },
  {
    title:  'Profhilo',
    desc:   'A highly concentrated injectable that bioremodels the skin from within, improving hydration, elasticity, and overall skin quality around the nose and mouth.',
    href:   '/treatments/profhilo',
    image:  '/images/BA4.jpg',
  },
];

/* ── When to call a doctor ────────────────────────────────────── */
const WHEN_TO_CALL = [
  'Deepening folds that are affecting your confidence or quality of life.',
  'Noticeable asymmetry in the nasolabial folds between each side.',
  'Associated skin changes such as redness, irritation, or unusual texture.',
  'Sudden or significant volume loss in the mid-face area.',
];

/* ── Results timeline ─────────────────────────────────────────── */
const RESULTS_TIMELINE = [
  {
    phase: 'Immediate',
    title: 'Immediate Improvement',
    desc:  'Visible reduction in the depth of nasolabial folds straight after dermal filler treatment.',
  },
  {
    phase: '2 to 4 Weeks',
    title: 'Gradual Collagen Stimulation',
    desc:  'Collagen-stimulating treatments such as Profhilo and Morpheus8 begin to show progressive improvement.',
  },
  {
    phase: 'Long-term',
    title: 'Longevity & Top-ups',
    desc:  'Results are maintained with periodic top-up treatments, preserving a naturally smooth and refreshed appearance.',
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

/* ── FAQ data ──────────────────────────────────────────────────── */
const FAQS = [
  {
    question: 'What are nasolabial folds?',
    answer:
      'Nasolabial folds, also known as smile lines or laugh lines, are the two creases that run from the sides of the nose down to the corners of the mouth. They are a natural part of facial anatomy, but become more prominent as skin loses volume and elasticity with age.',
  },
  {
    question: 'What causes nasolabial folds to deepen?',
    answer:
      'Nasolabial folds deepen primarily due to the natural ageing process. As collagen and elastin break down, the skin loses firmness and elasticity. Fat pads in the mid-face also descend over time, pulling the skin downwards. Sun damage, genetics, smoking, significant weight loss, and repeated facial expressions can all accelerate the process.',
  },
  {
    question: 'Can nasolabial folds be treated without surgery?',
    answer:
      'Yes. Dermal fillers are the most popular and effective non-surgical option, restoring volume along the crease for an immediate smoothing effect. Endolift Laser, Morpheus8, and Profhilo work by stimulating collagen and tightening the skin from within. Our doctors will recommend the right treatment after a full assessment.',
  },
  {
    question: 'How long do results last?',
    answer:
      'Dermal filler results typically last 12 to 18 months depending on the product used and your individual metabolism. Collagen-stimulating treatments such as Profhilo and Morpheus8 can provide improvements that last 12 months or more. Regular maintenance appointments help to sustain your results over time.',
  },
  {
    question: 'Is treatment for nasolabial folds safe?',
    answer:
      'Yes. All treatments at The One Clinic are performed by GMC-registered doctors with specialist training in medical aesthetics. We use clinically approved products and follow strict safety protocols. A thorough consultation is always carried out before any treatment is administered.',
  },
  {
    question: 'What is the recovery time after treatment?',
    answer:
      'Most non-surgical treatments have minimal downtime. After dermal filler, patients may experience mild swelling or bruising lasting a few days. Profhilo and Morpheus8 may cause temporary redness or minor swelling at treatment sites. You can typically resume normal activities on the same day or the following day.',
  },
];

/* ── Related data ──────────────────────────────────────────────── */
const RELATED_TREATMENTS = [
  {
    title: 'Dermal Fillers',
    desc:  'Restore volume and smooth nasolabial folds with precision-placed hyaluronic acid filler.',
    href:  '/treatments/dermal-filler-leicester',
    tag:   'Medical Aesthetics',
  },
  {
    title: 'Endolift',
    desc:  'Minimally invasive laser tightening to lift and firm the mid-face from within.',
    href:  '/treatments/endolift-laser-leicester',
    tag:   'Medical Aesthetics',
  },
  {
    title: 'Morpheus8',
    desc:  'Radiofrequency microneedling to remodel skin and reduce deep smile lines.',
    href:  '/treatments/morpheus8',
    tag:   'Medical Aesthetics',
  },
  {
    title: 'Profhilo',
    desc:  'Bioremodel and deeply hydrate the skin to restore elasticity and soften folds.',
    href:  '/treatments/profhilo',
    tag:   'Medical Aesthetics',
  },
];

const RELATED_CONDITIONS = [
  {
    title: 'Jowls',
    desc:  'Lift and redefine sagging skin along the jawline and lower face.',
    href:  '/conditions/jowls',
    tag:   'Face',
  },
  {
    title: 'Thin Lips',
    desc:  'Restore youthful lip volume and definition with subtle, natural-looking enhancement.',
    href:  '/conditions/thin-lips',
    tag:   'Face',
  },
];

/* ════════════════════════════════════════════════════════════════
   PAGE
════════════════════════════════════════════════════════════════ */
export default function NasolabialFoldsPage() {
  const [showAllFaqs, setShowAllFaqs] = useState(false);

  const visibleFaqs = showAllFaqs ? FAQS : FAQS.slice(0, 4);

  return (
    <>
      {/* ════════════════════════════════════════
          1. HERO
      ════════════════════════════════════════ */}
      <section
        className={styles.hero}
        aria-label="Nasolabial Folds Treatment Leicester, hero"
        data-section-theme="dark"
      >
        {/* Breadcrumb, pinned below fixed header */}
        <div className={styles.heroBreadcrumb}>
          <Container>
            <Breadcrumb
              theme="dark"
              items={[
                { label: 'Conditions', href: '/conditions' },
                { label: 'Nasolabial Folds' },
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
            {/* Left: text content */}
            <div className={styles.heroLeft}>
              <motion.span className={styles.heroCategory} variants={fadeUp}>
                Conditions · Face
              </motion.span>

              <motion.h1 className={styles.heroTitle} variants={fadeUp}>
                Nasolabial Folds Treatment Leicester
              </motion.h1>

              <motion.p className={styles.heroDesc} variants={fadeUp}>
                Soften smile lines and restore a refreshed, youthful appearance
                with personalised non-surgical treatments designed for natural,
                lasting results.
              </motion.p>

              <motion.div className={styles.heroCtas} variants={fadeUp}>
                <BookConsultationButton className={styles.heroCtaPrimary}>
                  Book A Consultation
                </BookConsultationButton>
              </motion.div>

              {/* Trust badges */}
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

            {/* Right: hero image */}
            <motion.div className={styles.heroImageWrap} variants={fadeUp}>
              <Image
                src="/images/Nasolabial Folds.png"
                alt="Close-up showing nasolabial folds (smile lines) treated at The One Clinic Leicester"
                fill
                className={styles.heroImage}
                sizes="(max-width: 900px) 100vw, 50vw"
                priority
              />
              <div className={styles.heroImageFade} aria-hidden="true" />
            </motion.div>
          </motion.div>
        </Container>
      </section>

      {/* ════════════════════════════════════════
          2. WHAT ARE NASOLABIAL FOLDS & TYPES (Combined)
      ════════════════════════════════════════ */}
      <Section variant="light" data-section-theme="light" className={styles.overviewTypesSection}>
        <Container>
          <div className={styles.combinedBody}>
            {/* Left column: Overview */}
            <div className={styles.combinedLeft}>
              <div className={styles.combinedLeftTop}>
                <motion.p
                  className={styles.eyebrowDark}
                  initial="hidden"
                  whileInView="show"
                  variants={fadeUp}
                  viewport={VIEWPORT}
                >
                  About This Condition
                </motion.p>
                <motion.h2
                  className={styles.combinedHeading}
                  initial="hidden"
                  whileInView="show"
                  variants={fadeUp}
                  viewport={VIEWPORT}
                >
                  What are Nasolabial Folds?
                </motion.h2>
                <motion.p
                  className={styles.combinedDesc}
                  initial="hidden"
                  whileInView="show"
                  variants={fadeUp}
                  viewport={VIEWPORT}
                >
                  Nasolabial folds, commonly known as smile lines or laugh lines,
                  are the two creases that run from either side of the nose down
                  to the corners of the mouth. They are a natural part of facial
                  anatomy and become more prominent as the skin loses volume and
                  elasticity with age. While mild folds are completely normal,
                  deeper or more pronounced lines can give the face a tired or
                  aged appearance.
                </motion.p>
              </div>
            </div>

            {/* Right column: Types */}
            <div className={styles.combinedRight}>
              <motion.div
                className={styles.typesRightHeader}
                initial="hidden"
                whileInView="show"
                variants={fadeUp}
                viewport={VIEWPORT}
              >
                <p className={styles.combinedRightLabel}>Classification</p>
                <h3 className={styles.typesRightHeading}>Types of Nasolabial Folds</h3>
              </motion.div>

              <motion.div
                className={styles.combinedCards}
                variants={stagger(0.1)}
                initial="hidden"
                whileInView="show"
                viewport={VIEWPORT}
              >
                {FOLD_TYPES.map((type) => (
                  <motion.div
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
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>
        </Container>
      </Section>

      {/* ════════════════════════════════════════
          4. NASOLABIAL FOLDS CAUSES
      ════════════════════════════════════════ */}
      <Section variant="light" data-section-theme="light" className={styles.causesSection}>
        <Container>
          <motion.div
            className={styles.sectionHeaderCentre}
            variants={stagger(0.1)}
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
          >
            <motion.p className={styles.eyebrowDark} variants={fadeUp}>
              Root Causes
            </motion.p>
            <motion.h2 className={styles.headingDark} variants={fadeUp}>
              Nasolabial Folds Causes
            </motion.h2>
            <motion.p className={styles.sectionSubtext} variants={fadeUp}>
              Understanding what contributes to deepening smile lines helps
              identify the right treatment approach for long-lasting results.
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
              <motion.div
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
              </motion.div>
            ))}
          </motion.div>
        </Container>
      </Section>

      {/* ════════════════════════════════════════
          5. WHO IS MORE LIKELY?
      ════════════════════════════════════════ */}
      <Section variant="light" data-section-theme="light">
        <Container>
          <motion.div
            className={styles.riskGrid}
            variants={stagger(0.12)}
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
          >
            {/* Left: image */}
            <motion.div className={styles.riskImageWrap} variants={fadeUp}>
              <Image
                src="/images/Nasolabial Folds.png"
                alt="Person showing nasolabial folds (smile lines) around the nose and mouth"
                fill
                className={styles.riskImage}
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className={styles.riskImageOverlay} aria-hidden="true" />
            </motion.div>

            {/* Right: heading + intro + checklist */}
            <motion.div className={styles.riskRight} variants={stagger(0.1)}>
              <div className={styles.riskRightInner}>
                <motion.p className={styles.eyebrowDark} variants={fadeUp}>
                  Risk Factors
                </motion.p>
                <motion.h2 className={styles.riskHeading} variants={fadeUp}>
                  Who Is More Likely to Develop Nasolabial Folds?
                </motion.h2>
                <motion.p className={styles.riskIntro} variants={fadeUp}>
                  The following individuals may be more at risk of developing pronounced nasolabial folds.
                </motion.p>

                <motion.ul
                  className={styles.riskList}
                  role="list"
                  variants={stagger(0.08)}
                >
                  {RISK_FACTORS.map((item) => (
                    <motion.li key={item} className={styles.riskItem} variants={fadeUp}>
                      <span className={styles.riskCheck} aria-hidden="true">
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                          <polyline points="2,7 5.5,10.5 12,3.5" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </span>
                      <span>{item}</span>
                    </motion.li>
                  ))}
                </motion.ul>
              </div>
            </motion.div>
          </motion.div>
        </Container>
      </Section>

      {/* ════════════════════════════════════════
          6. HOW DO WE DIAGNOSE?
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
              Our Process
            </motion.p>
            <motion.h2 className={styles.headingLight} variants={fadeUp}>
              How Do We Diagnose Nasolabial Folds?
            </motion.h2>
            <motion.p className={styles.diagnoseIntro} variants={fadeUp}>
              Our specialists will:
            </motion.p>
          </motion.div>

          <motion.div
            className={styles.diagnoseGrid}
            variants={stagger(0.1)}
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
          >
            {DIAGNOSE_STEPS.map((step) => (
              <motion.div
                key={step.num}
                className={styles.diagnoseCard}
                variants={fadeUp}
              >
                <span className={styles.diagnoseNum} aria-hidden="true">
                  {step.num}
                </span>
                <p className={styles.diagnoseText}>{step.text}</p>
              </motion.div>
            ))}
          </motion.div>
        </Container>
      </Section>

      {/* ════════════════════════════════════════
          7. TREATMENTS FOR NASOLABIAL FOLDS
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
              Your Options
            </motion.p>
            <motion.h2 className={styles.headingDark} variants={fadeUp}>
              Treatments For Nasolabial Folds
            </motion.h2>
          </motion.div>

          <motion.div
            className={styles.treatmentsGrid}
            variants={stagger(0.1)}
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
          >
            {TREATMENTS.map((t) => (
              <motion.div
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
              </motion.div>
            ))}
          </motion.div>
        </Container>
      </Section>

      {/* ════════════════════════════════════════
          8. WHEN TO CALL A DOCTOR?
      ════════════════════════════════════════ */}
      <Section variant="dark" data-section-theme="dark">
        <Container>
          <motion.div
            className={styles.whenToCallWrap}
            variants={stagger(0.12)}
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
          >
            {/* Left: heading */}
            <motion.div className={styles.whenToCallLeft} variants={stagger(0.1)}>
              <motion.p className={styles.eyebrowLight} variants={fadeUp}>
                Medical Advice
              </motion.p>
              <motion.h2 className={styles.whenToCallHeading} variants={fadeUp}>
                When to Call a Doctor?
              </motion.h2>
              <motion.p className={styles.whenToCallIntro} variants={fadeUp}>
                Nasolabial folds are usually a cosmetic concern. See a
                specialist if you notice:
              </motion.p>
            </motion.div>

            {/* Right: warning list */}
            <motion.ul
              className={styles.whenToCallList}
              role="list"
              variants={stagger(0.08)}
            >
              {WHEN_TO_CALL.map((item) => (
                <motion.li key={item} className={styles.whenToCallItem} variants={fadeUp}>
                  <span className={styles.whenToCallIcon} aria-hidden="true">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10"/>
                      <line x1="12" y1="8" x2="12" y2="12"/>
                      <line x1="12" y1="16" x2="12.01" y2="16"/>
                    </svg>
                  </span>
                  <span>{item}</span>
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>
        </Container>
      </Section>

      {/* ════════════════════════════════════════
          9. RESULTS & EXPECTATIONS
      ════════════════════════════════════════ */}
      <Section variant="light" data-section-theme="light" className={styles.resultsSection}>
        <Container>
          <motion.div
            className={styles.sectionHeaderCentre}
            variants={stagger(0.1)}
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
          >
            <motion.p className={styles.eyebrowDark} variants={fadeUp}>
              What To Expect
            </motion.p>
            <motion.h2 className={styles.headingDark} variants={fadeUp}>
              Results &amp; Expectations
            </motion.h2>
            <motion.p className={styles.sectionSubtext} variants={fadeUp}>
              After treatment for nasolabial folds, here is what you can expect
              at each stage of your results.
            </motion.p>
          </motion.div>

          <motion.div
            className={styles.resultsGrid}
            variants={stagger(0.1)}
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
          >
            {RESULTS_TIMELINE.map((item) => (
              <motion.div
                key={item.phase}
                className={styles.resultCard}
                variants={fadeUp}
                whileHover={{ y: -6, transition: { type: 'spring', stiffness: 280, damping: 18 } }}
              >
                <span className={styles.resultPhase}>{item.phase}</span>
                <h3 className={styles.resultTitle}>{item.title}</h3>
                <p className={styles.resultDesc}>{item.desc}</p>
              </motion.div>
            ))}
          </motion.div>
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
          <motion.div
            className={styles.sectionHeaderCentre}
            variants={stagger(0.1)}
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
          >
            <motion.p className={styles.eyebrowDark} variants={fadeUp}>
              Why Us
            </motion.p>
            <motion.h2 className={styles.headingDark} variants={fadeUp}>
              Why Choose The One Clinic For Nasolabial Folds Treatment
            </motion.h2>
          </motion.div>

          <motion.div
            className={styles.whyGrid}
            variants={stagger(0.08)}
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
          >
            {CLINIC_REASONS.map((r) => (
              <motion.div
                key={r.n}
                className={styles.whyCard}
                variants={fadeUp}
                whileHover={{ y: -6, transition: { type: 'spring', stiffness: 280, damping: 20 } }}
              >
                <span className={styles.whyNumber}>{r.n}</span>
                <p className={styles.whyText}>{r.text}</p>
              </motion.div>
            ))}
          </motion.div>
        </Container>
      </Section>

      {/* ════════════════════════════════════════
          12. FAQ
      ════════════════════════════════════════ */}
      <Section variant="light" data-section-theme="light" className={styles.faqSection}>
        <Container className={styles.faqInner}>
          <motion.div
            className={styles.sectionHeaderCentre}
            variants={stagger(0.1)}
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
          >
            <motion.p className={styles.eyebrowDark} variants={fadeUp}>FAQ</motion.p>
            <motion.h2 className={styles.headingDark} variants={fadeUp}>
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
            <Accordion items={visibleFaqs} theme="dark" />
          </motion.div>

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
        aria-label="Nasolabial folds consultation CTA"
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
          <motion.div
            className={styles.ctaContent}
            variants={stagger(0.15)}
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
          >
            <motion.p className={styles.eyebrowLight} variants={fadeUp}>
              Take the First Step
            </motion.p>
            <motion.h2 className={styles.ctaHeading} variants={fadeUp}>
              It&apos;s Time To Smooth{' '}
              <span className={styles.ctaAccent}>Your Smile Lines!</span>
            </motion.h2>
            <motion.p className={styles.ctaSubtext} variants={fadeUp}>
              Talk to our specialists today to find the best treatment for your
              nasolabial folds and restore a refreshed, youthful look.
            </motion.p>
            <motion.div className={styles.ctaBtns} variants={fadeUp}>
              <BookConsultationButton className={styles.ctaBtnPrimary}>
                Book a Consultation
              </BookConsultationButton>
              <Link href="#contact" className={styles.ctaBtnSecondary}>
                Contact Us
              </Link>
            </motion.div>
          </motion.div>
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
          <motion.div
            className={styles.sectionHeaderCentre}
            variants={stagger(0.1)}
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
          >
            <motion.p className={styles.eyebrowDark} variants={fadeUp}>Explore</motion.p>
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
            {RELATED_TREATMENTS.map((item) => (
              <motion.div key={item.title} className={styles.relatedCell} variants={fadeUp}>
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
              </motion.div>
            ))}
          </motion.div>
        </Container>
      </Section>

      {/* ════════════════════════════════════════
          16. RELATED CONDITIONS
      ════════════════════════════════════════ */}
      <Section variant="light" data-section-theme="light" className={styles.relatedConditionsSection}>
        <Container>
          <motion.div
            className={styles.sectionHeaderCentre}
            variants={stagger(0.1)}
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
          >
            <motion.p className={styles.eyebrowDark} variants={fadeUp}>Similar Concerns</motion.p>
            <motion.h2 className={styles.headingDark} variants={fadeUp}>
              Related Conditions
            </motion.h2>
          </motion.div>

          <motion.div
            className={styles.relatedGrid}
            variants={stagger(0.1)}
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
          >
            {RELATED_CONDITIONS.map((item) => (
              <motion.div key={item.title} className={styles.relatedCell} variants={fadeUp}>
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
              </motion.div>
            ))}
          </motion.div>
        </Container>
      </Section>

    </>
  );
}
