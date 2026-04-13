'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import Container from '@/components/ui/Container';
import styles from './Header.module.css';

// ── Types ───────────────────────────────────────────────────────
type Theme    = 'light' | 'dark';
type NavLink  = { label: string; href: string };
type NavGroup = { group: string; items: NavLink[] };
type NavItem  = {
  label: string;
  href:  string;
  simple?: NavLink[];
  groups?: NavGroup[];
};

// ── Nav data ────────────────────────────────────────────────────
const NAV: NavItem[] = [
  {
    label: 'About Our Clinic',
    href:  '#about',
    simple: [
      { label: 'Our Facilities', href: '/our-facilities' },
      { label: 'Our Team',       href: '/our-team' },
      { label: 'What We Do',     href: '/what-we-do' },
    ],
  },
  {
    label: 'Treatments',
    href:  '/treatments',
    groups: [
      {
        group: 'Health & Wellbeing',
        items: [
          { label: 'Health Screening',                                        href: '/treatments/health-screening' },
          { label: 'Private GP Leicester',                                    href: '/treatments/private-gp' },
          { label: 'Joint Injections',                                        href: '/treatments/joint-injections' },
          { label: 'Minor Surgery',                                           href: '/treatments/minor-surgery' },
          { label: 'GP Home Visits Leicester',                                href: '/treatments/gp-home-visits' },
          { label: 'Travel Vaccine & Immunisations',                          href: '/treatments/travel-vaccine' },
          { label: 'Weight Management',                                       href: '/treatments/weight-management' },
          { label: 'Medical Insurance Examination',                           href: '/treatments/medical-insurance' },
          { label: 'Dermatologist Leicester',                                 href: '/treatments/dermatologist' },
          { label: "Men's Health",                                            href: '/treatments/mens-health' },
          { label: "Women's Health Clinic",                                   href: '/treatments/womens-health' },
          { label: "Women's Health – Menopause / HRT / Contraception",       href: '/treatments/menopause-hrt' },
          { label: 'Mental Health Consultation',                              href: '/treatments/mental-health-consultation' },
        ],
      },
      {
        group: 'Medical Aesthetics',
        items: [
          { label: 'Dermal Fillers',                           href: '/treatments/dermal-fillers' },
          { label: 'Lumecca IPL',                              href: '/treatments/lumecca-ipl-leicester' },
          { label: 'HydraFacial Keravive',                    href: '/treatments/hydrafacial-keravive' },
          { label: 'Morpheus8',                               href: '/treatments/morpheus8' },
          { label: 'Wrinkle Relaxing Injections',             href: '/treatments/wrinkle-relaxing-injections' },
          { label: 'Hydrafacial Leicester',                   href: '/treatments/hydrafacial' },
          { label: 'Vampire Facial',                          href: '/treatments/vampire-facial' },
          { label: 'Chemical Peels',                          href: '/treatments/chemical-peels' },
          { label: 'Skin Analysis – Life Viz 3D Camera',      href: '/treatments/skin-analysis' },
          { label: 'Body Contouring',                         href: '/treatments/body-contouring' },
          { label: 'Endolift Laser',                          href: '/treatments/endolift' },
          { label: 'Skincare – Alumier MD',                   href: '/treatments/skincare-alumier-md' },
          { label: 'Skin Lesion Removal Leicester',           href: '/treatments/skin-lesion' },
          { label: 'Wart Removal Leicester',                 href: '/treatments/wart-removal-leicester' },
          { label: 'Acne Scar Removal Leicester',           href: '/treatments/acne-scar-removal-leicester' },
          { label: 'Regenerative Medicine – Exosome Therapy', href: '/treatments/regenerative-medicine-exosome-therapy' },
          { label: 'Regenerative Medicine – Polynucleotides', href: '/treatments/polynucleotides' },
          { label: 'Cool Bleph',                              href: '/treatments/cool-bleph' },
          { label: 'COOL Glow Peel (Full Face)',              href: '/treatments/cool-glow-full-face' },
          { label: 'Cool Scar Lift',                          href: '/treatments/cool-scar-lift' },
          { label: 'Mole Removal',                            href: '/treatments/mole-removal-leicester' },
          { label: 'Laser Mole Removal',                      href: '/treatments/laser-mole-removal' },
          { label: 'Laser Snoring Treatment',                 href: '/treatments/laser-snoring-treatment' },
          { label: 'Laser Vaginal Rejuvenation',              href: '/treatments/laser-vaginal' },
          { label: 'IV Drip Therapy',                         href: '/treatments/iv-drip' },
          { label: 'Deep Laser Resurfacing',                  href: '/treatments/laser-resurfacing' },
          { label: 'The Body Confidence Package',             href: '/treatments/body-confidence' },
          { label: 'Lipoma Removal Leicester',                href: '/treatments/lipoma-removal' },
          { label: 'Liposuction Leicester',                   href: '/treatments/liposuction-leicester' },
          { label: 'Non Surgical Blepharoplasty',             href: '/treatments/blepharoplasty' },
        ],
      },
    ],
  },
  {
    label: 'Conditions',
    href:  '#conditions',
    groups: [
      {
        group: 'Face',
        items: [
          { label: 'Eye Bags',                    href: '/conditions/eye-bags' },
          { label: 'Jowls / Sagging Skin',        href: '/conditions/jowls' },
          { label: 'Nasolabial Folds',            href: '/conditions/nasolabial-folds' },
          { label: 'Turkey Neck / Necklines',     href: '/conditions/turkey-neck' },
          { label: 'Facial Redness / Rosacea',    href: '/conditions/rosacea' },
          { label: 'Thin Lips',                   href: '/conditions/thin-lips' },
          { label: 'Weak Chin / Weak Jawline',    href: '/conditions/weak-chin' },
        ],
      },
      {
        group: 'Skin',
        items: [
          { label: 'Pigmentation',                           href: '/conditions/pigmentation' },
          { label: 'Spider Veins / Thread Veins',            href: '/conditions/thread-veins' },
          { label: 'Hyperpigmentation / Sun Damage / Freckles', href: '/conditions/hyperpigmentation' },
        ],
      },
      {
        group: 'Body',
        items: [
          { label: 'Cellulite',                                                      href: '/conditions/cellulite' },
          { label: 'Abdominal Fat / Belly Fat',                                      href: '/conditions/abdominal-fat' },
          { label: 'Stretch Marks',                                                  href: '/conditions/stretch-marks' },
          { label: 'Excessive Sweating',                                             href: '/conditions/sweating' },
          { label: 'Excess Body Fat / Arm / Bra / Back / Thigh Fat',                href: '/conditions/excess-fat' },
        ],
      },
    ],
  },
  { label: 'Membership',         href: 'https://theoneclinic.eu.zenoti.com/webstoreNew/sales/membership/4fbea838-3725-4392-a22a-3b301fbd0229' },
  { label: 'Patient Experience', href: '#results' },
  { label: 'Contact Us',         href: '/contact' },
];

// ── Motion variants ─────────────────────────────────────────────
const menuVariants   = { closed: { opacity: 0, x: '100%' }, open: { opacity: 1, x: 0 } };
const menuTransition = { duration: 0.38, ease: [0.32, 0.72, 0, 1] as const };
const dropdownVars   = {
  closed: { opacity: 0, y: -6, pointerEvents: 'none' as const },
  open:   { opacity: 1, y: 0,  pointerEvents: 'auto' as const },
};
const dropdownTrans  = { duration: 0.2, ease: [0.25, 0.1, 0.25, 1] as const };
const ctaVariants    = {
  closed: { opacity: 0, y: 12 },
  open:   { opacity: 1, y: 0, transition: { delay: 0.32, duration: 0.28 } },
};

// ── Chevron SVG ──────────────────────────────────────────────────
function Chevron({ open, size = 10 }: { open: boolean; size?: number }) {
  return (
    <svg
      width={size} height={size}
      viewBox="0 0 10 6"
      fill="none"
      aria-hidden="true"
      style={{ transition: 'transform 0.25s ease', transform: open ? 'rotate(180deg)' : 'rotate(0deg)' }}
    >
      <polyline points="1,1 5,5 9,1" stroke="currentColor" strokeWidth="1.5"
        strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// ── Component ───────────────────────────────────────────────────
export default function Header() {
  const [scrolled, setScrolled]         = useState(false);
  const [sectionTheme, setSectionTheme] = useState<Theme>('dark');
  const [menuOpen, setMenuOpen]         = useState(false);
  const [openDropdown, setOpenDropdown] = useState<number | null>(null);
  // Mobile accordion state
  const [mobileExpanded, setMobileExpanded]      = useState<Set<number>>(new Set());
  const [mobileGroupExpanded, setMobileGroupExpanded] = useState<Set<string>>(new Set());

  const observerRef  = useRef<IntersectionObserver | null>(null);
  const closeTimer   = useRef<ReturnType<typeof setTimeout> | null>(null);

  const headerTheme: Theme = sectionTheme === 'dark' ? 'light' : 'dark';
  const theme: Theme       = !scrolled ? 'dark' : headerTheme;

  // ── Scroll detection ──────────────────────────────────────────
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // ── Section theme detection ───────────────────────────────────
  useEffect(() => {
    observerRef.current?.disconnect();
    observerRef.current = new IntersectionObserver(
      (entries) => {
        const hit = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
        if (hit) {
          const t = hit.target.getAttribute('data-section-theme') as Theme | null;
          if (t) setSectionTheme(t);
        }
      },
      { rootMargin: '-64px 0px -88% 0px', threshold: 0 },
    );
    document.querySelectorAll('[data-section-theme]').forEach((el) => {
      observerRef.current!.observe(el);
    });
    return () => observerRef.current?.disconnect();
  }, []);

  // ── Body scroll lock ──────────────────────────────────────────
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const closeMenu = useCallback(() => {
    setMenuOpen(false);
    setMobileExpanded(new Set());
    setMobileGroupExpanded(new Set());
  }, []);

  // ── Hover helpers ─────────────────────────────────────────────
  function openDd(i: number) {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setOpenDropdown(i);
  }
  function closeDd() {
    closeTimer.current = setTimeout(() => setOpenDropdown(null), 120);
  }

  // ── Mobile accordion helpers ──────────────────────────────────
  function toggleMobile(i: number) {
    setMobileExpanded((prev) => {
      const next = new Set(prev);
      next.has(i) ? next.delete(i) : next.add(i);
      return next;
    });
  }
  function toggleMobileGroup(key: string) {
    setMobileGroupExpanded((prev) => {
      const next = new Set(prev);
      next.has(key) ? next.delete(key) : next.add(key);
      return next;
    });
  }

  // ── Animated header colours ───────────────────────────────────
  const bgColor = !scrolled ? 'rgba(0,0,0,0)'
    : sectionTheme === 'dark' ? '#FFFFFF' : '#0a0a0a';
  const borderColor = !scrolled ? 'rgba(0,0,0,0)'
    : sectionTheme === 'dark' ? 'rgba(0,0,0,0.08)' : 'rgba(255,255,255,0.1)';

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
              <Image
                src="/images/LOGO.png"
                alt="The One Clinic"
                width={140}
                height={40}
                className={styles.logoImg}
                priority
              />
            </Link>

            {/* Desktop nav */}
            <nav className={styles.desktopNav} aria-label="Main navigation">
              <ul className={styles.navList} role="list">
                {NAV.map((item, i) => {
                  const hasDropdown = !!(item.simple || item.groups);
                  const isOpen      = openDropdown === i;

                  return (
                    <li
                      key={item.label}
                      className={styles.navItem}
                      onMouseEnter={() => hasDropdown && openDd(i)}
                      onMouseLeave={() => hasDropdown && closeDd()}
                    >
                      <button
                        className={`${styles.navLink} ${hasDropdown ? styles.navLinkBtn : ''}`}
                        aria-expanded={hasDropdown ? isOpen : undefined}
                        onClick={() => {
                          if (!hasDropdown) {
                            if (item.href.startsWith('http')) {
                              window.open(item.href, '_blank', 'noopener,noreferrer');
                            } else {
                              window.location.href = item.href;
                            }
                          } else {
                            setOpenDropdown(isOpen ? null : i);
                          }
                        }}
                      >
                        <span className={styles.navLinkInner}>{item.label}</span>
                        {hasDropdown && <Chevron open={isOpen} />}
                      </button>

                      {/* ── Dropdown panel ─────────────────── */}
                      <AnimatePresence>
                        {hasDropdown && isOpen && (
                          <motion.div
                            className={`${styles.dropdown} ${item.groups ? styles.megaMenu : styles.simpleDropdown}`}
                            variants={dropdownVars}
                            initial="closed"
                            animate="open"
                            exit="closed"
                            transition={dropdownTrans}
                            onMouseEnter={() => openDd(i)}
                            onMouseLeave={() => closeDd()}
                          >
                            {/* Simple dropdown (About Our Clinic) */}
                            {item.simple && (
                              <ul className={styles.simpleList}>
                                {item.simple.map((link) => (
                                  <li key={link.href}>
                                    <Link href={link.href} className={styles.ddItem}
                                      onClick={() => setOpenDropdown(null)}>
                                      {link.label}
                                    </Link>
                                  </li>
                                ))}
                              </ul>
                            )}

                            {/* Mega menu (Treatments / Conditions) */}
                            {item.groups && (
                              <div
                                className={styles.megaGrid}
                                style={{ '--cols': item.groups.length } as React.CSSProperties}
                              >
                                {item.groups.map((grp) => (
                                  <div key={grp.group} className={styles.megaCol}>
                                    <p className={styles.megaGroupTitle}>{grp.group}</p>
                                    <ul className={styles.megaList}>
                                      {grp.items.map((link) => (
                                        <li key={link.href}>
                                          <Link href={link.href} className={styles.ddItem}
                                            onClick={() => setOpenDropdown(null)}>
                                            {link.label}
                                          </Link>
                                        </li>
                                      ))}
                                    </ul>
                                  </div>
                                ))}
                              </div>
                            )}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </li>
                  );
                })}
              </ul>
            </nav>

            {/* Desktop CTA */}
            <button
              className={styles.ctaLink}
              onClick={() => window.dispatchEvent(new CustomEvent('openCallbackModal'))}
              aria-label="Book a consultation"
            >
              Book a Consultation
            </button>

            {/* Hamburger */}
            <button
              className={styles.menuBtn}
              onClick={() => setMenuOpen((o) => !o)}
              aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
            >
              <motion.span className={styles.bar}
                animate={menuOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.25 }} />
              <motion.span className={styles.bar}
                animate={menuOpen ? { opacity: 0, scaleX: 0.2 } : { opacity: 1, scaleX: 1 }}
                transition={{ duration: 0.2 }} />
              <motion.span className={styles.bar}
                animate={menuOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.25 }} />
            </button>

          </div>
        </Container>
      </motion.header>

      {/* ── Mobile drawer ─────────────────────────────────────── */}
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
            <button className={styles.closeBtn} onClick={closeMenu} aria-label="Close navigation menu">
              <span aria-hidden="true">✕</span>
            </button>

            <nav aria-label="Mobile navigation" className={styles.mobileNav}>
              <ul className={styles.mobileNavList}>
                {NAV.map((item, i) => {
                  const hasDropdown = !!(item.simple || item.groups);
                  const isExpanded  = mobileExpanded.has(i);

                  return (
                    <li key={item.label} className={styles.mobileNavItem}>
                      {/* Top-level row */}
                      <div className={styles.mobileNavRow}>
                        {hasDropdown ? (
                          <button
                            className={styles.mobileNavLink}
                            onClick={() => toggleMobile(i)}
                            aria-expanded={isExpanded}
                          >
                            {item.label}
                            <Chevron open={isExpanded} size={12} />
                          </button>
                        ) : (
                          <Link
                            href={item.href}
                            className={styles.mobileNavLink}
                            onClick={closeMenu}
                            {...(item.href.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                          >
                            {item.label}
                          </Link>
                        )}
                      </div>

                      {/* Expandable sub-content */}
                      <AnimatePresence initial={false}>
                        {hasDropdown && isExpanded && (
                          <motion.div
                            className={styles.mobileSubContent}
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
                          >
                            {/* Simple flat list (About) */}
                            {item.simple && (
                              <ul className={styles.mobileSubList}>
                                {item.simple.map((link) => (
                                  <li key={link.href}>
                                    <Link href={link.href} className={styles.mobileSubLink} onClick={closeMenu}>
                                      {link.label}
                                    </Link>
                                  </li>
                                ))}
                              </ul>
                            )}

                            {/* Grouped (Treatments / Conditions) */}
                            {item.groups && (
                              <div className={styles.mobileGroups}>
                                {item.groups.map((grp) => {
                                  const gKey       = `${i}-${grp.group}`;
                                  const grpOpen    = mobileGroupExpanded.has(gKey);
                                  return (
                                    <div key={grp.group} className={styles.mobileGroup}>
                                      <button
                                        className={styles.mobileGroupTitle}
                                        onClick={() => toggleMobileGroup(gKey)}
                                        aria-expanded={grpOpen}
                                      >
                                        {grp.group}
                                        <Chevron open={grpOpen} size={10} />
                                      </button>
                                      <AnimatePresence initial={false}>
                                        {grpOpen && (
                                          <motion.ul
                                            className={styles.mobileSubList}
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: 'auto', opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
                                          >
                                            {grp.items.map((link) => (
                                              <li key={link.href}>
                                                <Link href={link.href} className={styles.mobileSubLink} onClick={closeMenu}>
                                                  {link.label}
                                                </Link>
                                              </li>
                                            ))}
                                          </motion.ul>
                                        )}
                                      </AnimatePresence>
                                    </div>
                                  );
                                })}
                              </div>
                            )}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </li>
                  );
                })}
              </ul>
            </nav>

            <motion.div className={styles.mobileCta} variants={ctaVariants} initial="closed" animate="open">
              <button
                className={styles.mobileCtaLink}
                onClick={() => { closeMenu(); window.dispatchEvent(new CustomEvent('openCallbackModal')); }}
              >
                Book a Consultation
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
