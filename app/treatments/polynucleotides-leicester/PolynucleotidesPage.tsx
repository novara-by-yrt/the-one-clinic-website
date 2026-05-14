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
    value: '3 to 4 sessions',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <polyline points="1 4 1 10 7 10"/>
        <path d="M3.51 15a9 9 0 1 0 .49-3.1"/>
      </svg>
    ),
  },
  {
    label: 'First Visible Results',
    value: '2 to 3 weeks',
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
    value: 'Minimal to none',
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
    value: 'From £180',
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
    title: 'Comprehensive Skin Assessment and Regenerative Consultation',
    desc: 'Your journey begins with a detailed skin consultation where we assess your skin quality, concerns, damage level, and regenerative needs. We discuss your goals for improvement and determine if polynucleotides are the right treatment choice. Our team explains how these bio-stimulating molecules trigger your body\'s natural healing response.',
  },
  {
    n: '02',
    title: 'Treatment Preparation and Topical Numbing',
    desc: 'The treatment area is thoroughly cleansed and prepared. A topical numbing cream is applied to ensure complete comfort during injection. The pharmaceutical-grade polynucleotide solution is prepared, and treatment zones are mapped for optimal distribution and collagen-stimulating effects across all target areas.',
  },
  {
    n: '03',
    title: 'Precise Micro-Injection of Bio-Stimulating Polynucleotides',
    desc: 'Using advanced micro-injection techniques, polynucleotides are precisely delivered into the dermis. PDRN molecules work with your cells\' natural healing mechanisms, triggering fibroblast activation and robust collagen production. The procedure takes 30 to 45 minutes with minimal discomfort, leaving you fully conscious and able to resume activities immediately.',
  },
  {
    n: '04',
    title: 'Progressive Cellular Regeneration and Collagen Remodelling',
    desc: 'Initial improvements appear within 2 to 3 weeks as cellular regeneration begins. Progressive enhancement continues over 6 to 8 weeks as collagen production deepens and tissue repair advances. Results develop gradually, creating naturally rejuvenated skin with improved hydration, firmness, and luminosity. Maintenance sessions every 3 to 6 months sustain results indefinitely.',
  },
];

const BENEFITS = [
  {
    title: 'Deep Cellular Regeneration and Bio-Stimulation',
    desc: 'Polynucleotides trigger your body\'s natural healing mechanisms at a cellular level. PDRN molecules signal fibroblasts to activate and produce collagen and elastin, delivering foundational skin regeneration that works with your body\'s own repair systems rather than masking symptoms.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
      </svg>
    ),
  },
  {
    title: 'Comprehensive Skin Quality Improvement',
    desc: 'Polynucleotides address multiple skin concerns simultaneously: they improve hydration and plumpness, enhance elasticity and firmness, reduce fine lines and wrinkles, improve texture and radiance, strengthen the skin barrier, and promote cellular turnover. The result is dramatically improved overall skin quality.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
        <circle cx="12" cy="12" r="3"/>
      </svg>
    ),
  },
  {
    title: 'Natural Results with Authentic Appearance',
    desc: 'Because polynucleotides work with your body\'s own collagen production, results look completely natural and authentic—never overdone or artificial. The gradual improvement over weeks and months ensures changes appear gradual and natural to others, enhancing beauty without obvious intervention.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="12" cy="12" r="10"/>
        <polyline points="12 6 12 12 16 14"/>
      </svg>
    ),
  },
  {
    title: 'Highly Biocompatible and Well-Tolerated',
    desc: 'Polynucleotides derived from fish sperm DNA are highly biocompatible and well-tolerated by all skin types. They integrate perfectly with your body\'s own biology, making allergic reactions and adverse effects extremely rare. This makes them an exceptionally safe choice for comprehensive skin rejuvenation.',
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
    title: 'Minimal Downtime with Immediate Resumption of Activities',
    desc: 'Unlike more invasive procedures, polynucleotide treatment requires minimal to no downtime. You can return to work, exercise, and normal activities immediately. Mild redness or swelling resolves within 24 hours. This makes it perfect for busy professionals seeking serious results without lifestyle disruption.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/>
        <polyline points="17 6 23 6 23 12"/>
      </svg>
    ),
  },
  {
    title: 'Versatile Treatment for Multiple Body Zones',
    desc: 'Polynucleotides can treat the face, neck, décolletage, hands, and delicate under-eye areas. This versatility allows comprehensive rejuvenation of multiple aging zones in a single treatment course, addressing skin quality decline across your entire visible body.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
      </svg>
    ),
  },
];

const ELIGIBILITY = [
  'Adults concerned about skin quality decline, texture, or early ageing signs',
  'Those seeking collagen stimulation and cellular regeneration without invasive surgery',
  'Individuals with delicate under-eye skin concerned about fine lines and darkness',
  'Anyone wanting to improve neck, décolletage, or hand skin quality',
  'Patients in good general health with realistic expectations about gradual improvement',
];

const SKIN_CONDITIONS = [
  'Loss of skin elasticity and firmness from ageing or sun damage',
  'Fine lines, wrinkles, and surface texture irregularities',
  'Dull, tired-looking skin lacking radiance and luminosity',
  'Thin, crepey skin texture on face, neck, or hands',
  'Under-eye hollowness and dark circles from poor skin quality',
];

const RESULTS_AND_AFTERCARE = [
  'Mild redness and minimal swelling normal immediately post-treatment, resolving within 24 hours',
  'Initial results visible within 2 to 3 weeks as cellular regeneration activates',
  'Progressive improvement over 6 to 8 weeks as collagen production deepens significantly',
  'Optimal results at 8 weeks, with continued enhancement possible for 3 to 6 months',
  'Avoid heavy exercise and excessive sweating for 24 hours post-treatment',
  'Avoid direct sun exposure and apply broad-spectrum SPF 30+ daily during healing',
  'Continue normal skincare; avoid harsh products for the first 48 hours',
  'Maintenance treatments every 3 to 6 months recommended to sustain results indefinitely',
];

const CLINIC_REASONS = [
  'Expert clinicians trained in advanced polynucleotide injection techniques and placement',
  'Pharmaceutical-grade polynucleotide solutions ensuring authenticity and maximum efficacy',
  'Precise micro-injection methodology delivering optimal collagen-stimulating results',
  'Comprehensive pre-treatment skin assessment customising protocols to individual concerns',
  'Detailed aftercare guidance and follow-up support optimising patient satisfaction',
  'Commitment to natural rejuvenation enhancing beauty with authentic appearance',
];

const FAQ = [
  {
    q: 'What are polynucleotides and how do they work?',
    a: 'Polynucleotides (PDRN—polydeoxyribonucleotide) are long-chain DNA molecules derived from salmon or trout sperm, purified to pharmaceutical grade. When injected into the skin, they act as biological signals that activate fibroblasts and trigger robust collagen and elastin production. This bio-stimulation works with your body\'s natural healing mechanisms, promoting cellular regeneration and tissue repair at the deepest level.',
  },
  {
    q: 'How many polynucleotide treatment sessions will I need?',
    a: 'A course of 3 to 4 sessions spaced 2 to 4 weeks apart is typically recommended for optimal results. This sequential approach builds collagen progressively, delivering dramatic transformation. Many patients then enjoy 3 to 6-month maintenance treatments to sustain results. Your clinician will customise the protocol based on your specific skin concerns and goals.',
  },
  {
    q: 'Is polynucleotide treatment painful or uncomfortable?',
    a: 'No, the procedure is very comfortable. A topical numbing cream is applied beforehand, completely numbing the treatment area. Most patients experience only minimal sensation during the 30 to 45-minute treatment. Post-treatment discomfort is minimal, with mild redness or swelling typically resolving within 24 hours.',
  },
  {
    q: 'When will I see results from polynucleotide treatment?',
    a: 'Initial results appear within 2 to 3 weeks as cellular regeneration begins. Continued improvement develops over 6 to 8 weeks as collagen production deepens progressively. Optimal results are evident at 8 weeks, with some continued enhancement possible for several months. Results typically last 3 to 6 months, making maintenance sessions every 3 to 6 months ideal.',
  },
  {
    q: 'What areas can be treated with polynucleotides?',
    a: 'Polynucleotides can be used on the face, neck, décolletage, hands, and delicate under-eye areas. They are particularly effective for treating poor skin quality, crepey texture, fine lines, and loss of elasticity on areas where conventional treatments have limited effectiveness. This versatility allows comprehensive rejuvenation of multiple body zones.',
  },
  {
    q: 'How do polynucleotides compare to other skin rejuvenation treatments?',
    a: 'Polynucleotides are superior for bio-stimulation compared to basic hydrating treatments, but different from laser procedures which use energy rather than cellular signalling. They work similarly to other regenerative treatments like Profhilo but with stronger collagen-stimulating properties. Many patients combine polynucleotides with other treatments for synergistic benefits.',
  },
  {
    q: 'Can I combine polynucleotide treatment with other procedures?',
    a: 'Absolutely. Many patients combine polynucleotides with Profhilo for enhanced hydration, dermal fillers for volume restoration, anti-wrinkle injections for expression lines, or laser treatments for additional skin refinement. Treatments can be staggered strategically for cumulative results. Our team discusses optimal combination approaches during your consultation.',
  },
  {
    q: 'Is there any downtime after polynucleotide treatment?',
    a: 'Minimal to no downtime is required. You can return to work and normal activities immediately. Mild redness or swelling typically resolves within 24 hours. Light exercise can resume after 24 hours. The only recommendation is avoiding heavy sweating for 24 hours and sun exposure for several days. It\'s perfect for busy lifestyles.',
  },
  {
    q: 'Do I need a doctor referral for polynucleotide treatment?',
    a: 'No referral is needed. You can book directly with us. A comprehensive pre-treatment consultation is conducted to assess your skin, discuss goals, and determine your suitability for treatment. If you have specific medical concerns, we can discuss those during your consultation, but no GP referral is required.',
  },
];

const RELATED_TREATMENTS = [
  {
    name: 'Profhilo',
    href: '/treatments/profhilo',
    desc: 'Bio-stimulating hydration injections providing deep hydration and skin plumping.',
  },
  {
    name: 'NCTF 135HA',
    href: '/treatments/nctf-135-ha',
    desc: 'Comprehensive skin biorevitalisation formula with 59 active ingredients.',
  },
  {
    name: 'Dermal Fillers',
    href: '/treatments/dermal-fillers',
    desc: 'Volume restoration and facial contouring with hyaluronic acid fillers.',
  },
  {
    name: 'Laser Skin Rejuvenation',
    href: '/treatments/laser-resurfacing',
    desc: 'Advanced laser technology for comprehensive skin quality improvement.',
  },
];

export default function PolynucleotidesPage() {
  const [showAllFaqs, setShowAllFaqs] = useState(false);
  const displayedFaqs = showAllFaqs ? FAQ : FAQ.slice(0, 4);

  return (
    <>
      <script type="application/ld+json">
        {JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'MedicalBusiness',
          name: 'The One Clinic - Polynucleotides',
          description: 'Polynucleotide regenerative medicine treatment in Leicester',
          url: 'https://theoneclinic.co.uk/treatments/polynucleotides-leicester',
        })}
      </script>

      <Breadcrumb
        items={[
          { label: 'Home', href: '/' },
          { label: 'Treatments', href: '/treatments' },
          { label: 'Polynucleotides', href: '/treatments/polynucleotides-leicester' },
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
              <p className={styles.eyebrow}>Polynucleotide Regenerative Medicine</p>
              <h1 className={styles.heading}>
                Advanced Cellular Regeneration and Skin Rejuvenation
              </h1>
              <p className={styles.subheading}>
                Bio-stimulating treatment that triggers your body\'s natural collagen production for authentic, comprehensive skin regeneration.
              </p>
              <BookConsultationButton />
            </motion.div>

            <motion.div variants={fadeUp} className={styles.heroImage}>
              <Image
                src="/images/treatments/polynucleotides-hero.jpg"
                alt="Polynucleotides Treatment"
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
              <p className={styles.eyebrowDark}>What Are Polynucleotides?</p>
              <h2 className={styles.headingDark}>Bio-Stimulating Regenerative Cellular Medicine</h2>
              <p>
                Polynucleotides are pharmaceutical-grade DNA molecules derived from salmon or trout sperm that, when injected into the skin, activate your body\'s natural healing and regeneration mechanisms. PDRN molecules signal fibroblasts to produce collagen and elastin, triggering deep cellular rejuvenation that works with rather than against your body\'s own biology.
              </p>
              <p>
                Unlike treatments that add volume or mask signs of ageing, polynucleotides address the root cause—declining collagen production—by stimulating your own cells to regenerate. Results develop gradually over weeks and months as collagen production deepens, creating authentic, natural-looking rejuvenation with improved skin quality, elasticity, hydration, and luminosity across all treated areas.
              </p>
              <BookConsultationButton />
            </motion.div>
            <motion.div variants={fadeUp} className={styles.whatIsImage}>
              <Image
                src="/images/treatments/polynucleotides-detail.jpg"
                alt="Polynucleotides Process"
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
              <h2 className={styles.heading}>Polynucleotide Treatment in Numbers</h2>
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
              <h2 className={styles.headingDark}>From Consultation to Cellular Regeneration</h2>
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
              <h2 className={styles.heading}>Why Patients Choose Polynucleotides</h2>
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
              <p className={styles.eyebrowDark}>Treatable Skin Conditions</p>
              <h2 className={styles.headingDark}>Skin Concerns Polynucleotides Address</h2>
            </motion.div>

            <motion.div variants={stagger} className={styles.textGrid}>
              {SKIN_CONDITIONS.map((condition, i) => (
                <motion.div key={i} variants={fadeUp} className={styles.textItem}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                    <path d="M12 5v14m7-7H5"/>
                  </svg>
                  <p>{condition}</p>
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
              <h2 className={styles.heading}>Trigger Your Skin\'s Natural Regeneration</h2>
              <p className={styles.subheading}>
                Book your comprehensive skin consultation today to discover how polynucleotides can transform your skin quality from within.
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
              <h2 className={styles.headingDark}>Why The One Clinic for Polynucleotide Treatment</h2>
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
                  <p className={styles.eyebrowDark}>Regenerative Medicine Expertise</p>
                  <h3 className={styles.headingDark}>Specialising in Bio-Stimulating Skin Rejuvenation</h3>
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
                  src="/images/treatments/clinic-polynucleotides.jpg"
                  alt="The One Clinic Polynucleotides Treatment Facility"
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
              <h2 className={styles.heading}>Polynucleotide Treatment Investment</h2>
              <p className={styles.costText}>
                Polynucleotide treatment costs from £180 per session. A course of 3 to 4 sessions spaced 2 to 4 weeks apart is typically recommended for optimal results. Maintenance treatments every 3 to 6 months extend benefits indefinitely. We offer flexible payment plans and comprehensive package pricing for complete courses at exceptional value.
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
              <h2 className={styles.heading}>Polynucleotide FAQs</h2>
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
              <h2 className={styles.headingDark}>Complementary Regenerative Solutions</h2>
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
