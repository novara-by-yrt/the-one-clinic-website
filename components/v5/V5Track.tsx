'use client';

import { useCallback, useEffect, useRef, useState, type ReactNode } from 'react';
import styles from './V5Track.module.css';

/**
 * The horizontal media query. Declared once and used by the JavaScript
 * here, by every panel stylesheet and by this component's own CSS, so
 * the layout and the behaviour can never disagree about which mode is
 * active.
 *
 * Landscape is part of the test on purpose: a 1024px-wide tablet held in
 * portrait should get the vertical stack, not a sideways page.
 */
const HORIZONTAL = '(min-width: 1024px) and (orientation: landscape)';

/**
 * The magazine track.
 *
 * Horizontal movement is native CSS scroll snapping, not an animated
 * transform: the track is a real scroll container, so trackpad swipes,
 * touch, scrollbars, find-in-page and focus-driven scrolling all keep
 * working without any of it being reimplemented. The JavaScript here
 * only adds what native scrolling cannot provide on its own:
 *
 * - a wheel handler, because a plain mouse wheel emits deltaY and would
 *   otherwise do nothing on a horizontal container;
 * - arrow buttons and Left/Right/Home/End keys;
 * - the page indicator, fed by an IntersectionObserver rather than a
 *   scroll listener;
 * - the root scroll lock, so the document itself has no vertical scroll
 *   while the track is the page's scroll container.
 *
 * Everything above is torn down when the media query stops matching, so
 * nothing from horizontal mode leaks into the vertical fallback.
 */
export default function V5Track({
  children,
  count,
}: {
  children: ReactNode;
  count: number;
}) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [horizontal, setHorizontal] = useState(false);
  const [index, setIndex] = useState(0);

  /**
   * The wheel listener is attached once per mode, not once per panel
   * change, so that its gesture state (accumulated travel, cooldown)
   * survives moving between panels. These refs are how it reads the
   * current panel and the current scroller without being re-attached.
   */
  const indexRef = useRef(0);
  const goToRef = useRef<(i: number) => void>(() => {});

  /* ── Mode, and the root scroll lock that goes with it ── */
  useEffect(() => {
    const mq = window.matchMedia(HORIZONTAL);
    const apply = () => {
      setHorizontal(mq.matches);
      document.documentElement.classList.toggle('v5-horizontal', mq.matches);
    };
    apply();
    mq.addEventListener('change', apply);
    return () => {
      mq.removeEventListener('change', apply);
      // Leaving the route must not strand the rest of the site unable to
      // scroll vertically.
      document.documentElement.classList.remove('v5-horizontal');
    };
  }, []);

  /* ── Wheel: vertical input drives horizontal movement ──
     One gesture flips one spread. Adding deltaY straight onto
     scrollLeft looks simpler but does not work here: with
     scroll-snap-type: x mandatory the browser retargets any offset that
     is not a snap point back to the nearest panel, so a notch of wheel
     lands mid-panel and is immediately undone (measured: assigning 600
     on a 1440px panel settles back at 0). Going through the same
     snap-point scroll the arrows and keys use is what actually moves,
     and it means all four inputs travel identically. */
  useEffect(() => {
    const el = trackRef.current;
    if (!el || !horizontal) return;

    // A mouse notch is ~100-120; a trackpad emits a stream of much
    // smaller deltas. This sits under one notch so a single click of the
    // wheel flips a spread, and high enough that a stray 1-2px tremor
    // does not.
    const THRESHOLD = 40;
    // After a flip the rest of the gesture has to be swallowed, or a
    // trackpad's momentum tail flips a second spread the user did not
    // ask for. A fixed cooldown cannot do it: the tail outlives a short
    // one (measured: 8 events over ~500ms skipped a panel at 1280 and
    // 1728) and a long one would block a deliberate second flick. So the
    // lock lifts once wheel input has been QUIET for a moment - the tail
    // ends, the lock lifts - with MAX_HOLD as the ceiling so that
    // spinning the wheel continuously, which never goes quiet, still
    // advances about one spread at a time instead of stalling.
    const QUIET = 130;
    const MAX_HOLD = 620;

    let travel = 0;
    let locked = false;
    let quietTimer: ReturnType<typeof setTimeout> | undefined;
    let holdTimer: ReturnType<typeof setTimeout> | undefined;

    const unlock = () => {
      clearTimeout(quietTimer);
      clearTimeout(holdTimer);
      locked = false;
      travel = 0;
    };

    const onWheel = (e: WheelEvent) => {
      // Leave browser zoom alone.
      if (e.ctrlKey) return;
      // A trackpad's own horizontal swipe already scrolls the track, so
      // only translate input that is predominantly vertical.
      if (Math.abs(e.deltaX) >= Math.abs(e.deltaY)) return;
      // Claimed either way: without this the document behind the track
      // takes the wheel and the browser shows its overscroll glow.
      e.preventDefault();

      if (locked) {
        // Still inside the previous gesture: hold, and push the quiet
        // deadline out so the lock outlasts the whole tail.
        clearTimeout(quietTimer);
        quietTimer = setTimeout(unlock, QUIET);
        return;
      }

      travel += e.deltaY;
      if (Math.abs(travel) < THRESHOLD) return;

      const step = travel > 0 ? 1 : -1;
      travel = 0;
      const next = indexRef.current + step;
      // At either end there is nowhere to go, so do not burn a cooldown
      // on it - the gesture should stay responsive the moment the user
      // reverses direction.
      if (next < 0 || next > count - 1) return;

      locked = true;
      goToRef.current(next);
      quietTimer = setTimeout(unlock, QUIET);
      holdTimer = setTimeout(unlock, MAX_HOLD);
    };

    el.addEventListener('wheel', onWheel, { passive: false });
    return () => {
      el.removeEventListener('wheel', onWheel);
      clearTimeout(quietTimer);
      clearTimeout(holdTimer);
    };
  }, [horizontal, count]);

  /**
   * The pitch between two slide centres, measured rather than derived
   * from the tokens, so the JavaScript can never disagree with the CSS
   * about how wide a slide is.
   */
  const pitch = useCallback(() => {
    const el = trackRef.current;
    const first = el?.children[0] as HTMLElement | undefined;
    const second = el?.children[1] as HTMLElement | undefined;
    if (!first) return 0;
    if (!second) return first.getBoundingClientRect().width;
    return second.offsetLeft - first.offsetLeft;
  }, []);

  /* ── Which slide is showing ──
     v4 read this from an IntersectionObserver. That cannot work here:
     once the slides are rotated and pushed back in Z, the rectangles an
     observer reports are their transformed bounds, so the ratios it
     compares describe the depth effect rather than the scroll position,
     and the neighbours can out-measure the slide in the middle.

     The scroll offset is the honest signal. The listener is passive and
     coalesced into one animation frame, and it only touches React state
     when the whole-number slide actually changes, so a flick across the
     magazine is six state updates rather than one per frame. */
  useEffect(() => {
    const el = trackRef.current;
    if (!el || !horizontal) return;

    let frame = 0;
    const read = () => {
      frame = 0;
      const step = pitch();
      if (!step) return;
      const next = Math.max(0, Math.min(count - 1, Math.round(el.scrollLeft / step)));
      setIndex((prev) => (prev === next ? prev : next));
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(read);
    };

    read();
    el.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      el.removeEventListener('scroll', onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [horizontal, count, pitch]);

  /* ── Settling ──
     With CSS scroll snapping gone (a snap area is the transformed
     border box, so the slides' own depth pass moves their snap targets
     out from under the scroll) the track settles itself. Layout
     geometry, never the transformed boxes, so the rotation cannot
     influence where a slide comes to rest.

     Only a free trackpad or touch swipe reaches this: the wheel, the
     arrows and the keys all go through goTo and arrive centred
     already, and a scroll that is already home is within the tolerance
     and does nothing, so this cannot chase its own smooth scroll. */
  useEffect(() => {
    const el = trackRef.current;
    if (!el || !horizontal) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let idle: ReturnType<typeof setTimeout> | undefined;

    const settle = () => {
      const step = pitch();
      if (!step) return;
      const nearest = Math.max(0, Math.min(count - 1, Math.round(el.scrollLeft / step)));
      const target = el.children[nearest] as HTMLElement | undefined;
      if (!target) return;
      const home = target.offsetLeft - (el.clientWidth - target.offsetWidth) / 2;
      // A few pixels of slack, so arriving does not re-trigger arriving.
      if (Math.abs(el.scrollLeft - home) < 4) return;
      el.scrollTo({ left: home, behavior: 'smooth' });
    };

    const onScroll = () => {
      clearTimeout(idle);
      // Long enough that the tail of a flick is not mistaken for a stop.
      idle = setTimeout(settle, 160);
    };

    el.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      el.removeEventListener('scroll', onScroll);
      clearTimeout(idle);
    };
  }, [horizontal, count, pitch]);

  /* ── Compositor budget ──
     will-change promotes a slide to its own layer, which is what keeps
     the depth pass off the main thread, and holding seven of them at
     once is how a page like this starts dropping frames. Only the
     slides within a viewport of the scrollport carry it. */
  useEffect(() => {
    const el = trackRef.current;
    if (!el || !horizontal) return;
    const panels = Array.from(el.children) as HTMLElement[];

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          (entry.target as HTMLElement).dataset.near = String(entry.isIntersecting);
        }
      },
      // Transformed bounds are good enough for "roughly nearby", which
      // is all this flag claims; it is only the exact centre that an
      // observer cannot be trusted with.
      { root: el, rootMargin: '0px 100% 0px 100%', threshold: 0 },
    );
    panels.forEach((p) => io.observe(p));
    return () => {
      io.disconnect();
      panels.forEach((p) => delete p.dataset.near);
    };
  }, [horizontal, count]);

  /* ── Fallback where scroll-driven animations are missing ──
     Chromium and the engines that ship `animation-timeline` run the
     depth pass on the compositor from CSS alone and this never starts.
     Where they do not, the same curve is driven from here instead: two
     numbers per slide, written straight to the element's style so no
     React state is touched at 60fps, and read back by the
     [data-depth='script'] rules in v5-tokens.css. */
  useEffect(() => {
    const el = trackRef.current;
    if (!el || !horizontal) return;
    if (typeof CSS !== 'undefined' && CSS.supports('animation-timeline: view()')) return;

    el.dataset.depth = 'script';
    const panels = Array.from(el.children) as HTMLElement[];
    let frame = 0;
    let last = -1;

    const paint = () => {
      frame = requestAnimationFrame(paint);
      const step = pitch();
      if (!step) return;
      const centre = el.scrollLeft + el.clientWidth / 2;
      if (centre === last) return;
      last = centre;
      for (const panel of panels) {
        const mid = panel.offsetLeft + panel.offsetWidth / 2;
        // Signed distance in slide pitches, clamped so a slide three
        // along does not keep rotating past the extreme.
        const signed = Math.max(-1, Math.min(1, (mid - centre) / step));
        panel.style.setProperty('--v5-p', signed.toFixed(4));
        panel.style.setProperty('--v5-a', Math.abs(signed).toFixed(4));
      }
    };
    frame = requestAnimationFrame(paint);

    return () => {
      cancelAnimationFrame(frame);
      delete el.dataset.depth;
      for (const panel of panels) {
        panel.style.removeProperty('--v5-p');
        panel.style.removeProperty('--v5-a');
      }
    };
  }, [horizontal, count, pitch]);

  const goTo = useCallback(
    (i: number) => {
      const el = trackRef.current;
      if (!el) return;
      const target = el.children[Math.max(0, Math.min(count - 1, i))] as
        | HTMLElement
        | undefined;
      if (!target) return;
      const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      // Centred, not left aligned: a v5 slide is narrower than the
      // scrollport and its resting place is the middle of the stage,
      // which is also the only place its transform resolves to none.
      // Measured from the live boxes so the reduced-motion fallback,
      // where slides are full width again, needs no special case.
      const left = target.offsetLeft - (el.clientWidth - target.offsetWidth) / 2;
      el.scrollTo({ left, behavior: reduce ? 'auto' : 'smooth' });
    },
    [count],
  );

  useEffect(() => {
    indexRef.current = index;
    goToRef.current = goTo;
  }, [index, goTo]);

  /* ── Reading position ──
     Published as a root custom property rather than passed down: the
     masthead is rendered from the root layout so that it can sit above
     the track's stacking context, which puts it outside this tree
     entirely. The hairline under the bar reads it as its fill. */
  useEffect(() => {
    const root = document.documentElement;
    const last = Math.max(1, count - 1);
    root.style.setProperty('--v5-progress', String(index / last));
    return () => {
      // Leaving the route must not leave a stale reading position behind
      // for anything else that might read it.
      root.style.removeProperty('--v5-progress');
    };
  }, [index, count]);

  /* ── Focus ──
     Tabbing through the panels works natively - the browser scrolls a
     focused control into view - but it scrolls by the smallest amount
     that reveals the element, which leaves the track parked between two
     spreads (measured: focus never landed on a snap offset). Realigning
     to the focused element's own panel keeps the magazine on a spread
     and keeps the indicator honest, without changing the tab order. */
  useEffect(() => {
    const el = trackRef.current;
    if (!el || !horizontal) return;

    const onFocusIn = (e: FocusEvent) => {
      const target = e.target as HTMLElement | null;
      const panel = target?.closest('section');
      if (!panel || panel.parentElement !== el) return;
      const i = Array.prototype.indexOf.call(el.children, panel);
      if (i >= 0) goToRef.current(i);
    };

    el.addEventListener('focusin', onFocusIn);
    return () => el.removeEventListener('focusin', onFocusIn);
  }, [horizontal]);

  /* ── Keyboard ── */
  useEffect(() => {
    if (!horizontal) return;

    const onKey = (e: KeyboardEvent) => {
      const t = e.target as HTMLElement | null;
      // Never hijack keys aimed at a field or a native control.
      if (t && /^(INPUT|TEXTAREA|SELECT)$/.test(t.tagName)) return;
      if (t?.isContentEditable) return;
      if (e.metaKey || e.ctrlKey || e.altKey) return;

      switch (e.key) {
        case 'ArrowRight':
          e.preventDefault();
          goTo(index + 1);
          break;
        case 'ArrowLeft':
          e.preventDefault();
          goTo(index - 1);
          break;
        case 'Home':
          e.preventDefault();
          goTo(0);
          break;
        case 'End':
          e.preventDefault();
          goTo(count - 1);
          break;
        default:
      }
    };

    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [horizontal, index, count, goTo]);

  const atStart = index <= 0;
  const atEnd = index >= count - 1;

  return (
    <>
      {/* The global class is the hook v5-tokens.css needs to put real
          scroll snapping back under reduced motion, where the slides are
          flat and snapping behaves. */}
      <div className={`${styles.track} v5-track`} ref={trackRef}>
        {children}
      </div>

      {/* Chrome for horizontal mode. Rendered on the server too, and
          hidden by the same media query below tablet-landscape, so there
          is no mount flash and nothing to tab into in vertical mode. */}
      <div className={styles.chrome} aria-hidden={!horizontal}>
        <button
          type="button"
          className={`${styles.arrow} ${styles.arrowPrev}`}
          onClick={() => goTo(index - 1)}
          disabled={atStart}
          aria-label="Previous panel"
        >
          <span className={styles.arrowGlyph} aria-hidden="true" />
        </button>

        <button
          type="button"
          className={`${styles.arrow} ${styles.arrowNext}`}
          onClick={() => goTo(index + 1)}
          disabled={atEnd}
          aria-label="Next panel"
        >
          <span className={styles.arrowGlyph} aria-hidden="true" />
        </button>

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

          <ol className={styles.dashes}>
            {Array.from({ length: count }, (_, i) => (
              <li key={i}>
                <button
                  type="button"
                  className={`${styles.dash} ${i === index ? styles.dashOn : ''}`}
                  onClick={() => goTo(i)}
                  aria-label={`Go to panel ${i + 1} of ${count}`}
                  aria-current={i === index ? 'true' : undefined}
                />
              </li>
            ))}
          </ol>
        </div>
      </div>
    </>
  );
}
