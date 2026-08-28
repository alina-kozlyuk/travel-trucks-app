import { Metadata } from 'next';
import Link from 'next/link';
import css from './not-found.module.css';

const BASE_URL = 'https://travel-trucks-app-navy.vercel.app';

export const metadata: Metadata = {
  title: "404 - Page not found | TravelTrucks",
  description: "The requested TravelTrucks page does not exist.",
  openGraph: {
    title: "404 - Page not found | TravelTrucks",
    description: "The requested TravelTrucks page does not exist.",
    url: `${BASE_URL}/404`,
    images: [
      {
        url: `${BASE_URL}/hero-bg.jpg`,
        width: 1200,
        height: 630,
        alt: 'TravelTrucks Preview',
      },
    ],
  },
};

const NotFound = () => {
  return (
    <div className={css.container}>
      <h2 className={css.title}>404</h2>
      <h2 className={css.subtitle}>Page Not Found</h2>
      <p className={css.description}>
        Sorry, the page you are looking for does not exist or has been moved.
      </p>
      <Link href="/" className={css.button}>
        Back to Home
      </Link>
    </div>
  );
};

export default NotFound;