import styles from "./Button.module.css";

// ===== Button =====
// Button used across the app, in three variants:
// "primary" (filled, the main action), "secondary" (outlined, less prominent)
// and "text" (no fill or outline, e.g. items in a menu),
// and two sizes: "medium" (default) and "small" (for repeated actions in lists).
// Other props (onClick, disabled, aria-*) are passed on to the <button>.

const Button = ({
  children,
  type = "button",
  variant = "primary",
  size = "medium",
  ...props
}) => (
  <button
    type={type}
    className={`${styles.button} ${styles[variant]} ${styles[size]}`}
    {...props}
  >
    {children}
  </button>
);

export default Button;
