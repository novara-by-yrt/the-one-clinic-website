'use client';

import { useState } from 'react';
import Image              from 'next/image';
import { motion }         from 'framer-motion';
import Section            from '@/components/ui/Section';
import Container          from '@/components/ui/Container';
import Accordion          from '@/components/ui/Accordion';
import BookConsultationButton from '@/components/ui/BookConsultationButton';
import TrustBadges        from '@/components/ui/TrustBadges';
import Breadcrumb         from '@/components/ui/Breadcrumb';
import LeadForm           from '@/components/sections/LeadForm';
import MeetTheExperts     from '@/components/sections/MeetTheExperts';
import Testimonials       from '@/components/sections/Testimonials';
import TrustStrip         from '@/components/sections/TrustStrip';
import FinalCTA           from '@/components/sections/FinalCTA';
import { fadeUp, stagger, VIEWPORT } from '@/lib/motion';
import styles             from './page.module.css';

/* ── Static data ───────────────────────────────────────────────── */

const AT_A_GLANCE = [
  {
    label: 'Procedure Duration',
    value: '20–45 minutes',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
      </svg>
    ),
  },
  {
    label: 'Treatment Frequency',
    value: 'One-off procedure',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>
      </svg>
    ),
  },
  {
    label: 'Recovery Time',
    value: '1–3 days',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
      </svg>
    ),
  },
  {
    label: 'Suitable For',
    value: 'Grades I–III',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/>
      </svg>
    ),
  },
  {
    label: 'Treatment Cost',
    value: 'From £300',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
      </svg>
    ),
  },
  {
    label: 'Appointment Type',
    value: 'In-clinic',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M3 21h18"/><path d="M5 21V7l8-4v4"/><path d="M19 21V11l-6-4"/><path d="M9 21v-4h6v4"/>
      </svg>
    ),
  },
];

const PROCEDURE_STEPS = [
  {
    num: '01',
    title: 'Examination & Assessment',
    desc: 'Your doctor examines and grades the haemorrhoids to determine the most appropriate technique. Your medical history, symptoms, and previous treatments are reviewed in full before any procedure is planned.',
  },
  {
    num: '02',
    title: 'Surgical Removal',
    desc: 'A local anaesthetic is administered to fully numb the area. The haemorrhoidal tissue is then precisely excised or ligated with minimal trauma to surrounding tissue, following established surgical technique.',
  },
  {
    num: '03',
    title: 'Recovery & Aftercare',
    desc: 'You leave the clinic with a sterile dressing and a written aftercare plan. A follow-up appointment is scheduled to monitor healing and address any concerns during your recovery.',
  },
];

const TREATMENT_BENEFITS = [
  {
    title: 'Permanent Symptom Relief',
    desc: 'Surgical removal addresses the source of the problem rather than masking symptoms, providing lasting freedom from pain, bleeding, and prolapse.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>
      </svg>
    ),
  },
  {
    title: 'No Hospital Stay Required',
    desc: 'The procedure is carried out under local anaesthetic at our Leicester clinic. No general anaesthesia, no overnight admission, and no lengthy NHS waiting list.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M3 21h18"/><path d="M5 21V7l8-4v4"/><path d="M19 21V11l-6-4"/>
      </svg>
    ),
  },
  {
    title: 'Expert Surgical Care',
    desc: 'All procedures are performed by our GMC-registered doctors, who bring extensive experience in minor surgical techniques and a meticulous approach to patient safety.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
      </svg>
    ),
  },
  {
    title: 'Fast Return to Daily Life',
    desc: 'Most patients are back to light daily activities within 24 to 48 hours. Our team provides clear guidance to make your recovery as smooth and comfortable as possible.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/>
      </svg>
    ),
  },
  {
    title: 'Discreet & Compassionate Care',
    desc: 'We understand this is a sensitive condition. Every patient is treated with complete discretion, dignity, and empathy throughout their consultation and procedure.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
      </svg>
    ),
  },
  {
    title: 'Comprehensive Aftercare Included',
    desc: 'Every procedure includes a full written aftercare plan, dietary guidance, and a scheduled follow-up appointment to monitor your healing and recovery.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/>
      </svg>
    ),
  },
];

const ELIGIBILITY = [
  'Experiencing persistent bright red bleeding during or after bowel movements',
  'Suffering from pain, itching, or discomfort that affects your day-to-day life',
  'Have a prolapsed haemorrhoid that does not retract on its own',
  'Have already tried conservative measures such as dietary changes and topical creams without lasting relief',
  'Seeking a permanent solution to recurring haemorrhoid symptoms',
];

const CAUSES = [
  {
    n: '01',
    title: 'Chronic Constipation & Straining',
    desc: 'Repeated straining during bowel movements increases pressure in the veins of the lower rectum, causing them to swell and form haemorrhoids over time.',
  },
  {
    n: '02',
    title: 'Low-Fibre Diet',
    desc: 'A diet lacking in fibre produces hard, difficult-to-pass stools. This leads to straining, which is a primary driver of haemorrhoid development and worsening.',
  },
  {
    n: '03',
    title: 'Prolonged Sitting',
    desc: 'Spending long periods seated, particularly on the toilet, places sustained pressure on the rectal veins and can contribute to the formation of haemorrhoids.',
  },
  {
    n: '04',
    title: 'Pregnancy & Childbirth',
    desc: 'The growing uterus during pregnancy increases pressure on the pelvic veins. Straining during labour further elevates the risk of developing haemorrhoids.',
  },
  {
    n: '05',
    title: 'Ageing',
    desc: 'The connective tissue supporting the veins of the rectum and anus weakens naturally with age, making haemorrhoids more likely to develop or prolapse.',
  },
];

const CLINIC_REASONS = [
  { n: '01', text: 'Experienced, GMC-registered doctors performing all procedures with meticulous surgical technique.' },
  { n: '02', text: 'Local anaesthetic ensuring a completely pain-free experience throughout the procedure.' },
  { n: '03', text: 'No hospital stay — treated and discharged the same day in a private clinical setting.' },
  { n: '04', text: 'Discreet, compassionate care in a confidential, comfortable clinical environment.' },
  { n: '05', text: 'Comprehensive written aftercare plan and follow-up appointment scheduled with every procedure.' },
  { n: '06', text: 'Convenient Leicester location with flexible appointment times to fit your schedule.' },
];

const FAQS = [
  {
    question: 'What is a haemorrhoidectomy and what does it involve?',
    answer:
      'A haemorrhoidectomy is a surgical procedure to remove enlarged or problematic haemorrhoids. Under local anaesthetic, the haemorrhoidal tissue is carefully excised using precise surgical technique. The wound may be sutured (closed haemorrhoidectomy) or left to heal naturally (open haemorrhoidectomy) depending on which approach is most suitable for your specific case.',
  },
  {
    question: 'Will the procedure be painful?',
    answer:
      'No. A local anaesthetic ring block is administered before the procedure begins, completely numbing the area. You should feel no pain during treatment, though you may experience mild pressure or sensation. Some post-procedure soreness is normal for a few days, and our team will provide clear pain management guidance and aftercare advice to keep you comfortable during recovery.',
  },
  {
    question: 'How long does the procedure take?',
    answer:
      'The procedure typically takes between 20 and 45 minutes depending on the number and grade of haemorrhoids being treated, plus the technique used. You will be able to leave the clinic shortly after treatment is complete. We recommend arranging transport home to ensure your comfort.',
  },
  {
    question: 'What aftercare is required following haemorrhoid removal?',
    answer:
      'Following your procedure, you will receive detailed written aftercare instructions. These typically include keeping the area clean and dry, taking warm sitz baths to aid healing, maintaining a high-fibre diet, drinking plenty of water, and avoiding straining. Most patients resume light daily activities within 24 to 48 hours. A follow-up appointment will be arranged to monitor your recovery and address any concerns.',
  },
  {
    question: 'Am I suitable for haemorrhoid removal at The One Clinic?',
    answer:
      'Suitability is assessed during your initial consultation. Most patients with symptomatic Grade I–III haemorrhoids that have not responded to conservative management are good candidates for in-clinic removal. Our doctor will review your medical history, examine the affected area, and discuss which treatment approach is most appropriate for your individual case.',
  },
  {
    question: 'Can haemorrhoids return after surgical removal?',
    answer:
      'The recurrence rate following haemorrhoidectomy is low — typically less than 5–10% when proper aftercare is followed. Maintaining a high-fibre diet, staying well-hydrated, and avoiding straining significantly reduces the risk of new haemorrhoids developing. However, some patients may develop haemorrhoids in different areas if the underlying causes (such as constipation) are not addressed.',
  },
  {
    question: 'When can I return to work after treatment?',
    answer:
      'Most patients can return to light office-based work within 24 to 48 hours. If your job involves heavy lifting, prolonged standing, or sitting, you may need to take longer off — typically one to two weeks. Your doctor will provide specific advice based on your job demands and the procedure performed. A work note can be provided if required.',
  },
  {
    question: 'Do I need a GP referral to be seen at The One Clinic?',
    answer:
      'No, you do not need a GP referral to book a consultation at The One Clinic. However, if you would like your GP to be informed of your treatment, we can write to them following your appointment. Simply book your consultation directly with us, and our team will arrange your appointment at a time that suits you.',
  },
];

/* ── Page component ─────────────────────────────────────────────── */
export default function HaemorrhoidRemovalPage() {
  const [showAllFaqs, setShowAllFaqs] = useState(false);

  return (
    <>
      {/* ════════════════════════════════════════
          1. HERO
      ════════════════════════════════════════ */}
      <section
        className={styles.hero}
        aria-label="Haemorrhoid removal Leicester, hero"
        data-section-theme="dark"
      >
        <div className={styles.heroBreadcrumb}>
          <Container>
            <Breadcrumb
              theme="dark"
              items={[
                { label: 'Treatments', href: '/treatments' },
                { label: 'Haemorrhoid Removal' },
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
                Health &amp; Wellbeing
              </motion.span>

              <motion.h1 className={styles.heroTitle} variants={fadeUp}>
                Haemorrhoid Removal in Leicester
              </motion.h1>

              <motion.p className={styles.heroDesc} variants={fadeUp}>
                Expert in-clinic haemorrhoid removal for lasting relief from pain, bleeding,
                and discomfort — performed by GMC-registered doctors at The One Clinic.
              </motion.p>

              <motion.div className={styles.heroCtas} variants={fadeUp}>
                <BookConsultationButton className={styles.heroCtaPrimary}>
                  Book a Consultation
                </BookConsultationButton>
              </motion.div>

              <motion.div variants={fadeUp}>
                <TrustBadges theme="dark" />
              </motion.div>

              <motion.div className={styles.heroTrust} variants={fadeUp}>
                <span className={styles.heroTrustItem}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                  </svg>
                  GMC-registered doctors
                </span>
                <span className={styles.heroTrustDivider} aria-hidden="true" />
                <span className={styles.heroTrustItem}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M3 21h18"/><path d="M5 21V7l8-4v4"/><path d="M19 21V11l-6-4"/>
                  </svg>
                  No hospital stay required
                </span>
                <span className={styles.heroTrustDivider} aria-hidden="true" />
                <span className={styles.heroTrustItem}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
                  </svg>
                  Same-day procedures available
                </span>
              </motion.div>
            </div>

            {/* Right: image */}
            <motion.div className={styles.heroImageWrap} variants={fadeUp}>
              <Image
                src="/images/Minor Surgery.jpg"
                alt="Haemorrhoid removal procedure at The One Clinic Leicester"
                fill
                priority
                className={styles.heroImage}
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className={styles.heroImageFade} aria-hidden="true" />
            </motion.div>
          </motion.div>
        </Container>
      </section>

      {/* ════════════════════════════════════════
          2. PATIENT REVIEWS
      ════════════════════════════════════════ */}
      <Testimonials />

      {/* ════════════════════════════════════════
          3. AWARDS & ACHIEVEMENTS
      ════════════════════════════════════════ */}
      <TrustStrip />

      {/* ════════════════════════════════════════
          4. WHAT IS HAEMORRHOID REMOVAL?
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
            {/* Left: text + CTA */}
            <motion.div className={styles.whatIsContent} variants={stagger(0.12)}>
              <motion.div className={styles.whatIsTextGroup} variants={fadeUp}>
                <p className={styles.eyebrowDark}>About This Condition</p>
                <h2 className={styles.combinedHeading}>What are Haemorrhoids?</h2>
                <p className={styles.combinedDesc}>
                  Haemorrhoids — commonly known as piles — are swollen veins in the lower
                  rectum or around the anus. They affect approximately 1 in 3 people in the
                  UK at some point in their lives, making them one of the most common
                  colorectal conditions. Symptoms include bright red bleeding, pain, itching,
                  a feeling of fullness, and in more advanced cases, prolapse of tissue
                  beyond the anal canal.
                </p>
                <p className={styles.combinedDesc}>
                  When conservative management — such as dietary changes, topical creams, or
                  sitz baths — fails to provide lasting relief, surgical removal offers a
                  definitive solution. At The One Clinic Leicester, our doctors assess your
                  case thoroughly and recommend the most appropriate procedure for your grade
                  of haemorrhoid and individual circumstances.
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
                alt="Doctor at The One Clinic Leicester consulting a patient"
                fill
                className={styles.whatIsVideoFrame}
                sizes="(max-width: 900px) 100vw, 50vw"
              />
            </motion.div>
          </motion.div>
        </Container>
      </Section>

      {/* ════════════════════════════════════════
          5. AT A GLANCE
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
              Haemorrhoid Removal at a Glance
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
          6. THE PROCEDURE — THREE STEPS
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
            <motion.p className={styles.eyebrowLight} variants={fadeUp}>The Process</motion.p>
            <motion.h2 className={styles.headingLight} variants={fadeUp}>
              What to Expect at Your Appointment
            </motion.h2>
            <motion.p className={styles.combinationIntroText} variants={fadeUp}>
              From your initial assessment through to discharge, every step is handled with
              care, precision, and your comfort in mind.
            </motion.p>
          </motion.div>

          <motion.div
            className={styles.techCardsGrid}
            variants={stagger(0.1)}
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
          >
            {PROCEDURE_STEPS.map((step) => (
              <motion.div key={step.num} className={styles.techCard} variants={fadeUp}>
                <span className={styles.techCardEyebrow}>{step.num}</span>
                <h3 className={styles.techCardTitle}>{step.title}</h3>
                <p className={styles.techCardDesc}>{step.desc}</p>
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
            <p className={styles.finalResultsEyebrow}>After Your Procedure</p>
            <p className={styles.finalResultsText}>
              You will be able to walk out of the clinic on the day. Most patients
              experience significant symptom relief immediately, with full healing
              typically achieved within two to four weeks following the procedure.
            </p>
          </motion.div>
        </Container>
      </Section>

      {/* ════════════════════════════════════════
          7. TREATMENT BENEFITS
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
            <motion.p className={styles.eyebrowDark} variants={fadeUp}>What You Gain</motion.p>
            <motion.h2 className={styles.headingDark} variants={fadeUp}>
              Benefits of Haemorrhoid Removal
            </motion.h2>
          </motion.div>

          <motion.div
            className={styles.treatedBenefitsGrid}
            variants={stagger(0.08)}
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
          >
            {TREATMENT_BENEFITS.map((b) => (
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
          8. IS THIS RIGHT FOR YOU?
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
              When to Consider Surgical Removal
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
              Surgical haemorrhoid removal may be right for you if you are:
            </motion.p>
            <motion.ul className={styles.eligibilityList} role="list" variants={stagger(0.1)}>
              {ELIGIBILITY.map((item) => (
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
            <motion.p className={styles.eligibilityClosing} variants={fadeUp}>
              If any of the above apply to you, book a consultation and our doctor will
              assess whether surgical removal is the right course of action for your case.
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
          9. WHAT CAUSES HAEMORRHOIDS?
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
            <motion.p className={styles.eyebrowDark} variants={fadeUp}>Understanding the Causes</motion.p>
            <motion.h2 className={styles.headingDark} variants={fadeUp}>
              What Causes Haemorrhoids?
            </motion.h2>
          </motion.div>

          <motion.ol
            className={styles.journeyList}
            variants={stagger(0.12)}
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
            aria-label="Common causes of haemorrhoids"
          >
            {CAUSES.map((cause) => (
              <motion.li key={cause.n} className={styles.journeyStep} variants={fadeUp}>
                <div className={styles.stepLeft}>
                  <div className={styles.stepNumCircle} aria-hidden="true">{cause.n}</div>
                  <div className={styles.stepConnector} aria-hidden="true" />
                </div>
                <div className={styles.stepBody}>
                  <h3 className={styles.stepTitle}>{cause.title}</h3>
                  <p className={styles.stepDesc}>{cause.desc}</p>
                </div>
              </motion.li>
            ))}
          </motion.ol>
        </Container>
      </Section>

      {/* ════════════════════════════════════════
          10. HOW DOES THE PROCEDURE WORK?
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
            <motion.p className={styles.eyebrowDark} variants={fadeUp}>The Science</motion.p>
            <motion.h2 className={styles.headingDark} variants={fadeUp}>
              How Does Haemorrhoid Removal Work?
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
              A haemorrhoidectomy involves the surgical excision of enlarged haemorrhoidal
              tissue under local anaesthetic. Once the area is completely numb, the
              haemorrhoid is carefully isolated and removed. The wound may be sutured
              (closed technique) or left to heal naturally (open technique) depending on
              which approach is most appropriate for the size, grade, and location of the
              haemorrhoid.
            </motion.p>
            <motion.p className={styles.howPara} variants={fadeUp}>
              For suitable patients with smaller internal haemorrhoids, rubber band ligation
              may be recommended as an alternative. A small rubber band is placed around the
              base of the haemorrhoid, cutting off its blood supply so that the tissue
              shrinks and separates naturally within a few days. During your consultation,
              your doctor will determine which procedure is most suitable for your
              individual case and explain the process in full before treatment begins.
            </motion.p>
          </motion.div>

          <motion.div
            className={styles.howCoversWrap}
            variants={stagger(0.08)}
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
          >
            <motion.p className={styles.howCoversLabel} variants={fadeUp}>
              Procedures Offered at The One Clinic
            </motion.p>
            <motion.ul className={styles.howCoversList} role="list" variants={stagger(0.08)}>
              {[
                'Haemorrhoidectomy (surgical excision)',
                'Rubber band ligation',
                'Grade I internal haemorrhoids',
                'Grade II internal haemorrhoids',
                'Grade III haemorrhoids',
                'External haemorrhoids (selected cases)',
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
          11. RESULTS, AFTERCARE & SIDE EFFECTS
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
              Results, Aftercare &amp; Side Effects
            </motion.h2>
          </motion.div>

          <motion.div
            className={styles.resultsAfterGrid}
            variants={stagger(0.1)}
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
          >
            {/* Card 1: When Will You See Results? */}
            <motion.div className={styles.resultsAfterCard} variants={fadeUp}>
              <div className={styles.resultsAfterCardHead}>
                <span className={styles.resultsAfterCardIcon} aria-hidden="true">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/>
                  </svg>
                </span>
                <h3 className={styles.resultsAfterCardTitle}>When Will You See Results?</h3>
              </div>
              <p className={styles.resultsAfterCardBody}>
                Symptom relief is often experienced immediately as the problematic tissue is
                removed. Swelling and discomfort gradually reduce over the first one to two
                weeks. Full healing of the surgical wound typically takes two to four weeks
                depending on the technique used and your body's healing response.
              </p>
              <div className={styles.resultsAfterCardSpacer} />
              <p className={styles.resultsAfterCardNote}>
                Long-term results are excellent, with a recurrence rate of less than
                5–10% when proper aftercare is followed and underlying causes are addressed.
              </p>
            </motion.div>

            {/* Card 2: Side Effects */}
            <motion.div className={styles.resultsAfterCard} variants={fadeUp}>
              <div className={styles.resultsAfterCardHead}>
                <span className={styles.resultsAfterCardIcon} aria-hidden="true">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
                  </svg>
                </span>
                <h3 className={styles.resultsAfterCardTitle}>Side Effects</h3>
              </div>
              <p className={styles.resultsAfterCardBody}>
                Haemorrhoid removal is generally very safe. Most patients experience only
                mild, temporary effects in the immediate post-procedure period:
              </p>
              <ul className={styles.resultsAfterCardList} role="list">
                {[
                  'Mild to moderate soreness for 2–5 days',
                  'Slight swelling or bruising around the treated area',
                  'Light bleeding or mucus discharge initially',
                  'Discomfort during bowel movements for a few days',
                ].map((item) => (
                  <li key={item} className={styles.resultsAfterCardListItem}>
                    <span className={styles.resultsAfterDot} aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
              <div className={styles.resultsAfterCardSpacer} />
              <p className={styles.resultsAfterCardNote}>
                Serious complications are rare when procedures are performed by trained,
                experienced doctors. Our team provides clear guidance to minimise discomfort.
              </p>
            </motion.div>

            {/* Card 3: Aftercare Tips */}
            <motion.div className={styles.resultsAfterCard} variants={fadeUp}>
              <div className={styles.resultsAfterCardHead}>
                <span className={styles.resultsAfterCardIcon} aria-hidden="true">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>
                  </svg>
                </span>
                <h3 className={styles.resultsAfterCardTitle}>Aftercare Tips</h3>
              </div>
              <ul className={styles.resultsAfterCardList} role="list">
                {[
                  'Keep the area clean and dry; follow hygiene guidance provided',
                  'Take warm sitz baths (shallow warm baths) 2–3 times daily',
                  'Maintain a high-fibre diet with adequate water intake',
                  'Avoid straining during bowel movements — never force',
                  'Take pain relief as recommended by your doctor',
                  'Attend your scheduled follow-up appointment',
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
          12. CTA BANNER
      ════════════════════════════════════════ */}
      <section className={styles.ctaBanner} data-section-theme="dark" aria-label="Book haemorrhoid removal consultation">
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
              Get Lasting Relief<br />from Haemorrhoids
            </motion.h2>
            <motion.p className={styles.ctaBannerSub} variants={fadeUp}>
              Book your consultation with our expert doctors and take the first step towards
              a pain-free, comfortable life.
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
          13. BEST HAEMORRHOID TREATMENT LEICESTER
      ════════════════════════════════════════ */}
      <Section variant="light" data-section-theme="light">
        <Container>
          <motion.div
            className={styles.clinicIntroBody}
            variants={stagger(0.12)}
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
          >
            <motion.div className={styles.clinicIntroLeft} variants={fadeUp}>
              <p className={styles.eyebrowDark}>Expert Treatment</p>
              <h2 className={styles.combinedHeading}>
                Best Haemorrhoid<br />Treatment Leicester
              </h2>
            </motion.div>
            <motion.p className={styles.clinicIntroDesc} variants={fadeUp}>
              Experience expert haemorrhoid removal in Leicester at The One Clinic. Our
              experienced, GMC-registered doctors deliver safe, effective surgical treatment
              under local anaesthetic with no hospital stay. We combine clinical expertise
              with compassionate, discreet care to help you find lasting relief and regain
              your comfort and confidence.
            </motion.p>
          </motion.div>
        </Container>
      </Section>

      {/* ════════════════════════════════════════
          14. COST BANNER
      ════════════════════════════════════════ */}
      <section className={styles.costBanner} data-section-theme="dark" aria-label="Haemorrhoid removal cost Leicester">
        <Container>
          <motion.div
            className={styles.costBannerInner}
            variants={stagger(0.12)}
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
          >
            <motion.p className={styles.costBannerEyebrow} variants={fadeUp}>
              Haemorrhoid Removal Cost at The One Clinic
            </motion.p>
            <motion.p className={styles.costBannerPrice} variants={fadeUp}>
              From £300
            </motion.p>
            <motion.p className={styles.costBannerNote} variants={fadeUp}>
              Pricing depends on the procedure type, number of haemorrhoids, and complexity
              of your case. A personalised quote will be provided following your initial
              consultation with our doctor.
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
          15. WHY CHOOSE THE ONE CLINIC
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
              Why Us
            </motion.p>
            <motion.h2 className={styles.headingLight} variants={fadeUp}>
              Why Choose The One Clinic for Haemorrhoid Removal
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
          16. MEET THE EXPERT
      ════════════════════════════════════════ */}
      <Section variant="light" data-section-theme="light" className={styles.sectionGray}>
        <Container>
          <motion.div
            className={styles.expertCard}
            variants={stagger(0.1)}
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
          >
            {/* Left: full-bleed photo panel */}
            <motion.div className={styles.expertCardPhotoPanel} variants={fadeUp}>
              <Image
                src="/images/imgi_20_team-thumb-VIRMANI.jpg"
                alt="Dr Sumit Virmani, Co-Founder, The One Clinic"
                fill
                className={styles.expertCardPhoto}
                sizes="(max-width: 768px) 100vw, 420px"
              />
            </motion.div>

            {/* Right: content */}
            <motion.div className={styles.expertCardContent} variants={stagger(0.08)}>
              <motion.p className={styles.eyebrowLight} variants={fadeUp}>
                Meet The Expert
              </motion.p>
              <motion.h2 className={styles.expertCardName} variants={fadeUp}>
                Dr Sumit Virmani
              </motion.h2>

              <motion.div className={styles.expertCardBadges} variants={fadeUp}>
                {['MBBS', 'MRCGP', 'Co-Founder'].map((credential) => (
                  <span key={credential} className={styles.expertCardBadge}>{credential}</span>
                ))}
              </motion.div>

              <motion.p className={styles.expertCardBio} variants={fadeUp}>
                Dr Sumit Virmani is the co-founder of The One Clinic and brings over 15 years
                of medical expertise, with a decade as a trusted local GP. With advanced skills
                in minor surgery and a keen eye for detail, Dr Virmani is passionate about
                patient care and delivering outstanding results.
              </motion.p>

              <motion.p className={styles.expertCardBio} variants={fadeUp}>
                His specialisation in minor surgical procedures including haemorrhoid removal
                combined with his compassionate approach ensures every patient receives safe,
                effective, and dignified care. Dr Virmani continues to combine his ongoing GP
                practice with expert surgical treatment at The One Clinic.
              </motion.p>
            </motion.div>
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
      <Section variant="dark" data-section-theme="dark">
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
            <Accordion items={showAllFaqs ? FAQS : FAQS.slice(0, 4)} theme="dark" />

            {FAQS.length > 4 && (
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
      </Section>

      {/* ════════════════════════════════════════
          19. BOOKING FORM
      ════════════════════════════════════════ */}
      <LeadForm />

      {/* ════════════════════════════════════════
          20. FINAL CTA
      ════════════════════════════════════════ */}
      <FinalCTA />
    </>
  );
}
