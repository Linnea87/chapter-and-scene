import Button from "../Button/Button";
import ButtonLink from "../ButtonLink/ButtonLink";
import styles from "./StatusMessage.module.css";

// ===== Status message =====
// A centered message with an optional icon and action.
// Used for errors (role "alert"), empty results and not found pages (role "status").
// Technical error details are never shown.

const StatusMessage = ({
  title,
  message,
  icon: Icon,
  titleAs: Title = "h2",
  actionLabel,
  onAction,
  actionTo,
  role = "status",
}) => (
  <div className={styles.status} role={role}>
    {Icon && <Icon className={styles.icon} size={48} aria-hidden="true" />}

    <Title className={styles.title}>{title}</Title>
    <p className={styles.message}>{message}</p>

    {/* An action either runs code (onAction) or goes to another page (actionTo) */}
    {onAction && <Button onClick={onAction}>{actionLabel}</Button>}
    {actionTo && <ButtonLink to={actionTo}>{actionLabel}</ButtonLink>}
  </div>
);

export default StatusMessage;