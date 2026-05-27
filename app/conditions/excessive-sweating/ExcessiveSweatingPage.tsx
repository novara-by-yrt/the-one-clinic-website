'use client';

import { useState }              from 'react';
import Image                     from 'next/image';
import Link                      from 'next/link';
import { motion }                from 'framer-motion';
import Section                   from '@/components/ui/Section';
import Container                 from '@/components/ui/Container';
import Accordion                 from '@/components/ui/Accordion';
import BookConsultationButton    from '@/components/ui/BookConsultationButton';
import TrustBadges               from '@/components/ui/TrustBadges';
import Breadcrumb                from '@/components/ui/Breadcrumb';
import LeadForm                  from '@/components/sections/LeadForm';
import MeetTheExperts            from '@/components/sections/MeetTheExperts';
import Testimonials              from '@/components/sections/Testimonials';
import { fadeUp, stagger, VIEWPORT } from '@/lib/motion';
import styles from './page.module.css';

/* ── Types of hyperhidrosis ───────────────────────────────────── */
const SWEATING_TYPES = [
  {
    num: '01',
    title: 'Primary Hyperhidrosis',
    desc: 'No underlying medical cause; overactive sweat glands produce focal sweating of the hands, feet, underarms, and face , often beginning in adolescence.',
  },
  {
    num: '02',
    title: 'Secondary Hyperhidrosis',
    desc: 'Caused by an underlying medical condition or medication. Unlike primary hyperhidrosis, sweating tends to be generalised across the body and may appear suddenly.',
  },
  {
    num: '03',
    title: 'Gustatory Sweating',
    desc: 'Sweating triggered by eating, particularly spicy or hot foods. It commonly affects the face and scalp and may indicate nerve damage or an underlying condition.',
  },
];

/* ── Causes ───────────────────────────────────────────────────── */
const CAUSES = [
  {
    title: 'Overactive Sweat Glands',
    desc: 'In primary hyperhidrosis, the sweat glands are stimulated by the nervous system far beyond what is required to regulate body temperature, producing excessive, uncontrollable sweating.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"/>
      </svg>
    ),
  },
  {
    title: 'Genetics',
    desc: 'Primary hyperhidrosis often runs in families. A genetic predisposition to overactive sweat gland activity means sufferers may have inherited a heightened sweating response disproportionate to temperature or exertion.',
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
    title: 'Hormonal Changes',
    desc: 'Hormonal fluctuations during puberty, pregnancy, and the menopause can trigger or worsen excessive sweating. Hot flushes and night sweats linked to the menopause are a particularly common presentation.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="12" cy="12" r="10"/>
        <polyline points="12 6 12 12 16 14"/>
      </svg>
    ),
  },
  {
    title: 'Anxiety & Stress',
    desc: 'The nervous system triggers sweat production in response to emotional stress or anxiety. For those with hyperhidrosis, this response is greatly amplified, creating a cycle where anxiety about sweating worsens the condition.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
      </svg>
    ),
  },
  {
    title: 'Medications',
    desc: 'Certain medications, including antidepressants, opioids, and some blood pressure drugs, list excessive sweating as a side effect. Reviewing and adjusting medication may help resolve secondary hyperhidrosis.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
        <line x1="3" y1="12" x2="21" y2="12"/>
        <line x1="12" y1="3" x2="12" y2="21"/>
      </svg>
    ),
  },
  {
    title: 'Underlying Medical Conditions',
    desc: 'Secondary hyperhidrosis can be caused by thyroid disorders, diabetes, infections, or nerve damage. This type tends to cause generalised sweating across the body rather than localised zones.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="12" cy="12" r="10"/>
        <line x1="12" y1="8" x2="12" y2="12"/>
        <line x1="12" y1="16" x2="12.01" y2="16"/>
      </svg>
    ),
  },
];

/* ── Risk factors ─────────────────────────────────────────────── */
const RISK_FACTORS = [
  'Those with a family history of hyperhidrosis or overactive sweat glands.',
  'People with anxiety disorders or high levels of chronic stress.',
  'Individuals going through hormonal changes, including puberty, pregnancy, or menopause.',
  'Those on certain medications known to cause excessive sweating as a side effect.',
  'People with obesity, which increases heat retention and demand on the body\'s cooling system.',
  'Those with an overactive nervous system or underlying conditions such as thyroid disorders.',
];

/* ── Diagnose steps ───────────────────────────────────────────── */
const DIAGNOSE_STEPS = [
  {
    num: '01',
    title: 'Starch-Iodine Test',
    text: 'Iodine solution is applied to the skin, followed by starch powder. Where sweating is excessive, the starch turns dark blue, clearly mapping the affected areas.',
  },
  {
    num: '02',
    title: 'Sweat Rate Measurement',
    text: 'The amount of sweat produced in a given area is measured to assess the severity of hyperhidrosis and determine the most appropriate treatment approach.',
  },
  {
    num: '03',
    title: 'Medical History & Trigger Review',
    text: 'A thorough review of your medical history, medications, and lifestyle triggers helps distinguish primary from secondary hyperhidrosis and guides a tailored treatment plan.',
  },
];

/* ── Treatments ───────────────────────────────────────────────── */
const TREATMENTS = [
  {
    title: 'Wrinkle Relaxing Injections',
    desc: 'Botulinum toxin injections block the nerve signals that stimulate sweat glands, dramatically reducing sweating in the underarms, palms, or feet for 6 to 12 months.',
    href: '/treatments/wrinkle-relaxing-injections',
    image: '/images/BA1.jpg',
  },
  {
    title: 'Morpheus8',
    desc: 'Radiofrequency microneedling that targets sweat glands directly, offering a longer-term reduction in sweating with minimal downtime and lasting skin tightening benefits.',
    href: '/treatments/morpheus8',
    image: '/images/BA2.jpg',
  },
  {
    title: 'Laser Treatment',
    desc: 'Laser energy is precisely directed to reduce sweat gland activity, providing a non-surgical option for lasting reduction in excessive sweating.',
    href: '/treatments/deep-laser-resurfacing-leicester',
    image: '/images/BA3.jpg',
  },
  {
    title: 'Medical Management',
    desc: 'A Private GP consultation provides a comprehensive assessment, identifies any underlying cause, and creates a personalised hyperhidrosis management plan combining medical and aesthetic options.',
    href: '/treatments/private-gp',
    image: '/images/BA4.jpg',
  },
];

/* ── When to call a doctor ────────────────────────────────────── */
const WHEN_TO_CALL = [
  'Sweating that is disrupting your daily life, work, or relationships.',
  'Night sweats that wake you or interfere with sleep regularly.',
  'A sudden onset of excessive sweating with no clear trigger.',
  'Sweating accompanied by chest pain, fever, shortness of breath, or unexplained weight loss.',
];

/* ── Results timeline ─────────────────────────────────────────── */
const RESULTS_TIMELINE = [
  {
    phase: 'Treatment Onset',
    title: 'First Effects',
    desc: 'Initial reduction in sweating begins within 3 to 5 days as the treatment starts to take effect.',
  },
  {
    phase: 'Duration of Results',
    title: 'Sustained Relief',
    desc: 'Most patients enjoy 6 to 12 months of significantly reduced sweating following a single treatment session.',
  },
  {
    phase: 'Long-term Management',
    title: 'Ongoing Control',
    desc: 'Regular top-up treatments and a personalised management plan ensure lasting comfort and confidence.',
  },
];

/* ── Related treatments ───────────────────────────────────────── */
const RELATED_TREATMENTS = [
  {
    title: 'Wrinkle Relaxing Injections',
    desc: 'Block sweat gland nerve signals and dramatically reduce excessive sweating for months at a time.',
    href: '/treatments/wrinkle-relaxing-injections',
    tag: 'Medical Aesthetics',
  },
  {
    title: 'Morpheus8',
    desc: 'Radiofrequency microneedling targeting sweat glands for longer-term reduction in sweating.',
    href: '/treatments/morpheus8',
    tag: 'Medical Aesthetics',
  },
  {
    title: 'Laser Resurfacing',
    desc: 'Precisely directed laser energy to reduce sweat gland activity with lasting results.',
    href: '/treatments/deep-laser-resurfacing-leicester',
    tag: 'Medical Aesthetics',
  },
  {
    title: 'Private GP',
    desc: 'Comprehensive medical assessment and a fully personalised hyperhidrosis management plan.',
    href: '/treatments/private-gp',
    tag: 'Medical',
  },
];

/* ── Related conditions ───────────────────────────────────────── */
const RELATED_CONDITIONS = [
  {
    title: 'Rosacea',
    desc: 'Calm facial flushing and persistent redness with targeted, clinically proven treatments.',
    href: '/conditions/rosacea',
    tag: 'Face',
  },
  {
    title: 'Pigmentation',
    desc: 'Treat dark spots and uneven skin tone with our range of clinically proven treatments.',
    href: '/conditions/pigmentation',
    tag: 'Skin',
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
    question: 'What is hyperhidrosis and how is it diagnosed?',
    answer:
      'Hyperhidrosis is a medical condition characterised by excessive sweating that goes beyond what is needed to regulate body temperature. It can be primary (no underlying cause, affecting specific areas such as underarms, palms, or feet) or secondary (caused by an underlying condition or medication). Diagnosis involves a physical assessment, a medical history review, and sometimes a starch-iodine test to map the affected areas.',
  },
  {
    question: 'How effective are wrinkle relaxing injections for excessive sweating?',
    answer:
      'Botulinum toxin injections are one of the most clinically proven treatments for hyperhidrosis, particularly for underarm sweating. Studies show up to 80 to 90% reduction in sweating. Results typically last 6 to 12 months, after which a simple top-up treatment maintains the effect. Most patients notice a significant difference within 5 to 14 days of treatment.',
  },
  {
    question: 'Is the treatment for hyperhidrosis painful?',
    answer:
      'The injections involve a series of small needle insertions into the skin. Most patients describe the sensation as mild and well-tolerated. Topical anaesthetic cream can be applied beforehand to maximise comfort. The treatment is quick, typically taking 20 to 30 minutes, with no downtime required.',
  },
  {
    question: 'How long do results from hyperhidrosis treatment last?',
    answer:
      'Results from botulinum toxin typically last between 6 and 12 months, depending on the individual and the area treated. Many patients find that with regular treatments the intervals between top-ups can extend over time. Your doctor will advise on the optimal treatment schedule for your situation.',
  },
  {
    question: 'Are there any side effects from hyperhidrosis treatments?',
    answer:
      'Botulinum toxin for hyperhidrosis is very safe when performed by an experienced clinician. Temporary redness, mild bruising, or sensitivity at injection sites can occur and typically resolves within a few days. Compensatory sweating in other areas is rare but can occasionally occur. A thorough consultation will ensure the treatment is appropriate and safe for you.',
  },
  {
    question: 'Can lifestyle changes help reduce excessive sweating?',
    answer:
      'Lifestyle adjustments such as wearing breathable fabrics, avoiding spicy foods, alcohol, and caffeine, and managing stress can help reduce sweating in milder cases. However, for those with clinical hyperhidrosis, lifestyle changes alone are rarely sufficient. Professional medical treatments provide far more significant, reliable, and lasting relief.',
  },
];

/* ════════════════════════════════════════════════════════════════
   PAGE
════════════════════════════════════════════════════════════════ */
export default function ExcessiveSweatingPage() {
  const [showAllFaqs, setShowAllFaqs] = useState(false);

  const visibleFaqs = showAllFaqs ? FAQS : FAQS.slice(0, 4);

  return (
    <>
      {/* ════════════════════════════════════════
          1. HERO
      ════════════════════════════════════════ */}
      <section
        className={styles.hero}
        aria-label="Excessive Sweating Treatment Leicester, hero"
        data-section-theme="dark"
      >
        {/* Breadcrumb, pinned below fixed header */}
        <div className={styles.heroBreadcrumb}>
          <Container>
            <Breadcrumb
              theme="dark"
              items={[
                { label: 'Conditions', href: '/conditions' },
                { label: 'Excessive Sweating' },
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
                Conditions · Body
              </motion.span>

              <motion.h1 className={styles.heroTitle} variants={fadeUp}>
                Excessive Sweating Treatment Leicester
              </motion.h1>

              <motion.p className={styles.heroDesc} variants={fadeUp}>
                Restore your confidence with effective, clinically proven hyperhidrosis
                treatments that provide lasting relief from excessive, uncontrollable sweating.
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
                src="/images/Excessive Sweating.png"
                alt="Excessive sweating (hyperhidrosis) treatment at The One Clinic Leicester"
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
          2. OVERVIEW & TYPES (Combined)
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
                  What is Excessive Sweating?
                </motion.h2>
                <motion.p
                  className={styles.combinedDesc}
                  initial="hidden"
                  whileInView="show"
                  variants={fadeUp}
                  viewport={VIEWPORT}
                >
                  Excessive sweating, medically known as hyperhidrosis, is a condition
                  where the body produces far more sweat than is needed to regulate
                  temperature. It can affect specific areas , such as the underarms,
                  palms, feet, and face , or occur across the whole body, and is often
                  completely unrelated to heat or physical activity. Effective treatments
                  are available to dramatically reduce sweating and restore confidence.
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
                <h3 className={styles.typesRightHeading}>Types of Hyperhidrosis</h3>
              </motion.div>

              <motion.div
                className={styles.combinedCards}
                variants={stagger(0.1)}
                initial="hidden"
                whileInView="show"
                viewport={VIEWPORT}
              >
                {SWEATING_TYPES.map((type) => (
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
              Excessive Sweating Causes
            </motion.h2>
            <motion.p className={styles.sectionSubtext} variants={fadeUp}>
              Understanding what drives hyperhidrosis helps identify the right
              treatment approach for long-lasting relief and restored confidence.
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
          4. WHO IS MORE LIKELY?
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
                src="/images/Excessive Sweating.png"
                alt="Person affected by excessive sweating (hyperhidrosis)"
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
                  Who Is More Likely to Develop Excessive Sweating?
                </motion.h2>
                <motion.p className={styles.riskIntro} variants={fadeUp}>
                  The following individuals may be more at risk of developing hyperhidrosis.
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
              How Do We Diagnose Excessive Sweating?
            </motion.h2>
            <motion.p className={styles.diagnoseIntro} variants={fadeUp}>
              Our specialists use the following assessments:
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
                <p className={styles.diagnoseText}>{step.title}</p>
                <p className={styles.diagnoseText}>{step.text}</p>
              </motion.div>
            ))}
          </motion.div>
        </Container>
      </Section>

      {/* ════════════════════════════════════════
          6. TREATMENTS FOR EXCESSIVE SWEATING
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
              Treatments For Excessive Sweating
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
                Excessive sweating is often manageable, but seek medical advice if
                you notice:
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
              After treatment for excessive sweating, here is what you can expect
              at each stage of your journey.
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
          GOOGLE REVIEWS
      ════════════════════════════════════════ */}
      <Testimonials />

      {/* ════════════════════════════════════════
          10. WHY CHOOSE THE ONE CLINIC
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
              Why Choose The One Clinic For Excessive Sweating Treatment
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
          11. FAQ
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
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
                style={{ transform: showAllFaqs ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }}
              >
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </button>
          </div>
        </Container>
      </Section>

      {/* ════════════════════════════════════════
          12. CONSULTATION CTA
      ════════════════════════════════════════ */}
      <section
        className={styles.ctaBand}
        data-section-theme="dark"
        aria-label="Excessive sweating consultation CTA"
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
              It&apos;s Time to Reclaim Your{' '}
              <span className={styles.ctaAccent}>Confidence!</span>
            </motion.h2>
            <motion.p className={styles.ctaSubtext} variants={fadeUp}>
              Talk to our specialists today to find the best hyperhidrosis treatment
              for you and enjoy lasting relief from excessive sweating.
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
          13. LEAD FORM
      ════════════════════════════════════════ */}
      <div id="contact">
        <LeadForm />
      </div>

      {/* ════════════════════════════════════════
          14. RELATED TREATMENTS (dark)
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
            <motion.p className={styles.eyebrowLight} variants={fadeUp}>Explore</motion.p>
            <motion.h2 className={styles.headingLight} variants={fadeUp}>
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
          15. RELATED CONDITIONS
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
