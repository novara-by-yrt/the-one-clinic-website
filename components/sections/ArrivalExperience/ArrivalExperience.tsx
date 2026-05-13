'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import Section from '@/components/ui/Section';
import Container from '@/components/ui/Container';
import { fadeUp, fadeRight, stagger, VIEWPORT } from '@/lib/motion';
import styles from './ArrivalExperience.module.css';

const ITEMS = [
  {
    number: '01',
    title: 'Reception & Check-in',
    desc: 'Our front-of-house team greets you on arrival, handling check-in promptly so you can settle in.',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
        <polyline points="9 22 9 12 15 12 15 22" />
      </svg>
    ),
  },
  {
    number: '02',
    title: 'Complimentary Refreshments',
    desc: 'Settle in with a drink of your choice. We create a calm, unhurried atmosphere before your treatment.',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M18 8h1a4 4 0 0 1 0 8h-1" />
        <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z" />
        <line x1="6" y1="1" x2="6" y2="4" />
        <line x1="10" y1="1" x2="10" y2="4" />
        <line x1="14" y1="1" x2="14" y2="4" />
      </svg>
    ),
  },
  {
    number: '03',
    title: 'Skincare Bar',
    desc: 'Browse and freely sample our curated range of clinic-approved skincare products.',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
      </svg>
    ),
  },
  {
    number: '04',
    title: 'Personalised Experience',
    desc: 'Every element of your visit — consultation, treatment, aftercare — is tailored to you.',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
  },
];

export default function ArrivalExperience() {
  return (
    <Section variant="light" data-section-theme="light" className={styles.section}>
      <Container>
        <div className={styles.layout}>

          {/* ── Left: image ── */}
          <motion.div
            className={styles.imageCol}
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
          >
            <div className={styles.imageWrap}>
              <Image
                src="/images/location2.jpg"
                alt="The One Clinic reception and waiting area"
                fill
                className={styles.image}
                sizes="(max-width: 900px) 100vw, 50vw"
              />
              {/* Floating badge */}
              <div className={styles.badge}>
                <span className={styles.badgeDot} />
                <span className={styles.badgeText}>Doctor-Led Clinic</span>
              </div>
            </div>
          </motion.div>

          {/* ── Right: content ── */}
          <motion.div
            className={styles.contentCol}
            variants={stagger(0.1)}
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
          >
            <motion.div className={styles.header} variants={fadeUp}>
              <p className={styles.eyebrow}>From the Moment You Arrive</p>
              <h2 className={styles.heading}>The Arrival<br />Experience</h2>
              <p className={styles.subtext}>
                Every visit is curated to make you feel entirely at ease from the moment you step through our doors.
              </p>
            </motion.div>

            <motion.div className={styles.items} variants={stagger(0.09)}>
              {ITEMS.map((item, i) => (
                <motion.div key={item.number} className={styles.item} variants={fadeUp}>
                  <div className={styles.itemLeft}>
                    <span className={styles.itemNumber}>{item.number}</span>
                    {i < ITEMS.length - 1 && <span className={styles.connector} aria-hidden="true" />}
                  </div>
                  <div className={styles.itemBody}>
                    <div className={styles.itemHead}>
                      <span className={styles.itemIcon}>{item.icon}</span>
                      <h3 className={styles.itemTitle}>{item.title}</h3>
                    </div>
                    <p className={styles.itemDesc}>{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

        </div>
      </Container>
    </Section>
  );
}
