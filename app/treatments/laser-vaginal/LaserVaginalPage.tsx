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
    value: '15 to 30 minutes',
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
    label: 'First Visible Results',
    value: 'Immediately to 2 weeks',
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
    value: 'From £250',
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
    title: 'Confidential Consultation and Intimate Health Assessment',
    desc: 'Your journey begins with a comprehensive, private consultation where we listen to your intimate health concerns. We assess vaginal laxity, dryness, sensation, and specific symptoms related to childbirth, hormonal changes, or ageing. Our compassionate team discusses your goals in complete confidence, ensuring you feel comfortable and respected throughout.',
  },
  {
    n: '02',
    title: 'Treatment Preparation and Topical Anaesthetic Application',
    desc: 'You are positioned comfortably in a private treatment room. A gentle topical anaesthetic cream is applied to the vaginal area, ensuring complete comfort and sensitivity. The treatment area is assessed to confirm optimal parameters for your individual anatomy, ensuring the most effective and safe treatment possible.',
  },
  {
    n: '03',
    title: 'Precise Laser Energy Delivery and Tissue Rejuvenation',
    desc: 'Our advanced laser delivers precisely controlled energy to vaginal tissues, stimulating collagen remodelling and tissue renewal. The procedure gently tightens the vaginal wall and introitus, improves elasticity, and enhances blood flow. Most patients feel only mild warmth with no pain or significant discomfort throughout the 15 to 30-minute procedure.',
  },
  {
    n: '04',
    title: 'Recovery, Aftercare and Progressive Intimate Wellness',
    desc: 'Recovery is remarkable with minimal to no downtime. You can resume normal activities, work, and exercise immediately. Sexual activity is recommended to resume after 3 to 5 days to maximise results. Results develop progressively over 6 to 8 weeks as collagen remodels. Many women notice improved comfort, sensation, and confidence within days, with full transformation evident by 8 weeks.',
  },
];

const BENEFITS = [
  {
    title: 'Non-Surgical Intimate Tightening Without Surgery',
    desc: 'Achieve vaginal rejuvenation and tightening without invasive surgery, incisions, or recovery periods. The laser safely stimulates your body\'s natural collagen production, delivering natural-looking tightening that looks and feels completely normal and authentic.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
      </svg>
    ),
  },
  {
    title: 'Addresses Multiple Intimate Health Concerns Simultaneously',
    desc: 'A single course of laser treatment can dramatically improve vaginal laxity, dryness, reduced sensation, and mild stress urinary incontinence. This multi-benefit approach makes it exceptionally efficient for women experiencing multiple intimate health changes.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="12" cy="12" r="10"/>
        <polyline points="12 6 12 12 16 14"/>
      </svg>
    ),
  },
  {
    title: 'Dramatically Improves Sexual Comfort and Confidence',
    desc: 'Restored vaginal tightening and improved sensation enhance sexual pleasure and confidence for both partners. Women report increased arousal, stronger sensations, and dramatically improved enjoyment of intimate relationships. This meaningful improvement extends far beyond physical—it restores confidence and intimacy.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"/>
        <path d="M4.5 20.118a7.5 7.5 0 0115 0"/>
      </svg>
    ),
  },
  {
    title: 'Minimal Downtime with Immediate Return to Normal Life',
    desc: 'Unlike surgical vaginoplasty requiring weeks of recovery, laser vaginal rejuvenation allows immediate return to work, exercise, and daily activities. Only a brief 3 to 5-day abstinence from sexual activity is recommended. You can resume your full life the very next day.',
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
    title: 'Addresses Postpartum Changes and Hormonal Effects',
    desc: 'Whether you\'re experiencing postpartum vaginal laxity, menopausal dryness, or age-related changes, laser rejuvenation addresses the specific challenges women face at every life stage. It\'s particularly effective for women seeking restoration after pregnancy and childbirth.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/>
        <polyline points="17 6 23 6 23 12"/>
      </svg>
    ),
  },
  {
    title: 'Confidential, Compassionate Care in Safe Environment',
    desc: 'All consultations and treatments are conducted in complete privacy with our experienced, non-judgmental clinical team. We specialise in intimate health and treat every woman with the utmost respect, sensitivity, and compassion. Your privacy and dignity are our highest priority.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
      </svg>
    ),
  },
];

const ELIGIBILITY = [
  'Women seeking improved vaginal tightness, elasticity, and rejuvenation without surgery',
  'Those experiencing postpartum vaginal laxity or changes following childbirth',
  'Women affected by menopausal or hormonal changes causing dryness or discomfort',
  'Those with mild stress urinary incontinence seeking non-surgical improvement',
  'Any woman in good general health seeking to restore intimacy, comfort, and confidence',
];

const TREATABLE_CONDITIONS = [
  'Vaginal laxity and looseness affecting sensation and intimacy',
  'Vaginal dryness and discomfort, particularly post-menopause',
  'Reduced vaginal sensation and diminished pleasure',
  'Mild stress urinary incontinence and loss of control',
  'Post-childbirth tissue changes and elasticity loss',
];

const RESULTS_AND_AFTERCARE = [
  'Immediate comfort improvement with many women noticing reduced dryness and improved sensation within days',
  'Sexual activity can resume after 3 to 5 days for optimal results and continued collagen stimulation',
  'Continued tightening and elasticity improvement over 6 to 8 weeks as collagen fully remodels',
  'Optimal results visible by 8 weeks, with full benefits continuing for several months',
  'Wear cotton underwear and avoid tight clothing for the first 48 hours to allow tissues to settle',
  'Light spotting or minimal discharge is normal and typically resolves within 3 to 5 days',
  'Avoid tampons, douches, and swimming pools for 5 to 7 days post-treatment',
  'Results can last 1 to 2 years or longer; maintenance sessions can extend benefits indefinitely',
];

const CLINIC_REASONS = [
  'Expert female and male clinicians specialising in women\'s intimate health with extensive experience',
  'Advanced FDA-approved laser technology specifically designed for vaginal tissue rejuvenation',
  'Completely confidential consultation process ensuring privacy and respect throughout',
  'Compassionate, non-judgmental approach to intimate health concerns',
  'Comprehensive pre-treatment assessment including medical history and suitability evaluation',
  'Detailed aftercare guidance and follow-up support ensuring optimal satisfaction and results',
];

const FAQS = [
  {
    question: 'How does laser vaginal rejuvenation work and what does it treat?',
    answer: 'Laser vaginal rejuvenation uses controlled laser energy to heat and stimulate collagen production in vaginal tissues. This tightens the vaginal wall and introitus, improves elasticity, enhances blood flow and sensation, and addresses vaginal laxity, dryness, reduced sensation, and mild stress incontinence. The treatment triggers the body\'s natural collagen remodelling, which continues for weeks and months after treatment.',
  },
  {
    question: 'How many sessions will I need for optimal results?',
    answer: 'Most women see excellent results after a single session. However, a course of 2 to 3 sessions spaced 4 to 6 weeks apart is often recommended for maximum and longest-lasting results. Your clinician will recommend the ideal protocol based on your specific concerns and goals during your consultation.',
  },
  {
    question: 'Is laser vaginal rejuvenation painful or uncomfortable?',
    answer: 'No, the procedure is very comfortable. A topical anaesthetic cream is applied beforehand, completely numbing the treatment area. Most women feel only mild warmth during the 15 to 30-minute procedure. Post-treatment discomfort is minimal, with most women experiencing only mild sensitivity for a day or two, easily managed with paracetamol if needed.',
  },
  {
    question: 'When can I resume sexual activity after treatment?',
    answer: 'Sexual activity can safely resume after 3 to 5 days following treatment. This brief abstinence allows tissues to optimally heal while continuing the collagen-stimulation benefits of the procedure. Many women report that sexual activity enhances their results and increases sensation during this crucial healing phase.',
  },
  {
    question: 'Will laser vaginal rejuvenation help with stress urinary incontinence?',
    answer: 'Yes, laser vaginal rejuvenation can significantly improve mild stress urinary incontinence by tightening tissues around the urethra and bladder neck, improving muscle tone and control. For moderate to severe incontinence, your clinician may recommend combined approaches or additional assessment. All concerns are discussed during your detailed consultation.',
  },
  {
    question: 'How long do results from laser vaginal rejuvenation last?',
    answer: 'Results can last 1 to 2 years or even longer, with some women enjoying benefits for multiple years. Results gradually diminish as natural tissue relaxation occurs over time. Maintenance or touch-up sessions can extend results indefinitely for those wanting permanent ongoing benefits.',
  },
  {
    question: 'Can laser vaginal rejuvenation address menopausal dryness and discomfort?',
    answer: 'Absolutely. Laser vaginal rejuvenation is highly effective for menopausal dryness, discomfort, and reduced elasticity caused by hormonal changes. The improved blood flow and collagen production address multiple menopausal changes simultaneously, dramatically improving comfort, sensation, and intimate function.',
  },
  {
    question: 'Is there any downtime or activity restrictions after treatment?',
    answer: 'Minimal downtime is required. You can return to work and normal activities immediately. Light exercise can be resumed after 24 hours. The only restriction is 3 to 5 days abstinence from sexual activity and 5 to 7 days avoiding tampons, douches, and swimming. Most women experience no disruption to their routine.',
  },
  {
    question: 'Do I need a GP referral for laser vaginal rejuvenation?',
    answer: 'No referral is needed. You can book directly and confidentially with us. A comprehensive pre-treatment consultation is conducted to assess your suitability and discuss your goals. If you have specific medical concerns, we can discuss whether consultation with your GP is advisable, but it\'s not required to proceed.',
  },
];

const RELATED_TREATMENTS = [
  {
    name: 'Profhilo Vaginal',
    href: '/treatments/profhilo-vaginal',
    desc: 'Bio-stimulating injectables for intimate dryness and hydration without laser energy.',
  },
  {
    name: 'Vaginal Health Supplements',
    href: '/treatments/vaginal-health',
    desc: 'Comprehensive women\'s health and vaginal wellness products and guidance.',
  },
  {
    name: 'Intimate Aesthetic Consultation',
    href: '/treatments/intimate-aesthetics',
    desc: 'Personalised assessment and treatment planning for intimate health concerns.',
  },
  {
    name: 'Female Sexual Wellness',
    href: '/treatments/female-wellness',
    desc: 'Holistic approach to sexual health, function, and satisfaction.',
  },
];

export default function LaserVaginalPage() {
  const [showAllFaqs, setShowAllFaqs] = useState(false);
  const displayedFaqs = showAllFaqs ? FAQS : FAQS.slice(0, 4);

  return (
    <>
      <script type="application/ld+json">
        {JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'MedicalBusiness',
          name: 'The One Clinic - Laser Vaginal Rejuvenation',
          description: 'Non-surgical laser vaginal rejuvenation in Leicester',
          url: 'https://theoneclinic.co.uk/treatments/laser-vaginal',
        })}
      </script>

      <Breadcrumb
        items={[
          { label: 'Home', href: '/' },
          { label: 'Treatments', href: '/treatments' },
          { label: 'Laser Vaginal Rejuvenation', href: '/treatments/laser-vaginal' },
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
              <p className={styles.eyebrow}>Laser Vaginal Rejuvenation</p>
              <h1 className={styles.heading}>
                Restore Intimate Comfort and Confidence
              </h1>
              <p className={styles.subheading}>
                Advanced non-surgical laser treatment for vaginal rejuvenation, tightening, and intimate wellness.
              </p>
              <BookConsultationButton>Book Consultation</BookConsultationButton>
            </motion.div>

            <motion.div variants={fadeUp} className={styles.heroImage}>
              <Image
                src="/images/treatments/laser-vaginal-hero.jpg"
                alt="Laser Vaginal Rejuvenation"
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
              <p className={styles.eyebrowDark}>What Is Laser Vaginal Rejuvenation?</p>
              <h2 className={styles.headingDark}>Advanced Non-Surgical Intimate Health Treatment</h2>
              <p>
                Laser vaginal rejuvenation is a remarkable non-surgical procedure that uses precisely controlled laser energy to stimulate collagen production and rejuvenate vaginal tissues. The treatment addresses vaginal laxity, dryness, reduced sensation, and mild stress urinary incontinence—all common challenges women face at different life stages, particularly after childbirth or menopause.
              </p>
              <p>
                Unlike invasive surgical alternatives, laser vaginal rejuvenation requires no incisions, no general anaesthesia, and no significant downtime. Most women return to normal activities immediately and resume sexual activity after just 3 to 5 days. Results develop progressively over 6 to 8 weeks as collagen remodels, delivering dramatic improvements in comfort, sensation, tightness, and confidence.
              </p>
              <BookConsultationButton>Book Consultation</BookConsultationButton>
            </motion.div>
            <motion.div variants={fadeUp} className={styles.whatIsImage}>
              <Image
                src="/images/treatments/laser-vaginal-detail.jpg"
                alt="Laser Vaginal Rejuvenation Process"
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
              <h2 className={styles.heading}>Laser Vaginal Rejuvenation in Numbers</h2>
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
              <h2 className={styles.headingDark}>From Consultation to Intimate Wellness</h2>
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
              <h2 className={styles.heading}>Why Women Choose Laser Vaginal Rejuvenation</h2>
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
              <p className={styles.eyebrowDark}>Treatable Conditions</p>
              <h2 className={styles.headingDark}>Intimate Health Concerns We Address</h2>
            </motion.div>

            <motion.div variants={stagger()} className={styles.textGrid}>
              {TREATABLE_CONDITIONS.map((condition, i) => (
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
            variants={stagger()}
          >
            <motion.div variants={fadeUp} className={styles.ctaBannerContent}>
              <h2 className={styles.heading}>Restore Your Intimate Comfort and Confidence</h2>
              <p className={styles.subheading}>
                Book your confidential consultation today to discuss your intimate health goals with our compassionate team.
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
              <h2 className={styles.headingDark}>Why The One Clinic for Laser Vaginal Rejuvenation</h2>
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
                  <p className={styles.eyebrowDark}>Women's Intimate Health Expertise</p>
                  <h3 className={styles.headingDark}>Specialising in Confidential, Compassionate Care</h3>
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
                  src="/images/treatments/clinic-laser-vaginal.jpg"
                  alt="The One Clinic Laser Vaginal Rejuvenation Facility"
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
              <h2 className={styles.heading}>Laser Vaginal Rejuvenation Investment</h2>
              <p className={styles.costText}>
                Laser vaginal rejuvenation treatment costs from £250 per session. Most women see excellent results after a single session, though a course of 2 to 3 sessions spaced 4 to 6 weeks apart is often recommended for maximum durability. We offer flexible payment plans and can discuss package pricing during your consultation for exceptional value.
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
              <h2 className={styles.heading}>Laser Vaginal Rejuvenation FAQs</h2>
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
              <h2 className={styles.headingDark}>Complementary Women's Health Solutions</h2>
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
