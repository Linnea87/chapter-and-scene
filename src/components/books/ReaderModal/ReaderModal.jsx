// ===== Reader modal =====
// Shows a Google Books preview in a MediaDialog that fills the window,
// so the user can read without leaving the app.
// Only used for books where canEmbedPreview is true, see mapBook.

import getPreviewEmbedUrl from "../../../services/googleBooks/getPreviewEmbedUrl";
import MediaDialog from "../../ui/media/MediaDialog/MediaDialog";
import styles from "./ReaderModal.module.css";

const ReaderModal = ({ bookId, title, isOpen, onClose, notice }) => {
  const label = `Now reading: ${title}`;

  return (
    <MediaDialog
      label={label}
      closeLabel="Close reader"
      isOpen={isOpen}
      onClose={onClose}
      fullWindow
      notice={notice}
    >
      <iframe
        className={styles.reader}
        src={getPreviewEmbedUrl(bookId)}
        title={label}
      />
    </MediaDialog>
  );
};

export default ReaderModal;
