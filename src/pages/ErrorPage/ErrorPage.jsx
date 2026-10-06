import { TriangleAlert } from "lucide-react";
import StatusMessage from "../../components/common/StatusMessage/StatusMessage";
import styles from "./ErrorPage.module.css";

// ===== Error page =====
// Shown by the router when a page throws an error while rendering.

const ErrorPage = () => (
  <main className={styles.page}>
    <StatusMessage
      role="alert"
      icon={TriangleAlert}
      titleAs="h1"
      title="Something went wrong"
      message="The page could not be loaded. Please try again."
      actionLabel="Back to home"
      actionTo="/"
    />
  </main>
);

export default ErrorPage;
