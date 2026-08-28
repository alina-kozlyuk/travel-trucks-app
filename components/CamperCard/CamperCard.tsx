'use client';

import Image from 'next/image';
import Link from 'next/link';
import { 
  FiMapPin, 
  FiGrid, 
  FiWind, 
  FiTv, 
  FiCoffee 
} from 'react-icons/fi';
import { 
  FaStar, 
  FaGasPump, 
  FaCog, 
  FaShower 
} from 'react-icons/fa';
import { CamperListItem } from '@/types/types';
import styles from './CamperCard.module.css';

interface CamperCardProps {
  camper: CamperListItem;
}

export default function CamperCard({ camper }: CamperCardProps) {
  const formattedLocation = camper.location.split(', ').reverse().join(', ');

  const renderAmenityIcon = (amenity: string) => {
    switch (amenity) {
      case 'ac':
        return <FiWind size={20} />;
      case 'bathroom':
        return <FaShower size={20} />;
      case 'kitchen':
        return <FiCoffee size={20} />;
      case 'tv':
        return <FiTv size={20} />;
      default:
        return <FiGrid size={20} />;
    }
  };

  return (
    <div className={styles.card}>
      <div className={styles.imageWrapper}>
        <Image
          src={camper.coverImage}
          alt={camper.name}
          fill
          sizes="(max-width: 768px) 100vw, 290px"
          className={styles.image}
        />
      </div>

      <div className={styles.content}>
        <div className={styles.header}>
          <h2 className={styles.title}>{camper.name}</h2>
          <span className={styles.price}>€{camper.price}</span>
        </div>

        <div className={styles.subHeader}>
          <div className={styles.rating}>
            <FaStar className={styles.starIcon} size={16} />
            <span className={styles.ratingText}>
              {camper.rating}({camper.totalReviews} Reviews)
            </span>
          </div>

          <div className={styles.location}>
            <FiMapPin className={styles.mapIcon} size={16} />
            <span>{formattedLocation}</span>
          </div>
        </div>

        <p className={styles.description}>
          Embrace simplicity and freedom with the {camper.name} {camper.form.replace('_', ' ')} truck...
        </p>

        <ul className={styles.badges}>
          {camper.engine && (
            <li className={styles.badge}>
              <FaGasPump size={20} />
              <span className={styles.badgeText}>{camper.engine}</span>
            </li>
          )}

          {camper.transmission && (
            <li className={styles.badge}>
              <FaCog size={20} />
              <span className={styles.badgeText}>{camper.transmission}</span>
            </li>
          )}

          {camper.form && (
            <li className={styles.badge}>
              <FiGrid size={20} />
              <span className={styles.badgeText}>{camper.form.replace('_', ' ')}</span>
            </li>
          )}

          {camper.amenities?.slice(0, 2).map((amenity) => (
            <li key={amenity} className={styles.badge}>
              {renderAmenityIcon(amenity)}
              <span className={styles.badgeText}>{amenity}</span>
            </li>
          ))}
        </ul>

        <Link
          href={`/catalog/${camper.id}`}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.button}
        >
          Show more
        </Link>
      </div>
    </div>
  );
}