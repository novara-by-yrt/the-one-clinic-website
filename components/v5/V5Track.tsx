'use client';

import { useCallback, useEffect, useRef, useState, type ReactNode } from 'react';
import styles from './V5Track.module.css';

/**
 * The query that turns the deck on. Declared once and used by the
 * JavaScript here, by this component's CSS and by every panel
 * stylesheet, so the layout and the behaviour can never disagree about
 * which mode is active.
 *
 * Landscape is part of the test on purpose: a 1024px-wide tablet held in
 * portrait gets the plain stacked page, where the two columns would be
 * cramped and the depth would buy nothing.
 */
const DECK = '(min-width: 1024px) and (orientation: landscape)';

/**
 * The deck.
 *
 * The sections are cards stacked one behind the next, all sticky at the
 * same place. Scrolling lifts the card in front up and away, and the
 * card that was waiting behind it comes forward into its place. The
 * depth is all in CSS, clocked by the document's own scroll through
 * `animation-timeline: scroll(root block)`; see v5-tokens.css.
 *
 * That leaves this component only the things CSS cannot do:
 *
 * - the arrows and the Up/Down/Home/End keys;
 * - the page indicator, and the reading position the masthead's rule
 *   draws from;
 * - the will-change budget, so the deck does not hold every card on its
 *   own compositor layer at once;
 * - a scripted fallback for engines without scroll-driven animations.
 *
 * There is no wheel handler and no scroll lock. The page scrolls the
 * document, vertically, the way a page does: the wheel, the trackpad,
 * the scrollbar, the space bar, find-in-page and screen-reader
 * navigation all work because none of them were taken away.
 */
export default function V5Track({
  children,
  count,
}: {
  children: ReactNode;
  count: number;
}) {
  const deckRef = useRef<HTMLDivElement>(null);
  const [deck, setDeck] = useState(false);
  const [index, setIndex] = useState(0);

  /* ── Mode ── */
  useEffect(() => {
    const mq = window.matchMedia(DECK);
    const apply = () => setDeck(mq.matches);
    apply();
    mq.addEventListener('change', apply);
    return () => mq.removeEventListener('change', apply);
  }, []);

  /**
   * One card is one screen of scrolling, by construction: a card is a
   * viewport tall minus its inset and carries the inset back as a bottom
   * margin, so card plus margin is exactly one viewport. The CSS writes
   * its animation ranges in 100dvh for the same reason, and this reads
   * the same number, so the two cannot drift.
   *
   * Deliberately not measured from the cards' own boxes: offsetTop on a
   * sticky element reports where it is currently stuck, not where it
   * sits in flow, which made the gap between the first two cards read as
   * 837px on a 900px viewport.
   */
  const pitch = useCallback(() => window.innerHeight, []);

  /* ── Which card is in front ──
     From the scroll offset, not an IntersectionObserver: the cards are
     stacked at one place and several are on screen at once, so what an
     observer reports says nothing about which one is in front. The
     listener is passive, coalesced into one animation frame, and only
     touches state when the whole-number card changes, so a scroll
     through the deck is six state updates rather than one per frame. */
  useEffect(() => {
    if (!deck) return;

    let frame = 0;
    const read = () => {
      frame = 0;
      const step = pitch();
      if (!step) return;
      const next = Math.max(0, Math.min(count - 1, Math.round(window.scrollY / step)));
      setIndex((prev) => (prev === next ? prev : next));
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(read);
    };

    read();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [deck, count, pitch]);

  /* ── Compositor budget ──
     will-change promotes a card to its own layer, which is what keeps
     the depth off the main thread, and holding every card there at once
     is how a page like this starts dropping frames. Only the cards
     within a screen of their turn carry it. */
  useEffect(() => {
    const el = deckRef.current;
    if (!el || !deck) return;
    const cards = Array.from(el.children) as HTMLElement[];

    cards.forEach((card, i) => {
      card.dataset.near = String(Math.abs(i - index) <= 1);
    });

    return () => {
      cards.forEach((card) => delete card.dataset.near);
    };
  }, [deck, index, count]);

  /* ── The reading position ──
     Published as a root custom property rather than passed down: the
     masthead renders from the root layout so that it can sit above the
     deck, which puts it outside this tree entirely. The hairline under
     the bar reads this as its fill. */
  useEffect(() => {
    const root = document.documentElement;
    const last = Math.max(1, count - 1);
    root.style.setProperty('--v5-progress', String(index / last));
    return () => {
      root.style.removeProperty('--v5-progress');
    };
  }, [index, count]);

  /* ── Fallback where scroll-driven animations are missing ──
     Chromium and the engines that ship `animation-timeline` run the deck
     from CSS alone and this never starts. Where they do not, the same
     curve is driven from here: two numbers per card, written straight to
     the element's style so no React state is touched at 60fps, and read
     back by the [data-depth='script'] rules in v5-tokens.css. */
  useEffect(() => {
    const el = deckRef.current;
    if (!el || !deck) return;
    if (typeof CSS !== 'undefined' && CSS.supports('animation-timeline: scroll()')) return;

    el.dataset.depth = 'script';
    const cards = Array.from(el.children) as HTMLElement[];
    let frame = 0;
    let last = -1;

    const paint = () => {
      frame = requestAnimationFrame(paint);
      const step = pitch();
      if (!step) return;
      const y = window.scrollY;
      if (y === last) return;
      last = y;
      cards.forEach((card, i) => {
        // How far this card is from its own turn, in screens. Negative
        // is still waiting behind, positive is already lifting away.
        const raw = (y - i * step) / step;
        // Before its window a card carries nothing at all and simply
        // sits below the fold, which is what animation-fill-mode:
        // forwards does on the CSS path.
        const d = raw < -1 ? null : Math.min(1, raw);
        if (d === null) {
          card.style.setProperty('--v5-shift', '0');
          card.style.setProperty('--v5-back', '0');
          card.style.setProperty('--v5-away', '0');
          return;
        }
        // Three factors, matching the keyframes exactly. shift is the
        // pinning offset and stays linear the whole way in. back and
        // away carry the depth, and each holds flat for the first fifth
        // of its half so the card has a stretch where it simply sits in
        // front and can be read.
        const shift = Math.max(0, -d);
        const back = Math.min(1, Math.max(0, -d / 0.6));
        const away = Math.min(1, Math.max(0, (d - 0.4) / 0.6));
        card.style.setProperty('--v5-shift', shift.toFixed(4));
        card.style.setProperty('--v5-back', back.toFixed(4));
        card.style.setProperty('--v5-away', away.toFixed(4));
      });
    };
    frame = requestAnimationFrame(paint);

    return () => {
      cancelAnimationFrame(frame);
      delete el.dataset.depth;
      for (const card of cards) {
        card.style.removeProperty('--v5-shift');
        card.style.removeProperty('--v5-back');
        card.style.removeProperty('--v5-away');
      }
    };
  }, [deck, count, pitch]);

  const goTo = useCallback(
    (i: number) => {
      const step = pitch();
      if (!step) return;
      const target = Math.max(0, Math.min(count - 1, i));
      const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      window.scrollTo({ top: target * step, behavior: reduce ? 'auto' : 'smooth' });
    },
    [count, pitch],
  );

  /* ── Focus ──
     Tabbing into a card that is not in front works natively, in that the
     browser scrolls it into view, but a sticky card is already in view
     at every scroll position, so the browser has no reason to move and
     the reader is left tabbing through a card they cannot see. Bringing
     that card's turn to the front is the fix, and it changes nothing
     about the tab order. */
  useEffect(() => {
    const el = deckRef.current;
    if (!el || !deck) return;

    const onFocusIn = (e: FocusEvent) => {
      const target = e.target as HTMLElement | null;
      const card = target?.closest('section');
      if (!card || card.parentElement !== el) return;
      const i = Array.prototype.indexOf.call(el.children, card);
      if (i >= 0) goTo(i);
    };

    el.addEventListener('focusin', onFocusIn);
    return () => el.removeEventListener('focusin', onFocusIn);
  }, [deck, goTo]);

  /* ── Keyboard ──
     Only the whole-card jumps. Everything the browser already does well
     on a vertical page, the space bar, Page Up and Page Down, the scroll
     wheel, is left alone. */
  useEffect(() => {
    if (!deck) return;

    const onKey = (e: KeyboardEvent) => {
      const t = e.target as HTMLElement | null;
      // Never hijack keys aimed at a field or a native control.
      if (t && /^(INPUT|TEXTAREA|SELECT)$/.test(t.tagName)) return;
      if (t?.isContentEditable) return;
      if (e.metaKey || e.ctrlKey || e.altKey) return;

      switch (e.key) {
        case 'ArrowDown':
          e.preventDefault();
          goTo(index + 1);
          break;
        case 'ArrowUp':
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
  }, [deck, index, count, goTo]);

  const atStart = index <= 0;
  const atEnd = index >= count - 1;

  return (
    <>
      <div
        className={`${styles.deck} v5-deck`}
        ref={deckRef}
        style={{ '--v5-deck-count': count } as React.CSSProperties}
      >
        {children}
      </div>

      {/* Chrome for the deck. Rendered on the server too, and hidden by
          the same query below tablet-landscape, so there is no mount
          flash and nothing to tab into on the plain stacked page. */}
      <div className={styles.chrome} aria-hidden={!deck}>
        <button
          type="button"
          className={`${styles.arrow} ${styles.arrowPrev}`}
          onClick={() => goTo(index - 1)}
          disabled={atStart}
          aria-label="Previous section"
        >
          <span className={styles.arrowGlyph} aria-hidden="true" />
        </button>

        <button
          type="button"
          className={`${styles.arrow} ${styles.arrowNext}`}
          onClick={() => goTo(index + 1)}
          disabled={atEnd}
          aria-label="Next section"
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

          <ul className={styles.dashes} role="list">
            {Array.from({ length: count }, (_, i) => (
              <li key={i}>
                <button
                  type="button"
                  className={`${styles.dash} ${i === index ? styles.dashOn : ''}`}
                  onClick={() => goTo(i)}
                  aria-label={`Go to section ${i + 1}`}
                  aria-current={i === index ? 'true' : undefined}
                />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}
