'use client';

import Link from 'next/link';
import Image from 'next/image';
import { m } from 'framer-motion';
import type { BlogPost } from '@/lib/blog';
import styles from './BlogCard.module.css';

interface BlogCardProps {
  post: BlogPost;
  variant?: 'default' | 'featured';
}

export default function BlogCard({ post, variant = 'default' }: BlogCardProps) {
  return (
    <m.article
      className={`${styles.card} ${styles[variant]}`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      {/* Stretched invisible link makes the whole card clickable */}
      <Link href={`/blog/${post.slug}`} className={styles.cardStretch} aria-label={post.title} tabIndex={-1} />

      {/* Image */}
      <div className={styles.imageWrap}>
        <Image
          src={post.heroImage}
          alt={post.heroImageAlt}
          fill
          className={styles.image}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
      </div>

      {/* Content */}
      <div className={styles.content}>
        <Link href={`/blog/${post.slug}`} className={styles.titleLink}>
          <h3 className={styles.title}>{post.title}</h3>
        </Link>
        <p className={styles.excerpt}>{post.excerpt}</p>

        {/* Metadata */}
        <div className={styles.meta}>
          <span className={styles.author}>Reviewed by Dr. Sumit Varmani</span>
          <span className={styles.separator}>•</span>
          <span className={styles.readTime}>{post.readingTime} min read</span>
          <span className={styles.separator}>•</span>
          <span className={styles.date}>
            {new Date(post.publishedAt).toLocaleDateString('en-GB', {
              year: 'numeric',
              month: 'short',
              day: 'numeric',
            })}
          </span>
        </div>

        {/* Tags */}
        <div className={styles.tags}>
          {post.tags.slice(0, 3).map((tag) => (
            <span key={tag} className={styles.tag}>
              #{tag}
            </span>
          ))}
        </div>

        {/* Read More button */}
        <Link href={`/blog/${post.slug}`} className={styles.readMore}>
          Read More
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </Link>
      </div>
    </m.article>
  );
}
