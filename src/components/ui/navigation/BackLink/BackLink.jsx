// ===== Back link =====
// An arrow and a text that link back to a page, e.g. "Back to home".
// iconOnly shows only the arrow in a round button, the text is kept for
// screen readers. Used over images and on pages with a large heading.
// className lets the parent decide the spacing around it.

import { Link } from "react-router";
import { ArrowLeft } from "lucide-react";
import styles from "./BackLink.module.css";

const BackLink = ({ to, children, iconOnly = false, className }) => {
  const linkClass = [styles.link, iconOnly && styles.iconOnly, className]
    .filter(Boolean)
    .join(" ");

  return (
    <Link to={to} className={linkClass}>
      <ArrowLeft size={18} aria-hidden="true" />
      {iconOnly ? (
        <span className="visually-hidden">{children}</span>
      ) : (
        children
      )}
    </Link>
  );
};

export default BackLink;
