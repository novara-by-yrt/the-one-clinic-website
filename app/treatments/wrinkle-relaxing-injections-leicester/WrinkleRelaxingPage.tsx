'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { m } from 'framer-motion';
import Section                from '@/components/ui/Section';
import Container              from '@/components/ui/Container';
import Accordion              from '@/components/ui/Accordion';
import BookConsultationButton from '@/components/ui/BookConsultationButton';
import TrustBadges            from '@/components/ui/TrustBadges';
import Breadcrumb             from '@/components/ui/Breadcrumb';
import LeadForm               from '@/components/sections/LeadForm';
import MeetTheExperts         from '@/components/sections/MeetTheExperts';
import Testimonials           from '@/components/sections/Testimonials';
import FinalCTA               from '@/components/sections/FinalCTA';
import { fadeUp, stagger, VIEWPORT } from '@/lib/motion';
import styles from './page.module.css';

/* ── Static data ──────────────────────────────────────────────── */
const AT_A_GLANCE = [
  {
    label: 'Treatment Time',
    value: '15 to 30 minutes',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="12" cy="12" r="10"/>
        <polyline points="12 6 12 12 16 14"/>
      </svg>
    ),
  },
  {
    label: 'First Results',
    value: '3 to 7 days',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/>
        <polyline points="17 6 23 6 23 12"/>
      </svg>
    ),
  },
  {
    label: 'Full Results',
    value: 'At 2 weeks',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"/>
        <path d="M9 12l2 2 4-4"/>
      </svg>
    ),
  },
  {
    label: 'Results Last',
    value: '3 to 4 months',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <polyline points="1 4 1 10 7 10"/>
        <path d="M3.51 15a9 9 0 1 0 .49-3.1"/>
      </svg>
    ),
  },
  {
    label: 'Downtime',
    value: 'Minimal, same day',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
        <line x1="16" y1="2" x2="16" y2="6"/>
        <line x1="8" y1="2" x2="8" y2="6"/>
        <line x1="3" y1="10" x2="21" y2="10"/>
      </svg>
    ),
  },
  {
    label: 'Treatment Cost',
    value: 'From £150',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <line x1="12" y1="1" x2="12" y2="23"/>
        <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
      </svg>
    ),
  },
];

const JOURNEY_STEPS = [
  {
    n: '01',
    title: 'Consultation & Facial Assessment',
    desc: 'A thorough review of your facial anatomy, skin quality, and dynamic wrinkles. Your GMC-registered doctor creates a personalised treatment plan aligned with your aesthetic goals and medical history.',
  },
  {
    n: '02',
    title: 'Treatment Preparation',
    desc: 'The treatment area is cleansed and injection points are precisely mapped on the skin. The procedure is quick, comfortable, and typically requires no anaesthetic.',
  },
  {
    n: '03',
    title: 'Wrinkle Relaxing Injections',
    desc: 'Botulinum toxin is precisely injected into targeted facial muscles using ultra-fine needles. Treatment takes 15 to 30 minutes with minimal discomfort.',
  },
  {
    n: '04',
    title: 'Review & Maintenance',
    desc: 'A two-week review ensures results meet your expectations. Maintenance appointments every 3 to 4 months sustain your refreshed, natural appearance over time.',
  },
];

const BENEFITS = [
  {
    title: 'Fast, Visible Results',
    desc: 'Wrinkle relaxing injections take effect within 3 to 7 days, with full results visible at 2 weeks. Fine lines and dynamic wrinkles are visibly smoothed for a refreshed, more youthful appearance.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="12" cy="12" r="10"/>
        <polyline points="12 6 12 12 16 14"/>
      </svg>
    ),
  },
  {
    title: 'Natural-Looking Finish',
    desc: 'When administered by an experienced clinician, results look completely natural. The goal is always to preserve facial expression while softening lines, never a frozen appearance.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
      </svg>
    ),
  },
  {
    title: 'Minimal Downtime',
    desc: 'Treatment takes 15 to 30 minutes and most patients return to normal activities immediately. Mild redness or swelling at injection sites settles within a few hours.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
        <line x1="16" y1="2" x2="16" y2="6"/>
        <line x1="8" y1="2" x2="8" y2="6"/>
        <line x1="3" y1="10" x2="21" y2="10"/>
      </svg>
    ),
  },
  {
    title: 'Medical-Grade Expertise',
    desc: 'All wrinkle relaxing treatments at The One Clinic are administered by GMC-registered doctors. Precision placement and personalised dosing ensure the safest, most effective outcome.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
        <circle cx="9" cy="7" r="4"/>
        <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
        <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
      </svg>
    ),
  },
  {
    title: 'Long-Term Value',
    desc: 'Results last 3 to 4 months and often extend progressively longer over repeat treatments as muscles weaken, reducing the frequency and cost of maintenance sessions.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/>
        <polyline points="17 6 23 6 23 12"/>
      </svg>
    ),
  },
  {
    title: 'Preventive as Well as Corrective',
    desc: 'Starting treatments before deep lines form can slow the ageing process. Many patients use wrinkle relaxing injections as a proactive part of their skincare routine.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
        <circle cx="12" cy="12" r="3"/>
      </svg>
    ),
  },
];

const ELIGIBILITY = [
  'Noticing forehead lines, frown lines, or crow\'s feet that bother you',
  'Wanting a refreshed, more rested look without surgery',
  'Looking for a quick, low-downtime cosmetic treatment',
  'Hoping to prevent lines from deepening over time',
  'Seeking a natural result that still preserves your expressions',
];

const TREATABLE_FACE = [
  'Forehead Lines',
  'Frown Lines (Glabellar)',
  'Crow\'s Feet',
  'Bunny Lines',
  'Lip Lines',
];

const TREATABLE_OTHER = [
  'Brow Lift',
  'Chin Dimpling',
  'Neck Bands (Platysma)',
  'Excessive Sweating (Hyperhidrosis)',
  'Jaw Slimming (Masseter)',
];

const CLINIC_REASONS = [
  { n: '01', text: 'All-in-one clinic with medical & aesthetic services.' },
  { n: '02', text: 'Highly trained, compassionate GMC-registered doctors.' },
  { n: '03', text: 'Customised treatments based on listening & expertise.' },
  { n: '04', text: 'State-of-the-art facilities & modern equipment.' },
  { n: '05', text: 'Strong reputation & excellent patient reviews.' },
  { n: '06', text: 'Comprehensive care and referrals with specialists.' },
];

const FAQS = [
  {
    question: 'What are wrinkle relaxing injections?',
    answer:
      'Wrinkle relaxing injections use a purified protein (botulinum toxin) to temporarily relax the muscles responsible for dynamic wrinkles (lines caused by facial expression such as frowning, squinting, and raising the eyebrows). Treatment smooths these lines while preserving natural facial movement.',
  },
  {
    question: 'Which areas can be treated?',
    answer:
      'The most commonly treated areas are the forehead lines, frown lines (between the brows), and crow\'s feet (around the eyes). Other areas including bunny lines, lip lines, chin dimpling, neck bands, jaw slimming, and excessive sweating can also be addressed, all discussed at your consultation.',
  },
  {
    question: 'How long do results last?',
    answer:
      'Results typically last 3 to 4 months. With regular treatments, many patients find that results last progressively longer as the muscles gradually weaken over time. A maintenance appointment is usually recommended every 3 to 4 months to sustain your results.',
  },
  {
    question: 'Do I need a referral for wrinkle relaxing injections?',
    answer:
      'No referral is needed. You can book directly with The One Clinic. A full facial assessment and medical consultation is carried out before any treatment to create a personalised plan that achieves your goals naturally and safely.',
  },
  {
    question: 'Are wrinkle relaxing injections safe?',
    answer:
      'Yes. When administered by a trained medical professional, wrinkle relaxing injections are extremely safe. At The One Clinic, all treatments are performed by GMC-registered doctors who undergo ongoing training to ensure the highest standards of safety and technique.',
  },
  {
    question: 'Will I still look natural after treatment?',
    answer:
      'Absolutely. Our doctors specialise in natural-looking results. The aim is always to soften lines and refresh your appearance while preserving your natural facial expressions. Overcorrection or a "frozen" look is never our goal.',
  },
  {
    question: 'Is there any downtime after treatment?',
    answer:
      'There is minimal to no downtime. Most patients return to their normal activities immediately. You may notice mild redness or small bumps at the injection sites, which typically resolve within a few hours.',
  },
  {
    question: 'How much do wrinkle relaxing injections cost?',
    answer:
      'Pricing starts from £150 and varies depending on the number of areas treated. An exact quote will be provided during your consultation once your personalised treatment plan has been discussed.',
  },
];

const RELATED = [
  { title: 'Dermal Fillers',    href: '/treatments/dermal-filler-leicester',    desc: 'Restore volume and define facial contours with precision filler.' },
  { title: 'Profhilo',          href: '/treatments/profhilo-leicester',          desc: 'Deep skin hydration and bio-remodelling for a natural glow.' },
  { title: 'Morpheus8',         href: '/treatments/morpheus8-leicester',         desc: 'Fractional radiofrequency skin remodelling for face and body.' },
  { title: 'HydraFacial',       href: '/treatments/hydrafacial-leicester',       desc: 'Advanced multi-step facial for deep cleansing and skin renewal.' },
];

const BA_IMAGES = [
  { src: '/images/Botox Before & After.jpg',   alt: 'Anti-wrinkle injections before and after result at The One Clinic Leicester' },
  { src: '/images/Botox Before & After-1.jpg', alt: 'Anti-wrinkle injections before and after result at The One Clinic Leicester' },
  { src: '/images/Botox Before & After-2.jpg', alt: 'Anti-wrinkle injections before and after result at The One Clinic Leicester' },
  { src: '/images/Botox Before & After-3.jpg', alt: 'Anti-wrinkle injections before and after result at The One Clinic Leicester' },
  { src: '/images/Botox Before & After-4.jpg', alt: 'Anti-wrinkle injections before and after result at The One Clinic Leicester' },
  { src: '/images/Botox Before & After-5.jpg', alt: 'Anti-wrinkle injections before and after result at The One Clinic Leicester' },
  { src: '/images/Botox Before & After-6.jpg', alt: 'Anti-wrinkle injections before and after result at The One Clinic Leicester' },
  { src: '/images/Botox Before & After-7.jpg', alt: 'Anti-wrinkle injections before and after result at The One Clinic Leicester' },
  { src: '/images/Botox Before & After-8.jpg', alt: 'Anti-wrinkle injections before and after result at The One Clinic Leicester' },
  { src: '/images/Botox Before & After-9.jpg', alt: 'Anti-wrinkle injections before and after result at The One Clinic Leicester' },
];

/* ── Page component ───────────────────────────────────────────── */
export default function WrinkleRelaxingPage() {
  const [showAllFaqs, setShowAllFaqs] = useState(false);
  const [baIndex, setBaIndex]           = useState(0);
  const [visibleCount, setVisibleCount] = useState(1);

  useEffect(() => {
    const update = () => setVisibleCount(1);
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  useEffect(() => {
    setBaIndex((i) => Math.min(i, BA_IMAGES.length - visibleCount));
  }, [visibleCount]);

  const maxBaIndex = BA_IMAGES.length - visibleCount;

  return (
    <>
      {/* ════════════════════════════════════════
          1. HERO
      ════════════════════════════════════════ */}
      <section
        className={styles.hero}
        aria-label="Wrinkle Relaxing Injections Leicester, hero"
        data-section-theme="dark"
      >
        <div className={styles.heroBreadcrumb}>
          <Container>
            <Breadcrumb
              theme="dark"
              items={[
                { label: 'Treatments', href: '/treatments' },
                { label: 'Wrinkle Relaxing Injections' },
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
            <div className={styles.heroLeft}>
              <m.span className={styles.heroCategory} variants={fadeUp}>
                Medical Aesthetics
              </m.span>

              <m.h1 className={styles.heroTitle} variants={fadeUp}>
                Wrinkle Relaxing Injections in Leicester
              </m.h1>

              <m.p className={styles.heroDesc} variants={fadeUp}>
                Expert anti-wrinkle treatment to smooth fine lines and restore a natural,
                refreshed appearance, administered by our GMC-registered doctors.
              </m.p>

              <m.div className={styles.heroCtas} variants={fadeUp}>
                <BookConsultationButton className={styles.heroCtaPrimary}>
                  Book Consultation
                </BookConsultationButton>
              </m.div>

              <m.div variants={fadeUp}>
                <TrustBadges theme="dark" />
              </m.div>

              <m.div className={styles.heroTrust} variants={fadeUp}>
                <span className={styles.heroTrustItem}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"/>
                    <path d="M4.5 20.118a7.5 7.5 0 0115 0"/>
                    <path d="M18.5 15v5M16 17.5h5"/>
                  </svg>
                  GMC-registered doctors
                </span>
                <span className={styles.heroTrustDivider} aria-hidden="true" />
                <span className={styles.heroTrustItem}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <circle cx="12" cy="12" r="10"/>
                    <polyline points="12 6 12 12 16 14"/>
                  </svg>
                  Same-day appointments available
                </span>
                <span className={styles.heroTrustDivider} aria-hidden="true" />
                <span className={styles.heroTrustItem}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"/>
                  </svg>
                  Trusted by patients across Leicester
                </span>
              </m.div>
            </div>

            <m.div className={styles.heroImageWrap} variants={fadeUp}>
              <Image
                src="/Hero Section 2 Anti-wrinkle injections.jpg"
                alt="Wrinkle relaxing injections at The One Clinic Leicester"
                fill
                priority
                className={styles.heroImage}
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className={styles.heroImageFade} aria-hidden="true" />
            </m.div>
          </m.div>
        </Container>
      </section>

      {/* ════════════════════════════════════════
          2. WHAT ARE WRINKLE RELAXING INJECTIONS?
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
            <m.div className={styles.whatIsContent} variants={stagger(0.12)}>
              <m.div className={styles.whatIsTextGroup} variants={fadeUp}>
                <p className={styles.eyebrowDark}>About This Treatment</p>
                <h2 className={styles.combinedHeading}>What are Wrinkle Relaxing Injections?</h2>
                <p className={styles.combinedDesc}>
                  Wrinkle relaxing injections use a purified botulinum toxin to gently relax the
                  facial muscles that cause dynamic expression lines. The result is smoother skin
                  across the forehead, between the brows, and around the eyes, with a natural
                  rested appearance that never looks overdone. At The One Clinic, every treatment
                  is precisely tailored to your facial anatomy by our expert doctors.
                </p>
              </m.div>

              <m.div className={styles.combinedCtaWrapper} variants={fadeUp}>
                <BookConsultationButton className={styles.combinedCta}>
                  Book Your Consultation
                </BookConsultationButton>
              </m.div>
            </m.div>

            <m.div className={styles.whatIsVideoWrap} variants={fadeUp}>
              <Image
                src="/Anti-wrinkle injections (3).jpg"
                alt="Wrinkle relaxing injections consultation at The One Clinic"
                fill
                className={styles.whatIsVideoFrame}
                sizes="(max-width: 900px) 100vw, 50vw"
              />
            </m.div>
          </m.div>
        </Container>
      </Section>

      {/* ════════════════════════════════════════
          3. AT A GLANCE
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
              Wrinkle Relaxing Injections at a Glance
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
          4. TREATMENT JOURNEY
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
            <m.p className={styles.eyebrowDark} variants={fadeUp}>What to Expect</m.p>
            <m.h2 className={styles.headingDark} variants={fadeUp}>Your Treatment Journey</m.h2>
          </m.div>

          <m.ol
            className={styles.journeyList}
            variants={stagger(0.12)}
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
            aria-label="Wrinkle relaxing injections treatment journey steps"
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
          5. BENEFITS
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
            <m.p className={styles.eyebrowDark} variants={fadeUp}>Why Choose This Treatment</m.p>
            <m.h2 className={styles.headingDark} variants={fadeUp}>
              The Benefits of Wrinkle Relaxing Injections
            </m.h2>
          </m.div>

          <m.div
            className={styles.treatedBenefitsGrid}
            variants={stagger(0.08)}
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
          >
            {BENEFITS.map((b) => (
              <m.div
                key={b.title}
                className={styles.treatedBenefitCard}
                variants={fadeUp}
                whileHover={{ y: -8, transition: { type: 'spring', stiffness: 280, damping: 18 } }}
              >
                <span className={styles.treatedBenefitIconWrap} aria-hidden="true">{b.icon}</span>
                <h3 className={styles.treatedBenefitTitle}>{b.title}</h3>
                <p className={styles.treatedBenefitDesc}>{b.desc}</p>
              </m.div>
            ))}
          </m.div>
        </Container>
      </Section>

      {/* ════════════════════════════════════════
          6. IS THIS RIGHT FOR YOU?
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
            <m.p className={styles.eyebrowLight} variants={fadeUp}>Is This Right for You?</m.p>
            <m.h2 className={styles.headingLight} variants={fadeUp}>
              Who Is a Good Candidate?
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
              Wrinkle relaxing injections may be right for you if you are:
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
              If any of these apply, wrinkle relaxing injections could be the right solution for you.
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
          7. RESULTS, AFTERCARE & SIDE EFFECTS
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
            <m.p className={styles.eyebrowLight} variants={fadeUp}>Post-Treatment</m.p>
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
            {/* Card 1 , Results Timeline */}
            <m.div className={styles.resultsAfterCard} variants={fadeUp}>
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
                Initial softening of lines appears within 3 to 7 days as the botulinum toxin begins
                to take effect. Full results are visible at around 2 weeks.
              </p>
              <div className={styles.resultsAfterCardSpacer} />
              <p className={styles.resultsAfterCardNote}>
                Results typically last 3 to 4 months. With regular treatments, many patients find
                results progressively last longer over time.
              </p>
            </m.div>

            {/* Card 2 , Side Effects */}
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
                Wrinkle relaxing injections are very safe when administered by a trained doctor.
                Most side effects are mild and temporary:
              </p>
              <ul className={styles.resultsAfterCardList} role="list">
                {[
                  'Mild redness or swelling at injection sites',
                  'Slight bruising in some cases',
                  'Headache in the first 24 hours (rare)',
                ].map((item) => (
                  <li key={item} className={styles.resultsAfterCardListItem}>
                    <span className={styles.resultsAfterDot} aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
              <div className={styles.resultsAfterCardSpacer} />
              <p className={styles.resultsAfterCardNote}>
                These effects typically resolve within a few hours. Serious complications are
                extremely rare when performed by a qualified doctor.
              </p>
            </m.div>

            {/* Card 3 , Aftercare */}
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
                  'Avoid touching or rubbing treated areas for 4 hours',
                  'Do not lie down for at least 4 hours after treatment',
                  'Avoid strenuous exercise for 24 hours',
                  'Avoid alcohol for 24 hours post-treatment',
                  'Attend your 2-week review appointment',
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
          BEFORE & AFTER
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
            <m.p className={styles.eyebrowDark} variants={fadeUp}>Real Results</m.p>
            <m.h2 className={styles.headingDark} variants={fadeUp}>
              Anti-Wrinkle Injections Before &amp; After
            </m.h2>
            <m.p className={styles.beforeAfterSubheading} variants={fadeUp}>
              Real, natural-looking results from our patients at The One Clinic, Leicester.
            </m.p>
          </m.div>

          <div className={styles.baSliderViewport} style={{ maxWidth: '480px', margin: '0 auto var(--space-5)' }}>
            <div
              className={styles.baSliderTrack}
              style={{
                transform: `translateX(-${baIndex * (100 / BA_IMAGES.length)}%)`,
                width: `${(BA_IMAGES.length / visibleCount) * 100}%`,
              }}
            >
              {BA_IMAGES.map((img) => (
                <div key={img.src} className={styles.baSlideItem}>
                  <div className={styles.baImageWrap}>
                    <Image
                      src={img.src}
                      alt={img.alt}
                      fill
                      className={styles.baImage}
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {maxBaIndex > 0 && (
            <div className={styles.baControls}>
              <button
                className={styles.baArrowBtn}
                onClick={() => setBaIndex((i) => Math.max(0, i - 1))}
                aria-label="Previous before and after image"
                disabled={baIndex === 0}
              >
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                  <path d="M12.5 15l-5-5 5-5" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
              <div className={styles.baDots} role="tablist" aria-label="Before and after carousel navigation">
                {Array.from({ length: maxBaIndex + 1 }).map((_, i) => (
                  <button
                    key={i}
                    className={`${styles.baDot} ${baIndex === i ? styles.baDotActive : ''}`}
                    onClick={() => setBaIndex(i)}
                    aria-label={`Go to image set ${i + 1}`}
                    aria-selected={baIndex === i}
                    role="tab"
                  />
                ))}
              </div>
              <button
                className={styles.baArrowBtn}
                onClick={() => setBaIndex((i) => Math.min(maxBaIndex, i + 1))}
                aria-label="Next before and after image"
                disabled={baIndex === maxBaIndex}
              >
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                  <path d="M7.5 5l5 5-5 5" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>
          )}
        </Container>
      </Section>

      {/* ════════════════════════════════════════
          8. PATIENT REVIEWS
      ════════════════════════════════════════ */}
      <Testimonials />

      {/* ════════════════════════════════════════
          9. CTA BANNER
      ════════════════════════════════════════ */}
      <section className={styles.ctaBanner} data-section-theme="dark" aria-label="Book wrinkle relaxing injections">
        <div className={styles.ctaBannerLogoWrap} aria-hidden="true">
          <Image src="/images/Background-logo.png" alt="" fill className={styles.ctaBannerLogo} sizes="100vw" />
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
              Look Refreshed.<br />Feel Confident.
            </m.h2>
            <m.p className={styles.ctaBannerSub} variants={fadeUp}>
              Book a wrinkle relaxing consultation with our expert team in Leicester.
            </m.p>
            <m.div variants={fadeUp}>
              <BookConsultationButton className={styles.ctaBannerBtn}>Book Consultation</BookConsultationButton>
            </m.div>
          </m.div>
        </Container>
      </section>

      {/* ════════════════════════════════════════
          10. TREATABLE AREAS
      ════════════════════════════════════════ */}
      <Section variant="dark" data-section-theme="dark" className={styles.conditionsSection}>
        <Container>
          <m.div
            className={styles.sectionHeaderCentre}
            variants={stagger(0.1)}
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
          >
            <m.p className={styles.eyebrowLight} variants={fadeUp}>Treatable Areas</m.p>
            <m.h2 className={styles.headingLight} variants={fadeUp}>
              What Areas Can We Treat?
            </m.h2>
            <m.p className={styles.conditionsIntro} variants={fadeUp}>
              Wrinkle relaxing injections can address a wide range of facial and body concerns,
              from the classic three areas to more advanced treatments.
            </m.p>
          </m.div>

          <m.div
            className={styles.areasColumns}
            variants={stagger(0.1)}
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
          >
            <m.div
              className={styles.areasGroup}
              variants={fadeUp}
              whileHover={{ y: -6, transition: { type: 'spring', stiffness: 280, damping: 20 } }}
            >
              <p className={styles.areasGroupLabel}>Face</p>
              <ul className={styles.areasGroupList} role="list">
                {TREATABLE_FACE.map((area) => (
                  <li key={area} className={styles.areasGroupItem}>
                    <span className={styles.areasItemDot} aria-hidden="true" />
                    {area}
                  </li>
                ))}
              </ul>
            </m.div>

            <m.div
              className={styles.areasGroup}
              variants={fadeUp}
              whileHover={{ y: -6, transition: { type: 'spring', stiffness: 280, damping: 20 } }}
            >
              <p className={styles.areasGroupLabel}>Advanced Areas</p>
              <ul className={styles.areasGroupList} role="list">
                {TREATABLE_OTHER.map((area) => (
                  <li key={area} className={styles.areasGroupItem}>
                    <span className={styles.areasItemDot} aria-hidden="true" />
                    {area}
                  </li>
                ))}
              </ul>
            </m.div>
          </m.div>
        </Container>
      </Section>

      {/* ════════════════════════════════════════
          11. CLINIC INTRO
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
              <p className={styles.eyebrowLight}>Wrinkle Relaxing Treatment</p>
              <h2 className={styles.headingLight}>
                Best Anti-Wrinkle<br />Injections in Leicester
              </h2>
            </m.div>
            <m.p className={styles.clinicIntroDesc} variants={fadeUp}>
              Experience the best wrinkle relaxing injections in Leicester at The One Clinic.
              Our GMC-registered doctors deliver safe, natural-looking anti-wrinkle treatments
              tailored to your facial anatomy. Enjoy a refreshed, rested appearance with minimal
              downtime and expert aftercare tailored to you.
            </m.p>
          </m.div>
        </Container>
      </Section>

      {/* ════════════════════════════════════════
          12. COST BANNER
      ════════════════════════════════════════ */}
      <section className={styles.costBanner} data-section-theme="dark" aria-label="Wrinkle relaxing injections cost">
        <Container>
          <m.div
            className={styles.costBannerInner}
            variants={stagger(0.12)}
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
          >
            <m.p className={styles.costBannerEyebrow} variants={fadeUp}>Wrinkle Relaxing Pricing at The One Clinic</m.p>
            <m.p className={styles.costBannerPrice} variants={fadeUp}>From £150</m.p>
            <m.p className={styles.costBannerNote} variants={fadeUp}>
              Pricing varies by number of areas treated. Full details provided at your consultation.
            </m.p>
            <m.div variants={fadeUp}>
              <BookConsultationButton className={styles.ctaBannerBtn}>Book A Consultation</BookConsultationButton>
            </m.div>
          </m.div>
        </Container>
      </section>

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
              Why Choose The One Clinic For Wrinkle Relaxing Injections
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
          14. MEET THE EXPERTS
      ════════════════════════════════════════ */}
      <MeetTheExperts />

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
          17. RELATED TREATMENTS
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
            <m.p className={styles.eyebrowDark} variants={fadeUp}>Explore More</m.p>
            <m.h2 className={styles.headingDark} variants={fadeUp}>Related Treatments</m.h2>
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
