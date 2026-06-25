'use client';

import { LazyMotion, domAnimation } from 'framer-motion';

/**
 * Loads only the DOM animation feature set of Framer Motion (animations,
 * variants, exit, and the inView/hover/tap/focus gestures the site actually
 * uses) instead of the full bundle, which also pulls in the drag, layout and
 * projection code this site never uses. Paired with the lightweight `m.*`
 * components across the app, this trims the motion JavaScript on every route.
 *
 * Features are loaded synchronously (static import) so `m` components animate
 * immediately on hydration — identical behaviour to the previous `motion.*`
 * components, with no risk of inView content staying hidden while a deferred
 * feature chunk loads.
 */
export default function MotionProvider({ children }: { children: React.ReactNode }) {
  return <LazyMotion features={domAnimation}>{children}</LazyMotion>;
}
