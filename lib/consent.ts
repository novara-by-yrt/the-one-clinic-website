import { ConsentPreferences, CONSENT_EXPIRY_MS } from './consent-types';

const CONSENT_STORAGE_KEY = 'one-clinic-consent';

export function getConsentPreferences(): ConsentPreferences | null {
  if (typeof window === 'undefined') return null;

  try {
    const stored = localStorage.getItem(CONSENT_STORAGE_KEY);
    if (!stored) return null;

    const prefs = JSON.parse(stored) as ConsentPreferences;
    const now = Date.now();

    if (prefs.expiresAt < now) {
      localStorage.removeItem(CONSENT_STORAGE_KEY);
      return null;
    }

    return prefs;
  } catch {
    return null;
  }
}

export function setConsentPreferences(prefs: Omit<ConsentPreferences, 'acceptedAt' | 'expiresAt'>) {
  if (typeof window === 'undefined') return;

  const fullPrefs: ConsentPreferences = {
    ...prefs,
    acceptedAt: Date.now(),
    expiresAt: Date.now() + CONSENT_EXPIRY_MS,
  };

  localStorage.setItem(CONSENT_STORAGE_KEY, JSON.stringify(fullPrefs));
  window.dispatchEvent(new CustomEvent('consent-preferences-updated', { detail: fullPrefs }));
}

export function clearConsentPreferences() {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(CONSENT_STORAGE_KEY);
}

export function isConsentGiven(category: keyof Omit<ConsentPreferences, 'acceptedAt' | 'expiresAt'>): boolean {
  const prefs = getConsentPreferences();
  return prefs ? prefs[category] : category === 'strictly-necessary';
}
