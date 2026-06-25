'use client';

import Link from 'next/link';
import BookConsultationButton from '@/components/ui/BookConsultationButton';
import { m } from 'framer-motion';
import Section from '@/components/ui/Section';
import Container from '@/components/ui/Container';
import { fadeUp, stagger, VIEWPORT } from '@/lib/motion';
import styles from './ExtendedTeam.module.css';

const SPECIALIST = {
  name: 'Mr Thangasamy Sankar',
  role: 'Medical Director & Consultant Plastic Surgeon',
  credentials: 'FRCS',
  specialties: ['Plastic Surgery', 'Laser Treatments'],
  initials: 'TS',
  bio: 'A highly experienced consultant plastic surgeon with extensive expertise in laser treatments and surgical aesthetics.',
};

const CLINICAL = [
  { name: 'Nurse Sanj', role: 'Clinical Nurse', initials: 'NS' },
];

const SUPPORT = [
  { name: 'Hollie', role: 'Patient Care Team',   initials: 'H' },
  { name: 'Charley',role: 'Patient Care Team',   initials: 'CH' },
];

export default function ExtendedTeam() {
  return (
    <Section variant="dark" data-section-theme="dark">
      <Container>

        {/* ── Specialist ── */}
        <m.div
          className={styles.block}
          variants={stagger(0.1)}
          initial="hidden"
          whileInView="show"
          viewport={VIEWPORT}
        >
          <m.div className={styles.blockHeader} variants={fadeUp}>
            <p className={styles.blockEyebrow}>Specialist</p>
            <h2 className={styles.blockHeading}>Our Surgical Expert</h2>
          </m.div>

          <m.article className={styles.specialistCard} variants={fadeUp}>
            <div className={styles.specialistAvatar} aria-hidden="true">
              <span className={styles.specialistInitials}>{SPECIALIST.initials}</span>
            </div>
            <div className={styles.specialistBody}>
              <div className={styles.specialistMeta}>
                <h3 className={styles.specialistName}>{SPECIALIST.name}</h3>
                <p className={styles.specialistCredentials}>{SPECIALIST.role}</p>
                <p className={styles.specialistCredentials}>{SPECIALIST.credentials}</p>
                <div className={styles.tags}>
                  {SPECIALIST.specialties.map((s) => (
                    <span key={s} className={styles.tag}>{s}</span>
                  ))}
                </div>
              </div>
              <p className={styles.specialistBio}>{SPECIALIST.bio}</p>
              <BookConsultationButton className={styles.specialistCta}>
                Book Consultation
                <span aria-hidden="true" className={styles.ctaArrow}>→</span>
              </BookConsultationButton>
            </div>
          </m.article>
        </m.div>

        {/* ── Clinical Team ── */}
        <m.div
          className={styles.block}
          variants={stagger(0.1)}
          initial="hidden"
          whileInView="show"
          viewport={VIEWPORT}
        >
          <m.div className={styles.blockHeader} variants={fadeUp}>
            <p className={styles.blockEyebrow}>Clinical Team</p>
            <h2 className={styles.blockHeading}>Nursing &amp; Clinical Staff</h2>
          </m.div>

          <m.div className={styles.staffRow} variants={stagger(0.08)}>
            {CLINICAL.map((member) => (
              <m.div key={member.name} className={styles.staffCard} variants={fadeUp}>
                <div className={styles.staffAvatar} aria-hidden="true">
                  <span className={styles.staffInitials}>{member.initials}</span>
                </div>
                <div className={styles.staffInfo}>
                  <p className={styles.staffName}>{member.name}</p>
                  <p className={styles.staffRole}>{member.role}</p>
                </div>
              </m.div>
            ))}
          </m.div>
        </m.div>

        {/* ── Support Team ── */}
        <m.div
          className={styles.block}
          variants={stagger(0.1)}
          initial="hidden"
          whileInView="show"
          viewport={VIEWPORT}
        >
          <m.div className={styles.blockHeader} variants={fadeUp}>
            <p className={styles.blockEyebrow}>Support Team</p>
            <h2 className={styles.blockHeading}>Patient Care &amp; Front of House</h2>
          </m.div>

          <m.div className={styles.supportRow} variants={stagger(0.08)}>
            {SUPPORT.map((member) => (
              <m.div key={member.name} className={styles.supportCard} variants={fadeUp}>
                <div className={styles.supportAvatar} aria-hidden="true">
                  <span className={styles.supportInitials}>{member.initials}</span>
                </div>
                <p className={styles.supportName}>{member.name}</p>
                <p className={styles.supportRole}>{member.role}</p>
              </m.div>
            ))}
          </m.div>
        </m.div>

      </Container>
    </Section>
  );
}
