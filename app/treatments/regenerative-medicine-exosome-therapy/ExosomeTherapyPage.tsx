'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Script from 'next/script';
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
    label: 'Session Time',
    value: '30 to 45 minutes',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="12" cy="12" r="10"/>
        <polyline points="12 6 12 12 16 14"/>
      </svg>
    ),
  },
  {
    label: 'Application Method',
    value: 'Topical or Microneedling',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <polyline points="1 4 1 10 7 10"/>
        <path d="M3.51 15a9 9 0 1 0 .49-3.1"/>
      </svg>
    ),
  },
  {
    label: 'Downtime',
    value: 'None to Minimal',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"/>
        <path d="M9 12l2 2 4-4"/>
      </svg>
    ),
  },
  {
    label: 'Results Onset',
    value: '1 to 2 weeks',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/>
        <polyline points="17 6 23 6 23 12"/>
      </svg>
    ),
  },
  {
    label: 'Full Results',
    value: '8 to 12 weeks',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <line x1="12" y1="1" x2="12" y2="23"/>
        <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
      </svg>
    ),
  },
  {
    label: 'Treatment Cost',
    value: 'From £400',
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
    title: 'Skin Assessment',
    desc: 'A thorough evaluation of your skin concerns, goals, and skin type. Your practitioner determines whether exosome therapy alone or combined with another procedure is best suited to your needs.',
  },
  {
    n: '02',
    title: 'Treatment Preparation',
    desc: 'The treatment area is gently cleansed. If microneedling is used, a topical numbing agent is applied. Otherwise, the skin is prepped for topical application of exosomes.',
  },
  {
    n: '03',
    title: 'Exosome Application',
    desc: 'Exosomes are applied directly to the skin or delivered via microneedling channels. The nano-vesicles penetrate deeply, targeting skin cells to stimulate regeneration and collagen production.',
  },
  {
    n: '04',
    title: 'Progressive Regeneration',
    desc: 'Over the following weeks and months, cellular repair accelerates. Visible improvements in texture, tone, and elasticity develop progressively, with optimal results at 8 to 12 weeks.',
  },
];

const APPROACH_STEPS = [
  {
    eyebrow: '01',
    title: 'Skin Assessment',
    desc: 'Thorough evaluation of skin concerns, ageing signs, and treatment goals. Your practitioner creates a customised protocol suited to your skin.',
  },
  {
    eyebrow: '02',
    title: 'Exosome Application',
    desc: 'Exosomes are delivered topically or via microneedling to penetrate deeply and trigger cellular repair, collagen stimulation, and skin renewal.',
  },
  {
    eyebrow: '03',
    title: 'Post-Treatment Optimisation',
    desc: 'Guidance on skincare, sun protection, and maintenance to maximise results. Optional follow-up treatments or combination therapies recommended based on your response.',
  },
];

const BENEFITS = [
  {
    title: 'Next-Generation Regeneration',
    desc: 'Exosomes are nano-sized biological messengers that deliver growth factors and signalling proteins directly into skin cells, triggering repair and renewal at a cellular level beyond conventional treatments.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="12" cy="12" r="10"/>
        <polyline points="12 6 12 12 16 14"/>
      </svg>
    ),
  },
  {
    title: 'Powerful Collagen Stimulation',
    desc: 'Exosome therapy delivers a concentrated payload of growth factors to the dermis, stimulating significantly more collagen and elastin production than conventional biostimulatory treatments.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
      </svg>
    ),
  },
  {
    title: 'Accelerates Treatment Recovery',
    desc: 'Applied after procedures such as Morpheus8, laser resurfacing, or microneedling, exosomes dramatically accelerate skin healing, reducing downtime and enhancing the final result.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
        <polyline points="22 4 12 14.01 9 11.01"/>
      </svg>
    ),
  },
  {
    title: 'Expert-Led Treatment',
    desc: 'Exosome therapy at The One Clinic is administered by our experienced medical team. A full consultation is carried out to determine the most effective protocol for your skin goals.',
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
    title: 'Visible Skin Renewal',
    desc: 'Progressive improvements in fine lines, wrinkles, skin texture, and radiance. Results improve over weeks and months as collagen remodelling and cellular regeneration progress.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/>
        <polyline points="17 6 23 6 23 12"/>
      </svg>
    ),
  },
  {
    title: 'Long-Lasting Rejuvenation',
    desc: 'Results continue to improve over months as new collagen matures. Maintenance treatments keep skin looking fresh, radiant, and youthful for sustained rejuvenation.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
        <circle cx="12" cy="12" r="3"/>
      </svg>
    ),
  },
];

const ELIGIBILITY_YES = [
  'Anyone seeking advanced skin regeneration and renewal',
  'Ageing skin concerns, fine lines, wrinkles, and loss of elasticity',
  'Post-procedure healing acceleration after laser, Morpheus8, or microneedling',
  'Collagen loss and skin texture concerns',
  'Dull complexion and sun-damaged skin',
];

const ELIGIBILITY_NO = [
  'Active skin infections or inflammation',
  'Open wounds (must wait until fully healed)',
  'Severe autoimmune diseases (consult your doctor)',
  'Known allergy to exosome components',
];

const TREATMENT_APPLICATIONS = [
  {
    title: 'Skin Rejuvenation',
    desc: 'Standalone exosome therapy to stimulate collagen, improve texture, and restore radiance for a comprehensive skin renewal treatment.',
  },
  {
    title: 'Post-Procedure Healing Boost',
    desc: 'Applied immediately after Morpheus8, laser resurfacing, or microneedling to accelerate healing and enhance final results.',
  },
  {
    title: 'Anti-Ageing Treatment',
    desc: 'Targets fine lines, wrinkles, and loss of elasticity, delivering powerful growth factors to stimulate natural collagen regeneration.',
  },
  {
    title: 'Skin Texture Improvement',
    desc: 'Refines pore size, smooths rough texture, and improves overall skin quality for a more even, polished appearance.',
  },
  {
    title: 'Scar Reduction',
    desc: 'Stimulates healing and collagen remodelling, helping to soften the appearance of acne scars and post-surgical scars.',
  },
  {
    title: 'Radiofrequency Synergy',
    desc: 'Combines exosomes with Morpheus8 radiofrequency for amplified collagen stimulation and superior tightening and lifting.',
  },
  {
    title: 'Laser Recovery Enhancement',
    desc: 'Applied post-laser to accelerate skin recovery, reduce inflammation, and accelerate the formation of new collagen.',
  },
];

const CONDITIONS_CONCERNS = [
  'Fine lines and wrinkles',
  'Loss of elasticity',
  'Dull complexion',
  'Sun-damaged skin',
  'Uneven skin texture',
  'Enlarged pores',
  'Post-acne scars',
];

const CONDITIONS_COMBINATIONS = [
  'Standalone treatment',
  'Post-Morpheus8 protocol',
  'Post-radiofrequency',
  'Post-laser recovery',
  'With microneedling',
  'Maintenance course (quarterly)',
  'Pre-event boost',
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
    question: 'What is exosome therapy?',
    answer:
      'Exosomes are extracellular vesicles,tiny biological particles naturally produced by cells to carry growth factors, proteins, and genetic information between cells. In aesthetic medicine, laboratory-derived exosomes are applied to the skin to stimulate collagen production, accelerate repair, and improve overall skin quality at a cellular level.',
  },
  {
    question: 'How is exosome therapy delivered?',
    answer:
      'Exosomes are typically delivered into the skin via topical application, microneedling, or mesotherapy. When used after procedures such as laser resurfacing or Morpheus8, the microchannels created allow deep penetration for maximum therapeutic effect.',
  },
  {
    question: 'What results can I expect from exosome therapy?',
    answer:
      'Patients typically notice improved skin texture, radiance, and hydration within 1 to 2 weeks, with continued improvement over 2 to 3 months as collagen remodelling progresses. Exosomes also significantly reduce post-treatment redness and downtime when used alongside other procedures.',
  },
  {
    question: 'Is exosome therapy safe?',
    answer:
      'Yes. Exosome therapy is minimally invasive and very safe when performed by trained professionals. Exosomes are naturally occurring biological messengers, and adverse reactions are extremely rare. A thorough consultation ensures it suits your skin and health.',
  },
  {
    question: 'How often should I have exosome therapy treatments?',
    answer:
      'For standalone treatments, most patients benefit from an initial course of 2 to 3 sessions spaced 2 to 4 weeks apart, followed by maintenance treatments every 3 to 6 months. When used with other procedures, exosome application is typically a one-time addition to that treatment.',
  },
  {
    question: 'Can exosome therapy be combined with other treatments?',
    answer:
      'Yes, absolutely. Exosome therapy works beautifully with Morpheus8, laser resurfacing, microneedling, and radiofrequency treatments. In fact, using exosomes immediately after these procedures dramatically enhances results and speeds recovery. Your practitioner will recommend the best combination for your goals.',
  },
];

const RELATED = [
  { title: 'Skin Analysis',             href: '/treatments/skin-analysis',     desc: 'Comprehensive skin assessment to guide your personalised treatment plan.' },
  { title: 'NCTF 135 HA',               href: '/treatments/nctf-135-ha',       desc: 'Advanced bio-revitalisation for deep hydration and collagen stimulation.' },
  { title: 'Endolift',                  href: '/treatments/endolift',          desc: 'Minimally invasive laser lifting and tightening for face and body.' },
  { title: 'Morpheus8',                 href: '/treatments/morpheus8',         desc: 'Fractional radiofrequency skin remodelling for face and body.' },
];

const BA_IMAGES = [
  { src: '/images/BA1.jpg', alt: 'Exosome therapy skin rejuvenation result 1' },
  { src: '/images/BA2.jpg', alt: 'Exosome therapy skin rejuvenation result 2' },
  { src: '/images/BA3.jpg', alt: 'Exosome therapy skin rejuvenation result 3' },
  { src: '/images/BA4.jpg', alt: 'Exosome therapy skin rejuvenation result 4' },
  { src: '/images/BA5.jpg', alt: 'Exosome therapy skin rejuvenation result 5' },
  { src: '/images/BA6.jpg', alt: 'Exosome therapy skin rejuvenation result 6' },
  { src: '/images/BA7.jpg', alt: 'Exosome therapy skin rejuvenation result 7' },
];

/* ── Page component ───────────────────────────────────────────── */
export default function ExosomeTherapyPage() {
  const [baIndex, setBaIndex] = useState(0);
  const [visibleCount, setVisibleCount] = useState(2);
  const [showAllFaqs, setShowAllFaqs] = useState(false);

  useEffect(() => {
    const update = () => {
      if (window.innerWidth < 768) setVisibleCount(1);
      else if (window.innerWidth < 1024) setVisibleCount(1);
      else setVisibleCount(2);
    };
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
        aria-label="Exosome Therapy Leicester, hero"
        data-section-theme="dark"
      >
        {/* Breadcrumb, pinned to top of hero */}
        <div className={styles.heroBreadcrumb}>
          <Container>
            <Breadcrumb
              theme="dark"
              items={[
                { label: 'Treatments', href: '/treatments' },
                { label: 'Regenerative Medicine: Exosome Therapy' },
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
                Regenerative Medicine
              </motion.span>

              <motion.h1 className={styles.heroTitle} variants={fadeUp}>
                Exosome Therapy in Leicester
              </motion.h1>

              <motion.p className={styles.heroDesc} variants={fadeUp}>
                Next-generation cellular regeneration for advanced skin renewal,
                with accelerated results and minimal downtime.
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

            {/* Right: image */}
            <motion.div className={styles.heroImageWrap} variants={fadeUp}>
              <Image
                src="/images/Exosome Therapy hero.jpg"
                alt="Exosome therapy treatment at The One Clinic Leicester"
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
          2. WHAT IS EXOSOME THERAPY?
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
                <h2 className={styles.combinedHeading}>What is Exosome Therapy?</h2>
                <p className={styles.combinedDesc}>
                  Exosome therapy is a next-generation regenerative treatment that uses naturally
                  occurring nano-sized biological messengers to deliver a concentrated payload of
                  growth factors, proteins, and repair signals directly to skin cells. The result is
                  accelerated collagen synthesis, reduced inflammation, and visibly improved skin
                  quality, representing a significant advance beyond traditional treatments.
                </p>
              </motion.div>
              <motion.div className={styles.combinedCtaWrapper} variants={fadeUp}>
                <BookConsultationButton className={styles.combinedCta}>
                  Book Your Consultation
                </BookConsultationButton>
              </motion.div>
            </motion.div>

            {/* Right: image panels */}
            <motion.div className={styles.whatIsVideoWrap} variants={fadeUp}>
              <Image
                src="/images/Exosome Therapy 1.jpg"
                alt="Exosome therapy consultation at The One Clinic"
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
              Exosome Therapy at a Glance
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
          4. OUR EXOSOME THERAPY APPROACH
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
              Our Exosome Therapy Approach
            </motion.h2>
            <motion.p className={styles.combinationIntroText} variants={fadeUp}>
              At The One Clinic, our exosome therapy approach follows a proven three-step protocol,
              customised to your skin goals and concerns for optimal regeneration and renewal.
            </motion.p>
          </motion.div>

          <motion.div
            className={styles.techCardsGrid}
            variants={stagger(0.1)}
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
          >
            {APPROACH_STEPS.map((card) => (
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
            <p className={styles.finalResultsEyebrow}>The Science</p>
            <p className={styles.finalResultsText}>
              Exosomes derived from stem cells contain growth factors, anti-inflammatory molecules,
              and antioxidants that penetrate the skin to signal fibroblasts to increase collagen
              and elastin production, accelerating wound healing and cellular regeneration.
            </p>
          </motion.div>
        </Container>
      </Section>

      {/* ════════════════════════════════════════
          5. TREATMENT JOURNEY
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
              Your Exosome Therapy Journey
            </motion.h2>
          </motion.div>

          <motion.ol
            className={styles.journeyList}
            variants={stagger(0.12)}
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
            aria-label="Exosome therapy treatment journey steps"
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
          6. EXOSOME THERAPY BENEFITS
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
              Exosome Therapy Benefits
            </motion.h2>
          </motion.div>

          <motion.div
            className={styles.treatedBenefitsGrid}
            variants={stagger(0.08)}
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
          >
            {BENEFITS.map((b) => (
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
              Who is Suitable for Exosome Therapy?
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
              Exosome therapy is suitable for you if you are:
            </motion.p>
            <motion.ul className={styles.eligibilityList} role="list" variants={stagger(0.1)}>
              {ELIGIBILITY_YES.map((item) => (
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

            <motion.p className={styles.eligibilityIntro} variants={fadeUp} style={{ marginTop: '2rem' }}>
              Exosome therapy may not be suitable if you have:
            </motion.p>
            <motion.ul className={styles.eligibilityList} role="list" variants={stagger(0.1)}>
              {ELIGIBILITY_NO.map((item) => (
                <motion.li key={item} className={styles.eligibilityItem} variants={fadeUp}>
                  <span className={styles.eligibilityCheck} aria-hidden="true" style={{ color: 'var(--color-error-light)' }}>
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <line x1="2" y1="2" x2="12" y2="12" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round"/>
                      <line x1="12" y1="2" x2="2" y2="12" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round"/>
                    </svg>
                  </span>
                  <span>{item}</span>
                </motion.li>
              ))}
            </motion.ul>

            <motion.p className={styles.eligibilityClosing} variants={fadeUp}>
              A full consultation with our experts will determine if exosome therapy is right for you.
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
          8. HOW EXOSOMES WORK / THE SCIENCE
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
              How Exosome Therapy Works
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
              Exosomes are extracellular vesicles derived from stem cells, packed with growth factors,
              anti-inflammatory molecules, cytokines, and antioxidants. When applied to the skin
              topically or via microneedling, these nano-sized messengers penetrate deeply into the
              dermis and epidermis.
            </motion.p>
            <motion.p className={styles.howPara} variants={fadeUp}>
              Once inside, exosomes communicate with skin cells, signalling fibroblasts to dramatically
              increase collagen and elastin production. They also reduce inflammation, accelerate wound
              healing, and trigger cellular regeneration. Results develop progressively over 1 to 12 weeks
              as new collagen matures and skin texture, tone, and elasticity improve dramatically.
            </motion.p>
          </motion.div>

          <motion.div
            className={styles.howCoversWrap}
            variants={stagger(0.08)}
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
          >
            <motion.p className={styles.howCoversLabel} variants={fadeUp}>Exosome Therapy Addresses</motion.p>
            <motion.ul className={styles.howCoversList} role="list" variants={stagger(0.08)}>
              {[
                'Fine lines & wrinkles',
                'Loss of elasticity',
                'Dull, tired skin',
                'Uneven skin texture',
                'Enlarged pores',
                'Post-acne scarring',
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
          9. RESULTS, AFTERCARE & SIDE EFFECTS
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
              What to Expect: Results &amp; Aftercare
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
                <h3 className={styles.resultsAfterCardTitle}>When Will You See Results?</h3>
              </div>
              <p className={styles.resultsAfterCardBody}>
                Mild redness may appear for up to 24 hours if microneedling is used. Progressive
                improvements in skin texture, tone, and hydration appear within 1 to 2 weeks. Full
                results with visible collagen stimulation and skin renewal typically become evident
                at 8 to 12 weeks.
              </p>
              <div className={styles.resultsAfterCardSpacer} />
              <p className={styles.resultsAfterCardNote}>
                Best results are achieved with a series of treatments or when exosomes are combined
                with other procedures. Maintenance treatments help sustain and enhance the results.
              </p>
            </motion.div>

            {/* Card 2, Downtime & Side Effects */}
            <motion.div className={styles.resultsAfterCard} variants={fadeUp}>
              <div className={styles.resultsAfterCardHead}>
                <span className={styles.resultsAfterCardIcon} aria-hidden="true">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10"/>
                    <line x1="12" y1="8" x2="12" y2="12"/>
                    <line x1="12" y1="16" x2="12.01" y2="16"/>
                  </svg>
                </span>
                <h3 className={styles.resultsAfterCardTitle}>Downtime &amp; Side Effects</h3>
              </div>
              <p className={styles.resultsAfterCardBody}>
                Exosome therapy is minimally invasive with minimal to no downtime. Most patients
                experience little to no side effects. If microneedling is used:
              </p>
              <ul className={styles.resultsAfterCardList} role="list">
                {[
                  'Mild redness or warmth for up to 24 hours',
                  'Slight sensitivity when cleansing',
                  'Possible minor flaking on day 2-3',
                ].map((item) => (
                  <li key={item} className={styles.resultsAfterCardListItem}>
                    <span className={styles.resultsAfterDot} aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
              <div className={styles.resultsAfterCardSpacer} />
              <p className={styles.resultsAfterCardNote}>
                Side effects are temporary and mild. Most patients return to normal activities immediately.
              </p>
            </motion.div>

            {/* Card 3, Aftercare */}
            <motion.div className={styles.resultsAfterCard} variants={fadeUp}>
              <div className={styles.resultsAfterCardHead}>
                <span className={styles.resultsAfterCardIcon} aria-hidden="true">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                    <polyline points="22 4 12 14.01 9 11.01"/>
                  </svg>
                </span>
                <h3 className={styles.resultsAfterCardTitle}>Aftercare &amp; Skincare</h3>
              </div>
              <ul className={styles.resultsAfterCardList} role="list">
                {[
                  'Maintain a good skincare routine with gentle cleansing',
                  'Use a hydrating moisturiser to support skin barrier',
                  'Apply broad-spectrum SPF 30+ daily',
                  'Avoid direct sun exposure for 48 hours if microneedling used',
                  'Avoid harsh actives (retinol, acids) for 48 hours',
                  'Stay well-hydrated to support skin healing',
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
          10. TREATMENT APPLICATIONS
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
            <motion.p className={styles.eyebrowDark} variants={fadeUp}>
              Versatility
            </motion.p>
            <motion.h2 className={styles.headingDark} variants={fadeUp}>
              Treatment Applications for Exosome Therapy
            </motion.h2>
            <motion.p className={styles.conditionsIntro} variants={fadeUp}>
              Exosome therapy is incredibly versatile, used standalone or combined with other procedures
              to maximise skin regeneration and aesthetic results.
            </motion.p>
          </motion.div>

          <motion.div
            className={styles.treatedBenefitsGrid}
            variants={stagger(0.08)}
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
          >
            {TREATMENT_APPLICATIONS.map((item) => (
              <motion.div
                key={item.title}
                className={styles.treatedBenefitCard}
                variants={fadeUp}
                whileHover={{ y: -8, transition: { type: 'spring', stiffness: 280, damping: 18 } }}
              >
                <h3 className={styles.treatedBenefitTitle}>{item.title}</h3>
                <p className={styles.treatedBenefitDesc}>{item.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </Container>
      </Section>

      {/* ════════════════════════════════════════
          11. PATIENT TESTIMONIALS
      ════════════════════════════════════════ */}
      <Testimonials />

      {/* ════════════════════════════════════════
          12. CTA BANNER
      ════════════════════════════════════════ */}
      <section className={styles.ctaBanner} data-section-theme="dark" aria-label="Book exosome therapy">
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
              Unlock Your Skin&apos;s Natural<br />Healing Power.
            </motion.h2>
            <motion.p className={styles.ctaBannerSub} variants={fadeUp}>
              Experience advanced exosome therapy for visible skin regeneration and renewal.
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
          13. BEFORE & AFTER
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
            <motion.p className={styles.eyebrowDark} variants={fadeUp}>
              Real Results
            </motion.p>
            <motion.h2 className={styles.headingDark} variants={fadeUp}>
              Exosome Therapy Before &amp; After
            </motion.h2>
            <motion.p className={styles.beforeAfterSubheading} variants={fadeUp}>
              Real skin regeneration and renewal results from our patients at The One Clinic, Leicester.
            </motion.p>
          </motion.div>

          {/* Carousel viewport */}
          <div className={styles.baSliderViewport}>
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

          {/* Controls: arrows + dots */}
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
        </Container>
      </Section>

      {/* ════════════════════════════════════════
          14. COST BANNER
      ════════════════════════════════════════ */}
      <section className={styles.costBanner} data-section-theme="dark" aria-label="Exosome therapy cost">
        <Container>
          <motion.div
            className={styles.costBannerInner}
            variants={stagger(0.12)}
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
          >
            <motion.p className={styles.costBannerEyebrow} variants={fadeUp}>
              Exosome Therapy Cost at The One Clinic
            </motion.p>
            <motion.p className={styles.costBannerPrice} variants={fadeUp}>
              From £400
            </motion.p>
            <motion.p className={styles.costBannerNote} variants={fadeUp}>
              The final price depends on your personalised treatment protocol and whether exosome therapy
              is combined with another procedure. Full details will be discussed during your consultation.
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
          15. SKIN CONDITIONS WE ADDRESS
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
              Skin Conditions We Address
            </motion.p>
            <motion.h2 className={styles.headingLight} variants={fadeUp}>
              Skin Concerns &amp; Treatment Combinations
            </motion.h2>
            <motion.p className={styles.conditionsIntro} variants={fadeUp}>
              Exosome therapy is remarkably versatile, addressing a wide range of skin concerns,
              whether used standalone or as part of a comprehensive treatment programme.
            </motion.p>
          </motion.div>

          <motion.div
            className={styles.areasColumns}
            variants={stagger(0.1)}
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
          >
            <motion.div
              className={styles.areasGroup}
              variants={fadeUp}
              whileHover={{ y: -6, transition: { type: 'spring', stiffness: 280, damping: 20 } }}
            >
              <p className={styles.areasGroupLabel}>Skin Concerns</p>
              <ul className={styles.areasGroupList} role="list">
                {CONDITIONS_CONCERNS.map((area) => (
                  <li key={area} className={styles.areasGroupItem}>
                    <span className={styles.areasItemDot} aria-hidden="true" />
                    {area}
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              className={styles.areasGroup}
              variants={fadeUp}
              whileHover={{ y: -6, transition: { type: 'spring', stiffness: 280, damping: 20 } }}
            >
              <p className={styles.areasGroupLabel}>Treatment Combinations</p>
              <ul className={styles.areasGroupList} role="list">
                {CONDITIONS_COMBINATIONS.map((area) => (
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
          16. BEST EXOSOME THERAPY LEICESTER EXPERIENCE
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
              <p className={styles.eyebrowDark}>Exosome Therapy Treatment</p>
              <h2 className={styles.combinedHeading}>
                Best Exosome Therapy<br />Leicester Experience
              </h2>
            </motion.div>
            <motion.p className={styles.clinicIntroDesc} variants={fadeUp}>
              Experience the best exosome therapy in Leicester at our clinic. Our expert doctors deliver
              safe, advanced regenerative treatments for skin renewal and rejuvenation. Enjoy progressive
              improvements in skin texture, tone, and elasticity with minimal downtime and personalised care
              tailored to your unique skin goals.
            </motion.p>
          </motion.div>
        </Container>
      </Section>

      {/* ════════════════════════════════════════
          17. WHY CHOOSE THE ONE CLINIC
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
              Why Choose The One Clinic For Exosome Therapy
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
          18. MEET THE EXPERTS
      ════════════════════════════════════════ */}
      <MeetTheExperts />

      {/* ════════════════════════════════════════
          19. FAQ
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
          20. BOOKING FORM
      ════════════════════════════════════════ */}
      <LeadForm />

      {/* ════════════════════════════════════════
          21. RELATED TREATMENTS
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
          22. FINAL CTA
      ════════════════════════════════════════ */}
      <FinalCTA />
    </>
  );
}
