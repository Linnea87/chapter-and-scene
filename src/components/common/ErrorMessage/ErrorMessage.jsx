import styles from "./ErrorMessage.module.css";

// ===== Error message =====
// User-friendly error with an optional retry button. Technical details are never shown.

const ErrorMessage = ({
  title = "Something went wrong",
  message = "We couldn't load this content. Please try again.",
  onRetry,
}) => {
  return (
    <div className={styles.error} role="alert">
      <h2 className={styles.title}>{title}</h2>
      <p className={styles.message}>{message}</p>

      {/* The button is only shown when there is something to retry */}
      {onRetry && (
        <button type="button" className={styles.button} onClick={onRetry}>
          Try again
        </button>
      )}
    </div>
  );
};

export default ErrorMessage