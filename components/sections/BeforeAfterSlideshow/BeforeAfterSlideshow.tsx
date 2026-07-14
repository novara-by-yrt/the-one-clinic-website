'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRef, useState } from 'react';
import { m } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import type { Swiper as SwiperType } from 'swiper';
import { fadeUp, stagger, VIEWPORT } from '@/lib/motion';
import styles from './BeforeAfterSlideshow.module.css';

import 'swiper/css';

export type BeforeAfterImage = {
  src: string;
  alt: string;
  title?: string;
};

type BeforeAfterSlideshowProps = {
  /** Optional id for the section (e.g. "results" anchor on the home page). */
  id?: string;
  /** Small uppercase eyebrow/chip above the heading. */
  chip?: string;
  /** Section heading. */
  heading: string;
  /** Optional supporting paragraph under the heading. */
  description?: string;
  /** Slides to show. */
  images: BeforeAfterImage[];
  /** Fallback card label used for any image that doesn't set its own title. */
  defaultTitle?: string;
  /** Optional call-to-action link rendered under the carousel. */
  cta?: { href: string; label: string };
};

/**
 * Shared "before & after" slideshow used on the home page and on every
 * treatment page, so the design stays common everywhere. Renders the
 * spotlight 3-up Swiper carousel with nav arrows and pagination dots.
 */
export default function BeforeAfterSlideshow({
  id,
  chip,
  heading,
  description,
  images,
  defaultTitle,
  cta,
}: BeforeAfterSlideshowProps) {
  const swiperRef = useRef<SwiperType | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  // Duplicate slides so the loop always has enough for slidesPerView: 3,
  // even when a treatment only has one or two before/after images.
  const reps = Math.max(2, Math.ceil(9 / images.length));
  const slides = Array.from({ length: reps }).flatMap(() => images);

  return (
    <section className={styles.section} id={id}>
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
        <m.div
          className={styles.header}
          variants={stagger(0.1)}
          initial="hidden"
          whileInView="show"
          viewport={VIEWPORT}
        >
          {chip && (
            <m.div variants={fadeUp}>
              <span className={styles.chip}>
                <span className={styles.chipDot} aria-hidden="true" />
                {chip}
              </span>
            </m.div>
          )}

          <m.h2 className={styles.heading} variants={fadeUp}>
            {heading}
          </m.h2>

          <m.div className={styles.rule} variants={fadeUp} aria-hidden="true" />

          {description && (
            <m.p className={styles.desc} variants={fadeUp}>
              {description}
            </m.p>
          )}
        </m.div>

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
              onSlideChange={(swiper) => setActiveIndex(swiper.realIndex % images.length)}
              className={styles.swiper}
            >
              {slides.map((slide, i) => (
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
                    {(slide.title ?? defaultTitle) && (
                      <div className={styles.cardContent}>
                        <span className={styles.cardTitle}>{slide.title ?? defaultTitle}</span>
                      </div>
                    )}
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
              {images.map((_, i) => (
                <button
                  key={i}
                  className={`${styles.dot} ${i === activeIndex ? styles.dotActive : ''}`}
                  onClick={() => swiperRef.current?.slideToLoop(i)}
                  role="tab"
                  aria-selected={i === activeIndex}
                  aria-label={`Page ${i + 1} of ${images.length}`}
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

        {/* ── Optional CTA ──────────────────────────────── */}
        {cta && (
          <div className={styles.ctaWrap}>
            <Link href={cta.href} className={styles.cta}>
              {cta.label}
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.6"
                  strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Link>
          </div>
        )}

      </div>
    </section>
  );
}
