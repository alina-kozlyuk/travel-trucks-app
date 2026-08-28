import styles from './loading.module.css';

export default function Loading() {
  return (
    <div className={styles.loadingWrapper}>
      <div className={styles.spinnerContainer}>
        <div className={styles.spinner}></div>
        <div className={styles.pulseBg}></div>
      </div>
      <p className={styles.text}>Loading...</p>
    </div>
  );
}