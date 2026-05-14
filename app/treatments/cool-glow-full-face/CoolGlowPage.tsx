'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
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
    value: '30 to 45 minutes',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="12" cy="12" r="10"/>
        <polyline points="12 6 12 12 16 14"/>
      </svg>
    ),
  },
  {
    label: 'Sessions Needed',
    value: '1 to 6 sessions',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <polyline points="1 4 1 10 7 10"/>
        <path d="M3.51 15a9 9 0 1 0 .49-3.1"/>
      </svg>
    ),
  },
  {
    label: 'First Results',
    value: 'Immediately visible',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/>
        <polyline points="17 6 23 6 23 12"/>
      </svg>
    ),
  },
  {
    label: 'Full Results',
    value: '4 to 6 weeks (course)',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"/>
        <path d="M9 12l2 2 4-4"/>
      </svg>
    ),
  },
  {
    label: 'Downtime',
    value: 'None',
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
    value: 'From £80',
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
    title: 'Skin Consultation and Assessment',
    desc: 'Our clinical team assesses your skin type, tone, and concerns. We discuss your goals and confirm the COOL Glow Peel is the right treatment, tailoring the formula to your specific skin needs.',
  },
  {
    n: '02',
    title: 'Skin Preparation',
    desc: 'The face is thoroughly cleansed to remove makeup, oils, and impurities. A pre-treatment preparation may be applied to optimise the peel performance and ensure an even result.',
  },
  {
    n: '03',
    title: 'COOL Glow Peel Application',
    desc: 'The peel solution is applied evenly across the full face. You may experience a gentle tingling sensation. The treatment takes 30 to 45 minutes and is comfortable throughout.',
  },
  {
    n: '04',
    title: 'Neutralisation and Post-Treatment Care',
    desc: 'The peel is neutralised and removed. A soothing post-treatment serum and SPF are applied. Aftercare instructions are provided and you can return to normal activities immediately.',
  },
];

const BENEFITS = [
  {
    title: 'Instant Radiance',
    desc: 'The COOL Glow Peel delivers an immediate brightening effect, smoothing skin texture, refining pores, and revealing a luminous complexion after a single treatment.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="12" cy="12" r="10"/>
        <polyline points="12 6 12 12 16 14"/>
      </svg>
    ),
  },
  {
    title: 'Zero Downtime',
    desc: 'Unlike deeper chemical peels, the COOL Glow Peel has no significant peeling or recovery period, making it the perfect lunchtime treatment for busy lifestyles.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
      </svg>
    ),
  },
  {
    title: 'Targets Multiple Concerns',
    desc: 'Addresses dullness, uneven skin tone, mild pigmentation, fine lines, and enlarged pores, delivering a comprehensive complexion refresh in a single session.',
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
    title: 'Safe for All Skin Types',
    desc: 'The advanced formulation is designed to be well tolerated across all skin types, including sensitive and reactive skin, administered by our trained clinical team.',
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
    title: 'Stimulates Skin Renewal',
    desc: 'The peel removes dulling surface cells and stimulates healthy cell turnover, progressively improving skin quality, clarity, and luminosity with each session.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/>
        <polyline points="17 6 23 6 23 12"/>
      </svg>
    ),
  },
  {
    title: 'Expert-Led Treatment',
    desc: 'Delivered by our experienced clinical team, who assess your skin and tailor the treatment to achieve the best possible result for your complexion.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"/>
        <path d="M9 12l2 2 4-4"/>
      </svg>
    ),
  },
];

const ELIGIBILITY = [
  'Adults seeking an instant skin refresh and radiance boost',
  'Those with dull, uneven, or tired-looking complexion',
  'Patients with mild pigmentation, enlarged pores, or fine lines',
  'Anyone wanting a low-risk treatment with no recovery time',
  'Those looking for a pre-event skin treatment with immediate glow',
];

const TREATABLE_CONCERNS = [
  'Dull and tired-looking skin',
  'Uneven skin tone and texture',
  'Mild pigmentation and sun spots',
  'Enlarged pores',
  'Fine lines and early signs of ageing',
];

const TREATABLE_AREAS = [
  'Full face',
  'Forehead and temples',
  'Cheeks and nose',
  'Chin and jawline',
  'Neck and décolletage',
];

const CLINIC_REASONS = [
  'Expert clinical team with advanced skincare certifications',
  'Professional-grade COOL Glow Peel formulations',
  'Personalised skin assessment before every treatment',
  'Immediate results with zero downtime',
  'Safe and suitable for all skin types',
  'Same-day appointments and flexible scheduling',
];

const FAQS = [
  {
    question: 'What is the COOL Glow Peel?',
    answer:
      'The COOL Glow Peel is an advanced superficial skin resurfacing treatment designed to refresh and brighten the complexion with minimal downtime. Using a carefully formulated blend of exfoliating acids and skin-conditioning actives, it removes dull surface cells and stimulates skin renewal, leaving the face visibly smoother, clearer, and more radiant.',
  },
  {
    question: 'Is the COOL Glow Peel suitable for sensitive skin?',
    answer:
      'Yes. The COOL Glow Peel is specifically formulated to be gentle yet effective, making it suitable for most skin types including sensitive and reactive skin. A skin assessment is carried out before treatment to confirm suitability and ensure the best outcome.',
  },
  {
    question: 'How many treatments will I need?',
    answer:
      'Many patients are delighted with results after a single session, particularly as a pre-event skin refresh. For ongoing improvement in skin quality, a course of 4 to 6 treatments spaced 2 to 4 weeks apart is recommended. Your clinician will advise based on your skin goals.',
  },
  {
    question: 'What does the treatment feel like?',
    answer:
      'The COOL Glow Peel is comfortable and well-tolerated. Most patients experience a mild tingling sensation during application that quickly subsides. There is no pain, and the session is complete in 30 to 45 minutes.',
  },
  {
    question: 'Is there any downtime after the COOL Glow Peel?',
    answer:
      'No. The COOL Glow Peel is designed as a zero-downtime treatment. You can return to normal activities immediately, including wearing makeup. Some patients may notice very mild, temporary redness that settles within a few hours.',
  },
  {
    question: 'How quickly will I see results?',
    answer:
      'Results are visible immediately after treatment. Skin appears brighter, smoother, and more radiant right away. With a course of treatments, continued improvement in skin tone, texture, and clarity develops over several weeks.',
  },
  {
    question: 'Do I need a referral for the COOL Glow Peel?',
    answer:
      'No referral is needed. You can book directly with The One Clinic. A brief skin assessment is included before treatment to confirm the COOL Glow Peel is the right option for your skin type and concerns.',
  },
];

const RELATED = [
  { label: 'Chemical Peels', href: '/treatments/chemical-peels' },
  { label: 'HydraFacial', href: '/treatments/hydrafacial' },
  { label: 'Laser Resurfacing', href: '/treatments/laser-resurfacing' },
  { label: 'Lumecca IPL', href: '/treatments/lumecca-ipl' },
];

export default function CoolGlowPage() {
  const [showAllFaqs, setShowAllFaqs] = useState(false);

  return (
    <>
      {/* ════════════════════════════════════════
          1. HERO
      ════════════════════════════════════════ */}
      <section
        className={styles.hero}
        aria-label="COOL Glow Peel Leicester, hero"
        data-section-theme="dark"
      >
        <div className={styles.heroBreadcrumb}>
          <Container>
            <Breadcrumb
              theme="dark"
              items={[
                { label: 'Treatments', href: '/treatments' },
                { label: 'COOL Glow Peel (Full Face)' },
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
            <div className={styles.heroLeft}>
              <motion.span className={styles.heroCategory} variants={fadeUp}>
                Skin Rejuvenation Treatments
              </motion.span>

              <motion.h1 className={styles.heroTitle} variants={fadeUp}>
                COOL Glow Peel in Leicester
              </motion.h1>

              <motion.p className={styles.heroDesc} variants={fadeUp}>
                Instant radiance and skin refresh with zero downtime. Full-face brightening and rejuvenation, the perfect lunchtime treatment.
              </motion.p>

              <motion.div className={styles.heroCtas} variants={fadeUp}>
                <BookConsultationButton className={styles.heroCtaPrimary}>
                  Book Consultation
                </BookConsultationButton>
              </motion.div>

              <motion.div variants={fadeUp}>
                <TrustBadges theme="dark" />
              </motion.div>

              <motion.div className={styles.heroTrust} variants={fadeUp}>
                <span className={styles.heroTrustItem}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"/>
                    <path d="M4.5 20.118a7.5 7.5 0 0115 0"/>
                    <path d="M18.5 15v5M16 17.5h5"/>
                  </svg>
                  Expert clinical team
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
              </motion.div>
            </div>

            <motion.div className={styles.heroImageWrap} variants={fadeUp}>
              <Image
                src="/images/Dermatologist.jpg"
                alt="COOL Glow Peel treatment at The One Clinic Leicester"
                fill
                priority
                className={styles.heroImage}
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className={styles.heroImageFade} aria-hidden="true" />
            </motion.div>
          </motion.div>
        </Container>
      </section>

      {/* ════════════════════════════════════════
          2. WHAT IS COOL GLOW PEEL?
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
            <motion.div className={styles.whatIsContent} variants={stagger(0.12)}>
              <motion.div className={styles.whatIsTextGroup} variants={fadeUp}>
                <p className={styles.eyebrowDark}>About This Treatment</p>
                <h2 className={styles.combinedHeading}>What is the COOL Glow Peel?</h2>
                <p className={styles.combinedDesc}>
                  The COOL Glow Peel is a professional full-face skin resurfacing treatment that
                  combines gentle exfoliation with skin-brightening and conditioning actives. It
                  removes dulling surface cells, improves skin tone and texture, and stimulates
                  healthy cell renewal, with no significant downtime. At The One Clinic, it is
                  tailored to your skin and delivered by our expert clinical team.
                </p>
              </motion.div>

              <motion.div className={styles.whatIsCtaWrapper} variants={fadeUp}>
                <BookConsultationButton className={styles.whatIsCtaButton}>
                  Book Your Consultation
                </BookConsultationButton>
              </motion.div>
            </motion.div>

            <motion.div className={styles.whatIsVideoWrap} variants={fadeUp}>
              <Image
                src="/images/Doctor1.jpg"
                alt="COOL Glow Peel consultation at The One Clinic"
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
            <motion.p className={styles.eyebrowDark} variants={fadeUp}>At a Glance</motion.p>
            <motion.h2 className={styles.headingDark} variants={fadeUp}>
              COOL Glow Peel Overview
            </motion.h2>
          </motion.div>

          <motion.div
            className={styles.glanceGrid}
            variants={stagger(0.08)}
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
          >
            {AT_A_GLANCE.map((item) => (
              <motion.div key={item.label} className={styles.glanceCard} variants={fadeUp}>
                <div className={styles.glanceIconWrap} aria-hidden="true">{item.icon}</div>
                <p className={styles.glanceLabel}>{item.label}</p>
                <p className={styles.glanceValue}>{item.value}</p>
              </motion.div>
            ))}
          </motion.div>
        </Container>
      </Section>

      {/* ════════════════════════════════════════
          4. THE JOURNEY
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
            <motion.p className={styles.eyebrowLight} variants={fadeUp}>Your Journey</motion.p>
            <motion.h2 className={styles.headingLight} variants={fadeUp}>
              The COOL Glow Peel Journey
            </motion.h2>
          </motion.div>

          <motion.div
            className={styles.journeySection}
            variants={stagger(0.12)}
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
          >
            {JOURNEY_STEPS.map((step) => (
              <motion.div key={step.n} className={styles.journeyCard} variants={fadeUp}>
                <div className={styles.journeyCardInner}>
                  <span className={styles.journeyNumber}>{step.n}</span>
                  <h3 className={styles.journeyTitle}>{step.title}</h3>
                  <p className={styles.journeyDesc}>{step.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
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
          <motion.div
            className={styles.sectionHeaderCentre}
            variants={stagger(0.1)}
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
          >
            <motion.p className={styles.eyebrowDark} variants={fadeUp}>Why COOL Glow Peel</motion.p>
            <motion.h2 className={styles.headingDark} variants={fadeUp}>
              The Benefits of the COOL Glow Peel
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
                <span className={styles.treatedBenefitIconWrap} aria-hidden="true">{b.icon}</span>
                <h3 className={styles.treatedBenefitTitle}>{b.title}</h3>
                <p className={styles.treatedBenefitDesc}>{b.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </Container>
      </Section>

      {/* ════════════════════════════════════════
          6. ELIGIBILITY
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
            <motion.p className={styles.eyebrowLight} variants={fadeUp}>Eligibility</motion.p>
            <motion.h2 className={styles.headingLight} variants={fadeUp}>
              Are You a Good Candidate?
            </motion.h2>
          </motion.div>

          <motion.div
            className={styles.eligibilityGrid}
            variants={stagger(0.08)}
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
          >
            {ELIGIBILITY.map((item) => (
              <motion.div key={item} className={styles.eligibilityCard} variants={fadeUp}>
                <span className={styles.eligibilityCheck} aria-hidden="true">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <polyline points="2,10 7,15 18,4" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </span>
                <p className={styles.eligibilityText}>{item}</p>
              </motion.div>
            ))}
          </motion.div>
        </Container>
      </Section>

      {/* ════════════════════════════════════════
          7. RESULTS & AFTERCARE
      ════════════════════════════════════════ */}
      <Section variant="light" data-section-theme="light" className={styles.sectionGray}>
        <Container>
          <motion.div
            className={styles.resultsGrid}
            variants={stagger(0.12)}
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
          >
            <motion.div className={styles.resultsContent} variants={stagger(0.12)}>
              <motion.div className={styles.resultsTextGroup} variants={fadeUp}>
                <p className={styles.eyebrowDark}>Results and Aftercare</p>
                <h2 className={styles.combinedHeading}>What to Expect After Treatment</h2>
                <p className={styles.combinedDesc}>
                  The COOL Glow Peel requires no downtime. You can return to all normal activities
                  immediately, including wearing makeup. Skin will appear brighter and more radiant
                  right away. Some patients experience very mild, temporary redness that settles
                  within hours. Following your clinician's aftercare guidance, including daily SPF
                  and a gentle skincare routine, will maintain and enhance your results.
                </p>
              </motion.div>

              <motion.div className={styles.resultsCtaWrapper} variants={fadeUp}>
                <BookConsultationButton className={styles.resultsCtaButton}>
                  Schedule Your Treatment
                </BookConsultationButton>
              </motion.div>
            </motion.div>

            <motion.div className={styles.resultsImageWrap} variants={fadeUp}>
              <Image
                src="/images/Dermatologist.jpg"
                alt="COOL Glow Peel results at The One Clinic"
                fill
                className={styles.resultsImageFrame}
                sizes="(max-width: 900px) 100vw, 50vw"
              />
            </motion.div>
          </motion.div>
        </Container>
      </Section>

      {/* ════════════════════════════════════════
          8. TESTIMONIALS
      ════════════════════════════════════════ */}
      <Testimonials />

      {/* ════════════════════════════════════════
          9. CTA BANNER
      ════════════════════════════════════════ */}
      <section className={styles.ctaBanner} data-section-theme="dark" aria-label="Book COOL Glow Peel">
        <div className={styles.ctaBannerLogoWrap} aria-hidden="true">
          <Image src="/images/Background-logo.png" alt="" fill className={styles.ctaBannerLogo} sizes="100vw" />
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
              Glow Up.<br />No Downtime.
            </motion.h2>
            <motion.p className={styles.ctaBannerSub} variants={fadeUp}>
              Book a COOL Glow Peel consultation with our expert team in Leicester.
            </motion.p>
            <motion.div variants={fadeUp}>
              <BookConsultationButton className={styles.ctaBannerBtn}>Book Consultation</BookConsultationButton>
            </motion.div>
          </motion.div>
        </Container>
      </section>

      {/* ════════════════════════════════════════
          10. TREATABLE AREAS
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
            <motion.p className={styles.eyebrowDark} variants={fadeUp}>Treatment Areas</motion.p>
            <motion.h2 className={styles.headingDark} variants={fadeUp}>
              Treatable Concerns and Areas
            </motion.h2>
          </motion.div>

          <motion.div
            className={styles.treatedConcernsGrid}
            variants={stagger(0.08)}
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
          >
            {[...TREATABLE_CONCERNS, ...TREATABLE_AREAS].map((item) => (
              <motion.div key={item} className={styles.treatedConcernCard} variants={fadeUp}>
                <h3 className={styles.treatedConcernTitle}>{item}</h3>
              </motion.div>
            ))}
          </motion.div>
        </Container>
      </Section>

      {/* ════════════════════════════════════════
          11. CLINIC INTRO
      ════════════════════════════════════════ */}
      <Section variant="light" data-section-theme="light" className={styles.sectionGray}>
        <Container>
          <motion.div
            className={styles.clinicIntroGrid}
            variants={stagger(0.12)}
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
          >
            <motion.div className={styles.clinicIntroImageWrap} variants={fadeUp}>
              <Image
                src="/images/Doctor1.jpg"
                alt="The One Clinic Leicester team"
                fill
                className={styles.clinicIntroImage}
                sizes="(max-width: 900px) 100vw, 50vw"
              />
            </motion.div>

            <motion.div className={styles.clinicIntroContent} variants={stagger(0.12)}>
              <motion.div className={styles.clinicIntroTextGroup} variants={fadeUp}>
                <p className={styles.eyebrowDark}>About Our Clinic</p>
                <h2 className={styles.combinedHeading}>Leading Skin Treatments in Leicester</h2>
                <p className={styles.clinicIntroBody}>
                  The One Clinic brings together specialist clinical expertise and professional-grade
                  skincare to deliver outstanding COOL Glow Peel results. Our team is committed to
                  helping you achieve radiant, healthy skin with safe, effective treatments and
                  personalised care.
                </p>
              </motion.div>

              <motion.div className={styles.clinicIntroCtaWrapper} variants={fadeUp}>
                <BookConsultationButton className={styles.clinicIntroCtaButton}>
                  Meet Our Team
                </BookConsultationButton>
              </motion.div>
            </motion.div>
          </motion.div>
        </Container>
      </Section>

      {/* ════════════════════════════════════════
          12. COST BANNER
      ════════════════════════════════════════ */}
      <section className={styles.costBanner} data-section-theme="dark" aria-label="COOL Glow Peel cost">
        <Container>
          <motion.div
            className={styles.costBannerInner}
            variants={stagger(0.12)}
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
          >
            <motion.p className={styles.costBannerEyebrow} variants={fadeUp}>COOL Glow Peel Pricing at The One Clinic</motion.p>
            <motion.p className={styles.costBannerPrice} variants={fadeUp}>From £80</motion.p>
            <motion.p className={styles.costBannerNote} variants={fadeUp}>
              Pricing varies by treatment and number of sessions. Full details provided at your consultation.
            </motion.p>
            <motion.div variants={fadeUp}>
              <BookConsultationButton className={styles.ctaBannerBtn}>Book A Consultation</BookConsultationButton>
            </motion.div>
          </motion.div>
        </Container>
      </section>

      {/* ════════════════════════════════════════
          13. WHY CHOOSE
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
            <motion.p className={styles.eyebrowDark} variants={fadeUp}>Why Choose Us</motion.p>
            <motion.h2 className={styles.headingDark} variants={fadeUp}>
              Why Choose The One Clinic?
            </motion.h2>
          </motion.div>

          <motion.div
            className={styles.whyChooseGrid}
            variants={stagger(0.08)}
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
          >
            {CLINIC_REASONS.map((reason) => (
              <motion.div key={reason} className={styles.whyChooseCard} variants={fadeUp}>
                <p className={styles.whyChooseText}>{reason}</p>
              </motion.div>
            ))}
          </motion.div>
        </Container>
      </Section>

      {/* ════════════════════════════════════════
          14. MEET THE EXPERTS
      ════════════════════════════════════════ */}
      <MeetTheExperts />

      {/* ════════════════════════════════════════
          15. FAQ
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
            <motion.h2 className={styles.headingLight} variants={fadeUp}>Frequently Asked Questions</motion.h2>
          </motion.div>
          <motion.div
            className={styles.faqBody}
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
          >
            <Accordion items={showAllFaqs ? FAQS : FAQS.slice(0, 5)} theme="dark" />
            {!showAllFaqs && FAQS.length > 5 && (
              <motion.button
                onClick={() => setShowAllFaqs(true)}
                className={styles.faqToggle}
                variants={fadeUp}
              >
                Show All FAQs
              </motion.button>
            )}
          </motion.div>
        </Container>
      </Section>

      {/* ════════════════════════════════════════
          16. LEAD FORM
      ════════════════════════════════════════ */}
      <LeadForm />

      {/* ════════════════════════════════════════
          17. RELATED TREATMENTS
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
            <motion.p className={styles.eyebrowDark} variants={fadeUp}>Related Treatments</motion.p>
            <motion.h2 className={styles.headingDark} variants={fadeUp}>
              Explore Our Other Treatments
            </motion.h2>
          </motion.div>

          <motion.div
            className={styles.relatedGrid}
            variants={stagger(0.08)}
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
          >
            {RELATED.map((item) => (
              <Link key={item.href} href={item.href}>
                <motion.div className={styles.relatedCard} variants={fadeUp} whileHover={{ y: -4 }}>
                  <h3 className={styles.relatedTitle}>{item.label}</h3>
                </motion.div>
              </Link>
            ))}
          </motion.div>
        </Container>
      </Section>

      {/* ════════════════════════════════════════
          18. FINAL CTA
      ════════════════════════════════════════ */}
      <FinalCTA />
    </>
  );
}
