'use client';

import { FaStar } from 'react-icons/fa';
import { CamperReview } from '@/types/types';
import styles from './ReviewsList.module.css';

interface ReviewsListProps {
  reviews: CamperReview[];
}

export default function ReviewsList({ reviews }: ReviewsListProps) {
  if (!reviews || reviews.length === 0) {
    return <p className={styles.noReviews}>No reviews yet.</p>;
  }

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Reviews</h2>
      <ul className={styles.list}>
        {reviews.map((review) => {
          const avatarInitial = review.reviewer_name
            ? review.reviewer_name.charAt(0).toUpperCase()
            : 'U';

          return (
            <li key={review.id} className={styles.reviewItem}>
              <div className={styles.header}>
                <div className={styles.avatar}>{avatarInitial}</div>
                <div className={styles.meta}>
                  <p className={styles.name}>{review.reviewer_name}</p>
                  <div className={styles.stars}>
                    {[1, 2, 3, 4, 5].map((star) => (
                      <FaStar
                        key={star}
                        size={16}
                        className={
                          star <= review.reviewer_rating
                            ? styles.starActive
                            : styles.starInactive
                        }
                      />
                    ))}
                  </div>
                </div>
              </div>
              <p className={styles.comment}>{review.comment}</p>
            </li>
          );
        })}
      </ul>
    </div>
  );
}