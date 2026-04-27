'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { ReactNode, useEffect, useState } from 'react';
import styles from './BrandReveal.module.css';

/**
 * Subtle 3D scroll-in for /brand sections.
 * Element starts pushed back in z, slightly down, slightly smaller, faded;
 * settles to flat as it enters the viewport.
 *
 * Honors prefers-reduced-motion and reduces transform intensity on mobile.
 */

// power3.out approximation in cubic-bezier
const EASE = [0.16, 1, 0.3, 1] as const;

export default function BrandReveal({ children }: { children: ReactNode }) {
  const reduce = useReducedMotion();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 768px)');
    setIsMobile(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  if (reduce) return <>{children}</>;

  // Halve transform amounts on mobile so the effect is barely perceptible.
  const k = isMobile ? 0.5 : 1;

  return (
    <motion.div
      className={styles.layer}
      initial={{
        opacity: 0,
        y: 60 * k,
        scale: 1 - 0.04 * k,
        z: -80 * k,
      }}
      whileInView={{ opacity: 1, y: 0, scale: 1, z: 0 }}
      viewport={{ once: true, margin: '0px 0px -20% 0px' }}
      transition={{ duration: 0.9, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}
