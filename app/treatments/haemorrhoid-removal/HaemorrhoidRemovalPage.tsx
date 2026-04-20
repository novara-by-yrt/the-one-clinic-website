'use client';

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

const BENEFITS = [
  {
    title: 'Quick, In-Clinic Procedure',
    desc: 'Haemorrhoid removal is performed under local anaesthetic at our Leicester clinic. No general anaesthesia, no hospital admission, and no lengthy waiting lists.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="12" cy="12" r="10"/>
        <polyline points="12 6 12 12 16 14"/>
      </svg>
    ),
  },
  {
    title: 'Expert Surgical Care',
    desc: 'All procedures are carried out by our GMC-registered doctors with specialist experience in minor surgical techniques, ensuring safe and precise treatment.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
      </svg>
    ),
  },
  {
    title: 'Fast Recovery',
    desc: 'Most patients return to light daily activities within 24 to 48 hours. Our team provides full aftercare guidance to support a smooth and comfortable recovery.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/>
        <polyline points="17 6 23 6 23 12"/>
      </svg>
    ),
  },
  {
    title: 'Long-Lasting Relief',
    desc: 'Surgical removal addresses the root cause of haemorrhoidal symptoms, providing effective long-term relief from pain, bleeding, and discomfort.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M22 11.08V12a10 10 0 11-5.93-9.14"/>
        <polyline points="22 4 12 14.01 9 11.01"/>
      </svg>
    ),
  },
];

const OVERVIEW_POINTS = [
  'Suitable for internal, external, and prolapsed haemorrhoids',
  'Performed under local anaesthetic in a single appointment',
  'Carried out by experienced, GMC-registered doctors',
  'Comprehensive aftercare and follow-up support included',
];

const FAQS = [
  {
    question: 'What is haemorrhoid removal?',
    answer:
      'Haemorrhoid removal (haemorrhoidectomy) is a minor surgical procedure to remove enlarged or problematic haemorrhoids (piles). At The One Clinic, we offer in-clinic procedures under local anaesthetic for suitable cases, providing effective relief from symptoms such as pain, bleeding, prolapse, and discomfort without the need for a hospital stay.',
  },
  {
    question: 'Will the procedure be painful?',
    answer:
      'Local anaesthetic is administered before the procedure, so you should feel no pain during treatment. You may experience some mild discomfort or pressure, and some post-procedure soreness is normal for a few days. Our team will advise on appropriate pain management and aftercare to keep you comfortable during recovery.',
  },
  {
    question: 'How long does the procedure take?',
    answer:
      'The procedure typically takes between 20 and 45 minutes depending on the number and type of haemorrhoids being treated. You will be able to leave the clinic shortly afterwards and are advised to arrange transport home.',
  },
  {
    question: 'What aftercare is required?',
    answer:
      'Following your procedure, you will receive detailed aftercare instructions. These typically include keeping the area clean, taking warm baths to aid healing, maintaining a high-fibre diet, and avoiding straining. A follow-up appointment will be arranged to monitor your recovery and remove any sutures if required.',
  },
  {
    question: 'Am I suitable for haemorrhoid removal at The One Clinic?',
    answer:
      'Suitability is assessed during your initial consultation. Most patients with symptomatic grade I–III haemorrhoids that have not responded to conservative management are good candidates for in-clinic removal. Our doctor will review your medical history, examine the affected area, and recommend the most appropriate treatment for your case.',
  },
];

/* ── Page component ───────────────────────────────────────────── */
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
                Expert haemorrhoid removal in Leicester to relieve pain, bleeding, and discomfort — performed by GMC-registered doctors at The One Clinic.
              </motion.p>

              <motion.div className={styles.heroCtas} variants={fadeUp}>
                <BookConsultationButton className={styles.heroCtaPrimary}>
                  Book Consultation
                </BookConsultationButton>
              </motion.div>

              <motion.div variants={fadeUp}>
                <TrustBadges theme="dark" />
              </motion.div>

              <motion.div className={styles.heroTrust} variants={fadeUp}>
                <span className={styles.heroTrustItem}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"/>
                    <path d="M4.5 20.118a7.5 7.5 0 0115 0"/>
                    <path d="M18.5 15v5M16 17.5h5"/>
                  </svg>
                  GMC-registered doctors
                </span>
                <span className={styles.heroTrustDivider} aria-hidden="true" />
                <span className={styles.heroTrustItem}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                  </svg>
                  Local anaesthetic, no hospital stay
                </span>
                <span className={styles.heroTrustDivider} aria-hidden="true" />
                <span className={styles.heroTrustItem}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <circle cx="12" cy="12" r="10"/>
                    <polyline points="12 6 12 12 16 14"/>
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
          2. GOOGLE REVIEWS
      ════════════════════════════════════════ */}
      <Testimonials />

      {/* ════════════════════════════════════════
          3. WHAT IS HAEMORRHOID REMOVAL?
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
                <p className={styles.eyebrowDark}>About This Treatment</p>
                <h2 className={styles.combinedHeading}>What is Haemorrhoid Removal?</h2>
                <p className={styles.combinedDesc}>
                  Haemorrhoid removal is a minor surgical procedure to permanently remove enlarged
                  haemorrhoids (piles) that cause pain, bleeding, itching, or prolapse. At The One
                  Clinic Leicester, our experienced doctors perform this procedure under local
                  anaesthetic, providing effective, long-lasting relief without the need for a
                  hospital stay or lengthy recovery.
                </p>
              </motion.div>

              <motion.ul className={styles.eligibilityList} role="list" variants={stagger(0.1)}>
                {OVERVIEW_POINTS.map((point) => (
                  <motion.li key={point} className={styles.eligibilityItem} variants={fadeUp}>
                    <span className={styles.eligibilityCheck} aria-hidden="true">
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                        <polyline points="2,7 5.5,10.5 12,3.5" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </span>
                    <span>{point}</span>
                  </motion.li>
                ))}
              </motion.ul>

              <motion.div className={styles.combinedCtaWrapper} variants={fadeUp}>
                <BookConsultationButton className={styles.combinedCta}>
                  Book Your Consultation
                </BookConsultationButton>
              </motion.div>
            </motion.div>

            {/* Right: image */}
            <motion.div className={styles.whatIsVideoWrap} variants={fadeUp}>
              <Image
                src="/images/Doctor2.jpg"
                alt="Doctor at The One Clinic Leicester"
                fill
                className={styles.whatIsVideoFrame}
                sizes="(max-width: 900px) 100vw, 50vw"
              />
            </motion.div>
          </motion.div>
        </Container>
      </Section>

      {/* ════════════════════════════════════════
          4. BENEFITS
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
              Benefits of Haemorrhoid Removal at The One Clinic
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
          5. CTA BANNER
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
              Ready for Lasting Relief<br />from Haemorrhoids?
            </motion.h2>
            <motion.p className={styles.ctaBannerSub} variants={fadeUp}>
              Book a consultation with our doctors and take the first step towards a pain-free life.
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
          6. COST BANNER
      ════════════════════════════════════════ */}
      <section className={styles.costBanner} data-section-theme="dark" aria-label="Haemorrhoid removal cost">
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
              Procedures From £300
            </motion.p>
            <motion.p className={styles.costBannerNote} variants={fadeUp}>
              Pricing depends on the procedure type and complexity. A full quote will be
              provided following your initial consultation with our doctor.
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
          7. MEET THE EXPERTS
      ════════════════════════════════════════ */}
      <MeetTheExperts />

      {/* ════════════════════════════════════════
          8. FAQ
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
            <Accordion items={FAQS} theme="dark" />
          </motion.div>
        </Container>
      </Section>

      {/* ════════════════════════════════════════
          9. BOOKING FORM
      ════════════════════════════════════════ */}
      <LeadForm />

      {/* ════════════════════════════════════════
          10. FINAL CTA
      ════════════════════════════════════════ */}
      <FinalCTA />
    </>
  );
}
