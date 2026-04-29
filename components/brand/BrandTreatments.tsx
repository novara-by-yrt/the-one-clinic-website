'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Autoplay, Navigation } from 'swiper/modules';
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

      {/* Overlay */}
      <div className={styles.overlay} aria-hidden="true" />

      {/* Atmospheric depth glows */}
      <div className={styles.glow1} aria-hidden="true" />
      <div className={styles.glow2} aria-hidden="true" />

      {/* Content */}
      <div className={styles.inner}>

        {/* ── Left: glass info panel ── */}
        <motion.div
          className={styles.leftPanel}
          variants={stagger(0.1)}
          initial="hidden"
          whileInView="show"
          viewport={VIEWPORT}
        >
          <motion.p className={styles.eyebrow} variants={fadeUp}>
            Medical Aesthetics &amp; Health Care
          </motion.p>

          <motion.h2 className={styles.heading} variants={fadeUp}>
            Our Popular<br />Treatments
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
            navigation={{ nextEl: `.${styles.navNext}`, prevEl: `.${styles.navPrev}` }}
            coverflowEffect={{
              rotate: 20,
              stretch: -8,
              depth: 160,
              modifier: 1,
              scale: 0.88,
              slideShadows: true,
            }}
            className={styles.swiper}
          >
            {SLIDES.map((slide, i) => (
              <SwiperSlide key={i} className={styles.slide}>
                <Link href={slide.href} className={styles.card} draggable={false}>
                  {/* Image */}
                  <Image
                    src={slide.src}
                    alt={slide.title}
                    fill
                    className={styles.cardImg}
                    sizes="(max-width: 768px) 180px, 220px"
                    draggable={false}
                  />

                  {/* Cinematic gradient overlay */}
                  <div className={styles.cardOverlay} aria-hidden="true" />

                  {/* Active-card warm glow ring */}
                  <div className={styles.cardGlow} aria-hidden="true" />

                  {/* Title */}
                  <div className={styles.cardContent}>
                    <span className={styles.cardTitle}>{slide.title}</span>
                  </div>
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Custom nav buttons */}
          <div className={styles.navRow} aria-hidden="true">
            <button className={styles.navPrev} aria-label="Previous treatment">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M10 3L5 8L10 13" stroke="currentColor" strokeWidth="1.75"
                  strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            <button className={styles.navNext} aria-label="Next treatment">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M6 3L11 8L6 13" stroke="currentColor" strokeWidth="1.75"
                  strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}
