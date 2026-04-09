'use client';

import { useRef, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import Section from '@/components/ui/Section';
import Container from '@/components/ui/Container';
import { fadeUp, stagger, VIEWPORT } from '@/lib/motion';
import { TEAM_MEMBERS } from '@/data/team';
import styles from './MeetTheExperts.module.css';

// Pixels per animation frame at ~60 fps (≈ 21 px/s — comfortable reading pace)
const SPEED = 0.35;
const CARD_STEP = 280; // card width (260) + gap (20)

export default function MeetTheExperts() {
  const trackRef      = useRef<HTMLDivElement>(null);
  const posRef        = useRef(0);
  const rafRef        = useRef<number>(0);
  const draggingRef   = useRef(false);
  const touchStartX   = useRef(0);
  const touchStartPos = useRef(0);

  useEffect(() => {
    function tick() {
      const track = trackRef.current;
      if (track && !draggingRef.current) {
        posRef.current -= SPEED;
        const halfWidth = track.scrollWidth / 2;
        if (posRef.current <= -halfWidth) posRef.current += halfWidth;
        track.style.transform = `translateX(${posRef.current}px)`;
      }
      rafRef.current = requestAnimationFrame(tick);
    }
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  function onTouchStart(e: React.TouchEvent) {
    draggingRef.current  = true;
    touchStartX.current  = e.touches[0].clientX;
    touchStartPos.current = posRef.current;
  }

  function onTouchMove(e: React.TouchEvent) {
    if (!draggingRef.current || !trackRef.current) return;
    const delta     = e.touches[0].clientX - touchStartX.current;
    const halfWidth = trackRef.current.scrollWidth / 2;
    let next        = touchStartPos.current + delta;
    while (next <= -halfWidth) next += halfWidth;
    while (next > 0)           next -= halfWidth;
    posRef.current = next;
    trackRef.current.style.transform = `translateX(${next}px)`;
  }

  function onTouchEnd() {
    draggingRef.current = false;
  }

  function scrollBy(amount: number) {
    const track = trackRef.current;
    if (!track) return;
    const halfWidth = track.scrollWidth / 2;
    let next = posRef.current + amount;
    while (next <= -halfWidth) next += halfWidth;
    while (next > 0) next -= halfWidth;
    posRef.current = next;
    track.style.transform = `translateX(${next}px)`;
  }

  return (
    <Section variant="light" data-section-theme="light" className={styles.section}>
      <Container>
        <motion.div
          className={styles.header}
          variants={stagger(0.12)}
          initial="hidden"
          whileInView="show"
          viewport={VIEWPORT}
        >
          <motion.p className={styles.eyebrow} variants={fadeUp}>Our Team</motion.p>
          <motion.h2 className={styles.heading} variants={fadeUp}>Meet the Experts</motion.h2>
          <motion.p className={styles.subtext} variants={fadeUp}>
            The One Clinic is led by experienced, qualified doctors committed to your safety and results.
          </motion.p>
        </motion.div>
      </Container>

      {/* ── Carousel viewport (full-width, no Container) ───── */}
      <div className={styles.carouselOuter}>
        {/* Arrow buttons */}
        <button
          className={`${styles.arrowBtn} ${styles.arrowPrev}`}
          onClick={() => scrollBy(CARD_STEP)}
          aria-label="Previous team members"
        >
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
            <path d="M11 4L6 9L11 14" stroke="currentColor" strokeWidth="2"
              strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        <button
          className={`${styles.arrowBtn} ${styles.arrowNext}`}
          onClick={() => scrollBy(-CARD_STEP)}
          aria-label="Next team members"
        >
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
            <path d="M7 4L12 9L7 14" stroke="currentColor" strokeWidth="2"
              strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>

        {/* Edge fade masks */}
        <div className={styles.fadeLeft}  aria-hidden="true" />
        <div className={styles.fadeRight} aria-hidden="true" />

        {/* Scrolling track */}
        <div
          ref={trackRef}
          className={styles.track}
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
          aria-label="Meet the experts carousel"
        >
          {/* Render the list twice for seamless loop */}
          {[...TEAM_MEMBERS, ...TEAM_MEMBERS].map((member, i) => (
            <Link
              key={i}
              href={member.profileUrl ?? `/our-team/${member.slug}`}
              className={styles.card}
              aria-hidden={i >= TEAM_MEMBERS.length ? true : undefined}
              tabIndex={i >= TEAM_MEMBERS.length ? -1 : 0}
            >
              {/* Photo or initials */}
              <div className={styles.photoWrap}>
                {member.image ? (
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className={styles.photo}
                    sizes="220px"
                    draggable={false}
                  />
                ) : (
                  <div className={styles.initials} aria-hidden="true">
                    {member.initials}
                  </div>
                )}
                <div className={styles.photoOverlay} aria-hidden="true" />
              </div>

              {/* Name + role */}
              <div className={styles.cardInfo}>
                <p className={styles.cardName}>{member.name}</p>
                {member.credentials && (
                  <p className={styles.cardCredentials}>{member.credentials}</p>
                )}
                <p className={styles.cardRole}>{member.role}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </Section>
  );
}
