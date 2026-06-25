'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Image from 'next/image';
import Script from 'next/script';
import { m, AnimatePresence } from 'framer-motion';
import styles from './StickyCallbackCTA.module.css';

/* ── Timing constants ──────────────────────────────────────────── */
const FIRST_DELAY = 15_000; // 15 s, auto-show once after first page load

/* ── localStorage helpers ──────────────────────────────────────── */
/**
 * Popup phase stored in localStorage:
 *   '0'  never auto-triggered
 *   '1'  auto-triggered once; never show automatically again
 */
const KEY_PHASE = 'toc_book_popup_shown';

function lsGet(key: string): string | null {
  try { return localStorage.getItem(key); } catch { return null; }
}
function lsSet(key: string, val: string): void {
  try { localStorage.setItem(key, val); } catch {}
}

/* ── Component ─────────────────────────────────────────────────── */
export default function StickyCallbackCTA() {
  const [open, setOpen] = useState(false);
  const isAutoRef = useRef(false);

  /* ── One-time mount setup ─────────────────────────────────────── */
  useEffect(() => {
    const phase = Number(lsGet(KEY_PHASE) ?? '0');
    if (phase >= 1) return; // already triggered once, never again

    let cancelled = false;
    const t = setTimeout(() => {
      if (cancelled) return;
      lsSet(KEY_PHASE, '1');
      // Auto-open the Book Consultation modal on first visit
      window.dispatchEvent(new Event('openBookConsultationModal'));
    }, FIRST_DELAY);
    return () => { cancelled = true; clearTimeout(t); };
  }, []);

  /* ── Unified close / dismiss handler ─────────────────────────── */
  const handleClose = useCallback(() => {
    isAutoRef.current = false;
    setOpen(false);
  }, []);

  /* ── Prevent body scroll while modal is open ──────────────────── */
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  /* ── Close on Escape ──────────────────────────────────────────── */
  useEffect(() => {
    if (!open) return;
    function onKey(e: KeyboardEvent) { if (e.key === 'Escape') handleClose(); }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, handleClose]);

  /* ── Global "open modal" event (from other page components) ───── */
  useEffect(() => {
    function onOpenModal() {
      isAutoRef.current = false; // external trigger is treated as manual
      setOpen(true);
    }
    window.addEventListener('openCallbackModal', onOpenModal);
    return () => window.removeEventListener('openCallbackModal', onOpenModal);
  }, []);

  const handleBookNow = () => {
    window.dispatchEvent(new Event('openBookConsultationModal'));
  };

  const handleCallBack = () => {
    isAutoRef.current = false;
    setOpen(true);
  };

  return (
    <>
      {/* ── Sticky bar ───────────────────────────────────────── */}
      <div className={styles.bar} role="complementary" aria-label="Quick contact">
        {/* Desktop: Single button */}
        <button
          className={styles.ctaBtn}
          onClick={handleCallBack}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true" className={styles.phoneIcon}>
            <path d="M13.5 10.5l-2-2a1 1 0 00-1.4 0l-.9.9a8.2 8.2 0 01-3.1-3.1l.9-.9a1 1 0 000-1.4l-2-2A1 1 0 003.6 2L2.5 3.1C1.8 3.8 1.7 4.9 2.3 5.8a15.5 15.5 0 008 8c.9.5 2 .4 2.7-.3l1.1-1.1a1 1 0 00-.6-1.9z" fill="currentColor"/>
          </svg>
          Request a Call Back
        </button>

        {/* Mobile: Two buttons */}
        <div className={styles.buttonGroup}>
          <button
            className={styles.callBackBtn}
            onClick={handleCallBack}
            aria-label="Call Back"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className={styles.btnIcon}>
              <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.8A19.79 19.79 0 01.03 1.17 2 2 0 012 0h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 14.92z"/>
            </svg>
            <span className={styles.btnLabel}>CALL BACK</span>
          </button>
          <button
            className={styles.bookNowBtn}
            onClick={handleBookNow}
            aria-label="Book Now"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className={styles.btnIcon}>
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
              <line x1="16" y1="2" x2="16" y2="6"/>
              <line x1="8" y1="2" x2="8" y2="6"/>
              <line x1="3" y1="10" x2="21" y2="10"/>
              <path d="M9 16l2 2 4-4"/>
            </svg>
            <span className={styles.btnLabel}>BOOK NOW</span>
          </button>
        </div>
      </div>

      {/* ── Modal ────────────────────────────────────────────── */}
      <AnimatePresence>
        {open && (
          <>
            {/* Backdrop */}
            <m.div
              className={styles.backdrop}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
              onClick={handleClose}
              aria-hidden="true"
            />

            {/* Modal container */}
            <div className={styles.modalOuter}>
              <m.div
                className={styles.modal}
                role="dialog"
                aria-modal="true"
                aria-label="Request a call back"
                initial={{ opacity: 0, y: 20, scale: 0.97 }}
                animate={{ opacity: 1, y: 0,  scale: 1    }}
                exit={{ opacity: 0,    y: 20, scale: 0.97 }}
                transition={{ duration: 0.48, ease: [0.22, 1, 0.36, 1] }}
              >
                {/* Left: image panel — desktop only (hidden via CSS on mobile) */}
                <div className={styles.modalImage}>
                  <Image
                    src="/images/Morpheus8 1.png"
                    alt="Clinician performing treatment at The One Clinic"
                    fill
                    className={styles.modalImg}
                    sizes="340px"
                  />
                </div>

                {/* Form side */}
                <div className={styles.modalContent}>
                  {/* Header row */}
                  <div className={styles.modalTop}>
                    <div>
                      <p className={styles.modalEyebrow}>Get In Touch</p>
                      <h2 className={styles.modalHeading}>Request a Call Back</h2>
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

                  {/* Form iframe */}
                  <div className={styles.modalForm}>
                    <div className={styles.iframeCrop}>
                      <iframe
                        src="https://link.leadpipeline.ai/widget/form/fegqbVjvGrZqMfbk64P4"
                        style={{ width: '100%', height: '800px', minHeight: '800px', border: 'none', display: 'block' }}
                        id="popup-callback-fegqbVjvGrZqMfbk64P4"
                        data-layout="{'id':'INLINE'}"
                        data-trigger-type="alwaysShow"
                        data-trigger-value=""
                        data-activation-type="alwaysActivated"
                        data-activation-value=""
                        data-deactivation-type="neverDeactivate"
                        data-deactivation-value=""
                        data-form-name="Request a Call Back Form"
                        data-height="800"
                        data-layout-iframe-id="popup-callback-fegqbVjvGrZqMfbk64P4"
                        data-form-id="fegqbVjvGrZqMfbk64P4"
                        title="Request a Call Back"
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
