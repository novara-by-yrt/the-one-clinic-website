'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState, useMemo, useCallback } from 'react';
import { m, AnimatePresence } from 'framer-motion';
import CardFanCarousel, { type CardItem } from '@/components/ui/CardFanCarousel';
import { fadeUp, stagger, VIEWPORT } from '@/lib/motion';
import styles from './BrandTreatments.module.css';

const SLIDES_BASE = [
  {
    src:   '/images/Endolift1.png',
    title: 'Endolift',
    href:  '/treatments/endolift-laser-leicester',
    desc:  'An innovative laser treatment that tightens and lifts loose skin using minimally invasive fibre technology , no surgery, no general anaesthetic, minimal downtime.',
  },
  {
    src:   '/images/Minor Surgery1.jpg',
    title: 'Minor Surgery',
    href:  '/treatments/minor-surgery-leicester',
    desc:  'Minor surgical procedures performed safely in our clinic. From mole removal to lipoma excision, handled with precision and expert care.',
  },
  {
    src:   '/images/Deep Laser Resurfacing 1.png',
    title: 'Deep Laser Resurfacing',
    href:  '/treatments/deep-laser-resurfacing-leicester',
    desc:  'Intensive laser treatment targeting deeper skin layers to reduce wrinkles, scarring, and uneven texture for dramatically renewed, smoother skin.',
  },
  {
    src:   '/images/The Ultimate Body Confidence Package.png',
    title: 'Ultimate Body Confidence Package',
    href:  '/treatments/the-body-confidence-package',
    desc:  'A comprehensive programme combining our leading body contouring and skin tightening treatments for transformative, full-body results.',
  },
  {
    src:   '/images/Morpheus8-new.png',
    title: 'Morpheus 8',
    href:  '/treatments/morpheus8-leicester',
    desc:  'Advanced radiofrequency microneedling that remodels fat and stimulates collagen deep within the skin for tightened, lifted, and youthful-looking contours.',
  },
  {
    src:   '/images/Juliane.jpg',
    title: 'JULÄINE',
    href:  '/treatments/julaine',
    desc:  'An exclusive regenerative treatment combining the finest aesthetic techniques to deliver exceptional, long-lasting rejuvenation, tailored entirely to you.',
  },
];

const TOTAL = SLIDES_BASE.length;

const INFO_VARIANTS = {
  hidden: { opacity: 0, y: 14 },
  show:   { opacity: 1, y: 0,  transition: { duration: 0.38, ease: [0.22, 1, 0.36, 1] as const } },
  exit:   { opacity: 0, y: -8, transition: { duration: 0.20, ease: 'easeIn' as const } },
};

export default function BrandTreatments() {
  // Driven by the fan: the card in the centre, or the one being hovered.
  const [activeIndex, setActiveIndex] = useState(TOTAL >> 1);
  const active = SLIDES_BASE[activeIndex % TOTAL] ?? SLIDES_BASE[0];

  const cards: CardItem[] = useMemo(
    () =>
      SLIDES_BASE.map((slide) => ({
        imgUrl: slide.src,
        alt: slide.title,
        title: slide.title,
        linkUrl: slide.href,
      })),
    [],
  );

  const handleActiveChange = useCallback((index: number) => {
    setActiveIndex(index);
  }, []);

  return (
    <section className={styles.section} id="treatments">
      {/* Background */}
      <div className={styles.bgWrap} aria-hidden="true">
        <Image
          src="/images/Treatment hero section background image.jpg"
          alt=""
          fill
          className={styles.bgImg}
          sizes="100vw"
          loading="lazy"
        />
      </div>
      <div className={styles.overlay} aria-hidden="true" />
      <div className={styles.glow1}   aria-hidden="true" />
      <div className={styles.glow2}   aria-hidden="true" />

      <div className={styles.inner}>

        {/* ══ Top: centered heading ══ */}
        <m.div
          className={styles.topHeader}
          variants={stagger(0.1)}
          initial="hidden"
          whileInView="show"
          viewport={VIEWPORT}
        >
          <m.div variants={fadeUp}>
            <span className={styles.chip}>
              <span className={styles.chipDot} aria-hidden="true" />
              Medical Aesthetics &amp; Health Care
            </span>
          </m.div>

          <m.h2 className={styles.heading} variants={fadeUp}>
            Our Popular{' '}
            <em className={styles.headingAccent}>Treatments</em>
          </m.h2>

          <m.p className={styles.sectionDesc} variants={fadeUp}>
            Advanced aesthetic and health treatments, all under one roof,
            tailored to your goals by our qualified doctors.
          </m.p>
        </m.div>

        {/* ══ Fan carousel ══ */}
        <div className={styles.fanWrap}>
          <CardFanCarousel
            cards={cards}
            label="Popular treatments"
            onActiveChange={handleActiveChange}
          />
        </div>

        {/* ══ Detail panel for the card in focus ══ */}
        <div className={styles.detailPanel}>
          <AnimatePresence mode="wait">
            <m.div
              key={activeIndex}
              className={styles.treatmentInfo}
              variants={INFO_VARIANTS}
              initial="hidden"
              animate="show"
              exit="exit"
            >
              <h3 className={styles.treatmentName}>{active.title}</h3>
              <div className={styles.rule} aria-hidden="true" />
              <p className={styles.treatmentDesc}>{active.desc}</p>
              <Link
                href={active.href}
                className={styles.cta}
                aria-label={`Learn more about ${active.title}`}
              >
                Learn More
                <svg width="15" height="15" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.6"
                    strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </Link>
            </m.div>
          </AnimatePresence>
        </div>

        {/* ══ Bottom CTA ══ */}
        <div className={styles.exploreBtnWrap}>
          <Link href="/treatments" className={styles.exploreBtn}>
            Explore all treatments
            <svg width="15" height="15" viewBox="0 0 15 15" fill="none" aria-hidden="true">
              <path d="M2.5 7.5h10M8 3l4.5 4.5L8 12" stroke="currentColor" strokeWidth="1.7"
                strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </Link>
        </div>

      </div>
    </section>
  );
}
