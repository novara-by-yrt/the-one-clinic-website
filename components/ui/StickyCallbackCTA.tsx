'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Image from 'next/image';
import Script from 'next/script';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './StickyCallbackCTA.module.css';

/* ── Timing constants ──────────────────────────────────────────── */
const FIRST_DELAY = 15_000; // 15 s, auto-show once after first page load

/* ── localStorage helpers ──────────────────────────────────────── */
/**
 * Popup phase stored in localStorage:
 *   '0'  never auto-triggered
 *   '1'  auto-triggered once; never show automatically again
 */
const KEY_PHASE = 'toc_popup_phase';

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
      isAutoRef.current = true;
      setOpen(true);
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

  return (
    <>
      {/* ── Sticky bar ───────────────────────────────────────── */}
      <div className={styles.bar} role="complementary" aria-label="Quick contact">
        <button
          className={styles.ctaBtn}
          onClick={() => { isAutoRef.current = false; setOpen(true); }}
        >
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
              transition={{ duration: 0.35, ease: 'easeOut' }}
              onClick={handleClose}
              aria-hidden="true"
            />

            {/* Modal container */}
            <div className={styles.modalOuter}>
              <motion.div
                className={styles.modal}
                role="dialog"
                aria-modal="true"
                aria-label="Request a call back"
                initial={{ opacity: 0, y: 20, scale: 0.97 }}
                animate={{ opacity: 1, y: 0,  scale: 1    }}
                exit={{ opacity: 0,    y: 20, scale: 0.97 }}
                transition={{ duration: 0.48, ease: [0.22, 1, 0.36, 1] }}
              >
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
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
