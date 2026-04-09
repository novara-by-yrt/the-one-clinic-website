'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import Section            from '@/components/ui/Section';
import Container          from '@/components/ui/Container';
import Accordion          from '@/components/ui/Accordion';
import BookConsultationButton from '@/components/ui/BookConsultationButton';
import TrustBadges        from '@/components/ui/TrustBadges';
import Breadcrumb         from '@/components/ui/Breadcrumb';
import LeadForm           from '@/components/sections/LeadForm';
import MeetTheExperts     from '@/components/sections/MeetTheExperts';
import Testimonials       from '@/components/sections/Testimonials';
import FinalCTA           from '@/components/sections/FinalCTA';
import { fadeUp, stagger, VIEWPORT } from '@/lib/motion';
import styles from './page.module.css';

/* ── Static data ──────────────────────────────────────────────── */
const AT_A_GLANCE = [
  {
    label: 'Treatment Duration',
    value: '30–45 minutes',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="12" cy="12" r="10"/>
        <polyline points="12 6 12 12 16 14"/>
      </svg>
    ),
  },
  {
    label: 'Treatment Frequency',
    value: 'Every 1–2 years',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <polyline points="1 4 1 10 7 10"/>
        <path d="M3.51 15a9 9 0 1 0 .49-3.1"/>
      </svg>
    ),
  },
  {
    label: 'Downtime',
    value: '1–3 days',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"/>
        <path d="M9 12l2 2 4-4"/>
      </svg>
    ),
  },
  {
    label: 'Results Longevity',
    value: '2–3 years or more',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/>
        <polyline points="17 6 23 6 23 12"/>
      </svg>
    ),
  },
  {
    label: 'Treatment Cost',
    value: 'From £1,500',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <line x1="12" y1="1" x2="12" y2="23"/>
        <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
      </svg>
    ),
  },
  {
    label: 'Appointment Type',
    value: 'In-clinic',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M3 21h18"/>
        <path d="M5 21V7l8-4v4"/>
        <path d="M19 21V11l-6-4"/>
        <path d="M9 21v-4h6v4"/>
      </svg>
    ),
  },
];

const JOURNEY_STEPS = [
  {
    n: '01',
    title: 'Initial Consultation & Assessment',
    desc: 'A thorough review of your skin laxity, fat deposits, and target areas, allowing your doctor to create a personalised Endolift treatment plan.',
  },
  {
    n: '02',
    title: 'Treatment Preparation',
    desc: 'The treatment area is cleansed and a local anaesthetic is applied to ensure your comfort. Tiny entry points are mapped on the skin.',
  },
  {
    n: '03',
    title: 'Laser Fibre Treatment',
    desc: 'A fine optical fibre is gently guided under the skin. Laser energy precisely targets localised fat and stimulates collagen contraction to lift and contour.',
  },
  {
    n: '04',
    title: 'Recovery & Ongoing Results',
    desc: 'Minimal downtime of 1–2 days. Skin improvements develop progressively over 3–6 months as new collagen matures and remodels.',
  },
];

const TECH_CARDS = [
  {
    eyebrow: '01',
    title: 'Endolift',
    desc: 'A fine laser fibre guided beneath the skin surface precisely melts localised fat and contracts collagen fibres simultaneously — lifting and tightening from within without any surgical incision.',
  },
  {
    eyebrow: '02',
    title: 'LipoLift',
    desc: 'Combined with Ecojet, a gentle water-assisted system, LipoLift precisely emulsifies and removes small fat deposits with minimal trauma to surrounding tissue — sculpting the contour without a scalpel.',
  },
  {
    eyebrow: '03',
    title: 'BioLift',
    desc: 'Bio-stimulating injectables — including Profhilo or polynucleotides — replenish lost volume and deeply hydrate the dermis, amplifying and prolonging the lifting and tightening effects.',
  },
];

const ELIGIBILITY = [
  'Not ready for surgery but want visible, long-lasting results',
  'Struggling with sagging skin on the face, neck, or body',
  'Looking to reduce jowls or define the jawline without an operation',
  'Wanting skin tightening on the arms, abdomen, or thighs',
  'Hoping for natural, gradual improvement with minimal downtime',
];

const TREATED_BENEFITS = [
  {
    title: 'Non-Surgical Facelift',
    desc: 'Lifts and tightens skin without cuts, stitches, or scars — delivering a rejuvenated appearance with none of the surgical risks.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
      </svg>
    ),
  },
  {
    title: 'Visible Tightening',
    desc: 'Skin appears firmer immediately after treatment, with continued improvement developing progressively over the following months.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/>
        <polyline points="17 6 23 6 23 12"/>
      </svg>
    ),
  },
  {
    title: 'Collagen Boost',
    desc: 'Stimulates the natural production of new collagen and elastin for long-lasting firmness, improved skin texture, and enhanced elasticity.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M12 2a10 10 0 0 1 10 10c0 5.52-4.48 10-10 10S2 17.52 2 12"/>
        <path d="M12 6v6l4 2"/>
      </svg>
    ),
  },
  {
    title: 'Fat Reduction',
    desc: 'Precisely melts small, stubborn fat deposits to smooth and contour areas such as the double chin, love handles, or inner thighs.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="12" cy="12" r="10"/>
        <circle cx="12" cy="12" r="4"/>
        <line x1="4.93" y1="4.93" x2="19.07" y2="19.07"/>
      </svg>
    ),
  },
  {
    title: 'Natural, Precise Results',
    desc: 'Targets even delicate areas — such as under the eyes — safely and with remarkable precision for a refreshed, natural-looking outcome.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
        <circle cx="12" cy="12" r="3"/>
      </svg>
    ),
  },
  {
    title: 'Minimal Downtime',
    desc: 'Quick recovery with most patients returning to daily activities within 1–2 days — ideal for those with busy schedules.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
        <polyline points="22 4 12 14.01 9 11.01"/>
      </svg>
    ),
  },
];

const CONDITIONS_FACE = [
  'Chin & Jawline',
  'Nasolabial Folds',
  'Smile & Laughter Lines',
  'Lower Eyelids',
  'Neck & Décolletage',
];

const CONDITIONS_BODY = [
  'Stomach',
  'Arms',
  'Inner Thighs',
  'Ankles',
  'Knees',
  'Buttock Area',
];

const FAQS = [
  {
    question: 'What areas can Endolift treat?',
    answer:
      'Endolift is highly versatile and can treat the face, jowls, neck, jawline, double chin, upper arms, abdomen, thighs, and knees. During your consultation, your doctor will assess which areas will benefit most and recommend a personalised treatment plan.',
  },
  {
    question: 'How many Endolift sessions will I need?',
    answer:
      'Most patients achieve excellent results in a single session. In some cases a second treatment may be recommended to further refine the outcome. Your doctor will advise on the optimal number of sessions based on your individual anatomy and goals.',
  },
  {
    question: 'Is Endolift painful?',
    answer:
      'Endolift is performed under local anaesthetic to ensure a comfortable experience throughout. Most patients report only mild pressure or a gentle warmth during the procedure. Any post-treatment tenderness or swelling typically resolves within one to two days.',
  },
  {
    question: 'What is the recovery like after Endolift?',
    answer:
      'Endolift has minimal downtime. You may experience mild swelling, redness, or bruising for one to two days after treatment. Most patients return to normal daily activities the following day. Strenuous exercise and direct heat exposure should be avoided for a short period post-treatment.',
  },
  {
    question: 'When will I see results from Endolift?',
    answer:
      'Some initial tightening is visible shortly after treatment, with continued improvement over three to six months as collagen remodelling takes place. Results can last several years, particularly when maintained with a healthy skincare routine and lifestyle.',
  },
  {
    question: 'Am I suitable for Endolift?',
    answer:
      'Endolift is suitable for most healthy adults experiencing mild to moderate skin laxity who are looking for a non-surgical alternative. A thorough consultation is carried out before treatment to assess your suitability. Those who are pregnant, breastfeeding, or have certain medical conditions may not be suitable candidates.',
  },
];

const RELATED = [
  { title: 'Morpheus8',                   href: '/treatments/morpheus8',         desc: 'Fractional radiofrequency skin remodelling for face and body.' },
  { title: 'Dermal Fillers',              href: '/treatments/dermal-fillers',    desc: 'Restore volume and structure to the face with precision filler.' },
  { title: 'Deep Laser Resurfacing',      href: '/treatments/laser-resurfacing', desc: 'Comprehensive skin renewal targeting texture, tone, and laxity.' },
  { title: 'Non Surgical Blepharoplasty', href: '/treatments/blepharoplasty',    desc: 'Eye area rejuvenation without surgery or scarring.' },
];

/* ── Page component ───────────────────────────────────────────── */
export default function EndoliftPage() {
  return (
    <>
      {/* ════════════════════════════════════════
          1. HERO
      ════════════════════════════════════════ */}
      <section
        className={styles.hero}
        aria-label="Endolift Leicester – hero"
        data-section-theme="dark"
      >
        <div className={styles.heroGrid} aria-hidden="true" />
        <div className={styles.heroGradient} aria-hidden="true" />

        {/* Breadcrumb — pinned to top of hero */}
        <div className={styles.heroBreadcrumb}>
          <Container>
            <Breadcrumb
              theme="dark"
              items={[
                { label: 'Treatments', href: '/treatments' },
                { label: 'Endolift Laser' },
              ]}
            />
          </Container>
        </div>

        <Container>
          <motion.div
            className={styles.heroContent}
            variants={stagger(0.15)}
            initial="hidden"
            animate="show"
          >
            <div className={styles.heroLeft}>
              <motion.span className={styles.heroCategory} variants={fadeUp}>
                Medical Aesthetics
              </motion.span>

              <motion.h1 className={styles.heroTitle} variants={fadeUp}>
                Endolift in Leicester
              </motion.h1>

              <motion.p className={styles.heroDesc} variants={fadeUp}>
                Reveal firmer, smoother, and contoured skin in just one Endolift session,
                with minimal downtime.
              </motion.p>

              <motion.div className={styles.heroCtas} variants={fadeUp}>
                <BookConsultationButton className={styles.heroCtaPrimary}>
                  Book Appointment
                </BookConsultationButton>
              </motion.div>

              {/* Review badges */}
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
          </motion.div>
        </Container>
      </section>

      {/* ════════════════════════════════════════
          2. PATIENT REVIEWS
      ════════════════════════════════════════ */}
      <Testimonials />

      {/* ════════════════════════════════════════
          3. WHAT IS ENDOLIFT + AT A GLANCE
      ════════════════════════════════════════ */}
      <Section variant="light" data-section-theme="light">
        <Container>
          <motion.div
            className={styles.combinedBody}
            variants={stagger(0.12)}
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
          >
            {/* Left: eyebrow → heading → description → CTA */}
            <motion.div className={styles.combinedLeft} variants={stagger(0.12)}>
              <motion.div className={styles.combinedLeftTop} variants={fadeUp}>
                <p className={styles.eyebrowDark}>About This Treatment</p>
                <h2 className={styles.combinedHeading}>
                  What is Endolift?
                </h2>
                <p className={styles.combinedDesc}>
                  Endolift is a minimally invasive laser treatment that lifts, tightens, and contours
                  the skin — all without surgery. This treatment encourages collagen production,
                  helping remodel the skin on your face, neck, jawline, and even your arms, abdomen,
                  or thighs.
                </p>
              </motion.div>
              <motion.div className={styles.combinedCtaWrapper} variants={fadeUp}>
                <BookConsultationButton className={styles.combinedCta}>
                  Book Your Consultation
                </BookConsultationButton>
              </motion.div>
            </motion.div>

            {/* Right: At a Glance cards */}
            <div className={styles.combinedRight}>
              <motion.p className={styles.combinedRightLabel} variants={fadeUp}>
                At a Glance
              </motion.p>
              <motion.div className={styles.combinedCards} variants={stagger(0.08)}>
                {AT_A_GLANCE.map((item) => (
                  <motion.div key={item.label} className={styles.glanceCard} variants={fadeUp}>
                    <span className={styles.glanceIcon}>{item.icon}</span>
                    <span className={styles.glanceLabel}>{item.label}</span>
                    <span className={styles.glanceValue}>{item.value}</span>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </motion.div>
        </Container>
      </Section>

      {/* ════════════════════════════════════════
          NEW: ENDOLIFT COMBINATION
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
              Our Approach
            </motion.p>
            <motion.h2 className={styles.headingLight} variants={fadeUp}>
              A Triple Action for Sculpted Skin
            </motion.h2>
            <motion.p className={styles.combinationIntroText} variants={fadeUp}>
              At The One Clinic, our Endolift Combination combines three technologies, ideal for
              those who want to lift, tighten, and contour their face or body safely.
            </motion.p>
          </motion.div>

          <motion.div
            className={styles.techCardsGrid}
            variants={stagger(0.1)}
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
          >
            {TECH_CARDS.map((card) => (
              <motion.div key={card.title} className={styles.techCard} variants={fadeUp}>
                <span className={styles.techCardEyebrow}>{card.eyebrow}</span>
                <h3 className={styles.techCardTitle}>{card.title}</h3>
                <p className={styles.techCardDesc}>{card.desc}</p>
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
            <p className={styles.finalResultsEyebrow}>Final Results</p>
            <p className={styles.finalResultsText}>
              When combined, Endolift, LipoLift, and BioLift deliver complete skin renewal —
              addressing laxity, fat deposits, and volume loss in a single programme for a
              naturally sculpted, youthful outcome.
            </p>
          </motion.div>
        </Container>
      </Section>

      {/* ════════════════════════════════════════
          4. TREATMENT JOURNEY
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
              What to Expect
            </motion.p>
            <motion.h2 className={styles.headingDark} variants={fadeUp}>
              Your Treatment Journey
            </motion.h2>
          </motion.div>

          <motion.ol
            className={styles.journeyList}
            variants={stagger(0.12)}
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
            aria-label="Endolift treatment journey steps"
          >
            {JOURNEY_STEPS.map((step) => (
              <motion.li key={step.n} className={styles.journeyStep} variants={fadeUp}>
                <span className={styles.stepNum} aria-hidden="true">{step.n}</span>
                <div className={styles.stepBody}>
                  <h3 className={styles.stepTitle}>{step.title}</h3>
                  <p className={styles.stepDesc}>{step.desc}</p>
                </div>
              </motion.li>
            ))}
          </motion.ol>
        </Container>
      </Section>

      {/* ════════════════════════════════════════
          NEW: TREATED BENEFITS
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
              What You Gain
            </motion.p>
            <motion.h2 className={styles.headingDark} variants={fadeUp}>
              Endolift Treated Benefits
            </motion.h2>
          </motion.div>

          <motion.div
            className={styles.treatedBenefitsGrid}
            variants={stagger(0.08)}
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
          >
            {TREATED_BENEFITS.map((b) => (
              <motion.div key={b.title} className={styles.treatedBenefitCard} variants={fadeUp}>
                <span className={styles.treatedBenefitIconWrap} aria-hidden="true">
                  {b.icon}
                </span>
                <h3 className={styles.treatedBenefitTitle}>{b.title}</h3>
                <p className={styles.treatedBenefitDesc}>{b.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </Container>
      </Section>

      {/* ════════════════════════════════════════
          5. WHY CHOOSE ENDOLIFT LASER
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
              Is This Right for You?
            </motion.p>
            <motion.h2 className={styles.headingLight} variants={fadeUp}>
              Why Choose an Endolift Laser?
            </motion.h2>
          </motion.div>

          <motion.div
            className={styles.eligibilityWrap}
            variants={stagger(0.1)}
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
          >
            <motion.p className={styles.eligibilityIntro} variants={fadeUp}>
              You can choose Endolift laser skin tightening if you are:
            </motion.p>
            <motion.ul className={styles.eligibilityList} role="list" variants={stagger(0.1)}>
              {ELIGIBILITY.map((item) => (
                <motion.li key={item} className={styles.eligibilityItem} variants={fadeUp}>
                  <span className={styles.eligibilityCheck} aria-hidden="true">
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <polyline points="2,7 5.5,10.5 12,3.5" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </span>
                  <span>{item}</span>
                </motion.li>
              ))}
            </motion.ul>
            <motion.p className={styles.eligibilityClosing} variants={fadeUp}>
              If any of these sound familiar, Endolift laser skin tightening could be the right solution for you.
            </motion.p>
            <motion.div variants={fadeUp}>
              <BookConsultationButton className={styles.combinedCta}>
                Book Your Consultation
              </BookConsultationButton>
            </motion.div>
          </motion.div>
        </Container>
      </Section>

      {/* ════════════════════════════════════════
          6. HOW DOES ENDOLIFT WORK
      ════════════════════════════════════════ */}
      <Section variant="light" data-section-theme="light" className={styles.howSection}>
        <Container>
          <motion.div
            className={styles.sectionHeaderCentre}
            variants={stagger(0.1)}
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
          >
            <motion.p className={styles.eyebrowDark} variants={fadeUp}>The Science</motion.p>
            <motion.h2 className={styles.headingDark} variants={fadeUp}>
              How Does Endolift Work?
            </motion.h2>
          </motion.div>

          <motion.div
            className={styles.howTextGrid}
            variants={stagger(0.1)}
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
          >
            <motion.p className={styles.howPara} variants={fadeUp}>
              Endolift uses advanced laser technology — a very thin laser fibre that is gently
              inserted under the skin in targeted areas. The laser energy selectively melts small
              fat deposits and stimulates the surrounding connective tissue to contract, tightening
              and reshaping the skin from within.
            </motion.p>
            <motion.p className={styles.howPara} variants={fadeUp}>
              This controlled thermal stimulus activates the body&apos;s natural fibroblasts to produce
              new collagen and elastin, progressively remodelling the skin. Results become visible
              over weeks to months as collagen matures, with many patients reporting continued
              improvement for up to six months following treatment.
            </motion.p>
          </motion.div>

          <motion.div
            className={styles.howCoversWrap}
            variants={stagger(0.08)}
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
          >
            <motion.p className={styles.howCoversLabel} variants={fadeUp}>Endolift Addresses</motion.p>
            <motion.ul className={styles.howCoversList} role="list" variants={stagger(0.08)}>
              {[
                'Face & jowls',
                'Neck & jawline',
                'Double chin',
                'Upper arms',
                'Abdomen',
                'Thighs & knees',
              ].map((item) => (
                <motion.li key={item} className={styles.howCoversItem} variants={fadeUp}>
                  <span className={styles.howCoversCheck} aria-hidden="true">
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                      <polyline points="2,6 5,9 10,3" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </span>
                  {item}
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>
        </Container>
      </Section>

      {/* ════════════════════════════════════════
          NEW: RESULTS, AFTERCARE & SIDE EFFECTS
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
            {/* Card 1 — Results Timeline */}
            <motion.div className={styles.resultsAfterCard} variants={fadeUp}>
              <div className={styles.resultsAfterCardHead}>
                <span className={styles.resultsAfterCardIcon} aria-hidden="true">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/>
                    <polyline points="17 6 23 6 23 12"/>
                  </svg>
                </span>
                <h3 className={styles.resultsAfterCardTitle}>When Will You See Results?</h3>
              </div>
              <p className={styles.resultsAfterCardBody}>
                Some visible tightening appears within 4–8 weeks as new collagen begins to form.
                Skin continues to improve over 3–6 months, with final results typically visible at
                around 6–9 months.
              </p>
              <p className={styles.resultsAfterCardNote}>
                Results are long-lasting — often 2–3 years — depending on age, skin condition,
                and lifestyle. A good skincare routine helps maintain the effect.
              </p>
            </motion.div>

            {/* Card 2 — Side Effects */}
            <motion.div className={styles.resultsAfterCard} variants={fadeUp}>
              <div className={styles.resultsAfterCardHead}>
                <span className={styles.resultsAfterCardIcon} aria-hidden="true">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10"/>
                    <line x1="12" y1="8" x2="12" y2="12"/>
                    <line x1="12" y1="16" x2="12.01" y2="16"/>
                  </svg>
                </span>
                <h3 className={styles.resultsAfterCardTitle}>Side Effects</h3>
              </div>
              <p className={styles.resultsAfterCardBody}>
                Endolift is minimally invasive and generally very safe. Most patients experience
                only mild, temporary effects:
              </p>
              <ul className={styles.resultsAfterCardList} role="list">
                {[
                  'Slight redness or warmth in the treated area',
                  'Mild swelling or tenderness',
                  'Minor bruising in some cases',
                ].map((item) => (
                  <li key={item} className={styles.resultsAfterCardListItem}>
                    <span className={styles.resultsAfterDot} aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
              <p className={styles.resultsAfterCardNote}>
                These usually fade within a few days. The risk of serious complications is
                extremely low when performed by a trained doctor.
              </p>
            </motion.div>

            {/* Card 3 — Aftercare */}
            <motion.div className={styles.resultsAfterCard} variants={fadeUp}>
              <div className={styles.resultsAfterCardHead}>
                <span className={styles.resultsAfterCardIcon} aria-hidden="true">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                    <polyline points="22 4 12 14.01 9 11.01"/>
                  </svg>
                </span>
                <h3 className={styles.resultsAfterCardTitle}>Aftercare Tips</h3>
              </div>
              <ul className={styles.resultsAfterCardList} role="list">
                {[
                  'Avoid heat, saunas, and intense exercise for 48 hours',
                  'Keep skin well-hydrated and clean',
                  'Do not touch or rub the treated areas',
                  'Follow any specific advice from your doctor for best results',
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
          NEW: BEFORE & AFTER
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
              Real Results
            </motion.p>
            <motion.h2 className={styles.headingDark} variants={fadeUp}>
              Endolift Before &amp; After
            </motion.h2>
            <motion.p className={styles.beforeAfterSubheading} variants={fadeUp}>
              Real skin lifting and tightening results from our patients at The One Clinic, Leicester.
            </motion.p>
          </motion.div>

          <motion.div
            className={styles.beforeAfterGrid}
            variants={stagger(0.1)}
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
          >
            {[1, 2, 3].map((n) => (
              <motion.div key={n} className={styles.beforeAfterPlaceholder} variants={fadeUp}>
                <div className={styles.placeholderInner}>
                  <span className={styles.placeholderLabel}>Result {n}</span>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </Container>
      </Section>

      {/* ════════════════════════════════════════
          NEW: CTA BANNER
      ════════════════════════════════════════ */}
      <section className={styles.ctaBanner} data-section-theme="dark" aria-label="Book Endolift consultation">
        <Container>
          <motion.div
            className={styles.ctaBannerContent}
            variants={stagger(0.12)}
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
          >
            <motion.h2 className={styles.ctaBannerHeading} variants={fadeUp}>
              Your Skin Deserves The<br />Same Endolift Glow!
            </motion.h2>
            <motion.div variants={fadeUp}>
              <BookConsultationButton className={styles.ctaBannerBtn}>
                Book Consultation
              </BookConsultationButton>
            </motion.div>
          </motion.div>
        </Container>
      </section>

      {/* ════════════════════════════════════════
          7. TREATABLE AREAS
      ════════════════════════════════════════ */}
      <Section variant="light" data-section-theme="light" className={styles.conditionsSection}>
        <Container>
          <motion.div
            className={styles.sectionHeaderCentre}
            variants={stagger(0.1)}
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
          >
            <motion.p className={styles.eyebrowDark} variants={fadeUp}>
              Treatable Areas
            </motion.p>
            <motion.h2 className={styles.headingDark} variants={fadeUp}>
              What Areas Can Be Treated With Endolift?
            </motion.h2>
            <motion.p className={styles.conditionsIntro} variants={fadeUp}>
              Endolift is our treatment of choice to tackle skin sagging and stubborn fat cells
              on various face and body areas.
            </motion.p>
          </motion.div>

          <motion.div
            className={styles.areasColumns}
            variants={stagger(0.1)}
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
          >
            <motion.div className={styles.areasGroup} variants={fadeUp}>
              <p className={styles.areasGroupLabel}>Face &amp; Neck</p>
              <ul className={styles.areasGroupList} role="list">
                {CONDITIONS_FACE.map((area) => (
                  <li key={area} className={styles.areasGroupItem}>
                    <span className={styles.areasItemDot} aria-hidden="true" />
                    {area}
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div className={styles.areasGroup} variants={fadeUp}>
              <p className={styles.areasGroupLabel}>Body</p>
              <ul className={styles.areasGroupList} role="list">
                {CONDITIONS_BODY.map((area) => (
                  <li key={area} className={styles.areasGroupItem}>
                    <span className={styles.areasItemDot} aria-hidden="true" />
                    {area}
                  </li>
                ))}
              </ul>
            </motion.div>
          </motion.div>
        </Container>
      </Section>

      {/* ════════════════════════════════════════
          8. MEET THE EXPERTS
      ════════════════════════════════════════ */}
      <MeetTheExperts />

      {/* ════════════════════════════════════════
          9. FAQ
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
          10. BOOKING FORM
      ════════════════════════════════════════ */}
      <LeadForm />

      {/* ════════════════════════════════════════
          11. RELATED TREATMENTS
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
              Explore More
            </motion.p>
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
            {RELATED.map((r) => (
              <motion.div key={r.title} variants={fadeUp}>
                <Link href={r.href} className={styles.relatedCard}>
                  <h3 className={styles.relatedTitle}>{r.title}</h3>
                  <p className={styles.relatedDesc}>{r.desc}</p>
                  <span className={styles.relatedArrow} aria-hidden="true">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path d="M3 8h10M9 4l4 4-4 4"
                        stroke="currentColor" strokeWidth="1.5"
                        strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </span>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </Container>
      </Section>

      {/* ════════════════════════════════════════
          FINAL CTA
      ════════════════════════════════════════ */}
      <FinalCTA />
    </>
  );
}
