'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { m } from 'framer-motion';
import { PILLARS, SLIDES } from '@/components/brand/BrandProcess';
import V1Heading from './V1Heading';
import styles from './V1Philosophy.module.css';

const EASE = [0.22, 1, 0.36, 1] as const;
const VIEW = { once: true, margin: '-70px 0px' };
const INTERVAL = 5200;

/**
 * Our Philosophy.
 *
 * Laid out as an editorial spread rather than the two-column split it
 * used to be: masthead, then a band of frames, then the pillars as a
 * ledger beneath. The page already spends its two-column budget on
 * Contact, and a section whose whole job is to say who the clinic is
 * reads better given the full measure than squeezed into half of it.
 *
 * The masthead's right-hand figure is the patient count. It is a
 * statistic set as display type, not a second column of prose: the
 * heading keeps the page's one voice, and the number fills the space
 * beside it that a left-aligned heading would otherwise leave empty.
 *
 * The band is a filmstrip that opens rather than a single wide plate.
 * Every image in SLIDES is a 3:4 portrait, and a full-measure landscape
 * band crops them through the shoulders; four upright frames, one of
 * them open, is the shape the photographs already are. The open frame
 * is the only one in colour, which is the strongest signal a monochrome
 * page has to spend.
 *
 * The frames and the pillars stay wired together - hovering a pillar
 * opens its matching frame, and the frames themselves are buttons. That
 * is the one interaction this section has, and it is what stops the
 * media reading as decoration running on its own timer.
 */
export default function V1Philosophy() {
  const [slide, setSlide] = useState(0);
  const [hovered, setHovered] = useState<number | null>(null);

  // A timeout keyed on the current frame rather than one standing
  // interval: picking a frame by hand restarts the dwell instead of
  // being cut short by whatever was left of the previous tick. Paused
  // while a pillar or a frame is pinning the band, so nothing jumps
  // out from under the pointer.
  useEffect(() => {
    if (hovered !== null) return;
    const t = setTimeout(() => setSlide((i) => (i + 1) % SLIDES.length), INTERVAL);
    return () => clearTimeout(t);
  }, [slide, hovered]);

  const active = hovered !== null ? hovered % SLIDES.length : slide;

  return (
    <div className={styles.layout}>
      {/* ── Masthead ── */}
      <div className={styles.masthead}>
        <div className={styles.mastheadCopy}>
          <V1Heading chip="About Us" title="Our" accent="Philosophy" align="left" />
          <m.p
            className={styles.lede}
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={VIEW}
            transition={{ duration: 0.85, delay: 0.18, ease: EASE }}
          >
            One Clinic Leicester, where a fresh approach to aesthetics meets genuine,
            lasting care for every patient.
          </m.p>
        </div>

        <m.p
          className={styles.figure}
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VIEW}
          transition={{ duration: 0.85, delay: 0.3, ease: EASE }}
        >
          <span className={styles.figureNum}>2000+</span>
          <span className={styles.figureLabel}>Patients Treated</span>
        </m.p>
      </div>

      {/* ── Band ── */}
      <m.div
        className={styles.band}
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={VIEW}
        transition={{ duration: 1, ease: EASE }}
      >
        {SLIDES.map((s, i) => (
          <button
            key={s.src}
            type="button"
            className={`${styles.frame} ${i === active ? styles.frameOn : ''}`}
            aria-label={s.alt}
            aria-pressed={i === active}
            onClick={() => setSlide(i)}
            onMouseEnter={() => setHovered(i)}
            onMouseLeave={() => setHovered(null)}
            onFocus={() => setHovered(i)}
            onBlur={() => setHovered(null)}
          >
            <Image
              src={s.src}
              alt=""
              fill
              className={styles.img}
              sizes="(max-width: 900px) 50vw, 560px"
            />
          </button>
        ))}
      </m.div>

      {/* ── Ledger ── */}
      <div className={styles.ledger}>
        {PILLARS.map((p, i) => (
          <m.article
            key={p.tag}
            className={styles.pillar}
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={VIEW}
            transition={{ duration: 0.8, delay: i * 0.12, ease: EASE }}
            onMouseEnter={() => setHovered(i)}
            onMouseLeave={() => setHovered(null)}
          >
            <span className={styles.pillarRule} aria-hidden="true" />
            <span className={styles.tag}>{p.tag}</span>
            <h3 className={styles.pillarHeading}>{p.heading}</h3>
            <p className={styles.pillarText}>{p.body}</p>
          </m.article>
        ))}
      </div>
    </div>
  );
}
