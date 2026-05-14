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
    value: '45 to 90 minutes',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="12" cy="12" r="10"/>
        <polyline points="12 6 12 12 16 14"/>
      </svg>
    ),
  },
  {
    label: 'First Results',
    value: '2 to 4 weeks',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/>
        <polyline points="17 6 23 6 23 12"/>
      </svg>
    ),
  },
  {
    label: 'Full Results',
    value: '3 to 6 months',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"/>
        <path d="M9 12l2 2 4-4"/>
      </svg>
    ),
  },
  {
    label: 'Sessions Needed',
    value: '1 to 3 sessions',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <polyline points="1 4 1 10 7 10"/>
        <path d="M3.51 15a9 9 0 1 0 .49-3.1"/>
      </svg>
    ),
  },
  {
    label: 'Downtime',
    value: '1 to 3 days',
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
    value: 'From £300',
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
    title: 'Consultation and Skin Assessment',
    desc: 'Your doctor reviews your skin concerns, treatment history, and goals. A personalised Morpheus8 plan is designed including the areas to treat, depth settings, and number of sessions recommended for your skin type.',
  },
  {
    n: '02',
    title: 'Numbing and Preparation',
    desc: 'A topical anaesthetic cream is applied to the treatment area and left for 30 to 45 minutes. This ensures the procedure is comfortable. Your skin is then cleansed and prepared for treatment.',
  },
  {
    n: '03',
    title: 'Morpheus8 Treatment',
    desc: 'The Morpheus8 handpiece is passed over the treatment area, delivering fractional RF energy through ultra-fine needles into the deep dermis and subdermal tissue. Sessions typically take 45 to 90 minutes.',
  },
  {
    n: '04',
    title: 'Recovery and Review',
    desc: 'Mild redness and swelling resolve within 1 to 3 days. Results develop gradually as collagen remodelling occurs over 3 to 6 months. A review appointment is included to assess your progress and plan any follow-up sessions.',
  },
];

const BENEFITS = [
  {
    title: 'Deep Skin Tightening',
    desc: 'Morpheus8 delivers radiofrequency energy directly into the deep dermis and subdermal fat, stimulating collagen and elastin production for measurable, lasting skin tightening.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
      </svg>
    ),
  },
  {
    title: 'Progressive Collagen Renewal',
    desc: 'Results continue to improve for up to 6 months after treatment as the body rebuilds collagen. The longer-term improvement is one of Morpheus8\'s most valued qualities.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/>
        <polyline points="17 6 23 6 23 12"/>
      </svg>
    ),
  },
  {
    title: 'Works on Face and Body',
    desc: 'Morpheus8 treats the face, neck, jowls, abdomen, arms, and thighs. Wherever skin laxity, texture concerns, or fat irregularities exist, Morpheus8 can be applied.',
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
    title: 'Safe for All Skin Types',
    desc: 'Unlike laser treatments, Morpheus8 uses RF energy that works at depth without targeting surface pigment, making it safe and effective for all skin tones including darker complexions.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="12" cy="12" r="10"/>
        <path d="M9 12l2 2 4-4"/>
      </svg>
    ),
  },
  {
    title: 'Minimal Downtime',
    desc: 'Most patients experience mild redness and swelling for 1 to 3 days. There is no extended recovery period and no surgery involved, making it an ideal lunchtime-to-weekend treatment.',
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
    title: 'Long-Lasting Results',
    desc: 'A single course of Morpheus8 can deliver results lasting 1 to 2 years. Maintenance sessions help sustain skin quality and firmness over the longer term.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="12" cy="12" r="10"/>
        <polyline points="12 6 12 12 16 14"/>
      </svg>
    ),
  },
];

const ELIGIBILITY = [
  'Noticing skin laxity or sagging on the face, neck, or body',
  'Looking to improve acne scarring or uneven skin texture',
  'Seeking a non-surgical alternative to lifting procedures',
  'Wanting progressive, long-lasting results over several months',
  'Looking for a treatment that is safe for all skin tones',
];

const TREATABLE_FACE = [
  'Jowls and Lower Face Laxity',
  'Forehead and Brow Lines',
  'Neck and Jawline',
  'Eye Area (Periorbital)',
  'Acne Scarring',
];

const TREATABLE_BODY = [
  'Abdomen and Stomach',
  'Arms (Inner and Upper)',
  'Inner Thighs',
  'Knees',
  'Stretch Marks',
];

const CLINIC_REASONS = [
  { n: '01', text: 'All-in-one clinic with medical and aesthetic services.' },
  { n: '02', text: 'Highly trained, compassionate GMC-registered doctors.' },
  { n: '03', text: 'Customised treatments based on listening and expertise.' },
  { n: '04', text: 'State-of-the-art facilities and modern equipment.' },
  { n: '05', text: 'Strong reputation and excellent patient reviews.' },
  { n: '06', text: 'Comprehensive care and referrals with specialists.' },
];

const FAQS = [
  {
    question: 'What is Morpheus8?',
    answer:
      'Morpheus8 is a fractional radiofrequency (RF) microneedling device that delivers controlled energy deep into the skin and underlying fat. It stimulates collagen remodelling, tightens lax skin, and improves texture. Results continue to improve for up to 6 months after treatment.',
  },
  {
    question: 'How many sessions will I need?',
    answer:
      'Most patients achieve excellent results with 1 to 3 sessions spaced 4 to 6 weeks apart. A personalised treatment plan is created at your consultation based on your skin concerns, goals, and the areas being treated.',
  },
  {
    question: 'Is Morpheus8 painful?',
    answer:
      'A topical anaesthetic cream is applied 30 to 45 minutes before treatment to ensure comfort. Most patients experience mild warmth and pressure during the procedure rather than pain. Post-treatment, you may feel a mild sunburn-like sensation for a few hours.',
  },
  {
    question: 'What is the downtime after Morpheus8?',
    answer:
      'Most patients experience redness and minor swelling for 1 to 3 days. Some patients may have small pinpoint marks from the microneedles, which typically resolve within a few days. Most people return to normal activities within 3 days.',
  },
  {
    question: 'Is Morpheus8 safe for darker skin tones?',
    answer:
      'Yes. Unlike ablative laser treatments, Morpheus8 uses radiofrequency energy that works at depth without targeting surface pigment, making it safe and effective for all skin tones including darker complexions (Fitzpatrick types IV to VI).',
  },
  {
    question: 'When will I see results from Morpheus8?',
    answer:
      'Initial improvements may be visible from 2 to 4 weeks, but the most significant results appear at 3 to 6 months as new collagen builds progressively. This gradual improvement is considered one of the treatment\'s greatest advantages.',
  },
  {
    question: 'Can Morpheus8 be combined with other treatments?',
    answer:
      'Yes. Morpheus8 pairs excellently with treatments such as dermal fillers, Profhilo, and skin boosters to address both volume loss and skin quality simultaneously. Your doctor will advise on the ideal combination and sequencing at consultation.',
  },
  {
    question: 'Do I need a referral for Morpheus8?',
    answer:
      'No referral is needed. You can book directly with The One Clinic. A full consultation and skin assessment is carried out before any treatment to confirm suitability and create your personalised plan.',
  },
];

const RELATED = [
  { title: 'Endolift Laser',              href: '/treatments/endolift',                    desc: 'Minimally invasive laser skin tightening for face, neck, and body.' },
  { title: 'Dermal Fillers',              href: '/treatments/dermal-fillers',              desc: 'Restore lost volume and define facial contours with precision filler.' },
  { title: 'Deep Laser Resurfacing',      href: '/treatments/laser-resurfacing',           desc: 'Transform skin texture and tone with advanced laser technology.' },
  { title: 'Wrinkle Relaxing Injections', href: '/treatments/wrinkle-relaxing-injections', desc: 'Smooth expression lines with clinician-administered muscle-relaxing injections.' },
];

/* ── Page component ───────────────────────────────────────────── */
export default function Morpheus8Page() {
  const [showAllFaqs, setShowAllFaqs] = useState(false);

  return (
    <>
      {/* ════════════════════════════════════════
          1. HERO
      ════════════════════════════════════════ */}
      <section
        className={styles.hero}
        aria-label="Morpheus8 Leicester, hero"
        data-section-theme="dark"
      >
        <div className={styles.heroBreadcrumb}>
          <Container>
            <Breadcrumb
              theme="dark"
              items={[
                { label: 'Treatments', href: '/treatments' },
                { label: 'Morpheus8' },
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
                Skin Tightening &amp; Remodelling
              </motion.span>

              <motion.h1 className={styles.heroTitle} variants={fadeUp}>
                Morpheus8<br />in Leicester
              </motion.h1>

              <motion.p className={styles.heroDesc} variants={fadeUp}>
                Advanced RF microneedling for skin tightening, collagen renewal, and facial
                contouring. Visible results with minimal downtime, safe for all skin types.
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
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                    <circle cx="9" cy="7" r="4"/>
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
                    <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                  </svg>
                  Expert clinical team
                </span>
                <span className={styles.heroTrustDivider} aria-hidden="true" />
                <span className={styles.heroTrustItem}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                  </svg>
                  Safe for all skin types
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
                alt="Morpheus8 RF microneedling treatment at The One Clinic Leicester"
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
          2. WHAT IS MORPHEUS8?
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
                <h2 className={styles.combinedHeading}>What is Morpheus8?</h2>
                <p className={styles.combinedDesc}>
                  Morpheus8 combines fractional microneedling with radiofrequency energy to
                  remodel skin and underlying fat at depth. The result is tighter, smoother,
                  more youthful-looking skin without surgery. At The One Clinic, all Morpheus8
                  treatments are delivered by our expert clinical team with bespoke settings
                  tailored to your skin type and concerns.
                </p>
              </motion.div>

              <motion.div className={styles.combinedCtaWrapper} variants={fadeUp}>
                <BookConsultationButton className={styles.combinedCta}>
                  Book Your Consultation
                </BookConsultationButton>
              </motion.div>
            </motion.div>

            <motion.div className={styles.whatIsVideoWrap} variants={fadeUp}>
              <Image
                src="/images/Doctor1.jpg"
                alt="Morpheus8 consultation at The One Clinic"
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
              Morpheus8 at a Glance
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
          4. TREATMENT JOURNEY
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
            <motion.p className={styles.eyebrowDark} variants={fadeUp}>What to Expect</motion.p>
            <motion.h2 className={styles.headingDark} variants={fadeUp}>Your Treatment Journey</motion.h2>
          </motion.div>

          <motion.ol
            className={styles.journeyList}
            variants={stagger(0.12)}
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
            aria-label="Morpheus8 treatment journey steps"
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
            <motion.p className={styles.eyebrowDark} variants={fadeUp}>Why Choose This Treatment</motion.p>
            <motion.h2 className={styles.headingDark} variants={fadeUp}>
              The Benefits of Morpheus8
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
          6. IS THIS RIGHT FOR YOU?
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
            <motion.p className={styles.eyebrowLight} variants={fadeUp}>Is This Right for You?</motion.p>
            <motion.h2 className={styles.headingLight} variants={fadeUp}>
              Who Is a Good Candidate?
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
              Morpheus8 may be right for you if you are:
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
              If any of these apply, Morpheus8 could be the right solution for you.
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
          7. RESULTS, AFTERCARE & SIDE EFFECTS
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
            <motion.p className={styles.eyebrowLight} variants={fadeUp}>Post-Treatment</motion.p>
            <motion.h2 className={styles.headingLight} variants={fadeUp}>
              Results, Aftercare and Side Effects
            </motion.h2>
          </motion.div>

          <motion.div
            className={styles.resultsAfterGrid}
            variants={stagger(0.1)}
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
          >
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
                Initial improvements in skin texture and tone appear from 2 to 4 weeks. The most
                significant results develop gradually over 3 to 6 months as new collagen builds
                and the skin remodels from within.
              </p>
              <div className={styles.resultsAfterCardSpacer} />
              <p className={styles.resultsAfterCardNote}>
                Results from a full course typically last 1 to 2 years. Maintenance sessions help
                sustain skin quality and firmness long-term.
              </p>
            </motion.div>

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
              <p className={styles.resultsAfterCardBody}>
                Morpheus8 is a well-tolerated treatment. Common temporary effects include:
              </p>
              <ul className={styles.resultsAfterCardList} role="list">
                {[
                  'Redness and mild swelling for 1 to 3 days',
                  'Small pinpoint marks from microneedles',
                  'Mild skin sensitivity or warmth',
                ].map((item) => (
                  <li key={item} className={styles.resultsAfterCardListItem}>
                    <span className={styles.resultsAfterDot} aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
              <div className={styles.resultsAfterCardSpacer} />
              <p className={styles.resultsAfterCardNote}>
                These effects resolve quickly. More serious complications are rare when the
                treatment is performed by a trained clinician.
              </p>
            </motion.div>

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
                  'Apply soothing cream or aloe vera as directed',
                  'Use SPF 50 sunscreen daily for at least 2 weeks',
                  'Avoid makeup for 24 to 48 hours post-treatment',
                  'Avoid strenuous exercise for 48 hours',
                  'Attend your follow-up review appointment',
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
          8. PATIENT REVIEWS
      ════════════════════════════════════════ */}
      <Testimonials />

      {/* ════════════════════════════════════════
          9. CTA BANNER
      ════════════════════════════════════════ */}
      <section className={styles.ctaBanner} data-section-theme="dark" aria-label="Book Morpheus8 consultation">
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
              Tighter Skin.<br />No Surgery Required.
            </motion.h2>
            <motion.p className={styles.ctaBannerSub} variants={fadeUp}>
              Book a Morpheus8 consultation with our expert team in Leicester.
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
      <Section variant="dark" data-section-theme="dark" className={styles.conditionsSection}>
        <Container>
          <motion.div
            className={styles.sectionHeaderCentre}
            variants={stagger(0.1)}
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
          >
            <motion.p className={styles.eyebrowLight} variants={fadeUp}>Treatable Areas</motion.p>
            <motion.h2 className={styles.headingLight} variants={fadeUp}>
              What Areas Can We Treat?
            </motion.h2>
            <motion.p className={styles.conditionsIntro} variants={fadeUp}>
              Morpheus8 can be used on the face and body wherever skin laxity, texture
              concerns, or fat irregularities need to be addressed.
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
              <p className={styles.areasGroupLabel}>Face and Neck</p>
              <ul className={styles.areasGroupList} role="list">
                {TREATABLE_FACE.map((area) => (
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
                {TREATABLE_BODY.map((area) => (
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
          11. CLINIC INTRO
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
              <p className={styles.eyebrowLight}>Morpheus8 Treatment</p>
              <h2 className={styles.headingLight}>
                Best Morpheus8<br />in Leicester
              </h2>
            </motion.div>
            <motion.p className={styles.clinicIntroDesc} variants={fadeUp}>
              Experience the best Morpheus8 treatment in Leicester at The One Clinic. Our expert
              clinical team delivers bespoke RF microneedling protocols for face and body,
              tailored to your skin type and aesthetic goals. Enjoy progressive, long-lasting
              results in a safe, medically led environment.
            </motion.p>
          </motion.div>
        </Container>
      </Section>

      {/* ════════════════════════════════════════
          12. COST BANNER
      ════════════════════════════════════════ */}
      <section className={styles.costBanner} data-section-theme="dark" aria-label="Morpheus8 cost">
        <Container>
          <motion.div
            className={styles.costBannerInner}
            variants={stagger(0.12)}
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
          >
            <motion.p className={styles.costBannerEyebrow} variants={fadeUp}>Morpheus8 Pricing at The One Clinic</motion.p>
            <motion.p className={styles.costBannerPrice} variants={fadeUp}>From £300</motion.p>
            <motion.p className={styles.costBannerNote} variants={fadeUp}>
              Pricing varies by treatment area and number of sessions. Full details provided at your consultation.
            </motion.p>
            <motion.div variants={fadeUp}>
              <BookConsultationButton className={styles.ctaBannerBtn}>Book A Consultation</BookConsultationButton>
            </motion.div>
          </motion.div>
        </Container>
      </section>

      {/* ════════════════════════════════════════
          13. WHY CHOOSE THE ONE CLINIC
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
              Why Choose The One Clinic For Morpheus8
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
          14. MEET THE EXPERTS
      ════════════════════════════════════════ */}
      <MeetTheExperts />

      {/* ════════════════════════════════════════
          15. FAQ
      ════════════════════════════════════════ */}
      <section className={styles.faqSection} data-section-theme="light">
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
          16. BOOKING FORM
      ════════════════════════════════════════ */}
      <LeadForm />

      {/* ════════════════════════════════════════
          17. RELATED TREATMENTS
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
            <motion.p className={styles.eyebrowDark} variants={fadeUp}>Explore More</motion.p>
            <motion.h2 className={styles.headingDark} variants={fadeUp}>Related Treatments</motion.h2>
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
          18. FINAL CTA
      ════════════════════════════════════════ */}
      <FinalCTA />
    </>
  );
}
