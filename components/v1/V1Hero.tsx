'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { m, useReducedMotion } from 'framer-motion';
import { CLINIC_INFO } from '@/lib/clinic-info';
import styles from './V1Hero.module.css';

const EASE = [0.22, 1, 0.36, 1] as const;

/**
 * How long a frame holds. The right reel opens on half of this and then
 * settles into the same period, so the two are permanently interleaved
 * and the band always has one frame settling and one frame still.
 */
const HOLD = 6800;

/**
 * The colophon's second line.
 *
 * Built from CLINIC_INFO.hours rather than through formatHours(): the
 * shared helper joins with a comma where a range dash belongs, so it
 * returns "Monday , Friday" and "09:00 , 18:00". Fixing the helper
 * would change every page that calls it, which is not this change's
 * job, so this reads the same source data and formats it correctly.
 */
const span = (h: { open: string | null; close: string | null }) =>
  h.open && h.close ? `${h.open}\u2013${h.close}` : 'Closed';

const HOURS = `Mon\u2013Fri ${span(CLINIC_INFO.hours[0])} \u00b7 Sat ${span(
  CLINIC_INFO.hours[5],
)}`;

type Frame = { src: string; alt: string; caption: string; pos: string };

/**
 * The two reels.
 *
 * Both open on the clinic itself, which is what the hero is
 * introducing: the reception on the left, the building on the right.
 * Pairing the interior with the exterior rather than with a second
 * interior is deliberate - the first draft opened on two views of the
 * same cream reception and the pair read as one photograph printed
 * twice. From there the left reel stays inside and the right reel goes
 * to the work. The lists are disjoint, so the two panels can never
 * land on the same photograph.
 *
 * `pos` is the crop anchor. The band is landscape and every source
 * here is square or upright, so a shared object-position cannot serve
 * a room, a building and a portrait at once: centre keeps the ceiling
 * and loses the sofa, the doorway and the face.
 */
const LEFT: Frame[] = [
  {
    src: '/images/location2.jpg',
    alt: 'The reception at The One Clinic, Leicester',
    caption: 'Reception',
    pos: 'center 58%',
  },
  {
    src: '/images/Team Image.jpg',
    alt: 'The clinical team at The One Clinic',
    caption: 'Our Team',
    pos: 'center 30%',
  },
  {
    src: '/images/Doctor2.jpg',
    alt: 'A clinician performing a treatment at The One Clinic',
    caption: 'In Treatment',
    pos: 'center 34%',
  },
  {
    src: '/images/location3.jpg',
    alt: 'The reception desk at The One Clinic',
    caption: 'The Front Desk',
    pos: 'center 50%',
  },
];

const RIGHT: Frame[] = [
  {
    src: '/images/location1.jpg',
    alt: 'The One Clinic on DeMontfort Street, Leicester',
    caption: '36 DeMontfort Street',
    pos: 'center 62%',
  },
  {
    src: '/images/Lumecca IPL Laser 2.png',
    alt: 'A Lumecca IPL treatment at The One Clinic',
    caption: 'Lumecca IPL',
    pos: 'center 32%',
  },
  {
    src: '/images/Doctor1.jpg',
    alt: 'A consultation at The One Clinic',
    caption: 'Consultation',
    pos: 'center 34%',
  },
  {
    src: '/images/Morpheus8 1.png',
    alt: 'A Morpheus8 treatment at The One Clinic',
    caption: 'Morpheus8',
    pos: 'center 34%',
  },
];

/**
 * One reel's clock.
 *
 * Keyed on the frame it is showing, so any change restarts the hold,
 * a hand-picked one included. An earlier draft ran both reels off a
 * single metronome to keep them exactly interleaved, and measured the
 * cost: a frame picked by hand was moved on 1.5s later because the
 * shared clock was already most of the way through its beat. A full
 * hold after a deliberate pick is worth more than a stagger held to
 * the millisecond.
 */
function useReel(count: number, lead: number, run: boolean) {
  const [index, setIndex] = useState(0);
  const first = useRef(true);

  useEffect(() => {
    if (!run) return;
    const wait = first.current ? lead : HOLD;
    first.current = false;
    const t = setTimeout(() => setIndex((v) => (v + 1) % count), wait);
    return () => clearTimeout(t);
  }, [index, run, count, lead]);

  return [index, setIndex] as const;
}

/** Rating marks: the brand is monochrome, so they read by shape, not hue. */
function Stars() {
  return (
    <span className={styles.stars} aria-hidden="true">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} width="11" height="11" viewBox="0 0 24 24">
          <path
            fill="currentColor"
            d="M12 2l2.582 7.952H22.9l-6.832 4.962 2.608 8.024L12 18.012l-6.676 4.926 2.608-8.024L1.1 9.952H9.418z"
          />
        </svg>
      ))}
    </span>
  );
}

/**
 * One reel.
 *
 * Frames are stacked and cross-faded, and only the ones that have been
 * reached are in the DOM: the whole band sits above the fold, so
 * loading="lazy" would not hold any of them back, and eight photographs
 * on first paint is the difference between a fast hero and a slow one.
 */
function Panel({
  frames,
  index,
  onPick,
  eager,
  label,
}: {
  frames: Frame[];
  index: number;
  onPick: (i: number) => void;
  eager: boolean;
  label: string;
}) {
  // Index 0 on the server and on the first client render, so hydration
  // matches; the next frame joins as soon as the effect runs, ready for
  // the first turn.
  const [live, setLive] = useState<number[]>([0]);

  useEffect(() => {
    setLive((prev) => {
      const next = (index + 1) % frames.length;
      if (prev.includes(index) && prev.includes(next)) return prev;
      return [...new Set([...prev, index, next])];
    });
  }, [index, frames.length]);

  return (
    <div className={styles.panel}>
      {frames.map((f, i) =>
        live.includes(i) ? (
          <div
            key={f.src}
            className={`${styles.frame} ${i === index ? styles.frameOn : ''}`}
          >
            <Image
              src={f.src}
              alt={i === index ? f.alt : ''}
              aria-hidden={i !== index}
              fill
              className={styles.img}
              sizes="(max-width: 700px) 100vw, 50vw"
              quality={75}
              style={{ objectPosition: f.pos }}
              preload={eager && i === 0}
              fetchPriority={i === 0 ? 'high' : undefined}
            />
          </div>
        ) : null,
      )}

      {/* The rule the reference draws inside the photograph. It is what
          stops a full-bleed image reading as a background and makes it
          read as a plate that was placed. */}
      <span className={styles.inset} aria-hidden="true" />

      <div className={styles.caption}>
        <p className={styles.captionText} aria-live="off">
          {frames[index].caption}
        </p>

        <ul className={styles.ticks} role="list" aria-label={label}>
          {frames.map((f, i) => (
            <li key={f.src}>
              <button
                type="button"
                className={`${styles.tick} ${i === index ? styles.tickOn : ''}`}
                onClick={() => onPick(i)}
                aria-label={f.caption}
                aria-current={i === index ? 'true' : undefined}
              />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

/**
 * The v1 hero.
 *
 * A masthead on paper over a full-bleed pair of reels, rather than copy
 * floating on a darkened photograph. The type block is the only thing on
 * the first screen that asks to be read, and the clinic itself carries
 * everything below it.
 *
 * Each reel keeps its own clock, offset by half a hold, so one frame is
 * always settling while the other is still. Picking a frame by hand
 * restarts that reel's hold rather than dropping into the middle of one.
 *
 * They stop when the band leaves the screen, and it never starts at all
 * for anyone who asks for reduced motion, who gets the opening frame of
 * each reel and the marks to move between them by hand.
 */
export default function V1Hero() {
  const bandRef = useRef<HTMLDivElement>(null);
  const [onScreen, setOnScreen] = useState(true);
  const still = useReducedMotion();
  const run = !still && onScreen;

  const [a, setA] = useReel(LEFT.length, HOLD, run);
  const [b, setB] = useReel(RIGHT.length, HOLD / 2, run);

  /* ── Pause off screen ──
     The hero is the top of a very long page. Once it has scrolled away
     there is nothing to see, and a timer that keeps re-rendering two
     image stacks behind the reader is pure cost. */
  useEffect(() => {
    const el = bandRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => setOnScreen(entry.isIntersecting),
      { rootMargin: '120px' },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const openModal = useCallback(
    () => window.dispatchEvent(new CustomEvent('openBookConsultationModal')),
    [],
  );

  return (
    <section
      className={`${styles.hero} v1-surface-white`}
      aria-label="The One Clinic — medical and aesthetic care in Leicester"
      data-section-theme="light"
    >
      {/* ── Masthead ── */}
      <div className={styles.inner}>
        <m.div
          className={styles.copy}
          initial="hidden"
          animate="show"
          transition={{ staggerChildren: 0.1, delayChildren: 0.08 }}
        >
          {/* Kicker left, colophon right, on one rule. A left-aligned
              headline on a 1256px measure leaves about 520px of empty
              paper beside it; giving the top edge a second anchor is
              what turns that gap into a margin rather than a hole. */}
          <m.div
            className={styles.topRow}
            variants={{ hidden: { opacity: 0, y: 14 }, show: { opacity: 1, y: 0 } }}
            transition={{ duration: 0.7, ease: EASE }}
          >
            <p className={styles.eyebrow}>Medical &amp; Aesthetic Care, Leicester</p>

            <p className={styles.colophon}>
              <span className={styles.colophonPlace}>{CLINIC_INFO.address.display}</span>
              <span className={styles.colophonHours}>{HOURS}</span>
            </p>
          </m.div>

          <m.h1
            className={styles.headline}
            variants={{
              hidden: { opacity: 0, y: 24, filter: 'blur(8px)' },
              show: { opacity: 1, y: 0, filter: 'blur(0px)' },
            }}
            transition={{ duration: 1, ease: EASE }}
          >
            Where Expertise Meets Care
          </m.h1>

          <m.p
            className={styles.sub}
            variants={{ hidden: { opacity: 0, y: 18 }, show: { opacity: 1, y: 0 } }}
            transition={{ duration: 0.75, ease: EASE }}
          >
            Advanced medical, aesthetic and wellness care, all under one roof.
          </m.p>

          <m.div
            className={styles.actions}
            variants={{ hidden: { opacity: 0, y: 18 }, show: { opacity: 1, y: 0 } }}
            transition={{ duration: 0.75, ease: EASE }}
          >
            <button type="button" className={styles.cta} onClick={openModal}>
              Book a Consultation
            </button>
            <a href={`tel:${CLINIC_INFO.phone.tel}`} className={styles.call}>
              {CLINIC_INFO.phone.display}
            </a>
          </m.div>

          {/* Kept from the previous hero, but as a line of type rather
              than two glass cards: the reference's whole argument is that
              the first screen holds one thing to read, and a rating is a
              footnote to the headline, not a second headline. */}
          <m.p
            className={styles.ratings}
            variants={{ hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0 } }}
            transition={{ duration: 0.8, ease: EASE }}
          >
            <span className={styles.rating}>
              <Stars />
              <span>
                <strong>5.0</strong> Google, 120+ reviews
              </span>
            </span>
            <span className={styles.ratingRule} aria-hidden="true" />
            <span className={styles.rating}>
              <Stars />
              <span>
                <strong>4.7</strong> Trustpilot, 140+ reviews
              </span>
            </span>
          </m.p>
        </m.div>
      </div>

      {/* ── The band ── */}
      <m.div
        ref={bandRef}
        className={styles.band}
        initial={{ opacity: 0, y: 28 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.1, delay: 0.24, ease: EASE }}
      >
        <Panel frames={LEFT} index={a} onPick={setA} eager label="The clinic" />
        <Panel frames={RIGHT} index={b} onPick={setB} eager={false} label="Our work" />
      </m.div>
    </section>
  );
}
