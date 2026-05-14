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
    label: 'First Visible Results',
    value: '2 to 4 weeks',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/>
        <polyline points="17 6 23 6 23 12"/>
      </svg>
    ),
  },
  {
    label: 'Full Results Timeline',
    value: '3 to 6 months',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"/>
        <path d="M9 12l2 2 4-4"/>
      </svg>
    ),
  },
  {
    label: 'Downtime Required',
    value: 'None to minimal',
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
    title: 'Comprehensive Body Consultation and Assessment',
    desc: 'Your treatment journey begins with an in-depth consultation where our clinical team assesses your body composition, identifies problem areas, and understands your specific contouring goals. We discuss realistic expectations, the number of sessions required, and create a personalised body sculpting roadmap tailored to your unique physiology and aesthetic objectives.',
  },
  {
    n: '02',
    title: 'Skin Preparation and Treatment Area Mapping',
    desc: 'Your treatment area is thoroughly cleansed and prepared. Cooling gel or protective barriers are applied depending on the technology being used. The exact zones to be treated are carefully mapped and marked, ensuring precision targeting of stubborn fat deposits. Protective eyewear is provided as needed, and all comfort measures are put in place.',
  },
  {
    n: '03',
    title: 'Advanced Non-Surgical Fat Reduction and Body Sculpting',
    desc: 'Our cutting-edge body contouring technologies work below the skin surface to precisely disrupt and reduce fat cells without incisions or anaesthesia. Energy-based treatments target localised fat deposits while simultaneously stimulating collagen production for skin tightening. The procedure is comfortable and typically takes 30 to 60 minutes, with most patients feeling only gentle warmth or mild sensations.',
  },
  {
    n: '04',
    title: 'Recovery, Aftercare and Progressive Results',
    desc: 'Recovery is straightforward with minimal disruption to your routine. Post-treatment, you can return to normal activities immediately, including exercise. Our team provides detailed aftercare instructions to optimise results. As your body naturally eliminates targeted fat cells and new collagen matures over the following weeks and months, you\'ll notice progressive body contouring improvements that continue for 3 to 6 months.',
  },
];

const BENEFITS = [
  {
    title: 'Non-Surgical Body Sculpting Without Downtime',
    desc: 'Achieve meaningful body contouring with zero incisions, no anaesthesia, and no recovery time. Unlike traditional liposuction, our advanced technologies safely reduce stubborn fat deposits while you remain fully conscious and able to return to your life immediately.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
      </svg>
    ),
  },
  {
    title: 'Precisely Targets Resistant Fat Deposits',
    desc: 'Addresses the frustrating fat that diet and exercise cannot eliminate. Whether stubborn belly fat, love handles, inner thigh fullness, or upper arm deposits, our technologies precisely reduce localised problem areas with clinical accuracy, giving you the sculpted physique you desire.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="12" cy="12" r="10"/>
        <polyline points="12 6 12 12 16 14"/>
      </svg>
    ),
  },
  {
    title: 'Stimulates Collagen Production and Skin Tightening',
    desc: 'Beyond fat reduction, our body contouring treatments stimulate deep collagen remodelling and skin renewal. This dual action delivers not just a slimmer silhouette but also improved skin firmness, texture, and definition, ensuring sculpted, beautifully contoured results rather than loose or sagging skin.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"/>
        <path d="M4.5 20.118a7.5 7.5 0 0115 0"/>
      </svg>
    ),
  },
  {
    title: 'Customised Treatment Plans for Your Body Goals',
    desc: 'Every body is different, and your treatment programme is tailored specifically to your physiology, aesthetic goals, and target areas. Our clinical team designs a personalised schedule of sessions spaced for optimal results, whether you need subtle refinement or comprehensive body sculpting.',
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
    title: 'Visible Results Within Weeks, Continuing for Months',
    desc: 'Most patients notice measurable improvements within 2 to 4 weeks, with enhanced definition becoming increasingly apparent as the body naturally processes treated fat cells. Full results develop progressively over 3 to 6 months as collagen remodelling continues, delivering lasting body transformation.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/>
        <polyline points="17 6 23 6 23 12"/>
      </svg>
    ),
  },
  {
    title: 'Safe, Effective, and Clinically Proven Technology',
    desc: 'Our body contouring systems are FDA-approved, clinically tested, and used by leading aesthetic clinics worldwide. With a strong safety record and predictable results, you can trust that your treatment delivers both the results you want and the safety you deserve.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
      </svg>
    ),
  },
];

const ELIGIBILITY = [
  'Adults in good general health with realistic aesthetic expectations and well-defined body contouring goals',
  'Individuals with BMI in a healthy range or stable weight with stubborn localised fat deposits',
  'Those looking for body refinement without surgery, incisions, scars, or significant downtime',
  'Not pregnant, not breastfeeding, and free from medical conditions that could affect treatment safety or results',
  'Committed to post-treatment care, including maintaining results through a healthy lifestyle and attending follow-up appointments',
];

const TREATABLE_CONCERNS = [
  'Stubborn abdominal fat and central belly fat resistant to diet and exercise',
  'Love handles and lateral flank fullness creating an undefined waistline',
  'Inner thigh fat and inner knee deposits affecting leg shape and clothing fit',
  'Outer thigh and hip fullness creating disproportionate lower body appearance',
  'Upper arm fat and back bra-line fullness limiting wardrobe choices and arm definition',
];

const TREATABLE_AREAS = [
  'Abdomen, flanks and entire core region including waist definition',
  'Hips, gluteal region and buttock contouring',
  'Thighs including inner, outer, anterior and posterior surfaces',
  'Upper arms, underarms and axillary regions',
  'Double chin, submental area and neck definition',
];

const CLINIC_REASONS = [
  'Expert clinical team with advanced certifications in body contouring and laser-assisted fat reduction technologies',
  'State-of-the-art energy-based systems including radiofrequency, ultrasound and light-based technologies',
  'Proven track record with thousands of satisfied patients achieving remarkable body transformations',
  'Individualised consultation process ensuring each treatment plan matches your specific goals and body type',
  'Comprehensive aftercare support with detailed protocols to maximise results and ensure optimal recovery',
  'Cutting-edge technology combined with artistic eye for body balance, proportion and aesthetic harmony',
];

const FAQS = [
  {
    question: 'How does non-surgical body contouring actually reduce fat cells?',
    answer: 'Our advanced technologies use targeted energy—including radiofrequency, focused ultrasound, or laser energy—to disrupt fat cell membranes from within. This causes the fat cells to break down and be naturally eliminated by your body\'s lymphatic system over the following weeks. Simultaneously, the energy stimulates collagen production, providing skin tightening benefits that create definition and contour.',
  },
  {
    question: 'How many body contouring sessions will I need to see results?',
    answer: 'Most patients require 4 to 8 sessions spaced 2 to 3 weeks apart, though this varies based on the size of the treatment area, the amount of fat to be reduced, and your individual response to treatment. Your personalised treatment plan will be discussed during your initial consultation. Initial visible improvements appear within 2 to 4 weeks, with full results continuing to develop for up to 6 months.',
  },
  {
    question: 'Will I have downtime after body contouring treatment?',
    answer: 'No, there is essentially no downtime. You can return to work, exercise, and all normal activities immediately after treatment. Some patients experience mild redness or warmth in the treated area, which typically subsides within hours. This is one of the key advantages of non-surgical body contouring—you get results without missing work or life.',
  },
  {
    question: 'Is body contouring treatment safe? Are there any side effects?',
    answer: 'Yes, our clinically proven technologies are safe and FDA-approved. Side effects are minimal and temporary, typically limited to mild redness, slight warmth, or minimal swelling that resolves within hours to days. Serious complications are extremely rare when performed by certified practitioners using proper protocols. During your consultation, we discuss your medical history to ensure safety.',
  },
  {
    question: 'Can body contouring replace surgery like liposuction or a tummy tuck?',
    answer: 'For most patients seeking subtle to moderate body refinement and fat reduction, non-surgical body contouring delivers excellent results without surgical risks or recovery time. It\'s ideal for those with good skin elasticity and localised fat deposits. However, patients with significant loose skin or very large volume excess may benefit from surgical consultation. We\'ll discuss what\'s realistic for your goals during your consultation.',
  },
  {
    question: 'How long do body contouring results last?',
    answer: 'Results are long-lasting when you maintain a stable weight and healthy lifestyle. Treated fat cells are permanently eliminated and don\'t regenerate. However, the remaining fat cells can enlarge if you gain significant weight. With proper maintenance and occasional touch-up treatments as desired, your sculpted results can be maintained indefinitely.',
  },
  {
    question: 'What\'s the difference between targeting different body areas like abs, thighs, and arms?',
    answer: 'While the core technology remains the same, treatment parameters are adjusted based on tissue thickness, fat density, and skin characteristics of each area. Upper arms require different settings than abdominal fat; thighs require different treatment than submental areas. Our experts customise each session to the specific anatomy and goals of each treatment zone.',
  },
  {
    question: 'Can I combine body contouring with other treatments?',
    answer: 'Absolutely. Many patients combine body contouring with skin tightening treatments, collagen-stimulating injectables like Profhilo, radiofrequency microneedling, or skin rejuvenation treatments to enhance overall body aesthetics. Our team can discuss combination approaches that synergise results. Typically, treatments are spaced appropriately for safety and optimal outcomes.',
  },
  {
    question: 'What should I expect at my body contouring consultation?',
    answer: 'We discuss your aesthetic goals, examine your body composition and target areas, review your medical history, and explain the technology we\'ll use. We show before-and-after photos of similar cases, discuss realistic expectations, outline a customised treatment plan with timing and investment, and answer all your questions. You\'ll leave with a clear understanding of your journey to your ideal body shape.',
  },
];

const RELATED_TREATMENTS = [
  {
    name: 'CoolSculpting',
    href: '/treatments/cool-sculpting-leicester',
    desc: 'Cryogenic fat reduction for targeted body contouring using controlled cooling technology.',
  },
  {
    name: 'Skin Tightening',
    href: '/treatments/skin-tightening',
    desc: 'Radiofrequency and ultrasound technologies to firm loose skin and improve elasticity.',
  },
  {
    name: 'Liposuction Leicester',
    href: '/treatments/liposuction-leicester',
    desc: 'Surgical fat removal for comprehensive body sculpting and significant fat reduction.',
  },
  {
    name: 'Endolift Laser',
    href: '/treatments/endolift',
    desc: 'Non-surgical laser lift for targeted fat reduction and collagen-stimulated skin tightening.',
  },
];

export default function BodyContouringPage() {
  const [showAllFaqs, setShowAllFaqs] = useState(false);
  const displayedFaqs = showAllFaqs ? FAQS : FAQS.slice(0, 4);

  return (
    <>
      <script type="application/ld+json">
        {JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'MedicalBusiness',
          name: 'The One Clinic - Body Contouring',
          description: 'Non-surgical body contouring and fat reduction treatments in Leicester',
          url: 'https://theoneclinic.co.uk/treatments/body-contouring',
        })}
      </script>

      <Breadcrumb
        items={[
          { label: 'Home', href: '/' },
          { label: 'Treatments', href: '/treatments' },
          { label: 'Body Contouring', href: '/treatments/body-contouring' },
        ]}
      />

      <Section variant="light" className={styles.heroSection}>
        <Container>
          <motion.div
            className={styles.heroContent}
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT}
            variants={stagger()}
          >
            <motion.div variants={fadeUp}>
              <p className={styles.eyebrow}>Body Contouring</p>
              <h1 className={styles.heading}>
                Non-Surgical Body Sculpting for the Silhouette You Desire
              </h1>
              <p className={styles.subheading}>
                Advanced fat reduction and skin tightening technologies that deliver dramatic body transformation without surgery, downtime, or recovery.
              </p>
              <BookConsultationButton>Book Consultation</BookConsultationButton>
            </motion.div>

            <motion.div variants={fadeUp} className={styles.heroImage}>
              <Image
                src="/images/treatments/body-contouring-hero.jpg"
                alt="Body Contouring Treatment"
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
            variants={stagger()}
          >
            <motion.div variants={fadeUp} className={styles.whatIsContent}>
              <p className={styles.eyebrowDark}>What Is Body Contouring?</p>
              <h2 className={styles.headingDark}>Advanced Non-Surgical Fat Reduction and Body Sculpting</h2>
              <p>
                Body contouring refers to advanced, non-invasive treatments that reduce stubborn fat deposits and tighten skin to sculpt and redefine your body shape. Using cutting-edge energy-based technologies, we precisely target localised fat that resists diet and exercise, eliminating it without incisions or anaesthesia. Simultaneously, these treatments stimulate collagen production, improving skin firmness and creating beautiful definition.
              </p>
              <p>
                Unlike traditional liposuction, non-surgical body contouring requires no downtime, no scars, and no recovery period. You can return to normal activities immediately, making it ideal for busy professionals and active individuals. Results develop progressively over weeks and months, with full transformation typically visible within 3 to 6 months.
              </p>
              <BookConsultationButton>Book Consultation</BookConsultationButton>
            </motion.div>
            <motion.div variants={fadeUp} className={styles.whatIsImage}>
              <Image
                src="/images/treatments/body-contouring-detail.jpg"
                alt="Body Contouring Process"
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
            variants={stagger()}
          >
            <motion.div variants={fadeUp} className={styles.sectionHeader}>
              <p className={styles.eyebrow}>At a Glance</p>
              <h2 className={styles.heading}>Body Contouring in Numbers</h2>
            </motion.div>

            <motion.div
              className={styles.glanceGrid}
              variants={stagger()}
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
            variants={stagger()}
          >
            <motion.div variants={fadeUp} className={styles.sectionHeader}>
              <p className={styles.eyebrowDark}>Your Treatment Journey</p>
              <h2 className={styles.headingDark}>From Consultation to Results</h2>
            </motion.div>

            <motion.div
              className={styles.journeySection}
              variants={stagger()}
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
            variants={stagger()}
          >
            <motion.div variants={fadeUp} className={styles.sectionHeader}>
              <p className={styles.eyebrow}>Key Benefits</p>
              <h2 className={styles.heading}>Why Patients Choose Body Contouring</h2>
            </motion.div>

            <motion.div
              className={styles.benefitsGrid}
              variants={stagger()}
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
            variants={stagger()}
          >
            <motion.div variants={fadeUp} className={styles.sectionHeader}>
              <p className={styles.eyebrowDark}>Eligibility and Suitability</p>
              <h2 className={styles.headingDark}>Are You a Good Candidate?</h2>
            </motion.div>

            <motion.div variants={stagger()} className={styles.textGrid}>
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
            variants={stagger()}
          >
            <motion.div variants={fadeUp} className={styles.sectionHeader}>
              <p className={styles.eyebrowDark}>Treatable Concerns</p>
              <h2 className={styles.headingDark}>Stubborn Fat We Can Address</h2>
            </motion.div>

            <motion.div variants={stagger()} className={styles.textGrid}>
              {TREATABLE_CONCERNS.map((concern, i) => (
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
            variants={stagger()}
          >
            <motion.div variants={fadeUp} className={styles.sectionHeader}>
              <p className={styles.eyebrowDark}>Treatable Areas</p>
              <h2 className={styles.headingDark}>Body Regions We Can Sculpt</h2>
            </motion.div>

            <motion.div variants={stagger()} className={styles.textGrid}>
              {TREATABLE_AREAS.map((area, i) => (
                <motion.div key={i} variants={fadeUp} className={styles.textItem}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                    <circle cx="12" cy="12" r="9"/>
                  </svg>
                  <p>{area}</p>
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
            variants={stagger()}
          >
            <motion.div variants={fadeUp} className={styles.ctaBannerContent}>
              <h2 className={styles.heading}>Ready to Transform Your Body?</h2>
              <p className={styles.subheading}>
                Book your free consultation today to discuss your body contouring goals with our expert team.
              </p>
              <BookConsultationButton>Book Consultation</BookConsultationButton>
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
            variants={stagger()}
          >
            <motion.div variants={fadeUp} className={styles.sectionHeader}>
              <p className={styles.eyebrowDark}>Our Clinic</p>
              <h2 className={styles.headingDark}>Why The One Clinic for Body Contouring</h2>
            </motion.div>

            <div className={styles.clinicIntroSection}>
              <motion.div
                className={styles.clinicIntroLeft}
                initial="hidden"
                whileInView="visible"
                viewport={VIEWPORT}
                variants={stagger()}
              >
                <motion.div variants={fadeUp}>
                  <p className={styles.eyebrowDark}>Excellence in Body Aesthetics</p>
                  <h3 className={styles.headingDark}>Specialising in Non-Surgical Body Transformation</h3>
                </motion.div>

                <motion.div variants={stagger()}>
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
                  src="/images/treatments/clinic-body-contouring.jpg"
                  alt="The One Clinic Body Contouring Facility"
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
            variants={stagger()}
          >
            <motion.div variants={fadeUp} className={styles.costBannerContent}>
              <p className={styles.eyebrow}>Transparent Pricing</p>
              <h2 className={styles.heading}>Body Contouring Investment</h2>
              <p className={styles.costText}>
                Body contouring treatment costs start from £150 per session, depending on the area being treated and the extent of fat reduction desired. Most patients invest in 4 to 8 sessions for optimal results. We offer flexible payment plans and can discuss package pricing during your consultation to provide exceptional value.
              </p>
              <BookConsultationButton>Book Consultation</BookConsultationButton>
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
            variants={stagger()}
          >
            <motion.div variants={fadeUp} className={styles.sectionHeaderCentre}>
              <p className={styles.eyebrow}>Common Questions</p>
              <h2 className={styles.heading}>Body Contouring FAQs</h2>
            </motion.div>

            <motion.div
              className={styles.faqList}
              variants={stagger()}
            >
              <Accordion items={displayedFaqs} theme="dark" />
            </motion.div>

            {!showAllFaqs && FAQS.length > 4 && (
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
            variants={stagger()}
          >
            <motion.div variants={fadeUp} className={styles.sectionHeader}>
              <p className={styles.eyebrowDark}>Related Treatments</p>
              <h2 className={styles.headingDark}>Complementary Procedures</h2>
            </motion.div>

            <motion.div
              className={styles.relatedGrid}
              variants={stagger()}
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
