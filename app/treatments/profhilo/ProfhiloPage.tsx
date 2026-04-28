'use client';

import { useState, useEffect } from 'react';
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
    label: 'Treatment Duration',
    value: '30 to 45 minutes',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="12" cy="12" r="10"/>
        <polyline points="12 6 12 12 16 14"/>
      </svg>
    ),
  },
  {
    label: 'Treatment Frequency',
    value: '2 sessions spaced four weeks apart',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <polyline points="1 4 1 10 7 10"/>
        <path d="M3.51 15a9 9 0 1 0 .49-3.1"/>
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
    label: 'Results Longevity',
    value: 'Typically, around six months',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/>
        <polyline points="17 6 23 6 23 12"/>
      </svg>
    ),
  },
  {
    label: 'Profhilo Cost',
    value: 'Starts from £200',
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
    title: 'Consultation & Assessment',
    desc: 'Our doctor assesses your skin, understands your concerns, and creates a personalised treatment plan tailored to your unique needs and goals.',
  },
  {
    n: '02',
    title: 'Preparation',
    desc: 'We cleanse the treatment area and may apply a topical anaesthetic cream to ensure your comfort throughout the procedure.',
  },
  {
    n: '03',
    title: 'BAP Technique Injections',
    desc: 'Using the BAP (Bio Aesthetic Points) technique, precise injections are placed at key points on the face or neck for optimal distribution.',
  },
  {
    n: '04',
    title: 'Post-Treatment',
    desc: 'The product spreads naturally under the skin. You may experience mild redness that quickly settles, allowing you to resume your routine safely.',
  },
];


const ELIGIBILITY = [
  'Improves skin firmness and elasticity for a naturally lifted appearance',
  'Deeply hydrates dry or dehydrated skin from within',
  'Enhances your natural features without changing your appearance',
  'Reduces the appearance of fine lines and improves overall skin texture',
  'Complements other treatments such as anti-wrinkle injections or dermal fillers',
];

const TREATED_BENEFITS = [
  {
    title: 'Deep Hydration',
    desc: 'Ensures your skin feels plumper, softer, and consistently moisturised from the inside out.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M12 2C6.5 9 4 13.5 4 16a8 8 0 0 0 16 0c0-2.5-2.5-7-8-14z"/>
      </svg>
    ),
  },
  {
    title: 'Enhanced Firmness',
    desc: 'Rebuilds the skin\'s internal scaffolding, making it feel bouncier and noticeably tighter.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/>
        <polyline points="17 6 23 6 23 12"/>
      </svg>
    ),
  },
  {
    title: 'Minimal Downtime',
    desc: 'A highly tolerable procedure allowing you to get back to your day straightaway.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
        <polyline points="22 4 12 14.01 9 11.01"/>
      </svg>
    ),
  },
  {
    title: 'Natural Luminosity',
    desc: 'Breathes new life into tired skin, giving you a refreshed and brilliant glow.',
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
    title: 'Softened Fine Lines',
    desc: 'It reduces fine lines and crepey skin while keeping your look natural.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
        <circle cx="12" cy="12" r="3"/>
      </svg>
    ),
  },
  {
    title: 'Improved Skin Texture',
    desc: 'Refines uneven skin, making it feel smoother, softer, and more even to the touch.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
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

const CLINIC_REASONS = [
  { n: '01', title: 'Expert Doctors', text: 'A team of skilled and caring medical professionals leads your treatment.' },
  { n: '02', title: 'Personalised Care', text: 'We tailor every experience to meet each patient\'s unique needs.' },
  { n: '03', title: 'Advanced Technology', text: 'We equip our state-of-the-art medical aesthetics clinic with modern, innovative technology.' },
  { n: '04', title: 'Trusted Reputation', text: 'We help our patients feel confident and happy with themselves.' },
  { n: '05', title: 'Full Support', text: 'We take a comprehensive approach to your care, ensuring every aspect is carefully considered.' },
  { n: '06', title: 'Safe & Hygienic Environment', text: 'We strictly adhere to safety and hygiene standards to ensure every treatment takes place in a clean, secure environment.' },
];

const FAQS = [
  {
    question: 'Who should consider Profhilo treatment?',
    answer:
      'Profhilo is ideal for men and women experiencing dull, dry, or slightly lax skin who want a lovely, natural structural improvement without changing their facial features.',
  },
  {
    question: 'Is it painful?',
    answer:
      'Most clients find it highly tolerable. The precise BAP technique requires only ten injection points, and we can use a topical anaesthetic cream to make you as comfortable as possible.',
  },
  {
    question: 'How is Profhilo treatment performed?',
    answer:
      'Profhilo treatment requires an injection under the skin\'s surface at precisely 10 locations on the face. It is a quick process, lasting between 15 and 20 minutes.',
  },
  {
    question: 'How long does it take to recover?',
    answer:
      'Downtime is minimal. You may notice small bumps or mild redness at the injection sites, which usually settle within 24 to 48 hours.',
  },
  {
    question: 'How long do the results last?',
    answer:
      'A complete treatment with two sessions will produce great, luminous results that will last for about six months.',
  },
  {
    question: 'Are there any risks?',
    answer:
      'As this procedure utilises highly purified hyaluronic acid, it is extremely safe. The only side effects that can be observed temporarily are redness, swelling, or bruising.',
  },
  {
    question: 'Do I need follow-ups?',
    answer:
      'Yes, to achieve the absolute best outcome, you must have a second session four weeks after the first. A top-up maintenance session is usually recommended every six months thereafter.',
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
    image: '/images/imgi_21_team-thumb-BEDI.jpg',
    alt: 'Dr Gunjan Bedi, General Practitioner and Aesthetics Practitioner, The One Clinic',
    bio: [
      'Dr Gunjan Bedi is a highly skilled, advanced aesthetics practitioner at The One Clinic. She is a highly experienced doctor, having worked in the medical sector for over 20 years, with over 10 years service as a GP.',
      'Dr Bedi brings a unique and comprehensive perspective to patient care, combining qualifications in General Practice, Psychiatry, and Aesthetic Medicine. Her breadth of expertise allows her to take a truly holistic approach, addressing both the physical and psychological dimensions of each patient\'s wellbeing.',
    ],
  },
];

const RELATED = [
  { title: 'Morpheus8',                   href: '/treatments/morpheus8',         desc: 'Fractional radiofrequency skin remodelling for face and body.' },
  { title: 'Dermal Fillers',              href: '/treatments/dermal-fillers',    desc: 'Restore volume and structure to the face with precision filler.' },
  { title: 'Deep Laser Resurfacing',      href: '/treatments/laser-resurfacing', desc: 'Comprehensive skin renewal targeting texture, tone, and laxity.' },
  { title: 'Non Surgical Blepharoplasty', href: '/treatments/blepharoplasty',    desc: 'Eye area rejuvenation without surgery or scarring.' },
];

/* ── Page component ───────────────────────────────────────────── */
export default function ProfhiloPage() {
  const [showAllFaqs, setShowAllFaqs] = useState(false);
  const [expertIndex, setExpertIndex] = useState(0);

  return (
    <>
      {/* ════════════════════════════════════════
          1. HERO
      ════════════════════════════════════════ */}
      <section
        className={styles.hero}
        aria-label="Profhilo Leicester, hero"
        data-section-theme="dark"
      >
        {/* Breadcrumb, pinned to top of hero */}
        <div className={styles.heroBreadcrumb}>
          <Container>
            <Breadcrumb
              theme="dark"
              items={[
                { label: 'Treatments', href: '/treatments' },
                { label: 'Profhilo' },
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
                Medical Aesthetics
              </motion.span>

              <motion.h1 className={styles.heroTitle} variants={fadeUp}>
                Profhilo in Leicester
              </motion.h1>

              <motion.p className={styles.heroDesc} variants={fadeUp}>
                Experience visibly healthier, more radiant skin with expert Profhilo treatments.
                This revolutionary bio-remodelling procedure offers deep hydration and structural
                rejuvenation for a lovely, natural glow without altering your features.
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
                src="/images/Profhilo (2).jpg"
                alt="Profhilo treatment in progress at The One Clinic"
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
          2. PATIENT REVIEWS
      ════════════════════════════════════════ */}
      <Testimonials />

      {/* ════════════════════════════════════════
          3A. WHAT IS PROFHILO?
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
                <h2 className={styles.combinedHeading}>What is Profhilo?</h2>
                <p className={styles.combinedDesc}>
                  Profhilo is an innovative injectable skin treatment formulated with one of the
                  highest concentrations of ultra-pure hyaluronic acid available. Rather than acting
                  as a traditional dermal filler to add volume, it works as a bio-remodelling agent.
                  It is specifically designed to treat dull, dry, and ageing skin by providing
                  intense, deep hydration and naturally stimulating the production of collagen and
                  elastin from within.
                </p>
              </motion.div>
              <motion.div className={styles.combinedCtaWrapper} variants={fadeUp}>
                <BookConsultationButton className={styles.combinedCta}>
                  Book Your Consultation
                </BookConsultationButton>
              </motion.div>
            </motion.div>

            {/* Right: video placeholder */}
            <motion.div className={styles.whatIsVideoWrap} variants={fadeUp}>
              <div className={styles.videoPlaceholder} aria-label="Video coming soon">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <circle cx="12" cy="12" r="10"/>
                  <polygon points="10 8 16 12 10 16 10 8" fill="currentColor" stroke="none"/>
                </svg>
                <p>Video coming soon</p>
              </div>
            </motion.div>
          </motion.div>
        </Container>
      </Section>

      {/* ════════════════════════════════════════
          3B. AT A GLANCE
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
              Profhilo Treatment at a Glance
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
          4. PROFHILO PROCEDURE
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
              Profhilo Procedure
            </motion.h2>
          </motion.div>

          <motion.ol
            className={styles.journeyList}
            variants={stagger(0.12)}
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
            aria-label="Profhilo treatment journey steps"
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
          NEW: TREATED BENEFITS
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
              What You Gain
            </motion.p>
            <motion.h2 className={styles.headingDark} variants={fadeUp}>
              Profhilo Benefits
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
          5. WHY CHOOSE PROFHILO
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
              Why Choose Profhilo?
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
              You might find Profhilo to be a brilliant choice, it:
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
              If Profhilo sounds like it could be right for you, book a consultation with our team to find out more.
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
          6. HOW DOES PROFHILO WORK
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
              How Does Profhilo Work?
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
              Once injected, Profhilo spreads evenly beneath the skin rather than remaining in one
              spot. It works deep within the skin to activate your body&apos;s natural healing process.
              It helps boost collagen and elastin, which improves the skin&apos;s structure.
            </motion.p>
            <motion.p className={styles.howPara} variants={fadeUp}>
              As a result, your skin becomes firmer, tighter, well-hydrated, and naturally glowing.
            </motion.p>
          </motion.div>

          <motion.div
            className={styles.howCoversWrap}
            variants={stagger(0.08)}
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
          >
            <motion.p className={styles.howCoversLabel} variants={fadeUp}>Profhilo Addresses</motion.p>
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
            {/* Card 1, Results Timeline */}
            <motion.div className={styles.resultsAfterCard} variants={fadeUp}>
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
                Most patients notice initial improvements in hydration and plumpness within a couple
                of weeks of their first session. The full bio-remodelling benefits become
                significantly more pronounced after completing the second session.
              </p>
              <div className={styles.resultsAfterCardSpacer} />
              <p className={styles.resultsAfterCardNote}>
                The results achieved from a complete two-session course typically last for
                approximately six months, after which a single maintenance session is advised to
                sustain the outcomes.
              </p>
            </motion.div>

            {/* Card 2, Side Effects */}
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
              <ul className={styles.resultsAfterCardList} role="list">
                {[
                  'Redness at the injection site',
                  'Small, temporary bumps at the injection site that naturally settle',
                  'Occasional slight bruising',
                  'Itching or irritation',
                ].map((item) => (
                  <li key={item} className={styles.resultsAfterCardListItem}>
                    <span className={styles.resultsAfterDot} aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
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
                <h3 className={styles.resultsAfterCardTitle}>Aftercare Tips</h3>
              </div>
              <ul className={styles.resultsAfterCardList} role="list">
                {[
                  'Make sure the treated area stays clean, and try not to touch or rub your face unless necessary',
                  'Avoid strenuous sport, heavy exercise, and saunas for at least 24 hours',
                  'Do not apply makeup for at least 12 hours post-treatment',
                  'Attend your essential second session four weeks after the first to ensure maximum collagen stimulation',
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
          NEW: CTA BANNER
      ════════════════════════════════════════ */}
      <section className={styles.ctaBanner} data-section-theme="dark" aria-label="Book Profhilo consultation">
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
              Uncover Your Natural Beauty<br />and Radiance!
            </motion.h2>
            <motion.p className={styles.ctaBannerSub} variants={fadeUp}>
              Give your skin the deep hydration and structural renewal it truly deserves. Let our
              expert doctors at The One Clinic help you achieve a beautifully luminous complexion.
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
          7. TREATABLE AREAS
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
              Treatable Areas
            </motion.p>
            <motion.h2 className={styles.headingLight} variants={fadeUp}>
              What Areas Can Be Treated With Profhilo?
            </motion.h2>
            <motion.p className={styles.conditionsIntro} variants={fadeUp}>
              Profhilo is suitable for treating a range of face and body areas, delivering
              deep hydration and bio-remodelling results across the skin.
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

            <motion.div
              className={styles.areasGroup}
              variants={fadeUp}
              whileHover={{ y: -6, transition: { type: 'spring', stiffness: 280, damping: 20 } }}
            >
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
          NEW: BEST PROFHILO LEICESTER EXPERIENCE
      ════════════════════════════════════════ */}
      <Section variant="light" data-section-theme="light">
        <Container>
          <motion.div
            className={styles.clinicIntroBody}
            variants={stagger(0.12)}
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
          >
            <motion.div className={styles.clinicIntroLeft} variants={fadeUp}>
              <p className={styles.eyebrowDark}>Profhilo Treatment</p>
              <h2 className={styles.combinedHeading}>
                Best Profhilo<br />Leicester Experience
              </h2>
            </motion.div>
            <motion.p className={styles.clinicIntroDesc} variants={fadeUp}>
              The One Clinic provides the best Profhilo experience in Leicester, offering modern
              equipment in a relaxing, luxurious environment. Our highly trained, caring doctors
              apply their extensive knowledge and expertise to recommend tailored aesthetic
              solutions, ensuring you achieve natural, confidence-boosting results.
            </motion.p>
          </motion.div>
        </Container>
      </Section>

      {/* ════════════════════════════════════════
          NEW: COST BANNER
      ════════════════════════════════════════ */}
      <section className={styles.costBanner} data-section-theme="dark" aria-label="Profhilo cost">
        <Container>
          <motion.div
            className={styles.costBannerInner}
            variants={stagger(0.12)}
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
          >
            {/* Header */}
            <motion.div className={styles.costBannerHeader} variants={stagger(0.1)}>
              <motion.p className={styles.costBannerEyebrow} variants={fadeUp}>
                Profhilo Cost in Leicester
              </motion.p>
              <motion.h2 className={styles.costBannerPrice} variants={fadeUp}>
                Starts From <span className={styles.costBannerHighlight}>£200</span>
              </motion.h2>
            </motion.div>

            {/* Price cards grid */}
            <motion.ul
              className={styles.costBannerGrid}
              role="list"
              variants={stagger(0.08)}
            >
              {[
                { label: 'Profhilo Face',                      price: '£200' },
                { label: 'Profhilo Face + Neck',               price: '£300' },
                { label: 'Profhilo Face + Neck + Décolletage', price: '£375' },
                { label: 'Profhilo Face (course of 2)',         price: '£250 / session' },
                { label: 'Profhilo Body',                       price: '£600' },
              ].map((item) => (
                <motion.li key={item.label} className={styles.costPriceCard} variants={fadeUp}>
                  <span className={styles.costPriceLabel}>{item.label}</span>
                  <span className={styles.costPriceDivider} aria-hidden="true" />
                  <span className={styles.costPriceAmount}>{item.price}</span>
                </motion.li>
              ))}
            </motion.ul>

            {/* Footer note + CTA */}
            <motion.p className={styles.costBannerNote} variants={fadeUp}>
              Prices listed are a guide only. Your exact cost will be discussed during a
              thorough consultation with our expert.
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
          NEW: WHY CHOOSE THE ONE CLINIC
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
              Why Us
            </motion.p>
            <motion.h2 className={styles.headingLight} variants={fadeUp}>
              Why Choose The One Clinic in Leicester
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
                <h3 className={styles.clinicReasonTitle}>{r.title}</h3>
                <p className={styles.clinicReasonText}>{r.text}</p>
              </motion.div>
            ))}
          </motion.div>
        </Container>
      </Section>

      {/* ════════════════════════════════════════
          NEW: MEET THE EXPERT (SLIDESHOW)
      ════════════════════════════════════════ */}
      <Section variant="light" data-section-theme="light" className={styles.sectionGray}>
        <Container>
          <div className={styles.expertSlideshow}>
            {/* Card, keyed to re-animate on slide change */}
            <motion.div
              key={expertIndex}
              className={styles.expertCard}
              variants={stagger(0.1)}
              initial="hidden"
              animate="show"
            >
              {/* Left: full-bleed photo panel */}
              <motion.div className={styles.expertCardPhotoPanel} variants={fadeUp}>
                <Image
                  src={EXPERTS[expertIndex].image}
                  alt={EXPERTS[expertIndex].alt}
                  fill
                  className={styles.expertCardPhoto}
                  sizes="(max-width: 768px) 100vw, 420px"
                />
              </motion.div>

              {/* Right: content */}
              <motion.div className={styles.expertCardContent} variants={stagger(0.08)}>
                <motion.p className={styles.eyebrowLight} variants={fadeUp}>
                  Meet The Expert
                </motion.p>
                <motion.h2 className={styles.expertCardName} variants={fadeUp}>
                  {EXPERTS[expertIndex].name}
                </motion.h2>

                <motion.div className={styles.expertCardBadges} variants={fadeUp}>
                  {EXPERTS[expertIndex].credentials.map((c) => (
                    <span key={c} className={styles.expertCardBadge}>{c}</span>
                  ))}
                </motion.div>

                {EXPERTS[expertIndex].bio.map((para, i) => (
                  <motion.p key={i} className={styles.expertCardBio} variants={fadeUp}>
                    {para}
                  </motion.p>
                ))}
              </motion.div>
            </motion.div>

            {/* Slideshow controls */}
            <div className={styles.expertSlideControls}>
              <button
                className={styles.expertSlideArrow}
                onClick={() => setExpertIndex((i) => Math.max(0, i - 1))}
                disabled={expertIndex === 0}
                aria-label="Previous expert"
              >
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                  <path d="M12.5 15l-5-5 5-5" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>

              <div className={styles.expertSlideDots}>
                {EXPERTS.map((expert, i) => (
                  <button
                    key={expert.name}
                    className={`${styles.expertSlideDot} ${expertIndex === i ? styles.expertSlideDotActive : ''}`}
                    onClick={() => setExpertIndex(i)}
                    aria-label={`View ${expert.name}`}
                  />
                ))}
              </div>

              <button
                className={styles.expertSlideArrow}
                onClick={() => setExpertIndex((i) => Math.min(EXPERTS.length - 1, i + 1))}
                disabled={expertIndex === EXPERTS.length - 1}
                aria-label="Next expert"
              >
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                  <path d="M7.5 5l5 5-5 5" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>
          </div>
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
      </Section>

      {/* ════════════════════════════════════════
          10. BOOKING FORM
      ════════════════════════════════════════ */}
      <LeadForm />

      {/* ════════════════════════════════════════
          11. RELATED TREATMENTS
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
