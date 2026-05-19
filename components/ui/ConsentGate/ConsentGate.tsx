'use client';

import { useEffect, useState } from 'react';
import Script from 'next/script';
import { getConsentPreferences, isConsentGiven } from '@/lib/consent';
import { ConsentCategory } from '@/lib/consent-types';

interface ConsentGateProps {
  category: ConsentCategory;
  children?: React.ReactNode;
  onConsent?: () => void;
  onNoConsent?: () => void;
}

export function ConsentGateScript({
  category,
  src,
  strategy = 'lazyOnload',
  onConsent,
}: ConsentGateProps & {
  src: string;
  strategy?: 'beforeInteractive' | 'afterInteractive' | 'lazyOnload' | 'worker';
}) {
  const [hasConsent, setHasConsent] = useState<boolean | null>(null);

  useEffect(() => {
    const checkConsent = () => {
      const allowed = isConsentGiven(category);
      setHasConsent(allowed);
      if (allowed && onConsent) onConsent();
    };

    checkConsent();

    const handleConsentUpdate = () => checkConsent();
    window.addEventListener('consent-preferences-updated', handleConsentUpdate);
    return () => window.removeEventListener('consent-preferences-updated', handleConsentUpdate);
  }, [category, onConsent]);

  if (hasConsent === null || !hasConsent) return null;

  return <Script src={src} strategy={strategy} />;
}

export function ConsentGateContent({ category, children, onConsent, onNoConsent }: ConsentGateProps) {
  const [hasConsent, setHasConsent] = useState<boolean | null>(null);

  useEffect(() => {
    const checkConsent = () => {
      const allowed = isConsentGiven(category);
      setHasConsent(allowed);
      if (allowed && onConsent) {
        onConsent();
      } else if (!allowed && onNoConsent) {
        onNoConsent();
      }
    };

    checkConsent();

    const handleConsentUpdate = () => checkConsent();
    window.addEventListener('consent-preferences-updated', handleConsentUpdate);
    return () => window.removeEventListener('consent-preferences-updated', handleConsentUpdate);
  }, [category, onConsent, onNoConsent]);

  if (hasConsent === null || !hasConsent) return null;

  return children;
}
