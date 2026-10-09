import { useId } from "react";
import styles from "./TextField.module.css";

// ===== Text field =====
// A labelled, controlled input. The parent owns the value and
// receives every change through onChange.

const TextField = ({ label, type = "text", value, onChange, autoComplete }) => {
  // Unique id that connects the label to the input
  const id = useId();

  return (
    <div className={styles.field}>
      <label htmlFor={id} className={styles.label}>
        {label}
      </label>

      <input
        id={id}
        type={type}
        className={styles.input}
        value={value}
        autoComplete={autoComplete}
        required
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
};

export default TextField;
