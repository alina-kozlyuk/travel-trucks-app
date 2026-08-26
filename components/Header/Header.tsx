'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';
import styles from './Header.module.css';

export default function Header() {
  const pathname = usePathname();

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <Link href="/" aria-label="TravelTrucks Home">
          <svg className={styles.logo} width="136" height="16">
            <use href="/sprite.svg#icon-logo" />
          </svg>
        </Link>

        <nav className={styles.nav}>
          <Link
            href="/"
            className={clsx(styles.link, pathname === '/' && styles.active)}
          >
            Home
          </Link>
          <Link
            href="/catalog"
            className={clsx(styles.link, pathname.startsWith('/catalog') && styles.active)}
          >
            Catalog
          </Link>
        </nav>
      </div>
    </header>
  );
}