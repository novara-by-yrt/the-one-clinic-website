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
import { isV1Route } from '@/components/v1/v1-routes';
import styles from './LayoutShell.module.css';

interface LayoutShellProps {
  children: React.ReactNode;
  footer: React.ReactNode;
}

export default function LayoutShell({ children, footer }: LayoutShellProps) {
  const footerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const pathname = usePathname();
  /**
   * The reveal only works while the whole footer fits on screen. A footer
   * taller than the viewport has its top permanently out of reach, because a
   * fixed element does not scroll — at 1366x768, one of the most common
   * laptop sizes, that hid the newsletter heading entirely. Measuring beats
   * a height breakpoint here: the footer's height changes with its content
   * and with width, so any fixed number would be wrong somewhere.
   */
  const [footerFits, setFooterFits] = useState(true);
  const flowFooter = isV1Route(pathname) || !footerFits;

  // Measure the footer: publishes its height for the spacer, and decides
  // whether the fixed reveal can show all of it.
  useEffect(() => {
    const el = footerRef.current;
    if (!el) return;

    const measure = (h: number) => {
      document.documentElement.style.setProperty('--footer-height', `${h}px`);
      setFooterFits(h <= window.innerHeight);
    };

    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) measure(entry.contentRect.height);
    });
    observer.observe(el);

    // Height alone does not change on a window resize, so re-test on resize too
    const onResize = () => measure(el.getBoundingClientRect().height);
    window.addEventListener('resize', onResize);

    return () => {
      observer.disconnect();
      window.removeEventListener('resize', onResize);
    };
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
