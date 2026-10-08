import StatusMessage from "../StatusMessage/StatusMessage";

// ===== Load error =====
// Shown when data could not be loaded. Always offers a retry.

const LoadError = ({ title, onRetry }) => (
  <StatusMessage
    role="alert"
    title={title}
    message="Check your connection and try again."
    actionLabel="Try again"
    onAction={onRetry}
  />
);

export default LoadError;
