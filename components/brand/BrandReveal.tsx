'use client';

import { m, useReducedMotion } from 'framer-motion';
import { ReactNode, useEffect, useState } from 'react';
import styles from './BrandReveal.module.css';

/**
 * Scroll-driven 3D section reveal for the brand page.
 *
 * Each wrapped section enters from depth:
 *   opacity  0    → 1
 *   y        +56px → 0
 *   scale    0.965 → 1
 *   z        -70px → 0   (reads from BrandStage's perspective: 1400px)
 *
 * Mobile halves all transform amounts for a subtler feel.
 * Respects prefers-reduced-motion , skips all transforms when set.
 */

// ~ power3.out
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

  // k = intensity multiplier: 0 (no anim), 0.4 (mobile), 1 (desktop)
  const k = reduce ? 0 : isMobile ? 0.4 : 1;

  return (
    <m.div
      className={styles.layer}
      initial={k > 0
        ? { opacity: 0, y: 56 * k, scale: 1 - 0.035 * k, z: -70 * k }
        : false
      }
      whileInView={k > 0
        ? { opacity: 1, y: 0, scale: 1, z: 0 }
        : undefined
      }
      viewport={{ once: true, margin: '0px 0px -18% 0px' }}
      transition={{ duration: 0.88, ease: EASE }}
    >
      {children}
    </m.div>
  );
}
