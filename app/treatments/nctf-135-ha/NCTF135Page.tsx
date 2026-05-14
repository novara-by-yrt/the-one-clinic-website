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
    label: 'Treatment Duration',
    value: '30 to 45 minutes',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="12" cy="12" r="10"/>
        <polyline points="12 6 12 12 16 14"/>
      </svg>
    ),
  },
  {
    label: 'Sessions Recommended',
    value: '2 to 3 sessions',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <polyline points="1 4 1 10 7 10"/>
        <path d="M3.51 15a9 9 0 1 0 .49-3.1"/>
      </svg>
    ),
  },
  {
    label: 'First Visible Results',
    value: '1 to 2 weeks',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/>
        <polyline points="17 6 23 6 23 12"/>
      </svg>
    ),
  },
  {
    label: 'Full Results Timeline',
    value: '6 to 8 weeks',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"/>
        <path d="M9 12l2 2 4-4"/>
      </svg>
    ),
  },
  {
    label: 'Downtime Required',
    value: '1 to 2 days',
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
    label: 'Treatment Investment',
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
    title: 'Comprehensive Skin Assessment and Consultation',
    desc: 'Your journey begins with a detailed consultation where we assess your skin quality, texture, tone, elasticity, and specific concerns including dark circles, tired appearance, or general skin fatigue. We evaluate your skin\'s structure and hydration levels, discussing how NCTF 135HA can address your individual needs and goals.',
  },
  {
    n: '02',
    title: 'Pre-Treatment Preparation and Application',
    desc: 'The treatment area is thoroughly cleansed and prepared. A topical numbing cream is applied to ensure complete comfort during injection. The NCTF 135HA formula is carefully prepared, and treatment zones are mapped for optimal distribution and natural, uniform results.',
  },
  {
    n: '03',
    title: 'Precise Micro-Injection of Skin Boosting Formula',
    desc: 'Using advanced micro-injection techniques, NCTF 135HA is precisely delivered into the mid-dermis layer. The treatment stimulates fibroblasts and collagen production while improving skin hydration and tone. The procedure takes 30 to 45 minutes with minimal discomfort, leaving you fully conscious and able to return to activities immediately.',
  },
  {
    n: '04',
    title: 'Progressive Results and Collagen Remodelling',
    desc: 'Initial results appear within 1 to 2 weeks as the skin\'s natural repair mechanisms are activated. Progressive improvement continues over 6 to 8 weeks as collagen production increases, elasticity improves, and skin texture becomes noticeably refined. Results develop gradually, creating natural-looking, authentic skin rejuvenation.',
  },
];

const BENEFITS = [
  {
    title: 'Advanced Skin Quality Improvement and Rejuvenation',
    desc: 'NCTF 135HA dramatically improves skin quality at the cellular level. It thickens the dermis, enhances elasticity, improves hydration, and refines texture—delivering comprehensive skin rejuvenation that addresses multiple ageing signs simultaneously.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
      </svg>
    ),
  },
  {
    title: 'Visibly Eliminates Dark Circles and Under-Eye Darkness',
    desc: 'NCTF 135HA contains active depigmenting ingredients that specifically target melanin and reduce darkness. Combined with improved skin thickness and hydration, dark circles are dramatically reduced or eliminated, revealing a brighter, more awake appearance.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="12" cy="12" r="10"/>
        <polyline points="12 6 12 12 16 14"/>
      </svg>
    ),
  },
  {
    title: 'Stimulates Robust Collagen and Elastin Production',
    desc: 'The formula activates fibroblasts, triggering collagen and elastin production that continues for weeks and months after treatment. This biorevitalisation creates structural improvement in skin firmness, elasticity, and resilience that compounds over time.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
      </svg>
    ),
  },
  {
    title: 'Profound Hydration and Skin Barrier Strengthening',
    desc: 'NCTF 135HA contains hyaluronic acid and minerals that provide deep hydration, improving skin plumpness and radiance. This enhanced hydration strengthens the skin barrier, protecting against environmental damage and maintaining results long-term.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"/>
        <path d="M4.5 20.118a7.5 7.5 0 0115 0"/>
      </svg>
    ),
  },
  {
    title: 'Minimal Downtime with Immediate Results Onset',
    desc: 'Unlike laser treatments requiring significant recovery, NCTF 135HA requires only 1 to 2 days downtime. You can return to work and normal activities immediately. Results begin appearing within days, making it perfect for busy professionals.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/>
        <polyline points="17 6 23 6 23 12"/>
      </svg>
    ),
  },
  {
    title: 'Cost-Effective Alternative to Laser with Equivalent Results',
    desc: 'NCTF 135HA delivers laser-like skin quality improvements at a fraction of laser treatment costs. A complete course costs significantly less while delivering comparable results without high costs or extended recovery periods.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <line x1="12" y1="1" x2="12" y2="23"/>
        <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
      </svg>
    ),
  },
];

const ELIGIBILITY = [
  'Adults concerned about dark circles, tired appearance, or overall skin quality decline',
  'Those seeking collagen stimulation and skin thickening without invasive procedures',
  'Individuals in good general health with realistic expectations about gradual improvement',
  'Anyone avoiding expensive laser treatments but wanting laser-equivalent results',
  'Those not pregnant, not breastfeeding, and free from contraindications to the treatment',
];

const SKIN_CONCERNS = [
  'Dark circles and under-eye hyperpigmentation creating tired appearance',
  'Dull, tired-looking skin lacking radiance and luminosity',
  'Loss of skin elasticity and firmness affecting overall appearance',
  'Superficial wrinkles and fine lines related to poor skin quality',
  'Uneven skin texture and compromised skin barrier',
];

const RESULTS_AND_AFTERCARE = [
  'Mild redness and minimal swelling normal immediately post-treatment, typically resolving within 24 hours',
  'Initial results visible within 1 to 2 weeks as skin quality begins visibly improving',
  'Continued improvement over 6 to 8 weeks as collagen production increases progressively',
  'Optimal results evident at 8 weeks, with benefits continuing for 3 to 6 months',
  'Avoid heavy exercise and excessive sweating for 24 to 48 hours post-treatment',
  'Avoid direct sun exposure and apply broad-spectrum SPF 30+ daily during recovery period',
  'Continue normal skincare routine; avoid harsh products for the first 48 hours',
  'Maintenance treatments every 6 to 12 months recommended to maintain results indefinitely',
];

const CLINIC_REASONS = [
  'Expert clinicians with advanced training in NCTF 135HA administration and skin biorevitalisation',
  'Genuine pharmaceutical-grade NCTF 135HA formula ensuring authenticity and efficacy',
  'Precise micro-injection technique delivering optimal results with natural appearance',
  'Comprehensive pre-treatment skin assessment customising treatment to individual needs',
  'Detailed aftercare guidance and follow-up support optimising results and satisfaction',
  'Commitment to natural-looking rejuvenation enhancing beauty without obvious change',
];

const FAQ = [
  {
    q: 'What exactly is NCTF 135HA and how does it work?',
    a: 'NCTF 135HA is a pharmaceutical-grade skin biorevitalisation formula containing amino acids, vitamins, minerals, hyaluronic acid, and coenzymes. When injected into the mid-dermis, it stimulates fibroblasts to produce collagen and elastin, improves skin hydration and oxygenation, and contains depigmenting agents that reduce dark circles. It works with your body\'s natural repair mechanisms to improve skin quality at the cellular level.',
  },
  {
    q: 'How many NCTF 135HA treatment sessions will I need?',
    a: 'A course of 2 to 3 sessions spaced 2 to 4 weeks apart is typically recommended for optimal results. Many patients see excellent improvement after a single session, but multiple sessions create more dramatic, longer-lasting results. Your clinician will recommend the ideal protocol based on your skin concerns and goals.',
  },
  {
    q: 'Is NCTF 135HA treatment painful or uncomfortable?',
    a: 'No, the procedure is very comfortable. A topical numbing cream is applied beforehand, completely numbing the treatment area. Most patients experience only minimal sensation during the 30 to 45-minute injection procedure. Post-treatment discomfort is minimal, with mild redness and swelling typically resolving within 24 hours.',
  },
  {
    q: 'When will I see results and how long do they last?',
    a: 'Initial results appear within 1 to 2 weeks as the treatment takes effect. Continued improvement develops over 6 to 8 weeks as collagen production increases. Results typically last 3 to 6 months, with maintenance treatments every 6 to 12 months extending benefits indefinitely. Some patients enjoy 12+ months of results.',
  },
  {
    q: 'How does NCTF 135HA specifically eliminate dark circles?',
    a: 'NCTF 135HA eliminates dark circles through multiple mechanisms: the formula contains depigmenting agents that reduce melanin and darkness; improved skin thickness masks vascular visibility; enhanced hydration plumps tissues, reducing hollow appearance; and improved blood flow and oxygenation brightens the area. The combination delivers dramatic dark circle reduction.',
  },
  {
    q: 'What is the difference between NCTF 135HA and other skin boosters?',
    a: 'NCTF 135HA is considered one of the most comprehensive biorevitalisation formulas available, containing 59 active ingredients including vitamins, minerals, amino acids, nucleic acids, and coenzymes. It offers superior collagen stimulation, depigmentation, and hydration compared to simpler formulas. It delivers more dramatic results than many competitor products.',
  },
  {
    q: 'Can I combine NCTF 135HA with other treatments?',
    a: 'Yes. Many patients combine NCTF 135HA with dermal fillers for tear-troughs, Profhilo for hydration enhancement, laser treatments for additional skin rejuvenation, or anti-wrinkle injections for expression lines. Treatments can be combined or staggered strategically. Our team discusses combination approaches during your consultation.',
  },
  {
    q: 'Is there any downtime or activity restrictions after NCTF 135HA?',
    a: 'Minimal downtime is required, with most patients returning to normal activities the next day. You should avoid heavy exercise and excessive sweating for 24 to 48 hours. Sun exposure should be minimised, and SPF 30+ applied daily. Light activities can resume immediately, making it perfect for busy lifestyles.',
  },
  {
    q: 'Do I need a doctor referral for NCTF 135HA treatment?',
    a: 'No referral is needed. You can book directly with us. A comprehensive pre-treatment consultation is conducted to assess your skin, discuss goals, and determine your suitability. If you have specific medical concerns, we can discuss those during your consultation, but no GP referral is required.',
  },
];

const RELATED_TREATMENTS = [
  {
    name: 'Profhilo',
    href: '/treatments/profhilo',
    desc: 'Bio-stimulating hydration treatment providing deep skin moisturisation and glow.',
  },
  {
    name: 'Polynucleotides',
    href: '/treatments/polynucleotides-leicester',
    desc: 'Advanced skin regeneration therapy stimulating collagen and improving skin texture.',
  },
  {
    name: 'Dermal Fillers',
    href: '/treatments/dermal-fillers',
    desc: 'Volume restoration for tear-troughs, cheekbones, and facial contouring.',
  },
  {
    name: 'Laser Skin Rejuvenation',
    href: '/treatments/laser-resurfacing',
    desc: 'Advanced laser treatment for comprehensive skin quality and texture improvement.',
  },
];

export default function NCTF135Page() {
  const [showAllFaqs, setShowAllFaqs] = useState(false);
  const displayedFaqs = showAllFaqs ? FAQ : FAQ.slice(0, 4);

  return (
    <>
      <script type="application/ld+json">
        {JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'MedicalBusiness',
          name: 'The One Clinic - NCTF 135HA',
          description: 'NCTF 135HA skin biorevitalisation treatment in Leicester',
          url: 'https://theoneclinic.co.uk/treatments/nctf-135-ha',
        })}
      </script>

      <Breadcrumb
        items={[
          { label: 'Home', href: '/' },
          { label: 'Treatments', href: '/treatments' },
          { label: 'NCTF 135HA', href: '/treatments/nctf-135-ha' },
        ]}
      />

      <Section variant="light" className={styles.heroSection}>
        <Container>
          <motion.div
            className={styles.heroContent}
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT}
            variants={stagger}
          >
            <motion.div variants={fadeUp}>
              <p className={styles.eyebrow}>NCTF 135HA Skin Biorevitalisation</p>
              <h1 className={styles.heading}>
                Comprehensive Skin Rejuvenation and Dark Circle Elimination
              </h1>
              <p className={styles.subheading}>
                Advanced biorevitalisation treatment that dramatically improves skin quality, eliminates dark circles, and restores youthful luminosity.
              </p>
              <BookConsultationButton />
            </motion.div>

            <motion.div variants={fadeUp} className={styles.heroImage}>
              <Image
                src="/images/treatments/nctf-135-ha-hero.jpg"
                alt="NCTF 135HA Treatment"
                width={500}
                height={400}
                priority
              />
            </motion.div>
          </motion.div>
        </Container>
      </Section>

      <Section variant="dark">
        <Container>
          <TrustBadges />
        </Container>
      </Section>

      <Section variant="light">
        <Container>
          <motion.div
            className={styles.whatIsSection}
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT}
            variants={stagger}
          >
            <motion.div variants={fadeUp} className={styles.whatIsContent}>
              <p className={styles.eyebrowDark}>What Is NCTF 135HA?</p>
              <h2 className={styles.headingDark}>Advanced Pharmaceutical Skin Biorevitalisation</h2>
              <p>
                NCTF 135HA is a comprehensive, pharmaceutical-grade skin biorevitalisation formula containing 59 active ingredients including amino acids, vitamins, minerals, nucleic acids, hyaluronic acid, and coenzymes. When injected into the mid-dermis, it stimulates your body\'s natural collagen and elastin production while providing profound hydration, depigmentation, and antioxidant protection.
              </p>
              <p>
                The treatment is particularly renowned for eliminating dark circles while simultaneously improving overall skin quality, texture, elasticity, and luminosity. With minimal downtime and results comparable to laser treatments but at significantly lower cost, NCTF 135HA has become the gold-standard skin biorevitalisation treatment worldwide.
              </p>
              <BookConsultationButton />
            </motion.div>
            <motion.div variants={fadeUp} className={styles.whatIsImage}>
              <Image
                src="/images/treatments/nctf-135-ha-detail.jpg"
                alt="NCTF 135HA Process"
                width={400}
                height={400}
              />
            </motion.div>
          </motion.div>
        </Container>
      </Section>

      <Section variant="dark">
        <Container>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT}
            variants={stagger}
          >
            <motion.div variants={fadeUp} className={styles.sectionHeader}>
              <p className={styles.eyebrow}>At a Glance</p>
              <h2 className={styles.heading}>NCTF 135HA in Numbers</h2>
            </motion.div>

            <motion.div
              className={styles.glanceGrid}
              variants={stagger}
            >
              {AT_A_GLANCE.map((item, i) => (
                <motion.div
                  key={i}
                  className={styles.glanceCard}
                  variants={fadeUp}
                  whileHover={{
                    scale: 1.02,
                    transition: { type: 'spring', stiffness: 400 },
                  }}
                >
                  <div className={styles.glanceIcon}>{item.icon}</div>
                  <p className={styles.glanceLabel}>{item.label}</p>
                  <p className={styles.glanceValue}>{item.value}</p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </Container>
      </Section>

      <Section variant="light">
        <Container>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT}
            variants={stagger}
          >
            <motion.div variants={fadeUp} className={styles.sectionHeader}>
              <p className={styles.eyebrowDark}>Your Treatment Journey</p>
              <h2 className={styles.headingDark}>From Assessment to Skin Transformation</h2>
            </motion.div>

            <motion.div
              className={styles.journeySection}
              variants={stagger}
            >
              {JOURNEY_STEPS.map((step) => (
                <motion.div
                  key={step.n}
                  className={styles.journeyStep}
                  variants={fadeUp}
                >
                  <div className={styles.journeyNumber}>{step.n}</div>
                  <div className={styles.journeyContent}>
                    <h3 className={styles.journeyTitle}>{step.title}</h3>
                    <p className={styles.journeyDesc}>{step.desc}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </Container>
      </Section>

      <Section variant="dark">
        <Container>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT}
            variants={stagger}
          >
            <motion.div variants={fadeUp} className={styles.sectionHeader}>
              <p className={styles.eyebrow}>Key Benefits</p>
              <h2 className={styles.heading}>Why Patients Choose NCTF 135HA</h2>
            </motion.div>

            <motion.div
              className={styles.benefitsGrid}
              variants={stagger}
            >
              {BENEFITS.map((benefit, i) => (
                <motion.div
                  key={i}
                  className={styles.benefitCard}
                  variants={fadeUp}
                  whileHover={{
                    scale: 1.02,
                    transition: { type: 'spring', stiffness: 400 },
                  }}
                >
                  <div className={styles.benefitIcon}>{benefit.icon}</div>
                  <h3 className={styles.benefitTitle}>{benefit.title}</h3>
                  <p className={styles.benefitDesc}>{benefit.desc}</p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </Container>
      </Section>

      <Section variant="light">
        <Container>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT}
            variants={stagger}
          >
            <motion.div variants={fadeUp} className={styles.sectionHeader}>
              <p className={styles.eyebrowDark}>Eligibility and Suitability</p>
              <h2 className={styles.headingDark}>Are You a Good Candidate?</h2>
            </motion.div>

            <motion.div variants={stagger} className={styles.textGrid}>
              {ELIGIBILITY.map((item, i) => (
                <motion.div key={i} variants={fadeUp} className={styles.textItem}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                  <p>{item}</p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </Container>
      </Section>

      <Section variant="light">
        <Container>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT}
            variants={stagger}
          >
            <motion.div variants={fadeUp} className={styles.sectionHeader}>
              <p className={styles.eyebrowDark}>Skin Concerns Addressed</p>
              <h2 className={styles.headingDark}>Conditions NCTF 135HA Treats</h2>
            </motion.div>

            <motion.div variants={stagger} className={styles.textGrid}>
              {SKIN_CONCERNS.map((concern, i) => (
                <motion.div key={i} variants={fadeUp} className={styles.textItem}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                    <path d="M12 5v14m7-7H5"/>
                  </svg>
                  <p>{concern}</p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </Container>
      </Section>

      <Section variant="light">
        <Container>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT}
            variants={stagger}
          >
            <motion.div variants={fadeUp} className={styles.sectionHeader}>
              <p className={styles.eyebrowDark}>Results and Aftercare</p>
              <h2 className={styles.headingDark}>What to Expect After Treatment</h2>
            </motion.div>

            <motion.div variants={stagger} className={styles.textGrid}>
              {RESULTS_AND_AFTERCARE.map((item, i) => (
                <motion.div key={i} variants={fadeUp} className={styles.textItem}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                    <circle cx="12" cy="12" r="9"/>
                  </svg>
                  <p>{item}</p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </Container>
      </Section>

      <Section variant="light">
        <Container>
          <Testimonials />
        </Container>
      </Section>

      <Section variant="dark" className={styles.ctaBannerSection}>
        <Container>
          <motion.div
            className={styles.ctaBanner}
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT}
            variants={stagger}
          >
            <motion.div variants={fadeUp} className={styles.ctaBannerContent}>
              <h2 className={styles.heading}>Transform Your Skin with NCTF 135HA</h2>
              <p className={styles.subheading}>
                Book your comprehensive skin consultation today to see how NCTF 135HA can restore your skin\'s youthful quality and luminosity.
              </p>
              <BookConsultationButton />
            </motion.div>
          </motion.div>
        </Container>
      </Section>

      <Section variant="light">
        <Container>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT}
            variants={stagger}
          >
            <motion.div variants={fadeUp} className={styles.sectionHeader}>
              <p className={styles.eyebrowDark}>Our Clinic</p>
              <h2 className={styles.headingDark}>Why The One Clinic for NCTF 135HA</h2>
            </motion.div>

            <div className={styles.clinicIntroSection}>
              <motion.div
                className={styles.clinicIntroLeft}
                initial="hidden"
                whileInView="visible"
                viewport={VIEWPORT}
                variants={stagger}
              >
                <motion.div variants={fadeUp}>
                  <p className={styles.eyebrowDark}>Skin Biorevitalisation Expertise</p>
                  <h3 className={styles.headingDark}>Specialising in Advanced Skin Rejuvenation</h3>
                </motion.div>

                <motion.div variants={stagger}>
                  {CLINIC_REASONS.map((reason, i) => (
                    <motion.div key={i} variants={fadeUp} className={styles.clinicReason}>
                      <span className={styles.reasonNumber}>
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <p>{reason}</p>
                    </motion.div>
                  ))}
                </motion.div>
              </motion.div>

              <motion.div
                className={styles.clinicIntroRight}
                variants={fadeUp}
              >
                <Image
                  src="/images/treatments/clinic-nctf-135-ha.jpg"
                  alt="The One Clinic NCTF 135HA Treatment Facility"
                  width={400}
                  height={500}
                  quality={90}
                />
              </motion.div>
            </div>
          </motion.div>
        </Container>
      </Section>

      <Section variant="dark" className={styles.costBannerSection}>
        <Container>
          <motion.div
            className={styles.costBanner}
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT}
            variants={stagger}
          >
            <motion.div variants={fadeUp} className={styles.costBannerContent}>
              <p className={styles.eyebrow}>Transparent Pricing</p>
              <h2 className={styles.heading}>NCTF 135HA Treatment Investment</h2>
              <p className={styles.costText}>
                NCTF 135HA treatment costs from £200 per session. Most patients benefit from a course of 2 to 3 sessions spaced 2 to 4 weeks apart for optimal results. We offer flexible payment plans and comprehensive package pricing for multi-session courses, providing exceptional value for laser-equivalent results at significantly lower cost.
              </p>
              <BookConsultationButton />
            </motion.div>
          </motion.div>
        </Container>
      </Section>

      <Section variant="light">
        <Container>
          <MeetTheExperts />
        </Container>
      </Section>

      <Section variant="dark">
        <Container>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT}
            variants={stagger}
          >
            <motion.div variants={fadeUp} className={styles.sectionHeaderCentre}>
              <p className={styles.eyebrow}>Common Questions</p>
              <h2 className={styles.heading}>NCTF 135HA FAQs</h2>
            </motion.div>

            <motion.div
              className={styles.faqList}
              variants={stagger}
            >
              {displayedFaqs.map((faq, i) => (
                <motion.div key={i} variants={fadeUp}>
                  <Accordion question={faq.q} answer={faq.a} />
                </motion.div>
              ))}
            </motion.div>

            {!showAllFaqs && FAQ.length > 4 && (
              <motion.div
                variants={fadeUp}
                className={styles.showMoreContainer}
              >
                <button
                  onClick={() => setShowAllFaqs(true)}
                  className={styles.showMoreButton}
                >
                  See All FAQs
                </button>
              </motion.div>
            )}
          </motion.div>
        </Container>
      </Section>

      <Section variant="light">
        <Container>
          <LeadForm />
        </Container>
      </Section>

      <Section variant="light">
        <Container>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT}
            variants={stagger}
          >
            <motion.div variants={fadeUp} className={styles.sectionHeader}>
              <p className={styles.eyebrowDark}>Related Treatments</p>
              <h2 className={styles.headingDark}>Complementary Skin Rejuvenation Solutions</h2>
            </motion.div>

            <motion.div
              className={styles.relatedGrid}
              variants={stagger}
            >
              {RELATED_TREATMENTS.map((treatment, i) => (
                <motion.div
                  key={i}
                  variants={fadeUp}
                  whileHover={{
                    scale: 1.02,
                    transition: { type: 'spring', stiffness: 400 },
                  }}
                >
                  <Link
                    href={treatment.href}
                    className={styles.relatedCard}
                  >
                    <h3>{treatment.name}</h3>
                    <p>{treatment.desc}</p>
                    <span className={styles.relatedArrow}>Learn More →</span>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </Container>
      </Section>

      <Section variant="light">
        <Container>
          <FinalCTA />
        </Container>
      </Section>
    </>
  );
}
