import { useId } from "react";
import { Search, X } from "lucide-react";
import IconButton from "../IconButton/IconButton";
import styles from "./SearchField.module.css";

// ===== Search field =====
// A controlled search input with a clear button.
// The parent owns the value and receives every change through onChange.

const SearchField = ({ label, value, onChange, placeholder }) => {
  // Unique id that connects the label to the input
  const id = useId();

  return (
    <div className={styles.field}>
      <label htmlFor={id} className="visually-hidden">
        {label}
      </label>

      <Search className={styles.icon} size={20} aria-hidden="true" />

      <input
        id={id}
        type="search"
        className={styles.input}
        value={value}
        placeholder={placeholder}
        autoComplete="off"
        onChange={(e) => onChange(e.target.value)}
      />

      {/* --- Clear button, only shown when there is text --- */}
      {value && (
        <IconButton
          icon={X}
          label="Clear search"
          className={styles.clear}
          onClick={() => onChange("")}
        />
      )}
    </div>
  );
};

export default SearchField;
