import BackLink from "../../ui/navigation/BackLink/BackLink";
import styles from "./DetailLayout.module.css";

// ===== Detail layout =====
// Shared frame for detail pages: page width, back link and spacing between sections.

const DetailLayout = ({ children }) => (
  <article className={`container ${styles.layout}`}>
    <BackLink to="/explore" className={styles.backLink}>
      Back to Explore
    </BackLink>

    {children}
  </article>
);

export default DetailLayout;
