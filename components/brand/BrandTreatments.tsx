'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Autoplay } from 'swiper/modules';
import type { Swiper as SwiperType } from 'swiper';
import { fadeUp, stagger, VIEWPORT } from '@/lib/motion';
import styles from './BrandTreatments.module.css';

import 'swiper/css';
import 'swiper/css/effect-coverflow';

const SLIDES = [
  {
    src:   '/images/Health Screening.jpg',
    title: 'Health Screening',
    href:  '/treatments/health-screening',
    desc:  'Comprehensive health checks designed to detect potential issues early. Our tailored packages give you a clear picture of your overall wellbeing.',
  },
  {
    src:   '/images/Private GP.jpg',
    title: 'Private GP',
    href:  '/treatments/private-gp',
    desc:  'Same-day private GP appointments with no time pressure. Our doctors listen, investigate, and create a personalised care plan just for you.',
  },
  {
    src:   '/images/Joint Injections.jpg',
    title: 'Joint Injections',
    href:  '/treatments/joint-injections',
    desc:  'Targeted injections to relieve joint pain and inflammation. Administered by our experienced doctors for fast, effective, lasting relief.',
  },
  {
    src:   '/images/Minor Surgery.jpg',
    title: 'Minor Surgery',
    href:  '/treatments/minor-surgery',
    desc:  'Minor surgical procedures performed safely in our clinic. From mole removal to lipoma excision — handled with precision and expert care.',
  },
  {
    src:   '/images/GP Home Visits.jpg',
    title: 'GP Home Visits',
    href:  '/treatments/gp-home-visits',
    desc:  'Receive the same high standard of GP care from the comfort of your home. Ideal for those who need medical attention without travelling.',
  },
  {
    src:   '/images/Travel Vaccines.jpg',
    title: 'Travel Vaccines',
    href:  '/treatments/travel-vaccine',
    desc:  'Stay protected wherever you travel. Our clinic provides all required vaccinations with expert advice tailored to your specific destination.',
  },
  {
    src:   '/images/Weight Management.jpg',
    title: 'Weight Management',
    href:  '/treatments/weight-management',
    desc:  'Doctor-led programmes combining medical expertise with sustainable lifestyle strategies to help you achieve and maintain your health goals.',
  },
  {
    src:   '/images/Medical Insurance Exam.jpg',
    title: 'Medical Insurance',
    href:  '/treatments/medical-insurance',
    desc:  'Professional medical examinations for insurance purposes, completed efficiently by our qualified doctors with full documentation provided.',
  },
  {
    src:   '/images/Dermatologist.jpg',
    title: 'Dermatologist',
    href:  '/treatments/dermatologist',
    desc:  'Expert dermatology consultations for all skin concerns. From acne and eczema to advanced aesthetic skin treatments — all under one roof.',
  },
  {
    src:   "/images/Men's Health.jpg",
    title: "Men's Health",
    href:  '/treatments/mens-health',
    desc:  'Discreet, comprehensive health services tailored for men. From hormone health to sexual wellness, we provide expert care without judgement.',
  },
  {
    src:   "/images/Women's Heath img.png",
    title: "Women's Health",
    href:  '/treatments/womens-health',
    desc:  "Holistic women's health services covering hormonal balance, reproductive health, and aesthetic wellness — all delivered with compassion.",
  },
  {
    src:   '/images/Menopause & HRT.jpg',
    title: 'Menopause & HRT',
    href:  '/treatments/menopause-hrt',
    desc:  'Specialist menopause care and personalised HRT plans to help you navigate this life stage with confidence, comfort, and clarity.',
  },
  {
    src:   '/images/Profhilo (2).jpg',
    title: 'Profhilo',
    href:  '/treatments/profhilo',
    desc:  'The gold-standard bio-remodelling treatment that hydrates from within, improving skin tone, texture, and elasticity for naturally youthful results.',
  },
  {
    src:   '/NCTF 135 HA.jpg',
    title: 'NCTF 135 HA',
    href:  '/treatments/nctf-135-ha',
    desc:  'A powerful skin rejuvenation cocktail of hyaluronic acid and vitamins that revitalises dull skin, reduces fine lines, and restores radiance.',
  },
];

const INFO_VARIANTS = {
  hidden: { opacity: 0, y: 14 },
  show:   { opacity: 1, y: 0,  transition: { duration: 0.38, ease: [0.22, 1, 0.36, 1] as const } },
  exit:   { opacity: 0, y: -8, transition: { duration: 0.20, ease: 'easeIn' as const } },
};

export default function BrandTreatments() {
  const [activeIndex, setActiveIndex] = useState(0);
  const swiperRef = useRef<SwiperType | null>(null);
  const active = SLIDES[activeIndex] ?? SLIDES[0];

  return (
    <section className={styles.section} id="treatments">
      {/* Background */}
      <div className={styles.bgWrap} aria-hidden="true">
        <Image
          src="/images/Treatment hero section background image.jpg"
          alt=""
          fill
          className={styles.bgImg}
          sizes="100vw"
          priority
        />
      </div>
      <div className={styles.overlay} aria-hidden="true" />
      <div className={styles.glow1}   aria-hidden="true" />
      <div className={styles.glow2}   aria-hidden="true" />

      <div className={styles.inner}>

        {/* ══ Top: centered heading ══ */}
        <motion.div
          className={styles.topHeader}
          variants={stagger(0.1)}
          initial="hidden"
          whileInView="show"
          viewport={VIEWPORT}
        >
          <motion.p className={styles.eyebrow} variants={fadeUp}>
            Medical Aesthetics &amp; Health Care
          </motion.p>

          <motion.h2 className={styles.heading} variants={fadeUp}>
            Our Popular{' '}
            <em className={styles.headingAccent}>Treatments</em>
          </motion.h2>

          <motion.p className={styles.sectionDesc} variants={fadeUp}>
            Advanced aesthetic and health treatments, all under one roof —
            tailored to your goals by our qualified doctors.
          </motion.p>
        </motion.div>

        {/* ══ Bottom: dynamic info + carousel ══ */}
        <div className={styles.bottomLayout}>

          {/* ── Left: dynamic treatment info ── */}
          <div className={styles.leftPanel}>
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                className={styles.treatmentInfo}
                variants={INFO_VARIANTS}
                initial="hidden"
                animate="show"
                exit="exit"
              >
                <h3 className={styles.treatmentName}>{active.title}</h3>
                <div className={styles.rule} aria-hidden="true" />
                <p className={styles.treatmentDesc}>{active.desc}</p>
                <Link href={active.href} className={styles.cta}>
                  Learn More
                  <svg width="15" height="15" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                    <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.6"
                      strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </Link>
              </motion.div>
            </AnimatePresence>

            {/* Nav row */}
            <div className={styles.navRow} aria-label="Carousel controls">
              <button
                className={styles.navBtn}
                onClick={() => swiperRef.current?.slidePrev()}
                aria-label="Previous treatment"
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M10 3L5 8L10 13" stroke="currentColor" strokeWidth="1.75"
                    strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>

              <div className={styles.progressTrack} aria-hidden="true">
                <div
                  className={styles.progressFill}
                  style={{ width: `${((activeIndex + 1) / SLIDES.length) * 100}%` }}
                />
              </div>

              <button
                className={styles.navBtn}
                onClick={() => swiperRef.current?.slideNext()}
                aria-label="Next treatment"
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M6 3L11 8L6 13" stroke="currentColor" strokeWidth="1.75"
                    strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>

              <span className={styles.slideCount} aria-live="polite">
                {String(activeIndex + 1).padStart(2, '0')} / {String(SLIDES.length).padStart(2, '0')}
              </span>
            </div>

            <Link href="/treatments" className={styles.exploreLink}>
              Explore All Treatments
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.6"
                  strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Link>
          </div>

          {/* ── Right: 3D coverflow carousel ── */}
          <div className={styles.carouselWrap}>
            <Swiper
              modules={[EffectCoverflow, Autoplay]}
              effect="coverflow"
              grabCursor
              centeredSlides
              loop
              slidesPerView="auto"
              slideToClickedSlide
              autoplay={{ delay: 10000, disableOnInteraction: false, pauseOnMouseEnter: true }}
              coverflowEffect={{
                rotate:       22,
                stretch:     -10,
                depth:        180,
                modifier:     1,
                scale:        0.86,
                slideShadows: true,
              }}
              className={styles.swiper}
              onSwiper={(swiper) => { swiperRef.current = swiper; }}
              onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
            >
              {SLIDES.map((slide, i) => (
                <SwiperSlide key={i} className={styles.slide}>
                  <div className={styles.card} aria-label={slide.title}>
                    <Image
                      src={slide.src}
                      alt={slide.title}
                      fill
                      className={styles.cardImg}
                      sizes="(max-width: 768px) 160px, 220px"
                      draggable={false}
                    />
                    <div className={styles.cardOverlay} aria-hidden="true" />
                    <div className={styles.cardGlow}    aria-hidden="true" />
                    <div className={styles.cardContent}>
                      <span className={styles.cardTitle}>{slide.title}</span>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

        </div>

      </div>
    </section>
  );
}
