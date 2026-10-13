// ===== Form error =====
// The error message under a form, read out by screen readers when it changes.
// Always rendered and keeps its height when empty, so the form does not jump
// when an error appears.
// message: the error to show, or an empty string

import styles from "./FormError.module.css";

const FormError = ({ message }) => (
  <p className={styles.error} role="alert">
    {message}
  </p>
);

export default FormError;
