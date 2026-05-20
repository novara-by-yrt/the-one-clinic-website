'use client';

import Link from 'next/link';
import BookConsultationButton from '@/components/ui/BookConsultationButton';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { fadeUp, stagger, VIEWPORT } from '@/lib/motion';
import Container from '@/components/ui/Container';
import type { TeamMember } from '@/data/team';
import styles from './TeamMemberProfile.module.css';

const DEFAULT_STATS = [
  { value: 'GMC', label: 'Registered Practitioner' },
  { value: 'CQC', label: 'Registered Clinic' },
  { value: 'NHS', label: 'Trained Doctor' },
];

function splitName(fullName: string): { first: string; last: string } {
  const idx = fullName.lastIndexOf(' ');
  if (idx === -1) return { first: fullName, last: '' };
  return { first: fullName.slice(0, idx), last: fullName.slice(idx + 1) };
}

export default function TeamMemberProfile({ member }: { member: TeamMember }) {
  const stats = member.stats && member.stats.length > 0 ? member.stats : DEFAULT_STATS;
  const { first, last } = splitName(member.name);

  return (
    <>
      {/* ─────────────────────────────────────────
          HERO — text left, photo right
      ───────────────────────────────────────── */}
      <section className={styles.hero} data-section-theme="dark">
        <Container>
          <motion.div
            className={styles.heroGrid}
            variants={stagger(0.1)}
            initial="hidden"
            animate="show"
          >
            {/* Back link, top row on desktop, above photo on mobile */}
            <motion.div className={styles.backWrap} variants={fadeUp}>
              <Link href="/our-team" className={styles.back}>
                <span aria-hidden="true">←</span> Our Team
              </Link>
            </motion.div>

            {/* Left — text content */}
            <div className={styles.heroLeft}>
              <motion.div className={styles.heroText} variants={stagger(0.08)}>
                <motion.p className={styles.eyebrow} variants={fadeUp}>
                  The One Clinic
                </motion.p>
                <motion.h1 className={styles.name} variants={fadeUp}>
                  {last ? (
                    <>
                      {first}
                      <br />
                      {last}
                    </>
                  ) : (
                    first
                  )}
                </motion.h1>
                {member.credentials && (
                  <motion.p className={styles.credentials} variants={fadeUp}>
                    {member.credentials}
                  </motion.p>
                )}
                <motion.p className={styles.role} variants={fadeUp}>
                  {member.role}
                </motion.p>
              </motion.div>

              <motion.div className={styles.heroCtas} variants={fadeUp}>
                <BookConsultationButton className={styles.btnPrimary}>
                  Book Consultation
                </BookConsultationButton>
              </motion.div>
            </div>

            {/* Right — photo */}
            <motion.div className={styles.heroPhoto} variants={fadeUp}>
              {member.image ? (
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  priority
                  className={styles.photo}
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 300px, 400px"
                />
              ) : (
                <div className={styles.initialsWrap} aria-hidden="true">
                  <span className={styles.initials}>{member.initials}</span>
                </div>
              )}
            </motion.div>
          </motion.div>
        </Container>
      </section>

      {/* ─────────────────────────────────────────
          STATS STRIP — dark
      ───────────────────────────────────────── */}
      <section className={styles.statsSection} data-section-theme="dark">
        <Container>
          <motion.div
            className={styles.statsRow}
            variants={stagger(0.1)}
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
          >
            {stats.map((s) => (
              <motion.div key={s.label} className={styles.stat} variants={fadeUp}>
                <span className={styles.statValue}>{s.value}</span>
                <span className={styles.statLabel}>{s.label}</span>
              </motion.div>
            ))}
          </motion.div>
        </Container>
      </section>

      {/* ─────────────────────────────────────────
          BIO — light
      ───────────────────────────────────────── */}
      <section className={styles.bioSection} data-section-theme="light">
        <Container>
          <motion.div
            className={styles.bioLayout}
            variants={stagger(0.1)}
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
          >
            {/* Sidebar label */}
            <motion.aside className={styles.bioSidebar} variants={fadeUp}>
              <p className={styles.sidebarLabel}>About</p>
              <div className={styles.sidebarLine} />
            </motion.aside>

            {/* Body text */}
            <motion.div className={styles.bioBody} variants={stagger(0.08)}>
              {member.bio.map((para, i) => (
                <motion.p key={i} className={styles.bio} variants={fadeUp}>
                  {para}
                </motion.p>
              ))}

              {/* Specialties — only shown if non-empty */}
              {member.specialties && member.specialties.length > 0 && (
                <motion.div className={styles.specialtiesWrap} variants={fadeUp}>
                  <p className={styles.specialtiesLabel}>Areas of Expertise</p>
                  <div className={styles.tags}>
                    {member.specialties.map((s) => (
                      <span key={s} className={styles.tag}>{s}</span>
                    ))}
                  </div>
                </motion.div>
              )}
            </motion.div>
          </motion.div>
        </Container>
      </section>

      {/* ─────────────────────────────────────────
          BOOK CTA — dark
      ───────────────────────────────────────── */}
      <section className={styles.ctaSection} data-section-theme="dark">
        <Container>
          <motion.div
            className={styles.ctaInner}
            variants={stagger(0.1)}
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
          >
            <motion.p className={styles.ctaEyebrow} variants={fadeUp}>
              Ready to begin?
            </motion.p>
            <motion.h2 className={styles.ctaHeading} variants={fadeUp}>
              Book a Consultation<br />with {member.name}
            </motion.h2>
            <motion.p className={styles.ctaSubtext} variants={fadeUp}>
              Take the first step towards exceptional care. Our team will be in touch to
              confirm your appointment.
            </motion.p>
            <motion.div variants={fadeUp}>
              <BookConsultationButton className={styles.ctaBtn}>
                Book Consultation
              </BookConsultationButton>
            </motion.div>
          </motion.div>
        </Container>
      </section>
    </>
  );
}
