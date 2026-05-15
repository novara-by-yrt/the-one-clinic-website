'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
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

/* ── Weak chin characteristics ────────────────────────── */
const CHARACTERISTICS = [
  {
    num: '01',
    title: 'Recessed Chin',
    desc: 'The chin sits behind the lip line in profile, creating facial imbalance and reduced projection.',
  },
  {
    num: '02',
    title: 'Undefined Jawline',
    desc: 'A soft, rounded jaw lacking angularity and structural definition in the lower face.',
  },
  {
    num: '03',
    title: 'Chin Asymmetry',
    desc: 'One side of the chin or jaw appears less projected than the other, causing visible imbalance.',
  },
];

/* ── Causes ───────────────────────────────────────────── */
const CAUSES = [
  {
    title: 'Genetics',
    desc: 'Bone structure inheritance determines chin and jaw projection.',
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
    title: 'Ageing',
    desc: 'Bone resorption and collagen loss reduce chin definition over time.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="12" cy="12" r="10"/>
        <polyline points="12 6 12 12 16 14"/>
      </svg>
    ),
  },
  {
    title: 'Volume Loss',
    desc: 'Fat pad depletion creates less defined contours and weaker facial angles.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"/>
      </svg>
    ),
  },
  {
    title: 'Weight Changes',
    desc: 'Significant fluctuations alter lower face appearance and definition.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
        <circle cx="9" cy="7" r="4"/>
        <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
        <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
      </svg>
    ),
  },
];

/* ── Treatments for weak chin ──────────────────────────── */
const TREATMENTS = [
  {
    title: 'Dermal Fillers',
    desc: 'Restore volume and define the chin and jawline with hyaluronic acid filler for a sharper profile.',
    href: '/treatments/dermal-fillers',
    image: '/images/BA1.jpg',
  },
  {
    title: 'Radiesse',
    desc: 'Calcium hydroxylapatite stimulates collagen while adding immediate volume to the chin.',
    href: '/treatments/radiesse',
    image: '/images/BA2.jpg',
  },
  {
    title: 'Profhilo',
    desc: 'Bioremodels and firms the lower face, improving skin elasticity and jaw definition.',
    href: '/treatments/profhilo',
    image: '/images/BA3.jpg',
  },
  {
    title: 'Polynucleotides',
    desc: 'Stimulates collagen and elastin production to rejuvenate the chin and jawline area.',
    href: '/treatments/polynucleotides-leicester',
    image: '/images/BA4.jpg',
  },
];

/* ── Risk factors ─────────────────────────────────────── */
const RISK_FACTORS = [
  'People with a family history of recessed or undefined chin.',
  'Adults over the age of 35.',
  'Individuals with naturally asymmetric facial features.',
  'Those who have experienced significant weight fluctuations.',
  'People with thin skin prone to early laxity.',
  'Individuals concerned about facial profile balance.',
];

/* ── Diagnose steps ───────────────────────────────────── */
const DIAGNOSE_STEPS = [
  {
    num: '01',
    text: 'Assess the chin projection, jawline definition, and overall facial proportions.',
  },
  {
    num: '02',
    text: 'Discuss your aesthetic goals, profile concerns, and desired outcome.',
  },
  {
    num: '03',
    text: 'Recommend the most suitable non-surgical or surgical treatment options.',
  },
];

/* ── Results timeline ─────────────────────────────────── */
const RESULTS_TIMELINE = [
  {
    phase: 'Immediate',
    title: 'Defined Chin',
    desc: 'Visible improvement in chin projection and jawline definition immediately.',
  },
  {
    phase: '1 to 2 Weeks',
    title: 'Settled Results',
    desc: 'Filler integrates naturally for smooth, balanced facial contours.',
  },
  {
    phase: '4 to 8 Weeks',
    title: 'Full Enhancement',
    desc: 'Collagen-stimulating treatments show progressive improvement in firmness.',
  },
  {
    phase: 'Long-term',
    title: 'Maintained Definition',
    desc: 'Regular top-ups sustain jawline definition and facial balance.',
  },
];

/* ── Why choose The One Clinic ────────────────────────── */
const CLINIC_REASONS = [
  { n: '01', text: 'All-in-one clinic with medical and aesthetic services.' },
  { n: '02', text: 'Highly trained, compassionate, GMC-registered doctors.' },
  { n: '03', text: 'Customised treatment plans based on your goals.' },
  { n: '04', text: 'State-of-the-art facilities and modern equipment.' },
  { n: '05', text: 'Strong reputation with excellent patient reviews.' },
  { n: '06', text: 'Comprehensive aftercare and follow-up support.' },
];

/* ── When to call a doctor ────────────────────────────── */
const WHEN_TO_CALL = [
  'Severe asymmetry affecting facial balance or function.',
  'Pain, swelling, or numbness in the chin or jaw area.',
  'Difficulty chewing or speaking after treatment.',
  'Concerns about placement or appearance of treatment results.',
];

/* ── FAQ data ──────────────────────────────────────────── */
const FAQS = [
  {
    question: 'What causes a weak chin or jawline?',
    answer: 'A weak chin or jawline is most often caused by genetics, the underlying bone structure determines how projected and defined the lower face appears. Ageing also plays a role, as bone resorption and collagen loss reduce definition over time. Volume loss, weight changes, and facial asymmetry can all contribute.',
  },
  {
    question: 'Can a weak chin be treated without surgery?',
    answer: 'Yes. Chin and jaw filler is the most effective non-surgical option, adding projection and definition to the lower face with immediate results. Skin-tightening treatments, Profhilo, and Polynucleotides can also improve firmness and structure. Our doctors will recommend the best approach after assessment.',
  },
  {
    question: 'How long do chin filler results last?',
    answer: 'Chin and jaw filler typically lasts 12 to 18 months, depending on the product used and individual metabolism. Skin-tightening and collagen-stimulating treatments can provide improvement for 12 to 24 months with appropriate maintenance.',
  },
  {
    question: 'Will the results look natural?',
    answer: 'Yes. Our approach is to enhance your existing facial structure rather than create an unnatural appearance. Our GMC-registered doctors assess your proportions and aesthetic goals before treatment to ensure balanced, natural-looking results.',
  },
  {
    question: 'What is the recovery time for chin filler?',
    answer: 'Non-surgical chin treatments typically involve minimal downtime. Mild swelling or bruising may occur for a few days after filler. Most patients can return to normal activities on the same day or within 24 hours.',
  },
  {
    question: 'Can chin filler fix facial asymmetry?',
    answer: 'Yes. Strategic filler placement can improve asymmetry by adding projection to the weaker side, creating better facial balance. Our doctors use precise techniques to achieve harmonious results that address your specific concerns.',
  },
  {
    question: 'How much does chin and jawline treatment cost?',
    answer: 'Costs vary depending on the treatment type, amount of filler, and your specific concerns. We offer customised treatment plans. Contact us for a personalised consultation and quote.',
  },
  {
    question: 'Are there any side effects?',
    answer: 'Most side effects from dermal fillers are temporary, including mild swelling, bruising, or tenderness. Serious complications are rare when administered by trained professionals. We discuss all potential risks during your consultation.',
  },
];

/* ── Related data ──────────────────────────────────────── */
const RELATED_TREATMENTS = [
  {
    title: 'Dermal Fillers',
    desc: 'Add projection and definition to the chin and jawline with precision-placed filler.',
    href: '/treatments/dermal-fillers',
    tag: 'Medical Aesthetics',
  },
  {
    title: 'Radiesse',
    desc: 'Stimulate collagen while adding volume for enhanced chin and jaw definition.',
    href: '/treatments/radiesse',
    tag: 'Medical Aesthetics',
  },
  {
    title: 'Profhilo',
    desc: 'Bioremodel and firm the lower face to support and enhance jawline definition.',
    href: '/treatments/profhilo',
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
    desc: 'Smooth and soften the smile lines running from the nose to corners of the mouth.',
    href: '/conditions/nasolabial-folds',
    tag: 'Face',
  },
];

/* ════════════════════════════════════════════════════════════════
   PAGE
════════════════════════════════════════════════════════════════ */
export default function WeakChinPage(): React.ReactElement {
  const [showAllFaqs, setShowAllFaqs] = useState<boolean>(false);

  return (
    <>
      {/* ════════════════════════════════════════
          1. HERO
      ════════════════════════════════════════ */}
      <section
        className={styles.hero}
        aria-label="Weak Chin and Jawline, hero"
        data-section-theme="dark"
      >
        {/* Breadcrumb, pinned below fixed header */}
        <div className={styles.heroBreadcrumb}>
          <Container>
            <Breadcrumb
              theme="dark"
              items={[
                { label: 'Conditions', href: '/conditions' },
                { label: 'Weak Chin / Weak Jawline' },
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
                Weak Chin &amp; Jawline
              </motion.h1>

              <motion.p className={styles.heroDesc} variants={fadeUp}>
                Define and contour your chin and jawline with personalised
                non-surgical treatments for a sharper, more balanced profile.
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
                src="/images/Weak Jawline.png"
                alt="Chin and jawline contouring at The One Clinic Leicester"
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
          2. OVERVIEW & CHARACTERISTICS (Combined)
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
                  What Is a Weak Chin &amp; Jawline?
                </motion.h2>
                <motion.p
                  className={styles.combinedDesc}
                  initial="hidden"
                  whileInView="show"
                  variants={fadeUp}
                  viewport={VIEWPORT}
                >
                  A weak chin or jawline refers to a lack of projection, definition, or
                  structural prominence in the lower face. Whether caused by genetics,
                  ageing, or volume loss, non-surgical treatments can significantly improve
                  appearance with minimal downtime.
                </motion.p>
              </div>
            </div>

            {/* Right column: Characteristics */}
            <div className={styles.combinedRight}>
              <motion.div
                className={styles.typesRightHeader}
                initial="hidden"
                whileInView="show"
                variants={fadeUp}
                viewport={VIEWPORT}
              >
                <p className={styles.combinedRightLabel}>How It Presents</p>
                <h3 className={styles.typesRightHeading}>Characteristics</h3>
              </motion.div>

              <motion.div
                className={styles.combinedCards}
                variants={stagger(0.1)}
                initial="hidden"
                whileInView="show"
                viewport={VIEWPORT}
              >
                {CHARACTERISTICS.map((char) => (
                  <motion.div
                    key={char.num}
                    className={styles.typeCardCombined}
                    variants={fadeUp}
                  >
                    <span className={styles.typeNumCombined} aria-hidden="true">
                      {char.num}
                    </span>
                    <div className={styles.typeCardHeader}>
                      <h3 className={styles.typeTitleCombined}>{char.title}</h3>
                      <p className={styles.typeDescCombined}>{char.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>
        </Container>
      </Section>

      {/* ════════════════════════════════════════
          3. CAUSES
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
              What Causes a Weak Chin &amp; Jawline?
            </motion.h2>
            <motion.p className={styles.sectionSubtext} variants={fadeUp}>
              Understanding what contributes to poor chin and jaw definition helps
              identify the most effective treatment approach.
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
          4. RISK FACTORS
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
                src="/images/Eye-bags.jpg"
                alt="Person showing weak chin and jawline profile"
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
                  Who Is More Likely to Have a Weak Chin or Jawline?
                </motion.h2>
                <motion.p className={styles.riskIntro} variants={fadeUp}>
                  The following individuals may be more at risk of developing poor lower facial definition.
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
          5. HOW DO WE DIAGNOSE?
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
              How Do We Diagnose Weak Chin &amp; Jawline?
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
          6. TREATMENTS
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
              Treatments For Weak Chin &amp; Jawline
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
          7. WHEN TO CALL A DOCTOR?
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
                Most weak chin concerns are purely aesthetic. See a doctor if you notice:
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
          8. RESULTS & EXPECTATIONS
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
              After chin and jawline treatment, here is what you can expect at
              each stage of your recovery.
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
              Why Choose The One Clinic For Chin &amp; Jawline Treatment
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
            <Accordion items={FAQS} theme="dark" />
          </motion.div>

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
        aria-label="Weak chin consultation CTA"
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
              Ready to Define{' '}
              <span className={styles.ctaAccent}>Your Profile?</span>
            </motion.h2>
            <motion.p className={styles.ctaSubtext} variants={fadeUp}>
              Talk to our specialists today to find the best treatment for your
              chin and jawline and achieve a sharper, more balanced appearance.
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
