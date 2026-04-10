'use client';

import styles from './TrustBadges.module.css';

/* ── Google G (official brand colors) ───────────────────────── */
function GoogleIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
    </svg>
  );
}

/* ── Trustpilot star icon ───────────────────────────────────── */
function TrustpilotIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path
        fill="#00B67A"
        d="M12 2l2.582 7.952H22.9l-6.832 4.962 2.608 8.024L12 18.012l-6.676 4.926 2.608-8.024L1.1 9.952H9.418z"
      />
    </svg>
  );
}

/* ── Star row ─────────────────────────────────────────────────
   Renders 5 filled stars; uses the supplied fill color.        */
function Stars({ color }: { color: string }) {
  return (
    <div className={styles.stars} aria-hidden="true">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} width="15" height="15" viewBox="0 0 24 24">
          <path
            fill={color}
            d="M12 2l2.582 7.952H22.9l-6.832 4.962 2.608 8.024L12 18.012l-6.676 4.926 2.608-8.024L1.1 9.952H9.418z"
          />
        </svg>
      ))}
    </div>
  );
}

/* ── Props ───────────────────────────────────────────────────── */
interface TrustBadgesProps {
  /** 'dark' for dark/video backgrounds; 'light' for white sections */
  theme?: 'dark' | 'light';
  className?: string;
}

/* ── Component ───────────────────────────────────────────────── */
export default function TrustBadges({ theme = 'dark', className }: TrustBadgesProps) {
  const wrapClass = [styles.wrap, styles[theme], className].filter(Boolean).join(' ');

  return (
    <div className={wrapClass} role="region" aria-label="Customer review ratings">

      {/* Google */}
      <div className={styles.badge}>
        <div className={styles.badgeHeader}>
          <GoogleIcon />
          <span className={styles.platform}>Google</span>
          <span className={styles.verified}>Excellent</span>
        </div>
        <Stars color="#FBBC04" />
        <p className={styles.summary}>
          <strong className={styles.score}>5.0</strong>
          <span className={styles.dot} aria-hidden="true" />
          <span className={styles.count}>120+ reviews</span>
        </p>
      </div>

      {/* Divider */}
      <div className={styles.sep} aria-hidden="true" />

      {/* Trustpilot */}
      <div className={styles.badge}>
        <div className={styles.badgeHeader}>
          <TrustpilotIcon />
          <span className={styles.platform}>Trustpilot</span>
          <span className={styles.verified}>Excellent</span>
        </div>
        <Stars color="#00B67A" />
        <p className={styles.summary}>
          <strong className={styles.score}>4.7</strong>
          <span className={styles.dot} aria-hidden="true" />
          <span className={styles.count}>140+ reviews</span>
        </p>
      </div>

    </div>
  );
}
