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
    title: 'Genetics',
    desc: 'The projection and size of the chin and jaw are largely determined by bone structure, which is inherited. A naturally recessed or underdeveloped chin is one of the most common concerns.',
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
    desc: 'Bone resorption and collagen loss over time cause the chin and jaw to lose definition, becoming less prominent and contributing to a softer, less structured lower face.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="12" cy="12" r="10"/>
        <polyline points="12 6 12 12 16 14"/>
      </svg>
    ),
  },
  {
    title: 'Volume Loss',
    desc: 'Fat pad depletion around the chin and jaw creates a less defined profile, reducing the sharp angles that contribute to a strong, balanced facial structure.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"/>
      </svg>
    ),
  },
  {
    title: 'Facial Asymmetry',
    desc: 'Natural imbalances in bone or soft tissue structure can cause one side of the chin or jaw to appear weaker or less projected than the other.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
      </svg>
    ),
  },
  {
    title: 'Weight Changes',
    desc: 'Significant weight gain or loss can alter the appearance of the lower face and jaw, making the chin appear less defined or set back relative to surrounding features.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
        <circle cx="9" cy="7" r="4"/>
        <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
        <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
      </svg>
    ),
  },
  {
    title: 'Skin Laxity',
    desc: 'Loss of skin elasticity around the chin and jaw blurs definition, causing the lower face to appear softer and less structured with age.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M12 2v20M2 12h20"/>
        <path d="M4.93 4.93l14.14 14.14"/>
      </svg>
    ),
  },
];

/* ── Treatments ───────────────────────────────────────────────── */
const TREATMENTS = [
  {
    title: 'Dermal Fillers',
    desc:  'Hyaluronic acid filler is precisely placed along the chin and jawline to add projection, improve symmetry, and create a sharper, more defined lower face profile, without surgery.',
    href:  '/treatments/dermal-fillers',
  },
  {
    title: 'Skin Tightening',
    desc:  'Energy-based treatments stimulate collagen production in the chin and jaw area, firming lax skin and improving definition for a more structured appearance.',
    href:  '/treatments/skin-tightening',
  },
  {
    title: 'Profhilo',
    desc:  'Bioremodels the skin around the chin and jaw, improving elasticity and firmness to support and enhance the definition of the lower face.',
    href:  '/treatments/profhilo',
  },
  {
    title: 'Polynucleotides',
    desc:  'Stimulates collagen and elastin production to rejuvenate and tighten the skin around the jawline and chin, improving overall tone and structural support.',
    href:  '/treatments/polynucleotides',
  },
];

/* ── Risk factors ─────────────────────────────────────────────── */
const RISK_FACTORS = [
  'People with a family history of recessed or undefined chin.',
  'Adults over the age of 35.',
  'Individuals who have experienced significant weight fluctuations.',
  'Those with naturally asymmetric facial features.',
  'People with thin or fair skin prone to early laxity.',
  'Individuals self-conscious about their facial profile or proportions.',
];

/* ── Results timeline ─────────────────────────────────────────── */
const RESULTS_TIMELINE = [
  {
    phase: 'Immediate',
    title: 'Defined Chin',
    desc:  'Visible improvement in chin projection and jawline definition straight after treatment.',
  },
  {
    phase: '1 to 2 Weeks',
    title: 'Settled Shape',
    desc:  'Filler integrates naturally for a smooth, balanced, and structured result.',
  },
  {
    phase: '4 to 8 Weeks',
    title: 'Skin Renewal',
    desc:  'Collagen-stimulating treatments show progressive improvement in firmness.',
  },
  {
    phase: 'Long-term',
    title: 'Maintained Results',
    desc:  'Regular top-up appointments sustain definition and contour over time.',
  },
];

/* ── Why choose ───────────────────────────────────────────────── */
const CLINIC_REASONS = [
  { n: '01', text: 'All-in-one clinic with medical and aesthetic services.' },
  { n: '02', text: 'Highly trained, compassionate, GMC-registered doctors.' },
  { n: '03', text: 'Customised treatment plans based on your individual goals.' },
  { n: '04', text: 'State-of-the-art facilities and modern equipment.' },
  { n: '05', text: 'Strong reputation with excellent patient reviews.' },
  { n: '06', text: 'Comprehensive aftercare and follow-up support.' },
];

/* ── FAQs ─────────────────────────────────────────────────────── */
const FAQS = [
  {
    question: 'What causes a weak chin or jawline?',
    answer:
      'A weak chin or jawline is most often caused by genetics, the underlying bone structure determines how projected and defined the lower face appears. Ageing also plays a role, as bone resorption and collagen loss reduce definition over time. Volume loss, weight changes, skin laxity, and facial asymmetry can all contribute to a softer-looking lower face.',
  },
  {
    question: 'Can a weak chin be treated without surgery?',
    answer:
      'Yes. Chin and jaw filler is the most effective non-surgical option, adding projection and definition to the lower face with immediate results. Skin-tightening treatments, Profhilo, and Polynucleotides can also improve the firmness and structure of the skin in this area. Our doctors will recommend the best approach following a full facial assessment.',
  },
  {
    question: 'How long do results last?',
    answer:
      'Chin and jaw filler typically lasts 12 to 18 months, depending on the product used and individual metabolism. Skin-tightening and collagen-stimulating treatments can provide improvement for 12 to 24 months with appropriate maintenance. Regular top-up appointments help to sustain your results.',
  },
  {
    question: 'Will the results look natural?',
    answer:
      'Yes. Our approach is always to enhance your existing facial structure rather than create an unnatural appearance. Our GMC-registered doctors assess your proportions, profile, and aesthetic goals before treatment to ensure results are balanced, harmonious, and in keeping with your natural features.',
  },
  {
    question: 'What is the recovery time?',
    answer:
      'Non-surgical chin and jaw treatments typically involve minimal downtime. After filler, mild swelling or bruising may occur for a few days. Skin-tightening treatments may cause temporary redness or sensitivity lasting 24 to 48 hours. Most patients can return to normal activities on the same day.',
  },
];

/* ── Related ──────────────────────────────────────────────────── */
const RELATED_TREATMENTS = [
  {
    title: 'Dermal Fillers',
    desc:  'Add projection and definition to the chin and jawline with precision-placed hyaluronic acid filler.',
    href:  '/treatments/dermal-fillers',
    tag:   'Medical Aesthetics',
  },
  {
    title: 'Skin Tightening',
    desc:  'Firm and define the jaw and chin area by stimulating collagen deep within the skin.',
    href:  '/treatments/skin-tightening',
    tag:   'Medical Aesthetics',
  },
  {
    title: 'Profhilo',
    desc:  'Bioremodel and firm the skin around the lower face to support and enhance jawline definition.',
    href:  '/treatments/profhilo',
    tag:   'Medical Aesthetics',
  },
];

const RELATED_CONDITIONS = [
  {
    title: 'Jowls / Sagging Skin',
    desc:  'Lift and redefine sagging skin along the jawline and lower face.',
    href:  '/conditions/jowls',
    tag:   'Face',
  },
  {
    title: 'Nasolabial Folds',
    desc:  'Smooth and soften the smile lines running from the nose to the corners of the mouth.',
    href:  '/conditions/nasolabial-folds',
    tag:   'Face',
  },
];

/* ════════════════════════════════════════════════════════════════
   PAGE
════════════════════════════════════════════════════════════════ */
export default function WeakChinPage() {
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
          2. WHAT IS A WEAK CHIN / JAWLINE?
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
                What Is a Weak Chin &amp; Jawline?
              </motion.h2>
              <motion.p className={styles.overviewPara} variants={fadeUp}>
                A weak chin or jawline refers to a lack of projection, definition, or
                structural prominence in the lower face. This can make the chin appear
                recessed, the jaw soft or undefined, and the overall facial profile
                less balanced. It is one of the most common aesthetic concerns in
                both men and women.
              </motion.p>
              <motion.p className={styles.overviewPara} variants={fadeUp}>
                Whether caused by genetics, ageing, or volume loss, the appearance of
                a weak chin and jaw can be significantly improved without surgery.
                Non-surgical chin and jawline treatments offer immediate, natural-looking
                results with minimal downtime.
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
              Types of Chin &amp; Jawline Concerns
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
                title: 'Recessed Chin',
                desc: 'The chin sits behind the lip line in profile view, giving the face an unbalanced, less defined lower third.',
              },
              {
                num: '02',
                title: 'Undefined Jawline',
                desc: 'A soft or rounded jaw with insufficient angularity, reducing the structural definition of the lower face.',
              },
              {
                num: '03',
                title: 'Chin Asymmetry',
                desc: 'One side of the chin or jaw appears less projected or prominent, creating visible imbalance in the facial structure.',
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
                Who Is More Likely to Have a Weak Chin or Jawline?
              </motion.h2>
              <motion.p className={styles.riskIntro} variants={fadeUp}>
                Certain factors increase the likelihood of having or developing poor lower facial definition.
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
              Treatments for Weak Chin &amp; Jawline
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
              After chin and jawline treatment, here is what you can typically expect.
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
        aria-label="Weak chin consultation CTA"
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
              Ready to Define{' '}
              <span className={styles.ctaAccent}>Your Profile?</span>
            </motion.h2>
            <motion.p className={styles.ctaSubtext} variants={fadeUp}>
              Speak to our specialists today to find the best treatment for your
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
          13. COST BAND
      ════════════════════════════════════════ */}
      <section
        className={styles.costBand}
        data-section-theme="dark"
        aria-label="Weak chin treatment cost"
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
              Chin &amp; Jawline Treatment Cost
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
