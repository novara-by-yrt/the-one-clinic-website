import type { Variants } from 'framer-motion';

const EASE = [0.25, 0.1, 0.25, 1] as const;

/** Fade in with upward drift */
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  show:   { opacity: 1, y: 0,  transition: { duration: 0.6, ease: EASE } },
};

/** Fade in sliding from the left */
export const fadeLeft: Variants = {
  hidden: { opacity: 0, x: -48 },
  show:   { opacity: 1, x: 0,  transition: { duration: 0.85, ease: EASE } },
};

/** Fade in sliding from the right */
export const fadeRight: Variants = {
  hidden: { opacity: 0, x: 48 },
  show:   { opacity: 1, x: 0,  transition: { duration: 0.85, ease: EASE } },
};

/** Fade in only */
export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  show:   { opacity: 1, transition: { duration: 0.5, ease: EASE } },
};

/** Stagger container — wrap around children that use fadeUp/fadeIn */
export function stagger(delay = 0.12): Variants {
  return {
    hidden: {},
    show: { transition: { staggerChildren: delay, delayChildren: 0.05 } },
  };
}

/**
 * Stagger container that also slides in from the left.
 * The container animates x: -48→0 while staggering its children.
 */
export function staggerLeft(delay = 0.12): Variants {
  return {
    hidden: { opacity: 0, x: -48 },
    show: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.75, ease: EASE, staggerChildren: delay, delayChildren: 0.05 },
    },
  };
}

/**
 * Stagger container that also slides in from the right.
 * The container animates x: 48→0 while staggering its children.
 */
export function staggerRight(delay = 0.12): Variants {
  return {
    hidden: { opacity: 0, x: 48 },
    show: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.75, ease: EASE, staggerChildren: delay, delayChildren: 0.05 },
    },
  };
}

/** Shared viewport config — trigger once when 80px into view */
export const VIEWPORT = { once: true, margin: '-80px' } as const;
