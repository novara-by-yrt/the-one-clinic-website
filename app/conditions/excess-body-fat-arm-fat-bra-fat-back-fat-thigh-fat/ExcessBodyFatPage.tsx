'use client';

import Image from 'next/image';
import Link  from 'next/link';
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
import { fadeUp, stagger, VIEWPORT } from '@/lib/motion';
import styles from './page.module.css';

/* ── Causes ───────────────────────────────────────────────────── */
const CAUSES = [
  {
    title: 'Genetics & Fat Distribution',
    desc: 'Genetics largely determine where the body preferentially stores fat. Some people are predisposed to accumulating fat in specific zones, such as the upper arms, bra line, or inner thighs, regardless of overall body weight or diet.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M6 3c0 4.5 6 4.5 6 9s-6 4.5-6 9"/>
        <path d="M18 3c0 4.5-6 4.5-6 9s6 4.5 6 9"/>
        <line x1="3" y1="9" x2="21" y2="9"/>
        <line x1="3" y1="15" x2="21" y2="15"/>
      </svg>
    ),
  },
  {
    title: 'Hormonal Changes',
    desc: 'Oestrogen decline during the menopause shifts fat distribution from the lower body to the arms, back, and midsection. Hormonal imbalances related to thyroid dysfunction or cortisol can also promote fat retention in stubborn areas.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
      </svg>
    ),
  },
  {
    title: 'Ageing & Muscle Loss',
    desc: 'As muscle mass naturally declines with age, fat fills the space previously occupied by muscle, particularly in the upper arms and thighs. Slower metabolism compounds this effect, making stubborn fat increasingly difficult to shift.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="12" cy="12" r="10"/>
        <polyline points="12 6 12 12 16 14"/>
      </svg>
    ),
  },
  {
    title: 'Diet & Lifestyle',
    desc: 'A calorie surplus, even a modest one sustained over time, leads to progressive fat accumulation in the body\'s preferred storage zones. Sedentary habits reduce caloric expenditure and allow these deposits to become increasingly established.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M18 8h1a4 4 0 0 1 0 8h-1"/>
        <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"/>
        <line x1="6" y1="1" x2="6" y2="4"/>
        <line x1="10" y1="1" x2="10" y2="4"/>
        <line x1="14" y1="1" x2="14" y2="4"/>
      </svg>
    ),
  },
  {
    title: 'Weight Fluctuation',
    desc: 'Repeated cycles of weight gain and loss can cause fat to accumulate unevenly in certain areas. Once fat cells expand in a localised zone, they are notoriously resistant to dietary changes, even after overall weight loss.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <line x1="12" y1="1" x2="12" y2="23"/>
        <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
      </svg>
    ),
  },
  {
    title: 'Poor Posture & Inactivity',
    desc: 'Prolonged sitting and poor posture reduce circulation to the back, thighs, and arms, contributing to fat accumulation and reduced muscle tone in these areas. Targeted activity is often insufficient to address localised deposits alone.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
      </svg>
    ),
  },
];

/* ── Treatments ───────────────────────────────────────────────── */
const TREATMENTS = [
  {
    title: 'Body Contouring',
    desc:  'Non-surgical body contouring precisely targets and reduces stubborn fat deposits on the arms, bra line, back, and thighs, sculpting a smoother, more proportionate body shape without surgery or downtime.',
    href:  '/treatments/body-contouring',
  },
  {
    title: 'Liposuction',
    desc:  'Surgical liposuction permanently removes unwanted fat from targeted areas including the upper arms, flanks, bra line, back, and thighs, delivering dramatic, long-lasting contouring results.',
    href:  '/treatments/liposuction-leicester',
  },
  {
    title: 'Morpheus8',
    desc:  'Radiofrequency microneedling simultaneously remodels subcutaneous fat and tightens overlying skin, particularly effective on the arms and thighs where skin laxity often accompanies fat deposits.',
    href:  '/treatments/morpheus8',
  },
  {
    title: 'Endolift',
    desc:  'Minimally invasive laser treatment targets localised fat and tightens lax skin in a single procedure, ideal for the upper arms, back, and bra area with minimal recovery time.',
    href:  '/treatments/endolift',
  },
];

/* ── Risk factors ─────────────────────────────────────────────── */
const RISK_FACTORS = [
  'Women going through the menopause, when hormonal shifts redistribute fat to the arms, back, and midsection.',
  'Adults over 40 as muscle mass declines and metabolism naturally slows.',
  'Those with a family history of fat accumulation in specific body zones.',
  'Individuals with a sedentary occupation or low levels of regular physical activity.',
  'People who have experienced significant weight gain or repeated weight cycling.',
  'Those with hormonal imbalances including thyroid conditions or elevated cortisol.',
];

/* ── Results timeline ─────────────────────────────────────────── */
const RESULTS_TIMELINE = [
  {
    phase: '2 to 4 Weeks',
    title: 'Early Changes',
    desc:  'Initial reduction in localised fat volume and improved contour begins.',
  },
  {
    phase: '6 to 8 Weeks',
    title: 'Visible Reshaping',
    desc:  'Noticeably slimmer arms, back, and thighs with improved definition.',
  },
  {
    phase: '3 Months',
    title: 'Full Results',
    desc:  'Optimal fat reduction and skin tightening results are fully visible.',
  },
  {
    phase: 'Long-term',
    title: 'Maintained Shape',
    desc:  'A stable weight and healthy lifestyle sustain the improved body contour.',
  },
];

/* ── Why choose ───────────────────────────────────────────────── */
const CLINIC_REASONS = [
  { n: '01', text: 'All-in-one clinic with medical and aesthetic services.' },
  { n: '02', text: 'Highly trained, compassionate, GMC-registered doctors.' },
  { n: '03', text: 'Customised treatment plans based on your body type and goals.' },
  { n: '04', text: 'State-of-the-art body contouring and skin tightening technology.' },
  { n: '05', text: 'Strong reputation with excellent patient reviews.' },
  { n: '06', text: 'Comprehensive aftercare and follow-up support.' },
];

/* ── FAQs ─────────────────────────────────────────────────────── */
const FAQS = [
  {
    question: 'Why do I have stubborn fat on my arms, back, or thighs despite exercising?',
    answer:
      'Spot reduction through exercise is largely a myth, the body burns fat systemically rather than from specific zones on demand. Genetics, hormones, and age determine where fat is stored and how readily it is released. This means localised fat deposits on the arms, bra line, back, and thighs can persist even when overall body composition improves. Professional body contouring treatments are specifically designed to address these resistant areas.',
  },
  {
    question: 'Can body contouring permanently remove fat in these areas?',
    answer:
      'Body contouring treatments reduce the number or volume of fat cells in the treated areas. Surgical liposuction permanently removes fat cells; non-surgical treatments reduce their volume. However, remaining cells can still expand with significant weight gain. Maintaining a stable body weight preserves results long-term.',
  },
  {
    question: 'Which treatment is best for arm fat?',
    answer:
      'The best treatment for arm fat depends on whether skin laxity is also a concern. For fat reduction alone, body contouring or liposuction are highly effective. If the skin is loose as well, Morpheus8 or Endolift are excellent options as they address both fat and skin tightening simultaneously. Your doctor will advise during your consultation.',
  },
  {
    question: 'How many sessions will I need?',
    answer:
      'Non-surgical body contouring typically requires a course of 3 to 6 sessions for optimal results. Morpheus8 and Endolift deliver significant improvement in 1 to 3 sessions. Liposuction achieves results in a single procedure. Your doctor will create a personalised plan based on your specific concerns and treatment areas.',
  },
  {
    question: 'What is the recovery time?',
    answer:
      'Recovery varies by treatment. Non-surgical body contouring requires no downtime. Morpheus8 may cause mild redness and swelling for 2 to 3 days. Endolift has a short recovery of 2 to 5 days. Liposuction requires a recovery period of 1 to 2 weeks with compression garments. Your doctor will provide full aftercare guidance.',
  },
];

/* ── Related ──────────────────────────────────────────────────── */
const RELATED_TREATMENTS = [
  {
    title: 'Body Contouring',
    desc:  'Non-surgical fat reduction targeting arms, bra line, back, and thighs.',
    href:  '/treatments/body-contouring',
    tag:   'Body',
  },
  {
    title: 'Liposuction',
    desc:  'Surgical fat removal for dramatic, permanent body contouring results.',
    href:  '/treatments/liposuction-leicester',
    tag:   'Body',
  },
  {
    title: 'Morpheus8',
    desc:  'Remodel fat and tighten skin simultaneously with radiofrequency microneedling.',
    href:  '/treatments/morpheus8',
    tag:   'Body',
  },
];

const RELATED_CONDITIONS = [
  {
    title: 'Abdominal Fat / Belly Fat',
    desc:  'Reduce stubborn stomach fat with targeted non-surgical body contouring.',
    href:  '/conditions/abdominal-fat-belly-fat',
    tag:   'Body',
  },
  {
    title: 'Cellulite',
    desc:  'Improve skin texture and reduce dimpling with targeted body treatments.',
    href:  '/conditions/cellulite',
    tag:   'Body',
  },
];

/* ════════════════════════════════════════════════════════════════
   PAGE
════════════════════════════════════════════════════════════════ */
export default function ExcessBodyFatPage() {
  return (
    <>
      {/* ════════════════════════════════════════
          1. HERO
      ════════════════════════════════════════ */}
      <section
        className={styles.hero}
        aria-label="Excess body fat treatment, hero"
        data-section-theme="dark"
      >
        <div className={styles.heroBreadcrumb}>
          <Container>
            <Breadcrumb
              theme="dark"
              items={[
                { label: 'Conditions', href: '/conditions' },
                { label: 'Excess Body Fat' },
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
            <div className={styles.heroLeft}>
              <motion.span className={styles.heroCategory} variants={fadeUp}>
                Conditions · Body
              </motion.span>

              <motion.h1 className={styles.heroTitle} variants={fadeUp}>
                Excess Body Fat
              </motion.h1>

              <motion.p className={styles.heroDesc} variants={fadeUp}>
                Reduce stubborn fat on the arms, bra line, back, and thighs with
                advanced body contouring treatments tailored to your shape and goals.
              </motion.p>

              <motion.div className={styles.heroCtas} variants={fadeUp}>
                <BookConsultationButton className={styles.heroCtaPrimary}>
                  Book A Consultation
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

            <motion.div className={styles.heroImageWrap} variants={fadeUp}>
              <Image
                src="/images/Excess Body Fat_Arm_Bra_Back_Thigh Fat.png"
                alt="Excess body fat treatment at The One Clinic Leicester"
                fill
                className={styles.heroImage}
                sizes="(max-width: 900px) 100vw, 50vw"
                priority
              />
              <div className={styles.heroImageFade} aria-hidden="true" />
            </motion.div>
          </motion.div>
        </Container>
      </section>

      {/* ════════════════════════════════════════
          2. WHAT IS EXCESS BODY FAT?
      ════════════════════════════════════════ */}
      <Section variant="light" data-section-theme="light">
        <Container>
          <motion.div
            className={styles.overviewGrid}
            variants={stagger(0.12)}
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
          >
            <motion.div className={styles.overviewLabel} variants={fadeUp}>
              <p className={styles.eyebrowDark}>About This Condition</p>
            </motion.div>

            <div className={styles.overviewBody}>
              <motion.h2 className={styles.overviewHeading} variants={fadeUp}>
                What Is Excess Body Fat?
              </motion.h2>
              <motion.p className={styles.overviewPara} variants={fadeUp}>
                Excess body fat refers to stubborn fat deposits that accumulate in
                specific zones, including the upper arms, bra line, back, and inner
                or outer thighs. These areas are notoriously resistant to diet and
                exercise due to the way the body regulates localised fat storage through
                genetics, hormones, and age.
              </motion.p>
              <motion.p className={styles.overviewPara} variants={fadeUp}>
                Even at a healthy weight, many people carry disproportionate fat in
                these zones, affecting how clothes fit and body confidence. With the
                right professional treatments, these stubborn deposits can be
                significantly reduced, restoring a more balanced, sculpted silhouette.
              </motion.p>
            </div>
          </motion.div>
        </Container>
      </Section>

      {/* ════════════════════════════════════════
          3. AREAS
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
              Common Problem Areas
            </motion.p>
            <motion.h2 className={styles.headingLight} variants={fadeUp}>
              Where Stubborn Fat Accumulates
            </motion.h2>
          </motion.div>

          <motion.div
            className={styles.typesCardsRow}
            variants={stagger(0.1)}
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
          >
            {[
              {
                num: '01',
                title: 'Arm Fat',
                desc: 'Excess fat on the upper arms, often called "bingo wings", is among the most common complaints, particularly in women over 40 as muscle mass declines and skin loses elasticity.',
              },
              {
                num: '02',
                title: 'Bra & Back Fat',
                desc: 'Fat that bulges around the bra line or accumulates on the upper and lower back, creating rolls or an uneven silhouette. Resistant to targeted exercise and highly responsive to contouring treatments.',
              },
              {
                num: '03',
                title: 'Thigh Fat',
                desc: 'Inner and outer thigh fat, including saddlebags, is strongly influenced by genetics and hormones. Often one of the last areas to respond to diet and exercise, and a popular target for body contouring.',
              },
            ].map((type) => (
              <motion.div key={type.num} className={styles.typeCard} variants={fadeUp}>
                <span className={styles.typeNum} aria-hidden="true">{type.num}</span>
                <div className={styles.typeCardBody}>
                  <h3 className={styles.typeTitle}>{type.title}</h3>
                  <p className={styles.typeDesc}>{type.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </Container>
      </Section>

      {/* ════════════════════════════════════════
          4. CAUSES
      ════════════════════════════════════════ */}
      <Section variant="light" data-section-theme="light" className={styles.causesSection}>
        <Container>
          <motion.div
            className={styles.sectionHeaderCentre}
            variants={stagger(0.1)}
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
          >
            <motion.p className={styles.eyebrowDark} variants={fadeUp}>
              Root Causes
            </motion.p>
            <motion.h2 className={styles.headingDark} variants={fadeUp}>
              Why Does Stubborn Fat Accumulate?
            </motion.h2>
            <motion.p className={styles.sectionSubtext} variants={fadeUp}>
              Localised fat deposits in the arms, back, and thighs are driven by a
              combination of genetic, hormonal, and lifestyle factors.
            </motion.p>
          </motion.div>

          <motion.div
            className={styles.causesGrid}
            variants={stagger(0.08)}
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
          >
            {CAUSES.map((cause) => (
              <motion.div
                key={cause.title}
                className={styles.causeCard}
                variants={fadeUp}
                whileHover={{
                  y: -6,
                  transition: { type: 'spring', stiffness: 280, damping: 18 },
                }}
              >
                <span className={styles.causeIcon}>{cause.icon}</span>
                <h3 className={styles.causeTitle}>{cause.title}</h3>
                <p className={styles.causeDesc}>{cause.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </Container>
      </Section>

      {/* ════════════════════════════════════════
          5. RISK FACTORS
      ════════════════════════════════════════ */}
      <Section variant="light" data-section-theme="light">
        <Container>
          <motion.div
            className={styles.riskGrid}
            variants={stagger(0.12)}
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
          >
            <motion.div className={styles.riskLeft} variants={stagger(0.1)}>
              <motion.p className={styles.eyebrowDark} variants={fadeUp}>
                Risk Factors
              </motion.p>
              <motion.h2 className={styles.riskHeading} variants={fadeUp}>
                Who Is More Likely to Develop Stubborn Body Fat?
              </motion.h2>
              <motion.p className={styles.riskIntro} variants={fadeUp}>
                Localised fat accumulation is influenced by factors largely beyond
                lifestyle control, making professional treatment the most effective solution.
              </motion.p>
            </motion.div>

            <motion.ul
              className={styles.riskList}
              role="list"
              variants={stagger(0.08)}
            >
              {RISK_FACTORS.map((item) => (
                <motion.li key={item} className={styles.riskItem} variants={fadeUp}>
                  <span className={styles.riskCheck} aria-hidden="true">
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <polyline points="2,7 5.5,10.5 12,3.5" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </span>
                  <span>{item}</span>
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>
        </Container>
      </Section>

      {/* ════════════════════════════════════════
          6. TREATMENTS
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
              Your Options
            </motion.p>
            <motion.h2 className={styles.headingLight} variants={fadeUp}>
              Treatments for Excess Body Fat
            </motion.h2>
          </motion.div>

          <motion.div
            className={styles.treatmentsGrid}
            variants={stagger(0.1)}
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
          >
            {TREATMENTS.map((t) => (
              <motion.div
                key={t.title}
                className={styles.treatmentCard}
                variants={fadeUp}
                whileHover={{ y: -4, transition: { type: 'spring', stiffness: 280, damping: 18 } }}
              >
                <div className={styles.treatmentCardBody}>
                  <Link href={t.href} className={styles.treatmentTitleLink}>
                    <h3 className={styles.treatmentTitle}>{t.title}</h3>
                    <span className={styles.treatmentArrow} aria-hidden="true">
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </span>
                  </Link>
                  <p className={styles.treatmentDesc}>{t.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </Container>
      </Section>

      {/* ════════════════════════════════════════
          7. RESULTS & EXPECTATIONS
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
            <motion.p className={styles.eyebrowDark} variants={fadeUp}>
              What To Expect
            </motion.p>
            <motion.h2 className={styles.headingDark} variants={fadeUp}>
              Results &amp; Expectations
            </motion.h2>
            <motion.p className={styles.sectionSubtext} variants={fadeUp}>
              After body contouring treatment, here is what you can typically expect at each stage.
            </motion.p>
          </motion.div>

          <motion.div
            className={styles.resultsGrid}
            variants={stagger(0.1)}
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
          >
            {RESULTS_TIMELINE.map((item) => (
              <motion.div
                key={item.phase}
                className={styles.resultCard}
                variants={fadeUp}
                whileHover={{ y: -6, transition: { type: 'spring', stiffness: 280, damping: 18 } }}
              >
                <span className={styles.resultPhase}>{item.phase}</span>
                <h3 className={styles.resultTitle}>{item.title}</h3>
                <p className={styles.resultDesc}>{item.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </Container>
      </Section>

      {/* ════════════════════════════════════════
          8. MEET THE EXPERTS
      ════════════════════════════════════════ */}
      <MeetTheExperts />

      {/* ════════════════════════════════════════
          9. GOOGLE REVIEWS
      ════════════════════════════════════════ */}
      <Testimonials />

      {/* ════════════════════════════════════════
          10. WHY CHOOSE THE ONE CLINIC
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
            <motion.p className={styles.eyebrowLight} variants={fadeUp}>Why Us</motion.p>
            <motion.h2 className={styles.headingLight} variants={fadeUp}>
              Why Choose The One Clinic For Body Contouring
            </motion.h2>
          </motion.div>

          <motion.div
            className={styles.whyGrid}
            variants={stagger(0.08)}
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
          >
            {CLINIC_REASONS.map((r) => (
              <motion.div
                key={r.n}
                className={styles.whyCard}
                variants={fadeUp}
                whileHover={{ y: -6, transition: { type: 'spring', stiffness: 280, damping: 20 } }}
              >
                <span className={styles.whyNumber}>{r.n}</span>
                <p className={styles.whyText}>{r.text}</p>
              </motion.div>
            ))}
          </motion.div>
        </Container>
      </Section>

      {/* ════════════════════════════════════════
          11. FAQ
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
          12. CTA BAND
      ════════════════════════════════════════ */}
      <section
        className={styles.ctaBand}
        data-section-theme="dark"
        aria-label="Excess body fat consultation CTA"
      >
        <div className={styles.ctaBandBgWrap} aria-hidden="true">
          <Image
            src="/images/Background section image new1.jpg"
            alt=""
            fill
            className={styles.ctaBandBgImg}
            sizes="100vw"
          />
          <div className={styles.ctaBandOverlay} />
        </div>

        <Container>
          <motion.div
            className={styles.ctaContent}
            variants={stagger(0.15)}
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
          >
            <motion.p className={styles.eyebrowLight} variants={fadeUp}>
              Take the First Step
            </motion.p>
            <motion.h2 className={styles.ctaHeading} variants={fadeUp}>
              Ready for a More{' '}
              <span className={styles.ctaAccent}>Sculpted Silhouette?</span>
            </motion.h2>
            <motion.p className={styles.ctaSubtext} variants={fadeUp}>
              Speak to our specialists today to find the most effective treatment
              for your stubborn fat deposits and restore the body shape you deserve.
            </motion.p>
            <motion.div className={styles.ctaBtns} variants={fadeUp}>
              <BookConsultationButton className={styles.ctaBtnPrimary}>
                Book a Consultation
              </BookConsultationButton>
              <Link href="#contact" className={styles.ctaBtnSecondary}>
                Contact Us
              </Link>
            </motion.div>
          </motion.div>
        </Container>
      </section>

      {/* ════════════════════════════════════════
          13. COST BAND
      ════════════════════════════════════════ */}
      <section
        className={styles.costBand}
        data-section-theme="dark"
        aria-label="Excess body fat treatment cost"
      >
        <Container>
          <motion.div
            className={styles.costBandInner}
            variants={stagger(0.12)}
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
          >
            <motion.p className={styles.costBandEyebrow} variants={fadeUp}>
              Pricing
            </motion.p>
            <motion.h2 className={styles.costBandHeading} variants={fadeUp}>
              Body Contouring Treatment Cost
            </motion.h2>
            <motion.p className={styles.costBandNote} variants={fadeUp}>
              Contact us to enquire
            </motion.p>
            <motion.div variants={fadeUp}>
              <BookConsultationButton className={styles.ctaBtnPrimary}>
                Book A Consultation
              </BookConsultationButton>
            </motion.div>
          </motion.div>
        </Container>
      </section>

      {/* ════════════════════════════════════════
          14. LEAD FORM
      ════════════════════════════════════════ */}
      <div id="contact">
        <LeadForm />
      </div>

      {/* ════════════════════════════════════════
          15. RELATED TREATMENTS
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
            <motion.p className={styles.eyebrowDark} variants={fadeUp}>Explore</motion.p>
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
            {RELATED_TREATMENTS.map((item) => (
              <motion.div key={item.title} className={styles.relatedCell} variants={fadeUp}>
                <Link href={item.href} className={styles.relatedCard}>
                  <span className={styles.relatedTag}>{item.tag}</span>
                  <h3 className={styles.relatedTitle}>{item.title}</h3>
                  <p className={styles.relatedDesc}>{item.desc}</p>
                  <span className={styles.relatedArrow} aria-hidden="true">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </span>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </Container>
      </Section>

      {/* ════════════════════════════════════════
          16. RELATED CONDITIONS
      ════════════════════════════════════════ */}
      <Section variant="light" data-section-theme="light" className={styles.relatedConditionsSection}>
        <Container>
          <motion.div
            className={styles.sectionHeaderCentre}
            variants={stagger(0.1)}
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
          >
            <motion.p className={styles.eyebrowDark} variants={fadeUp}>Similar Concerns</motion.p>
            <motion.h2 className={styles.headingDark} variants={fadeUp}>
              Related Conditions
            </motion.h2>
          </motion.div>

          <motion.div
            className={styles.relatedGrid}
            variants={stagger(0.1)}
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
          >
            {RELATED_CONDITIONS.map((item) => (
              <motion.div key={item.title} className={styles.relatedCell} variants={fadeUp}>
                <Link href={item.href} className={styles.relatedCard}>
                  <span className={styles.relatedTag}>{item.tag}</span>
                  <h3 className={styles.relatedTitle}>{item.title}</h3>
                  <p className={styles.relatedDesc}>{item.desc}</p>
                  <span className={styles.relatedArrow} aria-hidden="true">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </span>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </Container>
      </Section>
    </>
  );
}
