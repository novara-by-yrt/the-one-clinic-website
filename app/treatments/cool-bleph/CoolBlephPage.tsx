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
    value: 'Under 30 minutes',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="12" cy="12" r="10"/>
        <polyline points="12 6 12 12 16 14"/>
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
    value: '4 to 8 weeks',
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
    value: 'From £250',
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
    title: 'Consultation and Eye Area Assessment',
    desc: 'Our clinical team assesses the periorbital area, discussing your concerns around upper and lower eyelid laxity, puffiness, and skin texture. A personalised treatment plan is created.',
  },
  {
    n: '02',
    title: 'Treatment Area Preparation',
    desc: 'The eye area is thoroughly cleansed. Protective eye shields are applied to ensure safety. The treatment handpiece is calibrated to the appropriate settings for your skin type.',
  },
  {
    n: '03',
    title: 'Cool Bleph Energy Treatment',
    desc: 'The Cool Bleph device delivers precisely controlled energy to the eyelid area, stimulating collagen and tightening periorbital skin. The full procedure takes under 30 minutes.',
  },
  {
    n: '04',
    title: 'Post-Treatment Care and Guidance',
    desc: 'Aftercare instructions are provided to optimise your results. You can return to normal activities immediately. Collagen remodelling continues for weeks, with improvements becoming increasingly visible.',
  },
];

const BENEFITS = [
  {
    title: 'No Surgery, No Scars',
    desc: 'Cool Bleph delivers eyelid rejuvenation without a single incision. No general anaesthetic, no scarring, and no surgical risk.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
      </svg>
    ),
  },
  {
    title: 'Zero Downtime',
    desc: 'Return to your normal day immediately after treatment. No swelling, bruising, or recovery period, perfect for busy lifestyles.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="12" cy="12" r="10"/>
        <polyline points="12 6 12 12 16 14"/>
      </svg>
    ),
  },
  {
    title: 'Natural-Looking Results',
    desc: 'Tighter, more refreshed eyes that look naturally younger, not operated on. Friends will notice you look well-rested, not treated.',
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
    title: 'Fast, Comfortable Treatment',
    desc: 'The entire Cool Bleph procedure takes under 30 minutes. Most patients find it comfortable and well-tolerated throughout.',
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
    title: 'Stimulates Long-Lasting Collagen',
    desc: 'Energy delivery to the periorbital area triggers natural collagen production, improving skin firmness and elasticity for lasting rejuvenation.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/>
        <polyline points="17 6 23 6 23 12"/>
      </svg>
    ),
  },
  {
    title: 'Expert-Led Treatment',
    desc: 'Performed by clinicians with specialist training in periorbital aesthetics, ensuring precise, safe treatment with consistently outstanding outcomes.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"/>
        <path d="M9 12l2 2 4-4"/>
      </svg>
    ),
  },
];

const ELIGIBILITY = [
  'Adults concerned about upper or lower eyelid laxity and sagging',
  'Those seeking non-surgical alternatives to surgical blepharoplasty',
  'Individuals with under-eye puffiness or periorbital skin texture concerns',
  'Patients in good general health with no active eye conditions',
  'Anyone wanting immediate results with no surgery or downtime',
];

const TREATABLE_CONCERNS = [
  'Upper eyelid skin laxity and hooding',
  'Lower eyelid puffiness and bags',
  'Periorbital skin looseness and crepiness',
  'Fine lines and wrinkles around the eyes',
  'Overall tired or aged appearance of the eye area',
];

const TREATABLE_AREAS = [
  'Upper eyelids',
  'Lower eyelids',
  'Under-eye area',
  'Periorbital skin',
  'Crow\'s feet zone',
];

const CLINIC_REASONS = [
  'Specialist clinical team with periorbital aesthetic expertise',
  'Latest Cool Bleph technology for optimal results',
  'Personalised treatment plans tailored to your eye area concerns',
  'Zero downtime with immediate return to normal activities',
  'Safe, proven non-surgical approach',
  'Same-day appointments and flexible scheduling',
];

const FAQS = [
  {
    question: 'What is Cool Bleph?',
    answer:
      'Cool Bleph is a non-surgical eyelid rejuvenation treatment that uses advanced energy technology to tighten and refresh the periorbital area. It targets upper and lower eyelid laxity, under-eye bags, and periorbital skin texture with no incisions and no downtime.',
  },
  {
    question: 'How does Cool Bleph work?',
    answer:
      'Cool Bleph delivers controlled energy to the periorbital skin, stimulating collagen production and tightening the delicate eyelid tissue. This remodelling process continues for weeks after treatment, resulting in firmer, more youthful-looking eyes.',
  },
  {
    question: 'How many sessions will I need?',
    answer:
      'Most patients achieve excellent results after a single session. A course of 2 to 3 treatments spaced a few weeks apart may be recommended for more advanced laxity. A personalised plan is created at your consultation.',
  },
  {
    question: 'Is Cool Bleph painful?',
    answer:
      'Cool Bleph is generally well-tolerated and comfortable. Most patients report only a mild warming sensation. No anaesthetic is required and the session is complete in under 30 minutes.',
  },
  {
    question: 'What is the downtime after Cool Bleph?',
    answer:
      'There is no downtime. You can return to your normal activities immediately after treatment. Some patients may experience very mild, temporary redness around the eye area which subsides quickly.',
  },
  {
    question: 'When will I see results?',
    answer:
      'Many patients notice immediate improvements in skin firmness and appearance. Full results from collagen remodelling continue to develop over 4 to 8 weeks following treatment.',
  },
  {
    question: 'Do I need a referral for Cool Bleph?',
    answer:
      'No referral is needed. You can book directly with The One Clinic. A thorough consultation and assessment is carried out before treatment to confirm suitability and create a personalised plan.',
  },
];

const RELATED = [
  { label: 'Non-Surgical Blepharoplasty', href: '/treatments/non-surgical-blepharoplasty-leicester' },
  { label: 'Endolift', href: '/treatments/endolift' },
  { label: 'Profhilo', href: '/treatments/profhilo' },
  { label: 'Morpheus8', href: '/treatments/morpheus8' },
];

export default function CoolBlephPage() {
  const [showAllFaqs, setShowAllFaqs] = useState(false);

  return (
    <>
      {/* ════════════════════════════════════════
          1. HERO
      ════════════════════════════════════════ */}
      <section
        className={styles.hero}
        aria-label="Cool Bleph Leicester, hero"
        data-section-theme="dark"
      >
        <div className={styles.heroBreadcrumb}>
          <Container>
            <Breadcrumb
              theme="dark"
              items={[
                { label: 'Treatments', href: '/treatments' },
                { label: 'Cool Bleph' },
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
                Eye Rejuvenation
              </motion.span>

              <motion.h1 className={styles.heroTitle} variants={fadeUp}>
                Cool Bleph in Leicester
              </motion.h1>

              <motion.p className={styles.heroDesc} variants={fadeUp}>
                Non-surgical eyelid rejuvenation that lifts, tightens, and refreshes the eye area. No surgery, no downtime.
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
                alt="Cool Bleph eyelid treatment at The One Clinic Leicester"
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
          2. WHAT IS COOL BLEPH?
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
                <h2 className={styles.combinedHeading}>What is Cool Bleph?</h2>
                <p className={styles.combinedDesc}>
                  Cool Bleph is a cutting-edge non-surgical treatment designed to rejuvenate the
                  delicate skin around the eyes. Using advanced energy technology, it tightens
                  loose upper and lower eyelid skin, reduces puffiness, and stimulates collagen,
                  delivering a naturally refreshed appearance without surgery or recovery time.
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
                alt="Cool Bleph consultation at The One Clinic"
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
              Cool Bleph Overview
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
              The Cool Bleph Journey
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
            <motion.p className={styles.eyebrowDark} variants={fadeUp}>Why Cool Bleph</motion.p>
            <motion.h2 className={styles.headingDark} variants={fadeUp}>
              The Benefits of Cool Bleph
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
                  Cool Bleph requires no recovery time. You can resume all normal activities
                  immediately after your session. Immediate improvements in skin firmness are
                  often visible, with continued enhancement over 4 to 8 weeks as collagen
                  production increases. Following your clinician's aftercare guidance, including
                  gentle eye care and SPF protection, ensures the best possible long-term results.
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
                alt="Cool Bleph results at The One Clinic"
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
      <section className={styles.ctaBanner} data-section-theme="dark" aria-label="Book Cool Bleph consultation">
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
              Fresher Eyes,<br />No Surgery Needed.
            </motion.h2>
            <motion.p className={styles.ctaBannerSub} variants={fadeUp}>
              Book a Cool Bleph consultation with our expert team in Leicester.
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
                <h2 className={styles.combinedHeading}>Leading Eye Rejuvenation in Leicester</h2>
                <p className={styles.clinicIntroBody}>
                  The One Clinic brings together specialist expertise and advanced technology
                  to deliver outstanding Cool Bleph results. Our clinical team is dedicated to
                  refreshing and rejuvenating the eye area with precision, care, and a commitment
                  to natural-looking outcomes.
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
      <section className={styles.costBanner} data-section-theme="dark" aria-label="Cool Bleph cost">
        <Container>
          <motion.div
            className={styles.costBannerInner}
            variants={stagger(0.12)}
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
          >
            <motion.p className={styles.costBannerEyebrow} variants={fadeUp}>Cool Bleph Pricing at The One Clinic</motion.p>
            <motion.p className={styles.costBannerPrice} variants={fadeUp}>From £250</motion.p>
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
