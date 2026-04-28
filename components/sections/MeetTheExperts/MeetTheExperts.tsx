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

const SPEED     = 0.28;
const CARD_W    = 340;
const GAP       = 28;
const CARD_STEP = CARD_W + GAP;

function expertiseBadge(role: string): string {
  const r = role.toLowerCase();
  if (r.includes('laser') || r.includes('surgeon')) return 'Laser Specialist';
  if (r.includes('founder'))                         return 'Doctor-Led';
  if (r.includes('psychiatr'))                       return 'Psychiatry';
  if (r.includes('general practitioner'))            return 'GP Care';
  if (r.includes('nurse'))                           return 'Clinical Care';
  if (r.includes('patient care'))                    return 'Patient Care';
  return 'Expert Care';
}

export default function MeetTheExperts() {
  const trackRef     = useRef<HTMLDivElement>(null);
  const posRef       = useRef(0);
  const rafRef       = useRef<number>(0);
  const pausedRef    = useRef(false);
  const draggingRef  = useRef(false);
  const dragStartX   = useRef(0);
  const dragStartPos = useRef(0);

  useEffect(() => {
    function tick() {
      const track = trackRef.current;
      if (track && !draggingRef.current && !pausedRef.current) {
        posRef.current -= SPEED;
        const half = track.scrollWidth / 2;
        if (posRef.current <= -half) posRef.current += half;
        track.style.transform = `translateX(${posRef.current}px)`;
      }
      rafRef.current = requestAnimationFrame(tick);
    }
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  function onPointerDown(e: React.PointerEvent) {
    draggingRef.current  = true;
    dragStartX.current   = e.clientX;
    dragStartPos.current = posRef.current;
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  }

  function onPointerMove(e: React.PointerEvent) {
    if (!draggingRef.current || !trackRef.current) return;
    const delta = e.clientX - dragStartX.current;
    const half  = trackRef.current.scrollWidth / 2;
    let   next  = dragStartPos.current + delta;
    while (next <= -half) next += half;
    while (next > 0)      next -= half;
    posRef.current = next;
    trackRef.current.style.transform = `translateX(${next}px)`;
  }

  function onPointerUp() { draggingRef.current = false; }

  function scrollBy(amount: number) {
    const track = trackRef.current;
    if (!track) return;
    const half = track.scrollWidth / 2;
    let   next = posRef.current + amount;
    while (next <= -half) next += half;
    while (next > 0)      next -= half;
    posRef.current = next;
    track.style.transform = `translateX(${next}px)`;
  }

  return (
    <Section variant="dark" data-section-theme="dark" className={styles.section}>
      {/* Atmospheric depth layers */}
      <div className={styles.glow1} aria-hidden="true" />
      <div className={styles.glow2} aria-hidden="true" />

      {/* Header */}
      <Container className={styles.headerWrap}>
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

      {/* Carousel */}
      <div
        className={styles.carouselOuter}
        onMouseEnter={() => { pausedRef.current = true; }}
        onMouseLeave={() => { pausedRef.current = false; }}
      >
        <div className={styles.fadeLeft}  aria-hidden="true" />
        <div className={styles.fadeRight} aria-hidden="true" />

        <div
          ref={trackRef}
          className={styles.track}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerLeave={onPointerUp}
          aria-label="Meet the experts carousel"
        >
          {[...TEAM_MEMBERS, ...TEAM_MEMBERS].map((m, i) => (
            <Link
              key={i}
              href={m.profileUrl ?? `/our-team/${m.slug}`}
              className={`${styles.card} ${i % 2 === 1 ? styles.cardShift : ''}`}
              aria-hidden={i >= TEAM_MEMBERS.length ? true : undefined}
              tabIndex={i >= TEAM_MEMBERS.length ? -1 : 0}
              draggable={false}
            >
              {/* Portrait */}
              {m.image ? (
                <Image
                  src={m.image}
                  alt={m.name}
                  fill
                  className={styles.photo}
                  sizes="(max-width: 768px) 260px, 340px"
                  draggable={false}
                />
              ) : (
                <div className={styles.initials} aria-hidden="true">{m.initials}</div>
              )}

              {/* Atmospheric portrait lighting */}
              <div className={styles.photoHalo} aria-hidden="true" />

              {/* Cinematic overlay */}
              <div className={styles.overlay} aria-hidden="true" />

              {/* Base content — always visible, fades on hover */}
              <div className={styles.base}>
                <p className={styles.baseRole}>{m.role}</p>
                <h3 className={styles.baseName}>{m.name}</h3>
                <div className={styles.baseArrow} aria-hidden="true">
                  <span className={styles.arrowLine} />
                  <span className={styles.arrowLabel}>View Profile</span>
                </div>
              </div>

              {/* Glass hover panel — slides up from bottom */}
              <div className={styles.glass}>
                <span className={styles.chip}>
                  <span className={styles.chipDot} aria-hidden="true" />
                  {expertiseBadge(m.role)}
                </span>
                <h3 className={styles.glassName}>{m.name}</h3>
                <p className={styles.glassRole}>{m.role}</p>
                {m.credentials && <p className={styles.glassCreds}>{m.credentials}</p>}
                <span className={styles.glassCta}>
                  View Profile
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                    <path d="M2 6h8M7 3l3 3-3 3" stroke="currentColor" strokeWidth="1.5"
                      strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Navigation */}
      <Container className={styles.navWrap}>
        <motion.div
          className={styles.navRow}
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VIEWPORT}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay: 0.25 }}
        >
          <button
            className={styles.navBtn}
            onClick={() => scrollBy(CARD_STEP)}
            aria-label="Previous team members"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M10 3L5 8L10 13" stroke="currentColor" strokeWidth="1.75"
                strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          <button
            className={styles.navBtn}
            onClick={() => scrollBy(-CARD_STEP)}
            aria-label="Next team members"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M6 3L11 8L6 13" stroke="currentColor" strokeWidth="1.75"
                strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </motion.div>
      </Container>
    </Section>
  );
}
