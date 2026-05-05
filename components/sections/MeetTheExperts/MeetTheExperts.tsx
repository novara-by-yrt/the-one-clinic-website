'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { TEAM_MEMBERS } from '@/data/team';
import styles from './MeetTheExperts.module.css';

const TOTAL = TEAM_MEMBERS.length;

const CARD_VARIANTS = {
  enter:  (d: number) => ({ x: d * 56, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit:   (d: number) => ({ x: d * -36, opacity: 0 }),
};

const INFO_VARIANTS = {
  hidden: { opacity: 0, y: 14 },
  show:   { opacity: 1, y: 0,  transition: { duration: 0.38, ease: [0.22, 1, 0.36, 1] as const } },
  exit:   { opacity: 0, y: -8, transition: { duration: 0.20, ease: 'easeIn' as const } },
};

export default function MeetTheExperts() {
  const [active, setActive]       = useState(0);
  const [direction, setDirection] = useState(1);
  const autoRef    = useRef<ReturnType<typeof setInterval> | undefined>(undefined);
  const touchStartX = useRef(0);
  const touchStartY = useRef(0);
  const dragStartX  = useRef(0);
  const dragging    = useRef(false);

  /* ── auto-advance ───────────────────────────────────────────── */
  const startAuto = useCallback(() => {
    clearInterval(autoRef.current);
    autoRef.current = setInterval(() => {
      setDirection(1);
      setActive(i => (i + 1) % TOTAL);
    }, 5000);
  }, []);

  useEffect(() => { startAuto(); return () => clearInterval(autoRef.current); }, [startAuto]);

  /* ── navigation ─────────────────────────────────────────────── */
  const prev = useCallback(() => {
    setDirection(-1);
    setActive(i => (i - 1 + TOTAL) % TOTAL);
    startAuto();
  }, [startAuto]);

  const next = useCallback(() => {
    setDirection(1);
    setActive(i => (i + 1) % TOTAL);
    startAuto();
  }, [startAuto]);

  const goTo = useCallback((i: number) => {
    setDirection(i > active ? 1 : -1);
    setActive(i);
    startAuto();
  }, [active, startAuto]);

  /* ── touch & drag ───────────────────────────────────────────── */
  function onTouchStart(e: React.TouchEvent) {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  }
  function onTouchEnd(e: React.TouchEvent) {
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    const dy = e.changedTouches[0].clientY - touchStartY.current;
    if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 44)
      dx < 0 ? next() : prev();
  }
  function onMouseDown(e: React.MouseEvent) {
    dragStartX.current = e.clientX;
    dragging.current = true;
  }
  function onMouseUp(e: React.MouseEvent) {
    if (!dragging.current) return;
    dragging.current = false;
    const dx = e.clientX - dragStartX.current;
    if (Math.abs(dx) > 44) dx < 0 ? next() : prev();
  }

  const member     = TEAM_MEMBERS[active];
  const prevMember = TEAM_MEMBERS[(active - 1 + TOTAL) % TOTAL];
  const nextMember = TEAM_MEMBERS[(active + 1) % TOTAL];

  return (
    <section
      className={styles.section}
      aria-label="Meet the Experts"
      data-section-theme="light"
    >
      {/* ── Header ── */}
      <div className={styles.header}>
        <span className={styles.chip}>
          <span className={styles.chipDot} aria-hidden="true" />
          Our Clinical Team
        </span>
        <h2 className={styles.heading}>Meet the Experts</h2>
      </div>

      {/* ── Stage: [prev] [active] [info + next] ── */}
      <div
        className={styles.stage}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
        onMouseDown={onMouseDown}
        onMouseUp={onMouseUp}
      >

        {/* ── Prev card (small, left, bottom-aligned) ── */}
        <button
          className={styles.sideCard}
          onClick={prev}
          aria-label={`View ${prevMember.name}`}
        >
          <AnimatePresence mode="popLayout" initial={false}>
            <motion.div
              key={prevMember.slug}
              className={styles.sideCardInner}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.30 }}
            >
              {prevMember.image ? (
                <Image src={prevMember.image} alt={prevMember.name} fill
                  className={styles.cardImg} sizes="160px" draggable={false} />
              ) : (
                <div className={styles.cardInitials}>{prevMember.initials}</div>
              )}
              <div className={styles.sideDim} aria-hidden="true" />
            </motion.div>
          </AnimatePresence>
        </button>

        {/* ── Active card (tall, center) ── */}
        <div className={styles.activeCard} aria-live="polite">
          <AnimatePresence mode="wait" initial={false} custom={direction}>
            <motion.div
              key={active}
              className={styles.activeInner}
              custom={direction}
              variants={CARD_VARIANTS}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.48, ease: [0.22, 1, 0.36, 1] }}
            >
              {member.image ? (
                <Image src={member.image} alt={member.name} fill
                  className={styles.cardImg}
                  sizes="(max-width:640px) 55vw, 320px"
                  priority draggable={false} />
              ) : (
                <div className={styles.cardInitials}>{member.initials}</div>
              )}
              <div className={styles.activeOverlay} aria-hidden="true" />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* ── Right column: info (top) + next thumb (bottom) ── */}
        <div className={styles.rightCol}>

          {/* Info panel — upper portion */}
          <div className={styles.infoArea} aria-live="polite">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={active}
                className={styles.infoPanel}
                variants={INFO_VARIANTS}
                initial="hidden"
                animate="show"
                exit="exit"
              >
                <p className={styles.counter}>
                  #{String(active + 1).padStart(2, '0')}
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

          {/* Next card thumbnail — lower portion */}
          <button
            className={styles.nextThumb}
            onClick={next}
            aria-label={`View ${nextMember.name}`}
          >
            <AnimatePresence mode="popLayout" initial={false}>
              <motion.div
                key={nextMember.slug}
                className={styles.nextThumbInner}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.30 }}
              >
                {nextMember.image ? (
                  <Image src={nextMember.image} alt={nextMember.name} fill
                    className={styles.cardImg} sizes="160px" draggable={false} />
                ) : (
                  <div className={styles.cardInitials}>{nextMember.initials}</div>
                )}
                <div className={styles.sideDim} aria-hidden="true" />
              </motion.div>
            </AnimatePresence>
          </button>

        </div>
      </div>

      {/* ── Arrows — centered below the entire slideshow ── */}
      <div className={styles.navRow}>
        <button className={styles.navBtn} onClick={prev} aria-label="Previous team member">
          <svg width="16" height="16" viewBox="0 0 18 18" fill="none">
            <path d="M11 3.5L5.5 9L11 14.5" stroke="currentColor" strokeWidth="1.8"
              strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        <button className={styles.navBtn} onClick={next} aria-label="Next team member">
          <svg width="16" height="16" viewBox="0 0 18 18" fill="none">
            <path d="M7 3.5L12.5 9L7 14.5" stroke="currentColor" strokeWidth="1.8"
              strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>

    </section>
  );
}
