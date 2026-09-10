import Image from 'next/image';
import Link from 'next/link';
import BookConsultationButton from '@/components/ui/BookConsultationButton';
import styles from './V4Spread.module.css';

export type Spread = {
  /** Small uppercase kicker above the headline. */
  eyebrow: string;
  headline: string;
  /** One or two short paragraphs. */
  body: string[];
  /** Omit `href` to open the site's booking modal instead of navigating. */
  cta: { label: string; href?: string };
  image: { src: string; alt: string };
  /** Which side the image sits on at desktop. The page alternates it. */
  imageSide: 'left' | 'right';
  tone?: 'paper' | 'paperAlt' | 'ink';
};

type Props = Spread & { id?: string };

/**
 * One magazine spread: a 1:1 image column beside a text column.
 *
 * This is the page's only section component. Every spread on /v4 is an
 * instance of it, which is the point of the layout: the template is
 * fixed and the rhythm comes from alternating which side the image sits
 * on. Nothing is layered over the photograph, so contrast is a property
 * of the ground rather than of the crop.
 *
 * The image is always rendered into a 1:1 box with object-fit cover, so
 * source images of any ratio centre-crop to a square rather than
 * letterboxing.
 *
 * Markup order is image then text, which is the order mobile stacks in.
 * Desktop reorders the two columns visually; the reading order carries
 * no meaning here, so nothing is lost to assistive technology.
 *
 * Every spread sits below the hero, so every spread image is lazy and
 * every heading is an h2; the page's h1 lives in V4Hero.
 */
export default function V4Spread({
  eyebrow,
  headline,
  body,
  cta,
  image,
  imageSide,
  tone = 'paper',
  id,
}: Props) {
  const headingId = id ? `${id}-title` : undefined;

  return (
    <section
      id={id}
      className={[
        styles.spread,
        styles[tone],
        imageSide === 'right' ? styles.imageRight : styles.imageLeft,
        tone === 'ink' ? 'v4-onInk' : '',
      ]
        .filter(Boolean)
        .join(' ')}
      data-section-theme={tone === 'ink' ? 'dark' : 'light'}
      aria-labelledby={headingId}
    >
      {/* The section paints the ground edge to edge; this inner grid is
          what carries the column split and the max-width, so a capped
          spread never leaves the page ground showing beside it. */}
      <div className={styles.inner}>
        <div className={styles.media}>
          <div className={styles.plate}>
            <Image
              src={image.src}
              alt={image.alt}
              fill
              loading="lazy"
              quality={75}
              sizes="(max-width: 899px) 100vw, 48vw"
              className={styles.image}
            />
          </div>
        </div>

        <div className={styles.text}>
          <div className={styles.textInner}>
            <p className={styles.eyebrow}>{eyebrow}</p>

            <h2 id={headingId} className={styles.headline}>
              {headline}
            </h2>

            <div className={styles.body}>
              {body.map((para) => (
                <p key={para} className={styles.para}>
                  {para}
                </p>
              ))}
            </div>

            <div className={styles.actions}>
              {cta.href ? (
                <Link href={cta.href} className="v4-cta">
                  {cta.label}
                </Link>
              ) : (
                <BookConsultationButton className="v4-cta">
                  {cta.label}
                </BookConsultationButton>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
