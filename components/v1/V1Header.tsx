'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { m, AnimatePresence } from 'framer-motion';
import { NAV, type NavItem } from '@/components/layout/Header/Header';
import { isV1Route } from './v1-routes';
import styles from './V1Header.module.css';

type Theme = 'dark' | 'light';

const EASE = [0.22, 1, 0.36, 1] as const;

/** Panels swing down from the bar's edge rather than fading in flat. */
const PANEL = {
  hidden: { opacity: 0, y: -10, rotateX: -14, scale: 0.985, transformPerspective: 1400 },
  show: {
    opacity: 1, y: 0, rotateX: 0, scale: 1, transformPerspective: 1400,
    transition: { duration: 0.42, ease: EASE, staggerChildren: 0.018 },
  },
  exit: {
    opacity: 0, y: -8, rotateX: -8, scale: 0.99, transformPerspective: 1400,
    transition: { duration: 0.18, ease: 'easeIn' as const },
  },
};

/** Columns arrive one after another, so the panel assembles rather than pops. */
const COLUMN = {
  hidden: { opacity: 0, y: 12, filter: 'blur(6px)' },
  show: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.45, ease: EASE } },
};

const Caret = ({ className }: { className?: string }) => (
  <svg className={className} width="10" height="10" viewBox="0 0 12 12"
       fill="none" aria-hidden="true">
    <path d="M2.5 4.5 6 8l3.5-3.5" stroke="currentColor" strokeWidth="1.6"
      strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const Arrow = ({ className }: { className?: string }) => (
  <svg className={className} width="14" height="14" viewBox="0 0 16 16"
       fill="none" aria-hidden="true">
    <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.8"
      strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const isExternal = (href: string) => /^https?:\/\//.test(href);

function NavAnchor({ href, className, children, onClick }: {
  href: string; className?: string; children: React.ReactNode; onClick?: () => void;
}) {
  if (isExternal(href)) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer"
         className={className} onClick={onClick}>{children}</a>
    );
  }
  return <Link href={href} className={className} onClick={onClick}>{children}</Link>;
}

export default function V1Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [theme, setTheme] = useState<Theme>('dark');
  const [open, setOpen] = useState<number | null>(null);
  const [sheet, setSheet] = useState(false);
  const [expanded, setExpanded] = useState<Set<number>>(new Set());

  const shellRef = useRef<HTMLDivElement>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const openMenu = useCallback((i: number) => {
    if (closeTimer.current) { clearTimeout(closeTimer.current); closeTimer.current = null; }
    setOpen(i);
  }, []);

  // Small grace period so the pointer can cross the gap from item to panel
  const scheduleClose = useCallback(() => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setOpen(null), 140);
  }, []);

  /**
   * Scroll state plus ink colour.
   *
   * The bar sits over sections of three different values, so its ink is
   * derived from whichever [data-section-theme] element the bar is currently
   * crossing. Reading the sections' own rects is deterministic — hit-testing
   * with elementFromPoint would just return the bar itself.
   */
  useEffect(() => {
    let frame = 0;
    const sync = () => {
      frame = 0;
      const y = window.scrollY;
      setScrolled(y > 16);

      const shell = shellRef.current;
      const probe = (shell?.getBoundingClientRect().height ?? 92) * 0.5;
      let found: Theme | null = null;
      for (const el of document.querySelectorAll<HTMLElement>('[data-section-theme]')) {
        const r = el.getBoundingClientRect();
        if (r.top <= probe && r.bottom > probe) {
          found = el.dataset.sectionTheme === 'dark' ? 'dark' : 'light';
          break;
        }
      }
      // Over a dark section the bar is white; over a light one it inverts.
      setTheme(found ?? 'dark');
    };
    const onScroll = () => { if (!frame) frame = requestAnimationFrame(sync); };
    sync();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  // Publish the bar height so the mega panel can dock beneath it
  useEffect(() => {
    const shell = shellRef.current;
    if (!shell) return;
    const bar = shell.querySelector<HTMLElement>(`.${styles.bar}`);
    if (!bar) return;
    const ro = new ResizeObserver(() => {
      shell.style.setProperty('--hd-bar-h', `${bar.getBoundingClientRect().height}px`);
    });
    ro.observe(bar);
    return () => ro.disconnect();
  }, []);

  // Escape closes whatever is open; the sheet also locks body scroll
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return;
      setOpen(null);
      setSheet(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  useEffect(() => {
    document.body.style.overflow = sheet ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [sheet]);

  const book = useCallback(() => {
    setSheet(false);
    window.dispatchEvent(new CustomEvent('openBookConsultationModal'));
  }, []);

  const toggleRow = (i: number) =>
    setExpanded((prev) => {
      const next = new Set(prev);
      if (next.has(i)) next.delete(i); else next.add(i);
      return next;
    });

  // Rendered from the root layout so it escapes LayoutShell's stacking
  // context; only v1 routes actually show it. Placed after the hooks so
  // hook order stays stable across routes.
  if (!isV1Route(pathname)) return null;

  const renderItem = (item: NavItem, i: number) => {
    const sub = item.simple ?? null;
    const groups = item.groups ?? null;
    const hasMenu = !!(sub || groups);
    const isOpen = open === i;

    if (!hasMenu) {
      return (
        <li key={item.label} className={styles.navItem}>
          <NavAnchor href={item.href} className={styles.navLink}>{item.label}</NavAnchor>
        </li>
      );
    }

    return (
      <li
        key={item.label}
        className={styles.navItem}
        onMouseEnter={() => openMenu(i)}
        onMouseLeave={scheduleClose}
      >
        <button
          type="button"
          className={`${styles.navLink} ${isOpen ? styles.navLinkOpen : ''}`}
          aria-expanded={isOpen}
          aria-haspopup="true"
          onClick={() => setOpen(isOpen ? null : i)}
          onFocus={() => openMenu(i)}
        >
          {item.label}
          <Caret className={styles.caret} />
        </button>

        <AnimatePresence>
          {isOpen && sub && (
            <m.ul className={styles.panel} variants={PANEL}
                  initial="hidden" animate="show" exit="exit" role="list">
              {sub.map((l) => (
                <li key={l.href}>
                  <NavAnchor href={l.href} className={styles.ddLink}
                             onClick={() => setOpen(null)}>{l.label}</NavAnchor>
                </li>
              ))}
            </m.ul>
          )}

          {isOpen && groups && (
            <m.div className={styles.mega} variants={PANEL}
                   initial="hidden" animate="show" exit="exit">
              {groups.map((g) => (
                <m.div
                  key={g.group}
                  className={styles.megaGroup}
                  variants={COLUMN}
                  // In motion rather than CSS: once the entry animation
                  // settles, framer writes transform inline and a CSS
                  // :hover transform can never win against it.
                  whileHover={{ translateZ: 26 }}
                  transition={{ duration: 0.45, ease: EASE }}
                >
                  <p className={styles.megaTitle}>{g.group}</p>
                  <ul className={styles.megaList} role="list">
                    {g.items.map((l) => (
                      <li key={l.href}>
                        <NavAnchor href={l.href} className={styles.megaLink}
                                   onClick={() => setOpen(null)}>{l.label}</NavAnchor>
                      </li>
                    ))}
                  </ul>
                </m.div>
              ))}
            </m.div>
          )}
        </AnimatePresence>
      </li>
    );
  };

  return (
    <div
      ref={shellRef}
      className={styles.shell}
      data-scrolled={scrolled}
      // While the sheet is open the bar always sits on black
      data-theme={sheet ? 'dark' : theme}
    >
      <div className={styles.bar}>
        <Link href="/" className={styles.logo} aria-label="The One Clinic, home">
          <Image
            src="/images/LOGO.png"
            alt="The One Clinic"
            width={140}
            height={40}
            className={styles.logoImg}
            priority
          />
        </Link>

        <nav className={styles.nav} aria-label="Main navigation">
          <ul className={styles.navList} role="list">
            {NAV.map(renderItem)}
          </ul>
        </nav>

        <div className={styles.right}>
          <button type="button" className={styles.cta} onClick={book}>
            <span>
              Book<span className={styles.ctaLabelLong}> a Consultation</span>
            </span>
            <Arrow className={styles.ctaArrow} />
          </button>

          <button
            type="button"
            className={styles.menuBtn}
            aria-expanded={sheet}
            aria-controls="v1-menu"
            aria-label={sheet ? 'Close navigation menu' : 'Open navigation menu'}
            onClick={() => setSheet((s) => !s)}
          >
            <span className={styles.bars} aria-hidden="true">
              <span className={styles.bar1} />
              <span className={styles.bar2} />
            </span>
          </button>
        </div>

        <span className={styles.rule} aria-hidden="true" />
      </div>

      {/* ── Mobile sheet ── */}
      <AnimatePresence>
        {sheet && (
          <m.div
            id="v1-menu"
            className={styles.sheet}
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0, transition: { duration: 0.3, ease: EASE } }}
            exit={{ opacity: 0, y: -8, transition: { duration: 0.2, ease: 'easeIn' } }}
          >
            <ul className={styles.sheetList} role="list">
              {NAV.map((item, i) => {
                const sub = item.simple ?? null;
                const groups = item.groups ?? null;
                const hasMenu = !!(sub || groups);
                const isOpen = expanded.has(i);

                return (
                  <li key={item.label} className={styles.sheetRow}>
                    {hasMenu ? (
                      <button
                        type="button"
                        className={`${styles.sheetLink} ${isOpen ? styles.sheetLinkOpen : ''}`}
                        aria-expanded={isOpen}
                        onClick={() => toggleRow(i)}
                      >
                        {item.label}
                        <Caret className={styles.sheetCaret} />
                      </button>
                    ) : (
                      <NavAnchor href={item.href} className={styles.sheetLink}
                                 onClick={() => setSheet(false)}>
                        {item.label}
                      </NavAnchor>
                    )}

                    <AnimatePresence initial={false}>
                      {hasMenu && isOpen && (
                        <m.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.28, ease: EASE }}
                          style={{ overflow: 'hidden' }}
                        >
                          <ul className={styles.sheetSub} role="list">
                            {sub?.map((l) => (
                              <li key={l.href}>
                                <NavAnchor href={l.href} className={styles.sheetSubLink}
                                           onClick={() => setSheet(false)}>{l.label}</NavAnchor>
                              </li>
                            ))}
                            {groups?.map((g) => (
                              <li key={g.group}>
                                <p className={styles.sheetSubTitle}>{g.group}</p>
                                <ul className={styles.sheetSub} role="list">
                                  {g.items.map((l) => (
                                    <li key={l.href}>
                                      <NavAnchor href={l.href} className={styles.sheetSubLink}
                                                 onClick={() => setSheet(false)}>{l.label}</NavAnchor>
                                    </li>
                                  ))}
                                </ul>
                              </li>
                            ))}
                          </ul>
                        </m.div>
                      )}
                    </AnimatePresence>
                  </li>
                );
              })}
            </ul>

            <button type="button" className={styles.sheetCta} onClick={book}>
              Book a Consultation
              <Arrow />
            </button>
          </m.div>
        )}
      </AnimatePresence>
    </div>
  );
}
