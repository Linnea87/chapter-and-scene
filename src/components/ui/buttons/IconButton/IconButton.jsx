import styles from "./IconButton.module.css";

// ===== Icon button =====
// A button that only shows an icon, e.g. close or clear.
// label is required, since screen readers cannot read the icon.
// className lets the parent decide where the button is placed.
// iconSize is 20 by default, larger for e.g. carousel arrows.

const IconButton = ({
  icon: Icon,
  label,
  className,
  iconSize = 20,
  type = "button",
  ...props
}) => {
  const buttonClass = [styles.button, className].filter(Boolean).join(" ");

  return (
    <button type={type} className={buttonClass} aria-label={label} {...props}>
      <Icon size={iconSize} aria-hidden="true" />
    </button>
  );
};

export default IconButton;
