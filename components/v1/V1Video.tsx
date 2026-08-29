'use client';

import { m } from 'framer-motion';
import WistiaFacade from '@/components/ui/WistiaFacade';
import { VIDEOS } from '@/components/brand/BrandVideoSection';
import { useTilt } from './useTilt';
import styles from './V1Video.module.css';

const EASE = [0.22, 1, 0.36, 1] as const;
const VIEW = { once: true, margin: '-70px 0px' };

function VideoCard({ video, index }: { video: { id: string; title: string }; index: number }) {
  const { ref, tiltProps } = useTilt<HTMLDivElement>({ max: 5, lift: 26 });

  return (
    <m.div
      className={styles.stage}
      initial={{ opacity: 0, y: 48, rotateX: -10 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
      viewport={VIEW}
      transition={{ duration: 0.9, delay: index * 0.14, ease: EASE }}
    >
      <div ref={ref} className={styles.card} {...tiltProps}>
        <div className={styles.frame}>
          <WistiaFacade
            videoId={video.id}
            title={video.title}
            iframeClassName={styles.embed}
          />
        </div>
        <div className={styles.sheen} aria-hidden="true" />
        <div className={styles.caption}>
          <span className={styles.capDot} aria-hidden="true" />
          <span className={styles.capText}>{video.title}</span>
        </div>
      </div>
    </m.div>
  );
}

export default function V1Video() {
  return (
    <div className={styles.grid}>
      {VIDEOS.map((video, i) => (
        <VideoCard key={video.id} video={video} index={i} />
      ))}
    </div>
  );
}
