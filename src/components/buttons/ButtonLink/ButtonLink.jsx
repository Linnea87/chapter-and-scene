import { Link } from "react-router";
import styles from "./ButtonLink.module.css";

// ===== Button link =====
// A link that looks like the primary Button.
// Used when an action navigates to another page instead of running code.

const ButtonLink = ({ to, children, ...props }) => (
  <Link to={to} className={styles.link} {...props}>
    {children}
  </Link>
);

export default ButtonLink;
