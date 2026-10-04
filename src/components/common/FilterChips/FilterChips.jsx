import styles from "./FilterChips.module.css";

// ===== Filter chips =====
// A reusable row of toggle buttons. The parent owns the selected option.
// options: [{ id, label }]

const FilterChips = ({ label, options, activeId, onChange }) => (
  <div role="group" aria-label={label}>
    <ul className={styles.list}>
      {options.map((option) => {
        const isActive = option.id === activeId;

        return (
          <li key={option.id}>
            <button
              type="button"
              className={isActive ? `${styles.chip} ${styles.active}` : styles.chip}
              aria-pressed={isActive}
              onClick={() => onChange(option.id)}
            >
              {option.label}
            </button>
          </li>
        );
      })}
    </ul>
  </div>
);

export default FilterChips;