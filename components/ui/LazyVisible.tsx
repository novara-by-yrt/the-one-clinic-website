'use client';

import { useState, useRef, useEffect, type ReactNode } from 'react';

/**
 * Mounts its children only once the placeholder approaches the viewport.
 *
 * Heavy below-the-fold sections (e.g. Swiper carousels) otherwise initialise
 * during the initial page load and inflate Total Blocking Time. Gating them
 * behind an IntersectionObserver keeps that work off the critical path; a
 * generous rootMargin means the real content is already mounted by the time
 * the user actually scrolls to it, so there is no pop-in.
 *
 * The placeholder reserves `minHeight` so the swap does not shift layout.
 * Because the mount happens well before the section enters the viewport, any
 * residual height difference settles off-screen and does not count toward CLS.
 */
export default function LazyVisible({
  minHeight,
  rootMargin = '1200px',
  children,
}: {
  minHeight: number | string;
  rootMargin?: string;
  children: ReactNode;
}) {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (visible) return;
    const el = ref.current;
    if (!el) return;

    // No IntersectionObserver support → render immediately.
    if (typeof IntersectionObserver === 'undefined') {
      setVisible(true);
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setVisible(true);
          io.disconnect();
        }
      },
      { rootMargin },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [visible, rootMargin]);

  return (
    <div ref={ref} style={visible ? undefined : { minHeight }}>
      {visible ? children : null}
    </div>
  );
}
