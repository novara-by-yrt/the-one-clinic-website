'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import styles from './Header.module.css';

// ── Types ────────────────────────────────────────────────────────
type Theme    = 'light' | 'dark';
type NavLink  = { label: string; href: string };
type NavGroup = { group: string; items: NavLink[] };
type NavItem  = {
  label: string;
  href:  string;
  simple?: NavLink[];
  groups?: NavGroup[];
};

// ── Nav data ─────────────────────────────────────────────────────
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
          { label: 'Health Screening',                                      href: '/treatments/health-screening' },
          { label: 'Private GP Leicester',                                  href: '/treatments/private-gp' },
          { label: 'Joint Injections',                                      href: '/treatments/joint-injections' },
          { label: 'Minor Surgery',                                         href: '/treatments/minor-surgery' },
          { label: 'Ingrown Toenail Removal',                               href: '/treatments/ingrown-toenail-removal-leicester' },
          { label: 'Haemorrhoid Removal',                                   href: '/treatments/haemorrhoid-removal' },
          { label: 'GP Home Visits Leicester',                              href: '/treatments/gp-home-visits' },
          { label: 'Travel Vaccine & Immunisations',                        href: '/treatments/travel-vaccine' },
          { label: 'Weight Management',                                     href: '/treatments/weight-management' },
          { label: 'Medical Insurance Examination',                         href: '/treatments/medical-insurance' },
          { label: 'Dermatologist Leicester',                               href: '/treatments/dermatologist' },
          { label: "Men's Health",                                          href: '/treatments/mens-health' },
          { label: "Women's Health Clinic",                                 href: '/treatments/womens-health' },
          { label: "Women's Health, Menopause / HRT / Contraception",      href: '/treatments/menopause-hrt' },
          { label: 'Mental Health Consultation',                            href: '/treatments/mental-health-consultation' },
        ],
      },
      {
        group: 'Medical Aesthetics',
        items: [
          { label: 'Dermal Fillers',                            href: '/treatments/dermal-fillers' },
          { label: 'Lumecca IPL',                               href: '/treatments/lumecca-ipl-leicester' },
          { label: 'HydraFacial Keravive',                     href: '/treatments/hydrafacial-keravive' },
          { label: 'Morpheus8',                                 href: '/treatments/morpheus8' },
          { label: 'Wrinkle Relaxing Injections',               href: '/treatments/wrinkle-relaxing-injections' },
          { label: 'Hydrafacial Leicester',                     href: '/treatments/hydrafacial' },
          { label: 'Vampire Facial',                            href: '/treatments/vampire-facial' },
          { label: 'Chemical Peels',                            href: '/treatments/chemical-peels' },
          { label: 'Skin Analysis, Life Viz 3D Camera',         href: '/treatments/skin-analysis' },
          { label: 'Body Contouring',                           href: '/treatments/body-contouring' },
          { label: 'Endolift Laser',                            href: '/treatments/endolift' },
          { label: 'Profhilo',                                  href: '/treatments/profhilo' },
          { label: 'NCTF 135 HA',                               href: '/treatments/nctf-135-ha' },
          { label: 'Skincare, Alumier MD',                      href: '/treatments/skincare-alumier-md' },
          { label: 'Skin Lesion Removal Leicester',             href: '/treatments/skin-lesion' },
          { label: 'BCC Removal Leicester',                     href: '/treatments/basal-cell-carcinoma-bcc-removal-leicester' },
          { label: 'Skin Tag Removal Leicester',                href: '/treatments/skin-tags-removal-leicester' },
          { label: 'Wart Removal Leicester',                    href: '/treatments/wart-removal-leicester' },
          { label: 'Acne Scar Removal Leicester',               href: '/treatments/acne-scar-removal-leicester' },
          { label: 'Regenerative Medicine, Exosome Therapy',   href: '/treatments/regenerative-medicine-exosome-therapy' },
          { label: 'Regenerative Medicine, Polynucleotides',   href: '/treatments/polynucleotides-leicester' },
          { label: 'Cool Bleph',                                href: '/treatments/cool-bleph' },
          { label: 'COOL Glow Peel (Full Face)',                href: '/treatments/cool-glow-full-face' },
          { label: 'Cool Scar Lift',                            href: '/treatments/cool-scar-lift' },
          { label: 'Mole Removal',                              href: '/treatments/mole-removal-leicester' },
          { label: 'Laser Mole Removal',                        href: '/treatments/laser-mole-removal' },
          { label: 'Laser Snoring Treatment',                   href: '/treatments/laser-snoring-treatment' },
          { label: 'Laser Vaginal Rejuvenation',                href: '/treatments/laser-vaginal' },
          { label: 'IV Drip Therapy',                           href: '/treatments/iv-drip-therapy' },
          { label: 'Deep Laser Resurfacing',                    href: '/treatments/laser-resurfacing' },
          { label: 'The Body Confidence Package',               href: '/treatments/the-body-confidence-package' },
          { label: 'Lipoma Removal Leicester',                  href: '/treatments/lipoma-removal' },
          { label: 'Liposuction Leicester',                     href: '/treatments/liposuction-leicester' },
          { label: 'Non Surgical Blepharoplasty',               href: '/treatments/non-surgical-blepharoplasty-leicester' },
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
          { label: 'Eye Bags',                   href: '/conditions/eye-bags' },
          { label: 'Jowls / Sagging Skin',       href: '/conditions/jowls' },
          { label: 'Nasolabial Folds',           href: '/conditions/nasolabial-folds' },
          { label: 'Turkey Neck / Necklines',    href: '/conditions/turkey-neck' },
          { label: 'Facial Redness / Rosacea',   href: '/conditions/rosacea' },
          { label: 'Thin Lips',                  href: '/conditions/thin-lips' },
          { label: 'Weak Chin / Weak Jawline',   href: '/conditions/weak-chin' },
        ],
      },
      {
        group: 'Skin',
        items: [
          { label: 'Pigmentation',                                href: '/conditions/pigmentation' },
          { label: 'Spider Veins / Thread Veins',                 href: '/conditions/spider-veins-thread-veins' },
          { label: 'Hyperpigmentation / Sun Damage / Freckles',   href: '/conditions/hyperpigmentation-sun-damage-freckles' },
        ],
      },
      {
        group: 'Body',
        items: [
          { label: 'Cellulite',                                                   href: '/conditions/cellulite' },
          { label: 'Abdominal Fat / Belly Fat',                                   href: '/conditions/abdominal-fat-belly-fat' },
          { label: 'Stretch Marks',                                               href: '/conditions/stretch-marks' },
          { label: 'Excessive Sweating',                                          href: '/conditions/excessive-sweating' },
          { label: 'Excess Body Fat / Arm / Bra / Back / Thigh Fat',             href: '/conditions/excess-body-fat-arm-fat-bra-fat-back-fat-thigh-fat' },
        ],
      },
    ],
  },
  { label: 'Membership',         href: 'https://theoneclinic.eu.zenoti.com/webstoreNew/sales/membership/4fbea838-3725-4392-a22a-3b301fbd0229' },
  { label: 'Patient Experience', href: '/patient-experience' },
  { label: 'Contact Us',         href: '/contact' },
];

// ── Motion variants ──────────────────────────────────────────────
const menuVariants   = { closed: { opacity: 0, x: '100%' }, open: { opacity: 1, x: 0 } };
const menuTransition = { duration: 0.38, ease: [0.32, 0.72, 0, 1] as const };

const simpleDropVars = {
  closed: { opacity: 0, y: -8,  scale: 0.97, pointerEvents: 'none' as const },
  open:   { opacity: 1, y: 0,   scale: 1,    pointerEvents: 'auto' as const },
};
const simpleDropTrans = { duration: 0.2, ease: [0.25, 0.1, 0.25, 1] as const };

const megaVars = {
  closed: { opacity: 0, y: -8, scale: 0.97, pointerEvents: 'none' as const },
  open:   { opacity: 1, y: 0,  scale: 1,    pointerEvents: 'auto' as const },
};
const megaTrans = { duration: 0.28, ease: [0.22, 1, 0.36, 1] as const };

const backdropVars = {
  closed: { opacity: 0 },
  open:   { opacity: 1 },
};

/* Staggered list animation for mega menu items */
const megaListVars = {
  hidden: {},
  show: { transition: { staggerChildren: 0.018, delayChildren: 0.03 } },
};
const megaItemVars = {
  hidden: { opacity: 0, y: 5 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.18, ease: [0.22, 1, 0.36, 1] as const } },
};

const EASE = [0.22, 1, 0.36, 1] as const;
const PILL_TRANSITION = { duration: 0.55, ease: EASE };

// ── Pill animation values ─────────────────────────────────────────
function getPillAnimate(scrolled: boolean, sectionTheme: Theme) {
  if (!scrolled) {
    return {
      width: '100%',
      borderRadius: 0,
      marginTop: 0,
      background: 'rgba(0,0,0,0)',
      boxShadow: '0px 0px 0px 0px rgba(0,0,0,0), 0px 0px 0px 0px rgba(0,0,0,0), inset 0px 0px 0px 0px rgba(0,0,0,0)',
    };
  }
  const isLight = sectionTheme === 'dark';
  return {
    width: '92%',
    borderRadius: 60,
    marginTop: 14,
    background: isLight ? 'rgba(255,255,255,0.86)' : 'rgba(8,8,10,0.84)',
    boxShadow: isLight
      ? '0px 12px 56px rgba(0,0,0,0.1), 0px 3px 10px rgba(0,0,0,0.07), inset 0px 0px 0px 1px rgba(0,0,0,0.055)'
      : '0px 12px 56px rgba(0,0,0,0.42), 0px 3px 10px rgba(0,0,0,0.26), inset 0px 0px 0px 1px rgba(255,255,255,0.07)',
  };
}

// ── Chevron ──────────────────────────────────────────────────────
function Chevron({ open, size = 10 }: { open: boolean; size?: number }) {
  return (
    <svg
      width={size} height={size}
      viewBox="0 0 10 6"
      fill="none"
      aria-hidden="true"
      style={{
        transition: 'transform 0.25s ease',
        transform: open ? 'rotate(180deg)' : 'rotate(0deg)',
        flexShrink: 0,
      }}
    >
      <polyline
        points="1,1 5,5 9,1"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// ── Component ────────────────────────────────────────────────────
export default function Header() {
  const [scrolled, setScrolled]         = useState(false);
  const [sectionTheme, setSectionTheme] = useState<Theme>('dark');
  const [menuOpen, setMenuOpen]         = useState(false);
  const [openDropdown, setOpenDropdown] = useState<number | null>(null);
  const [openMegaGroup, setOpenMegaGroup] = useState<string | null>(null);
  const [mobileExpanded, setMobileExpanded]           = useState<Set<number>>(new Set());
  const [mobileGroupExpanded, setMobileGroupExpanded] = useState<Set<string>>(new Set());

  const observerRef = useRef<IntersectionObserver | null>(null);
  const closeTimer  = useRef<ReturnType<typeof setTimeout> | null>(null);
  const pillRef     = useRef<HTMLDivElement>(null);

  const headerTheme: Theme = sectionTheme === 'dark' ? 'light' : 'dark';
  const theme: Theme       = !scrolled ? 'dark' : headerTheme;

  // ── Scroll detection ─────────────────────────────────────────
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

  // ── Body scroll lock (mobile menu) ───────────────────────────
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  // ── Click outside to close desktop dropdown ──────────────────
  useEffect(() => {
    if (openDropdown === null) return;
    function handleClickOut(e: MouseEvent) {
      if (pillRef.current && !pillRef.current.contains(e.target as Node)) {
        setOpenDropdown(null);
        setOpenMegaGroup(null);
      }
    }
    document.addEventListener('mousedown', handleClickOut);
    return () => document.removeEventListener('mousedown', handleClickOut);
  }, [openDropdown]);

  const closeMenu = useCallback(() => {
    setMenuOpen(false);
    setMobileExpanded(new Set());
    setMobileGroupExpanded(new Set());
  }, []);

  // ── Hover helpers ─────────────────────────────────────────────
  function openDd(i: number) {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    if (openDropdown !== i) {
      const item = NAV[i];
      if (item.groups?.length) {
        setOpenMegaGroup(`${i}-0`);
      } else {
        setOpenMegaGroup(null);
      }
    }
    setOpenDropdown(i);
  }
  function closeDd() {
    closeTimer.current = setTimeout(() => {
      setOpenDropdown(null);
      setOpenMegaGroup(null);
    }, 150);
  }

  // ── Mobile accordion ─────────────────────────────────────────
  function toggleMobile(i: number) {
    setMobileExpanded((prev: Set<number>) => {
      const next = new Set(prev);
      next.has(i) ? next.delete(i) : next.add(i);
      return next;
    });
  }
  function toggleMobileGroup(key: string) {
    setMobileGroupExpanded((prev: Set<string>) => {
      const next = new Set(prev);
      next.has(key) ? next.delete(key) : next.add(key);
      return next;
    });
  }

  const pillAnimate = getPillAnimate(scrolled, sectionTheme);
  const anyMegaOpen = openDropdown !== null && !!NAV[openDropdown]?.groups;

  return (
    <>
      {/* ── Header outer shell ────────────────────────────────– */}
      <header className={styles.headerOuter} role="banner">
        {/* Morphing pill ────────────────────────────────────── */}
        <motion.div
          ref={pillRef}
          className={styles.pill}
          data-theme={theme}
          data-scrolled={scrolled}
          animate={pillAnimate}
          transition={PILL_TRANSITION}
        >
          <div className={styles.inner}>

            {/* Logo */}
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
                        className={`${styles.navLink} ${isOpen ? styles.navLinkActive : ''}`}
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
                        <span className={styles.navLinkText}>{item.label}</span>
                        {hasDropdown && <Chevron open={isOpen} />}
                      </button>

                      {/* Simple dropdown (About Our Clinic) */}
                      {item.simple && (
                        <AnimatePresence>
                          {isOpen && (
                            <motion.div
                              className={styles.simpleDropdown}
                              variants={simpleDropVars}
                              initial="closed"
                              animate="open"
                              exit="closed"
                              transition={simpleDropTrans}
                              onMouseEnter={() => openDd(i)}
                              onMouseLeave={() => closeDd()}
                            >
                              <ul className={styles.simpleList} role="list">
                                {item.simple.map((link) => (
                                  <li key={link.href}>
                                    <Link
                                      href={link.href}
                                      className={styles.ddItem}
                                      onClick={() => setOpenDropdown(null)}
                                    >
                                      {link.label}
                                    </Link>
                                  </li>
                                ))}
                              </ul>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      )}

                      {/* Mega dropdown — premium 3-panel glass experience */}
                      {item.groups && (
                        <AnimatePresence>
                          {isOpen && (
                            <motion.div
                              className={styles.megaPanel}
                              variants={megaVars}
                              initial="closed"
                              animate="open"
                              exit="closed"
                              transition={megaTrans}
                              onMouseEnter={() => openDd(i)}
                              onMouseLeave={() => closeDd()}
                              role="region"
                              aria-label={`${item.label} menu`}
                            >
                              {/* Top strip */}
                              <div className={styles.megaTop}>
                                <span className={styles.megaCategoryLabel}>{item.label}</span>
                                <Link
                                  href={item.href}
                                  className={styles.megaViewAll}
                                  onClick={() => setOpenDropdown(null)}
                                >
                                  View all
                                  <svg width="12" height="12" viewBox="0 0 13 13" fill="none" aria-hidden="true">
                                    <path d="M2.5 6.5h8M7.5 3l3.5 3.5L7.5 10" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                                  </svg>
                                </Link>
                              </div>

                              {/* Three-panel body */}
                              <div className={styles.megaBody}>

                                {/* LEFT — Editorial category navigation */}
                                <div className={styles.megaSidebar}>
                                  {item.groups.map((grp, gi) => {
                                    const gKey     = `${i}-${gi}`;
                                    const isActive = openMegaGroup === gKey;
                                    return (
                                      <button
                                        key={grp.group}
                                        className={`${styles.megaCategoryBtn} ${isActive ? styles.megaCategoryBtnActive : ''}`}
                                        onMouseEnter={() => setOpenMegaGroup(gKey)}
                                        onClick={() => setOpenMegaGroup(gKey)}
                                        aria-selected={isActive}
                                      >
                                        <span>{grp.group}</span>
                                        <svg width="8" height="8" viewBox="0 0 8 8" fill="none" aria-hidden="true" className={styles.megaCatChevron}>
                                          <path d="M2 1.5l3 2.5-3 2.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                        </svg>
                                      </button>
                                    );
                                  })}
                                </div>

                                {/* CENTER — Treatment links with stagger reveal */}
                                <div className={styles.megaContent}>
                                  <AnimatePresence mode="wait" initial={false}>
                                    {item.groups.map((grp, gi) => {
                                      const gKey = `${i}-${gi}`;
                                      if (openMegaGroup !== gKey) return null;
                                      return (
                                        <motion.ul
                                          key={gKey}
                                          className={styles.megaList}
                                          role="list"
                                          variants={megaListVars}
                                          initial="hidden"
                                          animate="show"
                                          exit={{ opacity: 0, transition: { duration: 0.08 } }}
                                        >
                                          {grp.items.map((link) => (
                                            <motion.li key={link.href} variants={megaItemVars}>
                                              <Link
                                                href={link.href}
                                                className={styles.ddItem}
                                                onClick={() => setOpenDropdown(null)}
                                              >
                                                {link.label}
                                              </Link>
                                            </motion.li>
                                          ))}
                                        </motion.ul>
                                      );
                                    })}
                                  </AnimatePresence>
                                </div>

                                {/* RIGHT — Featured preview panel */}
                                <div className={styles.megaFeatured}>
                                  <Image
                                    src="/images/imgi_78_GTR_0328-1-1.jpg"
                                    alt=""
                                    fill
                                    className={styles.megaFeaturedImg}
                                    sizes="210px"
                                  />
                                  <div className={styles.megaFeaturedOverlay} aria-hidden="true" />
                                  <div className={styles.megaFeaturedContent}>
                                    <span className={styles.megaFeaturedChip}>Doctor-Led Care</span>
                                    <p className={styles.megaFeaturedTitle}>Advanced Medical &amp; Aesthetic Care</p>
                                    <button
                                      className={styles.megaFeaturedCta}
                                      onClick={() => { setOpenDropdown(null); window.dispatchEvent(new CustomEvent('openCallbackModal')); }}
                                    >
                                      Book a Consultation
                                    </button>
                                  </div>
                                </div>

                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      )}
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
              onClick={() => setMenuOpen((o: boolean) => !o)}
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
        </motion.div>
      </header>

      {/* ── Mega menu backdrop (desktop only) ────────────────── */}
      <AnimatePresence>
        {anyMegaOpen && (
          <motion.div
            className={styles.megaBackdrop}
            variants={backdropVars}
            initial="closed"
            animate="open"
            exit="closed"
            transition={{ duration: 0.22 }}
            onClick={() => { setOpenDropdown(null); setOpenMegaGroup(null); }}
            aria-hidden="true"
          />
        )}
      </AnimatePresence>

      {/* ── Mobile drawer ─────────────────────────────────────── */}
      <AnimatePresence>
        {menuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              className={styles.mobileBackdrop}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={closeMenu}
              aria-hidden="true"
            />

            {/* Drawer */}
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
              {/* Drawer header */}
              <div className={styles.mobileMenuHeader}>
                <Link href="/" className={styles.mobileLogo} onClick={closeMenu} aria-label="The One Clinic, home">
                  <Image
                    src="/images/LOGO.png"
                    alt="The One Clinic"
                    width={110}
                    height={32}
                    style={{ filter: 'brightness(0) invert(1)' }}
                    priority={false}
                  />
                </Link>
                <button className={styles.closeBtn} onClick={closeMenu} aria-label="Close navigation menu">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                    <path d="M2 2l12 12M14 2L2 14" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round"/>
                  </svg>
                </button>
              </div>

              {/* Nav */}
              <nav aria-label="Mobile navigation" className={styles.mobileNav}>
                <ul className={styles.mobileNavList} role="list">
                  {NAV.map((item, i) => {
                    const hasDropdown = !!(item.simple || item.groups);
                    const isExpanded  = mobileExpanded.has(i);

                    return (
                      <li key={item.label} className={styles.mobileNavItem}>
                        <div className={styles.mobileNavRow}>
                          {hasDropdown ? (
                            <button
                              className={`${styles.mobileNavLink} ${isExpanded ? styles.mobileNavLinkOpen : ''}`}
                              onClick={() => toggleMobile(i)}
                              aria-expanded={isExpanded}
                            >
                              <span>{item.label}</span>
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

                        <AnimatePresence initial={false}>
                          {hasDropdown && isExpanded && (
                            <motion.div
                              className={styles.mobileSubContent}
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
                            >
                              {/* Simple flat list */}
                              {item.simple && (
                                <ul className={styles.mobileSubList} role="list">
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
                                    const gKey    = `${i}-${grp.group}`;
                                    const grpOpen = mobileGroupExpanded.has(gKey);
                                    return (
                                      <div key={grp.group} className={styles.mobileGroup}>
                                        <button
                                          className={`${styles.mobileGroupBtn} ${grpOpen ? styles.mobileGroupBtnOpen : ''}`}
                                          onClick={() => toggleMobileGroup(gKey)}
                                          aria-expanded={grpOpen}
                                        >
                                          <span>{grp.group}</span>
                                          <Chevron open={grpOpen} size={10} />
                                        </button>
                                        <AnimatePresence initial={false}>
                                          {grpOpen && (
                                            <motion.ul
                                              className={styles.mobileSubList}
                                              role="list"
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

              {/* CTA */}
              <div className={styles.mobileCta}>
                <button
                  className={styles.mobileCtaLink}
                  onClick={() => { closeMenu(); window.dispatchEvent(new CustomEvent('openCallbackModal')); }}
                >
                  Book a Consultation
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
