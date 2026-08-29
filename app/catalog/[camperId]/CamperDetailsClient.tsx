'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useQuery } from '@tanstack/react-query';
import { FaStar, FaGasPump, FaCog } from 'react-icons/fa';
import { FiMapPin } from 'react-icons/fi';

import { Swiper as SwiperClass } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode, Navigation, Thumbs } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';

import { fetchCamperById, fetchCamperReviews } from '@/lib/api/clientApi';
import LoaderModal from '@/components/LoaderModal/LoaderModal';
import BookingForm from '@/components/BookingForm/BookingForm';
import ReviewsList from '@/components/ReviewsList/ReviewsList';
import { GalleryImage } from '@/types/types';
import styles from './CamperDetails.module.css';

interface Props {
  camperId: string;
}

export default function CamperDetailsClient({ camperId }: Props) {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperClass | null>(null);

  const { data: camper, isLoading: isCamperLoading } = useQuery({
    queryKey: ['camper', camperId],
    queryFn: () => fetchCamperById(camperId),
  });

  const { data: reviews = [] } = useQuery({
    queryKey: ['camperReviews', camperId],
    queryFn: () => fetchCamperReviews(camperId),
  });

  if (isCamperLoading || !camper) return <LoaderModal />;

  const formattedLocation = camper.location.split(', ').reverse().join(', ');

  const amenitiesList = Array.isArray(camper.amenities)
    ? camper.amenities
    : typeof camper.amenities === 'string'
    ? [camper.amenities]
    : [];

  const getImgUrl = (img: GalleryImage): string => {
    if (!img) return '';
    if (typeof img === 'string') return img;
    return img.original || img.thumb || '';
  };

  const isLoopEnabled = (camper.gallery?.length ?? 0) > 4;

  return (
    <div className="container">
      <div className={styles.pageGrid}>
        
        <div className={styles.galleryBlock}>

  <Swiper
    loop={isLoopEnabled}
    spaceBetween={10}
    navigation={true}
    thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }}
    modules={[FreeMode, Navigation, Thumbs]}
    className={styles.mainSwiper}
  >
    {camper.gallery?.map((img, idx) => (
      <SwiperSlide key={img.id || idx} className={styles.mainSlide}>
        <Image
          src={getImgUrl(img)}
          alt={`${camper.name} photo ${idx + 1}`}
          fill
          loading={idx === 0 ? 'eager' : 'lazy'}
          unoptimized
          sizes="(max-width: 768px) 100vw, 600px"
          className={styles.imageCover}
        />
      </SwiperSlide>
    ))}
  </Swiper>

  <Swiper
    onSwiper={setThumbsSwiper}
    loop={isLoopEnabled}
    spaceBetween={12}
    slidesPerView={4}
    freeMode={true}
    watchSlidesProgress={true}
    modules={[FreeMode, Navigation, Thumbs]}
    className={styles.thumbsSwiper}
  >
    {camper.gallery?.map((img, idx) => (
      <SwiperSlide key={img.id || idx} className={styles.thumbSlide}>
        <Image
          src={getImgUrl(img)}
          alt={`${camper.name} thumb ${idx + 1}`}
          fill
          loading="lazy"
          unoptimized
          sizes="150px"
          className={styles.imageCover}
        />
      </SwiperSlide>
    ))}
  </Swiper>
</div>

        <div className={styles.infoColumn}>
          <div className={styles.infoCard}>
            <h1 className={styles.title}>{camper.name}</h1>

            <div className={styles.metaRow}>
              <div className={styles.rating}>
                <FaStar className={styles.starIcon} size={16} />
                <span>{camper.rating} ({camper.totalReviews || 0} Reviews)</span>
              </div>
              <div className={styles.location}>
                <FiMapPin size={16} />
                <span>{formattedLocation}</span>
              </div>
            </div>

            <p className={styles.price}>€{camper.price}</p>
            <p className={styles.description}>{camper.description}</p>
          </div>

          <div className={styles.detailsCard}>
            <h2 className={styles.detailsTitle}>Vehicle details</h2>

            <div className={styles.badges}>
              <span className={styles.badge}><FaCog /> {camper.transmission}</span>
              <span className={styles.badge}><FaGasPump /> {camper.engine}</span>
              {amenitiesList.map((item) => (
                <span key={item} className={styles.badge}>
                  {item.toUpperCase()}
                </span>
              ))}
              <span className={styles.badge}>{camper.form}</span>
            </div>

            <div className={styles.devider}></div>

            <ul className={styles.specList}>
              <li><span>Form</span><span>{camper.form}</span></li>
              <li><span>Length</span><span>{camper.length}</span></li>
              <li><span>Width</span><span>{camper.width}</span></li>
              <li><span>Height</span><span>{camper.height}</span></li>
              <li><span>Tank</span><span>{camper.tank}</span></li>
              <li><span>Consumption</span><span>{camper.consumption}</span></li>
            </ul>
          </div>
        </div>

        <div className={styles.reviewsBlock}>
          <ReviewsList reviews={reviews} />
        </div>

        <div className={styles.bookingBlock}>
          <BookingForm camperId={camperId} />
        </div>

      </div>
    </div>
  );
}