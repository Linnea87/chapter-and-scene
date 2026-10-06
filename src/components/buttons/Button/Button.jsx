import styles from "./Button.module.css";

// ===== Button =====
// Primary button used across the app.
// Other props (onClick, disabled, aria-*) are passed on to the <button>.

const Button = ({ children, type = "button", ...props }) => (
  <button type={type} className={styles.button} {...props}>
    {children}
  </button>
);

export default Button;
