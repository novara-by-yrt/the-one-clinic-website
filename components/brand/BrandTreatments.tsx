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
    src:   '/images/Endolift-Laser_1.jpg',
    title: 'Endolift',
    href:  '/treatments/endolift',
    desc:  'An innovative laser treatment that tightens and lifts loose skin using minimally invasive fibre technology — no surgery, no general anaesthetic, minimal downtime.',
  },
  {
    src:   '/images/Minor Surgery.jpg',
    title: 'Minor Surgery',
    href:  '/treatments/minor-surgery',
    desc:  'Minor surgical procedures performed safely in our clinic. From mole removal to lipoma excision, handled with precision and expert care.',
  },
  {
    src:   '/images/LumeccaIPL1.png',
    title: 'Deep Laser Resurfacing',
    href:  '/treatments/deep-laser-resurfacing',
    desc:  'Intensive laser treatment targeting deeper skin layers to reduce wrinkles, scarring, and uneven texture for dramatically renewed, smoother skin.',
  },
  {
    src:   '/images/Excess Body Fat_Arm_Bra_Back_Thigh Fat.png',
    title: 'Ultimate Body Confidence Package',
    href:  '/treatments/ultimate-body-confidence-package',
    desc:  'A comprehensive programme combining our leading body contouring and skin tightening treatments for transformative, full-body results.',
  },
  {
    src:   '/images/Jowls_Sagging Skin.png',
    title: 'Morpheus 8',
    href:  '/treatments/morpheus-8',
    desc:  'Advanced radiofrequency microneedling that remodels fat and stimulates collagen deep within the skin for tightened, lifted, and youthful-looking contours.',
  },
  {
    src:   '/images/Profhilo (2).jpg',
    title: 'JULÄINE',
    href:  '/treatments/julaine',
    desc:  'An exclusive regenerative treatment combining the finest aesthetic techniques to deliver exceptional, long-lasting rejuvenation, tailored entirely to you.',
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
          <motion.div variants={fadeUp}>
            <span className={styles.chip}>
              <span className={styles.chipDot} aria-hidden="true" />
              Medical Aesthetics &amp; Health Care
            </span>
          </motion.div>

          <motion.h2 className={styles.heading} variants={fadeUp}>
            Our Popular{' '}
            <em className={styles.headingAccent}>Treatments</em>
          </motion.h2>

          <motion.p className={styles.sectionDesc} variants={fadeUp}>
            Advanced aesthetic and health treatments, all under one roof,
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


          </div>

          {/* ── Right: 3D coverflow carousel ── */}
          <div className={styles.carouselWrap}>
            <Swiper
              modules={[EffectCoverflow, Autoplay]}
              effect="coverflow"
              grabCursor
              centeredSlides
              loop
              loopedSlides={SLIDES.length}
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

            {/* Nav arrows */}
            <div className={styles.navRow}>
              <button
                className={styles.navBtn}
                aria-label="Previous treatment"
                onClick={() => swiperRef.current?.slidePrev()}
              >
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                  <path d="M11 3.5L5.5 9L11 14.5" stroke="currentColor" strokeWidth="1.8"
                    strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
              <button
                className={styles.navBtn}
                aria-label="Next treatment"
                onClick={() => swiperRef.current?.slideNext()}
              >
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                  <path d="M7 3.5L12.5 9L7 14.5" stroke="currentColor" strokeWidth="1.8"
                    strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>
          </div>

        </div>

        {/* ══ Bottom CTA ══ */}
        <div className={styles.exploreBtnWrap}>
          <Link href="/treatments" className={styles.exploreBtn}>
            Explore All Treatments
            <svg width="15" height="15" viewBox="0 0 15 15" fill="none" aria-hidden="true">
              <path d="M2.5 7.5h10M8 3l4.5 4.5L8 12" stroke="currentColor" strokeWidth="1.7"
                strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </Link>
        </div>

      </div>
    </section>
  );
}
