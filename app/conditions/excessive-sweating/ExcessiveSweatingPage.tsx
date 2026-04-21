'use client';

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

/* ── Causes ───────────────────────────────────────────────────── */
const CAUSES = [
  {
    title: 'Primary Hyperhidrosis',
    desc: 'The most common form — caused by overactive sweat glands with no underlying medical reason. It typically affects specific areas such as the underarms, palms, feet, and face, and often begins in adolescence.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
      </svg>
    ),
  },
  {
    title: 'Genetics',
    desc: 'Primary hyperhidrosis often runs in families. A genetic predisposition to overactive sweat gland activity means sufferers may have inherited a heightened sweating response that is disproportionate to temperature or exertion.',
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
    title: 'Anxiety & Stress',
    desc: 'The nervous system triggers sweat production in response to emotional stress, anxiety, or nervousness. For those with hyperhidrosis, this response is greatly amplified — creating a cycle where anxiety about sweating worsens the condition.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
      </svg>
    ),
  },
  {
    title: 'Hormonal Changes',
    desc: 'Hormonal fluctuations during puberty, pregnancy, and the menopause can trigger or worsen excessive sweating. Hot flushes and night sweats associated with the menopause are a particularly common form of secondary hyperhidrosis.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="12" cy="12" r="10"/>
        <polyline points="12 6 12 12 16 14"/>
      </svg>
    ),
  },
  {
    title: 'Underlying Medical Conditions',
    desc: 'Secondary hyperhidrosis can be caused by underlying conditions including thyroid disorders, diabetes, infections, or medications. This type tends to cause generalised sweating across the body rather than in localised zones.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="12" cy="12" r="10"/>
        <line x1="12" y1="8" x2="12" y2="12"/>
        <line x1="12" y1="16" x2="12.01" y2="16"/>
      </svg>
    ),
  },
  {
    title: 'Diet & Lifestyle Triggers',
    desc: 'Caffeine, spicy foods, alcohol, and obesity can all exacerbate sweating. A high body mass index increases heat retention and places greater demand on the body\'s cooling system, intensifying sweat production.',
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
];

/* ── Treatments ───────────────────────────────────────────────── */
const TREATMENTS = [
  {
    title: 'Wrinkle Relaxing Injections',
    desc:  'Botulinum toxin injections are the most effective treatment for hyperhidrosis. Injected into the skin of the underarms, palms, or feet, they block the nerve signals that stimulate sweat glands — dramatically reducing sweating for 6 to 12 months.',
    href:  '/treatments/wrinkle-relaxing-injections',
  },
  {
    title: 'Profhilo',
    desc:  'Bio-remodelling with Profhilo supports improved skin quality and hydration balance — complementing hyperhidrosis management by improving overall skin condition in affected areas.',
    href:  '/treatments/profhilo',
  },
  {
    title: 'Health Screening',
    desc:  'A comprehensive medical assessment to identify any underlying conditions contributing to excessive sweating, enabling a fully tailored and medically informed treatment approach.',
    href:  '/treatments/health-screening',
  },
  {
    title: 'Private GP Consultation',
    desc:  'A thorough GP consultation to assess your sweating, rule out secondary causes, and create a personalised management plan — combining medical and aesthetic treatment options where appropriate.',
    href:  '/treatments/private-gp',
  },
];

/* ── Risk factors ─────────────────────────────────────────────── */
const RISK_FACTORS = [
  'Those with a family history of hyperhidrosis or overactive sweat glands.',
  'Adolescents and young adults — primary hyperhidrosis often begins at puberty.',
  'Women experiencing the menopause, pregnancy, or significant hormonal changes.',
  'Individuals with high anxiety levels or stress-related conditions.',
  'Those with obesity, thyroid disorders, or diabetes.',
  'People whose careers or social situations involve high-pressure environments.',
];

/* ── Results timeline ─────────────────────────────────────────── */
const RESULTS_TIMELINE = [
  {
    phase: '3 to 5 Days',
    title: 'Initial Effect',
    desc:  'Sweating begins to reduce as the treatment starts to take effect.',
  },
  {
    phase: '2 Weeks',
    title: 'Full Results',
    desc:  'Significant reduction in sweating — often up to 80 to 90% improvement.',
  },
  {
    phase: '4 to 6 Months',
    title: 'Ongoing Relief',
    desc:  'Consistent dryness maintained throughout the treatment duration.',
  },
  {
    phase: '6 to 12 Months',
    title: 'Top-Up Treatment',
    desc:  'A simple repeat treatment sustains results as the effect gradually wears off.',
  },
];

/* ── Why choose ───────────────────────────────────────────────── */
const CLINIC_REASONS = [
  { n: '01', text: 'All-in-one clinic with medical and aesthetic services.' },
  { n: '02', text: 'Highly trained, compassionate, GMC-registered doctors.' },
  { n: '03', text: 'Personalised plans addressing both symptoms and underlying causes.' },
  { n: '04', text: 'Safe, proven treatments with high patient satisfaction rates.' },
  { n: '05', text: 'Strong reputation with excellent patient reviews.' },
  { n: '06', text: 'Comprehensive aftercare and follow-up support.' },
];

/* ── FAQs ─────────────────────────────────────────────────────── */
const FAQS = [
  {
    question: 'What is hyperhidrosis?',
    answer:
      'Hyperhidrosis is a medical condition characterised by excessive sweating that goes beyond what is needed to regulate body temperature. It can be primary (no underlying cause, affecting specific areas such as the underarms, palms, or feet) or secondary (caused by an underlying condition or medication, producing more generalised sweating). It affects approximately 3% of the UK population and can significantly impact quality of life.',
  },
  {
    question: 'How effective are botulinum toxin injections for hyperhidrosis?',
    answer:
      'Botulinum toxin injections are one of the most clinically proven treatments for hyperhidrosis, particularly for underarm sweating. Studies show up to 80 to 90% reduction in sweating. Results typically last 6 to 12 months, after which a simple top-up treatment maintains the effect. Most patients notice a significant difference within 5 to 14 days of treatment.',
  },
  {
    question: 'Is the treatment painful?',
    answer:
      'The injections involve a series of small needle insertions into the skin. Most patients describe the sensation as mild and well-tolerated. Topical anaesthetic cream can be applied beforehand to maximise comfort. The treatment is quick, typically taking 20 to 30 minutes, with no downtime required.',
  },
  {
    question: 'How long do results last?',
    answer:
      'Results from botulinum toxin typically last between 6 and 12 months, depending on the individual and the area treated. Many patients find that with regular treatments the intervals between top-ups can extend over time. Your doctor will advise on the optimal treatment schedule for your situation.',
  },
  {
    question: 'Are there any side effects?',
    answer:
      'Botulinum toxin for hyperhidrosis is very safe when performed by an experienced clinician. Temporary redness, mild bruising, or sensitivity at injection sites can occur and typically resolves within a few days. Compensatory sweating (increased sweating in other areas) is rare but can occasionally occur. A thorough consultation will ensure the treatment is appropriate for you.',
  },
];

/* ── Related ──────────────────────────────────────────────────── */
const RELATED_TREATMENTS = [
  {
    title: 'Wrinkle Relaxing Injections',
    desc:  'Block sweat gland nerve signals and dramatically reduce excessive sweating.',
    href:  '/treatments/wrinkle-relaxing-injections',
    tag:   'Medical Aesthetics',
  },
  {
    title: 'Private GP Consultation',
    desc:  'Comprehensive medical assessment and personalised hyperhidrosis management plan.',
    href:  '/treatments/private-gp',
    tag:   'Medical',
  },
  {
    title: 'Health Screening',
    desc:  'Identify any underlying conditions contributing to excessive sweating.',
    href:  '/treatments/health-screening',
    tag:   'Medical',
  },
];

const RELATED_CONDITIONS = [
  {
    title: 'Rosacea / Facial Redness',
    desc:  'Calm facial flushing and persistent redness with targeted medical treatments.',
    href:  '/conditions/rosacea',
    tag:   'Face',
  },
  {
    title: 'Pigmentation',
    desc:  'Treat dark spots and uneven skin tone with clinically proven treatments.',
    href:  '/conditions/pigmentation',
    tag:   'Skin',
  },
];

/* ════════════════════════════════════════════════════════════════
   PAGE
════════════════════════════════════════════════════════════════ */
export default function ExcessiveSweatingPage() {
  return (
    <>
      {/* ════════════════════════════════════════
          1. HERO
      ════════════════════════════════════════ */}
      <section
        className={styles.hero}
        aria-label="Excessive sweating treatment, hero"
        data-section-theme="dark"
      >
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
            <div className={styles.heroLeft}>
              <motion.span className={styles.heroCategory} variants={fadeUp}>
                Conditions · Body
              </motion.span>

              <motion.h1 className={styles.heroTitle} variants={fadeUp}>
                Excessive Sweating
              </motion.h1>

              <motion.p className={styles.heroDesc} variants={fadeUp}>
                Regain confidence with effective, clinically proven treatments for
                hyperhidrosis — providing lasting relief from excessive, uncontrollable sweating.
              </motion.p>

              <motion.div className={styles.heroCtas} variants={fadeUp}>
                <BookConsultationButton className={styles.heroCtaPrimary}>
                  Book A Consultation
                </BookConsultationButton>
              </motion.div>

              <motion.div variants={fadeUp}>
                <TrustBadges theme="dark" />
              </motion.div>

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

            <motion.div className={styles.heroImageWrap} variants={fadeUp}>
              <Image
                src="/images/Excessive Sweating.png"
                alt="Excessive sweating treatment at The One Clinic Leicester"
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
          2. WHAT IS EXCESSIVE SWEATING?
      ════════════════════════════════════════ */}
      <Section variant="light" data-section-theme="light">
        <Container>
          <motion.div
            className={styles.overviewGrid}
            variants={stagger(0.12)}
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
          >
            <motion.div className={styles.overviewLabel} variants={fadeUp}>
              <p className={styles.eyebrowDark}>About This Condition</p>
            </motion.div>

            <div className={styles.overviewBody}>
              <motion.h2 className={styles.overviewHeading} variants={fadeUp}>
                What Is Excessive Sweating?
              </motion.h2>
              <motion.p className={styles.overviewPara} variants={fadeUp}>
                Excessive sweating — medically known as hyperhidrosis — is a condition
                where the body produces far more sweat than is needed to regulate
                temperature. It can affect specific areas such as the underarms, palms,
                feet, and face, or occur across the body, and is often unrelated to heat
                or physical activity.
              </motion.p>
              <motion.p className={styles.overviewPara} variants={fadeUp}>
                Hyperhidrosis affects millions of people and can have a significant impact
                on confidence, social interactions, and quality of life. Effective medical
                treatments are available that can dramatically reduce sweating and restore
                day-to-day comfort and confidence.
              </motion.p>
            </div>
          </motion.div>
        </Container>
      </Section>

      {/* ════════════════════════════════════════
          3. TYPES
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
              How It Presents
            </motion.p>
            <motion.h2 className={styles.headingLight} variants={fadeUp}>
              Types of Hyperhidrosis
            </motion.h2>
          </motion.div>

          <motion.div
            className={styles.typesCardsRow}
            variants={stagger(0.1)}
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
          >
            {[
              {
                num: '01',
                title: 'Focal (Primary)',
                desc: 'Affects specific areas — typically the underarms, palms, feet, or face. No underlying medical cause. Often hereditary and begins in adolescence or early adulthood.',
              },
              {
                num: '02',
                title: 'Generalised (Secondary)',
                desc: 'Affects the whole body and is usually caused by an underlying medical condition, hormonal change, or medication. Requires medical investigation and management.',
              },
              {
                num: '03',
                title: 'Craniofacial',
                desc: 'Excessive sweating affecting the face, head, and scalp. Can be particularly distressing and is often triggered by eating, stress, or warmth.',
              },
            ].map((type) => (
              <motion.div key={type.num} className={styles.typeCard} variants={fadeUp}>
                <span className={styles.typeNum} aria-hidden="true">{type.num}</span>
                <div className={styles.typeCardBody}>
                  <h3 className={styles.typeTitle}>{type.title}</h3>
                  <p className={styles.typeDesc}>{type.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </Container>
      </Section>

      {/* ════════════════════════════════════════
          4. CAUSES
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
              What Causes Excessive Sweating?
            </motion.h2>
            <motion.p className={styles.sectionSubtext} variants={fadeUp}>
              Hyperhidrosis can result from overactive sweat glands, genetic factors,
              hormonal changes, or an underlying medical condition.
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
          5. RISK FACTORS
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
            <motion.div className={styles.riskLeft} variants={stagger(0.1)}>
              <motion.p className={styles.eyebrowDark} variants={fadeUp}>
                Risk Factors
              </motion.p>
              <motion.h2 className={styles.riskHeading} variants={fadeUp}>
                Who Is More Likely to Develop Hyperhidrosis?
              </motion.h2>
              <motion.p className={styles.riskIntro} variants={fadeUp}>
                Certain genetic, hormonal, and lifestyle factors increase susceptibility
                to excessive sweating.
              </motion.p>
            </motion.div>

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
          </motion.div>
        </Container>
      </Section>

      {/* ════════════════════════════════════════
          6. TREATMENTS
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
              Your Options
            </motion.p>
            <motion.h2 className={styles.headingLight} variants={fadeUp}>
              Treatments for Excessive Sweating
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
          7. RESULTS & EXPECTATIONS
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
              What To Expect
            </motion.p>
            <motion.h2 className={styles.headingDark} variants={fadeUp}>
              Results &amp; Expectations
            </motion.h2>
            <motion.p className={styles.sectionSubtext} variants={fadeUp}>
              After treatment, here is what you can typically expect at each stage.
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
          8. MEET THE EXPERTS
      ════════════════════════════════════════ */}
      <MeetTheExperts />

      {/* ════════════════════════════════════════
          9. GOOGLE REVIEWS
      ════════════════════════════════════════ */}
      <Testimonials />

      {/* ════════════════════════════════════════
          10. WHY CHOOSE THE ONE CLINIC
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
            <motion.p className={styles.eyebrowLight} variants={fadeUp}>Why Us</motion.p>
            <motion.h2 className={styles.headingLight} variants={fadeUp}>
              Why Choose The One Clinic For Hyperhidrosis Treatment
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
            <Accordion items={FAQS} theme="dark" />
          </motion.div>
        </Container>
      </Section>

      {/* ════════════════════════════════════════
          12. CTA BAND
      ════════════════════════════════════════ */}
      <section
        className={styles.ctaBand}
        data-section-theme="dark"
        aria-label="Excessive sweating consultation CTA"
      >
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
              Ready to Feel{' '}
              <span className={styles.ctaAccent}>Confident Again?</span>
            </motion.h2>
            <motion.p className={styles.ctaSubtext} variants={fadeUp}>
              Speak to our specialists today to find the most effective treatment
              for your hyperhidrosis and reclaim your confidence and comfort.
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
          13. COST BAND
      ════════════════════════════════════════ */}
      <section
        className={styles.costBand}
        data-section-theme="dark"
        aria-label="Excessive sweating treatment cost"
      >
        <Container>
          <motion.div
            className={styles.costBandInner}
            variants={stagger(0.12)}
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
          >
            <motion.p className={styles.costBandEyebrow} variants={fadeUp}>
              Pricing
            </motion.p>
            <motion.h2 className={styles.costBandHeading} variants={fadeUp}>
              Hyperhidrosis Treatment Cost
            </motion.h2>
            <motion.p className={styles.costBandNote} variants={fadeUp}>
              Contact us to enquire
            </motion.p>
            <motion.div variants={fadeUp}>
              <BookConsultationButton className={styles.ctaBtnPrimary}>
                Book A Consultation
              </BookConsultationButton>
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
