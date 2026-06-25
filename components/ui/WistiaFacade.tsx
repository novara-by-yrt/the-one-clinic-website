'use client';

import { useState, useEffect } from 'react';
import styles from './WistiaFacade.module.css';

/**
 * Lightweight click-to-play wrapper for a Wistia video.
 *
 * Until the visitor clicks, only a poster image and a play button render —
 * none of Wistia's heavy player JavaScript is requested. On click the real
 * embed iframe is mounted with autoPlay, so the click that loads the player
 * also starts the video. This keeps the multiple homepage videos off the
 * critical path (Total Blocking Time / unused JS) while preserving layout via
 * the passed-through iframe className.
 *
 * Poster quality: Wistia's `/swatch` is only a tiny blur-up placeholder, so it
 * renders instantly but looks soft at card size. We therefore start with the
 * swatch and, once mounted, fetch the real full-resolution thumbnail via
 * Wistia's public oEmbed endpoint and upgrade to it — giving a crisp poster
 * with no extra player JavaScript. If the fetch fails for any reason the
 * swatch simply remains, so there is no hard dependency.
 */
const swatchUrl = (id: string) =>
  `https://fast.wistia.com/embed/medias/${id}/swatch`;

export default function WistiaFacade({
  videoId,
  title,
  iframeClassName,
}: {
  videoId: string;
  title: string;
  iframeClassName?: string;
}) {
  const [playing, setPlaying] = useState(false);
  const [poster, setPoster] = useState(() => swatchUrl(videoId));

  useEffect(() => {
    let cancelled = false;

    fetch(
      `https://fast.wistia.com/oembed.json?url=${encodeURIComponent(
        `https://fast.wistia.com/medias/${videoId}`,
      )}`,
    )
      .then((r) => (r.ok ? r.json() : null))
      .then(
        (
          data: { thumbnail_url?: string; width?: number; height?: number } | null,
        ) => {
          const thumb = data?.thumbnail_url;
          if (cancelled || !thumb) return;

          // Request a crisp poster at a bounded width, preserving the video's
          // aspect ratio (16:9 brand videos vs 9:16 testimonials) from the
          // dimensions oEmbed reports. 1280px wide is sharp on every card
          // without pulling an oversized image.
          const targetW = 1280;
          const ratio =
            data?.width && data?.height ? data.height / data.width : 0.5625;
          const targetH = Math.round(targetW * ratio);
          const sharp = thumb.replace(
            /image_crop_resized=\d+x\d+/,
            `image_crop_resized=${targetW}x${targetH}`,
          );

          // Preload before swapping so the poster never flashes blank/broken.
          const img = new Image();
          img.onload = () => {
            if (!cancelled) setPoster(sharp);
          };
          img.src = sharp;
        },
      )
      .catch(() => {
        /* keep the swatch fallback */
      });

    return () => {
      cancelled = true;
    };
  }, [videoId]);

  if (playing) {
    return (
      <iframe
        src={`https://fast.wistia.net/embed/iframe/${videoId}?web_component=true&seo=true&autoPlay=true`}
        title={title}
        allow="autoplay; fullscreen"
        allowFullScreen
        frameBorder="0"
        scrolling="no"
        className={iframeClassName}
      />
    );
  }

  return (
    <button
      type="button"
      className={styles.facade}
      onClick={() => setPlaying(true)}
      aria-label={`Play video: ${title}`}
      style={{ backgroundImage: `url(${poster})` }}
    >
      <span className={styles.overlay} aria-hidden="true" />
      <span className={styles.playBtn} aria-hidden="true">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
          <path d="M8 5v14l11-7z" />
        </svg>
      </span>
    </button>
  );
}
