'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
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
    label: 'Science-Driven',
    value: 'Clinically Researched',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
      </svg>
    ),
  },
  {
    label: 'Product Strength',
    value: 'Pharmaceutical-Grade',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <polyline points="1 4 1 10 7 10"/>
        <path d="M3.51 15a9 9 0 1 0 .49-3.1"/>
      </svg>
    ),
  },
  {
    label: 'Clean Science',
    value: 'No Harsh Additives',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"/>
        <path d="M9 12l2 2 4-4"/>
      </svg>
    ),
  },
  {
    label: 'Clinical Results',
    value: 'Fast Visible Improvement',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/>
        <polyline points="17 6 23 6 23 12"/>
      </svg>
    ),
  },
  {
    label: 'Results Timeline',
    value: '2–6 Weeks',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <line x1="12" y1="1" x2="12" y2="23"/>
        <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
      </svg>
    ),
  },
  {
    label: 'Founder',
    value: 'Award-Winning Physician',
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
    title: 'Comprehensive Skin Analysis',
    desc: 'We begin with an in-depth consultation and skin assessment to understand your skin type, concerns, sensitivities, and lifestyle. This guides our personalised product recommendation.',
  },
  {
    n: '02',
    title: 'Bespoke Formulation Prescription',
    desc: 'Based on your analysis, our clinical experts prescribe a personalised CellDerma regimen tailored to address your specific skin concerns with clinically active ingredient strengths.',
  },
  {
    n: '03',
    title: 'Product Selection & Education',
    desc: 'We select the right products from CellDerma\'s range and provide comprehensive guidance on how to use them safely and effectively at home for optimal results.',
  },
  {
    n: '04',
    title: 'Progressive Results & Support',
    desc: 'Within 2–6 weeks, your skin shows dramatic improvements. We monitor your progress and adjust your regime as needed, providing ongoing professional support throughout your journey.',
  },
];

const APPROACH_CARDS = [
  {
    eyebrow: '01',
    title: 'Comprehensive Skin Analysis',
    desc: 'Every skin is unique. We conduct a thorough assessment of your skin concerns, barrier function, sensitivities, and goals to design a truly personalised regime.',
  },
  {
    eyebrow: '02',
    title: 'Award-Winning Formulations',
    desc: 'Created by Dr. Dev Patel, an award-winning aesthetic physician, using pharmaceutical-grade actives at clinical concentrations for clinically proven results.',
  },
  {
    eyebrow: '03',
    title: 'Progressive Skincare Regimen',
    desc: 'A step-by-step introduction to active ingredients ensures your skin tolerates and thrives on your regime, with adjustments as your skin improves.',
  },
];

const ELIGIBILITY = [
  'Anyone seeking science-driven skincare for real skin improvement',
  'Ageing skin with fine lines, loss of elasticity, or dullness',
  'Hyperpigmentation and sun damage',
  'Acne-prone or congested skin',
  'Post-procedure skin support and recovery',
  'Sensitive skin requiring professional guidance',
];

const TREATED_BENEFITS = [
  {
    title: 'Pharmaceutical-Grade Formulations',
    desc: 'CellDerma products contain pharmaceutical-grade actives at clinical concentrations far stronger than retail skincare, delivering measurable clinical results.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
      </svg>
    ),
  },
  {
    title: 'Personalised Prescriptions',
    desc: 'Each regimen is tailored to your skin type and concerns. No one-size-fits-all approach, your products are chosen for your skin\'s unique needs.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/>
        <polyline points="17 6 23 6 23 12"/>
      </svg>
    ),
  },
  {
    title: 'Award-Winning Science',
    desc: 'Created by Dr. Dev Patel, a globally-reputed aesthetic physician and multiple award winner, CellDerma delivers visible improvements in skin texture, tone, and radiance.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M12 2a10 10 0 0 1 10 10c0 5.52-4.48 10-10 10S2 17.52 2 12"/>
        <path d="M12 6v6l4 2"/>
      </svg>
    ),
  },
  {
    title: 'Complements Clinical Treatments',
    desc: 'CellDerma skincare synergises perfectly with in-clinic treatments like chemical peels, Morpheus8, and laser resurfacing to amplify and prolong results.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="12" cy="12" r="10"/>
        <circle cx="12" cy="12" r="4"/>
        <line x1="4.93" y1="4.93" x2="19.07" y2="19.07"/>
      </svg>
    ),
  },
  {
    title: 'Visible Transformation',
    desc: 'Dramatic improvements often appear within 2–6 weeks, with optimal results visible much sooner than traditional skincare. Your skin becomes noticeably firmer, clearer, and more radiant.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
        <circle cx="12" cy="12" r="3"/>
      </svg>
    ),
  },
  {
    title: 'Professional Support',
    desc: 'Ongoing guidance from our clinical team ensures your regimen is working optimally. We adjust, troubleshoot, and support your journey every step of the way.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
        <polyline points="22 4 12 14.01 9 11.01"/>
      </svg>
    ),
  },
];

const SKIN_CONCERNS_DATA = [
  {
    group: 'Skin Issues',
    items: [
      'Fine lines and wrinkles',
      'Pigmentation & sun damage',
      'Acne & congestion',
      'Sensitivity & redness',
      'Loss of elasticity',
      'Dull & tired skin',
      'Post-procedure recovery',
    ],
  },
  {
    group: 'Product Selection',
    items: [
      'Targeted for each concern',
      'Customised active strengths',
      'Professional supervision',
      'Synergistic combinations',
      'Progressive regimen approach',
      'Maintenance support',
      'Adjustment as needed',
    ],
  },
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
    question: 'What is CellDerma skincare?',
    answer:
      'CellDerma is a science-driven, professional-grade skincare range created by award-winning aesthetic physician Dr. Dev Patel. It contains pharmaceutical-grade active ingredients at clinical concentrations, including potent actives for accelerated skin transformation.',
  },
  {
    question: 'How is CellDerma different from high-street skincare?',
    answer:
      'CellDerma products contain active ingredients at much higher concentrations than retail products, formulated with obsessive attention to detail and clean science principles. These pharmaceutical-grade formulations deliver visible results within 2–6 weeks.',
  },
  {
    question: 'What skin concerns can CellDerma treat?',
    answer:
      'CellDerma addresses ageing (fine lines, loss of firmness), pigmentation and sun damage, acne and congestion, sensitivity and rosacea, and overall skin radiance. Your personalised regime targets your specific concerns with precision.',
  },
  {
    question: 'How do I get started with CellDerma at The One Clinic?',
    answer:
      'Book a skin consultation with our team. We conduct a thorough skin analysis to understand your concerns and goals, then prescribe a bespoke CellDerma regimen. Products are available to purchase directly from us, with ongoing professional support.',
  },
  {
    question: 'How long before I see results?',
    answer:
      'CellDerma is formulated for fast results. Many patients see dramatic improvements within 2–6 weeks. Optimal results are typically achieved within 8–12 weeks with consistent use. Your skin becomes noticeably firmer, clearer, and more radiant.',
  },
  {
    question: 'Is CellDerma suitable for sensitive skin?',
    answer:
      'Yes. We prescribe tailored regimens for sensitive skin, with professional guidance to ensure optimal tolerance. Our team monitors your progress and adjusts as your skin strengthens.',
  },
];

const EXPERTS = [
  {
    name: 'Dr Sumit Virmani',
    credentials: ['MBBS', 'MRCGP', 'Co-Founder'],
    image: '/DR-SUMIT.jpg',
    alt: 'Dr Sumit Virmani, Co-Founder, The One Clinic',
    bio: [
      'Dr Sumit Virmani, the co-founder of The One Clinic, brings over 15 years of medical expertise, including more than a decade as a trusted local GP. With advanced skills in minor surgery and a keen eye for detail, Dr Virmani is passionate about patient care and achieving outstanding results.',
      'His growing interest in aesthetic medicine, particularly body contouring and hair rejuvenation, reflects his commitment to helping patients look and feel their best. Alongside his ongoing GP practice, Dr Virmani continues to offer safe, effective, and transformative aesthetic treatments at The One Clinic.',
    ],
  },
  {
    name: 'Dr Gunjan Bedi',
    credentials: ['MBBS', 'MRCpsych', 'MRCGP', 'BCAM'],
    image: '/DR-GUNJAN.jpg',
    alt: 'Dr Gunjan Bedi, General Practitioner and Aesthetics Practitioner, The One Clinic',
    bio: [
      'Dr Gunjan Bedi is a highly skilled, advanced aesthetics practitioner at The One Clinic. She is a highly experienced doctor, having worked in the medical sector for over 20 years, with over 10 years service as a GP.',
      'Dr Bedi brings a unique and comprehensive perspective to patient care, combining qualifications in General Practice, Psychiatry, and Aesthetic Medicine. Her breadth of expertise allows her to take a truly holistic approach, addressing both the physical and psychological dimensions of each patient\'s wellbeing.',
    ],
  },
];

const RELATED = [
  { title: 'Skin Analysis',                href: '/treatments/skin-analysis',         desc: 'Professional assessment to guide your skincare and treatment plan.' },
  { title: 'Chemical Peels',               href: '/treatments/chemical-peels',       desc: 'In-clinic exfoliation to amplify the effects of your home care regimen.' },
  { title: 'Endolift Laser',               href: '/treatments/endolift',             desc: 'Skin tightening and lifting to complement your skincare results.' },
  { title: 'Dermatologist Consultation',   href: '/treatments/dermatologist',        desc: 'Expert diagnosis and personalised treatment for complex skin conditions.' },
];

/* ── Page component ───────────────────────────────────────────── */
export default function CellDermaPage() {
  const [showAllFaqs, setShowAllFaqs] = useState(false);

  return (
    <>
      {/* ════════════════════════════════════════
          1. HERO
      ════════════════════════════════════════ */}
      <section
        className={styles.hero}
        aria-label="CellDerma Skincare Leicester, hero"
        data-section-theme="dark"
      >
        {/* Breadcrumb, pinned to top of hero */}
        <div className={styles.heroBreadcrumb}>
          <Container>
            <Breadcrumb
              theme="dark"
              items={[
                { label: 'Treatments', href: '/treatments' },
                { label: 'Skincare, CellDerma' },
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
            {/* Left: text */}
            <div className={styles.heroLeft}>
              <motion.span className={styles.heroCategory} variants={fadeUp}>
                Science-Driven Skincare
              </motion.span>

              <motion.h1 className={styles.heroTitle} variants={fadeUp}>
                CellDerma Skincare in Leicester
              </motion.h1>

              <motion.p className={styles.heroDesc} variants={fadeUp}>
                Award-winning medical-grade skincare created by aesthetic physician Dr. Dev Patel. Fast-acting formulations with clinically active ingredients for transformative results.
              </motion.p>

              <motion.div className={styles.heroCtas} variants={fadeUp}>
                <BookConsultationButton className={styles.heroCtaPrimary}>
                  Book Consultation
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
                  Created by award-winning physician
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
                  Pharmaceutical-grade ingredients
                </span>
              </motion.div>
            </div>

            {/* Right: image */}
            <motion.div className={styles.heroImageWrap} variants={fadeUp}>
              <Image
                src="/images/CellDerma 2.jpg"
                alt="CellDerma skincare products"
                fill
                priority
                className={styles.heroImage}
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              {/* Subtle bottom-fade to blend with section */}
              <div className={styles.heroImageFade} aria-hidden="true" />
            </motion.div>
          </motion.div>
        </Container>
      </section>

      {/* ════════════════════════════════════════
          2. WHAT IS CELLDERMA?
      ════════════════════════════════════════ */}
      <Section variant="light" data-section-theme="light" className={styles.sectionGray}>
        <Container>
          <motion.div
            className={styles.whatIsGrid}
            variants={stagger(0.12)}
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
          >
            {/* Left: text */}
            <motion.div className={styles.whatIsContent} variants={stagger(0.12)}>
              <motion.div className={styles.whatIsTextGroup} variants={fadeUp}>
                <p className={styles.eyebrowDark}>About This Treatment</p>
                <h2 className={styles.combinedHeading}>What is CellDerma?</h2>
                <p className={styles.combinedDesc}>
                  CellDerma is a science-driven medical-grade skincare range created by award-winning aesthetic physician Dr. Dev Patel.
                  Each product is meticulously formulated with pharmaceutical-grade active ingredients at clinical concentrations
                  for clinically proven transformation. We prescribe a personalised home care regimen based on your skin analysis,
                  ensuring you receive exactly what your skin needs for real, fast, measurable improvement.
                </p>
              </motion.div>
              <motion.div className={styles.combinedCtaWrapper} variants={fadeUp}>
                <BookConsultationButton className={styles.combinedCta}>
                  Book Your Skin Consultation
                </BookConsultationButton>
              </motion.div>
            </motion.div>

            {/* Right: image panel */}
            <motion.div className={styles.whatIsVideoWrap} variants={fadeUp}>
              <Image
                src="/images/Cellderma 1.jpg"
                alt="CellDerma skincare consultation at The One Clinic"
                fill
                className={styles.whatIsVideoFrame}
                sizes="(max-width: 900px) 100vw, 50vw"
              />
            </motion.div>
          </motion.div>
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
          <motion.div
            className={styles.sectionHeaderCentre}
            variants={stagger(0.1)}
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
          >
            <motion.p className={styles.eyebrowDark} variants={fadeUp}>Quick Facts</motion.p>
            <motion.h2 className={styles.headingDark} variants={fadeUp}>
              CellDerma at a Glance
            </motion.h2>
          </motion.div>

          <motion.div
            className={styles.glanceStandaloneGrid}
            variants={stagger(0.08)}
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
          >
            {AT_A_GLANCE.map((item) => (
              <motion.div key={item.label} className={styles.glanceCard} variants={fadeUp}>
                <span className={styles.glanceIcon}>{item.icon}</span>
                <span className={styles.glanceLabel}>{item.label}</span>
                <span className={styles.glanceValue}>{item.value}</span>
              </motion.div>
            ))}
          </motion.div>
        </Container>
      </Section>

      {/* ════════════════════════════════════════
          4. OUR CELLDERMA APPROACH
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
              The CellDerma Approach
            </motion.h2>
            <motion.p className={styles.combinationIntroText} variants={fadeUp}>
              At The One Clinic, we believe skincare should be science-driven, professional, and progressive.
              Our three-step CellDerma approach ensures your skin receives exactly what it needs.
            </motion.p>
          </motion.div>

          <motion.div
            className={styles.techCardsGrid}
            variants={stagger(0.1)}
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
          >
            {APPROACH_CARDS.map((card) => (
              <motion.div
                key={card.title}
                className={styles.techCard}
                variants={fadeUp}
                whileHover={{ y: -8, transition: { type: 'spring', stiffness: 280, damping: 18 } }}
              >
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
            <p className={styles.finalResultsEyebrow}>Best Results</p>
            <p className={styles.finalResultsText}>
              When combined, our comprehensive analysis, award-winning formulations, and progressive regimen
              deliver transformative results, addressing multiple skin concerns simultaneously for visibly healthier,
              clearer, and more radiant skin in as little as 2–6 weeks.
            </p>
          </motion.div>
        </Container>
      </Section>

      {/* ════════════════════════════════════════
          5. YOUR CELLDERMA JOURNEY
      ════════════════════════════════════════ */}
      <Section variant="light" data-section-theme="light" className={styles.journeySection}>
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
              Your CellDerma Journey
            </motion.h2>
          </motion.div>

          <motion.ol
            className={styles.journeyList}
            variants={stagger(0.12)}
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
            aria-label="CellDerma skincare journey steps"
          >
            {JOURNEY_STEPS.map((step) => (
              <motion.li key={step.n} className={styles.journeyStep} variants={fadeUp}>
                <div className={styles.stepLeft}>
                  <div className={styles.stepNumCircle} aria-hidden="true">{step.n}</div>
                  <div className={styles.stepConnector} aria-hidden="true" />
                </div>
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
          6. TREATED BENEFITS
      ════════════════════════════════════════ */}
      <Section variant="light" data-section-theme="light" className={styles.whiteBgSection}>
        <div className={styles.whiteBgWrap} aria-hidden="true">
          <Image src="/bg-image-white.png" alt="" fill className={styles.whiteBgImg} sizes="100vw" />
        </div>
        <Container className={styles.whiteBgContent}>
          <motion.div
            className={styles.sectionHeaderCentre}
            variants={stagger(0.1)}
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
          >
            <motion.h2 className={styles.headingDark} variants={fadeUp}>
              CellDerma Benefits
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
              <motion.div
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
              </motion.div>
            ))}
          </motion.div>
        </Container>
      </Section>

      {/* ════════════════════════════════════════
          7. WHO IS SUITABLE
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
              Who is Suitable for CellDerma?
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
              You can benefit from CellDerma if you are:
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
              Not suitable: severe allergies to product components, active severe dermatitis (treat first), pregnancy (some actives require discussion with your doctor).
            </motion.p>
            <motion.div variants={fadeUp}>
              <BookConsultationButton className={`${styles.combinedCta} ${styles.ctaWhiteInvert}`}>
                Book Your Consultation
              </BookConsultationButton>
            </motion.div>
          </motion.div>
        </Container>
      </Section>

      {/* ════════════════════════════════════════
          8. THE SCIENCE
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
            <motion.h2 className={styles.headingDark} variants={fadeUp}>
              How CellDerma Works: The Science
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
              CellDerma uses synergistic active ingredients at pharmaceutical concentrations: potent actives accelerate cell turnover
              and boost collagen; exfoliating ingredients smooth and refine; brightening compounds illuminate; peptides and growth factors
              stimulate repair and renewal. These ingredients work together to penetrate the skin and address multiple concerns simultaneously.
            </motion.p>
            <motion.p className={styles.howPara} variants={fadeUp}>
              When applied consistently, these actives regulate cellular renewal, boost collagen and elastin production, reduce
              pigmentation, strengthen the skin barrier, and improve overall skin health. Results develop progressively, with dramatic improvements
              often visible within 2–6 weeks as your skin adapts and strengthens.
            </motion.p>
          </motion.div>

          <motion.div
            className={styles.howCoversWrap}
            variants={stagger(0.08)}
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
          >
            <motion.p className={styles.howCoversLabel} variants={fadeUp}>CellDerma Addresses</motion.p>
            <motion.ul className={styles.howCoversList} role="list" variants={stagger(0.08)}>
              {[
                'Fine lines & wrinkles',
                'Pigmentation & sun damage',
                'Acne & congestion',
                'Sensitivity & redness',
                'Loss of elasticity',
                'Dull & tired skin',
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
          9. WHAT TO EXPECT & AFTERCARE
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
              Your Skincare Journey
            </motion.p>
            <motion.h2 className={styles.headingLight} variants={fadeUp}>
              What to Expect &amp; Aftercare
            </motion.h2>
          </motion.div>

          <motion.div
            className={styles.resultsAfterGrid}
            variants={stagger(0.1)}
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
          >
            {/* Card 1, Results Timeline */}
            <motion.div className={styles.resultsAfterCard} variants={fadeUp}>
              <div className={styles.resultsAfterCardHead}>
                <span className={styles.resultsAfterCardIcon} aria-hidden="true">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/>
                    <polyline points="17 6 23 6 23 12"/>
                  </svg>
                </span>
                <h3 className={styles.resultsAfterCardTitle}>Fast Results Timeline</h3>
              </div>
              <p className={styles.resultsAfterCardBody}>
                Initial adjustment phase may include mild flaking or redness as skin acclimates.
                Dramatic improvements often visible within 2–6 weeks.
              </p>
              <div className={styles.resultsAfterCardSpacer} />
              <p className={styles.resultsAfterCardNote}>
                Optimal results achieved by 8–12 weeks. Consistent daily use essential for optimal results.
                Results continue to improve with long-term use.
              </p>
            </motion.div>

            {/* Card 2, Application Tips */}
            <motion.div className={styles.resultsAfterCard} variants={fadeUp}>
              <div className={styles.resultsAfterCardHead}>
                <span className={styles.resultsAfterCardIcon} aria-hidden="true">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10"/>
                    <line x1="12" y1="8" x2="12" y2="12"/>
                    <line x1="12" y1="16" x2="12.01" y2="16"/>
                  </svg>
                </span>
                <h3 className={styles.resultsAfterCardTitle}>Application &amp; Usage</h3>
              </div>
              <p className={styles.resultsAfterCardBody}>
                Follow your personalised regimen exactly as prescribed. Start with recommended frequencies;
                your clinician may adjust as your skin tolerates actives.
              </p>
              <ul className={styles.resultsAfterCardList} role="list">
                {[
                  'Use morning and/or evening as directed',
                  'Apply to clean, dry skin',
                  'Begin with lower frequencies, increase gradually',
                  'Patch test if sensitive',
                ].map((item) => (
                  <li key={item} className={styles.resultsAfterCardListItem}>
                    <span className={styles.resultsAfterDot} aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Card 3, SPF & Protection */}
            <motion.div className={styles.resultsAfterCard} variants={fadeUp}>
              <div className={styles.resultsAfterCardHead}>
                <span className={styles.resultsAfterCardIcon} aria-hidden="true">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                    <polyline points="22 4 12 14.01 9 11.01"/>
                  </svg>
                </span>
                <h3 className={styles.resultsAfterCardTitle}>Sun Protection</h3>
              </div>
              <ul className={styles.resultsAfterCardList} role="list">
                {[
                  'Mandatory when using active ingredients',
                  'Use SPF 30+ daily, reapply as needed',
                  'Avoid sun exposure during intense adjustment phase',
                  'CellDerma sun care products recommended',
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
          10. PATIENT REVIEWS
      ════════════════════════════════════════ */}
      <Testimonials />

      {/* ════════════════════════════════════════
          12. CTA BANNER
      ════════════════════════════════════════ */}
      <section className={styles.ctaBanner} data-section-theme="dark" aria-label="Book CellDerma consultation">
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
          <motion.div
            className={styles.ctaBannerContent}
            variants={stagger(0.12)}
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
          >
            <motion.h2 className={styles.ctaBannerHeading} variants={fadeUp}>
              Unlock Your Skin&apos;s<br />Full Potential.
            </motion.h2>
            <motion.p className={styles.ctaBannerSub} variants={fadeUp}>
              Let our clinical experts prescribe your personalised CellDerma regimen!
            </motion.p>
            <motion.div variants={fadeUp}>
              <BookConsultationButton className={styles.ctaBannerBtn}>
                Book Consultation
              </BookConsultationButton>
            </motion.div>
          </motion.div>
        </Container>
      </section>

      {/* ════════════════════════════════════════
          13. SKIN CONCERNS WE ADDRESS
      ════════════════════════════════════════ */}
      <Section variant="dark" data-section-theme="dark" className={styles.conditionsSection}>
        <Container>
          <motion.div
            className={styles.sectionHeaderCentre}
            variants={stagger(0.1)}
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
          >
            <motion.p className={styles.eyebrowLight} variants={fadeUp}>
              Skin Concerns
            </motion.p>
            <motion.h2 className={styles.headingLight} variants={fadeUp}>
              Skin Concerns We Address
            </motion.h2>
            <motion.p className={styles.conditionsIntro} variants={fadeUp}>
              Our personalised CellDerma prescriptions target a comprehensive range of skin issues with tailored active ingredients.
            </motion.p>
          </motion.div>

          <motion.div
            className={styles.areasColumns}
            variants={stagger(0.1)}
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
          >
            {SKIN_CONCERNS_DATA.map((section) => (
              <motion.div
                key={section.group}
                className={styles.areasGroup}
                variants={fadeUp}
                whileHover={{ y: -6, transition: { type: 'spring', stiffness: 280, damping: 20 } }}
              >
                <p className={styles.areasGroupLabel}>{section.group}</p>
                <ul className={styles.areasGroupList} role="list">
                  {section.items.map((item) => (
                    <li key={item} className={styles.areasGroupItem}>
                      <span className={styles.areasItemDot} aria-hidden="true" />
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </motion.div>
        </Container>
      </Section>

      {/* ════════════════════════════════════════
          14. BEST CELLDERMA LEICESTER EXPERIENCE
      ════════════════════════════════════════ */}
      <Section variant="light" data-section-theme="light" className={styles.clinicIntroSection}>
        <Container>
          <motion.div
            className={styles.clinicIntroBody}
            variants={stagger(0.12)}
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
          >
            <motion.div className={styles.clinicIntroLeft} variants={fadeUp}>
              <p className={styles.eyebrowDark}>Skincare Excellence</p>
              <h2 className={styles.combinedHeading}>
                Best CellDerma<br />Leicester Experience
              </h2>
            </motion.div>
            <motion.p className={styles.clinicIntroDesc} variants={fadeUp}>
              Experience premium medical-grade skincare at our clinic. Our clinical experts conduct thorough skin analysis,
              prescribe personalised CellDerma regimens, and provide ongoing professional support. We combine award-winning
              formulations with expert guidance to transform your skin safely and effectively.
            </motion.p>
          </motion.div>
        </Container>
      </Section>

      {/* ════════════════════════════════════════
          15. COST BANNER
      ════════════════════════════════════════ */}
      <section className={styles.costBanner} data-section-theme="dark" aria-label="CellDerma cost">
        <Container>
          <motion.div
            className={styles.costBannerInner}
            variants={stagger(0.12)}
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
          >
            <motion.p className={styles.costBannerEyebrow} variants={fadeUp}>
              CellDerma Skincare Pricing at The One Clinic
            </motion.p>
            <motion.p className={styles.costBannerPrice} variants={fadeUp}>
              From £200
            </motion.p>
            <motion.p className={styles.costBannerNote} variants={fadeUp}>
              Depends on your personalised prescription and product selection. Initial consultation and skin analysis included.
              Full costs discussed during your appointment.
            </motion.p>
            <motion.div variants={fadeUp}>
              <BookConsultationButton className={styles.ctaBannerBtn}>
                Book A Consultation
              </BookConsultationButton>
            </motion.div>
          </motion.div>
        </Container>
      </section>

      {/* ════════════════════════════════════════
          16. WHY CHOOSE THE ONE CLINIC
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
            <motion.h2 className={styles.headingLight} variants={fadeUp}>
              Why Choose The One Clinic For CellDerma
            </motion.h2>
          </motion.div>

          <motion.div
            className={styles.clinicReasonsGrid}
            variants={stagger(0.08)}
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
          >
            {CLINIC_REASONS.map((r) => (
              <motion.div
                key={r.n}
                className={styles.clinicReasonCard}
                variants={fadeUp}
                whileHover={{ y: -6, transition: { type: 'spring', stiffness: 280, damping: 20 } }}
              >
                <span className={styles.clinicReasonNumber}>{r.n}</span>
                <p className={styles.clinicReasonText}>{r.text}</p>
              </motion.div>
            ))}
          </motion.div>
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
            </motion.div>
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
