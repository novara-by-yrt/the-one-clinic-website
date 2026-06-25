'use client';

import { m, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { ReactNode } from 'react';
import BrandGlobalStyle from './BrandGlobalStyle';
import styles from './BrandStage.module.css';

/**
 * Root wrapper for the brand page.
 *
 * - Establishes perspective: 1400px so panel translateZ reads correctly.
 * - Paints a fixed warm-cream backdrop visible at panel edges.
 * - Backdrop drifts at 0 → -10% (parallax) as the page scrolls.
 * - Renders BrandGlobalStyle for scoped typography + border overrides.
 */
export default function BrandStage({ children }: { children: ReactNode }) {
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '-10%']);

  return (
    <div className={styles.stage} data-brand="">
      <BrandGlobalStyle />
      <m.div
        className={styles.backdrop}
        aria-hidden="true"
        style={reduce ? undefined : { y: bgY }}
      />
      {children}
    </div>
  );
}
