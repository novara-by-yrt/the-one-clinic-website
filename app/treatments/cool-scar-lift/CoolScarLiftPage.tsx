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
    value: '30 to 60 minutes',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="12" cy="12" r="10"/>
        <polyline points="12 6 12 12 16 14"/>
      </svg>
    ),
  },
  {
    label: 'Sessions Needed',
    value: '2 to 4 sessions',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <polyline points="1 4 1 10 7 10"/>
        <path d="M3.51 15a9 9 0 1 0 .49-3.1"/>
      </svg>
    ),
  },
  {
    label: 'First Results',
    value: '4 to 6 weeks',
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
    label: 'Downtime',
    value: 'Minimal',
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
    value: 'From £200',
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
    title: 'Consultation and Scar Assessment',
    desc: 'Our clinical team assesses your scar type, age, depth, and skin tone. A personalised treatment plan is created specifying the technology, settings, and number of sessions required.',
  },
  {
    n: '02',
    title: 'Treatment Area Preparation',
    desc: 'The scar area is cleansed thoroughly. A topical preparation may be applied as needed. Protective measures are provided and the treatment device is calibrated to your specific scar profile.',
  },
  {
    n: '03',
    title: 'Cool Scar Lift Treatment',
    desc: 'Targeted energy is delivered to the scar tissue, breaking down fibrous bands and stimulating new collagen production. Treatment typically takes 30 to 60 minutes depending on the area.',
  },
  {
    n: '04',
    title: 'Post-Treatment Care and Monitoring',
    desc: 'Aftercare instructions are provided to support healing and optimise collagen remodelling. Mild redness may briefly occur. Results continue to improve over months as collagen rebuilds.',
  },
];

const BENEFITS = [
  {
    title: 'Visible Scar Improvement',
    desc: 'Cool Scar Lift remodels scar tissue from within, softening raised, depressed, or discoloured scars for a smoother, more even skin surface.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="12" cy="12" r="10"/>
        <polyline points="12 6 12 12 16 14"/>
      </svg>
    ),
  },
  {
    title: 'No Surgery, No Downtime',
    desc: 'A non-invasive procedure with no incisions and minimal recovery. Most patients return to their normal routine straight after treatment.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
      </svg>
    ),
  },
  {
    title: 'Treats All Scar Types',
    desc: 'Effective on acne scars, surgical scars, stretch marks, and traumatic scars. Suitable for face and body across a range of skin types.',
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
    desc: 'By stimulating the skin\'s natural collagen response, Cool Scar Lift produces improvements that continue to develop over weeks and months.',
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
    title: 'Collagen Stimulation',
    desc: 'The treatment triggers the body\'s natural healing response, promoting new collagen and elastin formation that progressively improves scar texture and appearance.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/>
        <polyline points="17 6 23 6 23 12"/>
      </svg>
    ),
  },
  {
    title: 'Expert-Led Care',
    desc: 'Delivered by clinicians experienced in scar management, ensuring precise, safe treatment tailored to each individual scar and skin type.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"/>
        <path d="M9 12l2 2 4-4"/>
      </svg>
    ),
  },
];

const ELIGIBILITY = [
  'Adults with acne scars, surgical scars, or traumatic scars',
  'Those with stretch marks seeking non-surgical improvement',
  'Patients with raised hypertrophic or keloid-prone scars (assessed at consultation)',
  'Anyone wanting progressive, natural-looking scar improvement',
  'Individuals in good general health with no active skin infections',
];

const TREATABLE_CONCERNS = [
  'Acne scars and post-acne marks',
  'Surgical and traumatic scars',
  'Stretch marks',
  'Hypertrophic and raised scars',
  'Depressed or tethered scar tissue',
];

const TREATABLE_AREAS = [
  'Face and cheeks',
  'Chest and décolletage',
  'Abdomen and flanks',
  'Arms and shoulders',
  'Legs and thighs',
];

const CLINIC_REASONS = [
  'Expert clinical team experienced in scar management',
  'Advanced energy-based technology for precise treatment',
  'Personalised plans based on scar type and skin tone',
  'Minimal downtime with gradual, natural-looking results',
  'Safe and effective for a wide range of scar types',
  'Same-day appointments and flexible scheduling',
];

const FAQS = [
  {
    question: 'What is Cool Scar Lift?',
    answer:
      'Cool Scar Lift is an advanced non-surgical treatment that uses targeted energy technology to remodel scar tissue and stimulate the skin\'s natural healing response. It breaks down the fibrous bands within scars, lifts depressed areas, and improves overall skin texture, delivering progressive, natural-looking results.',
  },
  {
    question: 'What types of scars can be treated?',
    answer:
      'Cool Scar Lift can be used on a wide variety of scar types including acne scars, post-surgical scars, traumatic scars, stretch marks, and hypertrophic scars. A thorough assessment is carried out at your consultation to confirm suitability and tailor the treatment to your specific concerns.',
  },
  {
    question: 'How many sessions will I need?',
    answer:
      'The number of sessions depends on the type, age, and severity of the scar. Many patients see improvement after 2 to 4 treatments spaced a few weeks apart. A bespoke treatment plan will be created for you at your consultation.',
  },
  {
    question: 'Is Cool Scar Lift painful?',
    answer:
      'Most patients find the treatment comfortable and well-tolerated. A mild warming or tingling sensation may be felt during the procedure. No general anaesthetic is required, and sessions are completed in 30 to 60 minutes.',
  },
  {
    question: 'What is the downtime after treatment?',
    answer:
      'Downtime is minimal. Most patients can return to normal activities immediately. Some mild redness or sensitivity in the treated area may occur briefly and usually settles within a day or two.',
  },
  {
    question: 'When will I see results?',
    answer:
      'Initial improvements may be visible after 4 to 6 weeks, with full results continuing to develop over 3 to 6 months as collagen remodelling progresses. Multiple sessions produce the most significant and lasting improvement.',
  },
  {
    question: 'Do I need a referral for Cool Scar Lift?',
    answer:
      'No referral is needed. You can book directly with The One Clinic. A full consultation and skin assessment is included before any treatment begins to confirm suitability and create a personalised plan.',
  },
];

const RELATED = [
  { label: 'Laser Resurfacing', href: '/treatments/laser-resurfacing' },
  { label: 'Morpheus8', href: '/treatments/morpheus8' },
  { label: 'Chemical Peels', href: '/treatments/chemical-peels' },
  { label: 'Acne Scar Removal Leicester', href: '/treatments/acne-scar-removal-leicester' },
];

export default function CoolScarLiftPage() {
  const [showAllFaqs, setShowAllFaqs] = useState(false);

  return (
    <>
      {/* ════════════════════════════════════════
          1. HERO
      ════════════════════════════════════════ */}
      <section
        className={styles.hero}
        aria-label="Cool Scar Lift Leicester, hero"
        data-section-theme="dark"
      >
        <div className={styles.heroBreadcrumb}>
          <Container>
            <Breadcrumb
              theme="dark"
              items={[
                { label: 'Treatments', href: '/treatments' },
                { label: 'Cool Scar Lift' },
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
                Scar Reduction and Skin Resurfacing
              </motion.span>

              <motion.h1 className={styles.heroTitle} variants={fadeUp}>
                Cool Scar Lift in Leicester
              </motion.h1>

              <motion.p className={styles.heroDesc} variants={fadeUp}>
                Advanced non-surgical scar reduction. Remodel scar tissue, improve skin texture, and restore confidence without surgery or downtime.
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
                src="/images/Minor Surgery.jpg"
                alt="Cool Scar Lift treatment at The One Clinic Leicester"
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
          2. WHAT IS COOL SCAR LIFT?
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
                <h2 className={styles.combinedHeading}>What is Cool Scar Lift?</h2>
                <p className={styles.combinedDesc}>
                  Cool Scar Lift is a non-surgical treatment that targets scar tissue at its source.
                  Using advanced energy-based technology, it breaks down fibrous scar bands, stimulates
                  new collagen formation, and gradually lifts and smooths the skin, improving both the
                  appearance and texture of even long-standing scars.
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
                alt="Cool Scar Lift consultation at The One Clinic"
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
              Cool Scar Lift Overview
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
              The Cool Scar Lift Journey
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
            <motion.p className={styles.eyebrowDark} variants={fadeUp}>Why Cool Scar Lift</motion.p>
            <motion.h2 className={styles.headingDark} variants={fadeUp}>
              The Benefits of Cool Scar Lift
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
                  Cool Scar Lift requires minimal downtime. Mild redness or sensitivity may briefly
                  occur in the treated area and typically settles within 24 to 48 hours. Initial
                  improvements become visible around 4 to 6 weeks, with full collagen remodelling
                  results developing over 3 to 6 months. Following your clinician's aftercare
                  guidance, including sun protection and gentle skincare, maximises your outcome.
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
                src="/images/Minor Surgery.jpg"
                alt="Cool Scar Lift results at The One Clinic"
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
      <section className={styles.ctaBanner} data-section-theme="dark" aria-label="Book Cool Scar Lift consultation">
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
              Smoother Skin,<br />Starting Today.
            </motion.h2>
            <motion.p className={styles.ctaBannerSub} variants={fadeUp}>
              Book a Cool Scar Lift consultation with our expert team in Leicester.
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
                <h2 className={styles.combinedHeading}>Leading Scar Treatment in Leicester</h2>
                <p className={styles.clinicIntroBody}>
                  The One Clinic combines specialist clinical expertise with advanced technology
                  to deliver outstanding scar treatment results. Our team is dedicated to helping
                  patients achieve meaningful, lasting improvements in scar appearance with safe,
                  evidence-based non-surgical treatments.
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
      <section className={styles.costBanner} data-section-theme="dark" aria-label="Cool Scar Lift cost">
        <Container>
          <motion.div
            className={styles.costBannerInner}
            variants={stagger(0.12)}
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
          >
            <motion.p className={styles.costBannerEyebrow} variants={fadeUp}>Cool Scar Lift Pricing at The One Clinic</motion.p>
            <motion.p className={styles.costBannerPrice} variants={fadeUp}>From £200</motion.p>
            <motion.p className={styles.costBannerNote} variants={fadeUp}>
              Pricing varies by scar type, size, and number of sessions required. Full details provided at your consultation.
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
