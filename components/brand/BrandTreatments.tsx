'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Autoplay, Navigation } from 'swiper/modules';
import type { Swiper as SwiperType } from 'swiper';
import { fadeUp, stagger, VIEWPORT } from '@/lib/motion';
import styles from './BrandTreatments.module.css';

import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/navigation';

const SLIDES = [
  { src: '/images/Health Screening.jpg',       title: 'Health Screening',   href: '/treatments/health-screening' },
  { src: '/images/Private GP.jpg',              title: 'Private GP',         href: '/treatments/private-gp' },
  { src: '/images/Joint Injections.jpg',        title: 'Joint Injections',   href: '/treatments/joint-injections' },
  { src: '/images/Minor Surgery.jpg',           title: 'Minor Surgery',      href: '/treatments/minor-surgery' },
  { src: '/images/GP Home Visits.jpg',          title: 'GP Home Visits',     href: '/treatments/gp-home-visits' },
  { src: '/images/Travel Vaccines.jpg',         title: 'Travel Vaccines',    href: '/treatments/travel-vaccine' },
  { src: '/images/Weight Management.jpg',       title: 'Weight Management',  href: '/treatments/weight-management' },
  { src: '/images/Medical Insurance Exam.jpg',  title: 'Medical Insurance',  href: '/treatments/medical-insurance' },
  { src: '/images/Dermatologist.jpg',           title: 'Dermatologist',      href: '/treatments/dermatologist' },
  { src: "/images/Men's Health.jpg",            title: "Men's Health",       href: '/treatments/mens-health' },
  { src: "/images/Women's Health.jpg",          title: "Women's Health",     href: '/treatments/womens-health' },
  { src: '/images/Menopause & HRT.jpg',         title: 'Menopause & HRT',    href: '/treatments/menopause-hrt' },
  { src: '/images/Profhilo (2).jpg',            title: 'Profhilo',           href: '/treatments/profhilo' },
  { src: '/NCTF 135 HA.jpg',                    title: 'NCTF 135 HA',        href: '/treatments/nctf-135-ha' },
];

export default function BrandTreatments() {
  const [activeIndex, setActiveIndex] = useState(0);
  const swiperRef = useRef<SwiperType | null>(null);

  return (
    <section className={styles.section} id="treatments">
      {/* Background image */}
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

      {/* Overlay layers */}
      <div className={styles.overlay}  aria-hidden="true" />
      <div className={styles.glow1}    aria-hidden="true" />
      <div className={styles.glow2}    aria-hidden="true" />

      {/* Content */}
      <div className={styles.inner}>

        {/* ── Left: open editorial panel ── */}
        <motion.div
          className={styles.leftPanel}
          variants={stagger(0.1)}
          initial="hidden"
          whileInView="show"
          viewport={VIEWPORT}
        >
          {/* Treatment count badge */}
          <motion.div className={styles.countBadge} variants={fadeUp}>
            <span className={styles.countDot} aria-hidden="true" />
            {SLIDES.length} Treatments
          </motion.div>

          <motion.p className={styles.eyebrow} variants={fadeUp}>
            Medical Aesthetics &amp; Health Care
          </motion.p>

          <motion.h2 className={styles.heading} variants={fadeUp}>
            Our Popular<br />
            <em className={styles.headingAccent}>Treatments</em>
          </motion.h2>

          <motion.div className={styles.rule} variants={fadeUp} aria-hidden="true" />

          <motion.p className={styles.desc} variants={fadeUp}>
            Advanced aesthetic and health treatments, all under one roof —
            tailored to your goals by our qualified doctors.
          </motion.p>

          <motion.div variants={fadeUp}>
            <Link href="/treatments" className={styles.cta}>
              Explore All Treatments
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.6"
                  strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Link>
          </motion.div>

          {/* Nav arrows — live in the panel on desktop */}
          <motion.div className={styles.navRow} variants={fadeUp} aria-label="Carousel controls">
            <button
              className={`${styles.navBtn} ${styles.navPrev}`}
              onClick={() => swiperRef.current?.slidePrev()}
              aria-label="Previous treatment"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M10 3L5 8L10 13" stroke="currentColor" strokeWidth="1.75"
                  strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>

            {/* Progress track */}
            <div className={styles.progressTrack} aria-hidden="true">
              <div
                className={styles.progressFill}
                style={{ width: `${((activeIndex + 1) / SLIDES.length) * 100}%` }}
              />
            </div>

            <button
              className={`${styles.navBtn} ${styles.navNext}`}
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
          </motion.div>
        </motion.div>

        {/* ── Right: 3D coverflow carousel ── */}
        <div className={styles.carouselWrap}>
          <Swiper
            modules={[EffectCoverflow, Autoplay, Navigation]}
            effect="coverflow"
            grabCursor
            centeredSlides
            loop
            slidesPerView="auto"
            autoplay={{ delay: 3400, disableOnInteraction: false, pauseOnMouseEnter: true }}
            coverflowEffect={{
              rotate: 22,
              stretch: -10,
              depth: 180,
              modifier: 1,
              scale: 0.86,
              slideShadows: true,
            }}
            className={styles.swiper}
            onSwiper={(swiper) => { swiperRef.current = swiper; }}
            onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
          >
            {SLIDES.map((slide, i) => (
              <SwiperSlide key={i} className={styles.slide}>
                <Link href={slide.href} className={styles.card} draggable={false}>
                  <Image
                    src={slide.src}
                    alt={slide.title}
                    fill
                    className={styles.cardImg}
                    sizes="(max-width: 768px) 180px, 230px"
                    draggable={false}
                  />
                  <div className={styles.cardOverlay} aria-hidden="true" />
                  <div className={styles.cardGlow}    aria-hidden="true" />
                  <div className={styles.cardContent}>
                    <span className={styles.cardTitle}>{slide.title}</span>
                  </div>
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

      </div>
    </section>
  );
}
