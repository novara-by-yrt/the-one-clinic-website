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

const TREATMENTS: Treatment[] = [
  // ── Health & Wellbeing ──────────────────────────────────────────
  {
    title: 'Health Screening',
    category: 'Health & Wellbeing',
    desc: 'Comprehensive health checks to detect risks early and keep you at your best.',
    href: '/treatments/health-screening',
    image: '/images/Health Screening.jpg',
    bg: 'linear-gradient(160deg,#0a1520 0%,#122236 100%)',
  },
  {
    title: 'Private GP',
    category: 'Health & Wellbeing',
    desc: 'Same-day and next-day private GP appointments for expert diagnosis and care.',
    href: '/treatments/private-gp',
    image: '/images/Private GP.jpg',
    bg: 'linear-gradient(160deg,#0d1714 0%,#162a24 100%)',
  },
  {
    title: 'Joint Injections',
    category: 'Health & Wellbeing',
    desc: 'Targeted injections to relieve joint pain and restore mobility quickly.',
    href: '/treatments/joint-injections',
    image: '/images/Joint Injections.jpg',
    bg: 'linear-gradient(160deg,#100d17 0%,#1e1633 100%)',
  },
  {
    title: 'Minor Surgery',
    category: 'Health & Wellbeing',
    desc: 'Skilled minor surgical procedures performed safely in our clinical setting.',
    href: '/treatments/minor-surgery',
    image: '/images/Minor Surgery.jpg',
    bg: 'linear-gradient(160deg,#17100d 0%,#2e1c16 100%)',
  },
  {
    title: 'GP Home Visits',
    category: 'Health & Wellbeing',
    desc: 'Expert GP care delivered to you at home in Leicester and surrounding areas.',
    href: '/treatments/gp-home-visits',
    image: '/images/GP Home Visits.jpg',
    bg: 'linear-gradient(160deg,#0d1317 0%,#132030 100%)',
  },
  {
    title: 'Travel Vaccines',
    category: 'Health & Wellbeing',
    desc: 'Full travel health consultations, vaccines and immunisations for safe trips.',
    href: '/treatments/travel-vaccine',
    image: '/images/Travel Vaccines.jpg',
    bg: 'linear-gradient(160deg,#0d1117 0%,#131c2a 100%)',
  },
  {
    title: 'Weight Management',
    category: 'Health & Wellbeing',
    desc: 'Medically supervised weight loss programmes tailored to your goals.',
    href: '/treatments/weight-management',
    image: '/images/Weight Management.jpg',
    bg: 'linear-gradient(160deg,#110d17 0%,#1f1533 100%)',
  },
  {
    title: 'Medical Insurance Exam',
    category: 'Health & Wellbeing',
    desc: 'Professional medicals and reports for insurance and employment purposes.',
    href: '/treatments/medical-insurance',
    image: '/images/Medical Insurance Exam.jpg',
    bg: 'linear-gradient(160deg,#0d1714 0%,#1a2a1c 100%)',
  },
  {
    title: 'Dermatologist',
    category: 'Health & Wellbeing',
    desc: 'Expert dermatology consultations for skin conditions and concerns.',
    href: '/treatments/dermatologist',
    image: '/images/Dermatologist.jpg',
    bg: 'linear-gradient(160deg,#171210 0%,#2a1f18 100%)',
  },
  {
    title: "Men's Health",
    category: 'Health & Wellbeing',
    desc: 'Confidential, specialist care addressing the full range of male health needs.',
    href: '/treatments/mens-health',
    image: "/images/Men's Health.jpg",
    bg: 'linear-gradient(160deg,#0d1117 0%,#1a1f2a 100%)',
  },
  {
    title: "Women's Health",
    category: 'Health & Wellbeing',
    desc: 'Dedicated care from experienced clinicians for women at every life stage.',
    href: '/treatments/womens-health',
    image: "/images/Women's Health.jpg",
    bg: 'linear-gradient(160deg,#170d12 0%,#2a1520 100%)',
  },
  {
    title: 'Menopause & HRT',
    category: 'Health & Wellbeing',
    desc: 'Personalised menopause management, HRT and contraception consultations.',
    href: '/treatments/menopause-hrt',
    image: '/images/Menopause & HRT.jpg',
    bg: 'linear-gradient(160deg,#0d1717 0%,#162828 100%)',
  },
  // ── Medical Aesthetics ──────────────────────────────────────────
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
    title: 'Wrinkle Relaxing Injections',
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
    title: 'Skin Analysis',
    category: 'Medical Aesthetics',
    desc: 'Advanced 3D skin imaging with Life Viz Camera for a precise, personalised treatment plan.',
    href: '/treatments/skin-analysis',
    bg: 'linear-gradient(160deg,#0d1520 0%,#142038 100%)',
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
    title: 'Skincare – Alumier MD',
    category: 'Medical Aesthetics',
    desc: 'Medical-grade skincare products tailored to your skin type and treatment goals.',
    href: '/treatments/alumier-md',
    bg: 'linear-gradient(160deg,#0d1417 0%,#142028 100%)',
  },
  {
    title: 'Skin Lesion Removal',
    category: 'Medical Aesthetics',
    desc: 'Safe removal of benign skin lesions by experienced medical professionals.',
    href: '/treatments/skin-lesion',
    bg: 'linear-gradient(160deg,#171512 0%,#2a2218 100%)',
  },
  {
    title: 'Exosome Therapy',
    category: 'Medical Aesthetics',
    desc: 'Cutting-edge regenerative medicine harnessing exosomes to rejuvenate and repair skin.',
    href: '/treatments/exosome-therapy',
    bg: 'linear-gradient(160deg,#0d1720 0%,#102535 100%)',
  },
  {
    title: 'Polynucleotides',
    category: 'Medical Aesthetics',
    desc: 'Regenerative injections that stimulate collagen for deep, lasting skin improvement.',
    href: '/treatments/polynucleotides',
    bg: 'linear-gradient(160deg,#0f0d17 0%,#1c1a30 100%)',
  },
  {
    title: 'Cool Bleph',
    category: 'Medical Aesthetics',
    desc: 'Non-surgical eyelid rejuvenation to reduce puffiness and refresh tired eyes.',
    href: '/treatments/cool-bleph',
    bg: 'linear-gradient(160deg,#0d1017 0%,#151e30 100%)',
  },
  {
    title: 'COOL Glow Peel',
    category: 'Medical Aesthetics',
    desc: 'Full-face glow peel for brighter, smoother skin with zero downtime.',
    href: '/treatments/cool-glow-peel',
    bg: 'linear-gradient(160deg,#171714 0%,#2a2820 100%)',
  },
  {
    title: 'Cool Scar Lift',
    category: 'Medical Aesthetics',
    desc: 'Advanced treatment to reduce the appearance of scars and uneven skin texture.',
    href: '/treatments/cool-scar-lift',
    bg: 'linear-gradient(160deg,#101714 0%,#1a2820 100%)',
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
  {
    title: 'Laser Snoring Treatment',
    category: 'Medical Aesthetics',
    desc: 'Gentle laser therapy to tighten throat tissue and reduce snoring effectively.',
    href: '/treatments/laser-snoring',
    bg: 'linear-gradient(160deg,#171014 0%,#2a1a22 100%)',
  },
  {
    title: 'Laser Vaginal Rejuvenation',
    category: 'Medical Aesthetics',
    desc: 'Non-invasive laser treatment to restore comfort and confidence with no downtime.',
    href: '/treatments/laser-vaginal',
    bg: 'linear-gradient(160deg,#17100d 0%,#2e1c16 100%)',
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
    title: 'Body Confidence Package',
    category: 'Medical Aesthetics',
    desc: 'A curated combination of body treatments for comprehensive contouring and confidence.',
    href: '/treatments/body-confidence',
    bg: 'linear-gradient(160deg,#0d1117 0%,#1a202a 100%)',
  },
  {
    title: 'Lipoma Removal',
    category: 'Medical Aesthetics',
    desc: 'Expert surgical removal of lipomas for a smooth, comfortable result.',
    href: '/treatments/lipoma-removal',
    bg: 'linear-gradient(160deg,#151714 0%,#222820 100%)',
  },
  {
    title: 'Non Surgical Blepharoplasty',
    category: 'Medical Aesthetics',
    desc: 'Lift and rejuvenate the eyelid area without surgery using advanced techniques.',
    href: '/treatments/blepharoplasty',
    bg: 'linear-gradient(160deg,#0d1020 0%,#141830 100%)',
  },
];

// Only show Medical Aesthetics cards that have a photo
const DISPLAYED_TREATMENTS = TREATMENTS.filter(
  (t) => t.category !== 'Medical Aesthetics' || !!t.image,
);

// px per frame — slow, elegant pace (~21 px/s at 60fps)
const SPEED = 0.35;
const CARD_STEP = 300; // card width (280) + gap (20)

export default function Services() {
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
        posRef.current -= SPEED;
        const halfWidth = track.scrollWidth / 2;
        if (posRef.current <= -halfWidth) posRef.current += halfWidth;
        track.style.transform = `translateX(${posRef.current}px)`;
      }
      rafRef.current = requestAnimationFrame(tick);
    }
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  function onPrev() {
    const track = trackRef.current;
    if (!track) return;
    const halfWidth = track.scrollWidth / 2;
    let next = posRef.current + CARD_STEP;
    if (next > 0) next -= halfWidth;
    posRef.current = next;
    track.style.transform = `translateX(${next}px)`;
  }

  function onNext() {
    const track = trackRef.current;
    if (!track) return;
    const halfWidth = track.scrollWidth / 2;
    let next = posRef.current - CARD_STEP;
    if (next <= -halfWidth) next += halfWidth;
    posRef.current = next;
    track.style.transform = `translateX(${next}px)`;
  }

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
    <Section id="treatments" variant="dark" data-section-theme="dark" className={styles.section}>
      {/* Background image */}
      <div className={styles.bgWrap} aria-hidden="true">
        <Image
          src="/images/Black background image.jpg"
          alt=""
          fill
          className={styles.bgImg}
          sizes="100vw"
        />
      </div>

      {/* Content layer above background */}
      <div className={styles.contentLayer}>
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

        {/* ── Carousel ────────────────────────────────────────── */}
        <div
          className={styles.carouselOuter}
          onMouseEnter={() => { hoveredRef.current = true; }}
          onMouseLeave={() => { hoveredRef.current = false; }}
        >
          <div className={styles.fadeLeft}  aria-hidden="true" />
          <div className={styles.fadeRight} aria-hidden="true" />
          <button className={`${styles.arrowBtn} ${styles.arrowPrev}`} onClick={onPrev} aria-label="Previous treatments">
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
              <path d="M11 4L6 9L11 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          <button className={`${styles.arrowBtn} ${styles.arrowNext}`} onClick={onNext} aria-label="Next treatments">
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
              <path d="M7 4L12 9L7 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          <div
            ref={trackRef}
            className={styles.track}
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
            aria-label="Popular treatments carousel"
          >
            {[...DISPLAYED_TREATMENTS, ...DISPLAYED_TREATMENTS].map((t, i) => (
              <div
                key={i}
                className={styles.card}
                aria-hidden={i >= DISPLAYED_TREATMENTS.length ? true : undefined}
              >
                <div className={styles.cardBg} style={{ background: t.bg }} aria-hidden="true" />
                {t.image && (
                  <Image
                    src={t.image}
                    alt={t.title}
                    fill
                    className={styles.img}
                    sizes="(max-width: 480px) 200px, (max-width: 768px) 240px, 280px"
                    draggable={false}
                  />
                )}
                <div className={styles.overlay} aria-hidden="true" />
                <Link
                  href={t.href}
                  className={styles.cardContent}
                  tabIndex={i >= DISPLAYED_TREATMENTS.length ? -1 : 0}
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

        {/* ── Explore all CTA ─────────────────────────────────── */}
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
      </div>
    </Section>
  );
}
