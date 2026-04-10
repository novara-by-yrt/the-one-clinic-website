'use client';

import Link from 'next/link';
import styles from './Breadcrumb.module.css';

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  theme?: 'dark' | 'light';
}

export default function Breadcrumb({ items, theme = 'dark' }: BreadcrumbProps) {
  return (
    <nav
      aria-label="Breadcrumb"
      className={[styles.nav, styles[theme]].filter(Boolean).join(' ')}
      itemScope
      itemType="https://schema.org/BreadcrumbList"
    >
      <ol className={styles.list} role="list">
        {/* Home */}
        <li
          className={styles.item}
          itemProp="itemListElement"
          itemScope
          itemType="https://schema.org/ListItem"
        >
          <meta itemProp="position" content="1" />
          <Link href="/" className={styles.link} itemProp="item">
            <svg
              width="13"
              height="13"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M3 9.5L12 3l9 6.5V20a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9.5z"/>
              <path d="M9 21V12h6v9"/>
            </svg>
            <span itemProp="name" className={styles.srOnly}>Home</span>
          </Link>
          <span className={styles.sep} aria-hidden="true">
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M4 2.5l4 3.5-4 3.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </span>
        </li>

        {/* Additional items */}
        {items.map((item, i) => {
          const pos = i + 2; // position 1 is Home
          const isLast = i === items.length - 1;
          return (
            <li
              key={item.label}
              className={styles.item}
              itemProp="itemListElement"
              itemScope
              itemType="https://schema.org/ListItem"
            >
              <meta itemProp="position" content={String(pos)} />
              {item.href && !isLast ? (
                <Link href={item.href} className={styles.link} itemProp="item">
                  <span itemProp="name">{item.label}</span>
                </Link>
              ) : (
                <span
                  className={styles.current}
                  aria-current={isLast ? 'page' : undefined}
                  itemProp="name"
                >
                  {item.label}
                </span>
              )}
              {!isLast && (
                <span className={styles.sep} aria-hidden="true">
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <path d="M4 2.5l4 3.5-4 3.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
