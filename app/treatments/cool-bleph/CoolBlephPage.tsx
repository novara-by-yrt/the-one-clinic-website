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
    label: 'Treatment Duration',
    value: 'Under 30 minutes',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="12" cy="12" r="10"/>
        <polyline points="12 6 12 12 16 14"/>
      </svg>
    ),
  },
  {
    label: 'Sessions Recommended',
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
    title: 'Comprehensive Eye Area Assessment',
    desc: 'Our clinical team carries out a detailed evaluation of your upper and lower eyelids, assessing skin laxity, puffiness, and the specific areas of concern. We discuss your goals and create a bespoke Cool Bleph treatment plan tailored to your needs.',
  },
  {
    n: '02',
    title: 'Protective Preparation & Numbing',
    desc: 'The delicate eye area is carefully cleansed. Protective eye shields are fitted to ensure absolute safety. A topical numbing agent is applied to ensure your complete comfort throughout the procedure.',
  },
  {
    n: '03',
    title: 'Precision Cool Bleph Energy Delivery',
    desc: 'Advanced energy technology is precisely applied to the periorbital region, carefully stimulating collagen contraction and remodelling in the upper and lower eyelid areas. The treatment is gentle, comfortable, and typically takes under 30 minutes.',
  },
  {
    n: '04',
    title: 'Immediate Aftercare & Results Progression',
    desc: 'Soothing post-treatment serums are applied. You receive detailed aftercare instructions to optimise your results. Many patients see immediate skin tightening, with continued improvement developing progressively over 4 to 8 weeks.',
  },
];

const BENEFITS = [
  {
    title: 'Non-Surgical Eyelid Rejuvenation',
    desc: 'Achieve the results of a surgical blepharoplasty without incisions, anaesthesia, or downtime. Lift and tighten the upper and lower eyelids safely and comfortably with advanced energy technology.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
      </svg>
    ),
  },
  {
    title: 'Zero Downtime Recovery',
    desc: 'Return to your normal day immediately after treatment. No swelling, bruising, or recovery period. Perfect for professionals and those with busy schedules who want dramatic eye rejuvenation without interrupting their routine.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="12" cy="12" r="10"/>
        <polyline points="12 6 12 12 16 14"/>
      </svg>
    ),
  },
  {
    title: 'Natural-Looking, Refreshed Eyes',
    desc: 'Achieve a naturally rejuvenated appearance where friends notice you look well-rested, not treated. Subtle, progressive improvements create a refreshed, youthful eye area without looking overdone or artificial.',
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
    title: 'Reduces Upper & Lower Eyelid Laxity',
    desc: 'Targets both upper eyelid hooding and lower eyelid looseness simultaneously. Tightens and lifts sagging skin while reducing the appearance of under-eye puffiness and bags for a more alert, youthful expression.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
        <circle cx="12" cy="12" r="3"/>
      </svg>
    ),
  },
  {
    title: 'Stimulates Collagen & Elastin Production',
    desc: 'The treatment triggers the skin\'s natural healing response, promoting new collagen and elastin formation for progressive skin tightening and improved periorbital texture that continues developing over weeks and months.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/>
        <polyline points="17 6 23 6 23 12"/>
      </svg>
    ),
  },
  {
    title: 'Expert Periorbital Aesthetics',
    desc: 'Performed by clinicians with specialist training in delicate eye area treatments. Precision application ensures exceptional safety and results, with particular attention to the sensitive skin surrounding the eyes.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"/>
        <path d="M9 12l2 2 4-4"/>
      </svg>
    ),
  },
];

const ELIGIBILITY = [
  'Adults with upper eyelid hooding or sagging affecting their appearance',
  'Those with lower eyelid puffiness or under-eye bags and laxity',
  'Patients seeking a non-surgical alternative to surgical blepharoplasty',
  'Anyone concerned about periorbital wrinkles and fine lines around the eyes',
  'Individuals in good general health wanting immediate, zero-downtime results',
];

const TREATABLE_CONCERNS = [
  'Upper eyelid sagging and hooding',
  'Lower eyelid laxity and looseness',
  'Under-eye puffiness and bags',
  'Periorbital fine lines and wrinkles',
  'Overall tired or aged appearance of the eye region',
];

const TREATABLE_AREAS = [
  'Upper eyelids',
  'Lower eyelids',
  'Under-eye area (tear trough)',
  'Outer corners of eyes (crow\'s feet region)',
  'Brow area',
];

const CLINIC_REASONS = [
  { n: '01', text: 'Specialist clinical team with advanced periorbital aesthetic training.' },
  { n: '02', text: 'Latest FDA-approved Cool Bleph technology for optimal results.' },
  { n: '03', text: 'Comprehensive eye area assessment and personalised treatment planning.' },
  { n: '04', text: 'Zero downtime with immediate return to normal activities.' },
  { n: '05', text: 'Safe, proven non-surgical approach for all skin types.' },
  { n: '06', text: 'Same-day appointments and flexible scheduling for busy lifestyles.' },
];

const FAQS = [
  {
    question: 'What is Cool Bleph and how does it work?',
    answer:
      'Cool Bleph is an advanced non-surgical eyelid rejuvenation treatment that uses precision-controlled energy technology to tighten and lift the periorbital skin. It targets the upper and lower eyelid areas, reducing laxity, puffiness, and fine lines while stimulating natural collagen production. The treatment delivers energy at precise depths to achieve skin tightening without any incisions or downtime.',
  },
  {
    question: 'Is Cool Bleph safe for the delicate eye area?',
    answer:
      'Yes. Cool Bleph is specifically designed for the delicate periorbital region and is performed by clinicians with specialist training in eye area treatments. The technology includes built-in safety features and protective mechanisms. Protective eye shields are used during treatment to ensure absolute safety of the eyes themselves.',
  },
  {
    question: 'How much downtime will I experience?',
    answer:
      'Cool Bleph requires zero downtime. You can return to your normal daily activities, including work, immediately after treatment. You may apply makeup right away if desired. Some patients experience very mild, temporary redness that settles within hours. No swelling, bruising, or recovery period is typical.',
  },
  {
    question: 'When will I see results from Cool Bleph?',
    answer:
      'Many patients notice immediate skin tightening and a more refreshed appearance right after their first session. Results continue to improve progressively over 4 to 8 weeks as collagen remodelling occurs. Full benefits typically develop by 2 to 3 months, with continued subtle improvement over subsequent months.',
  },
  {
    question: 'How many Cool Bleph sessions will I need?',
    answer:
      'Most patients see excellent results after a single session. Many are completely satisfied with one treatment. For those with more advanced periorbital laxity or who want more dramatic lifting, a course of 2 to 3 treatments spaced 4 to 6 weeks apart may be recommended. Your clinician will create a personalised plan at your consultation.',
  },
  {
    question: 'Is Cool Bleph suitable for all skin types and ages?',
    answer:
      'Cool Bleph is safe and effective for a wide range of skin types and tones. The treatment can be customised to your specific skin characteristics. Ideal candidates are typically adults with mild to moderate eyelid laxity, though our team will assess your individual situation during your consultation to ensure it\'s the right treatment for you.',
  },
  {
    question: 'How does Cool Bleph compare to surgical blepharoplasty?',
    answer:
      'Cool Bleph offers non-surgical eyelid rejuvenation without incisions, anaesthesia, or downtime. Surgical blepharoplasty removes excess skin surgically but involves recovery time and scarring risk. Cool Bleph is ideal for those with mild to moderate concerns who want immediate results without surgery. For severe eyelid laxity, surgery may be more appropriate.',
  },
  {
    question: 'Can Cool Bleph be combined with other treatments?',
    answer:
      'Yes. Cool Bleph works beautifully alongside other treatments such as dermal fillers for volume restoration, anti-wrinkle injections for dynamic lines, or other facial rejuvenation treatments. Many patients combine Cool Bleph with treatments for surrounding facial areas to achieve comprehensive facial rejuvenation. Your clinician can recommend optimal combination approaches.',
  },
  {
    question: 'How long do Cool Bleph results last?',
    answer:
      'Cool Bleph results typically last 1 to 2 years, with many patients maintaining excellent results for longer. The duration depends on your age, skin quality, lifestyle, and sun exposure. Maintenance treatments every 1 to 2 years can sustain your results long-term. Proper skincare and sun protection help extend the longevity of your outcome.',
  },
];

const RELATED = [
  { title: 'Non-Surgical Blepharoplasty',       href: '/treatments/non-surgical-blepharoplasty-leicester', desc: 'Advanced eye rejuvenation without surgery or downtime.' },
  { title: 'Endolift Laser',                    href: '/treatments/endolift',                           desc: 'Non-surgical skin lifting and tightening for face and body.' },
  { title: 'Morpheus8',                         href: '/treatments/morpheus8',                          desc: 'Fractional radiofrequency for comprehensive skin remodelling.' },
  { title: 'Profhilo',                          href: '/treatments/profhilo',                           desc: 'Bio-stimulating treatment for deep hydration and rejuvenation.' },
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
                Non-surgical eyelid rejuvenation with zero downtime. Lift, tighten, and refresh the eye area for a naturally refreshed, youthful appearance.
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
                  Expert periorbital specialists
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
                  Cool Bleph is an advanced, non-surgical eyelid rejuvenation treatment designed to lift, tighten, and refresh the delicate periorbital area. Using precision energy technology, it addresses upper eyelid hooding, lower eyelid laxity, under-eye puffiness, and fine lines without any incisions, anaesthesia, or downtime. The treatment stimulates the skin\'s natural collagen production, delivering progressive, natural-looking results that develop over weeks following your session.
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
            <motion.p className={styles.eyebrowDark} variants={fadeUp}>Quick Facts</motion.p>
            <motion.h2 className={styles.headingDark} variants={fadeUp}>
              Cool Bleph Treatment at a Glance
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
      <Section variant="dark" data-section-theme="dark">
        <Container>
          <motion.div
            className={styles.sectionHeaderCentre}
            variants={stagger(0.1)}
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
          >
            <motion.p className={styles.eyebrowLight} variants={fadeUp}>What to Expect</motion.p>
            <motion.h2 className={styles.headingLight} variants={fadeUp}>Your Cool Bleph Journey</motion.h2>
          </motion.div>

          <motion.ol
            className={styles.journeyList}
            variants={stagger(0.12)}
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
            aria-label="Cool Bleph treatment journey steps"
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
              Cool Bleph is ideal for you if you are:
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
          </motion.div>
        </Container>
      </Section>

      {/* ════════════════════════════════════════
          7. TREATABLE AREAS
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
            <motion.p className={styles.eyebrowLight} variants={fadeUp}>Treatment Focus</motion.p>
            <motion.h2 className={styles.headingLight} variants={fadeUp}>
              What Can We Treat?
            </motion.h2>
            <motion.p className={styles.conditionsIntro} variants={fadeUp}>
              Cool Bleph addresses a range of periorbital concerns across the upper and lower eye regions.
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
              <p className={styles.areasGroupLabel}>Concerns Treated</p>
              <ul className={styles.areasGroupList} role="list">
                {TREATABLE_CONCERNS.map((item) => (
                  <li key={item} className={styles.areasGroupItem}>
                    <span className={styles.areasItemDot} aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              className={styles.areasGroup}
              variants={fadeUp}
              whileHover={{ y: -6, transition: { type: 'spring', stiffness: 280, damping: 20 } }}
            >
              <p className={styles.areasGroupLabel}>Treatment Areas</p>
              <ul className={styles.areasGroupList} role="list">
                {TREATABLE_AREAS.map((item) => (
                  <li key={item} className={styles.areasGroupItem}>
                    <span className={styles.areasItemDot} aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
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
              Fresher, More Alert Eyes.<br />Without Surgery.
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
          10. CLINIC INTRO
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
              <p className={styles.eyebrowDark}>About Our Clinic</p>
              <h2 className={styles.headingDark}>
                Leading Eye Rejuvenation<br />in Leicester
              </h2>
            </motion.div>
            <motion.p className={styles.clinicIntroDesc} variants={fadeUp}>
              The One Clinic brings together specialist clinical expertise with advanced Cool Bleph technology to deliver outstanding periorbital rejuvenation results. Our team is dedicated to creating naturally refreshed, youthful-looking eyes with safe, precise treatments and comprehensive patient care.
            </motion.p>
          </motion.div>
        </Container>
      </Section>

      {/* ════════════════════════════════════════
          11. COST BANNER
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
              Pricing varies by treatment area and number of sessions required. Full details provided at your consultation.
            </motion.p>
            <motion.div variants={fadeUp}>
              <BookConsultationButton className={styles.ctaBannerBtn}>Book A Consultation</BookConsultationButton>
            </motion.div>
          </motion.div>
        </Container>
      </section>

      {/* ════════════════════════════════════════
          12. WHY CHOOSE THE ONE CLINIC
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
              Why Choose The One Clinic For Cool Bleph
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
          13. MEET THE EXPERTS
      ════════════════════════════════════════ */}
      <MeetTheExperts />

      {/* ════════════════════════════════════════
          14. FAQ
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
          15. LEAD FORM
      ════════════════════════════════════════ */}
      <LeadForm />

      {/* ════════════════════════════════════════
          16. RELATED TREATMENTS
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
          17. FINAL CTA
      ════════════════════════════════════════ */}
      <FinalCTA />
    </>
  );
}
