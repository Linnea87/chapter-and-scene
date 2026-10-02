import styles from "./Loader.module.css";

// ===== Loader =====
// Spinner used while a single item is loading, e.g. a detail page

const Loader = ({ label = "Loading…" }) => {
  return (
    <div className={styles.loader} role="status">
      <span className={styles.spinner} aria-hidden="true" />
      <span className="visually-hidden">{label}</span>
    </div>
  );
};

export default Loader;
