'use client';

import { useRef, useCallback, useEffect, useState } from 'react';

/**
 * Pointer-driven 3D tilt.
 *
 * Writes rotateX/rotateY straight to the element's style on rAF rather than
 * through React state — a tilt that re-renders on every mousemove drops
 * frames on a page with this many sections. The element it is attached to
 * needs a perspective ancestor (see .stage in v1-tokens / section modules).
 *
 * Disabled for reduced-motion and for coarse pointers, where there is no
 * hover to drive it and the transform only risks obscuring content.
 */
export function useTilt<T extends HTMLElement = HTMLDivElement>(opts?: {
  /** Max rotation in degrees on each axis. */
  max?: number;
  /** Z-translation applied while hovered, in px. */
  lift?: number;
  /** Scale applied while hovered. */
  scale?: number;
}) {
  const { max = 8, lift = 24, scale = 1 } = opts ?? {};
  const ref = useRef<T>(null);
  const frame = useRef(0);
  const target = useRef({ rx: 0, ry: 0, z: 0, s: 1 });
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)');
    const still = window.matchMedia('(prefers-reduced-motion: reduce)');
    const sync = () => setEnabled(fine.matches && !still.matches);
    sync();
    fine.addEventListener('change', sync);
    still.addEventListener('change', sync);
    return () => {
      fine.removeEventListener('change', sync);
      still.removeEventListener('change', sync);
    };
  }, []);

  const paint = useCallback(() => {
    frame.current = 0;
    const el = ref.current;
    if (!el) return;
    const { rx, ry, z, s } = target.current;
    el.style.transform =
      `rotateX(${rx}deg) rotateY(${ry}deg) translateZ(${z}px) scale(${s})`;
  }, []);

  const schedule = useCallback(() => {
    if (frame.current) return;
    frame.current = requestAnimationFrame(paint);
  }, [paint]);

  const onPointerMove = useCallback(
    (e: React.PointerEvent<T>) => {
      if (!enabled) return;
      const el = ref.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      // -0.5..0.5 from the element's centre
      const px = (e.clientX - r.left) / r.width - 0.5;
      const py = (e.clientY - r.top) / r.height - 0.5;
      target.current = { rx: -py * max * 2, ry: px * max * 2, z: lift, s: scale };
      schedule();
    },
    [enabled, max, lift, scale, schedule],
  );

  const onPointerLeave = useCallback(() => {
    if (!enabled) return;
    target.current = { rx: 0, ry: 0, z: 0, s: 1 };
    schedule();
  }, [enabled, schedule]);

  useEffect(
    () => () => {
      if (frame.current) cancelAnimationFrame(frame.current);
    },
    [],
  );

  return {
    ref,
    tiltProps: { onPointerMove, onPointerLeave },
    enabled,
  };
}
