import { CATEGORIES } from "../../../features/explore/exploreConfig";
import styles from "./CategoryFilter.module.css";

// ===== Category filter =====
// A row of chips. The parent owns the selected category and passes it in.

const CategoryFilter = ({ activeId, onChange }) => (
  <div role="group" aria-label="Filter by category">
    <ul className={styles.list}>
      {CATEGORIES.map((category) => {
        const isActive = category.id === activeId;

        return (
          <li key={category.id}>
            <button
              type="button"
              className={
                isActive ? `${styles.chip} ${styles.active}` : styles.chip
              }
              aria-pressed={isActive}
              onClick={() => onChange(category.id)}
            >
              {category.label}
            </button>
          </li>
        );
      })}
    </ul>
  </div>
);

export default CategoryFilter;
