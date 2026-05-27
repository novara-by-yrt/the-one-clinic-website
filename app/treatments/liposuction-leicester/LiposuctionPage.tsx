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
    label: 'Procedure Time',
    value: '1 to 3 hours',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="12" cy="12" r="10"/>
        <polyline points="12 6 12 12 16 14"/>
      </svg>
    ),
  },
  {
    label: 'Anaesthetic',
    value: 'Twilight / General',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
      </svg>
    ),
  },
  {
    label: 'Recovery',
    value: '7 to 14 days downtime',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"/>
        <path d="M9 12l2 2 4-4"/>
      </svg>
    ),
  },
  {
    label: 'Compression Garment',
    value: 'Required',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M6 9l6-3 6 3v11a6 6 0 0 1-6 6 6 6 0 0 1-6-6V9z"/>
      </svg>
    ),
  },
  {
    label: 'Results Timeline',
    value: '6 to 12 weeks',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/>
        <polyline points="17 6 23 6 23 12"/>
      </svg>
    ),
  },
  {
    label: 'Cost',
    value: 'From £3,500',
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
    title: 'Consultation & Assessment',
    desc: 'A thorough review of your body shape, areas of concern, and aesthetic goals. Your doctor will assess skin elasticity and create a personalised liposuction plan tailored to your needs.',
  },
  {
    n: '02',
    title: 'Pre-op Preparation',
    desc: 'Pre-operative assessments and blood tests to ensure you are fit for surgery. Instructions on medications, fasting, and how to prepare your body for the best possible results.',
  },
  {
    n: '03',
    title: 'Procedure Day',
    desc: 'Tumescent fluid is infiltrated to numb the area and minimise bleeding. Using SAL or PAL techniques, a fine cannula gently removes fat cells. Skin is then contoured for natural, sculpted results.',
  },
  {
    n: '04',
    title: 'Recovery & Follow-up',
    desc: 'Compression garment worn 24/7 for 4 weeks. Regular follow-up appointments to monitor healing. Swelling peaks at 2 weeks, then gradually resolves over 6 to 12 weeks for final results.',
  },
];

const APPROACH_CARDS = [
  {
    eyebrow: '01',
    title: 'Detailed Body Assessment & Marking',
    desc: 'Before surgery, your surgeon carefully assesses your body shape, marks target areas with precision, and discusses the exact contouring plan to achieve your aesthetic goals safely.',
  },
  {
    eyebrow: '02',
    title: 'Surgical Fat Extraction',
    desc: 'Using tumescent infiltration and SAL or PAL techniques, a fine cannula removes unwanted fat deposits through small incisions. The procedure is controlled and precise, removing only the fat needed for optimal contouring.',
  },
  {
    eyebrow: '03',
    title: 'Skin Retraction & Contouring',
    desc: 'After fat removal, the skin naturally retracts and contours to your new shape. Your surgeon may employ advanced techniques to ensure smooth, natural-looking results with excellent definition.',
  },
];

const ELIGIBILITY = [
  'Adults at stable weight with localised fat deposits',
  'Good skin elasticity for optimal contouring results',
  'Realistic expectations about the procedure and outcomes',
  'In good overall health with no major medical conditions',
  'Non-smokers (or willing to quit before surgery)',
];

const TREATED_BENEFITS = [
  {
    title: 'Targets Stubborn Fat',
    desc: 'Removes localised fat deposits that resist diet and exercise, sculpting the abdomen, flanks, thighs, arms, back, neck, and more.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="12" cy="12" r="10"/>
        <circle cx="12" cy="12" r="4"/>
        <line x1="4.93" y1="4.93" x2="19.07" y2="19.07"/>
      </svg>
    ),
  },
  {
    title: 'Long-Lasting Results',
    desc: 'Removed fat cells do not regenerate. With a stable weight and healthy lifestyle, liposuction results are permanent and transformative.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/>
        <polyline points="17 6 23 6 23 12"/>
      </svg>
    ),
  },
  {
    title: 'Precise Body Contouring',
    desc: 'Modern liposuction techniques allow precise sculpting to improve body proportions, achieving natural-looking contours tailored to your specific goals.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M12 2a10 10 0 0 1 10 10c0 5.52-4.48 10-10 10S2 17.52 2 12"/>
        <path d="M12 6v6l4 2"/>
      </svg>
    ),
  },
  {
    title: 'Expert Surgical Team',
    desc: 'All liposuction procedures at The One Clinic are performed by experienced, GMC-registered doctors with comprehensive training in body contouring surgery.',
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
    title: 'Permanent Fat Cell Removal',
    desc: 'Liposuction removes fat cells entirely. These cells do not regenerate, ensuring permanent fat reduction in treated areas when weight is maintained.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
        <circle cx="12" cy="12" r="3"/>
      </svg>
    ),
  },
  {
    title: 'Dramatic Transformation',
    desc: 'Combine multiple areas and advanced techniques for comprehensive body reshaping. Many patients report dramatically improved proportions and renewed confidence.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
        <polyline points="22 4 12 14.01 9 11.01"/>
      </svg>
    ),
  },
];

const BODY_AREAS = [
  { title: 'Abdomen', desc: 'Removes central belly fat and love handles for a flatter, more defined waistline.' },
  { title: 'Flanks / Love Handles', desc: 'Sculpts the sides and lower back for a sleeker profile and improved waist definition.' },
  { title: 'Thighs', desc: 'Targets inner, outer, and upper thighs to improve leg proportions and contour.' },
  { title: 'Back & Upper Back', desc: 'Removes bra line fat and upper back deposits for a smoother, more toned appearance.' },
  { title: 'Arms', desc: 'Reduces arm fat and tightens loose skin for sculpted, defined upper arms.' },
  { title: 'Neck & Jowls', desc: 'Eliminates submental fat and jowls to define the jawline and rejuvenate the neck.' },
  { title: 'Knees & Calves', desc: 'Refines knee and calf contours for proportionate, sculpted lower legs.' },
];

const CLINIC_REASONS = [
  { n: '01', text: 'All-in-one clinic with medical & aesthetic services.' },
  { n: '02', text: 'Highly trained, GMC-registered doctors.' },
  { n: '03', text: 'Customised surgical plans based on your body and goals.' },
  { n: '04', text: 'State-of-the-art surgical facilities & modern equipment.' },
  { n: '05', text: 'Strong reputation & excellent patient reviews.' },
  { n: '06', text: 'Comprehensive care and support throughout your journey.' },
];

const FAQS = [
  {
    question: 'What is liposuction?',
    answer:
      'Liposuction is a surgical procedure that removes localised fat deposits from specific body areas. A thin tube (cannula) is inserted through small incisions to suction out fat cells using tumescent infiltration and suction-assisted (SAL) or power-assisted (PAL) techniques. It is not a weight-loss procedure but a contouring treatment for areas resistant to diet and exercise.',
  },
  {
    question: 'Who is a good candidate for liposuction?',
    answer:
      'Ideal candidates are adults at a stable weight with localised fat deposits, good skin elasticity, realistic expectations, and good overall health. You should not have active medical conditions, be a current smoker, or have a BMI above 30 (typically). A consultation with our doctors will confirm suitability.',
  },
  {
    question: 'What is the recovery time after liposuction?',
    answer:
      'Most patients return to light activities within 1 to 2 weeks. A compression garment must be worn 24/7 for 4 weeks. Bruising and swelling peak at 2 weeks, then gradually resolve. Strenuous activity should be avoided for 3 weeks. Final results appear over 6 to 12 weeks as swelling fully subsides.',
  },
  {
    question: 'How long do liposuction results last?',
    answer:
      'Liposuction permanently removes fat cells from treated areas. These cells do not regenerate. Results are permanent when you maintain a stable weight and healthy lifestyle. Weight gain will distribute to remaining fat cells, potentially affecting results.',
  },
  {
    question: 'Can liposuction remove a lot of fat at once?',
    answer:
      'The amount of fat removed depends on your body, goals, and safety considerations. Your surgeon will determine the safe volume during your consultation. Multiple areas can often be treated in one session. Realistic expectations and gradual contouring produce the most natural results.',
  },
  {
    question: 'What are the risks and side effects of liposuction?',
    answer:
      'Common temporary side effects include bruising, swelling, tenderness, and minor discomfort. These usually resolve within 2 to 4 weeks. Serious complications are rare when performed by experienced surgeons. A full discussion of risks will occur during your consultation, and aftercare instructions minimise complications.',
  },
];

const EXPERTS = [
  {
    name: 'Dr Sumit Virmani',
    credentials: ['MBBS', 'MRCGP', 'Co-Founder'],
    image: '/images/imgi_20_team-thumb-VIRMANI.jpg',
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
  { title: 'Body Contouring',           href: '/treatments/body-contouring-leicester',   desc: 'Comprehensive body reshaping and sculpting treatments.' },
  { title: 'Weight Management',         href: '/treatments/weight-management-leicester', desc: 'Medical support and guidance for sustainable weight loss.' },
  { title: 'Skin Analysis',             href: '/treatments/skin-analysis-leicester',     desc: 'Advanced skin assessment and personalised treatment plans.' },
  { title: 'Non-Surgical Fat Removal',  href: '/treatments/endolift-laser-leicester',          desc: 'Minimally invasive fat reduction and skin tightening.' },
];

const FA_REDUCTION = [
  {
    label: 'Body Zones',
    items: [
      'Abdomen & waist',
      'Flanks & sides',
      'Inner & outer thighs',
      'Buttocks',
      'Back & bra line',
      'Upper arms',
    ],
  },
  {
    label: 'Liposuction Techniques',
    items: [
      'Suction-assisted (SAL)',
      'Power-assisted (PAL)',
      'Tumescent infiltration',
      'Micro-cannula precision',
      'Combined zone treatment',
      'High-definition contouring',
    ],
  },
];

/* ── Page component ───────────────────────────────────────────── */
export default function LiposuctionPage() {
  const [showAllFaqs, setShowAllFaqs] = useState(false);

  return (
    <>
      {/* ════════════════════════════════════════
          1. HERO
      ════════════════════════════════════════ */}
      <section
        className={styles.hero}
        aria-label="Liposuction Leicester, hero"
        data-section-theme="dark"
      >
        {/* Breadcrumb, pinned to top of hero */}
        <div className={styles.heroBreadcrumb}>
          <Container>
            <Breadcrumb
              theme="dark"
              items={[
                { label: 'Treatments', href: '/treatments' },
                { label: 'Liposuction Leicester' },
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
                Body Contouring Surgery
              </motion.span>

              <motion.h1 className={styles.heroTitle} variants={fadeUp}>
                Liposuction in Leicester
              </motion.h1>

              <motion.p className={styles.heroDesc} variants={fadeUp}>
                Surgical fat removal for permanent body contouring. Expert-led liposuction with minimal
                downtime and dramatic, long-lasting results.
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
                  GMC-registered surgeons
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
                  Comprehensive surgical care
                </span>
              </motion.div>
            </div>

            {/* Right: image */}
            <motion.div className={styles.heroImageWrap} variants={fadeUp}>
              <Image
                src="/images/Hero Section Liposuction.jpg"
                alt="Liposuction surgical consultation at The One Clinic Leicester"
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
          2. WHAT IS LIPOSUCTION?
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
                <h2 className={styles.combinedHeading}>What is Liposuction?</h2>
                <p className={styles.combinedDesc}>
                  Liposuction is a surgical fat removal procedure that uses small incisions and
                  tumescent infiltration to safely suction out localised fat deposits. Using
                  suction-assisted (SAL) or power-assisted (PAL) techniques, a fine cannula
                  removes unwanted fat cells. This permanently sculpts and contours your body,
                  achieving natural-looking results tailored to your aesthetic goals.
                </p>
              </motion.div>
              <motion.div className={styles.combinedCtaWrapper} variants={fadeUp}>
                <BookConsultationButton className={styles.combinedCta}>
                  Book Your Consultation
                </BookConsultationButton>
              </motion.div>
            </motion.div>

            {/* Right: image panel */}
            <motion.div className={styles.whatIsVideoWrap} variants={fadeUp}>
              <Image
                src="/images/What is Liposuction.jpg"
                alt="Liposuction surgical procedure overview"
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
              Liposuction at a Glance
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
          4. OUR LIPOSUCTION APPROACH
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
              Our Liposuction Approach
            </motion.h2>
            <motion.p className={styles.combinationIntroText} variants={fadeUp}>
              At The One Clinic, our surgical liposuction approach combines precise assessment,
              advanced extraction techniques, and meticulous contouring for beautiful, natural results.
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
            <p className={styles.finalResultsEyebrow}>Sculpting Your Dream Body</p>
            <p className={styles.finalResultsText}>
              Our three-step approach combines detailed assessment, precise fat extraction, and
              expert contouring to deliver dramatic, permanent body transformation with natural,
              beautiful results tailored to you.
            </p>
          </motion.div>
        </Container>
      </Section>

      {/* ════════════════════════════════════════
          5. YOUR LIPOSUCTION JOURNEY
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
              Your Liposuction Journey
            </motion.h2>
          </motion.div>

          <motion.ol
            className={styles.journeyList}
            variants={stagger(0.12)}
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
            aria-label="Liposuction procedure journey steps"
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
              Liposuction Benefits
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
              Who is Suitable for Liposuction?
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
              You may be suitable for liposuction if you:
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

            <motion.div className={styles.ineligibilitySection} variants={fadeUp}>
              <p className={styles.ineligibilityLabel}>You may NOT be suitable if you:</p>
              <ul className={styles.ineligibilityList} role="list">
                {[
                  'BMI is above 30 (in most cases)',
                  'Have major medical conditions or poor overall health',
                  'Are an active smoker',
                  'Have unrealistic expectations about outcomes',
                  'Are pregnant or breastfeeding',
                ].map((item) => (
                  <li key={item} className={styles.ineligibilityItem}>
                    <span className={styles.ineligibilityX} aria-hidden="true">
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                        <line x1="2" y1="2" x2="12" y2="12" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round"/>
                        <line x1="12" y1="2" x2="2" y2="12" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round"/>
                      </svg>
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.p className={styles.eligibilityClosing} variants={fadeUp}>
              A consultation with our doctors will assess your individual suitability and discuss whether liposuction is right for you.
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
          8. HOW LIPOSUCTION WORKS
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
              The Science Behind Liposuction
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
              Liposuction begins with tumescent infiltration, where saline solution and anaesthetic are
              injected into the target area. This numbs the area, reduces bleeding, and causes fat to swell,
              making it easier to remove. A fine cannula (hollow tube) is then inserted through tiny incisions.
            </motion.p>
            <motion.p className={styles.howPara} variants={fadeUp}>
              Using suction-assisted (SAL) or power-assisted (PAL) techniques, the surgeon carefully removes
              unwanted fat cells. Because the procedure removes fat cells entirely and they do not regenerate,
              results are permanent. The body naturally recontours over weeks as swelling subsides and skin
              tightens, revealing beautiful, sculpted results.
            </motion.p>
          </motion.div>

          <motion.div
            className={styles.howCoversWrap}
            variants={stagger(0.08)}
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
          >
            <motion.p className={styles.howCoversLabel} variants={fadeUp}>Liposuction Addresses</motion.p>
            <motion.ul className={styles.howCoversList} role="list" variants={stagger(0.08)}>
              {[
                'Abdomen & waist',
                'Flanks & love handles',
                'Inner & outer thighs',
                'Back & bra line fat',
                'Upper arms & armpits',
                'Neck, chin & jowls',
                'Knees & calves',
                'Buttocks',
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
          9. WHAT TO EXPECT: AFTERCARE & RESULTS
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
              What to Expect: Aftercare &amp; Results
            </motion.h2>
          </motion.div>

          <motion.div
            className={styles.resultsAfterGrid}
            variants={stagger(0.1)}
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
          >
            {/* Card 1, Compression Garment */}
            <motion.div className={styles.resultsAfterCard} variants={fadeUp}>
              <div className={styles.resultsAfterCardHead}>
                <span className={styles.resultsAfterCardIcon} aria-hidden="true">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M6 9l6-3 6 3v11a6 6 0 0 1-6 6 6 6 0 0 1-6-6V9z"/>
                  </svg>
                </span>
                <h3 className={styles.resultsAfterCardTitle}>Compression Garment & First Weeks</h3>
              </div>
              <p className={styles.resultsAfterCardBody}>
                A compression garment must be worn 24/7 for 4 weeks post-surgery to support healing,
                reduce swelling, and help skin retract for optimal contouring. This is crucial for best results.
              </p>
              <div className={styles.resultsAfterCardSpacer} />
              <p className={styles.resultsAfterCardNote}>
                Bruising and swelling are normal and peak at around 2 weeks, then gradually resolve over
                4 to 6 weeks. Avoid strenuous activity for 3 weeks.
              </p>
            </motion.div>

            {/* Card 2, Results Timeline */}
            <motion.div className={styles.resultsAfterCard} variants={fadeUp}>
              <div className={styles.resultsAfterCardHead}>
                <span className={styles.resultsAfterCardIcon} aria-hidden="true">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/>
                    <polyline points="17 6 23 6 23 12"/>
                  </svg>
                </span>
                <h3 className={styles.resultsAfterCardTitle}>Results Timeline</h3>
              </div>
              <p className={styles.resultsAfterCardBody}>
                Initial results become visible around 6 weeks as swelling reduces. Progressive improvement
                continues as your body recontours naturally. Final results are typically visible at 12 weeks.
              </p>
              <div className={styles.resultsAfterCardSpacer} />
              <p className={styles.resultsAfterCardNote}>
                Results continue to improve subtly up to 6 months as skin fully tightens and the body
                fully recontours. Maintenance of a stable weight preserves results indefinitely.
              </p>
            </motion.div>

            {/* Card 3, Aftercare Tips */}
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
                  'Wear compression garment 24/7 for 4 weeks',
                  'Avoid strenuous exercise & heavy lifting for 3 weeks',
                  'Keep the incision areas clean and dry',
                  'Attend all follow-up appointments',
                  'Maintain a healthy lifestyle and stable weight',
                  'Follow post-operative instructions provided by your surgeon',
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
          11. CTA BANNER
      ════════════════════════════════════════ */}
      <section className={styles.ctaBanner} data-section-theme="dark" aria-label="Book liposuction consultation">
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
              Sculpt Your Dream Body.<br />Your Transformation Awaits!
            </motion.h2>
            <motion.p className={styles.ctaBannerSub} variants={fadeUp}>
              Book your liposuction consultation with our expert surgical team in Leicester.
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
          12. BODY AREAS WE CAN TREAT
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
              Treatment Areas
            </motion.p>
            <motion.h2 className={styles.headingDark} variants={fadeUp}>
              Body Areas We Can Treat
            </motion.h2>
            <motion.p className={styles.conditionsIntro} variants={fadeUp}>
              Liposuction can be used to sculpt and contour nearly any body area where you have
              stubborn fat deposits.
            </motion.p>
          </motion.div>

          <motion.div
            className={styles.bodyAreasGrid}
            variants={stagger(0.08)}
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
          >
            {BODY_AREAS.map((area) => (
              <motion.div
                key={area.title}
                className={styles.bodyAreaCard}
                variants={fadeUp}
                whileHover={{ y: -6, transition: { type: 'spring', stiffness: 280, damping: 20 } }}
              >
                <h3 className={styles.bodyAreaTitle}>{area.title}</h3>
                <p className={styles.bodyAreaDesc}>{area.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </Container>
      </Section>

      {/* ════════════════════════════════════════
          13. FAT REDUCTION AREAS / TECHNIQUES
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
              Treatment Options
            </motion.p>
            <motion.h2 className={styles.headingLight} variants={fadeUp}>
              Fat Reduction Areas & Techniques
            </motion.h2>
          </motion.div>

          <motion.div
            className={styles.areasColumns}
            variants={stagger(0.1)}
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
          >
            {FA_REDUCTION.map((group, idx) => (
              <motion.div
                key={idx}
                className={styles.areasGroup}
                variants={fadeUp}
                whileHover={{ y: -6, transition: { type: 'spring', stiffness: 280, damping: 20 } }}
              >
                <p className={styles.areasGroupLabel}>{group.label}</p>
                <ul className={styles.areasGroupList} role="list">
                  {group.items.map((item) => (
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
          14. BEST LIPOSUCTION LEICESTER EXPERIENCE
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
              <p className={styles.eyebrowDark}>Liposuction Surgery</p>
              <h2 className={styles.combinedHeading}>
                Best Liposuction<br />Leicester Experience
              </h2>
            </motion.div>
            <motion.p className={styles.clinicIntroDesc} variants={fadeUp}>
              Experience the best liposuction in Leicester at our clinic. Our expert, GMC-registered
              doctors deliver safe, precise surgical fat removal and body contouring. Enjoy permanent
              results, comprehensive pre- and post-operative care, and personalised support throughout
              your transformation journey.
            </motion.p>
          </motion.div>
        </Container>
      </Section>

      {/* ════════════════════════════════════════
          15. COST BANNER
      ════════════════════════════════════════ */}
      <section className={styles.costBanner} data-section-theme="dark" aria-label="Liposuction cost">
        <Container>
          <motion.div
            className={styles.costBannerInner}
            variants={stagger(0.12)}
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
          >
            <motion.p className={styles.costBannerEyebrow} variants={fadeUp}>
              Liposuction Cost at The One Clinic
            </motion.p>
            <motion.p className={styles.costBannerPrice} variants={fadeUp}>
              From £3,500
            </motion.p>
            <motion.p className={styles.costBannerNote} variants={fadeUp}>
              Pricing varies based on the areas treated and the extent of fat removal. A detailed quote
              will be provided during your personalised consultation.
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
              Why Choose The One Clinic For Liposuction
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
          21. FINAL CTA
      ════════════════════════════════════════ */}
      <FinalCTA />
    </>
  );
}
