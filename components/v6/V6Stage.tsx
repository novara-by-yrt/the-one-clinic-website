'use client';

import { useCallback, useEffect, useRef, useState, type ReactNode } from 'react';
import styles from './V6Stage.module.css';

/**
 * The query that turns the stage on, matched by every section
 * stylesheet and by the tokens, so the layout and the behaviour can
 * never disagree about which mode is active.
 *
 * Landscape is part of the test on purpose: a 1024px-wide tablet held in
 * portrait gets the plain stacked page, where the two columns would be
 * cramped and the depth would buy nothing.
 */
const STAGE = '(min-width: 1024px) and (orientation: landscape)';
const REDUCED = '(prefers-reduced-motion: reduce)';

/* ── The curve ──
   Kept as named constants rather than read from CSS every frame: the
   handler runs once per frame over every section, and a getComputedStyle
   call in that loop is exactly the sort of read that turns a compositor
   effect back into a layout one. The same numbers are documented against
   their tokens in v6-tokens.css. */
const ARRIVE_SCALE = 0.52; // size it arrives at, as a fraction
const ARRIVE_DEPTH = 760; // px it starts back in the stage
const ARRIVE_RISE = 5; // svh it lifts as it settles
const EXIT_RISE = 108; // svh it travels up on the way out
const EXIT_HOLD = 0.6; // how much of that it stays fully opaque for
const EXIT_SCALE = 0.22; // how far past the camera it enlarges
const EXIT_TILT = 11; // deg it tilts back as it goes
const EXIT_SPAN = 1.25; // screens of scroll it takes to leave
const ARRIVE_EDGE = -1.02; // a hair past -1, so nothing pops at the seam

/** Smoothstep. Eases both ends without overshooting either. */
const smooth = (k: number) => k * k * (3 - 2 * k);

/**
 * The stage.
 *
 * The sections do not flow down the page. They are planes stacked on a
 * fixed stage, in inverted z-order so the first is in front, and a
 * spacer beside the stage carries the scroll height. Scrolling lifts the
 * plane in front up and away, tilting it back past the camera, while the
 * one behind rises out of depth and zooms into its place.
 *
 * Everything the stage needs is one number: `t`, a section's distance
 * from its own turn measured in screens. t = 0 is settled and centred
 * and resolves to no transform at all, so the section being read is
 * composited without resampling. Negative is still back in depth,
 * positive is on the way out.
 *
 * The handler is a single passive scroll listener coalesced into one
 * animation frame, doing one pass over the sections. It writes inline
 * transform, opacity, visibility and will-change, and touches React
 * state only when the whole-number section changes, so a scroll through
 * the page is six state updates rather than one per frame.
 *
 * On a small screen, and for anyone who asks for reduced motion, none of
 * this runs: the sections are in normal document flow and the handler
 * returns before it reads anything. Both conditions are watched at
 * runtime, so switching either one mid-session lands in the right mode.
 */
export default function V6Stage({
  children,
  count,
}: {
  children: ReactNode;
  count: number;
}) {
  const stageRef = useRef<HTMLDivElement>(null);
  const [staged, setStaged] = useState(false);
  const [index, setIndex] = useState(0);
  const [moved, setMoved] = useState(false);

  /* ── Mode, watched at runtime ── */
  useEffect(() => {
    const wide = window.matchMedia(STAGE);
    const still = window.matchMedia(REDUCED);
    const apply = () => setStaged(wide.matches && !still.matches);
    apply();
    wide.addEventListener('change', apply);
    still.addEventListener('change', apply);
    return () => {
      wide.removeEventListener('change', apply);
      still.removeEventListener('change', apply);
    };
  }, []);

  /* ── The pass ── */
  useEffect(() => {
    const stage = stageRef.current;
    if (!stage || !staged) return;

    const sections = Array.from(stage.children) as HTMLElement[];
    let frame = 0;

    const paint = () => {
      frame = 0;
      const vh = window.innerHeight;
      if (!vh) return;
      const at = window.scrollY / vh;

      for (let i = 0; i < sections.length; i += 1) {
        const el = sections[i];
        const t = at - i;

        // Far enough either side that there is nothing left to draw.
        // The leaving section reaches zero opacity well before it
        // reaches the end of its span, and there is no sense compositing
        // a plane nobody can see; hiding it rather than leaving it
        // transparent also takes it out of the tab order, so nobody can
        // focus a control on a section that is not there.
        const spent = t >= 1;
        if (t <= ARRIVE_EDGE || t >= EXIT_SPAN || spent) {
          if (el.style.visibility !== 'hidden') {
            el.style.visibility = 'hidden';
            el.style.willChange = 'auto';
            el.style.transform = '';
            el.style.opacity = '';
          }
          continue;
        }

        // Promoted for as long as it is in range, not only on the frame
        // it re-enters: a section that starts its life on screen never
        // crosses that boundary and would otherwise never be promoted
        // at all.
        if (el.style.willChange !== 'transform, opacity') {
          el.style.visibility = '';
          el.style.willChange = 'transform, opacity';
        }

        let y: number;
        let z: number;
        let scale: number;
        let tilt: number;
        let alpha: number;

        if (t < 0) {
          // Arriving: rises out of depth and zooms up into place.
          const k = Math.min(1, t + 1);
          const e = smooth(k);
          scale = ARRIVE_SCALE + (1 - ARRIVE_SCALE) * e;
          z = -ARRIVE_DEPTH * (1 - e);
          y = ARRIVE_RISE * (1 - e);
          tilt = 0;
          alpha = Math.min(1, Math.max(0, k * 1.9));
        } else {
          // Leaving: lifts, enlarges past the camera and tilts back.
          const u = Math.min(t, EXIT_SPAN);
          // Far enough that the section genuinely leaves the frame
          // rather than dissolving in place. It enlarges as it goes, so
          // its lower edge falls more slowly than its centre: at this
          // rise the edge clears the top of the stage just as the
          // section runs out of span.
          y = -EXIT_RISE * u;
          z = 0;
          scale = 1 + EXIT_SCALE * u;
          tilt = EXIT_TILT * u;
          // Opaque for most of the way out, then gone. Fading it from
          // the first frame is the obvious reading of "lifts away" and
          // it is wrong: the leaving section is larger than the one
          // arriving and covers it completely, so while it is part
          // transparent its headline and buttons read straight through
          // the section behind, and two headlines at once is a double
          // exposure rather than depth. Measured at 1440x900 with the
          // first draft: the cover's headline was still legible over
          // the arriving section a third of the way through the exit.
          alpha = Math.min(1, Math.max(0, (1 - u) / (1 - EXIT_HOLD)));
        }

        // One composed transform, so the browser gets a single matrix
        // rather than a list it has to reconcile. At t = 0 every term is
        // its identity and this resolves to no transform at all.
        el.style.transform =
          y === 0 && z === 0 && scale === 1 && tilt === 0
            ? ''
            : `translate3d(0, ${y}svh, ${z}px) scale(${scale}) rotateX(${tilt}deg)`;
        el.style.opacity = alpha === 1 ? '' : String(alpha);
      }

      const next = Math.max(0, Math.min(count - 1, Math.round(at)));
      setIndex((prev) => (prev === next ? prev : next));
      setMoved((prev) => prev || window.scrollY > vh * 0.04);
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(paint);
    };
    // A resize changes the viewport height, and the viewport height is
    // the unit the whole mapping is written in, so every section has to
    // be redrawn rather than left on last frame's numbers.
    const onResize = onScroll;

    paint();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onResize, { passive: true });
    window.addEventListener('orientationchange', onResize, { passive: true });

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
      window.removeEventListener('orientationchange', onResize);
      if (frame) cancelAnimationFrame(frame);
      // Leaving the stage must not leave a section hidden or transformed
      // for the plain stacked page that replaces it.
      for (const el of sections) {
        el.style.transform = '';
        el.style.opacity = '';
        el.style.visibility = '';
        el.style.willChange = '';
      }
    };
  }, [staged, count]);

  /* ── The reading position, for the masthead's rule ── */
  useEffect(() => {
    const root = document.documentElement;
    const last = Math.max(1, count - 1);
    root.style.setProperty('--v6-progress', String(index / last));
    return () => {
      root.style.removeProperty('--v6-progress');
    };
  }, [index, count]);

  const goTo = useCallback((i: number) => {
    const target = Math.max(0, i) * window.innerHeight;
    const still = window.matchMedia(REDUCED).matches;
    window.scrollTo({ top: target, behavior: still ? 'auto' : 'smooth' });
  }, []);

  /* ── Focus ──
     A section that is out of range is hidden and cannot take focus at
     all. One that is in range but half-faded can, and tabbing into it
     would leave the reader typing into something they can barely see,
     because the stage is fixed and the browser has nowhere to scroll it
     to. Bringing its turn to the front is the fix, and it changes
     nothing about the tab order. */
  useEffect(() => {
    const stage = stageRef.current;
    if (!stage || !staged) return;

    const onFocusIn = (e: FocusEvent) => {
      const target = e.target as HTMLElement | null;
      const section = target?.closest('section');
      if (!section || section.parentElement !== stage) return;
      const i = Array.prototype.indexOf.call(stage.children, section);
      if (i >= 0 && i !== Math.round(window.scrollY / window.innerHeight)) goTo(i);
    };

    stage.addEventListener('focusin', onFocusIn);
    return () => stage.removeEventListener('focusin', onFocusIn);
  }, [staged, goTo]);

  return (
    <>
      <div
        className={`${styles.stage} v6-stage`}
        ref={stageRef}
        style={{ '--v6-count': count } as React.CSSProperties}
      >
        {children}
      </div>

      {/* The scroll itself. One viewport per section, so the offset the
          handler reads maps straight to a section index. */}
      <div
        className={`${styles.spacer} v6-spacer`}
        style={{ height: `calc(${count} * 100svh)` }}
        aria-hidden="true"
      />

      {/* Chrome sits outside the stage, as a sibling. A perspective
          element is a containing block for fixed descendants, so
          anything fixed inside it would be pinned to the stage instead
          of to the viewport and clipped by its overflow. */}
      <div className={styles.chrome} aria-hidden={!staged}>
        <div className={styles.indicator}>
          <p className={styles.count} aria-live="polite">
            <span className={styles.countCurrent}>
              {String(index + 1).padStart(2, '0')}
            </span>
            <span className={styles.countSep} aria-hidden="true">
              /
            </span>
            <span className={styles.countTotal}>
              {String(count).padStart(2, '0')}
            </span>
          </p>

          <ul className={styles.rail} role="list">
            {Array.from({ length: count }, (_, i) => (
              <li key={i}>
                <button
                  type="button"
                  className={`${styles.tick} ${i === index ? styles.tickOn : ''}`}
                  onClick={() => goTo(i)}
                  aria-label={`Go to section ${i + 1}`}
                  aria-current={i === index ? 'true' : undefined}
                />
              </li>
            ))}
          </ul>
        </div>

        {/* The one scroll cue this build allows itself. A fixed stage
            looks like a page that has finished loading and stopped, so
            this says the mechanism exists rather than saying what a
            scrollbar is. It goes the moment the page moves and does not
            come back. */}
        <p className={`${styles.cue} ${moved ? styles.cueGone : ''}`}>Scroll</p>
      </div>
    </>
  );
}
