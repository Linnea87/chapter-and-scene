import BackLink from "../../ui/navigation/BackLink/BackLink";
import styles from "./DetailLayout.module.css";

// ===== Detail layout =====
// Shared frame for detail pages: page width, back link and spacing between sections.

const DetailLayout = ({ children }) => (
  <article className={`container ${styles.layout}`}>
    {/* Only the arrow is shown over the backdrop, the text is for screen readers */}
    <BackLink to="/explore" className={styles.backLink}>
      <span className="visually-hidden">Back to Explore</span>
    </BackLink>

    {children}
  </article>
);

export default DetailLayout;
