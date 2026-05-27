'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link  from 'next/link';
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
import { fadeUp, stagger, VIEWPORT } from '@/lib/motion';
import styles from './page.module.css';

/* ── Pigmentation types ───────────────────────────────────────── */
const PIGMENTATION_TYPES = [
  {
    num: '01',
    title: 'Melasma',
    desc: 'Hormonally triggered, symmetrical patches of deeper pigmentation typically appearing on the cheeks, forehead, and upper lip.',
  },
  {
    num: '02',
    title: 'Post-Inflammatory Hyperpigmentation',
    desc: 'Dark marks left behind after acne, injury or inflammation as the healing skin overproduces melanin in the affected area.',
  },
  {
    num: '03',
    title: 'Solar Lentigines / Freckles',
    desc: 'Sun-induced flat spots that develop on exposed skin such as the face, hands, and shoulders from cumulative UV exposure.',
  },
];

/* ── Causes ───────────────────────────────────────────────────── */
const CAUSES = [
  {
    title: 'Sun Exposure',
    desc: 'UV radiation triggers excess melanin overproduction, leading to sunspots, freckles, and broader areas of darkening on exposed skin.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
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
    title: 'Hormonal Changes',
    desc: 'Pregnancy, the menopause, and the contraceptive pill can trigger melasma, causing symmetrical patches of deeper pigmentation on the face.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
      </svg>
    ),
  },
  {
    title: 'Post-Acne Scarring',
    desc: 'Skin trauma from acne breakouts triggers excess melanin production during healing, leaving behind persistent dark post-inflammatory marks.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="12" cy="12" r="10"/>
        <line x1="12" y1="8" x2="12" y2="12"/>
        <line x1="12" y1="16" x2="12.01" y2="16"/>
      </svg>
    ),
  },
  {
    title: 'Skin Trauma or Inflammation',
    desc: 'Cuts, burns, eczema, and cosmetic procedures all disrupt normal melanin distribution, resulting in patches of uneven discolouration during repair.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
      </svg>
    ),
  },
  {
    title: 'Genetics',
    desc: 'Some people are genetically predisposed to freckling or melasma, with inherited melanocyte sensitivity amplifying pigmentation responses to UV and hormones.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M6 3c0 4.5 6 4.5 6 9s-6 4.5-6 9"/>
        <path d="M18 3c0 4.5-6 4.5-6 9s6 4.5 6 9"/>
        <line x1="3" y1="9" x2="21" y2="9"/>
        <line x1="3" y1="15" x2="21" y2="15"/>
      </svg>
    ),
  },
  {
    title: 'Certain Medications',
    desc: 'Some antibiotics, anti-seizure drugs, and chemotherapy agents increase photosensitivity, making skin far more prone to developing pigmentation changes.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/>
      </svg>
    ),
  },
];

/* ── Risk factors ─────────────────────────────────────────────── */
const RISK_FACTORS = [
  'Those with frequent or prolonged unprotected sun exposure.',
  'People with darker skin tones who are more prone to post-inflammatory marks.',
  'Women on hormonal contraception or during pregnancy.',
  'Those prone to acne, eczema, or inflammatory skin conditions.',
  'Individuals with a history of skin inflammation or repeated skin trauma.',
  'People with a family history of melasma or hyperpigmentation.',
];

/* ── Diagnose steps ───────────────────────────────────────────── */
const DIAGNOSE_STEPS = [
  {
    num: '01',
    text: 'Wood\'s Lamp Skin Analysis , a specialised UV light that reveals the depth and distribution of pigmentation invisible to the naked eye.',
  },
  {
    num: '02',
    text: 'Dermatoscopy & Visual Assessment , close examination of pigmented lesions to characterise their pattern, border, and severity.',
  },
  {
    num: '03',
    text: 'Skin History & Trigger Review , a thorough discussion of your lifestyle, sun habits, hormonal history, and skin concerns to identify root causes.',
  },
];

/* ── Treatments ───────────────────────────────────────────────── */
const TREATMENTS = [
  {
    title:  'Lumecca IPL',
    desc:   'Intense Pulsed Light precisely targets excess melanin, breaking down sunspots, freckles, and areas of uneven pigmentation for a noticeably clearer complexion.',
    href:   '/treatments/ipl-leicester',
    image:  '/images/BA1.jpg',
  },
  {
    title:  'Chemical Peels',
    desc:   'Exfoliating peels remove pigmented surface skin cells, accelerate cell turnover, and progressively lighten dark patches and uneven discolouration.',
    href:   '/treatments/chemical-peels',
    image:  '/images/BA2.jpg',
  },
  {
    title:  'Laser Resurfacing',
    desc:   'Targeted laser energy penetrates deeper pigmentation, stimulating cell renewal and collagen production to reduce sun damage and uneven skin tone.',
    href:   '/treatments/deep-laser-resurfacing-leicester',
    image:  '/images/BA3.jpg',
  },
  {
    title:  'AlumierMD Skincare',
    desc:   'Clinically formulated brightening skincare that inhibits melanin production and supports a clearer, more even complexion between clinic treatments.',
    href:   '/treatments/skincare-alumier-md',
    image:  '/images/BA4.jpg',
  },
];

/* ── When to call a doctor ────────────────────────────────────── */
const WHEN_TO_CALL = [
  'Rapidly changing spots that grow in size, colour, or number.',
  'Asymmetrical growth or irregular, poorly defined borders.',
  'A pigmented lesion that bleeds, crusts, or fails to heal.',
  'New significant pigmentation appearing after the age of 40.',
];

/* ── Results timeline ─────────────────────────────────────────── */
const RESULTS_TIMELINE = [
  {
    phase: '4 to 8 Weeks',
    title: 'Treatment Timeline',
    desc:  'Most patients see meaningful improvement within 4 to 8 weeks across a course of treatment sessions.',
  },
  {
    phase: 'Progressive',
    title: 'Gradual Fading',
    desc:  'Sunspots, freckles, and post-inflammatory marks continue to fade as the skin renews and melanin disperses.',
  },
  {
    phase: 'Long-term',
    title: 'Maintenance & SPF Protection',
    desc:  'Daily broad-spectrum SPF and periodic maintenance treatments sustain a clear, even complexion over time.',
  },
];

/* ── Why choose The One Clinic ────────────────────────────────── */
const CLINIC_REASONS = [
  { n: '01', text: 'All-in-one clinic with medical & aesthetic services.' },
  { n: '02', text: 'Highly trained, compassionate doctors.' },
  { n: '03', text: 'Customised treatments based on listening & expertise.' },
  { n: '04', text: 'State-of-the-art facilities & modern equipment.' },
  { n: '05', text: 'Strong reputation & excellent reviews.' },
  { n: '06', text: 'Comprehensive care and referrals with specialists.' },
];

/* ── FAQ data ──────────────────────────────────────────────────── */
const FAQS = [
  {
    question: 'What is the difference between hyperpigmentation, sun damage, and freckles?',
    answer:
      'Hyperpigmentation is an umbrella term for any darkening of the skin caused by excess melanin. Sun damage refers specifically to discolouration caused by UV exposure, including sunspots and age spots. Freckles are small, concentrated deposits of melanin, often genetically inherited but intensified by sun exposure. All three share the same underlying mechanism and respond well to similar treatments.',
  },
  {
    question: 'Can hyperpigmentation be permanently treated?',
    answer:
      'Many forms of hyperpigmentation can be significantly reduced or cleared with the right treatment. IPL and laser are highly effective for sunspots, freckles, and age spots. However, melasma and post-inflammatory pigmentation can recur without ongoing sun protection and maintenance. Our doctors will advise on the most appropriate plan for your skin type and pigmentation pattern.',
  },
  {
    question: 'How many sessions will I need?',
    answer:
      'The number of sessions depends on the type, depth, and extent of the pigmentation. Sunspots and freckles often respond well after one to three IPL sessions. Deeper or more widespread hyperpigmentation may benefit from a course of chemical peels or combined treatments. Your doctor will outline a personalised plan during consultation.',
  },
  {
    question: 'Is hyperpigmentation treatment safe for all skin tones?',
    answer:
      'Yes, with the right treatment selection. Some lasers and IPL devices carry a higher risk of post-inflammatory pigmentation in darker skin tones if used incorrectly. At The One Clinic, our doctors assess your Fitzpatrick skin type and choose treatments that are both safe and effective for your skin.',
  },
  {
    question: 'What is the recovery time after treatment?',
    answer:
      'Recovery varies by treatment. IPL may cause temporary darkening of spots and mild redness for a few days. Chemical peels can result in flaking for 3 to 7 days depending on depth. Most patients return to normal activities the same day or within 24 to 48 hours, with results continuing to improve over the following weeks.',
  },
  {
    question: 'How can I prevent hyperpigmentation from returning?',
    answer:
      'Daily broad-spectrum SPF 50 is essential to prevent UV-triggered pigmentation returning or worsening. Avoiding peak sun hours, wearing protective clothing, and using clinically formulated brightening skincare such as AlumierMD can significantly extend and maintain your results between clinic treatments.',
  },
];

/* ── Related data ──────────────────────────────────────────────── */
const RELATED_TREATMENTS = [
  {
    title: 'Lumecca IPL',
    desc:  'Break down sunspots and freckles with targeted Intense Pulsed Light therapy for a clearer complexion.',
    href:  '/treatments/ipl-leicester',
    tag:   'Medical Aesthetics',
  },
  {
    title: 'Chemical Peels',
    desc:  'Resurface and brighten pigmented skin with exfoliating, skin-renewing peels tailored to your tone.',
    href:  '/treatments/chemical-peels',
    tag:   'Medical Aesthetics',
  },
  {
    title: 'Laser Resurfacing',
    desc:  'Reduce deeper sun damage and uneven tone with precision laser treatment and collagen stimulation.',
    href:  '/treatments/deep-laser-resurfacing-leicester',
    tag:   'Medical Aesthetics',
  },
  {
    title: 'AlumierMD Skincare',
    desc:  'Clinical-grade brightening skincare that inhibits melanin and sustains your results at home.',
    href:  '/treatments/skincare-alumier-md',
    tag:   'Medical Aesthetics',
  },
];

const RELATED_CONDITIONS = [
  {
    title: 'Rosacea',
    desc:  'Calm persistent redness and restore an even, clear complexion with targeted treatment.',
    href:  '/conditions/rosacea',
    tag:   'Skin',
  },
  {
    title: 'Pigmentation',
    desc:  'Treat dark spots, patches, and uneven skin tone with personalised, clinically led care.',
    href:  '/conditions/pigmentation',
    tag:   'Skin',
  },
];

/* ════════════════════════════════════════════════════════════════
   PAGE
════════════════════════════════════════════════════════════════ */
export default function HyperpigmentationPage() {
  const [showAllFaqs, setShowAllFaqs] = useState(false);

  const visibleFaqs = showAllFaqs ? FAQS : FAQS.slice(0, 4);

  return (
    <>
      {/* ════════════════════════════════════════
          1. HERO
      ════════════════════════════════════════ */}
      <section
        className={styles.hero}
        aria-label="Hyperpigmentation Treatment Leicester, hero"
        data-section-theme="dark"
      >
        {/* Breadcrumb, pinned below fixed header */}
        <div className={styles.heroBreadcrumb}>
          <Container>
            <Breadcrumb
              theme="dark"
              items={[
                { label: 'Conditions', href: '/conditions' },
                { label: 'Hyperpigmentation / Sun Damage / Freckles' },
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
            {/* Left: text content */}
            <div className={styles.heroLeft}>
              <motion.span className={styles.heroCategory} variants={fadeUp}>
                Conditions · Skin
              </motion.span>

              <motion.h1 className={styles.heroTitle} variants={fadeUp}>
                Hyperpigmentation Treatment Leicester
              </motion.h1>

              <motion.p className={styles.heroDesc} variants={fadeUp}>
                Treat dark spots, sun damage and freckles for a clearer,
                even-toned complexion with clinically proven, personalised care.
              </motion.p>

              <motion.div className={styles.heroCtas} variants={fadeUp}>
                <BookConsultationButton className={styles.heroCtaPrimary}>
                  Book A Consultation
                </BookConsultationButton>
              </motion.div>

              {/* Trust badges */}
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

            {/* Right: hero image */}
            <motion.div className={styles.heroImageWrap} variants={fadeUp}>
              <Image
                src="/images/Hyperpigmentation.png"
                alt="Hyperpigmentation and sun damage treatment at The One Clinic Leicester"
                fill
                className={styles.heroImage}
                sizes="(max-width: 900px) 100vw, 50vw"
                priority
              />
              <div className={styles.heroImageFade} aria-hidden="true" />
            </motion.div>
          </motion.div>
        </Container>
      </section>

      {/* ════════════════════════════════════════
          2. WHAT IS HYPERPIGMENTATION & TYPES (Combined)
      ════════════════════════════════════════ */}
      <Section variant="light" data-section-theme="light" className={styles.overviewTypesSection}>
        <Container>
          <div className={styles.combinedBody}>
            {/* Left column: Overview */}
            <div className={styles.combinedLeft}>
              <div className={styles.combinedLeftTop}>
                <motion.p
                  className={styles.eyebrowDark}
                  initial="hidden"
                  whileInView="show"
                  variants={fadeUp}
                  viewport={VIEWPORT}
                >
                  About This Condition
                </motion.p>
                <motion.h2
                  className={styles.combinedHeading}
                  initial="hidden"
                  whileInView="show"
                  variants={fadeUp}
                  viewport={VIEWPORT}
                >
                  What Is Hyperpigmentation?
                </motion.h2>
                <motion.p
                  className={styles.combinedDesc}
                  initial="hidden"
                  whileInView="show"
                  variants={fadeUp}
                  viewport={VIEWPORT}
                >
                  Hyperpigmentation is the darkening of areas of skin caused by an
                  excess production of melanin , the pigment responsible for skin
                  colour. It encompasses a broad range of concerns including sun
                  damage, age spots, freckles, melasma, and post-inflammatory marks,
                  and can affect the face, hands, neck, or body.
                </motion.p>
                <motion.p
                  className={styles.combinedDesc}
                  initial="hidden"
                  whileInView="show"
                  variants={fadeUp}
                  viewport={VIEWPORT}
                >
                  Although largely harmless, these concerns are a common source of
                  self-consciousness. With the right professional treatment, most
                  forms of hyperpigmentation can be significantly reduced or cleared,
                  restoring a clearer and more even complexion.
                </motion.p>
              </div>
            </div>

            {/* Right column: Types */}
            <div className={styles.combinedRight}>
              <motion.div
                className={styles.typesRightHeader}
                initial="hidden"
                whileInView="show"
                variants={fadeUp}
                viewport={VIEWPORT}
              >
                <p className={styles.combinedRightLabel}>Classification</p>
                <h3 className={styles.typesRightHeading}>Types of Hyperpigmentation</h3>
              </motion.div>

              <motion.div
                className={styles.combinedCards}
                variants={stagger(0.1)}
                initial="hidden"
                whileInView="show"
                viewport={VIEWPORT}
              >
                {PIGMENTATION_TYPES.map((type) => (
                  <motion.div
                    key={type.num}
                    className={styles.typeCardCombined}
                    variants={fadeUp}
                  >
                    <span className={styles.typeNumCombined} aria-hidden="true">
                      {type.num}
                    </span>
                    <div className={styles.typeCardHeader}>
                      <h3 className={styles.typeTitleCombined}>{type.title}</h3>
                      <p className={styles.typeDescCombined}>{type.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>
        </Container>
      </Section>

      {/* ════════════════════════════════════════
          3. CAUSES
      ════════════════════════════════════════ */}
      <Section variant="light" data-section-theme="light" className={styles.causesSection}>
        <Container>
          <motion.div
            className={styles.sectionHeaderCentre}
            variants={stagger(0.1)}
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
          >
            <motion.p className={styles.eyebrowDark} variants={fadeUp}>
              Root Causes
            </motion.p>
            <motion.h2 className={styles.headingDark} variants={fadeUp}>
              What Causes Hyperpigmentation?
            </motion.h2>
            <motion.p className={styles.sectionSubtext} variants={fadeUp}>
              Understanding what contributes to dark spots and uneven skin tone
              helps identify the right treatment approach for long-lasting results.
            </motion.p>
          </motion.div>

          <motion.div
            className={styles.causesGrid}
            variants={stagger(0.08)}
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
          >
            {CAUSES.map((cause) => (
              <motion.div
                key={cause.title}
                className={styles.causeCard}
                variants={fadeUp}
                whileHover={{
                  y: -6,
                  transition: { type: 'spring', stiffness: 280, damping: 18 },
                }}
              >
                <span className={styles.causeIcon}>{cause.icon}</span>
                <h3 className={styles.causeTitle}>{cause.title}</h3>
                <p className={styles.causeDesc}>{cause.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </Container>
      </Section>

      {/* ════════════════════════════════════════
          4. WHO IS MORE LIKELY?
      ════════════════════════════════════════ */}
      <Section variant="light" data-section-theme="light">
        <Container>
          <motion.div
            className={styles.riskGrid}
            variants={stagger(0.12)}
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
          >
            {/* Left: image */}
            <motion.div className={styles.riskImageWrap} variants={fadeUp}>
              <Image
                src="/images/Hyperpigmentation.png"
                alt="Person showing hyperpigmentation and sun damage on skin"
                fill
                className={styles.riskImage}
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className={styles.riskImageOverlay} aria-hidden="true" />
            </motion.div>

            {/* Right: heading + intro + checklist */}
            <motion.div className={styles.riskRight} variants={stagger(0.1)}>
              <div className={styles.riskRightInner}>
                <motion.p className={styles.eyebrowDark} variants={fadeUp}>
                  Risk Factors
                </motion.p>
                <motion.h2 className={styles.riskHeading} variants={fadeUp}>
                  Who Is More Likely to Develop Hyperpigmentation?
                </motion.h2>
                <motion.p className={styles.riskIntro} variants={fadeUp}>
                  Several skin types, lifestyle habits, and health factors increase
                  susceptibility to hyperpigmentation and sun damage.
                </motion.p>

                <motion.ul
                  className={styles.riskList}
                  role="list"
                  variants={stagger(0.08)}
                >
                  {RISK_FACTORS.map((item) => (
                    <motion.li key={item} className={styles.riskItem} variants={fadeUp}>
                      <span className={styles.riskCheck} aria-hidden="true">
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                          <polyline points="2,7 5.5,10.5 12,3.5" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </span>
                      <span>{item}</span>
                    </motion.li>
                  ))}
                </motion.ul>
              </div>
            </motion.div>
          </motion.div>
        </Container>
      </Section>

      {/* ════════════════════════════════════════
          5. HOW DO WE DIAGNOSE?
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
              Our Process
            </motion.p>
            <motion.h2 className={styles.headingLight} variants={fadeUp}>
              How Do We Diagnose Hyperpigmentation?
            </motion.h2>
            <motion.p className={styles.diagnoseIntro} variants={fadeUp}>
              Our specialists use a multi-step assessment to understand your skin:
            </motion.p>
          </motion.div>

          <motion.div
            className={styles.diagnoseGrid}
            variants={stagger(0.1)}
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
          >
            {DIAGNOSE_STEPS.map((step) => (
              <motion.div
                key={step.num}
                className={styles.diagnoseCard}
                variants={fadeUp}
              >
                <span className={styles.diagnoseNum} aria-hidden="true">
                  {step.num}
                </span>
                <p className={styles.diagnoseText}>{step.text}</p>
              </motion.div>
            ))}
          </motion.div>
        </Container>
      </Section>

      {/* ════════════════════════════════════════
          6. TREATMENTS FOR HYPERPIGMENTATION
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
              Your Options
            </motion.p>
            <motion.h2 className={styles.headingDark} variants={fadeUp}>
              Treatments For Hyperpigmentation &amp; Sun Damage
            </motion.h2>
          </motion.div>

          <motion.div
            className={styles.treatmentsGrid}
            variants={stagger(0.1)}
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
          >
            {TREATMENTS.map((t) => (
              <motion.div
                key={t.title}
                className={styles.treatmentCard}
                variants={fadeUp}
                whileHover={{ y: -4, transition: { type: 'spring', stiffness: 280, damping: 18 } }}
              >
                <div className={styles.treatmentCardBody}>
                  <Link href={t.href} className={styles.treatmentTitleLink}>
                    <h3 className={styles.treatmentTitle}>{t.title}</h3>
                    <span className={styles.treatmentArrow} aria-hidden="true">
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </span>
                  </Link>
                  <p className={styles.treatmentDesc}>{t.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </Container>
      </Section>

      {/* ════════════════════════════════════════
          7. WHEN TO CALL A DOCTOR?
      ════════════════════════════════════════ */}
      <Section variant="dark" data-section-theme="dark">
        <Container>
          <motion.div
            className={styles.whenToCallWrap}
            variants={stagger(0.12)}
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
          >
            {/* Left: heading */}
            <motion.div className={styles.whenToCallLeft} variants={stagger(0.1)}>
              <motion.p className={styles.eyebrowLight} variants={fadeUp}>
                Medical Advice
              </motion.p>
              <motion.h2 className={styles.whenToCallHeading} variants={fadeUp}>
                When to Call a Doctor?
              </motion.h2>
              <motion.p className={styles.whenToCallIntro} variants={fadeUp}>
                Most forms of hyperpigmentation are harmless. However, you should
                see a doctor if you notice:
              </motion.p>
            </motion.div>

            {/* Right: warning list */}
            <motion.ul
              className={styles.whenToCallList}
              role="list"
              variants={stagger(0.08)}
            >
              {WHEN_TO_CALL.map((item) => (
                <motion.li key={item} className={styles.whenToCallItem} variants={fadeUp}>
                  <span className={styles.whenToCallIcon} aria-hidden="true">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10"/>
                      <line x1="12" y1="8" x2="12" y2="12"/>
                      <line x1="12" y1="16" x2="12.01" y2="16"/>
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
          8. RESULTS & EXPECTATIONS
      ════════════════════════════════════════ */}
      <Section variant="light" data-section-theme="light" className={styles.resultsSection}>
        <Container>
          <motion.div
            className={styles.sectionHeaderCentre}
            variants={stagger(0.1)}
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
          >
            <motion.p className={styles.eyebrowDark} variants={fadeUp}>
              What To Expect
            </motion.p>
            <motion.h2 className={styles.headingDark} variants={fadeUp}>
              Results &amp; Expectations
            </motion.h2>
            <motion.p className={styles.sectionSubtext} variants={fadeUp}>
              After treatment for hyperpigmentation and sun damage, here is what
              you can typically expect at each stage.
            </motion.p>
          </motion.div>

          <motion.div
            className={styles.resultsGrid}
            variants={stagger(0.1)}
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
          >
            {RESULTS_TIMELINE.map((item) => (
              <motion.div
                key={item.phase}
                className={styles.resultCard}
                variants={fadeUp}
                whileHover={{ y: -6, transition: { type: 'spring', stiffness: 280, damping: 18 } }}
              >
                <span className={styles.resultPhase}>{item.phase}</span>
                <h3 className={styles.resultTitle}>{item.title}</h3>
                <p className={styles.resultDesc}>{item.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </Container>
      </Section>

      {/* ════════════════════════════════════════
          9. MEET THE EXPERTS
      ════════════════════════════════════════ */}
      <MeetTheExperts />

      {/* ════════════════════════════════════════
          GOOGLE REVIEWS
      ════════════════════════════════════════ */}
      <Testimonials />

      {/* ════════════════════════════════════════
          10. WHY CHOOSE THE ONE CLINIC
      ════════════════════════════════════════ */}
      <Section variant="light" data-section-theme="light" className={styles.whySection}>
        <Container>
          <motion.div
            className={styles.sectionHeaderCentre}
            variants={stagger(0.1)}
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
          >
            <motion.p className={styles.eyebrowDark} variants={fadeUp}>
              Why Us
            </motion.p>
            <motion.h2 className={styles.headingDark} variants={fadeUp}>
              Why Choose The One Clinic For Hyperpigmentation Treatment
            </motion.h2>
          </motion.div>

          <motion.div
            className={styles.whyGrid}
            variants={stagger(0.08)}
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
          >
            {CLINIC_REASONS.map((r) => (
              <motion.div
                key={r.n}
                className={styles.whyCard}
                variants={fadeUp}
                whileHover={{ y: -6, transition: { type: 'spring', stiffness: 280, damping: 20 } }}
              >
                <span className={styles.whyNumber}>{r.n}</span>
                <p className={styles.whyText}>{r.text}</p>
              </motion.div>
            ))}
          </motion.div>
        </Container>
      </Section>

      {/* ════════════════════════════════════════
          11. FAQ
      ════════════════════════════════════════ */}
      <Section variant="light" data-section-theme="light" className={styles.faqSection}>
        <Container className={styles.faqInner}>
          <motion.div
            className={styles.sectionHeaderCentre}
            variants={stagger(0.1)}
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
          >
            <motion.p className={styles.eyebrowDark} variants={fadeUp}>FAQ</motion.p>
            <motion.h2 className={styles.headingDark} variants={fadeUp}>
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
            <Accordion items={visibleFaqs} theme="dark" />
          </motion.div>

          <div className={styles.faqToggleWrap}>
            <button
              className={styles.faqToggleBtn}
              onClick={() => setShowAllFaqs((prev) => !prev)}
              aria-expanded={showAllFaqs}
            >
              {showAllFaqs ? 'Show Fewer Questions' : 'View All Questions'}
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"
                style={{ transform: showAllFaqs ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s ease' }}
              >
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </button>
          </div>
        </Container>
      </Section>

      {/* ════════════════════════════════════════
          12. CONSULTATION CTA
      ════════════════════════════════════════ */}
      <section
        className={styles.ctaBand}
        data-section-theme="dark"
        aria-label="Hyperpigmentation consultation CTA"
      >
        {/* Background image */}
        <div className={styles.ctaBandBgWrap} aria-hidden="true">
          <Image
            src="/images/Background section image new1.jpg"
            alt=""
            fill
            className={styles.ctaBandBgImg}
            sizes="100vw"
          />
          <div className={styles.ctaBandOverlay} />
        </div>

        <Container>
          <motion.div
            className={styles.ctaContent}
            variants={stagger(0.15)}
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
          >
            <motion.p className={styles.eyebrowLight} variants={fadeUp}>
              Take the First Step
            </motion.p>
            <motion.h2 className={styles.ctaHeading} variants={fadeUp}>
              Ready for Clearer,{' '}
              <span className={styles.ctaAccent}>More Even Skin?</span>
            </motion.h2>
            <motion.p className={styles.ctaSubtext} variants={fadeUp}>
              Talk to our specialists today to find the most effective treatment
              for your pigmentation and restore a naturally radiant complexion.
            </motion.p>
            <motion.div className={styles.ctaBtns} variants={fadeUp}>
              <BookConsultationButton className={styles.ctaBtnPrimary}>
                Book a Consultation
              </BookConsultationButton>
              <Link href="#contact" className={styles.ctaBtnSecondary}>
                Contact Us
              </Link>
            </motion.div>
          </motion.div>
        </Container>
      </section>

      {/* ════════════════════════════════════════
          13. LEAD FORM
      ════════════════════════════════════════ */}
      <div id="contact">
        <LeadForm />
      </div>

      {/* ════════════════════════════════════════
          14. RELATED TREATMENTS
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
            <motion.p className={styles.eyebrowDark} variants={fadeUp}>Explore</motion.p>
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
            {RELATED_TREATMENTS.map((item) => (
              <motion.div key={item.title} className={styles.relatedCell} variants={fadeUp}>
                <Link href={item.href} className={styles.relatedCard}>
                  <span className={styles.relatedTag}>{item.tag}</span>
                  <h3 className={styles.relatedTitle}>{item.title}</h3>
                  <p className={styles.relatedDesc}>{item.desc}</p>
                  <span className={styles.relatedArrow} aria-hidden="true">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </span>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </Container>
      </Section>

      {/* ════════════════════════════════════════
          15. RELATED CONDITIONS
      ════════════════════════════════════════ */}
      <Section variant="light" data-section-theme="light" className={styles.relatedConditionsSection}>
        <Container>
          <motion.div
            className={styles.sectionHeaderCentre}
            variants={stagger(0.1)}
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
          >
            <motion.p className={styles.eyebrowDark} variants={fadeUp}>Similar Concerns</motion.p>
            <motion.h2 className={styles.headingDark} variants={fadeUp}>
              Related Conditions
            </motion.h2>
          </motion.div>

          <motion.div
            className={styles.relatedGrid}
            variants={stagger(0.1)}
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
          >
            {RELATED_CONDITIONS.map((item) => (
              <motion.div key={item.title} className={styles.relatedCell} variants={fadeUp}>
                <Link href={item.href} className={styles.relatedCard}>
                  <span className={styles.relatedTag}>{item.tag}</span>
                  <h3 className={styles.relatedTitle}>{item.title}</h3>
                  <p className={styles.relatedDesc}>{item.desc}</p>
                  <span className={styles.relatedArrow} aria-hidden="true">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </span>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </Container>
      </Section>

    </>
  );
}
