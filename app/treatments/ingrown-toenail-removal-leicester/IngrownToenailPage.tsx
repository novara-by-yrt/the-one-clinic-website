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
import TrustStrip             from '@/components/sections/TrustStrip';
import FinalCTA               from '@/components/sections/FinalCTA';
import { fadeUp, stagger, VIEWPORT } from '@/lib/motion';
import styles from './page.module.css';

/* ── Static data ──────────────────────────────────────────────── */

const TRIPLE_ACTION = [
  {
    num: '01',
    title: 'Pain Relief',
    desc: 'We use a local anaesthetic ring block. This completely numbs the toe, so the removal is entirely pain-free from start to finish.',
  },
  {
    num: '02',
    title: 'Infection Control',
    desc: 'By removing the nail spike that is piercing the skin, we allow the wound to heal properly. We drain any infection present and clean the area thoroughly.',
  },
  {
    num: '03',
    title: 'Permanent Prevention',
    desc: 'We apply phenol to the nail root (matrix). This permanently prevents the nail edge from regrowing, eliminating future ingrown toenails in that area.',
  },
];

const FAQS = [
  {
    question: 'Is the ingrown toenail procedure painful?',
    answer:
      'No. Before the procedure begins, we administer a local anaesthetic ring block which completely numbs the toe. You may feel a brief sting from the injection, but the surgical removal itself is entirely pain-free. After the procedure, mild soreness is normal and typically settles within a few days with over-the-counter pain relief.',
  },
  {
    question: 'Will the ingrown toenail grow back after treatment?',
    answer:
      'With Partial Nail Avulsion (PNA) and phenol application, the treated edge of the nail is permanently prevented from regrowing. The success rate is over 95%. The phenol destroys the specific section of the nail matrix responsible for producing the ingrown edge, providing a lasting solution.',
  },
  {
    question: 'How long does the procedure take?',
    answer:
      'The entire appointment, including preparation and aftercare dressing, takes approximately 30 to 45 minutes. The actual surgical removal is completed in under 15 minutes. You will be able to walk out of the clinic immediately afterwards.',
  },
  {
    question: 'What aftercare is required following treatment?',
    answer:
      'You will receive a sterile dressing on the day and detailed written aftercare instructions. Keep the toe clean and dry for the first 24 to 48 hours. Salt water soaks are recommended from day two to encourage healing. Most patients can return to normal footwear and light daily activity within one to two days. A follow-up appointment will be arranged to check your healing progress.',
  },
  {
    question: 'How much does ingrown toenail removal cost at The One Clinic?',
    answer:
      'Pricing for ingrown toenail removal starts from £250. The cost depends on the complexity of the case and whether one or both sides require treatment. A personalised quote will be provided following your initial consultation with our doctor.',
  },
];

/* ── Page component ───────────────────────────────────────────── */
export default function IngrownToenailPage() {
  return (
    <>
      {/* ════════════════════════════════════════
          1. HERO
      ════════════════════════════════════════ */}
      <section
        className={styles.hero}
        aria-label="Ingrown toenail removal Leicester, hero"
        data-section-theme="dark"
      >
        <div className={styles.heroBreadcrumb}>
          <Container>
            <Breadcrumb
              theme="dark"
              items={[
                { label: 'Treatments', href: '/treatments' },
                { label: 'Ingrown Toenail Removal' },
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
                Minor Surgery
              </motion.span>

              <motion.h1 className={styles.heroTitle} variants={fadeUp}>
                Ingrown Toenail Treatment in Leicester
              </motion.h1>

              <motion.p className={styles.heroDesc} variants={fadeUp}>
                Stop the pain and infection. Get expert, permanent removal of ingrown toenails
                with our safe, minimally invasive surgical procedures.
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
                    <circle cx="12" cy="12" r="10"/>
                    <polyline points="12 6 12 12 16 14"/>
                  </svg>
                  Same-day procedure available
                </span>
                <span className={styles.heroTrustDivider} aria-hidden="true" />
                <span className={styles.heroTrustItem}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                    <polyline points="22 4 12 14.01 9 11.01"/>
                  </svg>
                  Permanent results
                </span>
              </motion.div>
            </div>

            {/* Right: image */}
            <motion.div className={styles.heroImageWrap} variants={fadeUp}>
              <Image
                src="/images/Minor Surgery.jpg"
                alt="Ingrown toenail removal procedure at The One Clinic Leicester"
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
          3. AWARDS & ACHIEVEMENTS
      ════════════════════════════════════════ */}
      <TrustStrip />

      {/* ════════════════════════════════════════
          4. WHAT IS AN INGROWN TOENAIL?
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
                <h2 className={styles.combinedHeading}>What is an Ingrown Toenail?</h2>
                <p className={styles.combinedDesc}>
                  An ingrown toenail occurs when the side of your nail grows into the surrounding
                  skin. It usually happens on the big toe. It pierces the skin like a splinter.
                  This causes pain, redness, and swelling. If you ignore it, the skin often gets
                  infected. It might bleed or produce pus. It can make wearing shoes or even
                  walking difficult.
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
                src="/images/Minor Surgery.jpg"
                alt="Ingrown toenail condition and treatment at The One Clinic Leicester"
                fill
                className={styles.whatIsVideoFrame}
                sizes="(max-width: 900px) 100vw, 50vw"
              />
            </motion.div>
          </motion.div>
        </Container>
      </Section>

      {/* ════════════════════════════════════════
          5. VIDEO
      ════════════════════════════════════════ */}
      <Section variant="light" data-section-theme="light" className={styles.videoSection}>
        <Container>
          <motion.div
            className={styles.sectionHeaderCentre}
            variants={stagger(0.1)}
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
          >
            <motion.p className={styles.eyebrowDark} variants={fadeUp}>Watch</motion.p>
            <motion.h2 className={styles.headingDark} variants={fadeUp}>
              See How the Procedure Works
            </motion.h2>
          </motion.div>
          <motion.div
            className={styles.videoWrap}
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
          >
            <iframe
              className={styles.videoFrame}
              src="https://www.youtube.com/embed/VIDEO_ID_HERE"
              title="Ingrown Toenail Removal — The One Clinic Leicester"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              frameBorder="0"
            />
          </motion.div>
        </Container>
      </Section>

      {/* ════════════════════════════════════════
          6. HOW DOES TREATMENT WORK?
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
            {/* Left: text */}
            <motion.div className={styles.whatIsContent} variants={stagger(0.12)}>
              <motion.div className={styles.whatIsTextGroup} variants={fadeUp}>
                <p className={styles.eyebrowDark}>The Procedure</p>
                <h2 className={styles.combinedHeading}>How Does Treatment Work?</h2>
                <p className={styles.combinedDesc}>
                  The most effective way to treat a recurring ingrown toenail is{' '}
                  <strong>Partial Nail Avulsion (PNA)</strong>. This is a minor surgical
                  procedure. At The One Clinic, we do not just cut the nail. We remove the
                  offending edge of the nail straight down to the root. We then use a chemical
                  to destroy the nail matrix (the root). This prevents that specific part of
                  the nail from regrowing, providing a permanent cure.
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
                alt="Partial Nail Avulsion procedure at The One Clinic Leicester"
                fill
                className={styles.whatIsVideoFrame}
                sizes="(max-width: 900px) 100vw, 50vw"
              />
            </motion.div>
          </motion.div>
        </Container>
      </Section>

      {/* ════════════════════════════════════════
          7. SURGICAL ADVANTAGE — TRIPLE ACTION
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
            <motion.p className={styles.eyebrowLight} variants={fadeUp}>Our Approach</motion.p>
            <motion.h2 className={styles.headingLight} variants={fadeUp}>
              The Surgical Advantage: A Triple Action Approach
            </motion.h2>
            <motion.p className={styles.combinationIntroText} variants={fadeUp}>
              We combine medical precision with long-term prevention. We treat the problem at
              the source, so you do not have to keep suffering.
            </motion.p>
          </motion.div>

          <motion.div
            className={styles.techCardsGrid}
            variants={stagger(0.1)}
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
          >
            {TRIPLE_ACTION.map((item) => (
              <motion.div key={item.num} className={styles.techCard} variants={fadeUp}>
                <p className={styles.techCardEyebrow}>{item.num}</p>
                <h3 className={styles.techCardTitle}>{item.title}</h3>
                <p className={styles.techCardDesc}>{item.desc}</p>
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
            <p className={styles.finalResultsEyebrow}>Final Results</p>
            <p className={styles.finalResultsText}>
              The procedure provides immediate pressure relief. The toe heals within a few
              weeks, looking completely normal but very slightly narrower. Most patients are
              thrilled to finally be pain-free and able to wear their normal shoes again.
            </p>
          </motion.div>
        </Container>
      </Section>

      {/* ════════════════════════════════════════
          8. CTA BANNER
      ════════════════════════════════════════ */}
      <section
        className={styles.ctaBanner}
        data-section-theme="dark"
        aria-label="Book ingrown toenail consultation"
      >
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
              Ready for Permanent<br />Pain Relief?
            </motion.h2>
            <motion.p className={styles.ctaBannerSub} variants={fadeUp}>
              Book your consultation today and let Dr Virmani assess your ingrown toenail.
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
          9. COST BANNER
      ════════════════════════════════════════ */}
      <section
        className={styles.costBanner}
        data-section-theme="dark"
        aria-label="Ingrown toenail removal cost Leicester"
      >
        <Container>
          <motion.div
            className={styles.costBannerInner}
            variants={stagger(0.12)}
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
          >
            <motion.p className={styles.costBannerEyebrow} variants={fadeUp}>
              Ingrown Toenail Removal Cost at The One Clinic
            </motion.p>
            <motion.p className={styles.costBannerPrice} variants={fadeUp}>
              From £250
            </motion.p>
            <motion.p className={styles.costBannerNote} variants={fadeUp}>
              Pricing depends on complexity and whether one or both sides require treatment.
              A personalised quote will be provided following your initial consultation.
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
          10. MEET THE EXPERTS
      ════════════════════════════════════════ */}
      <MeetTheExperts />

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
          12. BOOKING FORM
      ════════════════════════════════════════ */}
      <LeadForm />

      {/* ════════════════════════════════════════
          13. FINAL CTA
      ════════════════════════════════════════ */}
      <FinalCTA />
    </>
  );
}
