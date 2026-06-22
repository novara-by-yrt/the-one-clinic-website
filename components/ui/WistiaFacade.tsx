'use client';

import { useState } from 'react';
import styles from './WistiaFacade.module.css';

/**
 * Lightweight click-to-play wrapper for a Wistia video.
 *
 * Until the visitor clicks, only a poster (Wistia's tiny blurred swatch) and a
 * play button render — none of Wistia's heavy player JavaScript is requested.
 * On click the real embed iframe is mounted with autoPlay, so the click that
 * loaded the player also starts the video. This keeps the multiple homepage
 * testimonial videos off the critical path (Total Blocking Time / unused JS)
 * while preserving identical layout via the passed-through iframe className.
 */
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
      style={{ backgroundImage: `url(https://fast.wistia.com/embed/medias/${videoId}/swatch)` }}
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
