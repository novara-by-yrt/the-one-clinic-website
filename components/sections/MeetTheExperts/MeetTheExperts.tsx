'use client';

import { useState, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import type { Swiper as SwiperType } from 'swiper';
import { TEAM_MEMBERS } from '@/data/team';
import styles from './MeetTheExperts.module.css';

import 'swiper/css';

const TOTAL = TEAM_MEMBERS.length;

const INFO_VARIANTS = {
  hidden: { opacity: 0, y: 16 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.40, ease: [0.22, 1, 0.36, 1] as const } },
  exit:   { opacity: 0, y: -10, transition: { duration: 0.22, ease: 'easeIn' as const } },
};

export default function MeetTheExperts() {
  const [activeIndex, setActiveIndex] = useState(0);
  const swiperRef = useRef<SwiperType | null>(null);

  const member = TEAM_MEMBERS[activeIndex] ?? TEAM_MEMBERS[0];

  return (
    <section
      className={styles.section}
      aria-label="Meet the Experts"
      data-section-theme="light"
    >
      {/* ── Section header ── */}
      <div className={styles.header}>
        <span className={styles.chip}>
          <span className={styles.chipDot} aria-hidden="true" />
          Our Clinical Team
        </span>
        <h2 className={styles.heading}>Meet the Experts</h2>
      </div>

      {/* ── Filmstrip carousel ── */}
      <div className={styles.carouselOuter}>

        <button
          className={styles.navArrow}
          onClick={() => swiperRef.current?.slidePrev()}
          aria-label="Previous team member"
        >
          <svg width="16" height="16" viewBox="0 0 18 18" fill="none">
            <path d="M11 3.5L5.5 9L11 14.5" stroke="currentColor" strokeWidth="1.8"
              strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>

        <div className={styles.carouselWrap}>
          <Swiper
            grabCursor
            centeredSlides
            loop
            slidesPerView="auto"
            spaceBetween={14}
            speed={580}
            onSwiper={(swiper) => { swiperRef.current = swiper; }}
            onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
            className={styles.swiper}
          >
            {TEAM_MEMBERS.map((m, i) => (
              <SwiperSlide
                key={m.slug}
                className={styles.slide}
                onClick={() => swiperRef.current?.slideToLoop(i)}
              >
                <div className={styles.card}>
                  {m.image ? (
                    <Image
                      src={m.image}
                      alt={m.name}
                      fill
                      className={styles.cardImg}
                      sizes="(max-width: 640px) 200px, 340px"
                      draggable={false}
                    />
                  ) : (
                    <div className={styles.cardInitials}>{m.initials}</div>
                  )}
                  <div className={styles.cardOverlay} aria-hidden="true" />
                  <div className={styles.cardFooter}>
                    <span className={styles.cardName}>{m.name.split(' ').pop()}</span>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        <button
          className={styles.navArrow}
          onClick={() => swiperRef.current?.slideNext()}
          aria-label="Next team member"
        >
          <svg width="16" height="16" viewBox="0 0 18 18" fill="none">
            <path d="M7 3.5L12.5 9L7 14.5" stroke="currentColor" strokeWidth="1.8"
              strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>

      </div>

      {/* ── Info panel below carousel ── */}
      <div className={styles.infoOuter} aria-live="polite">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={activeIndex}
            className={styles.infoPanel}
            variants={INFO_VARIANTS}
            initial="hidden"
            animate="show"
            exit="exit"
          >
            <p className={styles.infoCounter}>
              {String(activeIndex + 1).padStart(2, '0')}
              <span className={styles.infoCounterSep}> / </span>
              {String(TOTAL).padStart(2, '0')}
            </p>
            <h2 className={styles.expertName}>{member.name}</h2>
            {member.credentials && (
              <p className={styles.credentials}>{member.credentials}</p>
            )}
            <p className={styles.role}>{member.role}</p>
            <div className={styles.divider} aria-hidden="true" />
            <p className={styles.bio}>{member.bio[0]}</p>
            <Link
              href={member.profileUrl ?? `/our-team/${member.slug}`}
              className={styles.cta}
            >
              View Full Profile
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.7"
                  strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
          </motion.div>
        </AnimatePresence>
      </div>

    </section>
  );
}
