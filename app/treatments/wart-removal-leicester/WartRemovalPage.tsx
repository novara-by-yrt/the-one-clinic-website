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
    label: 'Session Time',
    value: '15,30 minutes',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="12" cy="12" r="10"/>
        <polyline points="12 6 12 12 16 14"/>
      </svg>
    ),
  },
  {
    label: 'Treatment Options',
    value: 'Cryo / Cautery / Excision',
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
    label: 'Downtime',
    value: 'Minimal',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"/>
        <path d="M9 12l2 2 4-4"/>
      </svg>
    ),
  },
  {
    label: 'Sessions Required',
    value: 'Usually 1,3',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <polyline points="1 4 1 10 7 10"/>
        <path d="M3.51 15a9 9 0 1 0 .49-3.1"/>
      </svg>
    ),
  },
  {
    label: 'Results',
    value: 'Progressive',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/>
        <polyline points="17 6 23 6 23 12"/>
      </svg>
    ),
  },
  {
    label: 'Treatment Cost',
    value: 'From £95',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <line x1="12" y1="1" x2="12" y2="23"/>
        <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
      </svg>
    ),
  },
];

const APPROACH_STEPS = [
  {
    eyebrow: '01',
    title: 'Clinical Diagnosis & Assessment',
    desc: 'Every wart and verruca is examined by a doctor before any treatment begins. We confirm the diagnosis, identify the type, and select the most appropriate removal method for your skin and lifestyle.',
  },
  {
    eyebrow: '02',
    title: 'Tailored Removal Method',
    desc: 'We offer cryotherapy (liquid nitrogen freezing), electrocautery (heat treatment), and surgical excision , individually or in combination , to achieve the most effective and reliable outcome.',
  },
  {
    eyebrow: '03',
    title: 'Aftercare & Prevention',
    desc: 'Detailed aftercare instructions are provided after every session to promote healing, minimise the risk of recurrence, and protect the surrounding skin.',
  },
];

const JOURNEY_STEPS = [
  {
    n: '01',
    title: 'Consultation',
    desc: 'A thorough clinical review of your wart or verruca, medical history, and treatment goals. We confirm the diagnosis and explain all available options.',
  },
  {
    n: '02',
    title: 'Diagnosis',
    desc: 'The type, size, and location of the wart are assessed to determine the safest, most effective removal method for your individual situation.',
  },
  {
    n: '03',
    title: 'Treatment Session(s)',
    desc: 'The chosen removal method is carried out by our doctor in a clean clinical environment. Most sessions take 15 to 30 minutes. Local anaesthetic is used where appropriate.',
  },
  {
    n: '04',
    title: 'Healing',
    desc: 'The treated area heals over 1 to 3 weeks. Some warts require 2 to 3 sessions for complete clearance. We monitor progress and advise on follow-up if needed.',
  },
];

const TREATED_BENEFITS = [
  {
    title: 'Fast & Effective',
    desc: 'Professional wart removal is significantly more effective than over-the-counter treatments. Most warts and verrucas are treated in a single short session.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="12" cy="12" r="10"/>
        <polyline points="12 6 12 12 16 14"/>
      </svg>
    ),
  },
  {
    title: 'Medically Assessed',
    desc: 'Every lesion is clinically examined by a doctor before treatment to confirm the diagnosis and select the most appropriate removal method for your skin.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
      </svg>
    ),
  },
  {
    title: 'Multiple Treatment Options',
    desc: 'We offer several evidence-based removal methods including cryotherapy, electrocautery, and surgical excision, tailored to the type and location of your wart.',
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
    title: 'Expert Care, No Waiting',
    desc: 'Skip the NHS queue. Same-day and next-day appointments are regularly available at The One Clinic with no GP referral required.',
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
    title: 'Minimal Scarring',
    desc: 'Our doctors use precise, controlled techniques to remove warts with minimal damage to surrounding healthy skin, reducing the risk of scarring.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
        <polyline points="22 4 12 14.01 9 11.01"/>
      </svg>
    ),
  },
  {
    title: 'Prevents Spread',
    desc: 'Professional removal eliminates the HPV-infected tissue at the source, helping to prevent warts from spreading to other areas of the body or to other people.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="12" cy="12" r="10"/>
        <line x1="4.93" y1="4.93" x2="19.07" y2="19.07"/>
      </svg>
    ),
  },
];

const ELIGIBILITY_SUITABLE = [
  'Adults and children (with parental consent) with warts or verrucas',
  'Warts that have not responded to over-the-counter treatments',
  'Multiple or spreading warts requiring clinical management',
  'Warts in sensitive or high-friction areas such as the feet or hands',
  'Anyone seeking fast, reliable, medically supervised removal',
];

const ELIGIBILITY_NOT_SUITABLE = [
  'Immunocompromised patients (treatable with extra care , discuss with doctor)',
  'Some methods are not recommended during pregnancy , discuss options',
  'Very young children , please contact us to discuss the most suitable approach',
];

const WART_TYPES = [
  {
    eyebrow: '01',
    title: 'Common Warts',
    desc: 'Rough, raised growths that typically appear on hands and fingers. Caused by HPV types 2 and 4, they spread easily through skin-to-skin contact or shared surfaces.',
  },
  {
    eyebrow: '02',
    title: 'Plantar Verrucas',
    desc: 'Flat, inward-growing warts on the soles of the feet. They can be painful when walking or standing, and are commonly acquired in wet communal areas.',
  },
  {
    eyebrow: '03',
    title: 'Plane Warts',
    desc: 'Flat, smooth warts that often appear in large numbers on the face, neck, hands, or legs. They are smaller and less rough than common warts.',
  },
  {
    eyebrow: '04',
    title: 'Filiform Warts',
    desc: 'Long, narrow warts that project outward from the skin surface. They commonly appear around the mouth, nose, and eyelids.',
  },
  {
    eyebrow: '05',
    title: 'Periungual Warts',
    desc: 'Warts that develop around and under the fingernails and toenails. They can distort nail growth and are particularly stubborn to treat.',
  },
  {
    eyebrow: '06',
    title: 'Mosaic Warts',
    desc: 'Clusters of closely grouped plantar warts that form a mosaic-like pattern on the soles of the feet. Often more resistant to treatment than individual warts.',
  },
  {
    eyebrow: '07',
    title: 'Genital Warts',
    desc: 'Soft, flesh-coloured growths in the genital area caused by HPV. These require a GP assessment and are treated with care and sensitivity.',
  },
];

const BODY_AREAS = [
  'Hands & fingers',
  'Feet (plantar)',
  'Face',
  'Around nails',
  'Knees & elbows',
  'Genital area (GP assessment)',
];

const REMOVAL_METHODS = [
  'Cryotherapy (liquid nitrogen)',
  'Electrocautery',
  'Surgical excision',
  'Combination approach',
  'Multi-session protocol',
  'Salicylic acid (adjunct)',
];

const CLINIC_REASONS = [
  { n: '01', text: 'All-in-one clinic with medical & aesthetic services.' },
  { n: '02', text: 'Highly trained, compassionate doctors.' },
  { n: '03', text: 'Customised treatments based on listening & expertise.' },
  { n: '04', text: 'State-of-the-art facilities & modern equipment.' },
  { n: '05', text: 'Strong reputation & excellent reviews.' },
  { n: '06', text: 'Comprehensive care and referrals with specialists.' },
];

const FAQS = [
  {
    question: 'What wart removal treatments are available at The One Clinic?',
    answer:
      'We offer cryotherapy (liquid nitrogen freezing), electrocautery (heat treatment), and surgical excision. The most appropriate method depends on the size, type, and location of your wart, which will be assessed at your consultation before treatment is carried out.',
  },
  {
    question: 'Is wart removal painful?',
    answer:
      'The level of discomfort varies depending on the treatment method. Cryotherapy may cause a brief stinging or burning sensation. Surgical removal and cauterisation are carried out under local anaesthetic so you remain comfortable throughout.',
  },
  {
    question: 'How many sessions will I need?',
    answer:
      'Many warts can be cleared in a single session. Stubborn or deeply rooted warts , particularly plantar verrucas , may require 2 to 3 sessions. Your doctor will advise on the expected number of treatments during your consultation.',
  },
  {
    question: 'Do I need a GP referral for wart removal?',
    answer:
      'No referral is needed. You can book directly with The One Clinic. A clinical assessment is included before treatment to confirm the diagnosis and the most suitable removal approach for you.',
  },
  {
    question: 'How quickly can I get an appointment?',
    answer:
      'Same-day and next-day appointments are often available. Contact The One Clinic and our team will arrange a consultation at the earliest convenient time.',
  },
  {
    question: 'What should I expect after wart removal?',
    answer:
      'After cryotherapy a blister may form , this is normal and part of the healing process. Keep the area clean and dry, and avoid picking the treated skin. The area typically heals within 1 to 3 weeks. Your doctor will provide specific aftercare instructions at your appointment.',
  },
];

const RELATED = [
  { title: 'Skin Lesion Removal', href: '/treatments/skin-lesion-removal', desc: 'Expert removal of a wide range of benign skin lesions.' },
  { title: 'Skin Tags Removal',   href: '/treatments/skin-tags',           desc: 'Safe and effective removal of skin tags by our clinical team.' },
  { title: 'Minor Surgery',       href: '/treatments/minor-surgery-leicester',       desc: 'A wide range of minor surgical procedures carried out in clinic.' },
  { title: 'Dermatologist',       href: '/treatments/dermatologist-leicester',       desc: 'Specialist skin assessment and treatment from our expert team.' },
];

/* ── Page component ───────────────────────────────────────────── */
export default function WartRemovalPage() {
  const [showAllFaqs, setShowAllFaqs] = useState(false);

  return (
    <>
      {/* ════════════════════════════════════════
          1. HERO
      ════════════════════════════════════════ */}
      <section
        className={styles.hero}
        aria-label="Wart Removal Leicester, hero"
        data-section-theme="dark"
      >
        {/* Breadcrumb, pinned to top of hero */}
        <div className={styles.heroBreadcrumb}>
          <Container>
            <Breadcrumb
              theme="dark"
              items={[
                { label: 'Treatments', href: '/treatments' },
                { label: 'Wart Removal Leicester' },
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
                Skin Lesion Treatments
              </m.span>

              <m.h1 className={styles.heroTitle} variants={fadeUp}>
                Wart Removal Leicester
              </m.h1>

              <m.p className={styles.heroDesc} variants={fadeUp}>
                Fast, safe &amp; effective removal of warts &amp; verrucas by our expert clinical
                team. Medically assessed, no GP referral required.
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
                  GMC-registered doctors
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
                  Same-day appointments available
                </span>
              </m.div>
            </div>

            {/* Right: image */}
            <m.div className={styles.heroImageWrap} variants={fadeUp}>
              <Image
                src="/images/Hero Section Wart Removal.jpg"
                alt="Wart removal treatment at The One Clinic Leicester"
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
          2. WHAT ARE WARTS & VERRUCAS?
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
                <h2 className={styles.combinedHeading}>What are Warts &amp; Verrucas?</h2>
                <p className={styles.combinedDesc}>
                  Warts and verrucas are benign skin growths caused by strains of the human
                  papillomavirus (HPV). They can appear anywhere on the body and come in several
                  forms , common warts, plantar verrucas, plane warts, and filiform warts.
                  While not medically dangerous, they are contagious and can be cosmetically
                  bothersome or painful. At The One Clinic, our doctors assess each lesion and
                  apply the most effective clinical removal method for a faster, more reliable result.
                </p>
              </m.div>
              <m.div className={styles.combinedCtaWrapper} variants={fadeUp}>
                <BookConsultationButton className={styles.combinedCta}>
                  Book Your Consultation
                </BookConsultationButton>
              </m.div>
            </m.div>

            {/* Right: image panel */}
            <m.div className={styles.whatIsVideoWrap} variants={fadeUp}>
              <Image
                src="/images/What is Wart Removal.jpg"
                alt="Doctor consultation for wart removal at The One Clinic"
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
              Wart Removal at a Glance
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
          4. OUR WART REMOVAL APPROACH
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
              Our Approach
            </m.p>
            <m.h2 className={styles.headingLight} variants={fadeUp}>
              Our Wart Removal Approach
            </m.h2>
            <m.p className={styles.combinationIntroText} variants={fadeUp}>
              At The One Clinic, every wart removal follows a structured three-step process
              to ensure safe, effective, and lasting results.
            </m.p>
          </m.div>

          <m.div
            className={styles.techCardsGrid}
            variants={stagger(0.1)}
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
          >
            {APPROACH_STEPS.map((card) => (
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

          <m.div
            className={styles.finalResultsBanner}
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
          >
            <p className={styles.finalResultsEyebrow}>Our Promise</p>
            <p className={styles.finalResultsText}>
              By combining clinical expertise with the right removal method for each patient,
              we deliver safe, effective wart removal with minimal discomfort and a low risk
              of recurrence.
            </p>
          </m.div>
        </Container>
      </Section>

      {/* ════════════════════════════════════════
          5. TREATMENT JOURNEY
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
              Your Treatment Journey
            </m.h2>
          </m.div>

          <m.ol
            className={styles.journeyList}
            variants={stagger(0.12)}
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
            aria-label="Wart removal treatment journey steps"
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
          6. BENEFITS
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
              Benefits of Professional Wart Removal
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
          7. ELIGIBILITY
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
              Who is Suitable for Wart Removal?
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
              Wart removal at The One Clinic is suitable if you are:
            </m.p>
            <m.ul className={styles.eligibilityList} role="list" variants={stagger(0.1)}>
              {ELIGIBILITY_SUITABLE.map((item) => (
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
            <m.p className={styles.eligibilityIntro} variants={fadeUp}>
              Treatment may require extra care or discussion if you are:
            </m.p>
            <m.ul className={styles.eligibilityList} role="list" variants={stagger(0.1)}>
              {ELIGIBILITY_NOT_SUITABLE.map((item) => (
                <m.li key={item} className={styles.eligibilityItem} variants={fadeUp}>
                  <span className={styles.eligibilityCheck} aria-hidden="true">
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <line x1="3" y1="3" x2="11" y2="11" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round"/>
                      <line x1="11" y1="3" x2="3" y2="11" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round"/>
                    </svg>
                  </span>
                  <span>{item}</span>
                </m.li>
              ))}
            </m.ul>
            <m.p className={styles.eligibilityClosing} variants={fadeUp}>
              Not sure if wart removal is right for you? Book a consultation and our doctors will advise you.
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
          8. HOW IT WORKS , THE SCIENCE
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
              How Does Wart Removal Work?
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
              Warts are caused by the human papillomavirus (HPV) infecting the top layers of skin
              and causing cells to multiply rapidly. Clinical removal targets the infected tissue
              directly. Cryotherapy uses liquid nitrogen at extreme cold temperatures to freeze and
              destroy the HPV-infected cells, causing the wart to blister and fall away. Electrocautery
              uses controlled heat to burn away the wart tissue with precision.
            </m.p>
            <m.p className={styles.howPara} variants={fadeUp}>
              Surgical excision removes the entire wart under local anaesthetic , the preferred
              approach for larger or more deeply rooted growths. Salicylic acid may be used
              as an adjunct between sessions to soften and break down the wart tissue. By
              targeting the HPV virus at the root, clinical treatment significantly reduces
              the risk of recurrence compared to over-the-counter remedies.
            </m.p>
          </m.div>

          <m.div
            className={styles.howCoversWrap}
            variants={stagger(0.08)}
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
          >
            <m.p className={styles.howCoversLabel} variants={fadeUp}>Removal Methods Available</m.p>
            <m.ul className={styles.howCoversList} role="list" variants={stagger(0.08)}>
              {[
                'Cryotherapy (liquid nitrogen)',
                'Electrocautery',
                'Surgical excision',
                'Salicylic acid (adjunct)',
                'Combination approach',
                'Multi-session protocol',
              ].map((item) => (
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
          9. RESULTS & AFTERCARE
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
              What to Expect After Wart Removal
            </m.h2>
          </m.div>

          <m.div
            className={styles.resultsAfterGrid}
            variants={stagger(0.1)}
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
          >
            {/* Card 1: Healing Timeline */}
            <m.div className={styles.resultsAfterCard} variants={fadeUp}>
              <div className={styles.resultsAfterCardHead}>
                <span className={styles.resultsAfterCardIcon} aria-hidden="true">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/>
                    <polyline points="17 6 23 6 23 12"/>
                  </svg>
                </span>
                <h3 className={styles.resultsAfterCardTitle}>Healing Timeline</h3>
              </div>
              <p className={styles.resultsAfterCardBody}>
                After cryotherapy, a blister may form within 24 hours , this is a normal and
                expected part of the healing process. The treated area typically heals within
                1 to 3 weeks, depending on the size and location of the wart.
              </p>
              <div className={styles.resultsAfterCardSpacer} />
              <p className={styles.resultsAfterCardNote}>
                Stubborn or deeply rooted warts may require 2 to 3 sessions for complete
                clearance. Your doctor will monitor progress and advise on follow-up.
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
                <h3 className={styles.resultsAfterCardTitle}>Common Side Effects</h3>
              </div>
              <p className={styles.resultsAfterCardBody}>
                Wart removal is safe and well-tolerated. Most patients experience only
                mild, temporary effects:
              </p>
              <ul className={styles.resultsAfterCardList} role="list">
                {[
                  'Blistering at the treated site (cryotherapy)',
                  'Mild redness, swelling, or tenderness',
                  'Minor scabbing or crusting as the area heals',
                ].map((item) => (
                  <li key={item} className={styles.resultsAfterCardListItem}>
                    <span className={styles.resultsAfterDot} aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
              <div className={styles.resultsAfterCardSpacer} />
              <p className={styles.resultsAfterCardNote}>
                These effects are temporary and typically resolve within a few days to weeks.
                Serious complications are rare when performed by a trained doctor.
              </p>
            </m.div>

            {/* Card 3: Aftercare */}
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
                  'Keep the treated area clean and dry',
                  'Avoid picking or bursting any blisters',
                  'Do not apply makeup or creams unless advised',
                  'Follow all specific aftercare instructions from your doctor',
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
          10. WART TYPES WE TREAT
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
            <m.p className={styles.eyebrowDark} variants={fadeUp}>
              Wart Types
            </m.p>
            <m.h2 className={styles.headingDark} variants={fadeUp}>
              Types of Warts We Treat
            </m.h2>
            <m.p className={styles.beforeAfterSubheading} variants={fadeUp}>
              Our doctors are experienced in treating all common types of warts and verrucas
              at The One Clinic, Leicester.
            </m.p>
          </m.div>

          <m.div
            className={styles.treatedBenefitsGrid}
            variants={stagger(0.08)}
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
          >
            {WART_TYPES.map((wart) => (
              <m.div
                key={wart.title}
                className={styles.treatedBenefitCard}
                variants={fadeUp}
                whileHover={{ y: -8, transition: { type: 'spring', stiffness: 280, damping: 18 } }}
              >
                <span className={styles.treatedBenefitIconWrap} aria-hidden="true">
                  <span style={{ fontSize: '1.125rem', fontWeight: 800, color: 'rgba(255,255,255,0.7)', letterSpacing: '-0.02em' }}>
                    {wart.eyebrow}
                  </span>
                </span>
                <h3 className={styles.treatedBenefitTitle}>{wart.title}</h3>
                <p className={styles.treatedBenefitDesc}>{wart.desc}</p>
              </m.div>
            ))}
          </m.div>
        </Container>
      </Section>

      {/* ════════════════════════════════════════
          11. PATIENT REVIEWS
      ════════════════════════════════════════ */}
      <Testimonials />

      {/* ════════════════════════════════════════
          12. CTA BANNER
      ════════════════════════════════════════ */}
      <section className={styles.ctaBanner} data-section-theme="dark" aria-label="Book wart removal consultation">
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
              Don&apos;t Let Warts Hold You Back.
            </m.h2>
            <m.p className={styles.ctaBannerSub} variants={fadeUp}>
              Book a wart removal consultation with our expert clinical team in Leicester.
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
          13. TREATMENT LOCATIONS
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
            <m.p className={styles.eyebrowLight} variants={fadeUp}>
              Treatment Locations
            </m.p>
            <m.h2 className={styles.headingLight} variants={fadeUp}>
              Where Can Warts Be Treated?
            </m.h2>
            <m.p className={styles.conditionsIntro} variants={fadeUp}>
              We treat warts and verrucas across all areas of the body using the most appropriate
              removal method for each location.
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
              <p className={styles.areasGroupLabel}>Body Areas</p>
              <ul className={styles.areasGroupList} role="list">
                {BODY_AREAS.map((area) => (
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
              <p className={styles.areasGroupLabel}>Removal Methods</p>
              <ul className={styles.areasGroupList} role="list">
                {REMOVAL_METHODS.map((method) => (
                  <li key={method} className={styles.areasGroupItem}>
                    <span className={styles.areasItemDot} aria-hidden="true" />
                    {method}
                  </li>
                ))}
              </ul>
            </m.div>
          </m.div>
        </Container>
      </Section>

      {/* ════════════════════════════════════════
          14. BEST LEICESTER EXPERIENCE
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
              <p className={styles.eyebrowDark}>Wart Removal Treatment</p>
              <h2 className={styles.combinedHeading}>
                Best Wart Removal<br />Leicester Experience
              </h2>
            </m.div>
            <m.p className={styles.clinicIntroDesc} variants={fadeUp}>
              Experience expert wart and verruca removal at The One Clinic in Leicester. Our doctors
              deliver safe, clinically assessed removal using proven methods , cryotherapy,
              cautery, or excision , tailored to your individual needs. Enjoy fast access,
              no waiting lists, and professional aftercare to support lasting results.
            </m.p>
          </m.div>
        </Container>
      </Section>

      {/* ════════════════════════════════════════
          15. COST BANNER
      ════════════════════════════════════════ */}
      <section className={styles.costBanner} data-section-theme="dark" aria-label="Wart removal cost">
        <Container>
          <m.div
            className={styles.costBannerInner}
            variants={stagger(0.12)}
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
          >
            <m.p className={styles.costBannerEyebrow} variants={fadeUp}>
              Wart Removal Cost at The One Clinic
            </m.p>
            <m.p className={styles.costBannerPrice} variants={fadeUp}>
              Wart Removal Starts From £95
            </m.p>
            <m.p className={styles.costBannerNote} variants={fadeUp}>
              The final price depends on the number, type, and location of warts, as well as
              the removal method chosen. Full details will be provided at your consultation.
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
          16. WHY CHOOSE THE ONE CLINIC
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
              Why Choose The One Clinic For Wart Removal
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
          17. MEET THE EXPERTS
      ════════════════════════════════════════ */}
      <MeetTheExperts />

      {/* ════════════════════════════════════════
          18. FAQ
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
          19. BOOKING FORM
      ════════════════════════════════════════ */}
      <LeadForm />

      {/* ════════════════════════════════════════
          20. RELATED TREATMENTS
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
