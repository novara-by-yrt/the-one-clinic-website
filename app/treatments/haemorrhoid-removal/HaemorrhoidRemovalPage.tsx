'use client';

import Image              from 'next/image';
import { motion }         from 'framer-motion';
import Section            from '@/components/ui/Section';
import Container          from '@/components/ui/Container';
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

/* ── Page component ─────────────────────────────────────────────── */
export default function HaemorrhoidRemovalPage() {
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
          — SECOND HALF COMING NEXT —
          (Results/Aftercare, CTA, Clinic Intro,
           Cost, Why Choose, Expert, FAQ)
      ════════════════════════════════════════ */}

      <LeadForm />
      <FinalCTA />
    </>
  );
}
