'use client';

import { useRef, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import Section from '@/components/ui/Section';
import Container from '@/components/ui/Container';
import { fadeUp, stagger, VIEWPORT } from '@/lib/motion';
import styles from './Services.module.css';

type Treatment = {
  title: string;
  category: string;
  desc: string;
  href: string;
  image?: string;
  bg: string;
};

const HEALTH_WELLBEING: Treatment[] = [
  {
    title: 'Health Screening',
    category: 'Health & Wellbeing',
    desc: 'Comprehensive health checks to detect risks early and keep you at your best.',
    href: '/treatments/health-screening',
    bg: 'linear-gradient(160deg,#0a1520 0%,#122236 100%)',
  },
  {
    title: 'Private GP',
    category: 'Health & Wellbeing',
    desc: 'Same-day and next-day private GP appointments for expert diagnosis and care.',
    href: '/treatments/private-gp',
    bg: 'linear-gradient(160deg,#0d1714 0%,#162a24 100%)',
  },
  {
    title: 'Joint Injections',
    category: 'Health & Wellbeing',
    desc: 'Targeted injections to relieve joint pain and restore mobility quickly.',
    href: '/treatments/joint-injections',
    bg: 'linear-gradient(160deg,#100d17 0%,#1e1633 100%)',
  },
  {
    title: 'Minor Surgery',
    category: 'Health & Wellbeing',
    desc: 'Skilled minor surgical procedures performed safely in our clinical setting.',
    href: '/treatments/minor-surgery',
    bg: 'linear-gradient(160deg,#17100d 0%,#2e1c16 100%)',
  },
  {
    title: 'GP Home Visits',
    category: 'Health & Wellbeing',
    desc: 'Expert GP care delivered to you at home in Leicester and surrounding areas.',
    href: '/treatments/gp-home-visits',
    bg: 'linear-gradient(160deg,#0d1317 0%,#132030 100%)',
  },
  {
    title: 'Travel Vaccines',
    category: 'Health & Wellbeing',
    desc: 'Full travel health consultations, vaccines and immunisations for safe trips.',
    href: '/treatments/travel-vaccine',
    bg: 'linear-gradient(160deg,#0d1117 0%,#131c2a 100%)',
  },
  {
    title: 'Weight Management',
    category: 'Health & Wellbeing',
    desc: 'Medically supervised weight loss programmes tailored to your goals.',
    href: '/treatments/weight-management',
    bg: 'linear-gradient(160deg,#110d17 0%,#1f1533 100%)',
  },
  {
    title: 'Medical Insurance Exam',
    category: 'Health & Wellbeing',
    desc: 'Professional medicals and reports for insurance and employment purposes.',
    href: '/treatments/medical-insurance',
    bg: 'linear-gradient(160deg,#0d1714 0%,#1a2a1c 100%)',
  },
  {
    title: 'Dermatologist',
    category: 'Health & Wellbeing',
    desc: 'Expert dermatology consultations for skin conditions and concerns.',
    href: '/treatments/dermatologist',
    bg: 'linear-gradient(160deg,#171210 0%,#2a1f18 100%)',
  },
  {
    title: "Men's Health",
    category: 'Health & Wellbeing',
    desc: 'Confidential, specialist care addressing the full range of male health needs.',
    href: '/treatments/mens-health',
    bg: 'linear-gradient(160deg,#0d1117 0%,#1a1f2a 100%)',
  },
  {
    title: "Women's Health",
    category: 'Health & Wellbeing',
    desc: 'Dedicated care from experienced clinicians for women at every life stage.',
    href: '/treatments/womens-health',
    bg: 'linear-gradient(160deg,#170d12 0%,#2a1520 100%)',
  },
  {
    title: 'Menopause & HRT',
    category: 'Health & Wellbeing',
    desc: 'Personalised menopause management, HRT and contraception consultations.',
    href: '/treatments/menopause-hrt',
    bg: 'linear-gradient(160deg,#0d1717 0%,#162828 100%)',
  },
];

const MEDICAL_AESTHETICS: Treatment[] = [
  {
    title: 'Dermal Fillers',
    category: 'Medical Aesthetics',
    desc: 'Restore lost volume and define facial contours with precision-placed hyaluronic acid fillers.',
    href: '/treatments/dermal-fillers',
    image: '/images/service-dermal-fillers.jpg',
    bg: 'linear-gradient(160deg,#0d1714 0%,#162a24 100%)',
  },
  {
    title: 'Lumecca IPL',
    category: 'Medical Aesthetics',
    desc: 'Intense pulsed light therapy to treat sun damage, redness and uneven skin tone.',
    href: '/treatments/lumecca-ipl',
    bg: 'linear-gradient(160deg,#17100d 0%,#2e1c16 100%)',
  },
  {
    title: 'HydraFacial Keravive',
    category: 'Medical Aesthetics',
    desc: 'A scalp treatment that cleanses, exfoliates and nourishes for thicker-looking hair.',
    href: '/treatments/hydrafacial-keravive',
    bg: 'linear-gradient(160deg,#0d1317 0%,#132030 100%)',
  },
  {
    title: 'Morpheus8',
    category: 'Medical Aesthetics',
    desc: 'Combine microneedling with radiofrequency energy to tighten skin and remodel deep collagen.',
    href: '/treatments/morpheus8',
    image: '/images/service-morpheus8.jpg',
    bg: 'linear-gradient(160deg,#17100d 0%,#2e1c16 100%)',
  },
  {
    title: 'Anti-Wrinkle',
    category: 'Medical Aesthetics',
    desc: 'Smooth fine lines and restore a naturally refreshed look with expertly placed injections.',
    href: '/treatments/anti-wrinkle',
    image: '/images/service-anti-wrinkle.jpg',
    bg: 'linear-gradient(160deg,#0d1117 0%,#1c2333 100%)',
  },
  {
    title: 'Hydrafacial',
    category: 'Medical Aesthetics',
    desc: 'A multi-step treatment that cleanses, extracts and hydrates for instantly radiant skin.',
    href: '/treatments/hydrafacial',
    image: '/images/service-hydrafacial.jpg',
    bg: 'linear-gradient(160deg,#0d1317 0%,#132030 100%)',
  },
  {
    title: 'Vampire Facial',
    category: 'Medical Aesthetics',
    desc: 'PRP therapy that uses your own growth factors to rejuvenate and refresh your skin.',
    href: '/treatments/vampire-facial',
    bg: 'linear-gradient(160deg,#170d10 0%,#2a1520 100%)',
  },
  {
    title: 'Chemical Peels',
    category: 'Medical Aesthetics',
    desc: 'Controlled exfoliation to resurface skin, reduce pigmentation and refine texture.',
    href: '/treatments/chemical-peels',
    bg: 'linear-gradient(160deg,#0d1117 0%,#1a2030 100%)',
  },
  {
    title: 'Body Contouring',
    category: 'Medical Aesthetics',
    desc: 'Non-surgical fat reduction and body shaping treatments for lasting, visible results.',
    href: '/treatments/body-contouring',
    image: '/images/service-fat-freezing.jpg',
    bg: 'linear-gradient(160deg,#0d1117 0%,#131c2a 100%)',
  },
  {
    title: 'Endolift Laser',
    category: 'Medical Aesthetics',
    desc: 'Minimally invasive laser lifting for face, neck and body — no surgery required.',
    href: '/treatments/endolift',
    bg: 'linear-gradient(160deg,#100d17 0%,#1e1633 100%)',
  },
  {
    title: 'IV Drip Therapy',
    category: 'Medical Aesthetics',
    desc: 'Bespoke nutrient infusions delivered directly into the bloodstream for rapid results.',
    href: '/treatments/iv-drip',
    bg: 'linear-gradient(160deg,#0d1317 0%,#0d2030 100%)',
  },
  {
    title: 'Deep Laser Resurfacing',
    category: 'Medical Aesthetics',
    desc: 'Advanced laser to dramatically improve skin texture, scars and pigmentation.',
    href: '/treatments/laser-resurfacing',
    image: '/images/service-laser-hair-removal.jpg',
    bg: 'linear-gradient(160deg,#171510 0%,#2a2316 100%)',
  },
  {
    title: 'Mole Removal',
    category: 'Medical Aesthetics',
    desc: 'Safe and precise mole removal by experienced clinicians for peace of mind.',
    href: '/treatments/mole-removal',
    bg: 'linear-gradient(160deg,#0d1117 0%,#1c2333 100%)',
  },
  {
    title: 'Laser Mole Removal',
    category: 'Medical Aesthetics',
    desc: 'Non-surgical laser treatment for quick and effective mole and lesion removal.',
    href: '/treatments/laser-mole-removal',
    bg: 'linear-gradient(160deg,#0d1714 0%,#162a24 100%)',
  },
];

// px per frame — slow, elegant pace (~21 px/s at 60fps)
const SPEED = 0.35;

// ── Reusable carousel row ────────────────────────────────────────
function CarouselRow({
  items,
  direction,
  label,
}: {
  items: Treatment[];
  direction: 'rtl' | 'ltr';
  label: string;
}) {
  const trackRef      = useRef<HTMLDivElement>(null);
  const posRef        = useRef(0);
  const rafRef        = useRef<number>(0);
  const draggingRef   = useRef(false);
  const hoveredRef    = useRef(false);
  const touchStartX   = useRef(0);
  const touchStartPos = useRef(0);

  useEffect(() => {
    function tick() {
      const track = trackRef.current;
      if (track && !draggingRef.current && !hoveredRef.current) {
        const halfWidth = track.scrollWidth / 2;
        if (direction === 'rtl') {
          posRef.current -= SPEED;
          if (posRef.current <= -halfWidth) posRef.current += halfWidth;
        } else {
          posRef.current += SPEED;
          if (posRef.current >= 0) posRef.current -= halfWidth;
        }
        track.style.transform = `translateX(${posRef.current}px)`;
      }
      rafRef.current = requestAnimationFrame(tick);
    }
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [direction]);

  function onTouchStart(e: React.TouchEvent) {
    draggingRef.current   = true;
    touchStartX.current   = e.touches[0].clientX;
    touchStartPos.current = posRef.current;
  }

  function onTouchMove(e: React.TouchEvent) {
    if (!draggingRef.current || !trackRef.current) return;
    const delta     = e.touches[0].clientX - touchStartX.current;
    const halfWidth = trackRef.current.scrollWidth / 2;
    let next        = touchStartPos.current + delta;
    while (next <= -halfWidth) next += halfWidth;
    while (next > 0)           next -= halfWidth;
    posRef.current = next;
    trackRef.current.style.transform = `translateX(${next}px)`;
  }

  function onTouchEnd() {
    draggingRef.current = false;
  }

  return (
    <div className={styles.rowWrap}>
      <p className={styles.rowLabel}>{label}</p>
      <div
        className={styles.carouselOuter}
        onMouseEnter={() => { hoveredRef.current = true; }}
        onMouseLeave={() => { hoveredRef.current = false; }}
      >
        <div className={styles.fadeLeft}  aria-hidden="true" />
        <div className={styles.fadeRight} aria-hidden="true" />
        <div
          ref={trackRef}
          className={styles.track}
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
          aria-label={`${label} treatments carousel`}
        >
          {[...items, ...items].map((t, i) => (
            <div
              key={i}
              className={styles.card}
              aria-hidden={i >= items.length ? true : undefined}
            >
              <div className={styles.cardBg} style={{ background: t.bg }} aria-hidden="true" />
              {t.image && (
                <div className={styles.cardImg} aria-hidden="true">
                  <Image
                    src={t.image}
                    alt={t.title}
                    fill
                    className={styles.img}
                    sizes="360px"
                    draggable={false}
                  />
                </div>
              )}
              <div className={styles.overlay} aria-hidden="true" />
              <Link
                href={t.href}
                className={styles.cardContent}
                tabIndex={i >= items.length ? -1 : 0}
              >
                <p className={styles.cardCategory}>{t.category}</p>
                <h3 className={styles.cardTitle}>{t.title}</h3>
                <p className={styles.cardDesc}>{t.desc}</p>
                <div className={styles.exploreRow}>
                  <span className={styles.exploreLine} aria-hidden="true" />
                  <span className={styles.exploreLabel}>Explore</span>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── Main section ─────────────────────────────────────────────────
export default function Services() {
  return (
    <Section id="treatments" variant="light" data-section-theme="light" className={styles.section}>
      <Container>
        <motion.div
          className={styles.header}
          variants={stagger(0.12)}
          initial="hidden"
          whileInView="show"
          viewport={VIEWPORT}
        >
          <motion.p className={styles.eyebrow} variants={fadeUp}>Our</motion.p>
          <motion.h2 className={styles.heading} variants={fadeUp}>Popular Treatments</motion.h2>
        </motion.div>
      </Container>

      {/* Row 1: Health & Wellbeing — right to left */}
      <CarouselRow items={HEALTH_WELLBEING} direction="rtl" label="Health & Wellbeing" />

      {/* Row 2: Medical Aesthetics — left to right */}
      <CarouselRow items={MEDICAL_AESTHETICS} direction="ltr" label="Medical Aesthetics" />

      {/* Explore all CTA */}
      <Container>
        <motion.div
          className={styles.exploreCta}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <Link href="/treatments" className={styles.exploreAllBtn}>
            Explore All Treatments
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.6"
                strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </Link>
        </motion.div>
      </Container>
    </Section>
  );
}
