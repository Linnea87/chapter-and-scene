// ===== Reader modal =====
// Shows a Google Books preview in a native <dialog> that fills the window,
// so the user can read without leaving the app.
// Only used for books where canEmbedPreview is true, see mapBook.

import { X } from "lucide-react";
import useDialog from "../../../hooks/useDialog";
import getPreviewEmbedUrl from "../../../services/googleBooks/getPreviewEmbedUrl";
import IconButton from "../../ui/buttons/IconButton/IconButton";
import styles from "./ReaderModal.module.css";

const ReaderModal = ({ bookId, title, isOpen, onClose, notice }) => {
  const dialogRef = useDialog(isOpen);
  const label = `Now reading: ${title}`;

  return (
    <dialog
      ref={dialogRef}
      className={styles.dialog}
      aria-label={label}
      onClose={onClose}
    >
      <IconButton
        icon={X}
        label="Close reader"
        className={styles.close}
        onClick={onClose}
      />

      {notice && <p className={styles.notice}>{notice}</p>}

      {/* The preview is only loaded while open */}
      {isOpen && (
        <iframe
          className={styles.reader}
          src={getPreviewEmbedUrl(bookId)}
          title={label}
        />
      )}
    </dialog>
  );
};

export default ReaderModal;
