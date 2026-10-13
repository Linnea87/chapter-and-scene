// ===== Media dialog =====
// A native <dialog> for a video or a book: a close button, an optional notice
// and the content, e.g. a YouTube or Google Books iframe.
// The content is only rendered while open, so a video stops and a book
// preview is not loaded until it is needed.
// label: read out by screen readers, e.g. "Now playing: Dune"
// closeLabel: the close button's label, e.g. "Close trailer"
// fullWindow: fills the whole window, like a streaming player
// notice: an optional message above the content

import { X } from "lucide-react";
import useDialog from "../../../../hooks/useDialog";
import IconButton from "../../buttons/IconButton/IconButton";
import styles from "./MediaDialog.module.css";

const MediaDialog = ({
  label,
  closeLabel,
  isOpen,
  onClose,
  fullWindow = false,
  notice,
  children,
}) => {
  const dialogRef = useDialog(isOpen);
  const dialogClass = fullWindow
    ? `${styles.dialog} ${styles.fullWindow}`
    : styles.dialog;

  return (
    <dialog
      ref={dialogRef}
      className={dialogClass}
      aria-label={label}
      onClose={onClose}
    >
      <IconButton
        icon={X}
        label={closeLabel}
        className={styles.close}
        onClick={onClose}
      />

      {notice && <p className={styles.notice}>{notice}</p>}

      {isOpen && children}
    </dialog>
  );
};

export default MediaDialog;
