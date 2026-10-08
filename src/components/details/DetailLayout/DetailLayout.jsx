import { Link } from "react-router";
import { ArrowLeft } from "lucide-react";
import styles from "./DetailLayout.module.css";

// ===== Detail layout =====
// Shared frame for detail pages: page width, back link and spacing between sections.

const DetailLayout = ({ children }) => (
  <article className={`container ${styles.layout}`}>
    <Link to="/explore" className={styles.backLink}>
      <ArrowLeft size={18} aria-hidden="true" />
      Back to Explore
    </Link>

    {children}
  </article>
);

export default DetailLayout;
