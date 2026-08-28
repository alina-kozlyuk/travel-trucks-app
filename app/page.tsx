import Image from 'next/image';
import Link from 'next/link';
import heroBg from '@/public/hero-bg.jpg';
import styles from './page.module.css';

export default function HomePage() {
  return (
    <section className={styles.hero}>
      <Image
        src={heroBg}
        alt=""
        fill
        priority
        sizes="100vw"
        className={styles.bgImage}
      />

      <div className={styles.overlay} />

      <div className="container">
        <div className={styles.content}>
          <h1 className={styles.title}>Campers of your dreams</h1>

          <p className={styles.subtitle}>
            You can find everything you want in our catalog
          </p>

          <Link href="/catalog" className={styles.button}>
            View Now
          </Link>
        </div>
      </div>
    </section>
  );
}