'use client';

import Image from 'next/image';
import { FiX } from 'react-icons/fi';
import styles from './EmptyState.module.css';

interface EmptyStateProps {
  onResetFilters?: () => void;
}

export default function EmptyState({ onResetFilters }: EmptyStateProps) {
  return (
    <div className={styles.container}>
      {/* Ілюстрація з папки public */}
      <div className={styles.imageWrapper}>
        <Image
          src="/no-campers-found.svg" // Поклади файл із зображенням у папку public/
          alt="No campers found"
          width={360}
          height={200}
          priority
          className={styles.image}
        />
      </div>

      <h3 className={styles.title}>No campers found</h3>
      
      <p className={styles.message}>
        We couldnʼt find any campers that match your filters. Try adjusting your search or clearing some filters.
      </p>

      <div className={styles.actions}>
        {onResetFilters && (
          <button
            type="button"
            onClick={onResetFilters}
            className={styles.clearBtn}
          >
            <FiX size={18} />
            <span>Clear filters</span>
          </button>
        )}

        <button
          type="button"
          onClick={onResetFilters}
          className={styles.viewAllBtn}
        >
          View all campers
        </button>
      </div>
    </div>
  );
}