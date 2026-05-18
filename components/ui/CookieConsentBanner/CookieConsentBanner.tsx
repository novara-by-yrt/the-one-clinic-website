'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { getConsentPreferences, setConsentPreferences } from '@/lib/consent';
import { ConsentPreferences, CONSENT_CATEGORIES } from '@/lib/consent-types';
import styles from './CookieConsentBanner.module.css';

const DEFAULT_PREFS: Omit<ConsentPreferences, 'acceptedAt' | 'expiresAt'> = {
  'strictly-necessary': true,
  functional: false,
  analytics: false,
  marketing: false,
};

type View = 'banner' | 'details';

export default function CookieConsentBanner() {
  const [isVisible, setIsVisible] = useState(false);
  const [view, setView] = useState<View>('banner');
  const [prefs, setPrefs] = useState<Omit<ConsentPreferences, 'acceptedAt' | 'expiresAt'>>(DEFAULT_PREFS);

  useEffect(() => {
    const checkConsent = () => {
      const hasConsent = getConsentPreferences();
      if (!hasConsent) {
        setIsVisible(true);
        setView('banner');
        setPrefs(DEFAULT_PREFS);
      }
    };

    checkConsent();

    const handleShowBanner = () => checkConsent();
    window.addEventListener('show-consent-banner', handleShowBanner);
    return () => window.removeEventListener('show-consent-banner', handleShowBanner);
  }, []);

  const handleAcceptAll = () => {
    const fullPrefs = {
      'strictly-necessary': true,
      functional: true,
      analytics: true,
      marketing: true,
    };
    setConsentPreferences(fullPrefs);
    setIsVisible(false);
  };

  const handleRejectAll = () => {
    const fullPrefs = {
      'strictly-necessary': true,
      functional: false,
      analytics: false,
      marketing: false,
    };
    setConsentPreferences(fullPrefs);
    setIsVisible(false);
  };

  const handleSavePrefs = () => {
    setConsentPreferences(prefs);
    setIsVisible(false);
  };

  const toggleCategory = (cat: keyof typeof prefs) => {
    if (cat === 'strictly-necessary') return;
    setPrefs(p => ({ ...p, [cat]: !p[cat] }));
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className={styles.overlay}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <motion.div
            className={styles.banner}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 20, opacity: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            <AnimatePresence mode="wait">
              {view === 'banner' && (
                <motion.div
                  key="banner-view"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <h2 className={styles.title}>Your Privacy Matters</h2>
                  <p className={styles.desc}>
                    We use cookies and similar technologies to enhance your experience, analyse
                    usage, and support our marketing efforts. Please choose your preferences below.
                  </p>

                  <div className={styles.actions}>
                    <button
                      className={styles.btnReject}
                      onClick={handleRejectAll}
                    >
                      Reject All
                    </button>
                    <button
                      className={styles.btnCustomise}
                      onClick={() => setView('details')}
                    >
                      Customise
                    </button>
                    <button
                      className={styles.btnAccept}
                      onClick={handleAcceptAll}
                    >
                      Accept All
                    </button>
                  </div>
                </motion.div>
              )}

              {view === 'details' && (
                <motion.div
                  key="details-view"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <h2 className={styles.title}>Cookie Preferences</h2>

                  <div className={styles.categories}>
                    {(Object.keys(CONSENT_CATEGORIES) as Array<keyof typeof CONSENT_CATEGORIES>).map(cat => (
                      <label key={cat} className={styles.category}>
                        <input
                          type="checkbox"
                          checked={prefs[cat as keyof typeof prefs]}
                          onChange={() => toggleCategory(cat as keyof typeof prefs)}
                          disabled={cat === 'strictly-necessary'}
                          className={styles.checkbox}
                        />
                        <div className={styles.categoryContent}>
                          <span className={styles.categoryTitle}>
                            {CONSENT_CATEGORIES[cat].title}
                          </span>
                          <span className={styles.categoryDesc}>
                            {CONSENT_CATEGORIES[cat].description}
                          </span>
                        </div>
                      </label>
                    ))}
                  </div>

                  <div className={styles.actions}>
                    <button
                      className={styles.btnBack}
                      onClick={() => setView('banner')}
                    >
                      Back
                    </button>
                    <button
                      className={styles.btnAccept}
                      onClick={handleSavePrefs}
                    >
                      Save Preferences
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
