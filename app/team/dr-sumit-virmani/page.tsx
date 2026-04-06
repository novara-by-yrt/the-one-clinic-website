'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { fadeUp, stagger } from '@/lib/motion';
import Section from '@/components/ui/Section';
import Container from '@/components/ui/Container';
import LeadForm from '@/components/sections/LeadForm';
import styles from './page.module.css';

const TAGS = [
  '15+ Years Experience',
  'Minor Surgery',
  'Skin Lesion Excision',
  'Body Contouring',
  'Hair Rejuvenation',
  'GP Services',
];

const BIO = [
  'Dr Sumit Virmani is co-founder of The One Clinic. He has extensive experience having worked as a medical doctor for over 15 years, with over 12 of these years working as a local GP.',
  'His particular skills are in performing minor surgery, and the excision of skin lesions. Throughout his work he has been rewarded by the help he has given to his patients. He is especially proud when a person completes their treatment feeling elated by the transformation in their appearance. This has led to a growing interest in aesthetics, particularly with body contouring procedures and hair rejuvenation.',
  'Dr Virmani is currently a locally practising GP. He aims to continue this service within his role at The One Clinic, as well as focusing on aesthetic procedures and ensuring his patients have access to a wide range of health and well-being treatments.',
];

export default function DrVirmaniPage() {
  return (
    <>
      {/* ── Profile ── */}
      <Section variant="light" data-section-theme="light" className={styles.section}>
        <Container>

          {/* Back link */}
          <motion.div
            className={styles.backWrap}
            variants={fadeUp}
            initial="hidden"
            animate="show"
          >
            <Link href="/our-team" className={styles.back}>
              <span aria-hidden="true">←</span> Our Team
            </Link>
          </motion.div>

          <div className={styles.layout}>

            {/* Left — photo */}
            <motion.div
              className={styles.photoCol}
              variants={fadeUp}
              initial="hidden"
              animate="show"
            >
              <div className={styles.photoWrap}>
                <Image
                  src="/images/imgi_20_team-thumb-VIRMANI.jpg"
                  alt="Dr Sumit Virmani"
                  fill
                  priority
                  className={styles.photo}
                  sizes="(max-width: 900px) 100vw, 40vw"
                />
              </div>
            </motion.div>

            {/* Right — content */}
            <motion.div
              className={styles.content}
              variants={stagger(0.1)}
              initial="hidden"
              animate="show"
            >
              {/* Name block */}
              <motion.div className={styles.nameBlock} variants={fadeUp}>
                <p className={styles.eyebrow}>Our Team</p>
                <h1 className={styles.name}>Dr Sumit Virmani</h1>
                <p className={styles.credentials}>MBBS, MRCGP</p>
                <p className={styles.role}>Co-Founder &amp; GP</p>
              </motion.div>

              {/* Tags */}
              <motion.div className={styles.tags} variants={fadeUp}>
                {TAGS.map((tag) => (
                  <span key={tag} className={styles.tag}>{tag}</span>
                ))}
              </motion.div>

              {/* Divider */}
              <hr className={styles.divider} />

              {/* Bio */}
              <motion.div className={styles.bioBlock} variants={fadeUp}>
                {BIO.map((para, i) => (
                  <p key={i} className={styles.bio}>{para}</p>
                ))}
              </motion.div>

              {/* CTAs */}
              <motion.div className={styles.actions} variants={fadeUp}>
                <Link href="#lead-form" className={styles.btnPrimary}>
                  Book Consultation
                </Link>
                <Link href="/our-team" className={styles.btnSecondary}>
                  ← Back to Team
                </Link>
              </motion.div>
            </motion.div>

          </div>
        </Container>
      </Section>

      <LeadForm />
    </>
  );
}
