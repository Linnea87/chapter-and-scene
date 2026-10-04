import Button from "../Button/Button";
import styles from "./StatusMessage.module.css";

// ===== Status message =====
// A centered message with an optional action button.
// Used for errors (role "alert") and empty results (role "status").
// Technical error details are never shown.

const StatusMessage = ({ title, message, actionLabel, onAction, role = "status" }) => (
  <div className={styles.status} role={role}>
    <h2 className={styles.title}>{title}</h2>
    <p className={styles.message}>{message}</p>

    {/* The button is only shown when there is an action */}
    {onAction && <Button onClick={onAction}>{actionLabel}</Button>}
  </div>
);

export default StatusMessage;
