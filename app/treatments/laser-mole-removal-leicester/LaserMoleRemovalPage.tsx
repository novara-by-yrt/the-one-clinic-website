'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { m } from 'framer-motion';
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
    value: 'Under 30 minutes per mole',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="12" cy="12" r="10"/>
        <polyline points="12 6 12 12 16 14"/>
      </svg>
    ),
  },
  {
    label: 'Sessions Needed',
    value: 'Single procedure',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <polyline points="1 4 1 10 7 10"/>
        <path d="M3.51 15a9 9 0 1 0 .49-3.1"/>
      </svg>
    ),
  },
  {
    label: 'First Results',
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
    value: 'From £150',
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
    title: 'Mole Consultation and Assessment',
    desc: 'Our doctor carefully examines the mole and assesses whether it is suitable for laser removal. Any mole with suspicious features will be referred for further investigation rather than treated immediately.',
  },
  {
    n: '02',
    title: 'Numbing and Preparation',
    desc: 'A topical numbing cream is applied to the mole area, followed by local anaesthetic injection if needed. The surrounding skin is protected to ensure the laser targets only the mole.',
  },
  {
    n: '03',
    title: 'Laser Treatment',
    desc: 'The laser is carefully directed at the mole in short pulses, breaking down the pigmented cells. The procedure is quick, usually taking just a few minutes per mole.',
  },
  {
    n: '04',
    title: 'Aftercare and Healing',
    desc: 'A protective dressing is applied and detailed aftercare instructions provided. The mole gradually fades over 4 to 8 weeks as the treated tissue is absorbed by the body.',
  },
];

const BENEFITS = [
  {
    title: 'Precise and Targeted',
    desc: 'Laser energy is directed precisely at the mole tissue, leaving surrounding skin undisturbed and minimising the risk of scarring.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="12" cy="12" r="10"/>
        <polyline points="12 6 12 12 16 14"/>
      </svg>
    ),
  },
  {
    title: 'Minimal Scarring',
    desc: 'Laser removal causes far less tissue damage than traditional surgical excision, resulting in a cleaner, flatter finish with reduced scarring.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
      </svg>
    ),
  },
  {
    title: 'Fast Treatment',
    desc: 'Most moles are treated in a single short session. The procedure itself takes only minutes per mole under topical or local anaesthetic.',
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
    title: 'Safe and Medically Assessed',
    desc: 'Every mole is clinically assessed by a doctor before treatment. Suspicious lesions are referred for appropriate investigation before any removal.',
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
    title: 'Single Session Treatment',
    desc: 'Most moles are successfully removed in a single treatment appointment with no need for repeated visits or complex treatment plans.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
        <polyline points="22 4 12 14.01 9 11.01"/>
      </svg>
    ),
  },
  {
    title: 'No Stitches or Surgery Required',
    desc: 'Non-invasive laser treatment means no surgical incisions, no stitches, and no surgical recovery period. Minimal downtime allows you to return to normal activities immediately.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
        <circle cx="12" cy="12" r="3"/>
      </svg>
    ),
  },
];

const ELIGIBILITY = [
  'Have a raised, flat, or pigmented mole you want removed',
  'Want a non-surgical removal option with minimal scarring',
  'Mole has been medically assessed as benign',
  'Looking for fast treatment with minimal downtime',
  'Seeking expert-led care from qualified medical professionals',
];

const TREATABLE_CONCERNS = [
  'Raised and Pigmented Moles',
  'Flat Moles',
  'Darkened Moles',
  'Bothersome Moles (cosmetic concern)',
  'Multiple Moles on Same Area',
];

const TREATABLE_AREAS = [
  'Face and Scalp',
  'Neck and Chest',
  'Back and Shoulders',
  'Arms and Legs',
  'Any Body Area',
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
    question: 'What is laser mole removal?',
    answer:
      'Laser mole removal uses concentrated light energy to break down the pigment and tissue within a mole. The laser targets the mole precisely, causing it to gradually fade and disappear over the weeks following treatment, without the need for surgical cutting or stitches.',
  },
  {
    question: 'Is laser mole removal safe?',
    answer:
      'Yes, when carried out by trained medical professionals. At The One Clinic, every mole is assessed by a doctor before treatment to confirm it is benign and suitable for laser removal. Any mole showing features of concern will be referred for further investigation prior to treatment.',
  },
  {
    question: 'How long does the procedure take?',
    answer:
      'Most moles are treated in under 30 minutes, with the actual laser treatment often taking just a few minutes per mole. The time varies depending on the size and number of moles being treated.',
  },
  {
    question: 'Will there be a scar after laser mole removal?',
    answer:
      'Laser removal causes significantly less scarring than surgical excision. The laser creates a very clean wound with minimal tissue damage, allowing the skin to heal naturally with very little visible scarring in most cases.',
  },
  {
    question: 'Can all moles be removed with laser?',
    answer:
      'Most moles can be treated with laser, but some very deep moles or those with certain characteristics may be better suited to other removal methods. Our doctors assess each mole individually to recommend the best approach.',
  },
  {
    question: 'How quickly can I get an appointment?',
    answer:
      'Same-day and next-day appointments are often available. Contact The One Clinic and our team will book you in at the earliest convenient time.',
  },
  {
    question: 'Do I need a referral for laser mole removal?',
    answer:
      'No referral is needed. You can book directly with us. A full medical assessment of the mole is included at your consultation before any treatment takes place.',
  },
];

const RELATED = [
  { title: 'Mole Removal Leicester',           href: '/treatments/mole-removal-leicester',          desc: 'Surgical mole removal for complete elimination.' },
  { title: 'Skin Tag Removal Leicester',       href: '/treatments/skin-tag-removal-leicester',     desc: 'Safe removal of skin tags and benign growths.' },
  { title: 'Skin Lesion Removal Leicester',    href: '/treatments/skin-lesions-leicester',                     desc: 'Professional removal of various skin lesions.' },
  { title: 'Dermatologist Leicester',          href: '/treatments/dermatologist-leicester',                   desc: 'Expert dermatology assessment and treatment.' },
];

/* ── Page component ───────────────────────────────────────────── */
export default function LaserMoleRemovalPage() {
  const [showAllFaqs, setShowAllFaqs] = useState(false);

  return (
    <>
      {/* ════════════════════════════════════════
          1. HERO
      ════════════════════════════════════════ */}
      <section
        className={styles.hero}
        aria-label="Laser Mole Removal Leicester, hero"
        data-section-theme="dark"
      >
        <div className={styles.heroBreadcrumb}>
          <Container>
            <Breadcrumb
              theme="dark"
              items={[
                { label: 'Treatments', href: '/treatments' },
                { label: 'Laser Mole Removal' },
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
            <div className={styles.heroLeft}>
              <m.span className={styles.heroCategory} variants={fadeUp}>
                Laser Skin Treatments
              </m.span>

              <m.h1 className={styles.heroTitle} variants={fadeUp}>
                Laser Mole Removal<br />in Leicester
              </m.h1>

              <m.p className={styles.heroDesc} variants={fadeUp}>
                Precise, safe laser mole removal by our expert clinical team. Minimal
                scarring, fast results, no surgery or stitches required.
              </m.p>

              <m.div className={styles.heroCtas} variants={fadeUp}>
                <BookConsultationButton className={styles.heroCtaPrimary}>
                  Book Consultation
                </BookConsultationButton>
              </m.div>

              <m.div variants={fadeUp}>
                <TrustBadges theme="dark" />
              </m.div>

              <m.div className={styles.heroTrust} variants={fadeUp}>
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
                    <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"/>
                  </svg>
                  Trusted by patients across Leicester
                </span>
                <span className={styles.heroTrustDivider} aria-hidden="true" />
                <span className={styles.heroTrustItem}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <circle cx="12" cy="12" r="10"/>
                    <polyline points="12 6 12 12 16 14"/>
                  </svg>
                  No referral required
                </span>
              </m.div>
            </div>

            <m.div className={styles.heroImageWrap} variants={fadeUp}>
              <Image
                src="/images/Mole Removal hero.jpg"
                alt="Laser mole removal at The One Clinic Leicester"
                fill
                priority
                className={styles.heroImage}
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className={styles.heroImageFade} aria-hidden="true" />
            </m.div>
          </m.div>
        </Container>
      </section>

      {/* ════════════════════════════════════════
          2. WHAT IS LASER MOLE REMOVAL?
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
            <m.div className={styles.whatIsContent} variants={stagger(0.12)}>
              <m.div className={styles.whatIsTextGroup} variants={fadeUp}>
                <p className={styles.eyebrowDark}>About This Treatment</p>
                <h2 className={styles.combinedHeading}>What is Laser Mole Removal?</h2>
                <p className={styles.combinedDesc}>
                  Laser mole removal uses focused light energy to safely break down the pigmented
                  cells within a mole, causing it to fade and disappear without cutting or stitches.
                  At The One Clinic, all moles are medically assessed before treatment and every
                  procedure is carried out by our expert clinical team for the safest possible outcome.
                </p>
              </m.div>

              <m.div className={styles.combinedCtaWrapper} variants={fadeUp}>
                <BookConsultationButton className={styles.combinedCta}>
                  Book Your Consultation
                </BookConsultationButton>
              </m.div>
            </m.div>

            <m.div className={styles.whatIsImageWrap} variants={fadeUp}>
              <Image
                src="/images/Mole Removal 1.jpg"
                alt="Laser mole removal consultation at The One Clinic"
                fill
                className={styles.whatIsImage}
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
              Laser Mole Removal at a Glance
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
          4. TREATMENT JOURNEY
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
            <m.p className={styles.eyebrowDark} variants={fadeUp}>What to Expect</m.p>
            <m.h2 className={styles.headingDark} variants={fadeUp}>Your Treatment Journey</m.h2>
          </m.div>

          <m.ol
            className={styles.journeyList}
            variants={stagger(0.12)}
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
            aria-label="Laser mole removal treatment journey steps"
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
          5. BENEFITS
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
            <m.p className={styles.eyebrowDark} variants={fadeUp}>Why Laser Removal</m.p>
            <m.h2 className={styles.headingDark} variants={fadeUp}>
              The Benefits of Laser Mole Removal
            </m.h2>
          </m.div>

          <m.div
            className={styles.treatedBenefitsGrid}
            variants={stagger(0.08)}
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
          >
            {BENEFITS.map((b) => (
              <m.div
                key={b.title}
                className={styles.treatedBenefitCard}
                variants={fadeUp}
                whileHover={{ y: -8, transition: { type: 'spring', stiffness: 280, damping: 18 } }}
              >
                <span className={styles.treatedBenefitIconWrap} aria-hidden="true">{b.icon}</span>
                <h3 className={styles.treatedBenefitTitle}>{b.title}</h3>
                <p className={styles.treatedBenefitDesc}>{b.desc}</p>
              </m.div>
            ))}
          </m.div>
        </Container>
      </Section>

      {/* ════════════════════════════════════════
          6. ELIGIBILITY
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
            <m.p className={styles.eyebrowLight} variants={fadeUp}>Is This Right for You?</m.p>
            <m.h2 className={styles.headingLight} variants={fadeUp}>
              Who Is a Good Candidate?
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
              Laser mole removal may be right for you if you are:
            </m.p>
            <m.ul className={styles.eligibilityList} role="list" variants={stagger(0.1)}>
              {ELIGIBILITY.map((item) => (
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
            <m.p className={styles.eligibilityClosing} variants={fadeUp}>
              Book a consultation and our team will assess your mole and confirm whether laser removal is the right treatment for you.
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
          7. RESULTS, AFTERCARE & SIDE EFFECTS
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
            <m.p className={styles.eyebrowLight} variants={fadeUp}>Post-Treatment</m.p>
            <m.h2 className={styles.headingLight} variants={fadeUp}>
              Results, Aftercare and Side Effects
            </m.h2>
          </m.div>

          <m.div
            className={styles.resultsAfterGrid}
            variants={stagger(0.1)}
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
          >
            <m.div className={styles.resultsAfterCard} variants={fadeUp}>
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
                The mole begins to lighten within 1 to 2 weeks as the treated tissue is
                reabsorbed by the body. Continued improvement occurs over 4 to 8 weeks as
                the skin heals and the mole area fades completely.
              </p>
              <div className={styles.resultsAfterCardSpacer} />
              <p className={styles.resultsAfterCardNote}>
                Most moles are completely removed after a single treatment session with
                minimal visible scarring.
              </p>
            </m.div>

            <m.div className={styles.resultsAfterCard} variants={fadeUp}>
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
                  'Mild redness and swelling around the treated mole',
                  'Temporary scabbing or crusting as the area heals',
                  'Slight discomfort similar to a minor burn sensation',
                  'Possible temporary darkening before the mole fades',
                ].map((item) => (
                  <li key={item} className={styles.resultsAfterCardListItem}>
                    <span className={styles.resultsAfterDot} aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
              <div className={styles.resultsAfterCardSpacer} />
              <p className={styles.resultsAfterCardNote}>
                Side effects are typically mild and resolve within 1 to 2 weeks as the
                area heals.
              </p>
            </m.div>

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
                  'Keep the treated area clean and dry for the first 24 hours',
                  'Apply antibiotic ointment as directed by your clinician',
                  'Avoid picking or scratching at any scabs that form',
                  'Protect the area from direct sun exposure for 4 weeks',
                  'Avoid swimming and strenuous exercise for 1 to 2 weeks',
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
          8. PATIENT REVIEWS
      ════════════════════════════════════════ */}
      <Testimonials />

      {/* ════════════════════════════════════════
          9. CTA BANNER
      ════════════════════════════════════════ */}
      <section className={styles.ctaBanner} data-section-theme="dark" aria-label="Book laser mole removal">
        <div className={styles.ctaBannerLogoWrap} aria-hidden="true">
          <Image src="/images/Background-logo.png" alt="" fill className={styles.ctaBannerLogo} sizes="100vw" />
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
              Clear Skin,<br />Expert Hands.
            </m.h2>
            <m.p className={styles.ctaBannerSub} variants={fadeUp}>
              Book a laser mole removal consultation with our expert team in Leicester.
            </m.p>
            <m.div variants={fadeUp}>
              <BookConsultationButton className={styles.ctaBannerBtn}>Book Consultation</BookConsultationButton>
            </m.div>
          </m.div>
        </Container>
      </section>

      {/* ════════════════════════════════════════
          10. TREATABLE AREAS
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
            <m.p className={styles.eyebrowLight} variants={fadeUp}>Moles and Skin Concerns</m.p>
            <m.h2 className={styles.headingLight} variants={fadeUp}>
              What Can Laser Mole Removal Treat?
            </m.h2>
            <m.p className={styles.conditionsIntro} variants={fadeUp}>
              Laser mole removal can address a wide range of mole types and can be applied
              to moles on virtually any area of the body.
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
              <p className={styles.areasGroupLabel}>Mole Types</p>
              <ul className={styles.areasGroupList} role="list">
                {TREATABLE_CONCERNS.map((item) => (
                  <li key={item} className={styles.areasGroupItem}>
                    <span className={styles.areasItemDot} aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
            </m.div>

            <m.div
              className={styles.areasGroup}
              variants={fadeUp}
              whileHover={{ y: -6, transition: { type: 'spring', stiffness: 280, damping: 20 } }}
            >
              <p className={styles.areasGroupLabel}>Body Areas</p>
              <ul className={styles.areasGroupList} role="list">
                {TREATABLE_AREAS.map((item) => (
                  <li key={item} className={styles.areasGroupItem}>
                    <span className={styles.areasItemDot} aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
            </m.div>
          </m.div>
        </Container>
      </Section>

      {/* ════════════════════════════════════════
          11. CLINIC INTRO
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
              <p className={styles.eyebrowLight}>Laser Mole Removal</p>
              <h2 className={styles.headingLight}>
                Best Mole Removal<br />in Leicester
              </h2>
            </m.div>
            <m.p className={styles.clinicIntroDesc} variants={fadeUp}>
              The One Clinic delivers expert laser mole removal in Leicester, combining
              advanced technology with personalised medical assessment. Our experienced doctors
              evaluate every mole carefully before treatment to ensure safe, effective removal
              in a clinical environment you can trust.
            </m.p>
          </m.div>
        </Container>
      </Section>

      {/* ════════════════════════════════════════
          12. COST BANNER
      ════════════════════════════════════════ */}
      <section className={styles.costBanner} data-section-theme="dark" aria-label="Laser mole removal cost">
        <Container>
          <m.div
            className={styles.costBannerInner}
            variants={stagger(0.12)}
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
          >
            <m.p className={styles.costBannerEyebrow} variants={fadeUp}>Laser Mole Removal Pricing at The One Clinic</m.p>
            <m.p className={styles.costBannerPrice} variants={fadeUp}>From £150</m.p>
            <m.p className={styles.costBannerNote} variants={fadeUp}>
              Pricing varies by mole size, type, and number of moles treated. Full details provided at your consultation.
            </m.p>
            <m.div variants={fadeUp}>
              <BookConsultationButton className={styles.ctaBannerBtn}>Book A Consultation</BookConsultationButton>
            </m.div>
          </m.div>
        </Container>
      </section>

      {/* ════════════════════════════════════════
          13. WHY CHOOSE THE ONE CLINIC
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
              Why Choose The One Clinic For Laser Mole Removal
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
          14. MEET THE EXPERTS
      ════════════════════════════════════════ */}
      <MeetTheExperts />

      {/* ════════════════════════════════════════
          15. FAQ
      ════════════════════════════════════════ */}
      <section className={styles.faqSection} data-section-theme="light">
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
          16. BOOKING FORM
      ════════════════════════════════════════ */}
      <LeadForm />

      {/* ════════════════════════════════════════
          17. RELATED TREATMENTS
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
            <m.p className={styles.eyebrowDark} variants={fadeUp}>Explore More</m.p>
            <m.h2 className={styles.headingDark} variants={fadeUp}>Related Treatments</m.h2>
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
          18. FINAL CTA
      ════════════════════════════════════════ */}
      <FinalCTA />
    </>
  );
}
