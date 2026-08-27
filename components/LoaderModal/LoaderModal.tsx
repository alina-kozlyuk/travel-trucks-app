'use client';

import styles from './LoaderModal.module.css';

interface LoaderModalProps {
  title?: string;
  message?: string;
}

export default function LoaderModal({
  title = 'Loading trucks...',
  message = 'Please wait while we fetch the best travel trucks for you',
}: LoaderModalProps) {
  return (
    <div className={styles.backdrop}>
      <div className={styles.modal}>
        <div className={styles.spinner}></div>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.message}>{message}</p>
      </div>
    </div>
  );
}