'use client';

import { useState, useEffect, useLayoutEffect, useRef, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import gsap from 'gsap';
import styles from './CardFanCarousel.module.css';

export interface CardItem {
  imgUrl: string;
  alt?: string;
  linkUrl?: string;
  /** Optional overlay copy. Omit both for a bare image card. */
  category?: string;
  title?: string;
}

interface CardFanCarouselProps {
  cards: CardItem[];
  /** Accessible name for the carousel region. */
  label?: string;
  /** Passed to next/image so each card requests the right width. */
  sizes?: string;
  /**
   * Fires with the index of the card currently in focus -- the hovered card,
   * or the one at the centre of the fan when nothing is hovered. Lets a
   * caller drive a detail panel from the carousel.
   */
  onActiveChange?: (index: number) => void;
}

const MAX_VISIBLE = 7;
const HALF = 3;

const FAN_POSITIONS = [
  { rot: -21, scale: 0.7756, x: -30, y: 7.3, zIndex: 1 },
  { rot: -14, scale: 0.8498, x: -22, y: 4.0, zIndex: 2 },
  { rot: -7, scale: 0.9346, x: -11, y: 1.3, zIndex: 3 },
  { rot: 0, scale: 1.0, x: 0, y: 0.0, zIndex: 10 },
  { rot: 7, scale: 0.9346, x: 11, y: 1.3, zIndex: 3 },
  { rot: 14, scale: 0.8498, x: 22, y: 4.0, zIndex: 2 },
  { rot: 21, scale: 0.7756, x: 30, y: 7.3, zIndex: 1 },
];

/**
 * useLayoutEffect logs a warning when React renders on the server. This
 * component is client-only where it is used today, but it lives in
 * components/ui, so keep it safe for a server-rendered caller too.
 */
const useIsomorphicLayoutEffect =
  typeof window !== 'undefined' ? useLayoutEffect : useEffect;

function prefersReducedMotion() {
  return (
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  );
}

/** Scales the x-spread of the fan. Paired with the card widths in the CSS module. */
function getResponsiveMultiplier(width: number) {
  if (width < 480) return 0.28;
  if (width < 640) return 0.38;
  if (width < 768) return 0.5;
  if (width < 1024) return 0.75;
  return 1.0;
}

/**
 * Returns a multiplier (0..1] that scales y-offsets and entry animation
 * distances when the viewport is too short for the ideal layout height.
 */
function getHeightMultiplier(width: number) {
  // Ideal layout heights, in px at a 16px root. These MUST track the
  // .layout[data-fan='on'] heights in CardFanCarousel.module.css.
  let idealPx: number;
  if (width < 480) idealPx = 21 * 16;
  else if (width < 640) idealPx = 24 * 16;
  else if (width < 768) idealPx = 26 * 16;
  else if (width < 1024) idealPx = 30 * 16;
  else idealPx = 32 * 16;

  const available = window.innerHeight * 0.7; // 70vh budget
  if (available >= idealPx) return 1;
  return available / idealPx;
}

/**
 * Fan geometry for one slot.
 *
 * Below MAX_VISIBLE the spread is derived rather than read from the table.
 * The centre is (totalCards - 1) / 2 so that an even card count fans out
 * symmetrically -- using totalCards >> 1 leaves the last card short of the
 * full 21 degrees and visibly tips the whole fan to one side.
 */
function getSlotConfig(totalCards: number, slot: number) {
  if (totalCards >= MAX_VISIBLE) return FAN_POSITIONS[slot];
  const center = (totalCards - 1) / 2;
  const distance = center > 0 ? (slot - center) / center : 0;
  const absDistance = Math.abs(distance);
  return {
    rot: distance * 21,
    scale: 1.0 - 0.2244 * absDistance * absDistance,
    x: distance * 30,
    y: absDistance * absDistance * 7.3,
    zIndex: 10 - Math.round(absDistance * center * 2),
  };
}

export default function CardFanCarousel({
  cards,
  label = 'Card carousel',
  sizes = '(max-width: 479px) 116px, (max-width: 639px) 136px, (max-width: 767px) 152px, (max-width: 1023px) 176px, (max-width: 1279px) 200px, 220px',
  onActiveChange,
}: CardFanCarouselProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isAnimating = useRef(false);
  const hasEntered = useRef(false);
  const directionRef = useRef<'left' | 'right' | null>(null);
  const prevVisible = useRef<Set<number>>(new Set());

  const totalCards = cards.length;
  const needsPagination = totalCards > MAX_VISIBLE;
  const [centerIndex, setCenterIndex] = useState(
    needsPagination ? HALF : totalCards >> 1,
  );

  const onActiveChangeRef = useRef(onActiveChange);
  onActiveChangeRef.current = onActiveChange;

  // Flip the layout from the no-JS scroll row to the fan before first paint,
  // so the row is never visible as a flash of unstyled content.
  useIsomorphicLayoutEffect(() => {
    containerRef.current?.setAttribute('data-fan', 'on');
  }, []);

  const getVisibleMap = useCallback(
    (center: number) => {
      const map = new Map<number, number>();
      if (!needsPagination) {
        cards.forEach((_, i) => map.set(i, i));
        return map;
      }
      for (let slot = 0; slot < MAX_VISIBLE; slot++) {
        map.set(
          (((center + slot - HALF) % totalCards) + totalCards) % totalCards,
          slot,
        );
      }
      return map;
    },
    [totalCards, needsPagination, cards],
  );

  const cycle = useCallback(
    (direction: 'left' | 'right') => {
      if (isAnimating.current || !needsPagination) return;
      isAnimating.current = true;
      directionRef.current = direction;
      setCenterIndex((prev) =>
        direction === 'right'
          ? (prev + 1) % totalCards
          : (prev - 1 + totalCards) % totalCards,
      );
    },
    [totalCards, needsPagination],
  );

  useEffect(() => {
    const container = containerRef.current;
    if (!container || !totalCards) return;

    const cardElements = Array.from(
      container.querySelectorAll<HTMLElement>(`.${styles.card}`),
    );
    if (!cardElements.length) return;

    const reduced = prefersReducedMotion();
    const visibleMap = getVisibleMap(centerIndex);
    const previouslyVisible = prevVisible.current;
    const direction = directionRef.current;
    const isFirstMount = !hasEntered.current;
    const multiplier = getResponsiveMultiplier(window.innerWidth);
    const hMult = getHeightMultiplier(window.innerWidth);
    const slotCount = needsPagination ? MAX_VISIBLE : totalCards;
    const config = (slot: number) => getSlotConfig(slotCount, slot);
    // Reduced motion keeps the fan but snaps straight to it.
    const dur = (seconds: number) => (reduced ? 0 : seconds);

    /**
     * Paints the active state. The active card is brought to full
     * brightness with the gold rim and its title revealed; its immediate
     * neighbours are lifted halfway out of the dim. Everything is driven
     * off data attributes so the styling stays in the stylesheet.
     */
    const markActive = (activeCardIndex: number) => {
      const activeSlotIndex = visibleMap.get(activeCardIndex);
      cardElements.forEach((el, i) => {
        const s = visibleMap.get(i);
        const isActive = i === activeCardIndex;
        const isNear =
          !isActive &&
          s !== undefined &&
          activeSlotIndex !== undefined &&
          Math.abs(s - activeSlotIndex) === 1;
        el.dataset.active = isActive ? 'true' : 'false';
        el.dataset.near = isNear ? 'true' : 'false';
      });
      onActiveChangeRef.current?.(activeCardIndex);
    };

    // Card sitting in the middle slot -- the default active card.
    const middleSlot = (needsPagination ? MAX_VISIBLE : totalCards) >> 1;
    let centerCardIndex = centerIndex;
    visibleMap.forEach((slotIndex, cardIndex) => {
      if (slotIndex === middleSlot) centerCardIndex = cardIndex;
    });
    markActive(centerCardIndex);

    if (isFirstMount) isAnimating.current = true;

    let completedCount = 0;
    const visibleCount = visibleMap.size;
    const onCardDone = () => {
      if (++completedCount >= visibleCount) {
        isAnimating.current = false;
        if (isFirstMount) hasEntered.current = true;
      }
    };

    cardElements.forEach((card, cardIndex) => {
      const slot = visibleMap.get(cardIndex);
      const wasVisible = previouslyVisible.has(cardIndex);

      if (slot !== undefined) {
        const { x, y, rot, scale, zIndex } = config(slot);
        const target = {
          x: `${x * multiplier}rem`,
          y: `${y * hMult}rem`,
          rotation: rot,
          scale,
          opacity: 1,
          zIndex,
        };

        card.removeAttribute('aria-hidden');
        card.style.pointerEvents = '';

        if (isFirstMount) {
          gsap.set(card, {
            x: 0,
            y: `${12 * hMult}rem`,
            rotation: 0,
            scale: 0.5,
            opacity: 0,
          });
          gsap.to(card, {
            ...target,
            duration: dur(1.2),
            ease: 'elastic.out(1.05,.78)',
            delay: dur(0.2 + slot * 0.06),
            onComplete: onCardDone,
          });
        } else if (!wasVisible) {
          const enterX = direction === 'right' ? 40 : -40;
          gsap.set(card, {
            x: `${enterX}rem`,
            y: `${y * hMult}rem`,
            rotation: direction === 'right' ? 30 : -30,
            scale: 0.5,
            opacity: 0,
          });
          gsap.to(card, {
            ...target,
            duration: dur(0.6),
            ease: 'power2.out',
            onComplete: onCardDone,
          });
        } else {
          gsap.to(card, {
            ...target,
            duration: dur(0.5),
            ease: 'power2.out',
            onComplete: onCardDone,
          });
        }
      } else {
        // Off-fan cards are inert: hidden from AT and untabbable.
        card.setAttribute('aria-hidden', 'true');
        card.style.pointerEvents = 'none';

        if (wasVisible) {
          const exitX = direction === 'right' ? -40 : 40;
          gsap.to(card, {
            x: `${exitX}rem`,
            opacity: 0,
            scale: 0.5,
            rotation: direction === 'right' ? -30 : 30,
            duration: dur(0.4),
            ease: 'power2.in',
            zIndex: 0,
          });
        } else if (isFirstMount) {
          gsap.set(card, { opacity: 0, scale: 0.3, x: 0, y: 0, zIndex: 0 });
        }
      }
    });

    prevVisible.current = new Set(visibleMap.keys());

    // ── Hover choreography ──────────────────────────────────────
    const visibleEntries: { el: HTMLElement; slot: number; cardIndex: number }[] = [];
    cardElements.forEach((el, i) => {
      const slot = visibleMap.get(i);
      if (slot !== undefined) visibleEntries.push({ el, slot, cardIndex: i });
    });
    visibleEntries.sort((a, b) => a.slot - b.slot);

    let activeSlot: number | null = null;
    let leaveTimer: ReturnType<typeof setTimeout> | null = null;
    const centerSlot = (visibleEntries.length - 1) / 2;

    const updateHoverLayout = (hoveredSlot: number | null) => {
      const mult = getResponsiveMultiplier(window.innerWidth);
      const hM = getHeightMultiplier(window.innerWidth);

      visibleEntries.forEach(({ el, slot }) => {
        const base = config(slot);
        let targetX = base.x * mult;
        let targetY = base.y * hM;
        let targetRot = base.rot;
        let targetScale = base.scale;
        let delay = 0;

        if (hoveredSlot !== null) {
          const distance = Math.abs(slot - hoveredSlot);
          delay = distance * 0.02;

          if (slot === hoveredSlot) {
            targetY -= 2.5 * hM;
            targetScale *= 1.08;
          } else {
            const normalized =
              centerSlot > 0 ? (slot - centerSlot) / centerSlot : 0;
            const pushStrength =
              8 *
              (1 - Math.abs(normalized)) *
              (1 + 0.2 * Math.max(0, 3 - distance));

            if (slot < hoveredSlot) {
              targetX -= pushStrength * mult;
              targetRot -= 3 / (distance + 1);
            } else {
              targetX += pushStrength * mult;
              targetRot += 3 / (distance + 1);
            }

            if (slot === visibleEntries.length - 1 && hoveredSlot < centerSlot)
              targetY -= 1 * hM;
            if (slot === 0 && hoveredSlot > centerSlot) targetY -= 1 * hM;
          }
        } else {
          delay = Math.abs(slot - centerSlot) * 0.02;
        }

        gsap.to(el, {
          x: `${targetX}rem`,
          y: `${targetY}rem`,
          rotation: targetRot,
          scale: targetScale,
          duration: dur(0.5),
          delay: dur(delay),
          ease: 'elastic.out(1,.75)',
          overwrite: 'auto',
        });
        gsap.set(el, { zIndex: base.zIndex });
      });
    };

    const pointerHandlers = reduced
      ? []
      : visibleEntries.map(({ el, slot, cardIndex }) => {
          const handler = () => {
            if (isAnimating.current) return;
            if (leaveTimer) {
              clearTimeout(leaveTimer);
              leaveTimer = null;
            }
            if (activeSlot !== slot) {
              activeSlot = slot;
              updateHoverLayout(slot);
              markActive(cardIndex);
            }
          };
          el.addEventListener('mouseenter', handler);
          // Keyboard users get the same lift when a card takes focus.
          el.addEventListener('focusin', handler);
          return { el, handler };
        });

    const onMouseLeave = () => {
      if (isAnimating.current) return;
      if (leaveTimer) clearTimeout(leaveTimer);
      leaveTimer = setTimeout(() => {
        activeSlot = null;
        updateHoverLayout(null);
        markActive(centerCardIndex);
      }, 50);
    };
    if (!reduced) container.addEventListener('mouseleave', onMouseLeave);

    // Re-solve the geometry on resize: the multipliers are breakpoint-based,
    // so a width change moves every card.
    let resizeTimer: ReturnType<typeof setTimeout> | null = null;
    const onResize = () => {
      if (resizeTimer) clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        if (!isAnimating.current) updateHoverLayout(activeSlot);
      }, 120);
    };
    window.addEventListener('resize', onResize);

    return () => {
      pointerHandlers.forEach(({ el, handler }) => {
        el.removeEventListener('mouseenter', handler);
        el.removeEventListener('focusin', handler);
      });
      container.removeEventListener('mouseleave', onMouseLeave);
      window.removeEventListener('resize', onResize);
      if (leaveTimer) clearTimeout(leaveTimer);
      if (resizeTimer) clearTimeout(resizeTimer);
    };
  }, [centerIndex, totalCards, getVisibleMap, needsPagination]);

  if (!totalCards) return null;

  const chevron = (direction: 'left' | 'right') => (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <polyline points={direction === 'left' ? '15 18 9 12 15 6' : '9 18 15 12 9 6'} />
    </svg>
  );

  return (
    <div className={styles.wrap}>
      <div
        ref={containerRef}
        className={styles.layout}
        role="group"
        aria-roledescription="carousel"
        aria-label={label}
      >
        {cards.map((card, index) => {
          const hasCopy = Boolean(card.category || card.title);
          const body = (
            <>
              <div className={styles.media}>
                <Image
                  src={card.imgUrl}
                  // Decorative when the card already states its name in text
                  alt={hasCopy ? '' : card.alt || ''}
                  fill
                  sizes={sizes}
                  className={styles.img}
                  draggable={false}
                />
              </div>
              <div className={styles.overlay} aria-hidden="true" />
              <span className={styles.glow} aria-hidden="true" />
              {hasCopy && (
                <div className={styles.content}>
                  {card.category && (
                    <span className={styles.category}>{card.category}</span>
                  )}
                  {card.title && <span className={styles.title}>{card.title}</span>}
                </div>
              )}
            </>
          );

          if (!card.linkUrl) {
            return (
              <div key={index} className={styles.card}>
                {body}
              </div>
            );
          }

          const external = /^https?:\/\//.test(card.linkUrl);
          return external ? (
            <a
              key={index}
              href={card.linkUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.card}
              aria-label={card.title || card.alt}
            >
              {body}
            </a>
          ) : (
            <Link
              key={index}
              href={card.linkUrl}
              className={styles.card}
              aria-label={card.title || card.alt}
            >
              {body}
            </Link>
          );
        })}
      </div>

      {needsPagination && (
        <div className={styles.controls}>
          <button
            type="button"
            className={styles.arrow}
            onClick={() => cycle('left')}
            aria-label="Previous"
          >
            {chevron('left')}
          </button>
          <div className={styles.dots}>
            {cards.map((card, i) => (
              <button
                key={i}
                type="button"
                className={`${styles.dot} ${i === centerIndex ? styles.dotActive : ''}`}
                onClick={() => {
                  if (isAnimating.current || i === centerIndex) return;
                  const forward =
                    (i - centerIndex + totalCards) % totalCards <= totalCards / 2;
                  directionRef.current = forward ? 'right' : 'left';
                  isAnimating.current = true;
                  setCenterIndex(i);
                }}
                aria-label={`Go to ${card.title || card.alt || `card ${i + 1}`}`}
                aria-current={i === centerIndex ? 'true' : undefined}
              />
            ))}
          </div>
          <button
            type="button"
            className={styles.arrow}
            onClick={() => cycle('right')}
            aria-label="Next"
          >
            {chevron('right')}
          </button>
        </div>
      )}
    </div>
  );
}
