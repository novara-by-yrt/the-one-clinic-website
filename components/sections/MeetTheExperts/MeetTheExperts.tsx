'use client';

import { useState, useRef, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { TEAM_MEMBERS } from '@/data/team';
import styles from './MeetTheExperts.module.css';

const TOTAL = TEAM_MEMBERS.length;
const NEXT_COUNT = 3;

const PORTRAIT_VARIANTS = {
  enter: (dir: number) => ({ x: dir * 40, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (dir: number) => ({ x: dir * -24, opacity: 0 }),
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
  const prevMember = TEAM_MEMBERS[(active - 1 + TOTAL) % TOTAL];
  const nextMembers = Array.from({ length: NEXT_COUNT }, (_, i) =>
    TEAM_MEMBERS[(active + i + 1) % TOTAL]
  );

  return (
    <section
      className={styles.section}
      aria-label="Meet the Experts"
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      <div className={styles.wrapper}>

        {/* Vertical editorial label */}
        <div className={styles.labelCol} aria-hidden="true">
          <span className={styles.vertLabel}>Our Team</span>
        </div>

        {/* 2-column portrait | info grid with thumbnail row below */}
        <div className={styles.mainGrid}>

          {/* Portrait */}
          <div className={styles.portraitCol}>
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
                      sizes="(max-width: 580px) 90vw, 300px"
                      priority
                    />
                  ) : (
                    <div className={styles.initials}>{member.initials}</div>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Info */}
          <div className={styles.infoCol} aria-live="polite">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={active}
                className={styles.infoPanel}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
              >
                <p className={styles.counter}>#{active + 1}</p>
                <h2 className={styles.expertName}>{member.name}</h2>
                {member.credentials && (
                  <p className={styles.credentials}>{member.credentials}</p>
                )}
                <p className={styles.role}>{member.role}</p>
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
          </div>

          {/* Thumbnail nav row: prev + dot left, next thumbs right */}
          <div className={styles.navRow}>

            <div className={styles.prevArea}>
              <button
                className={styles.thumbBtn}
                onClick={prev}
                aria-label={`Previous: ${prevMember.name}`}
              >
                <div className={styles.thumbWrap}>
                  {prevMember.image ? (
                    <Image
                      src={prevMember.image}
                      alt={prevMember.name}
                      fill
                      className={styles.thumbImg}
                      sizes="110px"
                    />
                  ) : (
                    <span className={styles.thumbInitials}>{prevMember.initials}</span>
                  )}
                </div>
              </button>
              <div className={styles.dot} aria-hidden="true" />
            </div>

            <div className={styles.nextArea}>
              {nextMembers.map((m, i) => (
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
                        sizes="110px"
                      />
                    ) : (
                      <span className={styles.thumbInitials}>{m.initials}</span>
                    )}
                  </div>
                </button>
              ))}
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
