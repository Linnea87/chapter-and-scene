import styles from "./DetailColumns.module.css";

// ===== Detail columns =====
// Watch and read options: stacked on mobile, side by side on larger screens.

const DetailColumns = ({ children }) => (
  <div className={styles.columns}>{children}</div>
);

export default DetailColumns;
