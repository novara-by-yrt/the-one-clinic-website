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
    label: 'First Results',
    value: 'Immediate',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/>
        <polyline points="17 6 23 6 23 12"/>
      </svg>
    ),
  },
  {
    label: 'Full Results',
    value: 'Same day',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"/>
        <path d="M9 12l2 2 4-4"/>
      </svg>
    ),
  },
  {
    label: 'Recommended',
    value: 'Monthly sessions',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <polyline points="1 4 1 10 7 10"/>
        <path d="M3.51 15a9 9 0 1 0 .49-3.1"/>
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
    value: 'From £120',
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
    desc: 'Your skin therapist reviews your skin type, concerns, and goals. A personalised HydraFacial protocol is selected, including the right serums and any booster add-ons to address your specific needs.',
  },
  {
    n: '02',
    title: 'Cleanse and Exfoliation',
    desc: 'The HydraFacial handpiece gently uncovers a new layer of skin using a mild chemical peel and physical exfoliation. Dead skin cells are removed to reveal a fresh, smoother surface underneath.',
  },
  {
    n: '03',
    title: 'Extraction and Infusion',
    desc: 'Painless Vortex suction removes blackheads and congestion from pores while simultaneously delivering hydrating and antioxidant-rich serums deep into the skin.',
  },
  {
    n: '04',
    title: 'Hydration and Protection',
    desc: 'The final step saturates the skin with hyaluronic acid, peptides, and antioxidants, leaving it visibly plumped, glowing, and protected. You leave with immediately brighter, healthier-looking skin.',
  },
];

const BENEFITS = [
  {
    title: 'Instantly Glowing Skin',
    desc: 'Results are visible immediately after treatment. Skin looks brighter, feels smoother, and has a healthy, luminous glow from the very first session.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="12" cy="12" r="10"/>
        <polyline points="12 6 12 12 16 14"/>
      </svg>
    ),
  },
  {
    title: 'Zero Downtime',
    desc: 'HydraFacial is completely non-invasive with no redness, peeling, or recovery time. You can return to your day, or attend an event, immediately after treatment.',
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
    title: 'Deep Pore Cleansing',
    desc: 'The Vortex-Fusion extraction step removes blackheads and trapped congestion more effectively and comfortably than manual extraction, leaving pores visibly cleaner.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
      </svg>
    ),
  },
  {
    title: 'Suitable for All Skin Types',
    desc: 'Whether your skin is dry, oily, sensitive, or combination, HydraFacial can be adapted to your unique needs. It is safe for all ages and skin tones.',
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
    title: 'Fully Customisable',
    desc: 'Booster serums and add-ons can be tailored to target specific concerns including pigmentation, fine lines, redness, or congestion, making every HydraFacial uniquely yours.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="12" cy="12" r="3"/>
        <path d="M19.07 4.93a10 10 0 0 1 0 14.14M4.93 4.93a10 10 0 0 0 0 14.14"/>
      </svg>
    ),
  },
  {
    title: 'Long-Term Skin Health',
    desc: 'Regular monthly HydraFacial sessions progressively improve skin texture, hydration, and clarity. It is one of the best foundations for a healthy, sustained skincare routine.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/>
        <polyline points="17 6 23 6 23 12"/>
      </svg>
    ),
  },
];

const ELIGIBILITY = [
  'Wanting clearer, brighter, and more hydrated skin',
  'Looking for a treatment with absolutely no downtime',
  'Dealing with congested pores or uneven skin texture',
  'Preparing for a special event or occasion',
  'Wanting a relaxing, results-driven treatment suitable for all skin types',
];

const SKIN_CONCERNS = [
  'Dehydration and Dullness',
  'Congested or Enlarged Pores',
  'Fine Lines and Early Wrinkles',
  'Uneven Skin Tone',
  'Oily or Acne-Prone Skin',
];

const SKIN_TYPES = [
  'Sensitive Skin',
  'Hyperpigmentation',
  'Sun-Damaged Skin',
  'Dry and Flaky Skin',
  'Combination Skin',
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
    question: 'What is a HydraFacial?',
    answer:
      'HydraFacial is a patented, multi-step skin treatment that cleanses, exfoliates, extracts congestion, and infuses the skin with nourishing serums, all in a single session. It uses Vortex-Fusion technology to deliver immediate, visible results with no discomfort or downtime.',
  },
  {
    question: 'How quickly will I see results?',
    answer:
      'Results are immediate. Your skin will feel deeply hydrated, look brighter, and appear smoother straight after your treatment. For best long-term results, a course of monthly sessions is recommended.',
  },
  {
    question: 'Is HydraFacial suitable for sensitive skin?',
    answer:
      'Yes. HydraFacial is one of the gentlest professional skin treatments available and is suitable for even the most sensitive skin types. The serums and handpiece settings can be adjusted to suit your individual skin needs.',
  },
  {
    question: 'How often should I have a HydraFacial?',
    answer:
      'For maintaining healthy, glowing skin, a monthly HydraFacial is ideal. For specific skin concerns such as pigmentation or congestion, your therapist may recommend a more intensive course of treatments initially.',
  },
  {
    question: 'Is there any downtime after a HydraFacial?',
    answer:
      'No. There is no downtime whatsoever. Your skin will look and feel great immediately after treatment. You can apply makeup, return to work, or attend an event the same day.',
  },
  {
    question: 'Can HydraFacial be combined with other treatments?',
    answer:
      'Yes. HydraFacial pairs very well with treatments such as Profhilo, skin boosters, and LED therapy for enhanced results. Your therapist will advise on the best combination at your consultation.',
  },
  {
    question: 'What skin concerns can HydraFacial address?',
    answer:
      'HydraFacial is effective for a wide range of concerns including dehydration, dullness, congested pores, oily skin, fine lines, hyperpigmentation, and uneven texture. The treatment can be customised with booster serums to target your specific concerns.',
  },
  {
    question: 'Do I need a referral for a HydraFacial?',
    answer:
      'No referral is needed. Book directly with The One Clinic and our team will tailor the treatment to your skin concerns at the time of your appointment.',
  },
];

const RELATED = [
  { title: 'Chemical Peels',    href: '/treatments/chemical-peels',    desc: 'Medical-grade peels to resurface skin, treat pigmentation, and improve tone.' },
  { title: 'Profhilo',          href: '/treatments/profhilo',          desc: 'Deep skin hydration and bio-remodelling for a natural, lasting glow.' },
  { title: 'Morpheus8',         href: '/treatments/morpheus8',         desc: 'Advanced RF microneedling for skin tightening and collagen renewal.' },
  { title: 'Skin Analysis',     href: '/treatments/skin-analysis',     desc: '3D skin imaging to assess and guide your personalised skincare plan.' },
];

/* ── Page component ───────────────────────────────────────────── */
export default function HydrafacialPage() {
  const [showAllFaqs, setShowAllFaqs] = useState(false);

  return (
    <>
      {/* ════════════════════════════════════════
          1. HERO
      ════════════════════════════════════════ */}
      <section
        className={styles.hero}
        aria-label="HydraFacial Leicester, hero"
        data-section-theme="dark"
      >
        <div className={styles.heroBreadcrumb}>
          <Container>
            <Breadcrumb
              theme="dark"
              items={[
                { label: 'Treatments', href: '/treatments' },
                { label: 'HydraFacial' },
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
                Skin Health &amp; Hydration
              </motion.span>

              <motion.h1 className={styles.heroTitle} variants={fadeUp}>
                HydraFacial<br />in Leicester
              </motion.h1>

              <motion.p className={styles.heroDesc} variants={fadeUp}>
                Cleanse, exfoliate, extract, and hydrate in one session. Instantly glowing skin
                with zero downtime, suitable for all skin types.
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
                  Expert skin therapists
                </span>
                <span className={styles.heroTrustDivider} aria-hidden="true" />
                <span className={styles.heroTrustItem}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                    <line x1="16" y1="2" x2="16" y2="6"/>
                    <line x1="8" y1="2" x2="8" y2="6"/>
                    <line x1="3" y1="10" x2="21" y2="10"/>
                  </svg>
                  Zero downtime
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
                src="/images/Women's Health.jpg"
                alt="HydraFacial treatment at The One Clinic Leicester"
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
          2. WHAT IS A HYDRAFACIAL?
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
                <h2 className={styles.combinedHeading}>What is a HydraFacial?</h2>
                <p className={styles.combinedDesc}>
                  HydraFacial is a multi-step medical-grade facial that uses patented Vortex-Fusion
                  technology to cleanse, exfoliate, extract, and infuse the skin with powerful
                  serums in one session. At The One Clinic, every HydraFacial is tailored to your
                  specific skin type and concerns, delivering a radiant, refreshed result in
                  under an hour with no downtime.
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
                alt="HydraFacial consultation at The One Clinic"
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
              HydraFacial at a Glance
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
            aria-label="HydraFacial treatment journey steps"
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
              The Benefits of HydraFacial
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
              A HydraFacial may be right for you if you are:
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
              HydraFacial is suitable for virtually everyone. Book a consultation and we will tailor it to you.
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
                Results are immediate. Skin looks brighter, feels softer, and appears more
                hydrated straight after your first session. Pores look cleaner and overall skin
                tone is more even.
              </p>
              <div className={styles.resultsAfterCardSpacer} />
              <p className={styles.resultsAfterCardNote}>
                With monthly treatments, skin quality progressively improves over time, building
                lasting hydration, clarity, and resilience.
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
                HydraFacial has an excellent safety profile. It is non-irritating for the vast
                majority of patients. In rare cases, you may experience:
              </p>
              <ul className={styles.resultsAfterCardList} role="list">
                {[
                  'Mild temporary redness on very sensitive skin',
                  'Slight tingling during the exfoliation step',
                  'Minor skin sensitivity for a few hours',
                ].map((item) => (
                  <li key={item} className={styles.resultsAfterCardListItem}>
                    <span className={styles.resultsAfterDot} aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
              <div className={styles.resultsAfterCardSpacer} />
              <p className={styles.resultsAfterCardNote}>
                These effects are mild and short-lived. No downtime is required after treatment.
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
                  'Apply SPF 30 or higher sunscreen daily',
                  'Stay well hydrated throughout the day',
                  'Avoid direct sun exposure for 24 hours',
                  'Use gentle, hydrating skincare products',
                  'Book your next session in 4 to 6 weeks',
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
      <section className={styles.ctaBanner} data-section-theme="dark" aria-label="Book HydraFacial consultation">
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
              Your Best Skin.<br />Starting Today.
            </motion.h2>
            <motion.p className={styles.ctaBannerSub} variants={fadeUp}>
              Book a HydraFacial with our expert team in Leicester.
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
            <motion.p className={styles.eyebrowLight} variants={fadeUp}>Skin Concerns</motion.p>
            <motion.h2 className={styles.headingLight} variants={fadeUp}>
              What Can HydraFacial Address?
            </motion.h2>
            <motion.p className={styles.conditionsIntro} variants={fadeUp}>
              HydraFacial can be tailored to treat a wide range of skin concerns and is
              suitable for virtually every skin type.
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
                {SKIN_CONCERNS.map((item) => (
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
              <p className={styles.areasGroupLabel}>Skin Types</p>
              <ul className={styles.areasGroupList} role="list">
                {SKIN_TYPES.map((item) => (
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
              <p className={styles.eyebrowLight}>HydraFacial Treatment</p>
              <h2 className={styles.headingLight}>
                Best HydraFacial<br />in Leicester
              </h2>
            </motion.div>
            <motion.p className={styles.clinicIntroDesc} variants={fadeUp}>
              Experience the best HydraFacial in Leicester at The One Clinic. Our expert skin
              therapists deliver fully tailored treatments using the latest HydraFacial technology,
              targeting your unique skin concerns for immediate, visible results. Whether it is
              your first session or part of a regular routine, every visit leaves you glowing.
            </motion.p>
          </motion.div>
        </Container>
      </Section>

      {/* ════════════════════════════════════════
          12. COST BANNER
      ════════════════════════════════════════ */}
      <section className={styles.costBanner} data-section-theme="dark" aria-label="HydraFacial cost">
        <Container>
          <motion.div
            className={styles.costBannerInner}
            variants={stagger(0.12)}
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
          >
            <motion.p className={styles.costBannerEyebrow} variants={fadeUp}>HydraFacial Pricing at The One Clinic</motion.p>
            <motion.p className={styles.costBannerPrice} variants={fadeUp}>From £120</motion.p>
            <motion.p className={styles.costBannerNote} variants={fadeUp}>
              Pricing varies by treatment type and add-ons selected. Full details provided at your appointment.
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
              Why Choose The One Clinic For HydraFacial
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
              className={styles.sectionHeader}
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
