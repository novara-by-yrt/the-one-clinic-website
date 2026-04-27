'use client';

/**
 * Injects brand-page-scoped style overrides.
 * Targets [data-brand] so nothing leaks to the rest of the site.
 *
 * Specificity notes:
 *  [data-brand] h2  = (0,1,1) — beats CSS-module class (0,1,0) and
 *  globals.css element rule (0,0,1), so Playfair cascades cleanly
 *  without !important.
 */
export default function BrandGlobalStyle() {
  return (
    <style>{`
      /* ── Heading font: Playfair Display ─────────────────── */
      [data-brand] h1,
      [data-brand] h2,
      [data-brand] h3 {
        font-family: var(--font-playfair, Georgia, 'Times New Roman', serif);
      }

      /* Playfair reads best with slightly tighter tracking */
      [data-brand] h1 { letter-spacing: -0.035em; }
      [data-brand] h2 { letter-spacing: -0.03em;  }
      [data-brand] h3 { letter-spacing: -0.02em;  }

      /* ── Body text contrast lift ─────────────────────────── */
      [data-brand] p {
        color: #4B4B4B;
      }

      /* ── Remove inner section border-top — panel provides
         the visual separation already ──────────────────────── */
      [data-brand] section {
        border-top: none !important;
      }
    `}</style>
  );
}
