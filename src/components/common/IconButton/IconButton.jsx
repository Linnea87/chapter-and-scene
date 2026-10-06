import styles from "./IconButton.module.css";

// ===== Icon button =====
// A button that only shows an icon, e.g. close or clear.
// label is required, since screen readers cannot read the icon.
// className lets the parent decide where the button is placed.

const IconButton = ({
  icon: Icon,
  label,
  className,
  type = "button",
  ...props
}) => {
  const buttonClass = [styles.button, className].filter(Boolean).join(" ");

  return (
    <button type={type} className={buttonClass} aria-label={label} {...props}>
      <Icon size={20} aria-hidden="true" />
    </button>
  );
};

export default IconButton;
