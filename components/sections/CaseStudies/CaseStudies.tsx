'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Navigation } from 'swiper/modules';
import { fadeUp, stagger, VIEWPORT } from '@/lib/motion';
import styles from './CaseStudies.module.css';

import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/navigation';

const SLIDES = [
  { src: '/images/Before and after 1.png', title: 'Lumecca Laser',      alt: 'Lumecca Laser before and after' },
  { src: '/images/Before and after 2.png', title: 'Endolift',           alt: 'Endolift before and after' },
  { src: '/images/Before and after 3.png', title: 'Laser Mole Removal', alt: 'Laser Mole Removal before and after' },
];

export default function CaseStudies() {
  return (
    <section className={styles.section} id="results">
      {/* Background */}
      <div className={styles.bgWrap} aria-hidden="true">
        <Image
          src="/images/Black background image.jpg"
          alt=""
          fill
          className={styles.bgImg}
          sizes="100vw"
        />
      </div>

      <div className={styles.overlay} aria-hidden="true" />
      <div className={styles.glow1} aria-hidden="true" />
      <div className={styles.glow2} aria-hidden="true" />

      <div className={styles.inner}>

        {/* ── Centered header ───────────────────────────── */}
        <motion.div
          className={styles.header}
          variants={stagger(0.1)}
          initial="hidden"
          whileInView="show"
          viewport={VIEWPORT}
        >
          <motion.p className={styles.eyebrow} variants={fadeUp}>
            Patient Outcomes
          </motion.p>

          <motion.h2 className={styles.heading} variants={fadeUp}>
            Real Transformations
          </motion.h2>

          <motion.div className={styles.rule} variants={fadeUp} aria-hidden="true" />

          <motion.p className={styles.desc} variants={fadeUp}>
            Helping patients achieve confidence and long-term results,
            one personalised treatment at a time.
          </motion.p>

          <motion.div variants={fadeUp}>
            <Link href="/results" className={styles.cta}>
              View More Results
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.6"
                  strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Link>
          </motion.div>
        </motion.div>

        {/* ── Full-width coverflow carousel ─────────────── */}
        <div className={styles.carouselWrap}>
          <Swiper
            modules={[EffectCoverflow, Navigation]}
            effect="coverflow"
            grabCursor
            centeredSlides
            loop
            loopAdditionalSlides={SLIDES.length}
            slidesPerView="auto"
            navigation={{ nextEl: `.${styles.navNext}`, prevEl: `.${styles.navPrev}` }}
            coverflowEffect={{
              rotate: 22,
              stretch: -10,
              depth: 180,
              modifier: 1,
              scale: 0.86,
              slideShadows: true,
            }}
            className={styles.swiper}
          >
            {SLIDES.map((slide, i) => (
              <SwiperSlide key={i} className={styles.slide}>
                <div className={styles.card}>
                  <Image
                    src={slide.src}
                    alt={slide.alt}
                    fill
                    className={styles.cardImg}
                    sizes="(max-width: 640px) 220px, (max-width: 1024px) 300px, 340px"
                    draggable={false}
                  />
                  <div className={styles.cardOverlay} aria-hidden="true" />
                  <div className={styles.cardGlow} aria-hidden="true" />
                  <div className={styles.cardContent}>
                    <span className={styles.cardTitle}>{slide.title}</span>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Nav buttons */}
          <div className={styles.navRow}>
            <button className={styles.navPrev} aria-label="Previous result">
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path d="M11 3.5L5.5 9L11 14.5" stroke="currentColor" strokeWidth="1.8"
                  strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            <button className={styles.navNext} aria-label="Next result">
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path d="M7 3.5L12.5 9L7 14.5" stroke="currentColor" strokeWidth="1.8"
                  strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}
