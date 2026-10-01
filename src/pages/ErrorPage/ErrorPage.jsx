import { Link, useRouteError } from "react-router";
import styles from "./ErrorPage.module.css";

// ===== Error page =====
// Shown by the router when a page throws an error while rendering

const ErrorPage = () => {
  const error = useRouteError();

  // Logged for debugging, not shown to the user
  console.error(error);

  return (
    <main className={styles.page}>
      <h1>Something went wrong</h1>
      <p className={styles.message}>
        The page could not be loaded. Please try again.
      </p>
      <Link to="/" className={styles.link}>
        Back to home
      </Link>
    </main>
  );
};

export default ErrorPage;
