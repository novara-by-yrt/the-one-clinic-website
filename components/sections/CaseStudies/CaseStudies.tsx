'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import type { Swiper as SwiperType } from 'swiper';
import { fadeUp, stagger, VIEWPORT } from '@/lib/motion';
import styles from './CaseStudies.module.css';

import 'swiper/css';

const SLIDES_BASE = [
  // Endolift
  { src: '/images/Endolift B-A.jpg',                  title: 'Endolift',               alt: 'Endolift before and after results' },
  { src: '/images/Endolift 1 B-A.jpg',                title: 'Endolift',               alt: 'Endolift before and after result 1' },
  { src: '/images/Endolift 2 B-A.jpg',                title: 'Endolift',               alt: 'Endolift before and after result 2' },
  { src: '/images/Endolift 3 B-A.jpg',                title: 'Endolift',               alt: 'Endolift before and after result 3' },
  { src: '/images/Endolift 4 B-A.jpg',                title: 'Endolift',               alt: 'Endolift before and after result 4' },
  { src: '/images/Endolift 5 B-A.jpg',                title: 'Endolift',               alt: 'Endolift before and after result 5' },
  { src: '/images/Endolift Before & After 1.jpg',     title: 'Endolift',               alt: 'Endolift before and after result' },
  { src: '/images/Endolift Before & After 2.jpg',     title: 'Endolift',               alt: 'Endolift before and after result' },
  { src: '/images/Endolift Before & After 3.jpg',     title: 'Endolift',               alt: 'Endolift before and after result' },
  { src: '/images/Endolift Before & After 4.jpg',     title: 'Endolift',               alt: 'Endolift before and after result' },
  { src: '/images/Endolift Before & After 5.jpg',     title: 'Endolift',               alt: 'Endolift before and after result' },
  { src: '/images/Endolift Before & After 6.jpg',     title: 'Endolift',               alt: 'Endolift before and after result' },
  { src: '/images/Endolift Before & After 7.jpg',     title: 'Endolift',               alt: 'Endolift before and after result' },
  { src: '/images/Endolift Before & After 8.jpg',     title: 'Endolift',               alt: 'Endolift before and after result' },
  // Lumecca / IPL
  { src: '/images/Lumecca Before & After 2.jpg',      title: 'Lumecca Laser',          alt: 'Lumecca laser before and after results' },
  { src: '/images/Lumecca IPL B-A.jpg',               title: 'Lumecca IPL',            alt: 'Lumecca IPL before and after results' },
  // Morpheus 8
  { src: '/images/Morpheus8 Before & After 1.jpg',    title: 'Morpheus 8',             alt: 'Morpheus 8 before and after result' },
  { src: '/images/Morpheus8 Before & After 2.jpg',    title: 'Morpheus 8',             alt: 'Morpheus 8 before and after results' },
  { src: '/images/Morpheus8 Before & After 3.jpg',    title: 'Morpheus 8',             alt: 'Morpheus 8 before and after result' },
  { src: '/images/Morpheus8 1 B-A.jpg',               title: 'Morpheus 8',             alt: 'Morpheus8 before and after result 1' },
  { src: '/images/Morpheus8 2  B-A.jpg',              title: 'Morpheus 8',             alt: 'Morpheus8 before and after result 2' },
  // Hydrafacial
  { src: '/images/Hydrafacial  Before & After 1.jpg', title: 'Hydrafacial',            alt: 'Hydrafacial before and after results' },
  // Lip Filler / Filler
  { src: '/images/Lip Filler  Before & After.jpg',    title: 'Lip Filler',             alt: 'Lip filler before and after results' },
  { src: '/images/Lip Filler  Before & After 4.jpg',  title: 'Lip Filler',             alt: 'Lip filler before and after results' },
  { src: '/images/Filler  Before & After 1.jpg',      title: 'Filler',                 alt: 'Filler before and after results' },
  { src: '/images/Filler  Before & After 2.jpg',      title: 'Filler',                 alt: 'Filler before and after results' },
  // Pigmentation
  { src: '/images/Pigmentation Before & After 1.jpg', title: 'Pigmentation',           alt: 'Pigmentation treatment before and after' },
  { src: '/images/Pigmentation Before & After 2.jpg', title: 'Pigmentation Treatment', alt: 'Pigmentation treatment before and after' },
  // Other
  { src: '/images/Mole Removal Before & After.jpg',   title: 'Mole Removal',           alt: 'Mole removal before and after results' },
  { src: '/images/ACNE Before & After.jpg',           title: 'Acne Treatment',         alt: 'Acne treatment before and after results' },
  // Patient Results
  { src: '/images/B-A2.png',                          title: 'Patient Results',        alt: 'Patient before and after results' },
  { src: '/images/B-A4.png',                          title: 'Patient Results',        alt: 'Patient before and after results' },
  { src: '/images/B-A6.png',                          title: 'Patient Results',        alt: 'Patient before and after results' },
  { src: '/images/B-A7.png',                          title: 'Patient Results',        alt: 'Patient before and after results' },
  { src: '/images/B-A8.png',                          title: 'Patient Results',        alt: 'Patient before and after results' },
  { src: '/images/B-A9.png',                          title: 'Patient Results',        alt: 'Patient before and after results' },
];

// Duplicate so Swiper loop has enough slides for slidesPerView: 3
const SLIDES = [...SLIDES_BASE, ...SLIDES_BASE];

export default function CaseStudies() {
  const swiperRef = useRef<SwiperType | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

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

          {/* Mask wrapper , only clips the slide track, not the nav row */}
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
              onSlideChange={(swiper) => setActiveIndex(swiper.realIndex % SLIDES_BASE.length)}
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
                      sizes="(max-width: 639px) 92vw, (max-width: 1024px) 32vw, 500px"
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

          {/* Arrow controls and dots , outside the mask */}
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

            {/* Pagination dots */}
            <div className={styles.dotsRow} role="tablist" aria-label="Slide pages">
              {SLIDES_BASE.map((_, i) => (
                <button
                  key={i}
                  className={`${styles.dot} ${i === activeIndex ? styles.dotActive : ''}`}
                  onClick={() => swiperRef.current?.slideTo(i)}
                  role="tab"
                  aria-selected={i === activeIndex}
                  aria-label={`Page ${i + 1} of ${SLIDES_BASE.length}`}
                />
              ))}
            </div>

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
