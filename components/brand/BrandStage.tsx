'use client';

import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { ReactNode } from 'react';
import styles from './BrandStage.module.css';

/**
 * Wraps the brand page in a 3D perspective context and paints a single
 * consistent backdrop with a slow parallax drift (y: 0 → -10%).
 */
export default function BrandStage({ children }: { children: ReactNode }) {
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '-10%']);

  return (
    <div className={styles.stage}>
      <motion.div
        className={styles.backdrop}
        aria-hidden="true"
        style={reduce ? undefined : { y: bgY }}
      />
      {children}
    </div>
  );
}
