'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import Section            from '@/components/ui/Section';
import Container          from '@/components/ui/Container';
import Accordion          from '@/components/ui/Accordion';
import BookConsultationButton from '@/components/ui/BookConsultationButton';
import TrustBadges        from '@/components/ui/TrustBadges';
import Breadcrumb         from '@/components/ui/Breadcrumb';
import LeadForm           from '@/components/sections/LeadForm';
import MeetTheExperts     from '@/components/sections/MeetTheExperts';
import Testimonials       from '@/components/sections/Testimonials';
import FinalCTA           from '@/components/sections/FinalCTA';
import { fadeUp, stagger, VIEWPORT } from '@/lib/motion';
import styles from './page.module.css';

/* ── Static data ──────────────────────────────────────────────── */
const AT_A_GLANCE = [
  {
    label: 'Session Time',
    value: '30 to 60 minutes',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="12" cy="12" r="10"/>
        <polyline points="12 6 12 12 16 14"/>
      </svg>
    ),
  },
  {
    label: 'Sessions Recommended',
    value: '4 to 8 sessions',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <polyline points="1 4 1 10 7 10"/>
        <path d="M3.51 15a9 9 0 1 0 .49-3.1"/>
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
    label: 'Downtime',
    value: 'None to minimal',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"/>
        <path d="M9 12l2 2 4-4"/>
      </svg>
    ),
  },
  {
    label: 'Areas Treated',
    value: 'Multiple body areas',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M3 21h18"/>
        <path d="M5 21V7l8-4v4"/>
        <path d="M19 21V11l-6-4"/>
        <path d="M9 21v-4h6v4"/>
      </svg>
    ),
  },
  {
    label: 'Cost',
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
    title: 'Consultation & Body Analysis',
    desc: 'Your journey begins with a thorough consultation where our clinical team assesses your body composition, identifies stubborn fat pockets, and understands your contouring goals. We discuss realistic expectations and create a personalised treatment roadmap tailored to your physiology and aesthetic objectives.',
  },
  {
    n: '02',
    title: 'Personalised Treatment Plan',
    desc: 'Based on your body analysis, we design a bespoke programme selecting the most appropriate technologies for your target areas. We outline the number of sessions, spacing, and combination approaches that will deliver the best results for your unique body shape and goals.',
  },
  {
    n: '03',
    title: 'Progressive Treatment Programme',
    desc: 'Your series of body contouring sessions begins. Each appointment targets specific zones using clinically proven technologies that disrupt fat cells and stimulate collagen. Treatments are comfortable, taking 30 to 60 minutes, with most patients feeling only gentle warmth or mild pressure.',
  },
  {
    n: '04',
    title: 'Results & Review',
    desc: 'As your body naturally eliminates treated fat cells and new collagen matures over the weeks and months following treatment, you will notice progressive improvements in definition and contour. Our team reviews your progress and adjusts the programme as needed to optimise your final results.',
  },
];

const APPROACH_CARDS = [
  {
    eyebrow: '01',
    title: 'Body Analysis',
    desc: 'We begin with a detailed assessment of your body composition, skin quality, and target areas. This clinical evaluation allows us to identify which technologies and techniques will deliver the most effective fat reduction and skin tightening for your specific concerns.',
  },
  {
    eyebrow: '02',
    title: 'Personalised Treatment Plan',
    desc: 'No two bodies are the same. We design a bespoke contouring programme selecting the optimal combination of technologies , whether radiofrequency, cryolipolysis, HIFU, or cavitation , to address your specific fat deposits, skin laxity, and body sculpting goals.',
  },
  {
    eyebrow: '03',
    title: 'Progressive Programme',
    desc: 'Your treatment sessions are spaced to allow your body to naturally process treated fat cells and rebuild collagen. Progressive improvements develop over 6 to 12 weeks, with our team monitoring results at every stage and adjusting your plan for optimal body transformation.',
  },
];

const BENEFITS = [
  {
    title: 'Non-Surgical',
    desc: 'Achieve meaningful body contouring with zero incisions, no anaesthesia, and no surgical risks. Our advanced technologies safely reduce stubborn fat deposits and tighten skin without any need for a scalpel or theatre.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
      </svg>
    ),
  },
  {
    title: 'No Downtime',
    desc: 'Return to work, exercise, and all normal activities immediately after each session. With no recovery period required, body contouring fits seamlessly into the lives of busy professionals and active individuals.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
        <polyline points="22 4 12 14.01 9 11.01"/>
      </svg>
    ),
  },
  {
    title: 'Visible Fat Reduction',
    desc: 'Precisely targets the stubborn fat that diet and exercise cannot shift. Whether belly fat, love handles, inner thigh fullness, or upper arm deposits, our treatments deliver clinically measurable fat reduction in localised problem areas.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="12" cy="12" r="10"/>
        <circle cx="12" cy="12" r="4"/>
        <line x1="4.93" y1="4.93" x2="19.07" y2="19.07"/>
      </svg>
    ),
  },
  {
    title: 'Skin Tightening',
    desc: 'Beyond fat reduction, our body contouring treatments stimulate deep collagen remodelling and skin renewal. This dual action delivers not just a slimmer silhouette but also improved skin firmness, texture, and definition for beautifully contoured results.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/>
        <polyline points="17 6 23 6 23 12"/>
      </svg>
    ),
  },
  {
    title: 'Fully Personalised',
    desc: 'Every treatment programme is designed specifically for your body, goals, and target areas. We customise the technologies, session frequency, and treatment parameters to match your unique physiology and aesthetic objectives.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
        <circle cx="12" cy="12" r="3"/>
      </svg>
    ),
  },
  {
    title: 'Lasting Results',
    desc: 'Treated fat cells are permanently eliminated and do not regenerate. With a stable weight and healthy lifestyle, your sculpted results are long-lasting. Occasional maintenance sessions can further enhance and preserve your transformation.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M12 2a10 10 0 0 1 10 10c0 5.52-4.48 10-10 10S2 17.52 2 12"/>
        <path d="M12 6v6l4 2"/>
      </svg>
    ),
  },
];

const ELIGIBILITY_SUITABLE = [
  'Adults at or near their target weight who want to address stubborn localised fat pockets',
  'Those with mild to moderate skin laxity seeking non-surgical tightening and definition',
  'Individuals looking to refine and sculpt their body without surgery, scars, or downtime',
  'People with good general health and realistic expectations for body contouring outcomes',
  'Anyone committed to maintaining results through a balanced lifestyle and healthy habits',
];

const ELIGIBILITY_NOT_SUITABLE = [
  'Pregnant or breastfeeding women',
  'Those with active skin infections or open wounds in the treatment area',
  'Patients with pacemakers or metal implants in target areas (for certain technologies)',
  'Individuals seeking dramatic surgical-level results without realistic expectations',
  'Those with significant loose skin requiring surgical correction',
];

const TREATMENTS_WE_USE = [
  {
    eyebrow: '01',
    title: 'Endolift Laser',
    desc: 'A minimally invasive laser treatment that melts localised fat deposits and contracts collagen fibres beneath the skin. Ideal for chin, neck, and targeted body areas requiring precise sculpting with minimal recovery.',
  },
  {
    eyebrow: '02',
    title: 'Radiofrequency Skin Tightening',
    desc: 'Delivers controlled radiofrequency energy deep into the dermis to stimulate collagen production and remodel connective tissue. Excellent for tightening loose skin on the abdomen, arms, and thighs following fat reduction.',
  },
  {
    eyebrow: '03',
    title: 'Cryolipolysis',
    desc: 'Uses precisely controlled cooling to freeze and destroy fat cells without harming surrounding tissue. The body naturally eliminates treated cells over the following weeks, reducing fat volume in targeted areas.',
  },
  {
    eyebrow: '04',
    title: 'HIFU',
    desc: 'High-Intensity Focused Ultrasound penetrates deep tissue layers to disrupt fat cells and stimulate neocollagenesis. Particularly effective for tightening skin and contouring areas with deeper fat deposits.',
  },
  {
    eyebrow: '05',
    title: 'Cavitation',
    desc: 'Ultrasonic cavitation uses low-frequency sound waves to create microscopic bubbles that rupture fat cell membranes. A comfortable, non-invasive option for reducing localised fat on the abdomen, flanks, and thighs.',
  },
  {
    eyebrow: '06',
    title: 'Liposuction',
    desc: 'For patients seeking more significant fat reduction, surgical liposuction offers precise, comprehensive removal of larger fat volumes. Our team can advise when surgical intervention is the most appropriate choice.',
  },
  {
    eyebrow: '07',
    title: 'IV Drip Therapy',
    desc: 'Bespoke intravenous nutrient infusions to support recovery, boost metabolism, and promote skin health following body contouring treatments. An excellent complement to any body sculpting programme.',
  },
];

const BODY_AREAS = [
  'Abdomen',
  'Flanks / Love handles',
  'Thighs',
  'Arms',
  'Back',
  'Chin / Neck / Jawline',
];

const CONCERNS_ADDRESSED = [
  'Stubborn fat',
  'Skin laxity',
  'Poor definition',
  'Post-pregnancy changes',
  'Body asymmetry',
  'Cellulite',
];

const CLINIC_REASONS = [
  { n: '01', text: 'All-in-one clinic with medical & aesthetic services.' },
  { n: '02', text: 'Highly trained, compassionate doctors.' },
  { n: '03', text: 'Customised treatments based on listening & expertise.' },
  { n: '04', text: 'State-of-the-art facilities & modern equipment.' },
  { n: '05', text: 'Strong reputation & excellent reviews.' },
  { n: '06', text: 'Comprehensive care and referrals with specialists.' },
];

const FAQS = [
  {
    question: 'Am I suitable for body contouring treatment?',
    answer:
      'Body contouring is ideal for adults at or near their target weight who have stubborn localised fat deposits or mild to moderate skin laxity. It is not a weight-loss treatment. A consultation with our experts will assess your goals and confirm which technologies are right for you.',
  },
  {
    question: 'How many sessions will I need?',
    answer:
      'Most patients require 4 to 8 sessions spaced 2 to 3 weeks apart, depending on the size of the treatment area and the amount of fat to be reduced. Your personalised plan will be discussed during your initial consultation, with initial visible improvements appearing within 2 to 4 weeks.',
  },
  {
    question: 'Is non-surgical body contouring safe?',
    answer:
      'Yes. Our clinically proven technologies are FDA-approved and used by leading aesthetic clinics worldwide. Side effects are minimal and temporary, typically limited to mild redness or slight warmth that resolves within hours. Serious complications are extremely rare when performed by certified practitioners.',
  },
  {
    question: 'Will there be any downtime after treatment?',
    answer:
      'No. You can return to work, exercise, and all normal activities immediately after each session. Some patients experience mild redness or warmth in the treated area, which typically subsides within hours. This is one of the key advantages of non-surgical body contouring.',
  },
  {
    question: 'How long do body contouring results last?',
    answer:
      'Results are long-lasting when you maintain a stable weight and healthy lifestyle. Treated fat cells are permanently eliminated and do not regenerate. However, remaining fat cells can enlarge with significant weight gain. With proper maintenance, your sculpted results can be preserved indefinitely.',
  },
  {
    question: 'Can body contouring replace liposuction or surgery?',
    answer:
      'For patients seeking subtle to moderate body refinement, non-surgical body contouring delivers excellent results without surgical risks or recovery time. Those with significant loose skin or very large fat volumes may benefit from a surgical consultation. We discuss what is realistic for your goals during your initial assessment.',
  },
];

const RELATED = [
  { title: 'Endolift Laser',    href: '/treatments/endolift',              desc: 'Minimally invasive laser lifting and fat reduction for face and body.' },
  { title: 'Liposuction',       href: '/treatments/liposuction-leicester', desc: 'Surgical fat removal for comprehensive body sculpting and significant volume reduction.' },
  { title: 'Weight Management', href: '/treatments/weight-management',     desc: 'Medically supervised programmes to support healthy, sustainable weight loss.' },
  { title: 'IV Drip Therapy',   href: '/treatments/iv-drip-therapy',      desc: 'Bespoke intravenous nutrient infusions to support recovery and overall wellness.' },
];

/* ── Page component ───────────────────────────────────────────── */
export default function BodyContouringPage() {
  const [showAllFaqs, setShowAllFaqs] = useState(false);

  return (
    <>
      {/* ════════════════════════════════════════
          1. HERO
      ════════════════════════════════════════ */}
      <section
        className={styles.hero}
        aria-label="Body Contouring Leicester, hero"
        data-section-theme="dark"
      >
        {/* Breadcrumb, pinned to top of hero */}
        <div className={styles.heroBreadcrumb}>
          <Container>
            <Breadcrumb
              theme="dark"
              items={[
                { label: 'Treatments', href: '/treatments' },
                { label: 'Body Contouring' },
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
            {/* Left: text */}
            <div className={styles.heroLeft}>
              <motion.span className={styles.heroCategory} variants={fadeUp}>
                Medical Aesthetics
              </motion.span>

              <motion.h1 className={styles.heroTitle} variants={fadeUp}>
                Body Contouring Leicester
              </motion.h1>

              <motion.p className={styles.heroDesc} variants={fadeUp}>
                Sculpt, shape, and redefine your body without surgery using our
                advanced non-surgical fat reduction and skin tightening technologies.
              </motion.p>

              <motion.div className={styles.heroCtas} variants={fadeUp}>
                <BookConsultationButton className={styles.heroCtaPrimary}>
                  Book Appointment
                </BookConsultationButton>
              </motion.div>

              {/* Review badges */}
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

            {/* Right: image */}
            <motion.div className={styles.heroImageWrap} variants={fadeUp}>
              <Image
                src="/images/Liposuction1.png"
                alt="Body contouring treatment at The One Clinic Leicester"
                fill
                priority
                className={styles.heroImage}
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              {/* Subtle bottom-fade to blend with section */}
              <div className={styles.heroImageFade} aria-hidden="true" />
            </motion.div>
          </motion.div>
        </Container>
      </section>

      {/* ════════════════════════════════════════
          2. WHAT IS BODY CONTOURING?
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
            {/* Left: text */}
            <motion.div className={styles.whatIsContent} variants={stagger(0.12)}>
              <motion.div className={styles.whatIsTextGroup} variants={fadeUp}>
                <p className={styles.eyebrowDark}>About This Treatment</p>
                <h2 className={styles.combinedHeading}>What is Body Contouring?</h2>
                <p className={styles.combinedDesc}>
                  Body contouring refers to a range of non-surgical treatments that reshape the
                  body by reducing stubborn fat, tightening skin, and improving definition without
                  invasive procedures. Using advanced energy-based technologies, we precisely target
                  localised fat deposits and stimulate collagen production, delivering visible
                  sculpting results across the abdomen, flanks, thighs, arms, and more.
                </p>
              </motion.div>
              <motion.div className={styles.combinedCtaWrapper} variants={fadeUp}>
                <BookConsultationButton className={styles.combinedCta}>
                  Book Your Consultation
                </BookConsultationButton>
              </motion.div>
            </motion.div>

            {/* Right: image */}
            <motion.div className={styles.whatIsVideoWrap} variants={fadeUp}>
              <Image
                src="/images/Doctor1.jpg"
                alt="Body contouring treatment in progress at The One Clinic"
                fill
                className={styles.whatIsVideoFrame}
                sizes="(max-width: 768px) 100vw, 50vw"
                style={{ objectFit: 'cover', borderRadius: '12px' }}
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
              Body Contouring at a Glance
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
          4. OUR APPROACH
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
              Our Approach
            </motion.p>
            <motion.h2 className={styles.headingLight} variants={fadeUp}>
              Our Body Contouring Approach
            </motion.h2>
            <motion.p className={styles.combinationIntroText} variants={fadeUp}>
              At The One Clinic, our body contouring programme follows a structured three-step
              approach , combining expert assessment, personalised planning, and progressive
              treatment for optimal sculpting results without surgery.
            </motion.p>
          </motion.div>

          <motion.div
            className={styles.techCardsGrid}
            variants={stagger(0.1)}
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
          >
            {APPROACH_CARDS.map((card) => (
              <motion.div
                key={card.title}
                className={styles.techCard}
                variants={fadeUp}
                whileHover={{ y: -8, transition: { type: 'spring', stiffness: 280, damping: 18 } }}
              >
                <span className={styles.techCardEyebrow}>{card.eyebrow}</span>
                <h3 className={styles.techCardTitle}>{card.title}</h3>
                <p className={styles.techCardDesc}>{card.desc}</p>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            className={styles.finalResultsBanner}
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
          >
            <p className={styles.finalResultsEyebrow}>Combined Results</p>
            <p className={styles.finalResultsText}>
              When body analysis, personalised planning, and a progressive treatment programme
              are combined, patients achieve comprehensive fat reduction, improved skin firmness,
              and lasting body definition , all without surgery or significant downtime.
            </p>
          </motion.div>
        </Container>
      </Section>

      {/* ════════════════════════════════════════
          5. TREATMENT JOURNEY
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
            <motion.p className={styles.eyebrowDark} variants={fadeUp}>
              What to Expect
            </motion.p>
            <motion.h2 className={styles.headingDark} variants={fadeUp}>
              Your Body Contouring Journey
            </motion.h2>
          </motion.div>

          <motion.ol
            className={styles.journeyList}
            variants={stagger(0.12)}
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
            aria-label="Body contouring treatment journey steps"
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
          6. BENEFITS
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
            <motion.h2 className={styles.headingDark} variants={fadeUp}>
              Body Contouring Benefits
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
                <span className={styles.treatedBenefitIconWrap} aria-hidden="true">
                  {b.icon}
                </span>
                <h3 className={styles.treatedBenefitTitle}>{b.title}</h3>
                <p className={styles.treatedBenefitDesc}>{b.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </Container>
      </Section>

      {/* ════════════════════════════════════════
          7. ELIGIBILITY
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
              Is This Right for You?
            </motion.p>
            <motion.h2 className={styles.headingLight} variants={fadeUp}>
              Who is Suitable for Body Contouring?
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
              Body contouring is suitable if you are:
            </motion.p>
            <motion.ul className={styles.eligibilityList} role="list" variants={stagger(0.1)}>
              {ELIGIBILITY_SUITABLE.map((item) => (
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

            <motion.p className={styles.eligibilityIntro} variants={fadeUp} style={{ marginTop: '2rem' }}>
              Treatment is not recommended if you are:
            </motion.p>
            <motion.ul className={styles.eligibilityList} role="list" variants={stagger(0.1)}>
              {ELIGIBILITY_NOT_SUITABLE.map((item) => (
                <motion.li key={item} className={styles.eligibilityItem} variants={fadeUp}>
                  <span className={styles.eligibilityCheck} aria-hidden="true">
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <line x1="3" y1="3" x2="11" y2="11" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round"/>
                      <line x1="11" y1="3" x2="3" y2="11" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round"/>
                    </svg>
                  </span>
                  <span>{item}</span>
                </motion.li>
              ))}
            </motion.ul>

            <motion.p className={styles.eligibilityClosing} variants={fadeUp}>
              Not sure if you are suitable? Book a consultation and our doctors will assess
              your suitability and recommend the most effective treatment approach for your goals.
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
          8. HOW IT WORKS (THE SCIENCE)
      ════════════════════════════════════════ */}
      <Section variant="light" data-section-theme="light" className={styles.howSection}>
        <Container>
          <motion.div
            className={styles.sectionHeaderCentre}
            variants={stagger(0.1)}
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
          >
            <motion.h2 className={styles.headingDark} variants={fadeUp}>
              The Science Behind Body Contouring
            </motion.h2>
          </motion.div>

          <motion.div
            className={styles.howTextGrid}
            variants={stagger(0.1)}
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
          >
            <motion.p className={styles.howPara} variants={fadeUp}>
              Non-surgical body contouring technologies work by delivering targeted energy , whether
              cold, heat, or sound waves , to disrupt fat cell membranes in precise, localised areas.
              Cryolipolysis crystallises fat cells using controlled cooling, while radiofrequency and
              HIFU use thermal energy to heat and destroy adipocytes beneath the skin surface, all
              without affecting surrounding tissue.
            </motion.p>
            <motion.p className={styles.howPara} variants={fadeUp}>
              Once disrupted, fat cells undergo a natural process called apoptosis and are gradually
              eliminated by the body&apos;s lymphatic system over 6 to 12 weeks. Simultaneously, the
              thermal stimulus triggers fibroblast activation, stimulating new collagen and elastin
              production. This dual action reduces fat volume while progressively tightening and
              firming the overlying skin for truly sculpted, defined results.
            </motion.p>
          </motion.div>

          <motion.div
            className={styles.howCoversWrap}
            variants={stagger(0.08)}
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
          >
            <motion.p className={styles.howCoversLabel} variants={fadeUp}>Body Contouring Addresses</motion.p>
            <motion.ul className={styles.howCoversList} role="list" variants={stagger(0.08)}>
              {[
                'Stubborn abdominal fat',
                'Love handles & flanks',
                'Inner & outer thighs',
                'Upper arms',
                'Back & bra-line fat',
                'Double chin & neck',
              ].map((item) => (
                <motion.li key={item} className={styles.howCoversItem} variants={fadeUp}>
                  <span className={styles.howCoversCheck} aria-hidden="true">
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                      <polyline points="2,6 5,9 10,3" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </span>
                  {item}
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>
        </Container>
      </Section>

      {/* ════════════════════════════════════════
          9. RESULTS & AFTERCARE
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
              Post-Treatment
            </motion.p>
            <motion.h2 className={styles.headingLight} variants={fadeUp}>
              What to Expect After Body Contouring
            </motion.h2>
          </motion.div>

          <motion.div
            className={styles.resultsAfterGrid}
            variants={stagger(0.1)}
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
          >
            {/* Card 1 , Results Timeline */}
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
                Most patients notice visible improvements within 2 to 4 weeks as fat cells begin
                to be eliminated. Definition continues to improve progressively over 6 to 12 weeks,
                with final results typically visible at 3 to 6 months as collagen remodelling
                completes.
              </p>
              <div className={styles.resultsAfterCardSpacer} />
              <p className={styles.resultsAfterCardNote}>
                Staying well hydrated and maintaining a healthy diet supports the body&apos;s natural
                elimination of treated fat cells and helps optimise your contouring results.
              </p>
            </motion.div>

            {/* Card 2 , Side Effects */}
            <motion.div className={styles.resultsAfterCard} variants={fadeUp}>
              <div className={styles.resultsAfterCardHead}>
                <span className={styles.resultsAfterCardIcon} aria-hidden="true">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10"/>
                    <line x1="12" y1="8" x2="12" y2="12"/>
                    <line x1="12" y1="16" x2="12.01" y2="16"/>
                  </svg>
                </span>
                <h3 className={styles.resultsAfterCardTitle}>Possible Side Effects</h3>
              </div>
              <p className={styles.resultsAfterCardBody}>
                Non-surgical body contouring is generally very well tolerated. Most patients
                experience only mild, temporary effects:
              </p>
              <ul className={styles.resultsAfterCardList} role="list">
                {[
                  'Mild redness or warmth in the treated area',
                  'Slight swelling or tenderness',
                  'Temporary numbness or tingling',
                ].map((item) => (
                  <li key={item} className={styles.resultsAfterCardListItem}>
                    <span className={styles.resultsAfterDot} aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
              <div className={styles.resultsAfterCardSpacer} />
              <p className={styles.resultsAfterCardNote}>
                These effects usually resolve within a few hours to days. Serious complications
                are extremely rare when treatment is performed by a qualified practitioner.
              </p>
            </motion.div>

            {/* Card 3 , Aftercare */}
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
                  'Stay well hydrated to support lymphatic elimination of fat cells',
                  'Maintain a balanced diet to preserve and enhance your results',
                  'Engage in regular physical activity to complement your body contouring',
                  'Follow any specific post-treatment advice provided by your doctor',
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
          10. TREATMENTS WE USE
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
            <motion.p className={styles.eyebrowDark} variants={fadeUp}>
              Technologies &amp; Treatments
            </motion.p>
            <motion.h2 className={styles.headingDark} variants={fadeUp}>
              Treatments We Use for Body Contouring
            </motion.h2>
            <motion.p className={styles.beforeAfterSubheading} variants={fadeUp}>
              We combine proven technologies to deliver the most effective body sculpting
              programme for your individual needs and goals.
            </motion.p>
          </motion.div>

          <motion.div
            className={styles.techCardsGrid}
            variants={stagger(0.08)}
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
            style={{ '--tech-cols': '3' } as React.CSSProperties}
          >
            {TREATMENTS_WE_USE.map((t) => (
              <motion.div
                key={t.title}
                className={styles.techCard}
                variants={fadeUp}
                whileHover={{ y: -8, transition: { type: 'spring', stiffness: 280, damping: 18 } }}
              >
                <span className={styles.techCardEyebrow}>{t.eyebrow}</span>
                <h3 className={styles.techCardTitle}>{t.title}</h3>
                <p className={styles.techCardDesc}>{t.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </Container>
      </Section>

      {/* ════════════════════════════════════════
          11. TESTIMONIALS
      ════════════════════════════════════════ */}
      <Testimonials />

      {/* ════════════════════════════════════════
          12. CTA BANNER
      ════════════════════════════════════════ */}
      <section className={styles.ctaBanner} data-section-theme="dark" aria-label="Book body contouring consultation">
        {/* Watermark logo */}
        <div className={styles.ctaBannerLogoWrap} aria-hidden="true">
          <Image
            src="/images/Background-logo.png"
            alt=""
            fill
            className={styles.ctaBannerLogo}
            sizes="100vw"
          />
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
              Reshape Your Body.<br />Rebuild Your Confidence.
            </motion.h2>
            <motion.p className={styles.ctaBannerSub} variants={fadeUp}>
              Let our experts create your personalised body contouring plan!
            </motion.p>
            <motion.div variants={fadeUp}>
              <BookConsultationButton className={styles.ctaBannerBtn}>
                Book Consultation
              </BookConsultationButton>
            </motion.div>
          </motion.div>
        </Container>
      </section>

      {/* ════════════════════════════════════════
          13. BODY AREAS WE TREAT
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
            <motion.p className={styles.eyebrowLight} variants={fadeUp}>
              Treatment Zones
            </motion.p>
            <motion.h2 className={styles.headingLight} variants={fadeUp}>
              Body Areas We Treat
            </motion.h2>
            <motion.p className={styles.conditionsIntro} variants={fadeUp}>
              Our body contouring treatments can address stubborn fat, skin laxity, and poor
              definition across a wide range of body areas and aesthetic concerns.
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
              <p className={styles.areasGroupLabel}>Body Areas</p>
              <ul className={styles.areasGroupList} role="list">
                {BODY_AREAS.map((area) => (
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
              <p className={styles.areasGroupLabel}>Concerns Addressed</p>
              <ul className={styles.areasGroupList} role="list">
                {CONCERNS_ADDRESSED.map((concern) => (
                  <li key={concern} className={styles.areasGroupItem}>
                    <span className={styles.areasItemDot} aria-hidden="true" />
                    {concern}
                  </li>
                ))}
              </ul>
            </motion.div>
          </motion.div>
        </Container>
      </Section>

      {/* ════════════════════════════════════════
          14. BEST LEICESTER EXPERIENCE
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
              <p className={styles.eyebrowDark}>Body Contouring Treatment</p>
              <h2 className={styles.combinedHeading}>
                Best Body Contouring<br />Leicester Experience
              </h2>
            </motion.div>
            <motion.p className={styles.clinicIntroDesc} variants={fadeUp}>
              Experience the best body contouring in Leicester at our clinic. Our expert doctors
              deliver safe, non-surgical fat reduction and skin tightening treatments for the
              abdomen, flanks, thighs, arms, and more. Enjoy natural, lasting results with
              minimal downtime and personalised care tailored specifically to your body and goals.
            </motion.p>
          </motion.div>
        </Container>
      </Section>

      {/* ════════════════════════════════════════
          15. COST BANNER
      ════════════════════════════════════════ */}
      <section className={styles.costBanner} data-section-theme="dark" aria-label="Body contouring cost">
        <Container>
          <motion.div
            className={styles.costBannerInner}
            variants={stagger(0.12)}
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
          >
            <motion.p className={styles.costBannerEyebrow} variants={fadeUp}>
              Body Contouring Cost at The One Clinic
            </motion.p>
            <motion.p className={styles.costBannerPrice} variants={fadeUp}>
              Body Contouring Cost Starts From £150
            </motion.p>
            <motion.p className={styles.costBannerNote} variants={fadeUp}>
              The final price depends on your personalised treatment plan, the technologies used,
              and the number of sessions required. Exact pricing will be discussed during your
              consultation with our expert team.
            </motion.p>
            <motion.div variants={fadeUp}>
              <BookConsultationButton className={styles.ctaBannerBtn}>
                Book A Consultation
              </BookConsultationButton>
            </motion.div>
          </motion.div>
        </Container>
      </section>

      {/* ════════════════════════════════════════
          16. WHY CHOOSE THE ONE CLINIC
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
              Why Choose The One Clinic For Body Contouring
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
          17. MEET THE EXPERTS
      ════════════════════════════════════════ */}
      <MeetTheExperts />

      {/* ════════════════════════════════════════
          18. FAQ
      ════════════════════════════════════════ */}
      <section className={styles.faqSection} data-section-theme="dark">
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
          19. BOOKING FORM
      ════════════════════════════════════════ */}
      <LeadForm />

      {/* ════════════════════════════════════════
          20. RELATED TREATMENTS
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
            <motion.p className={styles.eyebrowDark} variants={fadeUp}>
              Explore More
            </motion.p>
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
          FINAL CTA
      ════════════════════════════════════════ */}
      <FinalCTA />
    </>
  );
}
