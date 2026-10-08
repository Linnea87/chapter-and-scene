import styles from "./MenuToggle.module.css";

const MenuToggle = ({ isOpen, onToggle }) => {
  const toggleClass = isOpen
    ? `${styles.toggle} ${styles.open}`
    : styles.toggle;

// aria-controls points to the id of the nav in NavMenu
  return (
    <button
      type="button"
      className={toggleClass}
      onClick={onToggle}
      aria-expanded={isOpen}
      aria-controls="main-navigation"
      aria-label={isOpen ? "Close menu" : "Open menu"}
    >
      {/* Three bars that turn into an X when the menu is open */}
      <span className={styles.bar} />
      <span className={styles.bar} />
      <span className={styles.bar} />
    </button>
  );
};

export default MenuToggle;
