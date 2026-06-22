'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import Script from 'next/script';
import { m, AnimatePresence } from 'framer-motion';
import styles from './BookConsultationModal.module.css';

export default function BookConsultationModal() {
  const [open, setOpen] = useState(false);

  const handleClose = useCallback(() => {
    setOpen(false);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    function onKey(e: KeyboardEvent) { if (e.key === 'Escape') handleClose(); }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, handleClose]);

  useEffect(() => {
    function onOpenModal() { setOpen(true); }
    window.addEventListener('openBookConsultationModal', onOpenModal);
    return () => window.removeEventListener('openBookConsultationModal', onOpenModal);
  }, []);

  return (
    <>
      <AnimatePresence>
        {open && (
          <>
            <m.div
              className={styles.backdrop}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
              onClick={handleClose}
              aria-hidden="true"
            />

            <div className={styles.modalOuter}>
              <m.div
                className={styles.modal}
                role="dialog"
                aria-modal="true"
                aria-label="Book a consultation"
                initial={{ opacity: 0, y: 20, scale: 0.97 }}
                animate={{ opacity: 1, y: 0,  scale: 1    }}
                exit={{ opacity: 0,    y: 20, scale: 0.97 }}
                transition={{ duration: 0.48, ease: [0.22, 1, 0.36, 1] }}
              >
                {/* Left: image panel — desktop only (hidden via CSS on mobile) */}
                <div className={styles.modalImage}>
                  <Image
                    src="/images/Morpheus8-new.png"
                    alt="Morpheus8 treatment at The One Clinic"
                    fill
                    className={styles.modalImg}
                    sizes="300px"
                  />
                </div>

                <div className={styles.modalContent}>
                  <div className={styles.modalTop}>
                    <div>
                      <p className={styles.modalEyebrow}>Get Started</p>
                      <h2 className={styles.modalHeading}>Book a Consultation</h2>
                    </div>
                    <button
                      className={styles.closeBtn}
                      onClick={handleClose}
                      aria-label="Close"
                    >
                      <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
                        <path d="M4 4l10 10M14 4L4 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                      </svg>
                    </button>
                  </div>

                  <div className={styles.modalForm}>
                    <div className={styles.iframeCrop}>
                      <iframe
                        src="https://link.leadpipeline.ai/widget/form/Az3D8kxDVBz2diDQJ3uY"
                        style={{ width: '100%', height: '800px', minHeight: '800px', border: 'none', display: 'block' }}
                        id="popup-book-Az3D8kxDVBz2diDQJ3uY"
                        data-layout="{'id':'INLINE'}"
                        data-trigger-type="alwaysShow"
                        data-trigger-value=""
                        data-activation-type="alwaysActivated"
                        data-activation-value=""
                        data-deactivation-type="neverDeactivate"
                        data-deactivation-value=""
                        data-form-name="Book Consultation"
                        data-height="420"
                        data-layout-iframe-id="popup-book-Az3D8kxDVBz2diDQJ3uY"
                        data-form-id="Az3D8kxDVBz2diDQJ3uY"
                        title="Book a Consultation"
                        scrolling="no"
                      />
                    </div>
                  </div>
                </div>
              </m.div>
            </div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
