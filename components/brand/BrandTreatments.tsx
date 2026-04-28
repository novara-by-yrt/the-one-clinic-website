'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { fadeUp, stagger, VIEWPORT } from '@/lib/motion';
import styles from './BrandTreatments.module.css';

const SLIDES = [
  { src: '/images/Health Screening.jpg',       title: 'Health Screening',      href: '/treatments/health-screening' },
  { src: '/images/Private GP.jpg',              title: 'Private GP',            href: '/treatments/private-gp' },
  { src: '/images/Joint Injections.jpg',        title: 'Joint Injections',      href: '/treatments/joint-injections' },
  { src: '/images/Minor Surgery.jpg',           title: 'Minor Surgery',         href: '/treatments/minor-surgery' },
  { src: '/images/GP Home Visits.jpg',          title: 'GP Home Visits',        href: '/treatments/gp-home-visits' },
  { src: '/images/Travel Vaccines.jpg',         title: 'Travel Vaccines',       href: '/treatments/travel-vaccine' },
  { src: '/images/Weight Management.jpg',       title: 'Weight Management',     href: '/treatments/weight-management' },
  { src: '/images/Medical Insurance Exam.jpg',  title: 'Medical Insurance',     href: '/treatments/medical-insurance' },
  { src: '/images/Dermatologist.jpg',           title: 'Dermatologist',         href: '/treatments/dermatologist' },
  { src: "/images/Men's Health.jpg",            title: "Men's Health",          href: '/treatments/mens-health' },
  { src: "/images/Women's Health.jpg",          title: "Women's Health",        href: '/treatments/womens-health' },
  { src: '/images/Menopause & HRT.jpg',         title: 'Menopause & HRT',       href: '/treatments/menopause-hrt' },
  { src: '/images/Profhilo (2).jpg',            title: 'Profhilo',              href: '/treatments/profhilo' },
  { src: '/NCTF 135 HA.jpg',                    title: 'NCTF 135 HA',          href: '/treatments/nctf-135-ha' },
];

export default function BrandTreatments() {
  return (
    <section className={styles.section} id="treatments">
      {/* Background image */}
      <div className={styles.bgWrap} aria-hidden="true">
        <Image
          src="/images/Treatment hero section background image.jpg"
          alt=""
          fill
          className={styles.bgImg}
          sizes="100vw"
          priority
        />
      </div>

      {/* Layered overlay — heavy left gradient for panel legibility + bottom for strip */}
      <div className={styles.overlay} aria-hidden="true" />

      {/* Content */}
      <div className={styles.inner}>

        {/* ── Top: glass info panel (left) ──────────────── */}
        <div className={styles.mainArea}>
          <motion.div
            className={styles.leftPanel}
            variants={stagger(0.1)}
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
          >
            <motion.p className={styles.eyebrow} variants={fadeUp}>
              Medical Aesthetics &amp; Health Care
            </motion.p>

            <motion.h2 className={styles.heading} variants={fadeUp}>
              Our Popular<br />Treatments
            </motion.h2>

            <motion.div className={styles.rule} variants={fadeUp} aria-hidden="true" />

            <motion.p className={styles.desc} variants={fadeUp}>
              From advanced medical aesthetics to comprehensive health screenings,
              our expert team delivers exceptional care under one roof. Every
              treatment is tailored to your individual goals by our qualified
              doctors, combining clinical expertise with the latest technology.
              Whether you seek aesthetic enhancement, health optimisation, or
              preventative care, we have a solution designed just for you.
            </motion.p>

            <motion.div variants={fadeUp}>
              <Link href="/treatments" className={styles.cta}>
                Explore All Treatments
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.6"
                    strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </Link>
            </motion.div>
          </motion.div>
        </div>

        {/* ── Bottom: treatment thumbnail strip (right-aligned) ── */}
        <motion.div
          className={styles.bottomArea}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.75, ease: [0.25, 0.1, 0.25, 1], delay: 0.25 }}
        >
          <div className={styles.stripWrapper}>
            <div className={styles.stripHeader}>
              <span className={styles.stripLabel}>Treatments</span>
              <span className={styles.stripLine} aria-hidden="true" />
            </div>

            <div className={styles.tickerOuter}>
              <div className={styles.tickerTrack} aria-label="Treatment photo strip">
                {[...SLIDES, ...SLIDES].map((slide, i) => (
                  <Link
                    key={i}
                    href={slide.href}
                    className={styles.thumb}
                    tabIndex={i >= SLIDES.length ? -1 : 0}
                    aria-hidden={i >= SLIDES.length ? true : undefined}
                  >
                    <Image
                      src={slide.src}
                      alt={slide.title}
                      fill
                      className={styles.thumbImg}
                      sizes="180px"
                    />
                    <div className={styles.thumbOverlay} aria-hidden="true" />
                    <span className={styles.thumbTitle}>{slide.title}</span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
