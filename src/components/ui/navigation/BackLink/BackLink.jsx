import { Link } from "react-router";
import { ArrowLeft } from "lucide-react";
import styles from "./BackLink.module.css";

// ===== Back link =====
// An arrow and a text that link back to a page, e.g. "Back to home".
// className lets the parent decide the spacing around it.

const BackLink = ({ to, children, className }) => {
  const linkClass = [styles.link, className].filter(Boolean).join(" ");

  return (
    <Link to={to} className={linkClass}>
      <ArrowLeft size={18} aria-hidden="true" />
      {children}
    </Link>
  );
};

export default BackLink;
