'use client';

import { useState } from 'react';
import styles from './Accordion.module.css';

type AccordionItem = {
  question: string;
  answer: string;
};

type Props = {
  items: AccordionItem[];
  theme?: 'light' | 'dark';
  allowMultiple?: boolean;
};

export default function Accordion({
  items,
  theme = 'light',
  allowMultiple = false,
}: Props) {
  const [openIndexes, setOpenIndexes] = useState<Set<number>>(new Set());

  function toggle(index: number) {
    setOpenIndexes((prev) => {
      const next = new Set(prev);
      if (next.has(index)) {
        next.delete(index);
      } else {
        if (!allowMultiple) next.clear();
        next.add(index);
      }
      return next;
    });
  }

  return (
    <div className={`${styles.accordion} ${styles[theme]}`} role="list">
      {items.map((item, i) => {
        const isOpen = openIndexes.has(i);
        const headingId = `accordion-heading-${i}`;
        const panelId = `accordion-panel-${i}`;

        return (
          <div
            key={i}
            className={`${styles.item} ${isOpen ? styles.open : ''}`}
            role="listitem"
          >
            <h3 className={styles.heading}>
              <button
                id={headingId}
                className={styles.trigger}
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => toggle(i)}
              >
                <span className={styles.question}>{item.question}</span>
                <span className={styles.icon} aria-hidden="true">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M3 6L8 11L13 6"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
              </button>
            </h3>

            <div
              id={panelId}
              role="region"
              aria-labelledby={headingId}
              className={styles.body}
            >
              <div className={styles.bodyInner}>
                <p className={styles.answer}>{item.answer}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
