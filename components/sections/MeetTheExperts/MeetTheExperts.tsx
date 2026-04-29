'use client';

import { useState, useRef, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { TEAM_MEMBERS } from '@/data/team';
import styles from './MeetTheExperts.module.css';

const TOTAL = TEAM_MEMBERS.length;

const PORTRAIT_VARIANTS = {
  enter: (dir: number) => ({ x: dir * 48, opacity: 0, scale: 0.97 }),
  center: { x: 0, opacity: 1, scale: 1 },
  exit: (dir: number) => ({ x: dir * -32, opacity: 0, scale: 0.98 }),
};

export default function MeetTheExperts() {
  const [active, setActive] = useState(0);
  const [direction, setDirection] = useState(1);
  const touchStartX = useRef(0);
  const touchStartY = useRef(0);

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

  return (
    <section
      className={styles.section}
      data-section-theme="dark"
      aria-label="Meet the Experts"
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      <div className={styles.glow1} aria-hidden="true" />
      <div className={styles.glow2} aria-hidden="true" />

      {/* ── Split showcase layout ── */}
      <div className={styles.showcase}>

        {/* LEFT: editorial vertical marker */}
        <div className={styles.leftCol} aria-hidden="true">
          <span className={styles.vertLabel}>Meet the Experts</span>
          <div className={styles.progressBar}>
            <div
              className={styles.progressFill}
              style={{ height: `${((active + 1) / TOTAL) * 100}%` }}
            />
          </div>
          <div className={styles.counter}>
            <span className={styles.counterCurrent}>{String(active + 1).padStart(2, '0')}</span>
            <span className={styles.counterSep}>/</span>
            <span className={styles.counterTotal}>{String(TOTAL).padStart(2, '0')}</span>
          </div>
        </div>

        {/* CENTER: large dominant portrait */}
        <div className={styles.centerCol}>
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
                transition={{ duration: 0.62, ease: [0.22, 1, 0.36, 1] }}
              >
                {member.image ? (
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className={styles.portrait}
                    sizes="(max-width: 640px) 100vw, (max-width: 1100px) 45vw, 520px"
                    priority
                  />
                ) : (
                  <div className={styles.initials} aria-hidden="true">
                    {member.initials}
                  </div>
                )}
                <div className={styles.portraitOverlay} aria-hidden="true" />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* RIGHT: name, role, bio, navigation */}
        <div className={styles.rightCol}>
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={active}
              className={styles.infoPanel}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.46, ease: [0.22, 1, 0.36, 1] }}
            >
              <p className={styles.eyebrow}>Our Team</p>
              <h2 className={styles.expertName}>{member.name}</h2>
              {member.credentials && (
                <p className={styles.credentials}>{member.credentials}</p>
              )}
              <p className={styles.role}>{member.role}</p>
              <div className={styles.rule} aria-hidden="true" />
              <p className={styles.bio}>{member.bio[0]}</p>
              <Link
                href={member.profileUrl ?? `/our-team/${member.slug}`}
                className={styles.cta}
              >
                View Profile
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.6"
                    strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
            </motion.div>
          </AnimatePresence>

          {/* Nav arrows */}
          <div className={styles.navRow}>
            <button
              className={styles.navBtn}
              onClick={prev}
              aria-label="Previous expert"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path d="M10 3L5 8L10 13" stroke="currentColor" strokeWidth="1.75"
                  strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <button
              className={styles.navBtn}
              onClick={next}
              aria-label="Next expert"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path d="M6 3L11 8L6 13" stroke="currentColor" strokeWidth="1.75"
                  strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
        </div>

      </div>

      {/* ── Thumbnail navigation strip ── */}
      <div className={styles.thumbNav} role="tablist" aria-label="Team member navigation">
        {TEAM_MEMBERS.map((m, i) => (
          <button
            key={m.slug}
            className={`${styles.thumb} ${i === active ? styles.thumbActive : ''}`}
            onClick={() => goTo(i)}
            role="tab"
            aria-selected={i === active}
            aria-label={m.name}
          >
            <div className={styles.thumbImgWrap}>
              {m.image ? (
                <Image
                  src={m.image}
                  alt=""
                  fill
                  className={styles.thumbImg}
                  sizes="72px"
                />
              ) : (
                <span className={styles.thumbInitials}>{m.initials}</span>
              )}
            </div>
            <span className={styles.thumbName}>{m.name.split(' ').pop()}</span>
          </button>
        ))}
      </div>
    </section>
  );
}
