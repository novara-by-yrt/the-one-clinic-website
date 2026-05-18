export type ConsentCategory = 'strictly-necessary' | 'functional' | 'analytics' | 'marketing';

export interface ConsentPreferences {
  'strictly-necessary': boolean;
  functional: boolean;
  analytics: boolean;
  marketing: boolean;
  acceptedAt: number;
  expiresAt: number;
}

export const CONSENT_CATEGORIES = {
  'strictly-necessary': {
    title: 'Strictly Necessary',
    description: 'Essential for website functionality. Cannot be disabled.',
    mandatory: true,
  },
  functional: {
    title: 'Functional',
    description: 'Enable enhanced functionality and personalisation.',
    mandatory: false,
  },
  analytics: {
    title: 'Analytics',
    description: 'Help us understand how you use the site to improve it.',
    mandatory: false,
  },
  marketing: {
    title: 'Marketing',
    description: 'Used to deliver personalised ads and marketing content.',
    mandatory: false,
  },
} as const;

export const CONSENT_SCRIPTS: Record<ConsentCategory, string[]> = {
  'strictly-necessary': [
    'form_embed.js', // LeadPipeline (required for functionality)
  ],
  functional: [
    'player.js', // Wistia
    'form_embed.js', // LeadPipeline forms
  ],
  analytics: [],
  marketing: [
    'facebook', // Facebook social links/pixel
  ],
};

// 12 months in milliseconds per ICO guidance
export const CONSENT_EXPIRY_MS = 12 * 30 * 24 * 60 * 60 * 1000;
