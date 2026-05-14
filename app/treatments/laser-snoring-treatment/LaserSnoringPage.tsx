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
    value: '20 to 30 minutes',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="12" cy="12" r="10"/>
        <polyline points="12 6 12 12 16 14"/>
      </svg>
    ),
  },
  {
    label: 'Sessions Recommended',
    value: '1 to 3 sessions',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <polyline points="1 4 1 10 7 10"/>
        <path d="M3.51 15a9 9 0 1 0 .49-3.1"/>
      </svg>
    ),
  },
  {
    label: 'First Results',
    value: 'Immediate to 2 weeks',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/>
        <polyline points="17 6 23 6 23 12"/>
      </svg>
    ),
  },
  {
    label: 'Full Results Timeline',
    value: '2 to 3 months',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"/>
        <path d="M9 12l2 2 4-4"/>
      </svg>
    ),
  },
  {
    label: 'Downtime Required',
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
    label: 'Treatment Investment',
    value: 'From £300',
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
    title: 'Comprehensive Sleep Assessment and Consultation',
    desc: 'Your journey begins with a detailed consultation where we assess your snoring severity, sleep quality impact, medical history, and any underlying sleep apnoea concerns. We evaluate your palatal anatomy using advanced visualisation techniques and discuss whether laser snoring treatment is the right solution for you. A personalised treatment plan is created based on your specific needs.',
  },
  {
    n: '02',
    title: 'Precise Preparation and Anaesthetic Application',
    desc: 'Your throat is gently cleansed and inspected. A topical anaesthetic spray is applied to the soft palate and surrounding tissues, ensuring complete comfort during treatment. The laser parameters are calibrated specifically for your palatal anatomy. You remain fully conscious and comfortable throughout, able to communicate with our clinical team.',
  },
  {
    n: '03',
    title: 'Laser Energy Delivery and Tissue Tightening',
    desc: 'Our advanced laser delivers precisely controlled energy to the soft palate and uvula tissues. The laser gently heats the collagen fibres, causing them to contract and tighten. Simultaneously, the procedure stimulates collagen remodelling, which continues long after treatment. Most patients feel only a gentle warmth with no pain or significant discomfort.',
  },
  {
    n: '04',
    title: 'Recovery, Aftercare and Progressive Results',
    desc: 'Recovery is immediate with zero downtime. You can return to work, activities, and normal eating immediately, though soft foods are recommended for the first few days. Results begin within days, with continued improvement over 2 to 3 months as collagen remodelling occurs. Some patients notice dramatic snoring reduction after a single session, while others benefit from 2 to 3 sessions for optimal longevity.',
  },
];

const BENEFITS = [
  {
    title: 'Non-Surgical Solution Without General Anaesthesia',
    desc: 'Treat snoring safely without invasive surgery, scars, or general anaesthesia. The procedure is gentle, performed under local topical anaesthetic only, making it dramatically safer and more comfortable than surgical alternatives like UPPP or LAUP.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
      </svg>
    ),
  },
  {
    title: 'Immediate Treatment with Zero Downtime',
    desc: 'The entire procedure takes just 20 to 30 minutes with absolutely no downtime or recovery period. You can return to work, eat normally, exercise, and live your life immediately. No restrictions, no complications, no time away from your daily routine.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="12" cy="12" r="10"/>
        <polyline points="12 6 12 12 16 14"/>
      </svg>
    ),
  },
  {
    title: 'Dramatically Improves Sleep Quality for Everyone',
    desc: 'By reducing or eliminating snoring, you and your partner enjoy uninterrupted, restorative sleep. Better sleep quality leads to improved daytime energy, enhanced focus, better mood, and stronger relationships. Many patients report sleeping better than they have in years.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
      </svg>
    ),
  },
  {
    title: 'Precise Laser Technology Targets Root Cause',
    desc: 'The laser precisely tightens the soft palate and uvula—the exact tissues causing the vibration that produces snoring. This targeted approach addresses the anatomical root cause of snoring rather than masking symptoms, delivering lasting results.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M12 2L2 7V12C2 16.5 6.5 21 12 21C17.5 21 22 16.5 22 12V7L12 2Z"/>
      </svg>
    ),
  },
  {
    title: 'Minimal Discomfort with Topical Anaesthetic Only',
    desc: 'Treatment is remarkably comfortable with only a topical anaesthetic spray applied to the tissues. Most patients experience only mild warmth, no pain, and no significant post-treatment soreness. This is a comfortable, patient-friendly alternative to painful surgical procedures.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"/>
        <path d="M4.5 20.118a7.5 7.5 0 0115 0"/>
      </svg>
    ),
  },
  {
    title: 'Long-Lasting Results with Proven Efficacy',
    desc: 'Clinical studies show laser snoring treatment delivers sustained snoring reduction lasting months to years. The collagen remodelling continues long after treatment, progressively improving results. Many patients enjoy snoring-free sleep for 1 to 3 years or longer after a single session.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/>
        <polyline points="17 6 23 6 23 12"/>
      </svg>
    ),
  },
];

const ELIGIBILITY = [
  'Adults experiencing regular snoring affecting sleep quality or relationships, regardless of sleep apnoea status',
  'Those seeking a non-surgical alternative to invasive procedures like palatoplasty or UPPP surgery',
  'Individuals with good overall health and realistic expectations about snoring reduction outcomes',
  'Not suitable for untreated obstructive sleep apnoea, though our team can discuss management options',
  'Willing to attend follow-up if additional sessions are recommended for optimal, long-lasting results',
];

const RESULTS_AND_AFTERCARE = [
  'Most patients notice immediate snoring reduction within the first week, with continued improvement over 8 weeks',
  'Sleep quality improvements are often reported within days as snoring decreases and sleep becomes uninterrupted',
  'Full collagen remodelling and maximum results develop over 8 to 12 weeks as tissue tightening continues progressively',
  'Soft foods and cool drinks recommended for the first 24 to 48 hours; normal diet resumable immediately',
  'Avoid smoking, alcohol, and hot foods for 48 hours to optimise healing and maintain treatment effectiveness',
  'Light activity and exercise can be resumed immediately; no restrictions on normal daily activities',
  'Results typically last 1 to 3 years, with some patients enjoying snoring-free sleep indefinitely',
  'Maintenance sessions or touch-up treatments can extend results for those seeking long-term snoring prevention',
];

const CLINIC_REASONS = [
  'Expert clinical team with advanced training in laser snoring treatment and sleep medicine',
  'State-of-the-art laser technology specifically calibrated for precise palatal tissue tightening',
  'Personalised assessment protocol evaluating snoring severity and underlying sleep issues',
  'Comfortable, minimally invasive approach with topical anaesthetic and zero surgical recovery',
  'Flexible treatment scheduling with options for single sessions or multi-session protocols',
  'Comprehensive aftercare guidance and support ensuring optimal results and patient satisfaction',
];

const FAQS = [
  {
    question: 'How does laser snoring treatment actually reduce or eliminate snoring?',
    answer: 'Snoring occurs when tissues in the soft palate and uvula vibrate during sleep as air passes through. Our laser delivers precise heat energy to tighten these tissues, reducing laxity and vibration. Simultaneously, collagen remodelling is stimulated, which continues tightening tissues for weeks and months after treatment, progressively improving snoring reduction.',
  },
  {
    question: 'How many laser snoring treatment sessions will I need?',
    answer: 'Most patients see significant snoring improvement after a single 20 to 30-minute session. However, some benefit from 2 to 3 sessions spaced 4 to 6 weeks apart for optimal, longer-lasting results. Your clinician will recommend the ideal protocol during your consultation based on snoring severity and anatomical factors.',
  },
  {
    question: 'Is laser snoring treatment painful? What will I feel?',
    answer: 'No, treatment is very comfortable. A topical anaesthetic spray is applied beforehand, numbing the soft palate completely. During treatment, you feel only gentle warmth with no pain. Post-treatment discomfort is minimal, with most patients experiencing only mild throat soreness for a day or two, easily managed with paracetamol if needed.',
  },
  {
    question: 'Is there any downtime or recovery period after treatment?',
    answer: 'Absolutely no downtime. You can return to work, exercise, and all normal activities immediately. Soft foods are recommended for the first 24-48 hours, but you can eat normal diet straight away. No restrictions on activity, no work missed, no life disruption. It\'s one of the most convenient treatments available.',
  },
  {
    question: 'Will laser snoring treatment help my sleep apnoea?',
    answer: 'Laser snoring treatment addresses simple snoring by tightening the soft palate. For obstructive sleep apnoea (OSA), consultation with a sleep specialist is important. While some mild OSA patients may benefit from laser treatment, moderate to severe OSA typically requires dedicated OSA management. Our team can discuss your specific situation.',
  },
  {
    question: 'How long do laser snoring treatment results last?',
    answer: 'Results are long-lasting, with most patients enjoying significant snoring reduction for 1 to 3 years or longer. Some patients remain snoring-free indefinitely after a single session. Results gradually diminish over time as natural tissue relaxation occurs, but additional maintenance sessions can extend the benefit further.',
  },
  {
    question: 'Can I combine laser snoring treatment with other therapies?',
    answer: 'Yes. Some patients combine laser treatment with positional sleep devices, nasal treatments, or weight management for enhanced results. Our team can discuss complementary approaches that work synergistically. However, most patients find laser treatment alone provides excellent snoring reduction.',
  },
  {
    question: 'Do I need a doctor referral to have laser snoring treatment?',
    answer: 'No referral is needed. You can book directly with us. However, if you have concerns about sleep apnoea or other sleep disorders, we can discuss whether pre-treatment sleep evaluation is advisable. Our team provides comprehensive assessment to ensure laser snoring treatment is the right choice for you.',
  },
  {
    question: 'What makes laser snoring treatment better than other options like surgery or CPAP?',
    answer: 'Laser treatment offers the best of all worlds: non-surgical approach like CPAP, but without masks or nightly equipment; faster and less invasive than surgical options; minimal discomfort unlike painful surgical procedures; zero downtime unlike month-long surgical recovery; and excellent, lasting results. It\'s the modern, comfortable solution to snoring.',
  },
];

const RELATED_TREATMENTS = [
  {
    name: 'Sleep Apnoea Management',
    href: '/treatments/sleep-health',
    desc: 'Comprehensive assessment and management of obstructive sleep apnoea with expert guidance.',
  },
  {
    name: 'Radiofrequency Nose Treatment',
    href: '/treatments/radiofrequency-nose',
    desc: 'Address nasal obstruction contributing to snoring with non-surgical radiofrequency therapy.',
  },
  {
    name: 'Anti-Snoring Devices',
    href: '/treatments/anti-snoring-devices',
    desc: 'Custom-fitted positional and mechanical devices complementing laser snoring treatment.',
  },
  {
    name: 'Sleep Health Consultation',
    href: '/treatments/sleep-consultation',
    desc: 'Detailed sleep assessment and lifestyle optimisation for better sleep quality.',
  },
];

export default function LaserSnoringPage() {
  const [showAllFaqs, setShowAllFaqs] = useState(false);
  const displayedFaqs = showAllFaqs ? FAQS : FAQS.slice(0, 4);

  return (
    <>
      <script type="application/ld+json">
        {JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'MedicalBusiness',
          name: 'The One Clinic - Laser Snoring Treatment',
          description: 'Non-surgical laser snoring treatment in Leicester',
          url: 'https://theoneclinic.co.uk/treatments/laser-snoring-treatment',
        })}
      </script>

      <Breadcrumb
        items={[
          { label: 'Home', href: '/' },
          { label: 'Treatments', href: '/treatments' },
          { label: 'Laser Snoring Treatment', href: '/treatments/laser-snoring-treatment' },
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
              <p className={styles.eyebrow}>Laser Snoring Treatment</p>
              <h1 className={styles.heading}>
                Sleep Better with Laser Snoring Treatment
              </h1>
              <p className={styles.subheading}>
                A fast, non-surgical solution to eliminate snoring and restore peaceful sleep for you and your partner.
              </p>
              <BookConsultationButton>Book Consultation</BookConsultationButton>
            </motion.div>

            <motion.div variants={fadeUp} className={styles.heroImage}>
              <Image
                src="/images/treatments/laser-snoring-hero.jpg"
                alt="Laser Snoring Treatment"
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
              <p className={styles.eyebrowDark}>What Is Laser Snoring Treatment?</p>
              <h2 className={styles.headingDark}>Advanced Non-Surgical Snoring Reduction</h2>
              <p>
                Laser snoring treatment is a remarkable non-surgical procedure that uses precise laser energy to gently tighten the soft palate and uvula—the tissues responsible for the vibration that causes snoring. By reducing tissue laxity and stimulating collagen remodelling, the treatment dramatically reduces or eliminates snoring without incisions, general anaesthesia, or significant downtime.
              </p>
              <p>
                Unlike invasive surgical options, laser snoring treatment is quick, comfortable, and allows you to return to normal activities immediately. Most patients notice dramatic improvement within days to weeks, with continued enhancement over 8 to 12 weeks as collagen remodelling completes. For many, it's life-changing—enabling peaceful, uninterrupted sleep for both patient and partner.
              </p>
              <BookConsultationButton>Book Consultation</BookConsultationButton>
            </motion.div>
            <motion.div variants={fadeUp} className={styles.whatIsImage}>
              <Image
                src="/images/treatments/laser-snoring-detail.jpg"
                alt="Laser Snoring Treatment Process"
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
              <h2 className={styles.heading}>Laser Snoring Treatment in Numbers</h2>
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
              <h2 className={styles.headingDark}>From Consultation to Snoring-Free Sleep</h2>
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
              <h2 className={styles.heading}>Why Patients Choose Laser Snoring Treatment</h2>
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
              <p className={styles.eyebrowDark}>Results and Aftercare</p>
              <h2 className={styles.headingDark}>What to Expect After Treatment</h2>
            </motion.div>

            <motion.div variants={stagger()} className={styles.textGrid}>
              {RESULTS_AND_AFTERCARE.map((item, i) => (
                <motion.div key={i} variants={fadeUp} className={styles.textItem}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                    <path d="M12 5v14m7-7H5"/>
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
            variants={stagger()}
          >
            <motion.div variants={fadeUp} className={styles.ctaBannerContent}>
              <h2 className={styles.heading}>Ready to Sleep Better Tonight?</h2>
              <p className={styles.subheading}>
                Book your free consultation today to discuss laser snoring treatment with our expert team.
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
              <h2 className={styles.headingDark}>Why The One Clinic for Laser Snoring Treatment</h2>
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
                  <p className={styles.eyebrowDark}>Sleep Medicine Excellence</p>
                  <h3 className={styles.headingDark}>Specialising in Non-Surgical Snoring Solutions</h3>
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
                  src="/images/treatments/clinic-laser-snoring.jpg"
                  alt="The One Clinic Laser Snoring Treatment Facility"
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
              <h2 className={styles.heading}>Laser Snoring Treatment Investment</h2>
              <p className={styles.costText}>
                Laser snoring treatment costs from £300 per session. Most patients benefit from a single session, though some choose 2 to 3 sessions spaced 4 to 6 weeks apart for extended longevity. We offer flexible payment plans and can discuss package pricing during your consultation for exceptional value on multi-session protocols.
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
              <h2 className={styles.heading}>Laser Snoring Treatment FAQs</h2>
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
              <h2 className={styles.headingDark}>Complementary Sleep Solutions</h2>
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
