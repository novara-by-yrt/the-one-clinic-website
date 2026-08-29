import type { ReactNode, ElementType } from 'react';
import styles from './V1Section.module.css';

export type V1Surface = 'black' | 'gray' | 'white';

/**
 * The repeating surface rhythm for the v1 page: black, gray, white, and
 * around again. Sections take their index rather than a colour so the
 * order stays correct if one is inserted or moved.
 */
export const V1_RHYTHM: V1Surface[] = ['black', 'gray', 'white'];

export function surfaceAt(index: number): V1Surface {
  return V1_RHYTHM[index % V1_RHYTHM.length];
}

export default function V1Section({
  surface,
  children,
  id,
  className,
  innerClassName,
  as: Tag = 'section',
  wide = false,
  flush = false,
  seam = false,
  ambient = true,
  label,
}: {
  surface: V1Surface;
  children: ReactNode;
  id?: string;
  className?: string;
  innerClassName?: string;
  as?: ElementType;
  /** Let the content span the full viewport width (marquees, full-bleed media). */
  wide?: boolean;
  /** Drop the vertical padding — for sections that own their own rhythm. */
  flush?: boolean;
  /** Hairline rule on the top edge, for gray/white boundaries. */
  seam?: boolean;
  ambient?: boolean;
  label?: string;
}) {
  return (
    <Tag
      id={id}
      aria-label={label}
      data-section-theme={surface === 'black' ? 'dark' : 'light'}
      className={[
        styles.section,
        `v1-surface-${surface}`,
        flush && styles.flush,
        seam && styles.seam,
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      {ambient && <div className={styles.ambient} aria-hidden="true" />}
      <div
        className={[styles.inner, wide && styles.wide, innerClassName]
          .filter(Boolean)
          .join(' ')}
      >
        {children}
      </div>
    </Tag>
  );
}
