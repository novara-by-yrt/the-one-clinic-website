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
    label: 'Expected Outcome',
    value: 'Skin lift & contouring',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M12 2L8 6h3v6H9l3 4 3-4h-2V6h3L12 2z"/>
        <path d="M5 19h14"/>
        <path d="M5 22h14"/>
      </svg>
    ),
  },
  {
    label: 'Appointment Time',
    value: '60–90 minutes',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="12" cy="12" r="10"/>
        <polyline points="12 6 12 12 16 14"/>
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
  {
    label: 'Downtime',
    value: 'Minimal 1–2 days',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"/>
        <path d="M9 12l2 2 4-4"/>
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

const BENEFITS = [
  {
    title: 'No Surgery Required',
    desc: 'A minimally invasive procedure with no scalpel, no general anaesthesia, and no surgical scarring — just precise laser energy under the skin.',
  },
  {
    title: 'Natural Collagen Stimulation',
    desc: 'Laser energy triggers the body\'s own collagen and elastin production, delivering gradual, natural-looking improvements that develop over months.',
  },
  {
    title: 'Treats Multiple Areas',
    desc: 'Effectively addresses the face, neck, jawline, double chin, upper arms, abdomen, and thighs — all in a single, tailored session.',
  },
  {
    title: 'Long-Lasting Results',
    desc: 'Clinical improvements continue for several months post-treatment and can last years, particularly when combined with a healthy lifestyle.',
  },
];

const CONDITIONS = [
  'Skin laxity & looseness',
  'Jowls & sagging jawline',
  'Neck laxity',
  'Double chin',
  'Upper arm skin laxity',
  'Abdominal skin laxity',
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
          5. WHY CHOOSE ENDOLIFT
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
              Key Benefits
            </motion.p>
            <motion.h2 className={styles.headingLight} variants={fadeUp}>
              Why Choose Endolift
            </motion.h2>
          </motion.div>

          <motion.div
            className={styles.benefitsGrid}
            variants={stagger(0.1)}
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
          >
            {BENEFITS.map((b) => (
              <motion.div key={b.title} className={styles.benefitCard} variants={fadeUp}>
                <div className={styles.benefitIcon} aria-hidden="true">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none"
                    stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="3,10 8,15 17,5" />
                  </svg>
                </div>
                <h3 className={styles.benefitTitle}>{b.title}</h3>
                <p className={styles.benefitDesc}>{b.desc}</p>
              </motion.div>
            ))}
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
              Treatable Concerns
            </motion.p>
            <motion.h2 className={styles.headingDark} variants={fadeUp}>
              Endolift Treatable Concerns
            </motion.h2>
          </motion.div>

          <motion.ul
            className={styles.conditionsList}
            variants={stagger(0.1)}
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
            role="list"
            aria-label="Treatable areas"
          >
            {CONDITIONS.map((c) => (
              <motion.li key={c} className={styles.conditionPill} variants={fadeUp}>
                <span className={styles.conditionDot} aria-hidden="true" />
                {c}
              </motion.li>
            ))}
          </motion.ul>
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
