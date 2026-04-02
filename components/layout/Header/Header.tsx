'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import Container from '@/components/ui/Container';
import styles from './Header.module.css';

type Theme = 'light' | 'dark';

const NAV_LINKS = [
  { label: 'Home',       href: '/' },
  { label: 'Treatments', href: '/treatments' },
  { label: 'Results',    href: '#results' },
  { label: 'About',      href: '#about' },
];

// ── Framer Motion variants ──────────────────────────────────────
const menuVariants = {
  closed: { opacity: 0, x: '100%' },
  open:   { opacity: 1, x: 0 },
};

const menuTransition = { duration: 0.38, ease: [0.32, 0.72, 0, 1] as const };

const itemVariants = {
  closed: { opacity: 0, x: 20 },
  open:   (i: number) => ({ opacity: 1, x: 0, transition: { delay: 0.08 + i * 0.07, duration: 0.3 } }),
};

const ctaVariants = {
  closed: { opacity: 0, y: 12 },
  open:   { opacity: 1, y: 0, transition: { delay: 0.36, duration: 0.3 } },
};

// ── Component ───────────────────────────────────────────────────
export default function Header() {
  const [scrolled, setScrolled]         = useState(false);
  const [sectionTheme, setSectionTheme] = useState<Theme>('dark'); // default: hero is dark
  const [menuOpen, setMenuOpen]         = useState(false);
  const observerRef                     = useRef<IntersectionObserver | null>(null);

  // Derived active theme
  const theme: Theme = !scrolled ? 'dark' : sectionTheme;

  // ── Scroll detection ──────────────────────────────────────────
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    // Set initial state (page may have loaded scrolled)
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // ── Section theme detection via IntersectionObserver ─────────
  // Sections should carry a `data-section-theme="light|dark"` attribute.
  useEffect(() => {
    observerRef.current?.disconnect();

    observerRef.current = new IntersectionObserver(
      (entries) => {
        // Pick the topmost intersecting section near the header band
        const hit = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];

        if (hit) {
          const t = hit.target.getAttribute('data-section-theme') as Theme | null;
          if (t) setSectionTheme(t);
        }
      },
      // Watch a thin band just below the header (~64px from top)
      { rootMargin: '-64px 0px -88% 0px', threshold: 0 },
    );

    document.querySelectorAll('[data-section-theme]').forEach((el) => {
      observerRef.current!.observe(el);
    });

    return () => observerRef.current?.disconnect();
  }, []);

  // ── Body scroll lock when menu open ──────────────────────────
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const closeMenu = useCallback(() => setMenuOpen(false), []);

  // ── Animated header bg / border colors ───────────────────────
  const bgColor = !scrolled
    ? 'rgba(0,0,0,0)'
    : sectionTheme === 'dark'
    ? '#000000'
    : '#FFFFFF';

  const borderColor = !scrolled
    ? 'rgba(0,0,0,0)'
    : sectionTheme === 'dark'
    ? 'rgba(255,255,255,0.1)'
    : 'rgba(0,0,0,0.08)';

  return (
    <>
      {/* ── Header bar ───────────────────────────────────────── */}
      <motion.header
        className={styles.header}
        role="banner"
        data-theme={theme}
        data-scrolled={scrolled}
        animate={{ backgroundColor: bgColor, borderBottomColor: borderColor }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
      >
        <Container>
          <div className={styles.inner}>

            {/* Logo */}
            <Link href="/" className={styles.logo} aria-label="The One Clinic – home">
              <span className={styles.logoText}>TheOneClinic</span>
            </Link>

            {/* Desktop nav */}
            <nav className={styles.desktopNav} aria-label="Main navigation">
              <ul className={styles.navList} role="list">
                {NAV_LINKS.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className={styles.navLink}>
                      <span className={styles.navLinkInner}>{link.label}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            {/* Desktop CTA */}
            <Link href="#contact" className={styles.ctaLink} aria-label="Contact us">
              Contact
            </Link>

            {/* Hamburger */}
            <button
              className={styles.menuBtn}
              onClick={() => setMenuOpen((o) => !o)}
              aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
            >
              <motion.span
                className={styles.bar}
                animate={menuOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.25 }}
              />
              <motion.span
                className={styles.bar}
                animate={menuOpen ? { opacity: 0, scaleX: 0.2 } : { opacity: 1, scaleX: 1 }}
                transition={{ duration: 0.2 }}
              />
              <motion.span
                className={styles.bar}
                animate={menuOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.25 }}
              />
            </button>

          </div>
        </Container>
      </motion.header>

      {/* ── Mobile menu overlay ───────────────────────────────── */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="mobile-menu"
            className={styles.mobileMenu}
            role="dialog"
            aria-label="Navigation menu"
            aria-modal="true"
            variants={menuVariants}
            initial="closed"
            animate="open"
            exit="closed"
            transition={menuTransition}
          >
            {/* Close button */}
            <button
              className={styles.closeBtn}
              onClick={closeMenu}
              aria-label="Close navigation menu"
            >
              <span aria-hidden="true">✕</span>
            </button>

            {/* Nav links */}
            <nav aria-label="Mobile navigation">
              <ul className={styles.mobileNavList} role="list">
                {NAV_LINKS.map((link, i) => (
                  <motion.li
                    key={link.href}
                    custom={i}
                    variants={itemVariants}
                    initial="closed"
                    animate="open"
                  >
                    <Link
                      href={link.href}
                      className={styles.mobileNavLink}
                      onClick={closeMenu}
                    >
                      {link.label}
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </nav>

            {/* Mobile CTA */}
            <motion.div
              className={styles.mobileCta}
              variants={ctaVariants}
              initial="closed"
              animate="open"
            >
              <Link href="#contact" className={styles.mobileCtaLink} onClick={closeMenu}>
                Contact
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
