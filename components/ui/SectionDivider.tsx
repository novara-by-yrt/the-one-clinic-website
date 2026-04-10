/**
 * SectionDivider
 * A gradient strip placed between two sections of different background
 * colours to create a smooth visual transition instead of a hard edge.
 *
 * Usage:
 *   <SectionDivider from="dark" to="light" />
 */

type Props = {
  from: 'dark' | 'light';
  to:   'dark' | 'light';
  /** Gradient height in px (default 32) */
  height?: number;
};

const COLOR = { dark: '#000000', light: '#ffffff' } as const;

export default function SectionDivider({ from, to, height = 32 }: Props) {
  // Same-colour neighbours need no divider — render nothing
  if (from === to) return null;

  return (
    <div
      aria-hidden="true"
      style={{
        display: 'block',
        height: `${height}px`,
        background: `linear-gradient(to bottom, ${COLOR[from]}, ${COLOR[to]})`,
        /* Overlap the 1 px border-top of the next section */
        marginTop:    '-1px',
        marginBottom: '-1px',
        flexShrink:    0,
        pointerEvents: 'none',
        position:      'relative',
        zIndex:        10,
      }}
    />
  );
}
