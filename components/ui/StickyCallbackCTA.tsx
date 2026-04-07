'use client';

import { useState, useEffect } from 'react';
import Script from 'next/script';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './StickyCallbackCTA.module.css';

export default function StickyCallbackCTA() {
  const [open, setOpen] = useState(false);

  /* Prevent body scroll when modal is open */
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  /* Close on Escape */
  useEffect(() => {
    if (!open) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') setOpen(false);
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  return (
    <>
      <Script src="https://link.leadpipeline.ai/js/form_embed.js" strategy="lazyOnload" />

      {/* ── Sticky bar ───────────────────────────────────────── */}
      <div className={styles.bar} role="complementary" aria-label="Quick contact">
        <button className={styles.ctaBtn} onClick={() => setOpen(true)}>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true" className={styles.phoneIcon}>
            <path d="M13.5 10.5l-2-2a1 1 0 00-1.4 0l-.9.9a8.2 8.2 0 01-3.1-3.1l.9-.9a1 1 0 000-1.4l-2-2A1 1 0 003.6 2L2.5 3.1C1.8 3.8 1.7 4.9 2.3 5.8a15.5 15.5 0 008 8c.9.5 2 .4 2.7-.3l1.1-1.1a1 1 0 00-.6-1.9z" fill="currentColor"/>
          </svg>
          Request a Call Back
        </button>
      </div>

      {/* ── Modal ────────────────────────────────────────────── */}
      <AnimatePresence>
        {open && (
          <>
            {/* Backdrop */}
            <motion.div
              className={styles.backdrop}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={() => setOpen(false)}
              aria-hidden="true"
            />

            {/* Modal container (centred) */}
            <div className={styles.modalOuter}>
              <motion.div
                className={styles.modal}
                role="dialog"
                aria-modal="true"
                aria-label="Request a call back"
                initial={{ opacity: 0, y: 32 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 32 }}
                transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
              >
                {/* Header row */}
                <div className={styles.modalTop}>
                  <div>
                    <p className={styles.modalEyebrow}>Get In Touch</p>
                    <h2 className={styles.modalHeading}>Request a Call Back</h2>
                  </div>
                  <button
                    className={styles.closeBtn}
                    onClick={() => setOpen(false)}
                    aria-label="Close"
                  >
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
                      <path d="M4 4l10 10M14 4L4 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                    </svg>
                  </button>
                </div>

                {/* Form iframe */}
                <div className={styles.modalForm}>
                  <iframe
                    src="https://link.leadpipeline.ai/widget/form/Az3D8kxDVBz2diDQJ3uY"
                    style={{ width: '100%', height: '509px', border: 'none' }}
                    id="popup-callback-Az3D8kxDVBz2diDQJ3uY"
                    data-layout="{'id':'INLINE'}"
                    data-trigger-type="alwaysShow"
                    data-trigger-value=""
                    data-activation-type="alwaysActivated"
                    data-activation-value=""
                    data-deactivation-type="neverDeactivate"
                    data-deactivation-value=""
                    data-form-name="Book Consultation"
                    data-height="509"
                    data-layout-iframe-id="popup-callback-Az3D8kxDVBz2diDQJ3uY"
                    data-form-id="Az3D8kxDVBz2diDQJ3uY"
                    title="Request a Call Back"
                  />
                </div>
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
