'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link  from 'next/link';
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
import { fadeUp, stagger, VIEWPORT } from '@/lib/motion';
import styles from './page.module.css';

/* ── Pigmentation types ───────────────────────────────────────── */
const PIGMENTATION_TYPES = [
  {
    num: '01',
    title: 'Dark Spots / Age Spots',
    desc: 'Localised brown patches that develop from sun exposure or ageing, typically on the face, hands, and décolletage.',
  },
  {
    num: '02',
    title: 'Uneven Skin Tone',
    desc: 'Diffuse discolouration spread across larger areas of the skin, giving an inconsistent, blotchy complexion.',
  },
  {
    num: '03',
    title: 'Post-Inflammatory Pigmentation',
    desc: 'Dark marks left behind after acne, injury, or eczema as the skin produces excess melanin during healing.',
  },
];

/* ── Causes ───────────────────────────────────────────────────── */
const CAUSES = [
  {
    title: 'UV & Sun Exposure',
    desc: 'UV radiation is the leading trigger for pigmentation. It stimulates excess melanin production, causing dark spots, freckles, and uneven patches on exposed skin.',
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
    title: 'Post-Acne Scarring',
    desc: 'Inflammation from acne breakouts can trigger melanin overproduction, leaving persistent dark marks long after the blemish itself has healed.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="12" cy="12" r="10"/>
        <line x1="12" y1="8" x2="12" y2="12"/>
        <line x1="12" y1="16" x2="12.01" y2="16"/>
      </svg>
    ),
  },
  {
    title: 'Hormonal Changes',
    desc: 'Fluctuations during pregnancy, menopause, or from hormonal contraception can trigger melasma, a pattern of deeper, symmetrical pigmentation on the face.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
      </svg>
    ),
  },
  {
    title: 'Skin Inflammation or Injury',
    desc: 'Any form of skin trauma, including cuts, burns, eczema flares, or cosmetic procedures, can cause post-inflammatory hyperpigmentation as the skin heals.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
      </svg>
    ),
  },
  {
    title: 'Ageing & Cell Turnover Slowdown',
    desc: 'As skin ages and cell renewal slows, melanin distributes less evenly, leading to age spots and a generally dull or patchy complexion.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="12" cy="12" r="10"/>
        <polyline points="12 6 12 12 16 14"/>
      </svg>
    ),
  },
  {
    title: 'Genetics',
    desc: 'A predisposition to freckles, melasma, or uneven skin tone can be inherited, making some skin types more susceptible regardless of lifestyle habits.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M6 3c0 4.5 6 4.5 6 9s-6 4.5-6 9"/>
        <path d="M18 3c0 4.5-6 4.5-6 9s6 4.5 6 9"/>
        <line x1="3" y1="9" x2="21" y2="9"/>
        <line x1="3" y1="15" x2="21" y2="15"/>
      </svg>
    ),
  },
];

/* ── FAQ data ──────────────────────────────────────────────────── */
const FAQS = [
  {
    question: 'What causes pigmentation on the skin?',
    answer:
      'Pigmentation is caused by an overproduction or irregular distribution of melanin, the pigment that gives skin its colour. Common causes include sun exposure, hormonal changes (such as pregnancy or the menopause), post-inflammatory responses from acne or skin trauma, ageing, and genetic predisposition. Identifying the underlying cause helps determine the most effective treatment.',
  },
  {
    question: 'Can pigmentation be permanently removed?',
    answer:
      'Many forms of pigmentation can be significantly reduced or cleared with the right treatment. Laser therapy, IPL, and chemical peels are particularly effective for sun damage, age spots, and post-inflammatory marks. However, some pigmentation, particularly melasma, can recur without ongoing sun protection and maintenance. Our doctors will advise on the most appropriate approach for your skin.',
  },
  {
    question: 'How long do results last?',
    answer:
      'Results vary depending on the type and depth of pigmentation and the treatment used. Lumecca IPL and laser resurfacing can provide long-lasting improvement, often 12 months or more with good sun protection. Chemical peels typically require a course of sessions for best results, with ongoing maintenance recommended. Daily SPF use is essential to prevent recurrence.',
  },
  {
    question: 'Is pigmentation treatment safe for all skin tones?',
    answer:
      'Yes, with the appropriate treatment selection. Some laser technologies carry a higher risk of post-inflammatory pigmentation in darker skin tones if not used correctly. At The One Clinic, our GMC-registered doctors assess your skin type and pigmentation carefully before recommending a safe, tailored treatment plan.',
  },
  {
    question: 'What is the recovery time?',
    answer:
      'Recovery varies by treatment. Lumecca IPL may cause temporary redness and darkening of spots for several days. Laser resurfacing can result in redness and sensitivity for up to a week. Chemical peels can cause peeling and flaking over 3 to 7 days depending on the depth. Most patients resume normal activities within 24 to 48 hours, with results continuing to improve over the following weeks.',
  },
  {
    question: 'How many sessions will I need?',
    answer:
      'The number of sessions required depends on the severity and type of pigmentation. Lumecca IPL typically requires 1 to 3 sessions, while chemical peels and skincare programmes may involve regular treatments over several weeks. During your consultation, our specialists will create a personalised treatment plan tailored to your skin and goals.',
  },
];

/* ── Related data ──────────────────────────────────────────────── */
const RELATED_TREATMENTS = [
  {
    title: 'Lumecca IPL',
    desc:  'Target dark spots and sun damage with intense pulsed light for a brighter, more even complexion.',
    href:  '/treatments/ipl-leicester',
    tag:   'Medical Aesthetics',
  },
  {
    title: 'Chemical Peels',
    desc:  'Resurface and brighten pigmented skin with exfoliating, skin-renewing peels.',
    href:  '/treatments/chemical-peels-leicester',
    tag:   'Medical Aesthetics',
  },
  {
    title: 'Laser Resurfacing',
    desc:  'Break down excess melanin and renew the skin surface for a clearer, more uniform tone.',
    href:  '/treatments/deep-laser-resurfacing-leicester',
    tag:   'Medical Aesthetics',
  },
  {
    title: 'AlumierMD Skincare',
    desc:  'Clinically formulated skincare to brighten, protect, and maintain clear, even-toned skin.',
    href:  '/treatments/skincare-alumier-md-leicester',
    tag:   'Medical Aesthetics',
  },
];

const RELATED_CONDITIONS = [
  {
    title: 'Hyperpigmentation / Sun Damage / Freckles',
    desc:  'Treat uneven skin tone, sunspots, freckles, and deeper pigmentation concerns.',
    href:  '/conditions/hyperpigmentation-sun-damage-freckles',
    tag:   'Skin',
  },
  {
    title: 'Rosacea',
    desc:  'Calm persistent facial redness and restore an even, clear complexion.',
    href:  '/conditions/rosacea',
    tag:   'Skin',
  },
];

/* ── Risk factors ─────────────────────────────────────────────── */
const RISK_FACTORS = [
  'Those with frequent sun exposure without SPF protection.',
  'People with darker skin tones, which are more prone to post-inflammatory pigmentation.',
  'Women on hormonal contraception or those who are pregnant.',
  'Acne-prone individuals who experience recurring breakouts.',
  'Those with a history of eczema or psoriasis.',
  'People over 40 with accumulated UV damage and slower cell turnover.',
];

/* ── Diagnose steps ───────────────────────────────────────────── */
const DIAGNOSE_STEPS = [
  {
    num: '01',
    title: 'Skin Pigmentation Mapping',
    text: 'A thorough visual assessment of the distribution, depth, and pattern of pigmentation across the face and body.',
  },
  {
    num: '02',
    title: "Wood's Lamp & Dermatoscopy Analysis",
    text: 'Advanced diagnostic tools used to determine the depth of pigmentation and identify whether it is epidermal, dermal, or mixed.',
  },
  {
    num: '03',
    title: 'Medical & Lifestyle History Review',
    text: 'A detailed discussion of your skin history, hormone use, sun exposure habits, and skincare routine to identify root causes and guide treatment.',
  },
];

/* ── Treatments for pigmentation ─────────────────────────────── */
const TREATMENTS = [
  {
    title:  'Lumecca IPL',
    desc:   'Intense pulsed light targets excess melanin to reduce dark spots, sun damage, and uneven pigmentation for a visibly brighter complexion.',
    href:   '/treatments/ipl-leicester',
    image:  '/images/BA1.jpg',
  },
  {
    title:  'Chemical Peels',
    desc:   'Exfoliating peels remove pigmented surface cells and stimulate renewal, progressively lightening dark patches and uneven tone.',
    href:   '/treatments/chemical-peels-leicester',
    image:  '/images/BA2.jpg',
  },
  {
    title:  'Laser Resurfacing',
    desc:   'Targeted laser energy breaks down melanin deposits and resurfacing the skin for a clearer, more even complexion.',
    href:   '/treatments/deep-laser-resurfacing-leicester',
    image:  '/images/BA3.jpg',
  },
  {
    title:  'AlumierMD Skincare',
    desc:   'Clinically formulated brightening skincare that inhibits melanin production, maintains results, and protects with daily SPF.',
    href:   '/treatments/skincare-alumier-md-leicester',
    image:  '/images/BA4.jpg',
  },
];

/* ── When to call a doctor ────────────────────────────────────── */
const WHEN_TO_CALL = [
  'Rapidly changing spots that are growing or darkening quickly.',
  'Spots with irregular or uneven borders.',
  'Patches that bleed, crust, or fail to heal.',
  'New dark patches appearing after the age of 40 without clear cause.',
];

/* ── Results timeline ─────────────────────────────────────────── */
const RESULTS_TIMELINE = [
  {
    phase: '4 to 6 Weeks',
    title: 'Treatment Timeline',
    desc:  'Initial improvements in skin tone begin to appear within 4 to 6 weeks of starting treatment.',
  },
  {
    phase: 'Progressive',
    title: 'Visible Skin Brightening',
    desc:  'Dark spots fade and overall skin tone becomes more uniform with each treatment session.',
  },
  {
    phase: 'Ongoing',
    title: 'SPF & Maintenance Plan',
    desc:  'A daily SPF routine and periodic maintenance treatments sustain a clear, even complexion long-term.',
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

/* ════════════════════════════════════════════════════════════════
   PAGE
════════════════════════════════════════════════════════════════ */
export default function PigmentationPage() {
  const [showAllFaqs, setShowAllFaqs] = useState(false);

  const visibleFaqs = showAllFaqs ? FAQS : FAQS.slice(0, 4);

  return (
    <>
      {/* ════════════════════════════════════════
          1. HERO
      ════════════════════════════════════════ */}
      <section
        className={styles.hero}
        aria-label="Pigmentation Treatment Leicester, hero"
        data-section-theme="dark"
      >
        {/* Breadcrumb, pinned below fixed header */}
        <div className={styles.heroBreadcrumb}>
          <Container>
            <Breadcrumb
              theme="dark"
              items={[
                { label: 'Conditions', href: '/conditions' },
                { label: 'Pigmentation' },
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
            {/* Left: text content */}
            <div className={styles.heroLeft}>
              <m.span className={styles.heroCategory} variants={fadeUp}>
                Conditions · Skin
              </m.span>

              <m.h1 className={styles.heroTitle} variants={fadeUp}>
                Pigmentation Treatment Leicester
              </m.h1>

              <m.p className={styles.heroDesc} variants={fadeUp}>
                Treat uneven skin tone, dark spots and discolouration with
                clinically proven treatments for clearer, more radiant skin.
              </m.p>

              <m.div className={styles.heroCtas} variants={fadeUp}>
                <BookConsultationButton className={styles.heroCtaPrimary}>
                  Book A Consultation
                </BookConsultationButton>
              </m.div>

              {/* Trust badges */}
              <m.div variants={fadeUp}>
                <TrustBadges theme="dark" />
              </m.div>

              {/* Trust items */}
              <m.div className={styles.heroTrust} variants={fadeUp}>
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
              </m.div>
            </div>

            {/* Right: hero image */}
            <m.div className={styles.heroImageWrap} variants={fadeUp}>
              <Image
                src="/images/Pigmentation.png"
                alt="Pigmentation treatment at The One Clinic Leicester , clearer, more even skin tone"
                fill
                className={styles.heroImage}
                sizes="(max-width: 900px) 100vw, 50vw"
                priority
              />
              <div className={styles.heroImageFade} aria-hidden="true" />
            </m.div>
          </m.div>
        </Container>
      </section>

      {/* ════════════════════════════════════════
          2. WHAT IS PIGMENTATION & TYPES (Combined)
      ════════════════════════════════════════ */}
      <Section variant="light" data-section-theme="light" className={styles.overviewTypesSection}>
        <Container>
          <div className={styles.combinedBody}>
            {/* Left column: Overview */}
            <div className={styles.combinedLeft}>
              <div className={styles.combinedLeftTop}>
                <m.p
                  className={styles.eyebrowDark}
                  initial="hidden"
                  whileInView="show"
                  variants={fadeUp}
                  viewport={VIEWPORT}
                >
                  About This Condition
                </m.p>
                <m.h2
                  className={styles.combinedHeading}
                  initial="hidden"
                  whileInView="show"
                  variants={fadeUp}
                  viewport={VIEWPORT}
                >
                  What Is Pigmentation?
                </m.h2>
                <m.p
                  className={styles.combinedDesc}
                  initial="hidden"
                  whileInView="show"
                  variants={fadeUp}
                  viewport={VIEWPORT}
                >
                  Skin pigmentation refers to uneven colouration caused by an
                  overproduction or irregular distribution of melanin , the natural
                  pigment responsible for skin colour. It can appear as dark spots,
                  blotchy patches, or a generally dull, uneven complexion, and may
                  affect the face, hands, neck, or body. With the right treatment,
                  most forms of pigmentation can be substantially reduced or cleared,
                  revealing clearer, more radiant skin.
                </m.p>
              </div>
            </div>

            {/* Right column: Types */}
            <div className={styles.combinedRight}>
              <m.div
                className={styles.typesRightHeader}
                initial="hidden"
                whileInView="show"
                variants={fadeUp}
                viewport={VIEWPORT}
              >
                <p className={styles.combinedRightLabel}>Classification</p>
                <h3 className={styles.typesRightHeading}>Types of Pigmentation</h3>
              </m.div>

              <m.div
                className={styles.combinedCards}
                variants={stagger(0.1)}
                initial="hidden"
                whileInView="show"
                viewport={VIEWPORT}
              >
                {PIGMENTATION_TYPES.map((type) => (
                  <m.div
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
                  </m.div>
                ))}
              </m.div>
            </div>
          </div>
        </Container>
      </Section>

      {/* ════════════════════════════════════════
          4. PIGMENTATION CAUSES
      ════════════════════════════════════════ */}
      <Section variant="light" data-section-theme="light" className={styles.causesSection}>
        <Container>
          <m.div
            className={styles.sectionHeaderCentre}
            variants={stagger(0.1)}
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
          >
            <m.p className={styles.eyebrowDark} variants={fadeUp}>
              Root Causes
            </m.p>
            <m.h2 className={styles.headingDark} variants={fadeUp}>
              What Causes Pigmentation?
            </m.h2>
            <m.p className={styles.sectionSubtext} variants={fadeUp}>
              Understanding what contributes to pigmentation helps identify
              the right treatment approach for long-lasting results.
            </m.p>
          </m.div>

          <m.div
            className={styles.causesGrid}
            variants={stagger(0.08)}
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
          >
            {CAUSES.map((cause) => (
              <m.div
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
              </m.div>
            ))}
          </m.div>
        </Container>
      </Section>

      {/* ════════════════════════════════════════
          5. WHO IS MORE LIKELY?
      ════════════════════════════════════════ */}
      <Section variant="light" data-section-theme="light">
        <Container>
          <m.div
            className={styles.riskGrid}
            variants={stagger(0.12)}
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
          >
            {/* Left: image */}
            <m.div className={styles.riskImageWrap} variants={fadeUp}>
              <Image
                src="/images/Pigmentation.png"
                alt="Person with pigmentation on skin , dark spots and uneven skin tone"
                fill
                className={styles.riskImage}
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className={styles.riskImageOverlay} aria-hidden="true" />
            </m.div>

            {/* Right: heading + intro + checklist */}
            <m.div className={styles.riskRight} variants={stagger(0.1)}>
              <div className={styles.riskRightInner}>
                <m.p className={styles.eyebrowDark} variants={fadeUp}>
                  Risk Factors
                </m.p>
                <m.h2 className={styles.riskHeading} variants={fadeUp}>
                  Who Is More Likely to Develop Pigmentation?
                </m.h2>
                <m.p className={styles.riskIntro} variants={fadeUp}>
                  The following individuals may be more at risk of developing skin pigmentation.
                </m.p>

                <m.ul
                  className={styles.riskList}
                  role="list"
                  variants={stagger(0.08)}
                >
                  {RISK_FACTORS.map((item) => (
                    <m.li key={item} className={styles.riskItem} variants={fadeUp}>
                      <span className={styles.riskCheck} aria-hidden="true">
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                          <polyline points="2,7 5.5,10.5 12,3.5" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </span>
                      <span>{item}</span>
                    </m.li>
                  ))}
                </m.ul>
              </div>
            </m.div>
          </m.div>
        </Container>
      </Section>

      {/* ════════════════════════════════════════
          6. HOW DO WE DIAGNOSE?
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
            <m.p className={styles.eyebrowLight} variants={fadeUp}>
              Our Process
            </m.p>
            <m.h2 className={styles.headingLight} variants={fadeUp}>
              How Do We Diagnose Pigmentation?
            </m.h2>
            <m.p className={styles.diagnoseIntro} variants={fadeUp}>
              Our specialists will:
            </m.p>
          </m.div>

          <m.div
            className={styles.diagnoseGrid}
            variants={stagger(0.1)}
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
          >
            {DIAGNOSE_STEPS.map((step) => (
              <m.div
                key={step.num}
                className={styles.diagnoseCard}
                variants={fadeUp}
              >
                <span className={styles.diagnoseNum} aria-hidden="true">
                  {step.num}
                </span>
                <p className={styles.diagnoseText}>{step.text}</p>
              </m.div>
            ))}
          </m.div>
        </Container>
      </Section>

      {/* ════════════════════════════════════════
          7. TREATMENTS FOR PIGMENTATION
      ════════════════════════════════════════ */}
      <Section variant="light" data-section-theme="light">
        <Container>
          <m.div
            className={styles.sectionHeaderCentre}
            variants={stagger(0.1)}
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
          >
            <m.p className={styles.eyebrowDark} variants={fadeUp}>
              Your Options
            </m.p>
            <m.h2 className={styles.headingDark} variants={fadeUp}>
              Treatments For Pigmentation
            </m.h2>
          </m.div>

          <m.div
            className={styles.treatmentsGrid}
            variants={stagger(0.1)}
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
          >
            {TREATMENTS.map((t) => (
              <m.div
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
              </m.div>
            ))}
          </m.div>
        </Container>
      </Section>

      {/* ════════════════════════════════════════
          8. WHEN TO CALL A DOCTOR?
      ════════════════════════════════════════ */}
      <Section variant="dark" data-section-theme="dark">
        <Container>
          <m.div
            className={styles.whenToCallWrap}
            variants={stagger(0.12)}
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
          >
            {/* Left: heading */}
            <m.div className={styles.whenToCallLeft} variants={stagger(0.1)}>
              <m.p className={styles.eyebrowLight} variants={fadeUp}>
                Medical Advice
              </m.p>
              <m.h2 className={styles.whenToCallHeading} variants={fadeUp}>
                When to Call a Doctor?
              </m.h2>
              <m.p className={styles.whenToCallIntro} variants={fadeUp}>
                Most pigmentation is harmless and only affects appearance. See a
                doctor if you notice:
              </m.p>
            </m.div>

            {/* Right: warning list */}
            <m.ul
              className={styles.whenToCallList}
              role="list"
              variants={stagger(0.08)}
            >
              {WHEN_TO_CALL.map((item) => (
                <m.li key={item} className={styles.whenToCallItem} variants={fadeUp}>
                  <span className={styles.whenToCallIcon} aria-hidden="true">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10"/>
                      <line x1="12" y1="8" x2="12" y2="12"/>
                      <line x1="12" y1="16" x2="12.01" y2="16"/>
                    </svg>
                  </span>
                  <span>{item}</span>
                </m.li>
              ))}
            </m.ul>
          </m.div>
        </Container>
      </Section>

      {/* ════════════════════════════════════════
          9. RESULTS & EXPECTATIONS
      ════════════════════════════════════════ */}
      <Section variant="light" data-section-theme="light" className={styles.resultsSection}>
        <Container>
          <m.div
            className={styles.sectionHeaderCentre}
            variants={stagger(0.1)}
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
          >
            <m.p className={styles.eyebrowDark} variants={fadeUp}>
              What To Expect
            </m.p>
            <m.h2 className={styles.headingDark} variants={fadeUp}>
              Results &amp; Expectations
            </m.h2>
            <m.p className={styles.sectionSubtext} variants={fadeUp}>
              After pigmentation treatment, here is what you can typically expect at
              each stage of your journey.
            </m.p>
          </m.div>

          <m.div
            className={styles.resultsGrid}
            variants={stagger(0.1)}
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
          >
            {RESULTS_TIMELINE.map((item) => (
              <m.div
                key={item.phase}
                className={styles.resultCard}
                variants={fadeUp}
                whileHover={{ y: -6, transition: { type: 'spring', stiffness: 280, damping: 18 } }}
              >
                <span className={styles.resultPhase}>{item.phase}</span>
                <h3 className={styles.resultTitle}>{item.title}</h3>
                <p className={styles.resultDesc}>{item.desc}</p>
              </m.div>
            ))}
          </m.div>
        </Container>
      </Section>

      {/* ════════════════════════════════════════
          10. MEET THE EXPERTS
      ════════════════════════════════════════ */}
      <MeetTheExperts />

      {/* ════════════════════════════════════════
          GOOGLE REVIEWS
      ════════════════════════════════════════ */}
      <Testimonials />

      {/* ════════════════════════════════════════
          11. WHY CHOOSE THE ONE CLINIC
      ════════════════════════════════════════ */}
      <Section variant="light" data-section-theme="light" className={styles.whySection}>
        <Container>
          <m.div
            className={styles.sectionHeaderCentre}
            variants={stagger(0.1)}
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
          >
            <m.p className={styles.eyebrowDark} variants={fadeUp}>
              Why Us
            </m.p>
            <m.h2 className={styles.headingDark} variants={fadeUp}>
              Why Choose The One Clinic For Pigmentation Treatment
            </m.h2>
          </m.div>

          <m.div
            className={styles.whyGrid}
            variants={stagger(0.08)}
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
          >
            {CLINIC_REASONS.map((r) => (
              <m.div
                key={r.n}
                className={styles.whyCard}
                variants={fadeUp}
                whileHover={{ y: -6, transition: { type: 'spring', stiffness: 280, damping: 20 } }}
              >
                <span className={styles.whyNumber}>{r.n}</span>
                <p className={styles.whyText}>{r.text}</p>
              </m.div>
            ))}
          </m.div>
        </Container>
      </Section>

      {/* ════════════════════════════════════════
          12. FAQ
      ════════════════════════════════════════ */}
      <Section variant="light" data-section-theme="light" className={styles.faqSection}>
        <Container className={styles.faqInner}>
          <m.div
            className={styles.sectionHeaderCentre}
            variants={stagger(0.1)}
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
          >
            <m.p className={styles.eyebrowDark} variants={fadeUp}>FAQ</m.p>
            <m.h2 className={styles.headingDark} variants={fadeUp}>
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
            <Accordion items={visibleFaqs} theme="dark" />
          </m.div>

          <div className={styles.faqToggleWrap}>
            <button
              className={styles.faqToggleBtn}
              onClick={() => setShowAllFaqs((prev) => !prev)}
              aria-expanded={showAllFaqs}
            >
              {showAllFaqs ? 'View Fewer Questions' : 'View All Questions'}
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
                style={{ transform: showAllFaqs ? 'rotate(180deg)' : undefined }}
              >
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </button>
          </div>
        </Container>
      </Section>

      {/* ════════════════════════════════════════
          13. CONSULTATION CTA
      ════════════════════════════════════════ */}
      <section
        className={styles.ctaBand}
        data-section-theme="dark"
        aria-label="Pigmentation consultation CTA"
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
          <m.div
            className={styles.ctaContent}
            variants={stagger(0.15)}
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
          >
            <m.p className={styles.eyebrowLight} variants={fadeUp}>
              Take the First Step
            </m.p>
            <m.h2 className={styles.ctaHeading} variants={fadeUp}>
              It&apos;s Time To Reveal{' '}
              <span className={styles.ctaAccent}>Clearer, Brighter Skin!</span>
            </m.h2>
            <m.p className={styles.ctaSubtext} variants={fadeUp}>
              Talk to our specialists today to find the best treatment for your
              pigmentation and restore a naturally clear, radiant complexion.
            </m.p>
            <m.div className={styles.ctaBtns} variants={fadeUp}>
              <BookConsultationButton className={styles.ctaBtnPrimary}>
                Book a Consultation
              </BookConsultationButton>
              <Link href="#contact" className={styles.ctaBtnSecondary}>
                Contact Us
              </Link>
            </m.div>
          </m.div>
        </Container>
      </section>

      {/* ════════════════════════════════════════
          14. LEAD FORM
      ════════════════════════════════════════ */}
      <div id="contact">
        <LeadForm />
      </div>

      {/* ════════════════════════════════════════
          15. RELATED TREATMENTS
      ════════════════════════════════════════ */}
      <Section variant="light" data-section-theme="light">
        <Container>
          <m.div
            className={styles.sectionHeaderCentre}
            variants={stagger(0.1)}
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
          >
            <m.p className={styles.eyebrowDark} variants={fadeUp}>Explore</m.p>
            <m.h2 className={styles.headingDark} variants={fadeUp}>
              Related Treatments
            </m.h2>
          </m.div>

          <m.div
            className={styles.relatedGrid}
            variants={stagger(0.1)}
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
          >
            {RELATED_TREATMENTS.map((item) => (
              <m.div key={item.title} className={styles.relatedCell} variants={fadeUp}>
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
              </m.div>
            ))}
          </m.div>
        </Container>
      </Section>

      {/* ════════════════════════════════════════
          16. RELATED CONDITIONS
      ════════════════════════════════════════ */}
      <Section variant="light" data-section-theme="light" className={styles.relatedConditionsSection}>
        <Container>
          <m.div
            className={styles.sectionHeaderCentre}
            variants={stagger(0.1)}
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
          >
            <m.p className={styles.eyebrowDark} variants={fadeUp}>Similar Concerns</m.p>
            <m.h2 className={styles.headingDark} variants={fadeUp}>
              Related Conditions
            </m.h2>
          </m.div>

          <m.div
            className={styles.relatedGrid}
            variants={stagger(0.1)}
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
          >
            {RELATED_CONDITIONS.map((item) => (
              <m.div key={item.title} className={styles.relatedCell} variants={fadeUp}>
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
              </m.div>
            ))}
          </m.div>
        </Container>
      </Section>

    </>
  );
}
