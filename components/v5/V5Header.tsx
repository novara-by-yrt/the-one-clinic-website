'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { NAV, type NavItem, type NavLink } from '@/components/layout/Header/Header';
import { isV5Route } from './v5-routes';
import './v5-tokens.css';
import styles from './V5Header.module.css';

type Theme = 'dark' | 'light';

/**
 * The v5 masthead.
 *
 * The site's own header is a floating pill: a rounded, shadowed, blurred
 * bar that hovers inside the viewport. That reads as app chrome, which
 * is the opposite of what this route is. A magazine's masthead is flat
 * furniture printed on the page - full bleed, hairline ruled, set in
 * small tracked capitals - so this is that instead, and the site Header
 * stands down on the route (see components/layout/Header/Header.tsx),
 * exactly as it does for v1.
 *
 * Three things tie it to the sideways magazine specifically:
 *
 * - Its gutters are the route's own gutter token (--v5-pad-x), so the
 *   bar is measured by the same rhythm as the panels rather than by a
 *   width of its own. The cover's copy and the closing spread sit on
 *   that same edge; the image-left spreads run their plate full bleed
 *   past it by design.
 * - The hairline under the bar doubles as the reading position, filling
 *   left to right as the spreads flip. V5Track publishes that as
 *   --v5-progress on the root element.
 * - The nav is a contents overlay rather than six hover menus. The site
 *   nav has two mega menus of forty-odd links between them; dropping
 *   those over a panel that is exactly one viewport tall would bury it,
 *   and a contents page is what a magazine has anyway.
 *
 * Ink flips with the panel beneath the bar, read from the same
 * [data-section-theme] sentinels the site header uses, so the one bar
 * reads on the ink cover, on the paper spreads and on the ink close.
 */

/** '#about' and '#conditions' are on-page anchors that no v5 panel has. */
const realHref = (href: string) => (href.startsWith('#') ? undefined : href);

const isExternal = (href: string) => /^https?:\/\//.test(href);

function NavAnchor({
  href,
  className,
  children,
  onClick,
}: {
  href: string;
  className?: string;
  children: React.ReactNode;
  onClick?: () => void;
}) {
  if (isExternal(href)) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={className}
        onClick={onClick}
      >
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={className} onClick={onClick}>
      {children}
    </Link>
  );
}

/**
 * The contents overlay, derived from the site's own nav data so the two
 * can never drift apart.
 *
 * A column per group rather than a column per top-level item: Treatments
 * alone carries about forty links across five groups, and as one block
 * it would be a single tall column beside four short ones. Split by
 * group they balance, and the group names are the site's own headings.
 */
type Column = { key: string; kicker?: string; title: string; href?: string; links: NavLink[] };

function buildColumns(nav: NavItem[]) {
  const columns: Column[] = [];
  const loose: NavItem[] = [];

  for (const item of nav) {
    if (item.simple) {
      columns.push({
        key: item.label,
        title: item.label,
        href: realHref(item.href),
        links: item.simple,
      });
    } else if (item.groups) {
      for (const group of item.groups) {
        columns.push({
          key: `${item.label}/${group.group}`,
          kicker: item.label,
          title: group.group,
          links: group.items,
        });
      }
    } else {
      // Membership and the direct links: no children, so they read as a
      // plain row under the columns rather than as headings with nothing
      // beneath them.
      loose.push(item);
    }
  }

  return { columns, loose };
}

const Glyph = () => (
  <span className={styles.glyph} aria-hidden="true">
    <span />
    <span />
  </span>
);

const Arrow = () => (
  <svg width="15" height="15" viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <path
      d="M3 8h10M9 4l4 4-4 4"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default function V5Header() {
  const pathname = usePathname();
  const [theme, setTheme] = useState<Theme>('dark');
  const [open, setOpen] = useState(false);
  const contentsBtn = useRef<HTMLButtonElement>(null);
  const active = isV5Route(pathname);

  const { columns, loose } = useMemo(() => buildColumns(NAV), []);

  /* ── Ink follows the panel under the bar ──
     Same signal as the site header: the panels' [data-section-theme]
     sentinels. The band is the bar's own depth, so what is level with
     the bar decides, and the sentinels are inset from the panel sides
     so a flush neighbour cannot win the tie from off screen. */
  useEffect(() => {
    if (!active) return;

    const marks = document.querySelectorAll('[data-section-theme]');
    if (!marks.length) return;

    const io = new IntersectionObserver(
      (entries) => {
        const hit = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        const next = hit?.target.getAttribute('data-section-theme');
        if (next === 'dark' || next === 'light') setTheme(next);
      },
      { rootMargin: '-72px 0px -90% 0px', threshold: 0 },
    );
    marks.forEach((m) => io.observe(m));
    return () => io.disconnect();
  }, [active, pathname]);

  /* ── Close the overlay on Escape, and hand focus back ── */
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return;
      // The track also listens for keys; without this, Escape would
      // close the overlay and the arrow keys behind it would still be
      // flipping spreads the user cannot see.
      e.stopPropagation();
      setOpen(false);
      contentsBtn.current?.focus();
    };
    window.addEventListener('keydown', onKey, true);
    return () => window.removeEventListener('keydown', onKey, true);
  }, [open]);

  const book = useCallback(() => {
    setOpen(false);
    window.dispatchEvent(new CustomEvent('openBookConsultationModal'));
  }, []);

  // Rendered from the root layout, like V1Header, so it escapes
  // LayoutShell's stacking context. Placed after the hooks so hook order
  // stays stable across routes.
  if (!active) return null;

  return (
    <div className={`${styles.shell} v5-chrome`} data-theme={open ? 'dark' : theme}>
      <div className={styles.bar}>
        <Link href="/" className={styles.logo} aria-label="The One Clinic, home">
          <Image
            src="/images/LOGO.png"
            alt="The One Clinic"
            width={150}
            height={43}
            className={styles.logoImg}
            loading="eager"
            fetchPriority="high"
          />
        </Link>

        {/* The links that have no children sit in the bar itself; the
            rest live in the contents overlay. */}
        <nav className={styles.quick} aria-label="Main navigation">
          <ul className={styles.quickList} role="list">
            {loose.map((item) => (
              <li key={item.label}>
                <NavAnchor href={item.href} className={styles.quickLink}>
                  {item.label}
                </NavAnchor>
              </li>
            ))}
          </ul>
        </nav>

        <div className={styles.actions}>
          {/* A tracked label with a rule under it, not a second pill:
              the filled pill is the panels' call to action and stays
              theirs, so the masthead never competes with the spread it
              is sitting on. */}
          <button type="button" className={styles.book} onClick={book}>
            <span className={styles.bookLabel}>
              Book<span className={styles.bookLabelLong}> a Consultation</span>
            </span>
            <Arrow />
          </button>

          <button
            ref={contentsBtn}
            type="button"
            className={styles.contentsBtn}
            aria-expanded={open}
            aria-controls="v5-contents"
            onClick={() => setOpen((o) => !o)}
          >
            <span className={styles.contentsLabel}>{open ? 'Close' : 'Contents'}</span>
            <Glyph />
          </button>
        </div>

        {/* The rule is the reading position: it fills as the spreads
            flip. --v5-progress comes from V5Track. */}
        <span className={styles.rule} aria-hidden="true">
          <span className={styles.ruleFill} />
        </span>
      </div>

      {/* ── Contents ── */}
      <div id="v5-contents" className={styles.sheet} hidden={!open}>
        <div className={styles.sheetInner}>
          <div className={styles.columns}>
            {columns.map((col) => (
              <section key={col.key} className={styles.column}>
                {col.kicker && <p className={styles.columnKicker}>{col.kicker}</p>}

                {col.href ? (
                  <h2 className={styles.columnTitle}>
                    <NavAnchor
                      href={col.href}
                      className={styles.columnTitleLink}
                      onClick={() => setOpen(false)}
                    >
                      {col.title}
                    </NavAnchor>
                  </h2>
                ) : (
                  <h2 className={styles.columnTitle}>{col.title}</h2>
                )}

                <ul className={styles.columnList} role="list">
                  {col.links.map((l) => (
                    <li key={l.href}>
                      <NavAnchor
                        href={l.href}
                        className={styles.columnLink}
                        onClick={() => setOpen(false)}
                      >
                        {l.label}
                      </NavAnchor>
                    </li>
                  ))}
                </ul>
              </section>
            ))}
          </div>

          <div className={styles.sheetFoot}>
            <ul className={styles.looseList} role="list">
              {loose.map((item) => (
                <li key={item.label}>
                  <NavAnchor
                    href={item.href}
                    className={styles.looseLink}
                    onClick={() => setOpen(false)}
                  >
                    {item.label}
                  </NavAnchor>
                </li>
              ))}
            </ul>

            <button type="button" className={`v5-cta ${styles.sheetCta}`} onClick={book}>
              Book a Consultation
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
