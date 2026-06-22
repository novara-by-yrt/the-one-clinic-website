'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { m } from 'framer-motion';
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
    value: '20 to 30 minutes',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="12" cy="12" r="10"/>
        <polyline points="12 6 12 12 16 14"/>
      </svg>
    ),
  },
  {
    label: 'Downtime',
    value: 'None',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"/>
        <path d="M9 12l2 2 4-4"/>
      </svg>
    ),
  },
  {
    label: 'Anaesthetic',
    value: 'None required',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
      </svg>
    ),
  },
  {
    label: 'Results Onset',
    value: '2 to 4 weeks',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/>
        <polyline points="17 6 23 6 23 12"/>
      </svg>
    ),
  },
  {
    label: 'Sessions Recommended',
    value: '3 recommended',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <polyline points="1 4 1 10 7 10"/>
        <path d="M3.51 15a9 9 0 1 0 .49-3.1"/>
      </svg>
    ),
  },
  {
    label: 'Treatment Cost',
    value: 'From £400',
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
    title: 'Intimate Health Assessment & Consultation',
    desc: 'A comprehensive, private consultation where we listen to your intimate health concerns. We assess vaginal laxity, dryness, sensation, and specific symptoms related to childbirth, hormonal changes, or ageing. Our compassionate team discusses your goals in complete confidence, ensuring you feel comfortable and respected throughout.',
  },
  {
    n: '02',
    title: 'Laser Treatment Application',
    desc: 'Precisely controlled fractional laser energy is delivered to vaginal tissues. The non-ablative laser stimulates collagen and elastin production within the vaginal mucosa, thickening the epithelium and improving tissue tone. Most patients feel only mild warmth throughout the 20 to 30-minute procedure with no pain or significant discomfort.',
  },
  {
    n: '03',
    title: 'Post-Treatment Guidance',
    desc: 'Following treatment, you receive detailed aftercare instructions tailored to your individual needs. A brief period of sexual abstinence of 5 days is recommended. Results develop progressively over several weeks as collagen remodels. Your clinician will schedule follow-up appointments and discuss the optimal course of sessions for your goals.',
  },
  {
    n: '04',
    title: 'Progressive Improvement',
    desc: 'Improvement continues over 3 sessions spaced 4 to 6 weeks apart. Each session builds on the last, progressively improving vaginal tissue quality, tone, moisture retention, and overall intimate wellness. Many women notice improved comfort, sensation, and confidence from as early as 2 weeks after the first session.',
  },
];

const APPROACH_CARDS = [
  {
    eyebrow: '01',
    title: 'Intimate Health Assessment',
    desc: 'Every treatment begins with a thorough, confidential assessment of your intimate health concerns. We evaluate vaginal laxity, tissue quality, moisture levels, and any symptoms of incontinence or reduced sensation to design your personalised treatment plan.',
  },
  {
    eyebrow: '02',
    title: 'Laser Treatment Application',
    desc: 'Our advanced non-ablative fractional laser delivers precisely controlled energy to vaginal mucosa. This stimulates collagen and elastin production, thickens the vaginal epithelium, and improves blood flow,all in a comfortable, discreet clinical setting with no anaesthesia required.',
  },
  {
    eyebrow: '03',
    title: 'Post-Treatment Guidance',
    desc: 'Following each session, our team provides detailed aftercare guidance and monitors your progress. We schedule follow-up appointments to assess improvement and ensure you achieve the best possible results from your treatment course.',
  },
];

const BENEFITS = [
  {
    title: 'Improves Vaginal Laxity',
    desc: 'Fractional laser energy stimulates collagen production within the vaginal wall, tightening and firming the tissue for improved tone and sensation.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
      </svg>
    ),
  },
  {
    title: 'Reduces Dryness',
    desc: 'Laser energy enhances blood flow and stimulates natural moisture production within vaginal tissues, significantly improving dryness and discomfort associated with menopause or hormonal changes.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"/>
      </svg>
    ),
  },
  {
    title: 'Mild Incontinence Support',
    desc: 'By tightening the tissues around the urethra and bladder neck, laser rejuvenation provides meaningful improvement in mild stress urinary incontinence without surgery or medication.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="12" cy="12" r="10"/>
        <path d="M9 12l2 2 4-4"/>
      </svg>
    ),
  },
  {
    title: 'No Downtime',
    desc: 'Unlike surgical alternatives, laser vaginal rejuvenation requires no recovery period. You can return to work and normal daily activities immediately after each session.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
        <polyline points="22 4 12 14.01 9 11.01"/>
      </svg>
    ),
  },
  {
    title: 'Non-Surgical',
    desc: 'A completely non-invasive approach that delivers genuine clinical results without incisions, anaesthesia, or the risks associated with surgical vaginal rejuvenation procedures.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/>
        <polyline points="17 6 23 6 23 12"/>
      </svg>
    ),
  },
  {
    title: 'Discreet & Comfortable',
    desc: 'Treatments are conducted in a private, comfortable clinical environment by experienced, compassionate practitioners who specialise in women\'s intimate health with the utmost discretion.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
        <circle cx="12" cy="12" r="3"/>
      </svg>
    ),
  },
];

const ELIGIBILITY_SUITABLE = [
  'Vaginal laxity following childbirth or ageing',
  'Menopause-related vaginal dryness or atrophy',
  'Mild stress urinary incontinence',
  'Reduced vaginal sensation affecting intimate wellbeing',
  'Women in good general health seeking non-surgical intimate rejuvenation',
];

const ELIGIBILITY_NOT_SUITABLE = [
  'Active vaginal or pelvic infection',
  'Pregnancy or breastfeeding',
  'Gynaecological malignancy (confirmed or suspected)',
  'Prolapse requiring surgical correction',
  'Severe or complex urinary incontinence requiring specialist management',
];

const CONDITIONS_TREATED = [
  {
    title: 'Vaginal Laxity',
    desc: 'Fractional laser stimulates collagen remodelling within the vaginal wall, progressively tightening and firming the tissue to restore tone and improve sensation.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
      </svg>
    ),
  },
  {
    title: 'Vaginal Dryness & Atrophy',
    desc: 'Laser energy triggers improved blood flow and epithelial thickening, restoring natural lubrication and significantly reducing discomfort caused by dryness or vaginal atrophy.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"/>
      </svg>
    ),
  },
  {
    title: 'Mild Urinary Incontinence',
    desc: 'By tightening tissues around the urethra, treatment provides meaningful improvement in stress urinary incontinence,that sudden leakage associated with coughing, sneezing, or exercise.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="12" cy="12" r="10"/>
        <path d="M9 12l2 2 4-4"/>
      </svg>
    ),
  },
  {
    title: 'Reduced Sensation',
    desc: 'Improved blood flow and tissue health restore sensitivity and sensation within the vaginal canal, enhancing intimate comfort, pleasure, and overall sexual wellbeing.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
        <circle cx="12" cy="12" r="3"/>
      </svg>
    ),
  },
  {
    title: 'Post-Childbirth Changes',
    desc: 'Childbirth can significantly alter vaginal tone and tissue integrity. Laser rejuvenation addresses laxity, elasticity loss, and scarring to help restore pre-pregnancy intimate health.',
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
    title: 'Menopausal Symptoms',
    desc: 'The hormonal changes of menopause cause thinning, dryness, and discomfort in vaginal tissues. Laser treatment effectively addresses these changes, restoring comfort and quality of life.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/>
        <polyline points="17 6 23 6 23 12"/>
      </svg>
    ),
  },
  {
    title: 'Vulvar Rejuvenation',
    desc: 'Treatment can extend to the vulvar area and labia minora, addressing laxity, discolouration, and tissue changes to restore a more youthful, comfortable appearance and function.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M12 2a10 10 0 0 1 10 10c0 5.52-4.48 10-10 10S2 17.52 2 12"/>
        <path d="M12 6v6l4 2"/>
      </svg>
    ),
  },
];

const AREAS_TREATED = [
  'Vaginal canal',
  'Vaginal introitus',
  'Vulvar area',
  'Labia minora',
  'Perineum',
  'External genitalia',
];

const SYMPTOMS_ADDRESSED = [
  'Laxity and looseness',
  'Dryness and atrophy',
  'Stress incontinence',
  'Reduced sensitivity',
  'Discomfort and irritation',
  'Post-menopause changes',
];

const CLINIC_REASONS = [
  { n: '01', text: 'All-in-one clinic with specialist medical and women\'s health expertise.' },
  { n: '02', text: 'Highly trained, compassionate clinicians experienced in intimate health.' },
  { n: '03', text: 'Customised treatments based on individual assessment and goals.' },
  { n: '04', text: 'Advanced non-ablative laser technology delivering proven clinical results.' },
  { n: '05', text: 'Completely confidential consultations and treatments in a discreet environment.' },
  { n: '06', text: 'Comprehensive aftercare, follow-up support, and ongoing intimate health guidance.' },
];

const FAQS = [
  {
    question: 'What is laser vaginal rejuvenation and how does it work?',
    answer:
      'Laser vaginal rejuvenation uses non-ablative fractional laser energy delivered to the vaginal mucosa to stimulate collagen and elastin production. This thickens the vaginal epithelium, improves moisture retention, and restores tissue tone. The controlled laser energy triggers the body\'s natural healing response, progressively remodelling tissue over several weeks.',
  },
  {
    question: 'Is laser vaginal rejuvenation painful or uncomfortable?',
    answer:
      'No. The procedure is performed without anaesthesia and is well tolerated by most women. Patients typically describe mild warmth or a gentle sensation during treatment. Any mild sensitivity following the session usually resolves within 24 to 48 hours without any specific management.',
  },
  {
    question: 'How many sessions are needed and how far apart should they be?',
    answer:
      'A course of 3 sessions is recommended for optimal results, each spaced 4 to 6 weeks apart. This allows each treatment to build on the collagen stimulation of the previous session. Some women with mild concerns see significant improvement after just 1 to 2 sessions. Your clinician will tailor the protocol to your individual needs during your consultation.',
  },
  {
    question: 'When will I see results from treatment?',
    answer:
      'Initial improvements in comfort, moisture, and sensitivity are often noticed within the first 2 to 4 weeks as collagen production begins. Continued improvement builds over each session, with full results typically evident 6 to 8 weeks after the final treatment as the collagen remodelling process completes.',
  },
  {
    question: 'Is there any downtime after laser vaginal rejuvenation?',
    answer:
      'There is no significant downtime. You can return to work and normal daily activities immediately after treatment. A brief period of sexual abstinence of 5 days is recommended following each session to allow optimal tissue healing. Tampons, douches, and swimming should be avoided for 5 to 7 days post-treatment.',
  },
  {
    question: 'Who is suitable for laser vaginal rejuvenation?',
    answer:
      'The treatment is suitable for women experiencing vaginal laxity after childbirth, menopause-related dryness or atrophy, mild stress urinary incontinence, or reduced sensation. It is not suitable during pregnancy, with active vaginal infection, or for those with gynaecological malignancy or prolapse requiring surgery. A full medical assessment is conducted before any treatment.',
  },
];

const RELATED = [
  { title: "Women's Health",     href: '/treatments/womens-health-leicester',    desc: 'Comprehensive care for women\'s health at every life stage.' },
  { title: 'Menopause & HRT',   href: '/treatments/menopause-hrt-leicester',    desc: 'Expert menopause management and hormone replacement therapy.' },
  { title: 'Health Screening',  href: '/treatments/health-screening-leicester', desc: 'Proactive health checks and screening for women\'s wellbeing.' },
  { title: 'Private GP',        href: '/treatments/private-gp-leicester',       desc: 'Confidential GP appointments for all health concerns.' },
];

/* ── Page component ───────────────────────────────────────────── */
export default function LaserVaginalPage() {
  const [showAllFaqs, setShowAllFaqs] = useState(false);

  return (
    <>
      {/* ════════════════════════════════════════
          1. HERO
      ════════════════════════════════════════ */}
      <section
        className={styles.hero}
        aria-label="Laser Vaginal Rejuvenation Leicester, hero"
        data-section-theme="dark"
      >
        {/* Breadcrumb, pinned to top of hero */}
        <div className={styles.heroBreadcrumb}>
          <Container>
            <Breadcrumb
              theme="dark"
              items={[
                { label: 'Treatments', href: '/treatments' },
                { label: 'Laser Vaginal Rejuvenation' },
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
            {/* Left: text */}
            <div className={styles.heroLeft}>
              <m.span className={styles.heroCategory} variants={fadeUp}>
                Women&apos;s Health
              </m.span>

              <m.h1 className={styles.heroTitle} variants={fadeUp}>
                Laser Vaginal Rejuvenation in Leicester
              </m.h1>

              <m.p className={styles.heroDesc} variants={fadeUp}>
                Non-Surgical Intimate Wellness &amp; Vaginal Health Treatment , restore comfort,
                confidence, and quality of life without surgery or downtime.
              </m.p>

              <m.div className={styles.heroCtas} variants={fadeUp}>
                <BookConsultationButton className={styles.heroCtaPrimary}>
                  Book Appointment
                </BookConsultationButton>
              </m.div>

              {/* Review badges */}
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
                  Led by experienced women&apos;s health doctors
                </span>
                <span className={styles.heroTrustDivider} aria-hidden="true" />
                <span className={styles.heroTrustItem}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"/>
                  </svg>
                  Trusted by patients across Leicester
                </span>
                <span className={styles.heroTrustDivider} aria-hidden="true" />
                <span className={styles.heroTrustItem}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <circle cx="12" cy="12" r="9.5"/>
                    <path d="M12 7.5v9M7.5 12h9"/>
                  </svg>
                  Discreet, compassionate &amp; confidential care
                </span>
              </m.div>
            </div>

            {/* Right: image */}
            <m.div className={styles.heroImageWrap} variants={fadeUp}>
              <Image
                src="/Hero Section Laser Vaginal Rejuvenation.jpg"
                alt="Laser Vaginal Rejuvenation treatment at The One Clinic Leicester"
                fill
                priority
                className={styles.heroImage}
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              {/* Subtle bottom-fade to blend with section */}
              <div className={styles.heroImageFade} aria-hidden="true" />
            </m.div>
          </m.div>
        </Container>
      </section>

      {/* ════════════════════════════════════════
          2. WHAT IS LASER VAGINAL REJUVENATION?
      ════════════════════════════════════════ */}
      <Section variant="light" data-section-theme="light" className={styles.sectionGray}>
        <Container>
          <m.div
            className={styles.whatIsGrid}
            variants={stagger(0.12)}
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
          >
            {/* Left: text */}
            <m.div className={styles.whatIsContent} variants={stagger(0.12)}>
              <m.div className={styles.whatIsTextGroup} variants={fadeUp}>
                <p className={styles.eyebrowDark}>About This Treatment</p>
                <h2 className={styles.combinedHeading}>What is Laser Vaginal Rejuvenation?</h2>
                <p className={styles.combinedDesc}>
                  Laser vaginal rejuvenation is a non-surgical intimate wellness treatment that
                  uses a non-ablative fractional laser to stimulate collagen and elastin production
                  within vaginal tissue. The treatment improves vaginal laxity, dryness, mild
                  incontinence, and reduced sensation , all common concerns women face after
                  childbirth, menopause, or as part of natural ageing.
                </p>
                <p className={styles.combinedDesc}>
                  Safe, discreet, and requiring no downtime, each 20 to 30-minute session
                  delivers progressive improvements in tissue tone, moisture retention, and
                  intimate comfort without surgery, anaesthesia, or recovery time.
                </p>
              </m.div>
              <m.div className={styles.combinedCtaWrapper} variants={fadeUp}>
                <BookConsultationButton className={styles.combinedCta}>
                  Book Your Consultation
                </BookConsultationButton>
              </m.div>
            </m.div>

            {/* Right: image panel */}
            <m.div className={styles.whatIsVideoWrap} variants={fadeUp}>
              <Image
                src="/What is Laser Vaginal Rejuvenation.jpg"
                alt="Women's health doctor at The One Clinic Leicester"
                fill
                className={styles.whatIsVideoFrame}
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </m.div>
          </m.div>
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
          <m.div
            className={styles.sectionHeaderCentre}
            variants={stagger(0.1)}
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
          >
            <m.p className={styles.eyebrowDark} variants={fadeUp}>Quick Facts</m.p>
            <m.h2 className={styles.headingDark} variants={fadeUp}>
              Laser Vaginal Rejuvenation at a Glance
            </m.h2>
          </m.div>

          <m.div
            className={styles.glanceStandaloneGrid}
            variants={stagger(0.08)}
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
          >
            {AT_A_GLANCE.map((item) => (
              <m.div key={item.label} className={styles.glanceCard} variants={fadeUp}>
                <span className={styles.glanceIcon}>{item.icon}</span>
                <span className={styles.glanceLabel}>{item.label}</span>
                <span className={styles.glanceValue}>{item.value}</span>
              </m.div>
            ))}
          </m.div>
        </Container>
      </Section>

      {/* ════════════════════════════════════════
          4. OUR APPROACH
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
              Our Approach
            </m.p>
            <m.h2 className={styles.headingLight} variants={fadeUp}>
              Our Laser Vaginal Approach
            </m.h2>
            <m.p className={styles.combinationIntroText} variants={fadeUp}>
              At The One Clinic, we combine clinical expertise with advanced laser technology to
              deliver truly personalised intimate wellness care. Our approach ensures safety,
              discretion, and outstanding results in every session.
            </m.p>
          </m.div>

          <m.div
            className={styles.techCardsGrid}
            variants={stagger(0.1)}
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
          >
            {APPROACH_CARDS.map((card) => (
              <m.div
                key={card.title}
                className={styles.techCard}
                variants={fadeUp}
                whileHover={{ y: -8, transition: { type: 'spring', stiffness: 280, damping: 18 } }}
              >
                <span className={styles.techCardEyebrow}>{card.eyebrow}</span>
                <h3 className={styles.techCardTitle}>{card.title}</h3>
                <p className={styles.techCardDesc}>{card.desc}</p>
              </m.div>
            ))}
          </m.div>

          <m.div
            className={styles.finalResultsBanner}
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
          >
            <p className={styles.finalResultsEyebrow}>Combined Results</p>
            <p className={styles.finalResultsText}>
              When delivered as a complete treatment course, our laser vaginal rejuvenation
              programme addresses laxity, dryness, incontinence, and reduced sensation in a
              single personalised plan , delivering comprehensive intimate wellness with no
              surgery and no downtime.
            </p>
          </m.div>
        </Container>
      </Section>

      {/* ════════════════════════════════════════
          5. TREATMENT JOURNEY
      ════════════════════════════════════════ */}
      <Section variant="light" data-section-theme="light" className={styles.journeySection}>
        <Container>
          <m.div
            className={styles.sectionHeaderCentre}
            variants={stagger(0.1)}
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
          >
            <m.p className={styles.eyebrowDark} variants={fadeUp}>
              What to Expect
            </m.p>
            <m.h2 className={styles.headingDark} variants={fadeUp}>
              Your Treatment Journey
            </m.h2>
          </m.div>

          <m.ol
            className={styles.journeyList}
            variants={stagger(0.12)}
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
            aria-label="Laser vaginal rejuvenation treatment journey steps"
          >
            {JOURNEY_STEPS.map((step) => (
              <m.li key={step.n} className={styles.journeyStep} variants={fadeUp}>
                <div className={styles.stepLeft}>
                  <div className={styles.stepNumCircle} aria-hidden="true">{step.n}</div>
                  <div className={styles.stepConnector} aria-hidden="true" />
                </div>
                <div className={styles.stepBody}>
                  <h3 className={styles.stepTitle}>{step.title}</h3>
                  <p className={styles.stepDesc}>{step.desc}</p>
                </div>
              </m.li>
            ))}
          </m.ol>
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
          <m.div
            className={styles.sectionHeaderCentre}
            variants={stagger(0.1)}
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
          >
            <m.h2 className={styles.headingDark} variants={fadeUp}>
              Laser Vaginal Rejuvenation Benefits
            </m.h2>
          </m.div>

          <m.div
            className={styles.treatedBenefitsGrid}
            variants={stagger(0.08)}
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
          >
            {BENEFITS.map((b) => (
              <m.div
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
              </m.div>
            ))}
          </m.div>
        </Container>
      </Section>

      {/* ════════════════════════════════════════
          7. ELIGIBILITY
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
              Is This Right for You?
            </m.p>
            <m.h2 className={styles.headingLight} variants={fadeUp}>
              Who Is Suitable for Laser Vaginal Rejuvenation?
            </m.h2>
          </m.div>

          <m.div
            className={styles.eligibilityWrap}
            variants={stagger(0.1)}
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
          >
            <m.p className={styles.eligibilityIntro} variants={fadeUp}>
              This treatment is suitable for women experiencing:
            </m.p>
            <m.ul className={styles.eligibilityList} role="list" variants={stagger(0.1)}>
              {ELIGIBILITY_SUITABLE.map((item) => (
                <m.li key={item} className={styles.eligibilityItem} variants={fadeUp}>
                  <span className={styles.eligibilityCheck} aria-hidden="true">
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <polyline points="2,7 5.5,10.5 12,3.5" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </span>
                  <span>{item}</span>
                </m.li>
              ))}
            </m.ul>
            <m.p className={styles.eligibilityIntro} variants={fadeUp}>
              Treatment is not suitable for:
            </m.p>
            <m.ul className={styles.eligibilityList} role="list" variants={stagger(0.1)}>
              {ELIGIBILITY_NOT_SUITABLE.map((item) => (
                <m.li key={item} className={styles.eligibilityItem} variants={fadeUp}>
                  <span className={styles.eligibilityCheck} aria-hidden="true">
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <line x1="3" y1="3" x2="11" y2="11" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round"/>
                      <line x1="11" y1="3" x2="3" y2="11" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round"/>
                    </svg>
                  </span>
                  <span>{item}</span>
                </m.li>
              ))}
            </m.ul>
            <m.p className={styles.eligibilityClosing} variants={fadeUp}>
              A full medical assessment is conducted during your consultation to confirm your suitability before any treatment begins.
            </m.p>
            <m.div variants={fadeUp}>
              <BookConsultationButton className={`${styles.combinedCta} ${styles.ctaWhiteInvert}`}>
                Book Your Consultation
              </BookConsultationButton>
            </m.div>
          </m.div>
        </Container>
      </Section>

      {/* ════════════════════════════════════════
          8. HOW IT WORKS , THE SCIENCE
      ════════════════════════════════════════ */}
      <Section variant="light" data-section-theme="light" className={styles.howSection}>
        <Container>
          <m.div
            className={styles.sectionHeaderCentre}
            variants={stagger(0.1)}
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
          >
            <m.h2 className={styles.headingDark} variants={fadeUp}>
              How Does Laser Vaginal Rejuvenation Work?
            </m.h2>
          </m.div>

          <m.div
            className={styles.howTextGrid}
            variants={stagger(0.1)}
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
          >
            <m.p className={styles.howPara} variants={fadeUp}>
              Laser vaginal rejuvenation uses non-ablative fractional laser energy delivered
              precisely to the vaginal mucosa. The controlled thermal stimulus penetrates the
              vaginal epithelium without ablating the surface, triggering a natural healing
              cascade within the submucosal connective tissue.
            </m.p>
            <m.p className={styles.howPara} variants={fadeUp}>
              This controlled thermal response activates fibroblasts to produce new collagen and
              elastin, progressively thickening the epithelium and improving moisture retention.
              The result is visibly improved tissue tone, restored natural lubrication, and
              enhanced sensation , all achieved without surgery or significant downtime.
            </m.p>
          </m.div>

          <m.div
            className={styles.howCoversWrap}
            variants={stagger(0.08)}
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
          >
            <m.p className={styles.howCoversLabel} variants={fadeUp}>The Science Behind the Treatment</m.p>
            <m.ul className={styles.howCoversList} role="list" variants={stagger(0.08)}>
              {[
                'Non-ablative fractional laser energy',
                'Stimulates collagen & elastin production',
                'Thickens vaginal epithelium',
                'Improves tissue moisture retention',
                'Enhances blood flow & sensation',
                'Progressive collagen remodelling over weeks',
              ].map((item) => (
                <m.li key={item} className={styles.howCoversItem} variants={fadeUp}>
                  <span className={styles.howCoversCheck} aria-hidden="true">
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                      <polyline points="2,6 5,9 10,3" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </span>
                  {item}
                </m.li>
              ))}
            </m.ul>
          </m.div>
        </Container>
      </Section>

      {/* ════════════════════════════════════════
          9. RESULTS, AFTERCARE & SIDE EFFECTS
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
              Post-Treatment
            </m.p>
            <m.h2 className={styles.headingLight} variants={fadeUp}>
              Results, Aftercare &amp; Side Effects
            </m.h2>
          </m.div>

          <m.div
            className={styles.resultsAfterGrid}
            variants={stagger(0.1)}
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
          >
            {/* Card 1 , Results Timeline */}
            <m.div className={styles.resultsAfterCard} variants={fadeUp}>
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
                Initial improvements in comfort and moisture are often noticed within 2 to 4
                weeks as new collagen begins to form. Tissue continues to improve over the
                treatment course, with full results typically visible by 6 to 8 weeks after
                the final session.
              </p>
              <div className={styles.resultsAfterCardSpacer} />
              <p className={styles.resultsAfterCardNote}>
                Results are progressive and long-lasting. A maintenance session every 12 to
                18 months can extend the benefits for ongoing intimate wellness.
              </p>
            </m.div>

            {/* Card 2 , Side Effects */}
            <m.div className={styles.resultsAfterCard} variants={fadeUp}>
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
                Laser vaginal rejuvenation is well-tolerated and safe. Most patients experience
                only mild, temporary effects:
              </p>
              <ul className={styles.resultsAfterCardList} role="list">
                {[
                  'Mild warmth or slight sensitivity for 24 to 48 hours',
                  'Minimal discharge in the first few days',
                  'Mild swelling or tenderness in some cases',
                ].map((item) => (
                  <li key={item} className={styles.resultsAfterCardListItem}>
                    <span className={styles.resultsAfterDot} aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
              <div className={styles.resultsAfterCardSpacer} />
              <p className={styles.resultsAfterCardNote}>
                Serious complications are extremely rare. All treatments are performed by
                experienced clinicians following a thorough pre-treatment assessment.
              </p>
            </m.div>

            {/* Card 3 , Aftercare */}
            <m.div className={styles.resultsAfterCard} variants={fadeUp}>
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
                  'Abstain from sexual intercourse for 5 days post-treatment',
                  'Avoid tampons, douches, and swimming for 5 to 7 days',
                  'Wear comfortable, breathable cotton underwear',
                  'Follow any specific aftercare instructions from your clinician',
                ].map((item) => (
                  <li key={item} className={styles.resultsAfterCardListItem}>
                    <span className={styles.resultsAfterDot} aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
            </m.div>
          </m.div>
        </Container>
      </Section>

      {/* ════════════════════════════════════════
          10. CONDITIONS WE ADDRESS
      ════════════════════════════════════════ */}
      <Section variant="light" data-section-theme="light" className={styles.whiteBgSection}>
        <div className={styles.whiteBgWrap} aria-hidden="true">
          <Image src="/bg-image-white.png" alt="" fill className={styles.whiteBgImg} sizes="100vw" />
        </div>
        <Container className={styles.whiteBgContent}>
          <m.div
            className={styles.sectionHeaderCentre}
            variants={stagger(0.1)}
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
          >
            <m.p className={styles.eyebrowDark} variants={fadeUp}>
              Intimate Wellness
            </m.p>
            <m.h2 className={styles.headingDark} variants={fadeUp}>
              Conditions We Address
            </m.h2>
            <m.p className={styles.beforeAfterSubheading} variants={fadeUp}>
              Laser vaginal rejuvenation at The One Clinic targets the intimate health concerns
              most commonly experienced by women at every stage of life.
            </m.p>
          </m.div>

          <m.div
            className={styles.treatedBenefitsGrid}
            variants={stagger(0.08)}
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
          >
            {CONDITIONS_TREATED.map((c) => (
              <m.div
                key={c.title}
                className={styles.treatedBenefitCard}
                variants={fadeUp}
                whileHover={{ y: -8, transition: { type: 'spring', stiffness: 280, damping: 18 } }}
              >
                <span className={styles.treatedBenefitIconWrap} aria-hidden="true">
                  {c.icon}
                </span>
                <h3 className={styles.treatedBenefitTitle}>{c.title}</h3>
                <p className={styles.treatedBenefitDesc}>{c.desc}</p>
              </m.div>
            ))}
          </m.div>
        </Container>
      </Section>

      {/* ════════════════════════════════════════
          11. PATIENT REVIEWS
      ════════════════════════════════════════ */}
      <Testimonials />

      {/* ════════════════════════════════════════
          12. CTA BANNER
      ════════════════════════════════════════ */}
      <section className={styles.ctaBanner} data-section-theme="dark" aria-label="Book laser vaginal rejuvenation consultation">
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
          <m.div
            className={styles.ctaBannerContent}
            variants={stagger(0.12)}
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
          >
            <m.h2 className={styles.ctaBannerHeading} variants={fadeUp}>
              Reclaim Your Confidence &amp; Comfort.
            </m.h2>
            <m.p className={styles.ctaBannerSub} variants={fadeUp}>
              Let our experts create your personalised laser vaginal rejuvenation plan!
            </m.p>
            <m.div variants={fadeUp}>
              <BookConsultationButton className={styles.ctaBannerBtn}>
                Book Consultation
              </BookConsultationButton>
            </m.div>
          </m.div>
        </Container>
      </section>

      {/* ════════════════════════════════════════
          13. TREATMENT AREAS
      ════════════════════════════════════════ */}
      <Section variant="dark" data-section-theme="dark" className={styles.conditionsSection}>
        <Container>
          <m.div
            className={styles.sectionHeaderCentre}
            variants={stagger(0.1)}
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
          >
            <m.p className={styles.eyebrowLight} variants={fadeUp}>
              Treatment Areas
            </m.p>
            <m.h2 className={styles.headingLight} variants={fadeUp}>
              Areas Treated &amp; Symptoms Addressed
            </m.h2>
            <m.p className={styles.conditionsIntro} variants={fadeUp}>
              Our laser vaginal rejuvenation treatment can be applied to several intimate areas
              and effectively targets a wide range of symptoms that affect women&apos;s intimate
              health and quality of life.
            </m.p>
          </m.div>

          <m.div
            className={styles.areasColumns}
            variants={stagger(0.1)}
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
          >
            <m.div
              className={styles.areasGroup}
              variants={fadeUp}
              whileHover={{ y: -6, transition: { type: 'spring', stiffness: 280, damping: 20 } }}
            >
              <p className={styles.areasGroupLabel}>Areas Treated</p>
              <ul className={styles.areasGroupList} role="list">
                {AREAS_TREATED.map((area) => (
                  <li key={area} className={styles.areasGroupItem}>
                    <span className={styles.areasItemDot} aria-hidden="true" />
                    {area}
                  </li>
                ))}
              </ul>
            </m.div>

            <m.div
              className={styles.areasGroup}
              variants={fadeUp}
              whileHover={{ y: -6, transition: { type: 'spring', stiffness: 280, damping: 20 } }}
            >
              <p className={styles.areasGroupLabel}>Symptoms Addressed</p>
              <ul className={styles.areasGroupList} role="list">
                {SYMPTOMS_ADDRESSED.map((symptom) => (
                  <li key={symptom} className={styles.areasGroupItem}>
                    <span className={styles.areasItemDot} aria-hidden="true" />
                    {symptom}
                  </li>
                ))}
              </ul>
            </m.div>
          </m.div>
        </Container>
      </Section>

      {/* ════════════════════════════════════════
          14. BEST LEICESTER EXPERIENCE
      ════════════════════════════════════════ */}
      <Section variant="light" data-section-theme="light" className={styles.clinicIntroSection}>
        <Container>
          <m.div
            className={styles.clinicIntroBody}
            variants={stagger(0.12)}
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
          >
            <m.div className={styles.clinicIntroLeft} variants={fadeUp}>
              <p className={styles.eyebrowDark}>Laser Vaginal Rejuvenation</p>
              <h2 className={styles.combinedHeading}>
                Best Laser Vaginal Rejuvenation<br />Leicester Experience
              </h2>
            </m.div>
            <m.p className={styles.clinicIntroDesc} variants={fadeUp}>
              Experience the highest standard of laser vaginal rejuvenation in Leicester at The
              One Clinic. Our specialist women&apos;s health team combines clinical expertise with
              advanced laser technology to deliver safe, discreet, and highly effective intimate
              wellness treatments. Every patient receives a fully personalised care plan, designed
              around their specific concerns and goals, with the utmost respect for their privacy
              and dignity throughout.
            </m.p>
          </m.div>
        </Container>
      </Section>

      {/* ════════════════════════════════════════
          15. COST BANNER
      ════════════════════════════════════════ */}
      <section className={styles.costBanner} data-section-theme="dark" aria-label="Laser vaginal rejuvenation cost">
        <Container>
          <m.div
            className={styles.costBannerInner}
            variants={stagger(0.12)}
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
          >
            <m.p className={styles.costBannerEyebrow} variants={fadeUp}>
              Laser Vaginal Rejuvenation Cost at The One Clinic
            </m.p>
            <m.p className={styles.costBannerPrice} variants={fadeUp}>
              Treatment Starts From £400 per Session
            </m.p>
            <m.p className={styles.costBannerNote} variants={fadeUp}>
              Course pricing is available for the recommended 3-session programme. The final
              price depends on your personalised treatment plan and will be discussed during
              your confidential consultation with our specialist.
            </m.p>
            <m.div variants={fadeUp}>
              <BookConsultationButton className={styles.ctaBannerBtn}>
                Book A Consultation
              </BookConsultationButton>
            </m.div>
          </m.div>
        </Container>
      </section>

      {/* ════════════════════════════════════════
          16. WHY CHOOSE THE ONE CLINIC
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
            <m.h2 className={styles.headingLight} variants={fadeUp}>
              Why Choose The One Clinic For Laser Vaginal Rejuvenation
            </m.h2>
          </m.div>

          <m.div
            className={styles.clinicReasonsGrid}
            variants={stagger(0.08)}
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
          >
            {CLINIC_REASONS.map((r) => (
              <m.div
                key={r.n}
                className={styles.clinicReasonCard}
                variants={fadeUp}
                whileHover={{ y: -6, transition: { type: 'spring', stiffness: 280, damping: 20 } }}
              >
                <span className={styles.clinicReasonNumber}>{r.n}</span>
                <p className={styles.clinicReasonText}>{r.text}</p>
              </m.div>
            ))}
          </m.div>
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
            <m.div
              className={styles.sectionHeaderCentre}
              variants={stagger(0.1)}
              initial="hidden"
              whileInView="show"
              viewport={VIEWPORT}
            >
              <m.p className={styles.eyebrowLight} variants={fadeUp}>FAQ</m.p>
              <m.h2 className={styles.headingLight} variants={fadeUp}>
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
            </m.div>
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
          <m.div
            className={styles.sectionHeaderCentre}
            variants={stagger(0.1)}
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
          >
            <m.p className={styles.eyebrowDark} variants={fadeUp}>
              Explore More
            </m.p>
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
            {RELATED.map((r) => (
              <m.div key={r.title} variants={fadeUp}>
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
              </m.div>
            ))}
          </m.div>
        </Container>
      </Section>

      {/* ════════════════════════════════════════
          21. FINAL CTA
      ════════════════════════════════════════ */}
      <FinalCTA />
    </>
  );
}
