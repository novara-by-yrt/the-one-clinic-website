'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRef } from 'react';
import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import type { Swiper as SwiperType } from 'swiper';
import { fadeUp, stagger, VIEWPORT } from '@/lib/motion';
import styles from './CaseStudies.module.css';

import 'swiper/css';

const SLIDES_BASE = [
  { src: '/images/Before and after 1.png',                           title: 'Lumecca Laser',      alt: 'Lumecca Laser before and after' },
  { src: '/images/Before and after 2.png',                           title: 'Endolift',           alt: 'Endolift before and after' },
  { src: '/images/Home page Endolift before-and-after image..png',   title: 'Endolift',           alt: 'Endolift before and after treatment' },
  { src: '/images/Before and after 3.png',                           title: 'Laser Mole Removal', alt: 'Laser Mole Removal before and after' },
];

// Duplicate so Swiper loop has enough slides for slidesPerView: 3
const SLIDES = [...SLIDES_BASE, ...SLIDES_BASE];

export default function CaseStudies() {
  const swiperRef = useRef<SwiperType | null>(null);

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
          <motion.div variants={fadeUp}>
            <span className={styles.chip}>
              <span className={styles.chipDot} aria-hidden="true" />
              Patient Outcomes
            </span>
          </motion.div>

          <motion.h2 className={styles.heading} variants={fadeUp}>
            Real Transformations
          </motion.h2>

          <motion.div className={styles.rule} variants={fadeUp} aria-hidden="true" />

          <motion.p className={styles.desc} variants={fadeUp}>
            Helping patients achieve confidence and long-term results,
            one personalised treatment at a time.
          </motion.p>
        </motion.div>

        {/* ── Carousel ──────────────────────────────────── */}
        <div className={styles.carouselWrap}>

          {/* Mask wrapper — only clips the slide track, not the nav row */}
          <div className={styles.swiperMask}>
            <Swiper
              grabCursor
              centeredSlides
              loop
              speed={700}
              breakpoints={{
                0:   { slidesPerView: 1, spaceBetween: 20 },
                640: { slidesPerView: 3, spaceBetween: 26 },
              }}
              onSwiper={(swiper) => { swiperRef.current = swiper; }}
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
                      sizes="(max-width: 639px) 92vw, (max-width: 1024px) 30vw, 380px"
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

          {/* Arrow controls — outside the mask, always fully visible */}
          <div className={styles.navRow}>
            <button
              className={styles.navBtn}
              aria-label="Previous result"
              onClick={() => swiperRef.current?.slidePrev()}
            >
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path d="M11 3.5L5.5 9L11 14.5" stroke="currentColor" strokeWidth="1.8"
                  strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            <button
              className={styles.navBtn}
              aria-label="Next result"
              onClick={() => swiperRef.current?.slideNext()}
            >
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path d="M7 3.5L12.5 9L7 14.5" stroke="currentColor" strokeWidth="1.8"
                  strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
        </div>

        {/* ── View More CTA ─────────────────────────────── */}
        <div className={styles.ctaWrap}>
          <Link href="/results" className={styles.cta}>
            View More Results
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.6"
                strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </Link>
        </div>

      </div>
    </section>
  );
}
