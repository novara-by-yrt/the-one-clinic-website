'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { m } from 'framer-motion';
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
import { LONGEVITY_FAQS as FAQS, RESULTS_AFTERCARE_ITEMS } from './data';

/* ── Static data ──────────────────────────────────────────────── */
const AT_A_GLANCE = [
  {
    label: 'Treatment Duration',
    value: '45 to 60 minutes for face profiling; longevity consultation times vary',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="12" cy="12" r="10"/>
        <polyline points="12 6 12 12 16 14"/>
      </svg>
    ),
  },
  {
    label: 'Treatment Frequency',
    value: 'Bespoke to your health plan; facial fillers typically last 12 to 18 months',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <polyline points="1 4 1 10 7 10"/>
        <path d="M3.51 15a9 9 0 1 0 .49-3.1"/>
      </svg>
    ),
  },
  {
    label: 'Downtime',
    value: 'Minimal to none',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"/>
        <path d="M9 12l2 2 4-4"/>
      </svg>
    ),
  },
  {
    label: 'Results Longevity',
    value: 'Long-term internal health benefits; immediate, lasting aesthetic lift externally',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/>
        <polyline points="17 6 23 6 23 12"/>
      </svg>
    ),
  },
  {
    label: 'Cost',
    value: 'Consultation fee £250',
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

const ELIGIBILITY = [
  "Want to understand your body's unique metabolic and dietary needs from expert longevity doctors",
  'Are concerned about your heart health, lipids, and long-term wellness',
  'Wish to soften nasty labial folds and marionette lines',
  'Want to restore lost volume using a mixture of premium fillers to profile the mid-face and peri-oral (mouth and chin) areas for a fresher-looking face',
  'Are looking for bespoke lifestyle and diet plans tailored specifically to your genetics',
];

const TREATED_BENEFITS = [
  {
    title: 'Bespoke Health Optimisation',
    desc: 'Receive bespoke lifestyle and diet plans with Prof Prashant Patel, a pioneer in metabolic medicine.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="12" cy="12" r="3"/>
        <path d="M19.07 4.93a10 10 0 0 1 0 14.14M4.93 4.93a10 10 0 0 0 0 14.14"/>
      </svg>
    ),
  },
  {
    title: 'Heart & Metabolic Focus',
    desc: 'In-depth discussions on heart health and lipids to protect your future well-being.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
      </svg>
    ),
  },
  {
    title: 'Immediate Aesthetic Lift',
    desc: 'Face profiling creates a beautifully contoured, fresher-looking face straightaway.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
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
    title: 'Targeted Rejuvenation',
    desc: 'Specifically addresses sagging, peri-oral lines, nasty labial folds, and marionette lines.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="12" cy="12" r="10"/>
        <circle cx="12" cy="12" r="4"/>
        <line x1="12" y1="2" x2="12" y2="8"/>
        <line x1="12" y1="16" x2="12" y2="22"/>
      </svg>
    ),
  },
  {
    title: 'Holistic Confidence',
    desc: 'Helps you feel properly comfortable and proud of both your internal health and your physical appearance.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="12" cy="12" r="10"/>
        <path d="M8 14s1.5 2 4 2 4-2 4-2"/>
        <line x1="9" y1="9" x2="9.01" y2="9"/>
        <line x1="15" y1="9" x2="15.01" y2="9"/>
      </svg>
    ),
  },
  {
    title: 'Results That Last',
    desc: 'Built for the long term, with changes that hold and keep improving, not a quick fix that fades.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/>
        <polyline points="17 6 23 6 23 12"/>
      </svg>
    ),
  },
];

const JOURNEY_STEPS = [
  {
    n: '01',
    title: 'Consultation',
    desc: 'You will sit down with our longevity doctors for an in-depth assessment where we discuss your heart health, lipids, and diet, helping you understand your bespoke needs.',
  },
  {
    n: '02',
    title: 'Bespoke Planning',
    desc: 'We create personalised lifestyle and diet plans, answering crucial questions like how much water, protein, and exercise you need.',
  },
  {
    n: '03',
    title: 'Aesthetic Application',
    desc: 'For facial profiling, a carefully selected mixture of premium fillers is gently injected into targeted areas (mid-face, perioral mouth, and chin) using advanced, safe techniques.',
  },
  {
    n: '04',
    title: 'Recovery Handling',
    desc: 'There is absolutely zero downtime. We ensure you are comfortable and ready to get back to your normal routine straightaway.',
  },
];

const CLINIC_REASONS = [
  {
    eyebrow: '01',
    title: 'Trusted and Experienced Clinicians',
    desc: 'Our doctors bring years of trusted clinical experience to every appointment.',
  },
  {
    eyebrow: '02',
    title: 'Personalised Treatment Plans',
    desc: 'Every plan is tailored to your unique genetics, lifestyle, and goals.',
  },
  {
    eyebrow: '03',
    title: 'Advanced Technology',
    desc: 'Our state-of-the-art clinic is equipped with modern, innovative technology.',
  },
  {
    eyebrow: '04',
    title: 'Friendly and Professional Service',
    desc: 'A warm, welcoming team supports you at every step of your journey.',
  },
  {
    eyebrow: '05',
    title: 'High Standards of Safety and Patient Care',
    desc: 'Strict safety and hygiene protocols protect you throughout your treatment.',
  },
  {
    eyebrow: '06',
    title: 'Honest Advice and Transparent Pricing',
    desc: 'Clear, open discussions with no hidden costs or pressure.',
  },
];

const RELATED_BLOGS = [
  { title: 'Look 10 Years Younger Leicester',                    href: '/blog/look-10-years-younger-leicester',    desc: 'Discover the treatments that can help you turn back the clock naturally.' },
  { title: 'Sagging Cheeks: What Causes Them & How To Lift?',    href: '/blog/sagging-cheeks-causes-treatments',   desc: 'Understand mid-face volume loss and the options for restoring contour.' },
  { title: 'Sagging Jowls: What It Is, Causes and Stages',       href: '/blog/sagging-jowls-a-complete-guide',     desc: 'A complete guide to jowling around the mouth and chin area.' },
  { title: 'How To Get Rid Of Loose Skin? A Guide To Firm Skin', href: '/blog/how-to-get-rid-of-loose-skin',       desc: 'Practical ways to firm and tighten loose, ageing skin.' },
];

/* ── Page component ───────────────────────────────────────────── */
export default function LongevityMedicinePage() {
  const [showAllFaqs, setShowAllFaqs] = useState(false);

  return (
    <>
      {/* ════════════════════════════════════════
          1. HERO
      ════════════════════════════════════════ */}
      <section
        className={styles.hero}
        aria-label="Longevity Medicine Leicester, hero"
        data-section-theme="dark"
      >
        {/* Breadcrumb, pinned to top of hero */}
        <div className={styles.heroBreadcrumb}>
          <Container>
            <Breadcrumb
              theme="dark"
              items={[
                { label: 'Treatments', href: '/treatments' },
                { label: 'Longevity Medicine' },
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
            {/* Left: text */}
            <div className={styles.heroLeft}>
              <m.span className={styles.heroCategory} variants={fadeUp}>
                Health &amp; Wellbeing
              </m.span>

              <m.h1 className={styles.heroTitle} variants={fadeUp}>
                Longevity Medicine in Leicester
              </m.h1>

              <m.p className={styles.heroDesc} variants={fadeUp}>
                Experience a true transformation from the inside out with our advanced longevity
                medicine in Leicester. Combine metabolic health optimisation with expert face
                profiling to restore a fresher-looking face and enhance your long-term wellness.
              </m.p>

              <m.div className={styles.heroCtas} variants={fadeUp}>
                <BookConsultationButton className={styles.heroCtaPrimary}>
                  Book Appointment
                </BookConsultationButton>
              </m.div>

              {/* Review badges */}
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

            {/* Right: image */}
            <m.div className={styles.heroImageWrap} variants={fadeUp}>
              <Image
                src="/images/Doctor2.jpg"
                alt="Longevity medicine consultation at The One Clinic Leicester"
                fill
                priority
                className={styles.heroImage}
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              {/* Subtle bottom-fade to blend with section */}
              <div className={styles.heroImageFade} aria-hidden="true" />
            </m.div>
          </m.div>
        </Container>
      </section>

      {/* ════════════════════════════════════════
          2. WHAT IS LONGEVITY MEDICINE?
      ════════════════════════════════════════ */}
      <Section variant="light" data-section-theme="light" className={styles.sectionGray}>
        <Container>
          <m.div
            className={styles.whatIsGrid}
            variants={stagger(0.12)}
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
          >
            {/* Left: text */}
            <m.div className={styles.whatIsContent} variants={stagger(0.12)}>
              <m.div className={styles.whatIsTextGroup} variants={fadeUp}>
                <p className={styles.eyebrowDark}>About This Treatment</p>
                <h2 className={styles.combinedHeading}>What is Longevity Medicine?</h2>
                <p className={styles.combinedDesc}>
                  Longevity medicine is a proactive, science-led approach to optimising your health,
                  focusing on metabolic function to help you feel your absolute best as you age. We
                  pair this internal care with our advanced face profiling. This aesthetic aspect
                  uses a precise mixture of premium fillers to profile the mid-face and peri-oral
                  area (mouth and chin), effectively softening nasty labial folds and deep
                  marionette lines to give you a lovely, fresher-looking face.
                </p>
              </m.div>
              <m.div className={styles.combinedCtaWrapper} variants={fadeUp}>
                <BookConsultationButton className={styles.combinedCta}>
                  Book Your Consultation
                </BookConsultationButton>
              </m.div>
            </m.div>

            {/* Right: image */}
            <m.div className={styles.whatIsVideoWrap} variants={fadeUp}>
              <Image
                src="/images/Health Screening.jpg"
                alt="What is longevity medicine at The One Clinic Leicester"
                fill
                className={styles.whatIsVideoFrame}
                sizes="(max-width: 900px) 100vw, 50vw"
              />
            </m.div>
          </m.div>
        </Container>
      </Section>

      {/* ════════════════════════════════════════
          3. HOW DOES LONGEVITY TREATMENT WORK?
      ════════════════════════════════════════ */}
      <Section variant="light" data-section-theme="light" className={styles.howSection}>
        <Container>
          <m.div
            className={styles.sectionHeaderCentre}
            variants={stagger(0.1)}
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
          >
            <m.h2 className={styles.headingDark} variants={fadeUp}>
              How Does Longevity Treatment Work?
            </m.h2>
          </m.div>

          <m.div
            className={styles.howTextGrid}
            variants={stagger(0.1)}
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
          >
            <m.p className={styles.howPara} variants={fadeUp}>
              Because everyone is genetically different, and so are their body needs and diets,
              true rejuvenation requires a highly personalised approach. During your medical
              consultation, our top longevity doctors will discuss your heart health, lipids, and
              daily diet in detail. We help you truly &lsquo;know your foods&rsquo; and figure out
              exactly how much water, protein, and exercise you need.
            </m.p>
            <m.p className={styles.howPara} variants={fadeUp}>
              Aesthetically, our precise face profiling targets areas of volume loss, expertly
              lifting and contouring the skin from the outside so you can step out into your
              everyday life feeling spot on and properly confident.
            </m.p>
          </m.div>
        </Container>
      </Section>

      {/* ════════════════════════════════════════
          4. WHY CHOOSE LONGEVITY MEDICINE?
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
              Is This Right for You?
            </m.p>
            <m.h2 className={styles.headingLight} variants={fadeUp}>
              Why Choose Longevity Medicine?
            </m.h2>
          </m.div>

          <m.div
            className={styles.eligibilityWrap}
            variants={stagger(0.1)}
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
          >
            <m.p className={styles.eligibilityIntro} variants={fadeUp}>
              You might find this comprehensive longevity treatment to be a brilliant choice if you:
            </m.p>
            <m.ul className={styles.eligibilityList} role="list" variants={stagger(0.1)}>
              {ELIGIBILITY.map((item) => (
                <m.li key={item} className={styles.eligibilityItem} variants={fadeUp}>
                  <span className={styles.eligibilityCheck} aria-hidden="true">
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <polyline points="2,7 5.5,10.5 12,3.5" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </span>
                  <span>{item}</span>
                </m.li>
              ))}
            </m.ul>
            <m.div variants={fadeUp}>
              <BookConsultationButton className={`${styles.combinedCta} ${styles.ctaWhiteInvert}`}>
                Book Your Consultation
              </BookConsultationButton>
            </m.div>
          </m.div>
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
          <m.div
            className={styles.sectionHeaderCentre}
            variants={stagger(0.1)}
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
          >
            <m.p className={styles.eyebrowDark} variants={fadeUp}>Quick Facts</m.p>
            <m.h2 className={styles.headingDark} variants={fadeUp}>
              Longevity Medicine At A Glance
            </m.h2>
          </m.div>

          <m.div
            className={styles.glanceStandaloneGrid}
            variants={stagger(0.08)}
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
          >
            {AT_A_GLANCE.map((item) => (
              <m.div key={item.label} className={styles.glanceCard} variants={fadeUp}>
                <span className={styles.glanceIcon}>{item.icon}</span>
                <span className={styles.glanceLabel}>{item.label}</span>
                <span className={styles.glanceValue}>{item.value}</span>
              </m.div>
            ))}
          </m.div>
        </Container>
      </Section>

      {/* ════════════════════════════════════════
          6. PROCEDURE JOURNEY
      ════════════════════════════════════════ */}
      <Section variant="light" data-section-theme="light" className={styles.journeySection}>
        <Container>
          <m.div
            className={styles.sectionHeaderCentre}
            variants={stagger(0.1)}
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
          >
            <m.p className={styles.eyebrowDark} variants={fadeUp}>
              What to Expect
            </m.p>
            <m.h2 className={styles.headingDark} variants={fadeUp}>
              Longevity Treatment Procedure
            </m.h2>
          </m.div>

          <m.ol
            className={styles.journeyList}
            variants={stagger(0.12)}
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
            aria-label="Longevity treatment procedure steps"
          >
            {JOURNEY_STEPS.map((step) => (
              <m.li key={step.n} className={styles.journeyStep} variants={fadeUp}>
                <div className={styles.stepLeft}>
                  <div className={styles.stepNumCircle} aria-hidden="true">{step.n}</div>
                  <div className={styles.stepConnector} aria-hidden="true" />
                </div>
                <div className={styles.stepBody}>
                  <h3 className={styles.stepTitle}>{step.title}</h3>
                  <p className={styles.stepDesc}>{step.desc}</p>
                </div>
              </m.li>
            ))}
          </m.ol>
        </Container>
      </Section>

      {/* ════════════════════════════════════════
          7. BENEFITS
      ════════════════════════════════════════ */}
      <Section variant="light" data-section-theme="light" className={styles.whiteBgSection}>
        <div className={styles.whiteBgWrap} aria-hidden="true">
          <Image src="/bg-image-white.png" alt="" fill className={styles.whiteBgImg} sizes="100vw" />
        </div>
        <Container className={styles.whiteBgContent}>
          <m.div
            className={styles.sectionHeaderCentre}
            variants={stagger(0.1)}
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
          >
            <m.h2 className={styles.headingDark} variants={fadeUp}>
              Benefits of Longevity Treatment
            </m.h2>
          </m.div>

          <m.div
            className={styles.treatedBenefitsGrid}
            variants={stagger(0.08)}
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
          >
            {TREATED_BENEFITS.map((b) => (
              <m.div
                key={b.title}
                className={styles.treatedBenefitCard}
                variants={fadeUp}
                whileHover={{ y: -8, transition: { type: 'spring', stiffness: 280, damping: 18 } }}
              >
                <span className={styles.treatedBenefitIconWrap} aria-hidden="true">
                  {b.icon}
                </span>
                <h3 className={styles.treatedBenefitTitle}>{b.title}</h3>
                <p className={styles.treatedBenefitDesc}>{b.desc}</p>
              </m.div>
            ))}
          </m.div>
        </Container>
      </Section>

      {/* ════════════════════════════════════════
          8. RESULTS, AFTERCARE & SIDE EFFECTS
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
              Post-Treatment
            </m.p>
            <m.h2 className={styles.headingLight} variants={fadeUp}>
              Results, Aftercare &amp; Side Effects
            </m.h2>
          </m.div>

          <m.div
            className={styles.faqBody}
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
          >
            <Accordion items={RESULTS_AFTERCARE_ITEMS} theme="dark" />
          </m.div>
        </Container>
      </Section>

      {/* ════════════════════════════════════════
          9. COST BANNER
      ════════════════════════════════════════ */}
      <section className={styles.costBanner} data-section-theme="dark" aria-label="Longevity medicine cost">
        <Container>
          <m.div
            className={styles.costBannerInner}
            variants={stagger(0.12)}
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
          >
            <m.p className={styles.costBannerEyebrow} variants={fadeUp}>
              Longevity Medicine Cost in Leicester
            </m.p>
            <m.p className={styles.costBannerPrice} variants={fadeUp}>
              Comprehensive Consultation with Prof Patel, £250
            </m.p>
            <m.p className={styles.costBannerNote} variants={fadeUp}>
              At The One Clinic, we will discuss the price of your Longevity Medicine treatment
              after an open, clear discussion.
            </m.p>
            <m.div variants={fadeUp}>
              <BookConsultationButton className={styles.ctaBannerBtn}>
                Book A Consultation
              </BookConsultationButton>
            </m.div>
          </m.div>
        </Container>
      </section>

      {/* ════════════════════════════════════════
          10. PATIENT REVIEWS
      ════════════════════════════════════════ */}
      <Testimonials />

      {/* ════════════════════════════════════════
          11. BEST EXPERIENCE
      ════════════════════════════════════════ */}
      <Section variant="light" data-section-theme="light" className={styles.clinicIntroSection}>
        <Container>
          <m.div
            className={styles.clinicIntroBody}
            variants={stagger(0.12)}
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
          >
            <m.div className={styles.clinicIntroLeft} variants={fadeUp}>
              <p className={styles.eyebrowDark}>Longevity Medicine</p>
              <h2 className={styles.combinedHeading}>
                Best Longevity Medicine<br />Treatment in Leicester
              </h2>
            </m.div>
            <m.p className={styles.clinicIntroDesc} variants={fadeUp}>
              The One Clinic provides the best longevity medicine experience in Leicester. As a
              medical clinic that puts patients first, we have highly trained, caring doctors who
              apply their extensive clinical expertise to provide safe, effective treatments. We
              ensure every appointment takes place in a relaxing, luxurious environment to deliver
              proper, brilliant results, inside and out.
            </m.p>
          </m.div>
        </Container>
      </Section>

      {/* ════════════════════════════════════════
          12. MEET THE EXPERTS
      ════════════════════════════════════════ */}
      <MeetTheExperts />

      {/* ════════════════════════════════════════
          13. WHY CHOOSE THE ONE CLINIC
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
            <m.h2 className={styles.headingLight} variants={fadeUp}>
              Why Choose The One Clinic For Longevity Treatment
            </m.h2>
          </m.div>

          <m.div
            className={styles.techCardsGrid}
            variants={stagger(0.1)}
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
          >
            {CLINIC_REASONS.map((card) => (
              <m.div
                key={card.title}
                className={styles.techCard}
                variants={fadeUp}
                whileHover={{ y: -8, transition: { type: 'spring', stiffness: 280, damping: 18 } }}
              >
                <span className={styles.techCardEyebrow}>{card.eyebrow}</span>
                <h3 className={styles.techCardTitle}>{card.title}</h3>
                <p className={styles.techCardDesc}>{card.desc}</p>
              </m.div>
            ))}
          </m.div>
        </Container>
      </Section>

      {/* ════════════════════════════════════════
          14. CTA BANNER
      ════════════════════════════════════════ */}
      <section className={styles.ctaBanner} data-section-theme="dark" aria-label="Book longevity medicine consultation">
        {/* Watermark logo */}
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
          <m.div
            className={styles.ctaBannerContent}
            variants={stagger(0.12)}
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
          >
            <m.h2 className={styles.ctaBannerHeading} variants={fadeUp}>
              Rejuvenate Your Health and Appearance Today!
            </m.h2>
            <m.p className={styles.ctaBannerSub} variants={fadeUp}>
              Give your body the advanced medical insights and premium aesthetic care it truly
              deserves. Let our expert team help you achieve a beautifully healthy, glowing
              appearance inside and out.
            </m.p>
            <m.div variants={fadeUp}>
              <BookConsultationButton className={styles.ctaBannerBtn}>
                Book Consultation
              </BookConsultationButton>
            </m.div>
          </m.div>
        </Container>
      </section>

      {/* ════════════════════════════════════════
          15. FAQ
      ════════════════════════════════════════ */}
      <section className={styles.faqSection} data-section-theme="dark">
        <div className={styles.faqInner}>
          <Container>
            <m.div
              className={styles.sectionHeaderCentre}
              variants={stagger(0.1)}
              initial="hidden"
              whileInView="show"
              viewport={VIEWPORT}
            >
              <m.p className={styles.eyebrowLight} variants={fadeUp}>FAQ</m.p>
              <m.h2 className={styles.headingLight} variants={fadeUp}>
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
              <Accordion items={showAllFaqs ? FAQS : FAQS.slice(0, 5)} theme="dark" />

              {FAQS.length > 5 && (
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
            </m.div>
          </Container>
        </div>
      </section>

      {/* ════════════════════════════════════════
          16. BOOKING FORM
      ════════════════════════════════════════ */}
      <LeadForm />

      {/* ════════════════════════════════════════
          17. RELATED BLOGS
      ════════════════════════════════════════ */}
      <Section variant="light" data-section-theme="light" className={styles.sectionGray}>
        <Container>
          <m.div
            className={styles.sectionHeaderCentre}
            variants={stagger(0.1)}
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
          >
            <m.p className={styles.eyebrowDark} variants={fadeUp}>
              Explore More
            </m.p>
            <m.h2 className={styles.headingDark} variants={fadeUp}>
              Related Blogs
            </m.h2>
          </m.div>

          <m.div
            className={styles.relatedGrid}
            variants={stagger(0.1)}
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
          >
            {RELATED_BLOGS.map((r) => (
              <m.div key={r.title} variants={fadeUp}>
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
              </m.div>
            ))}
          </m.div>
        </Container>
      </Section>

      {/* ════════════════════════════════════════
          FINAL CTA
      ════════════════════════════════════════ */}
      <FinalCTA />
    </>
  );
}
