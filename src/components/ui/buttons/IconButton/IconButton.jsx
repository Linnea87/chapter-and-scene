// ===== Icon button =====
// A button that only shows an icon, e.g. close or clear.
// label is required, since screen readers cannot read the icon.
// className lets the parent decide where the button is placed.
// iconSize is 20 by default, larger for e.g. carousel arrows.
// strokeWidth is 2 by default, thinner to match the header icons.

import styles from "./IconButton.module.css";

const IconButton = ({
  icon: Icon,
  label,
  className,
  iconSize = 20,
  strokeWidth = 2,
  type = "button",
  ...props
}) => {
  const buttonClass = [styles.button, className].filter(Boolean).join(" ");

  return (
    <button type={type} className={buttonClass} aria-label={label} {...props}>
      <Icon size={iconSize} strokeWidth={strokeWidth} aria-hidden="true" />
    </button>
  );
};

export default IconButton;
