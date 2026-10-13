// ===== Detail layout =====
// Shared frame for detail pages: page width and spacing between sections.
// No back link: the header icons and the browser's back button lead back.

import styles from "./DetailLayout.module.css";

const DetailLayout = ({ children }) => (
  <article className={`container ${styles.layout}`}>{children}</article>
);

export default DetailLayout;
