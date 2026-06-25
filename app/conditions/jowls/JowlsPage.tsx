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

/* ── Jowl types ───────────────────────────────────────────────── */
const JOWL_TYPES = [
  {
    num: '01',
    title: 'Mild Jowling',
    desc: 'Early skin looseness along the jawline with subtle drooping, still maintaining reasonable facial definition.',
  },
  {
    num: '02',
    title: 'Moderate Jowling',
    desc: 'Visible sagging below the jaw with noticeable loss of jawline definition and a heavier lower face.',
  },
  {
    num: '03',
    title: 'Severe Jowling',
    desc: 'Significant skin laxity with heavy drooping that noticeably affects overall facial contour and symmetry.',
  },
];

/* ── Causes ───────────────────────────────────────────────────── */
const CAUSES = [
  {
    title: 'Loss of Collagen & Elastin',
    desc: 'As collagen and elastin production slows with age, the skin loses its firmness and ability to stay lifted along the jawline.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="12" cy="12" r="10"/>
        <polyline points="12 6 12 12 16 14"/>
      </svg>
    ),
  },
  {
    title: 'Ageing & Gravity',
    desc: 'Over time, gravity pulls weakened skin tissue downwards, forming the characteristic droop along the jaw and lower face.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M12 2v20M2 12h20"/>
        <path d="M4.93 4.93l14.14 14.14"/>
      </svg>
    ),
  },
  {
    title: 'Weight Loss',
    desc: 'Significant weight loss can stretch and loosen the skin around the jaw, leaving it less able to retract and stay firm.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"/>
      </svg>
    ),
  },
  {
    title: 'Genetics',
    desc: 'Inherited bone structure and skin type influence how quickly jowls develop, meaning some people are more prone regardless of lifestyle.',
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
    title: 'Sun Damage & UV Exposure',
    desc: 'Prolonged UV exposure breaks down collagen fibres, accelerating the loss of skin elasticity and tone in the lower face.',
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
    title: 'Lifestyle Factors',
    desc: 'Smoking and poor diet deplete antioxidants and impair collagen production, accelerating skin laxity and the formation of jowls.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
        <circle cx="9" cy="7" r="4"/>
        <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
        <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
      </svg>
    ),
  },
];

/* ── Risk factors ─────────────────────────────────────────────── */
const RISK_FACTORS = [
  'Those over the age of 40.',
  'People who have lost significant weight.',
  'Individuals with naturally thinner or fair skin.',
  'Those with sun-damaged or UV-exposed skin.',
  'People with a genetic predisposition to skin laxity.',
  'Smokers and former smokers.',
];

/* ── Diagnose steps ───────────────────────────────────────────── */
const DIAGNOSE_STEPS = [
  {
    num: '01',
    text: 'Facial Skin Laxity Assessment , evaluating the degree of skin looseness and loss of firmness across the lower face.',
  },
  {
    num: '02',
    text: 'Jawline & Lower Face Analysis , examining the contour, definition, and extent of drooping along the jaw and chin.',
  },
  {
    num: '03',
    text: 'Medical & Lifestyle History Review , discussing contributing factors such as weight changes, sun exposure, and skincare habits.',
  },
];

/* ── Treatments ───────────────────────────────────────────────── */
const TREATMENTS = [
  {
    title:  'Endolift Laser',
    desc:   'A minimally invasive laser treatment that tightens and lifts sagging skin along the jawline and lower face from within.',
    href:   '/treatments/endolift-laser-leicester',
    image:  '/images/BA1.jpg',
  },
  {
    title:  'Morpheus8',
    desc:   'Combines microneedling with radiofrequency energy to deeply remodel tissue and firm lax skin around the jaw.',
    href:   '/treatments/morpheus8-leicester',
    image:  '/images/BA2.jpg',
  },
  {
    title:  'Dermal Fillers',
    desc:   'Precision-placed hyaluronic acid filler restores lost volume to the cheeks and jawline, lifting and redefining the lower face.',
    href:   '/treatments/dermal-filler-leicester',
    image:  '/images/BA3.jpg',
  },
  {
    title:  'Wrinkle Relaxing Injections',
    desc:   'Strategically placed injections relax the muscles that pull the lower face downwards, softening jowls and improving contour.',
    href:   '/treatments/wrinkle-relaxing-injections-leicester',
    image:  '/images/BA4.jpg',
  },
];

/* ── When to call ─────────────────────────────────────────────── */
const WHEN_TO_CALL = [
  'Rapid or sudden changes in skin laxity or facial contour.',
  'Noticeable asymmetry in the jaw or lower face.',
  'Pain, tenderness, or discomfort in the jaw area.',
  'Significant impact on your confidence or quality of life.',
];

/* ── Results timeline ─────────────────────────────────────────── */
const RESULTS_TIMELINE = [
  {
    phase: 'Treatment Timeline',
    title: 'Personalised Plan',
    desc:  'Your specialist will outline a tailored treatment timeline based on your individual goals and the severity of jowling.',
  },
  {
    phase: 'Lifting & Firming Progress',
    title: 'Visible Improvement',
    desc:  'Skin begins to feel firmer and more lifted as collagen stimulation and volumising effects take hold over weeks.',
  },
  {
    phase: 'Long-term Maintenance',
    title: 'Sustained Results',
    desc:  'Regular top-up treatments help sustain your lifting and firming results, keeping the jawline defined over time.',
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
    question: 'What causes jowls and sagging skin?',
    answer:
      'Jowls form as collagen and elastin in the skin break down with age, reducing its ability to stay lifted. Fat pads in the cheeks gradually descend, collecting along the jawline. Genetics, sun damage, significant weight changes, and lifestyle factors such as smoking can all accelerate the process.',
  },
  {
    question: 'Can jowls be treated without surgery?',
    answer:
      'Yes. There are several effective non-surgical options available at The One Clinic, including Endolift laser to tighten skin from within, Morpheus8 to deeply remodel tissue, dermal fillers to restore lost volume and lift, and wrinkle relaxing injections to soften downward-pulling muscles. Our doctors will recommend the most suitable treatment after a thorough assessment.',
  },
  {
    question: 'How long do jowl treatment results last?',
    answer:
      'Results vary depending on the treatment chosen. Dermal fillers typically last 12 to 18 months, while energy-based treatments such as Endolift and Morpheus8 can provide results for up to 18 to 24 months with appropriate maintenance. Regular top-up appointments help sustain your results long term.',
  },
  {
    question: 'Is jowl treatment safe?',
    answer:
      'Yes. All treatments at The One Clinic are performed by GMC-registered doctors with specialist training in medical aesthetics. We follow strict clinical protocols to ensure your safety and comfort throughout. A thorough consultation is carried out before any treatment begins.',
  },
  {
    question: 'What is the recovery time after jowl treatment?',
    answer:
      'Most non-surgical jowl treatments have minimal downtime. Dermal filler patients may experience mild swelling or bruising for a few days. Energy-based treatments such as Morpheus8 may cause temporary redness or mild discomfort that typically resolves within 24 to 72 hours. You can usually return to normal activities the same day.',
  },
  {
    question: 'At what age do jowls typically appear?',
    answer:
      'Jowls can begin to appear as early as the mid-thirties, though they are more commonly noticed from the age of 40 onwards. The rate of development depends on genetics, skin type, lifestyle, and the degree of sun exposure over a lifetime. Early non-surgical intervention can slow progression and restore definition.',
  },
];

/* ── Related data ──────────────────────────────────────────────── */
const RELATED_TREATMENTS = [
  {
    title: 'Endolift Laser',
    desc:  'A minimally invasive laser that lifts and tightens sagging skin along the jaw and lower face from within.',
    href:  '/treatments/endolift-laser-leicester',
    tag:   'Medical Aesthetics',
  },
  {
    title: 'Morpheus8',
    desc:  'Microneedling with radiofrequency energy to deeply remodel tissue and firm lax skin around the jawline.',
    href:  '/treatments/morpheus8-leicester',
    tag:   'Medical Aesthetics',
  },
  {
    title: 'Dermal Fillers',
    desc:  'Restore volume and redefine the jawline with precision-placed hyaluronic acid filler.',
    href:  '/treatments/dermal-filler-leicester',
    tag:   'Medical Aesthetics',
  },
  {
    title: 'Wrinkle Relaxing Injections',
    desc:  'Relax downward-pulling facial muscles to soften jowls and improve lower face contour.',
    href:  '/treatments/wrinkle-relaxing-injections-leicester',
    tag:   'Medical Aesthetics',
  },
];

const RELATED_CONDITIONS = [
  {
    title: 'Turkey Neck',
    desc:  'Tighten and smooth loose skin and horizontal lines along the neck for a more youthful profile.',
    href:  '/conditions/turkey-neck',
    tag:   'Face',
  },
  {
    title: 'Nasolabial Folds',
    desc:  'Soften deep lines running from the nose to the corners of the mouth for a refreshed appearance.',
    href:  '/conditions/nasolabial-folds',
    tag:   'Face',
  },
];

/* ════════════════════════════════════════════════════════════════
   PAGE
════════════════════════════════════════════════════════════════ */
export default function JowlsPage() {
  const [showAllFaqs, setShowAllFaqs] = useState(false);

  const visibleFaqs = showAllFaqs ? FAQS : FAQS.slice(0, 4);

  return (
    <>
      {/* ════════════════════════════════════════
          1. HERO
      ════════════════════════════════════════ */}
      <section
        className={styles.hero}
        aria-label="Jowls & Sagging Skin, hero"
        data-section-theme="dark"
      >
        {/* Breadcrumb, pinned below fixed header */}
        <div className={styles.heroBreadcrumb}>
          <Container>
            <Breadcrumb
              theme="dark"
              items={[
                { label: 'Conditions', href: '/conditions' },
                { label: 'Jowls & Sagging Skin' },
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
                Conditions · Face
              </m.span>

              <m.h1 className={styles.heroTitle} variants={fadeUp}>
                Jowls &amp; Sagging Skin Treatment Leicester
              </m.h1>

              <m.p className={styles.heroDesc} variants={fadeUp}>
                Explore non-surgical and surgical solutions to lift and firm
                the lower face and jawline for a naturally defined, youthful look.
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
                src="/images/Jowls_Sagging Skin.png"
                alt="Lower face showing jowls and sagging skin, treated at The One Clinic Leicester"
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
          2. WHAT ARE JOWLS & TYPES (Combined)
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
                  What are Jowls &amp; Sagging Skin?
                </m.h2>
                <m.p
                  className={styles.combinedDesc}
                  initial="hidden"
                  whileInView="show"
                  variants={fadeUp}
                  viewport={VIEWPORT}
                >
                  Jowls refer to the sagging skin and soft tissue that develops along
                  the lower face and jaw as collagen and elastin break down with age.
                  The skin loses its ability to stay lifted, causing it to droop below
                  the jawline and giving the face a heavier, less defined appearance.
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
                <h3 className={styles.typesRightHeading}>Types of Jowling</h3>
              </m.div>

              <m.div
                className={styles.combinedCards}
                variants={stagger(0.1)}
                initial="hidden"
                whileInView="show"
                viewport={VIEWPORT}
              >
                {JOWL_TYPES.map((type) => (
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
          3. CAUSES
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
              Jowls &amp; Sagging Skin Causes
            </m.h2>
            <m.p className={styles.sectionSubtext} variants={fadeUp}>
              Understanding what contributes to jowls and sagging skin helps
              identify the right treatment approach for long-lasting results.
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
          4. WHO IS MORE LIKELY?
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
                src="/images/Jowls_Sagging Skin.png"
                alt="Person showing jowls and sagging skin along the lower face"
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
                  Who Is More Likely to Develop Jowls &amp; Sagging Skin?
                </m.h2>
                <m.p className={styles.riskIntro} variants={fadeUp}>
                  The following individuals may be more at risk of developing jowls and sagging skin.
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
          5. HOW DO WE DIAGNOSE?
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
              How Do We Diagnose Jowls &amp; Sagging Skin?
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
          6. TREATMENTS FOR JOWLS
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
              Treatments For Jowls &amp; Sagging Skin
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
          7. WHEN TO CALL A DOCTOR?
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
                Jowls and sagging skin are typically a cosmetic concern, but see a
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
          8. RESULTS & EXPECTATIONS
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
              After treatment for jowls and sagging skin, here is what you can
              expect at each stage of your journey.
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
              Why Choose The One Clinic For Jowls &amp; Sagging Skin Treatment
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
          11. FAQ
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

          {!showAllFaqs && FAQS.length > 4 && (
            <div className={styles.faqToggleWrap}>
              <button
                className={styles.faqToggleBtn}
                onClick={() => setShowAllFaqs(true)}
              >
                View All Questions
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </button>
            </div>
          )}
        </Container>
      </Section>

      {/* ════════════════════════════════════════
          12. CONSULTATION CTA
      ════════════════════════════════════════ */}
      <section
        className={styles.ctaBand}
        data-section-theme="dark"
        aria-label="Jowls & Sagging Skin consultation CTA"
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
              Ready to Lift &amp; Firm{' '}
              <span className={styles.ctaAccent}>Your Jawline?</span>
            </m.h2>
            <m.p className={styles.ctaSubtext} variants={fadeUp}>
              Talk to our specialists today to find the best treatment for your
              jowls and restore a naturally defined, youthful appearance.
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
          13. LEAD FORM
      ════════════════════════════════════════ */}
      <div id="contact">
        <LeadForm />
      </div>

      {/* ════════════════════════════════════════
          14. RELATED TREATMENTS (dark)
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
            <m.p className={styles.eyebrowLight} variants={fadeUp}>Explore</m.p>
            <m.h2 className={styles.headingLight} variants={fadeUp}>
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
          15. RELATED CONDITIONS
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
