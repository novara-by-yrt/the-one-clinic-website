import type { Variants } from 'framer-motion';

const EASE = [0.25, 0.1, 0.25, 1] as const;

/** Fade in with upward drift */
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  show:   { opacity: 1, y: 0,  transition: { duration: 0.6, ease: EASE } },
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

/** Shared viewport config — trigger once when 80px into view */
export const VIEWPORT = { once: true, margin: '-80px' } as const;
