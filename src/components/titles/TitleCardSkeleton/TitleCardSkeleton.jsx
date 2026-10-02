import styles from "./TitleCardSkeleton.module.css";

// ===== Title card skeleton =====
// Placeholder with the same shape as TitleCard, shown while titles are loading

const TitleCardSkeleton = () => {
  return (
    <div className={styles.card} aria-hidden="true">
      <div className={`${styles.block} ${styles.poster}`} />
      <div className={`${styles.block} ${styles.title}`} />
      <div className={`${styles.block} ${styles.meta}`} />
    </div>
  );
};

export default TitleCardSkeleton