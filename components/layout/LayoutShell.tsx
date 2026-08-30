'use client';

import { useRef, useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import {
  m,
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

/**
 * Routes whose footer scrolls in normal document flow instead of using the
 * fixed reveal. On these the header also gets out of the way once the footer
 * is on screen, so nothing floats over it.
 */
const FLOW_FOOTER_ROUTES = new Set(['/v1']);

export default function LayoutShell({ children, footer }: LayoutShellProps) {
  const footerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const pathname = usePathname();
  const flowFooter = FLOW_FOOTER_ROUTES.has(pathname);

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

  /**
   * Tell the header when the footer is on screen, so it can move out of the
   * way. The flag lives on <html> because the header and the footer are
   * siblings with no shared ancestor to hang state off.
   */
  useEffect(() => {
    const root = document.documentElement;
    if (!flowFooter) {
      delete root.dataset.footerVisible;
      return;
    }
    const el = footerRef.current;
    if (!el) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        root.dataset.footerVisible = entry.isIntersecting ? 'true' : 'false';
      },
      { threshold: 0 },
    );
    io.observe(el);

    return () => {
      io.disconnect();
      // Leaving the route must not strand the header off-screen
      delete root.dataset.footerVisible;
    };
  }, [flowFooter]);

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
      {/* Spacer pushes the page height so the fixed footer is reachable by scroll,
          but has pointer-events:none so it never blocks footer clicks.
          Not needed when the footer is in normal flow — it carries its own height. */}
      {!flowFooter && <div className={styles.footerSpacer} aria-hidden="true" />}
      <m.div
        ref={footerRef}
        className={`${styles.footerFixed} ${flowFooter ? styles.footerFlow : ''}`}
        // The reveal transform is what makes the footer a fixed layer; in flow
        // mode it has to be omitted entirely, not just set to zero.
        style={flowFooter ? undefined : { y, opacity }}
      >
        {footer}
      </m.div>
    </>
  );
}
