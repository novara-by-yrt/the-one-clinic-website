'use client';

import { useState, useRef, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { TEAM_MEMBERS } from '@/data/team';
import styles from './MeetTheExperts.module.css';

const TOTAL = TEAM_MEMBERS.length;
const THUMB_COUNT = 4;

const PORTRAIT_VARIANTS = {
  enter:  (dir: number) => ({ x: dir * 48, opacity: 0, scale: 0.97 }),
  center: { x: 0, opacity: 1, scale: 1 },
  exit:   (dir: number) => ({ x: dir * -28, opacity: 0, scale: 0.97 }),
};

export default function MeetTheExperts() {
  const [active, setActive]       = useState(0);
  const [direction, setDirection] = useState(1);
  const touchStartX               = useRef(0);
  const touchStartY               = useRef(0);

  const goTo = useCallback((index: number) => {
    if (index === active) return;
    setDirection(index > active ? 1 : -1);
    setActive(index);
  }, [active]);

  const prev = useCallback(() => {
    setDirection(-1);
    setActive(i => (i - 1 + TOTAL) % TOTAL);
  }, []);

  const next = useCallback(() => {
    setDirection(1);
    setActive(i => (i + 1) % TOTAL);
  }, []);

  function onTouchStart(e: React.TouchEvent) {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  }
  function onTouchEnd(e: React.TouchEvent) {
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    const dy = e.changedTouches[0].clientY - touchStartY.current;
    if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 44) {
      if (dx < 0) next(); else prev();
    }
  }

  const member = TEAM_MEMBERS[active];
  const thumbMembers = Array.from({ length: THUMB_COUNT }, (_, i) =>
    TEAM_MEMBERS[(active + i + 1) % TOTAL]
  );

  return (
    <section
      className={styles.section}
      aria-label="Meet the Experts"
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      {/* ── Centered section header ─────────────────────────── */}
      <div className={styles.header}>
        <p className={styles.eyebrow}>Our Clinical Team</p>
        <h2 className={styles.heading}>Meet the Experts</h2>
        <p className={styles.subtext}>
          Clinician-led care from a team of qualified doctors, surgeons, and specialists —
          all dedicated to your health and confidence.
        </p>
      </div>

      {/* ── Main card ────────────────────────────────────────── */}
      <div className={styles.card}>

        {/* Portrait */}
        <div
          className={styles.portraitCol}
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
        >
          <div className={styles.portraitFrame}>
            <AnimatePresence custom={direction} initial={false}>
              <motion.div
                key={active}
                className={styles.portraitInner}
                custom={direction}
                variants={PORTRAIT_VARIANTS}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              >
                {member.image ? (
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className={styles.portrait}
                    sizes="(max-width: 600px) 100vw, 360px"
                    priority
                  />
                ) : (
                  <div className={styles.initials}>{member.initials}</div>
                )}
              </motion.div>
            </AnimatePresence>
            {/* Bottom gradient so info overlaps cleanly on mobile */}
            <div className={styles.portraitGrad} aria-hidden="true" />
            {/* Counter badge */}
            <div className={styles.counterBadge} aria-hidden="true">
              <span>{String(active + 1).padStart(2, '0')}</span>
              <span className={styles.counterSep}>/</span>
              <span className={styles.counterTotal}>{String(TOTAL).padStart(2, '0')}</span>
            </div>
          </div>
        </div>

        {/* Info */}
        <div className={styles.infoCol} aria-live="polite">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={active}
              className={styles.infoPanel}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
            >
              <h3 className={styles.expertName}>{member.name}</h3>
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

      </div>

      {/* ── Nav row: arrow | thumbnails | arrow ─────────────── */}
      <div className={styles.navRow}>

        <button
          className={styles.navArrow}
          onClick={prev}
          aria-label="Previous team member"
        >
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <path d="M11 3.5L5.5 9L11 14.5" stroke="currentColor" strokeWidth="1.8"
              strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>

        <div className={styles.thumbStrip}>
          {thumbMembers.map((m, i) => (
            <button
              key={m.slug}
              className={styles.thumbBtn}
              onClick={() => goTo((active + i + 1) % TOTAL)}
              aria-label={`View ${m.name}`}
            >
              <div className={styles.thumbWrap}>
                {m.image ? (
                  <Image
                    src={m.image}
                    alt={m.name}
                    fill
                    className={styles.thumbImg}
                    sizes="100px"
                  />
                ) : (
                  <span className={styles.thumbInitials}>{m.initials}</span>
                )}
              </div>
              <span className={styles.thumbName}>{m.name.split(' ').pop()}</span>
            </button>
          ))}
        </div>

        <button
          className={styles.navArrow}
          onClick={next}
          aria-label="Next team member"
        >
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <path d="M7 3.5L12.5 9L7 14.5" stroke="currentColor" strokeWidth="1.8"
              strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>

      </div>

    </section>
  );
}
