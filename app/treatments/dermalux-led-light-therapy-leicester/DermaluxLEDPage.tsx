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

/* ── Static data ──────────────────────────────────────────────── */
const AT_A_GLANCE = [
  {
    label: 'Treatment Duration',
    value: '20-minute standalone session',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="12" cy="12" r="10"/>
        <polyline points="12 6 12 12 16 14"/>
      </svg>
    ),
  },
  {
    label: 'Treatment Frequency',
    value: 'A course is recommended for the best results, with regular sessions to maintain healthy skin',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <polyline points="1 4 1 10 7 10"/>
        <path d="M3.51 15a9 9 0 1 0 .49-3.1"/>
      </svg>
    ),
  },
  {
    label: 'Downtime',
    value: 'Zero downtime',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"/>
        <path d="M9 12l2 2 4-4"/>
      </svg>
    ),
  },
  {
    label: 'Results Longevity',
    value: 'Instant radiance, with cumulative long-term benefits',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/>
        <polyline points="17 6 23 6 23 12"/>
      </svg>
    ),
  },
  {
    label: 'Cost',
    value: 'Standalone sessions from £75',
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
  'Struggle with persistent acne breakouts or blemish-prone skin',
  'Suffer from rosacea, redness, or highly sensitive skin',
  'Are looking for a safe, pain-free treatment to boost overall skin health',
  'Want to accelerate healing and enhance the lovely results of other aesthetic procedures like microneedling or a HydraFacial',
];

const TREATED_BENEFITS = [
  {
    title: 'Reduces Acne & Breakouts',
    desc: 'Blue light effectively destroys acne-causing bacteria and clears congestion.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="12" cy="12" r="10"/>
        <circle cx="12" cy="12" r="6"/>
        <circle cx="12" cy="12" r="2"/>
      </svg>
    ),
  },
  {
    title: 'Calms Redness & Rosacea',
    desc: 'Near-infrared light intensely reduces inflammation and soothes sensitive skin.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
      </svg>
    ),
  },
  {
    title: 'Anti-Ageing Power',
    desc: 'Red light supercharges cell renewal and collagen production to soften fine lines.',
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
    title: 'Enhances Other Treatments',
    desc: 'Works brilliantly alongside our bespoke facial packages to speed up recovery and amplify results.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="12" cy="12" r="3"/>
        <path d="M19.07 4.93a10 10 0 0 1 0 14.14M4.93 4.93a10 10 0 0 0 0 14.14"/>
      </svg>
    ),
  },
  {
    title: 'Zero Pain or Downtime',
    desc: 'A completely relaxing, non-invasive experience with no recovery time needed, meaning you can carry on with your day straightaway.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"/>
        <path d="M9 12l2 2 4-4"/>
      </svg>
    ),
  },
  {
    title: 'Fast Recovery',
    desc: 'Supports faster skin recovery and rejuvenation for a healthier, more resilient complexion.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/>
        <polyline points="17 6 23 6 23 12"/>
      </svg>
    ),
  },
];

const HOW_ADDRESSES = [
  'Acne & breakouts',
  'Rosacea & redness',
  'Pigmentation',
  'Fine lines & wrinkles',
  'Signs of ageing',
  'Dull, tired skin',
];

const CLINIC_REASONS = [
  { n: '01', text: 'Experienced medical team with extensive aesthetic expertise.' },
  { n: '02', text: 'Personalised treatment plans tailored to your skin.' },
  { n: '03', text: 'Advanced, award-winning LED light therapy technology.' },
  { n: '04', text: 'Focused on natural-looking, radiant results.' },
  { n: '05', text: 'Full support throughout your treatment journey.' },
  { n: '06', text: 'Honest advice and transparent pricing.' },
];

const FAQS = [
  {
    question: 'Who is Dermalux LED treatment suitable for?',
    answer:
      'Dermalux LED is spot on for all skin types, including highly sensitive skin. It is ideal for anyone looking to treat acne, rosacea, pigmentation, or the visible signs of ageing.',
  },
  {
    question: 'Is it painful?',
    answer:
      'Not at all. It is a completely pain-free, relaxing experience that simply feels like a warm, soothing glow on your face.',
  },
  {
    question: 'How is it done?',
    answer:
      'You will lie comfortably whilst the Dermalux canopy is placed over your face, delivering clinically proven wavelengths of light for a targeted session.',
  },
  {
    question: 'How long does it take to recover?',
    answer:
      'There is zero downtime. You can apply makeup and carry on with your normal routine straightaway.',
  },
  {
    question: 'How often should I have the treatment?',
    answer:
      'A single session delivers a brilliant boost, but we often recommend a tailored course of treatments to achieve the best long-term clinical results.',
  },
  {
    question: 'How long do the results last?',
    answer:
      'The beautiful results are cumulative and can be exceptionally long-lasting provided you maintain a consistent skincare routine and book occasional maintenance sessions.',
  },
];

const DERMALUX_PROCEDURE_STEPS = [
  {
    n: '01',
    title: 'Skin Assessment & Consultation',
    desc: 'Your clinician first assesses your skin to determine the precise wavelengths of light (Red, Blue, or Near-Infrared) needed to achieve your aesthetic goals.',
  },
  {
    n: '02',
    title: 'Cleanse & Prepare',
    desc: 'The treatment area is gently and thoroughly cleansed to prepare your skin, so the targeted light can be absorbed for maximum benefit.',
  },
  {
    n: '03',
    title: 'Relax Under the Dermalux Canopy',
    desc: 'You simply relax comfortably under the Dermalux canopy for 20 minutes whilst the targeted light works its magic — it feels just like a warm, soothing holiday in the sun, entirely without the harmful UV rays.',
  },
  {
    n: '04',
    title: 'Zero Downtime',
    desc: 'Following the session, there is absolutely zero downtime, allowing you to apply makeup and carry on with your normal routine straightaway.',
  },
];

const RELATED = [
  { title: 'Hydrafacial',     href: '/treatments/hydrafacial-leicester',      desc: 'A deep-cleansing facial that pairs beautifully with LED light therapy for an instant glow.' },
  { title: 'Vampire Facial',  href: '/treatments/vampire-facial-leicester',   desc: 'PRP microneedling, with LED light therapy helping to soothe and speed up recovery.' },
  { title: 'Chemical Peels',  href: '/treatments/chemical-peels-leicester',   desc: 'Resurfacing peels enhanced by the calming, healing power of LED light.' },
  { title: 'Skin Analysis',   href: '/treatments/skin-analysis-leicester',    desc: 'Professional assessment to guide your bespoke LED light therapy plan.' },
];

/* ── Page component ───────────────────────────────────────────── */
export default function DermaluxLEDPage() {
  const [showAllFaqs, setShowAllFaqs] = useState(false);

  return (
    <>
      {/* ════════════════════════════════════════
          1. HERO
      ════════════════════════════════════════ */}
      <section
        className={styles.hero}
        aria-label="Dermalux LED Light Therapy Leicester, hero"
        data-section-theme="dark"
      >
        {/* Breadcrumb, pinned to top of hero */}
        <div className={styles.heroBreadcrumb}>
          <Container>
            <Breadcrumb
              theme="dark"
              items={[
                { label: 'Treatments', href: '/treatments' },
                { label: 'Dermalux LED Light Therapy' },
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
                LED Light Therapy
              </m.span>

              <m.h1 className={styles.heroTitle} variants={fadeUp}>
                Dermalux LED Light Therapy in Leicester
              </m.h1>

              <m.p className={styles.heroDesc} variants={fadeUp}>
                Experience visibly healthier, beautifully glowing skin with our expert Dermalux LED
                treatments in Leicester. This award-winning, non-invasive light therapy clinically
                repairs and rejuvenates your skin, leaving you looking properly rested and radiant.
              </m.p>

              <m.div className={styles.heroCtas} variants={fadeUp}>
                <BookConsultationButton className={styles.heroCtaPrimary}>
                  Book Consultation
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
                    <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"/>
                  </svg>
                  Award-winning LED light therapy
                </span>
                <span className={styles.heroTrustDivider} aria-hidden="true" />
                <span className={styles.heroTrustItem}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"/>
                    <path d="M4.5 20.118a7.5 7.5 0 0115 0"/>
                    <path d="M18.5 15v5M16 17.5h5"/>
                  </svg>
                  Trusted by patients in Leicester
                </span>
                <span className={styles.heroTrustDivider} aria-hidden="true" />
                <span className={styles.heroTrustItem}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <circle cx="12" cy="12" r="10"/>
                    <path d="M9 12l2 2 4-4"/>
                  </svg>
                  Non-invasive &amp; pain-free
                </span>
              </m.div>
            </div>

            {/* Right: image */}
            <m.div className={styles.heroImageWrap} variants={fadeUp}>
              <Image
                src="/images/Hero Section Dermalux.jpg"
                alt="Dermalux LED light therapy for radiant skin at The One Clinic Leicester"
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
          2. WHAT IS DERMALUX LED?
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
                <h2 className={styles.combinedHeading}>What is Dermalux LED?</h2>
                <p className={styles.combinedDesc}>
                  Dermalux LED is a clinically proven, non-invasive treatment that uses the power of
                  pure light to accelerate your skin&apos;s natural repair processes. It effectively
                  treats a range of conditions, including acne, rosacea, pigmentation, and the
                  visible signs of ageing, restoring a lovely, youthful glow to your complexion.
                </p>
              </m.div>
              <m.div className={styles.combinedCtaWrapper} variants={fadeUp}>
                <BookConsultationButton className={styles.combinedCta}>
                  Book Your Skin Consultation
                </BookConsultationButton>
              </m.div>
            </m.div>

            {/* Right: image panel */}
            <m.div className={styles.whatIsVideoWrap} variants={fadeUp}>
              <Image
                src="/images/What is Dermalux.jpg"
                alt="Dermalux LED light therapy treatment at The One Clinic"
                fill
                className={styles.whatIsVideoFrame}
                sizes="(max-width: 900px) 100vw, 50vw"
              />
            </m.div>
          </m.div>
        </Container>
      </Section>

      {/* ════════════════════════════════════════
          3. HOW DOES DERMALUX LED WORK?
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
              How Does Dermalux LED Work?
            </m.h2>
          </m.div>

          <m.div
            className={styles.howTextSingle}
            variants={stagger(0.1)}
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
          >
            <m.p className={styles.howParaCentered} variants={fadeUp}>
              The treatment uses specific, proven wavelengths of light (Red, Blue, and Near-Infrared)
              that are safely absorbed by the skin cells. This light energy stimulates cellular
              renewal, boosts collagen and elastin production, and eliminates acne-causing bacteria.
              It intensely calms redness and irritation, allowing you to enjoy a spotless, healthy
              complexion in your everyday life.
            </m.p>
          </m.div>

          <m.div
            className={styles.howCoversWrap}
            variants={stagger(0.08)}
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
          >
            <m.p className={styles.howCoversLabel} variants={fadeUp}>Dermalux LED Addresses</m.p>
            <m.ul className={styles.howCoversList} role="list" variants={stagger(0.08)}>
              {HOW_ADDRESSES.map((item) => (
                <m.li key={item} className={styles.howCoversItem} variants={fadeUp}>
                  <span className={styles.howCoversCheck} aria-hidden="true">
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                      <polyline points="2,6 5,9 10,3" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </span>
                  {item}
                </m.li>
              ))}
            </m.ul>
          </m.div>
        </Container>
      </Section>

      {/* ════════════════════════════════════════
          4. CTA BANNER , Radiant glow
      ════════════════════════════════════════ */}
      <section className={styles.ctaBanner} data-section-theme="dark" aria-label="Book Dermalux LED consultation">
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
            <m.h3 className={styles.ctaBannerHeading} variants={fadeUp}>
              Achieve a Radiant Glow Today<br />with Expert Dermalux LED!
            </m.h3>
            <m.div variants={fadeUp}>
              <BookConsultationButton className={styles.ctaBannerBtn}>
                Book a Consultation
              </BookConsultationButton>
            </m.div>
          </m.div>
        </Container>
      </section>

      {/* ════════════════════════════════════════
          5. WHY CHOOSE DERMALUX LED?
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
              Why Choose Dermalux LED?
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
              You might find Dermalux LED to be a brilliant choice if you:
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
            <m.p className={styles.eligibilityClosing} variants={fadeUp}>
              Dermalux LED is suitable for all skin types, including sensitive skin. Book a
              consultation and we will tailor the perfect light therapy programme to your skin.
            </m.p>
            <m.div variants={fadeUp}>
              <BookConsultationButton className={`${styles.combinedCta} ${styles.ctaWhiteInvert}`}>
                Book Your Consultation
              </BookConsultationButton>
            </m.div>
          </m.div>
        </Container>
      </Section>

      {/* ════════════════════════════════════════
          6. AT A GLANCE
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
              Dermalux LED Treatment At A Glance
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
          7. BENEFIT OF DERMALUX LED
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
              Benefits of Dermalux LED
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
          8. DERMALUX LED PROCEDURE
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
            <m.p className={styles.eyebrowDark} variants={fadeUp}>
              The Process
            </m.p>
            <m.h2 className={styles.headingDark} variants={fadeUp}>
              Dermalux LED Procedure
            </m.h2>
          </m.div>

          <m.ol
            className={styles.journeyList}
            variants={stagger(0.12)}
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
            aria-label="Dermalux LED procedure steps"
          >
            {DERMALUX_PROCEDURE_STEPS.map((step) => (
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
          9. RESULTS, AFTERCARE & SIDE EFFECTS
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
            className={styles.resultsAfterGrid}
            variants={stagger(0.1)}
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
          >
            {/* Card 1: Results Timeline & Longevity */}
            <m.div className={styles.resultsAfterCard} variants={fadeUp}>
              <div className={styles.resultsAfterCardHead}>
                <span className={styles.resultsAfterCardIcon} aria-hidden="true">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/>
                    <polyline points="17 6 23 6 23 12"/>
                  </svg>
                </span>
                <h3 className={styles.resultsAfterCardTitle}>How Long to See Results?</h3>
              </div>
              <p className={styles.resultsAfterCardBody}>
                You will notice a visible, healthy glow immediately after your session. With a full
                course of treatments, significant improvements in acne, redness, and ageing become
                increasingly pronounced over several weeks.
              </p>
              <div className={styles.resultsAfterCardSpacer} />
              <p className={styles.resultsAfterCardNote}>
                The beautiful results are cumulative and can be long-lasting, provided you maintain a
                consistent skincare routine and book occasional maintenance sessions.
              </p>
            </m.div>

            {/* Card 2: Side Effects */}
            <m.div className={styles.resultsAfterCard} variants={fadeUp}>
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
                Dermalux LED is completely safe and clinically proven. There are virtually no side
                effects, no burning, and no irritation.
              </p>
              <div className={styles.resultsAfterCardSpacer} />
              <p className={styles.resultsAfterCardNote}>
                It is a gentle, soothing treatment that is suitable for all skin types, including the
                most sensitive skin.
              </p>
            </m.div>

            {/* Card 3: Aftercare Tips */}
            <m.div className={styles.resultsAfterCard} variants={fadeUp}>
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
                  'Keep your skin deeply hydrated',
                  'Apply a high-quality SPF daily to protect your rejuvenating skin',
                  'Follow the bespoke skincare routine your doctor recommended to maintain your lovely glow',
                ].map((item) => (
                  <li key={item} className={styles.resultsAfterCardListItem}>
                    <span className={styles.resultsAfterDot} aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
            </m.div>
          </m.div>
        </Container>
      </Section>

      {/* ════════════════════════════════════════
          10. PATIENT REVIEWS
      ════════════════════════════════════════ */}
      <Testimonials />

      {/* ════════════════════════════════════════
          11. DERMALUX LED COST IN LEICESTER
      ════════════════════════════════════════ */}
      <section className={styles.costBanner} data-section-theme="dark" aria-label="Dermalux LED cost">
        <Container>
          <m.div
            className={styles.costBannerInner}
            variants={stagger(0.12)}
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
          >
            <m.h2 className={styles.costBannerEyebrow} variants={fadeUp}>
              Dermalux LED Cost in Leicester
            </m.h2>
            <m.p className={styles.costBannerPrice} variants={fadeUp}>
              From £75
            </m.p>
            <m.p className={styles.costBannerNote} variants={fadeUp}>
              At The One Clinic, we offer Dermalux LED both as a powerful standalone therapy and as
              part of our premium, bespoke skin packages to deliver spot-on results. Standalone
              sessions start from £75 for a 20-minute session.
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
          12. BEST DERMALUX LED LEICESTER
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
              <p className={styles.eyebrowDark}>LED Light Therapy Excellence</p>
              <h2 className={styles.combinedHeading}>
                Best Dermalux LED<br />in Leicester
              </h2>
            </m.div>
            <m.p className={styles.clinicIntroDesc} variants={fadeUp}>
              The One Clinic provides the best Dermalux LED light therapy experience in Leicester. As
              a clinic that puts patients first, we apply our extensive aesthetic expertise to
              deliver tailored, relaxing treatments. We perform every session in a luxurious
              environment, helping you feel refreshed and look naturally radiant when you leave.
            </m.p>
          </m.div>
        </Container>
      </Section>

      {/* ════════════════════════════════════════
          13. MEET THE EXPERTS
      ════════════════════════════════════════ */}
      <MeetTheExperts />

      {/* ════════════════════════════════════════
          14. WHY CHOOSE THE ONE CLINIC
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
              Why Choose The One Clinic For Dermalux LED
            </m.h2>
          </m.div>

          <m.div
            className={styles.clinicReasonsGrid}
            variants={stagger(0.08)}
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
          >
            {CLINIC_REASONS.map((r) => (
              <m.div
                key={r.n}
                className={styles.clinicReasonCard}
                variants={fadeUp}
                whileHover={{ y: -6, transition: { type: 'spring', stiffness: 280, damping: 20 } }}
              >
                <span className={styles.clinicReasonNumber}>{r.n}</span>
                <p className={styles.clinicReasonText}>{r.text}</p>
              </m.div>
            ))}
          </m.div>
        </Container>
      </Section>

      {/* ════════════════════════════════════════
          15. CTA BANNER , Brighter skin
      ════════════════════════════════════════ */}
      <section className={styles.ctaBanner} data-section-theme="dark" aria-label="Book Dermalux LED treatment">
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
              Reveal Healthier, Brighter Skin<br />with Dermalux Treatment Today
            </m.h2>
            <m.p className={styles.ctaBannerSub} variants={fadeUp}>
              Experience the power of advanced LED light therapy and take the next step towards a
              clearer, more radiant complexion.
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
          16. FAQ
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
          17. BOOKING FORM
      ════════════════════════════════════════ */}
      <LeadForm />

      {/* ════════════════════════════════════════
          18. RELATED TREATMENTS
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
            {RELATED.map((r) => (
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
