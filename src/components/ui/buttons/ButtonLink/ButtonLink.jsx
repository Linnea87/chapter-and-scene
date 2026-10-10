import { Link } from "react-router";
import styles from "./ButtonLink.module.css";

// ===== Button link =====
// A link that looks like Button, in the same variants: "primary", "secondary" or "text".
// Used when an action navigates to another page instead of running code.

const ButtonLink = ({ to, variant = "primary", children, ...props }) => (
  <Link to={to} className={`${styles.link} ${styles[variant]}`} {...props}>
    {children}
  </Link>
);

export default ButtonLink;
