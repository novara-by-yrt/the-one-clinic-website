'use client';

import { useState, type FormEvent } from 'react';
import { motion } from 'framer-motion';
import Section from '@/components/ui/Section';
import Container from '@/components/ui/Container';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import { fadeUp, stagger, VIEWPORT } from '@/lib/motion';
import styles from './LeadForm.module.css';

export default function LeadForm() {
  const [name,      setName]      = useState('');
  const [contact,   setContact]   = useState('');
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!name.trim() || !contact.trim()) return;
    // In production, submit to API here
    setSubmitted(true);
  }

  return (
    <Section variant="light" data-section-theme="light">
      <Container>
        <motion.div
          className={styles.wrapper}
          variants={stagger()}
          initial="hidden"
          whileInView="show"
          viewport={VIEWPORT}
        >
          {submitted ? (
            <motion.div
              className={styles.success}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
            >
              <p className={styles.successIcon} aria-hidden="true">✓</p>
              <h2 className={styles.heading}>We'll be in touch.</h2>
              <p className={styles.subtext}>
                Thank you, {name}. A member of our team will contact you
                within 24 hours to arrange your consultation.
              </p>
            </motion.div>
          ) : (
            <>
              <motion.p className={styles.eyebrow} variants={fadeUp}>
                Free Consultation
              </motion.p>
              <motion.h2 className={styles.heading} variants={fadeUp}>
                Book Your Free Consultation
              </motion.h2>
              <motion.p className={styles.subtext} variants={fadeUp}>
                No obligation, no pressure — just an honest conversation about
                your goals with a specialist who listens.
              </motion.p>

              <motion.form
                className={styles.form}
                onSubmit={handleSubmit}
                variants={fadeUp}
                noValidate
                aria-label="Consultation booking form"
              >
                <Input
                  id="lead-name"
                  label="Full Name"
                  theme="light"
                  type="text"
                  placeholder="Jane Smith"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  autoComplete="name"
                />
                <Input
                  id="lead-contact"
                  label="Email or Phone"
                  theme="light"
                  type="text"
                  placeholder="jane@example.com or 07700 900 000"
                  value={contact}
                  onChange={(e) => setContact(e.target.value)}
                  required
                  autoComplete="email"
                />
                <Button
                  type="submit"
                  variant="primary"
                  theme="light"
                  className={styles.submitBtn}
                >
                  Book Now — It's Free
                </Button>

                <p className={styles.privacy}>
                  Your details are never shared. We respect your privacy.
                </p>
              </motion.form>
            </>
          )}
        </motion.div>
      </Container>
    </Section>
  );
}
