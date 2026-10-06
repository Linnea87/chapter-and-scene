import { X } from "lucide-react";
import useDialog from "../../../hooks/useDialog";
import IconButton from "../../common/IconButton/IconButton";
import styles from "./TrailerModal.module.css";

// ===== Trailer modal =====
// Plays a YouTube trailer in a native <dialog>, so the user stays on the page.

const TrailerModal = ({ trailerKey, title, isOpen, onClose }) => {
  const dialogRef = useDialog(isOpen);

  return (
    <dialog
      ref={dialogRef}
      className={styles.dialog}
      aria-label={`${title} trailer`}
      onClose={onClose}
    >
      <IconButton
        icon={X}
        label="Close trailer"
        className={styles.close}
        onClick={onClose}
      />

      {/* The player is only rendered while open, so the video stops on close */}
      {isOpen && (
        <iframe
          className={styles.player}
          src={`https://www.youtube-nocookie.com/embed/${trailerKey}?autoplay=1`}
          title={`${title} trailer`}
          allow="autoplay; encrypted-media; picture-in-picture"
          allowFullScreen
        />
      )}
    </dialog>
  );
};

export default TrailerModal;
