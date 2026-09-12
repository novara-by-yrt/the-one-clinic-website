'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { m, useReducedMotion } from 'framer-motion';
import { CLINIC_INFO } from '@/lib/clinic-info';
import styles from './BrandHeroSpread.module.css';

const EASE = [0.22, 1, 0.36, 1] as const;

/**
 * How long a frame holds. The wide reel opens on half of this and then
 * settles into the same period, so the two are permanently interleaved
 * and the hero always has one frame settling and one frame still.
 */
const HOLD = 6800;

type Frame = { src: string; alt: string; caption: string; pos: string };

/**
 * The two reels, cast to the shape of the frame they sit in.
 *
 * The tall plate beside the copy is portrait, so it takes the upright
 * photographs: the building, the team, the treatments. The wide plate
 * under the copy is landscape, so it takes the rooms. Sorting them this
 * way is the point of the layout - in a single horizontal band every
 * one of these had to be cropped to the same letterbox, and the upright
 * ones lost their subject to it.
 *
 * Both open on the clinic itself, which is what the hero introduces.
 * The lists are disjoint, so the two plates can never show the same
 * photograph at once.
 */
const TALL: Frame[] = [
  {
    src: '/images/location1.jpg',
    alt: 'The One Clinic on DeMontfort Street, Leicester',
    caption: '36 DeMontfort Street',
    pos: 'center 62%',
  },
  {
    src: '/images/Team Image.jpg',
    alt: 'The clinical team at The One Clinic',
    caption: 'Our Team',
    pos: 'center 32%',
  },
  {
    src: '/images/Lumecca IPL Laser 2.png',
    alt: 'A Lumecca IPL treatment at The One Clinic',
    caption: 'Lumecca IPL',
    pos: 'center 30%',
  },
  {
    src: '/images/Morpheus8 1.png',
    alt: 'A Morpheus8 treatment at The One Clinic',
    caption: 'Morpheus8',
    pos: 'center 32%',
  },
];

const WIDE: Frame[] = [
  {
    src: '/images/location2.jpg',
    alt: 'The reception at The One Clinic, Leicester',
    caption: 'Reception',
    pos: 'center 58%',
  },
  {
    src: '/images/location3.jpg',
    alt: 'The reception desk at The One Clinic',
    caption: 'The Front Desk',
    pos: 'center 50%',
  },
  {
    src: '/images/Doctor1.jpg',
    alt: 'A consultation at The One Clinic',
    caption: 'Consultation',
    pos: 'center 36%',
  },
  {
    src: '/images/Doctor2.jpg',
    alt: 'A clinician performing a treatment at The One Clinic',
    caption: 'In Treatment',
    pos: 'center 36%',
  },
];

/**
 * The colophon's second line. Built from CLINIC_INFO.hours rather than
 * through formatHours(): the shared helper joins with a comma where a
 * range dash belongs, so it returns "Monday , Friday" and
 * "09:00 , 18:00". Fixing the helper would change every page that calls
 * it, so this reads the same source data and formats it correctly.
 */
const span = (h: { open: string | null; close: string | null }) =>
  h.open && h.close ? `${h.open}–${h.close}` : 'Closed';

const HOURS = `Mon–Fri ${span(CLINIC_INFO.hours[0])} · Sat ${span(
  CLINIC_INFO.hours[5],
)}`;

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
 * One reel's clock. Keyed on the frame it is showing, so any change
 * restarts the hold, a hand-picked one included.
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

/**
 * One plate.
 *
 * Frames are stacked and cross-faded, and only the ones that have been
 * reached are in the DOM: both plates sit above the fold, so
 * loading="lazy" would not hold any of them back, and eight
 * photographs on first paint is the difference between a fast hero and
 * a slow one.
 */
function Plate({
  frames,
  index,
  onPick,
  eager,
  label,
  className,
  sizes,
}: {
  frames: Frame[];
  index: number;
  onPick: (i: number) => void;
  eager: boolean;
  label: string;
  className: string;
  sizes: string;
}) {
  const [live, setLive] = useState<number[]>([0]);

  useEffect(() => {
    setLive((prev) => {
      const next = (index + 1) % frames.length;
      if (prev.includes(index) && prev.includes(next)) return prev;
      return [...new Set([...prev, index, next])];
    });
  }, [index, frames.length]);

  return (
    <div className={`${styles.plate} ${className}`}>
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
              sizes={sizes}
              quality={75}
              style={{ objectPosition: f.pos }}
              preload={eager && i === 0}
              fetchPriority={i === 0 ? 'high' : undefined}
            />
          </div>
        ) : null,
      )}

      <span className={styles.inset} aria-hidden="true" />

      <div className={styles.caption}>
        <p className={styles.captionText}>{frames[index].caption}</p>

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
 * The homepage hero.
 *
 * The same masthead as /v1, but the image band is an L rather than a
 * strip: a tall plate stands beside the copy and a wide one runs under
 * it, so the photographs take the space a left-aligned headline leaves
 * to its right instead of waiting below the fold for it.
 *
 * Both plates bleed to their own edge of the screen. Only the copy is
 * on the page's gutter, which is what keeps the corner where the two
 * plates meet reading as one piece of cut paper.
 *
 * Each reel keeps its own clock, offset by half a hold. They stop when
 * the hero leaves the screen, and never start for anyone who asks for
 * reduced motion, who gets the opening frame of each reel and the
 * marks to move between them by hand.
 */
export default function BrandHeroSpread() {
  const heroRef = useRef<HTMLElement>(null);
  const [onScreen, setOnScreen] = useState(true);
  const still = useReducedMotion();
  const run = !still && onScreen;

  const [tall, setTall] = useReel(TALL.length, HOLD, run);
  const [wide, setWide] = useReel(WIDE.length, HOLD / 2, run);

  useEffect(() => {
    const el = heroRef.current;
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
      ref={heroRef}
      className={styles.hero}
      aria-label="The One Clinic — medical and aesthetic care in Leicester"
      data-section-theme="light"
    >
      <m.div
        className={styles.copy}
        initial="hidden"
        animate="show"
        transition={{ staggerChildren: 0.1, delayChildren: 0.08 }}
      >
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

      <m.div
        className={styles.tallWrap}
        initial={{ opacity: 0, y: 28 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.1, delay: 0.2, ease: EASE }}
      >
        <Plate
          frames={TALL}
          index={tall}
          onPick={setTall}
          eager
          label="The clinic"
          className={styles.plateTall}
          sizes="(max-width: 860px) 100vw, 45vw"
        />
      </m.div>

      <m.div
        className={styles.wideWrap}
        initial={{ opacity: 0, y: 28 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.1, delay: 0.32, ease: EASE }}
      >
        <Plate
          frames={WIDE}
          index={wide}
          onPick={setWide}
          eager={false}
          label="Inside the clinic"
          className={styles.plateWide}
          sizes="(max-width: 860px) 100vw, 55vw"
        />
      </m.div>
    </section>
  );
}
