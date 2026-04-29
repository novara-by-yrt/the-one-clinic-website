'use client';

import { useRef, useEffect } from 'react';
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useReducedMotion,
} from 'framer-motion';
import styles from './LayoutShell.module.css';

interface LayoutShellProps {
  children: React.ReactNode;
  footer: React.ReactNode;
}

export default function LayoutShell({ children, footer }: LayoutShellProps) {
  const footerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  // Measure footer height and set CSS variable
  useEffect(() => {
    const el = footerRef.current;
    if (!el) return;

    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const h = entry.contentRect.height;
        document.documentElement.style.setProperty('--footer-height', `${h}px`);
      }
    });

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Window scroll progress (no target = whole document)
  const { scrollYProgress } = useScroll();

  // Map scroll ranges to y and opacity transforms
  const yRaw = useTransform(scrollYProgress, [0.62, 1.0], [24, 0]);
  const opacityRaw = useTransform(scrollYProgress, [0.52, 0.92], [0.4, 1]);

  // Apply spring for cinematic smoothness
  const springConfig = { stiffness: 55, damping: 22, mass: 0.85 };
  const ySpring = useSpring(yRaw, springConfig);
  const opacitySpring = useSpring(opacityRaw, springConfig);

  // Respect reduced motion preference
  const y = prefersReducedMotion ? 0 : ySpring;
  const opacity = prefersReducedMotion ? 1 : opacitySpring;

  return (
    <>
      <div className={styles.content}>{children}</div>
      <motion.div
        ref={footerRef}
        className={styles.footerFixed}
        style={{ y, opacity }}
      >
        {footer}
      </motion.div>
    </>
  );
}
