// ===== Trailer modal =====
// Plays a YouTube trailer in a native <dialog>, so the user stays on the page.
// isPlayer: player mode, used in My library. Fills the window, is labelled
// "Now playing" and can show a notice above the video.

import { X } from "lucide-react";
import useDialog from "../../../hooks/useDialog";
import IconButton from "../../ui/buttons/IconButton/IconButton";
import styles from "./TrailerModal.module.css";

const TrailerModal = ({
  trailerKey,
  title,
  isOpen,
  onClose,
  isPlayer = false,
  notice,
}) => {
  const dialogRef = useDialog(isOpen);

  const label = isPlayer ? `Now playing: ${title}` : `${title} trailer`;
  const dialogClass = isPlayer
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
        label={isPlayer ? "Close player" : "Close trailer"}
        className={styles.close}
        onClick={onClose}
      />

      {notice && <p className={styles.notice}>{notice}</p>}

      {/* The player is only rendered while open, so the video stops on close */}
      {isOpen && (
        <iframe
          className={styles.player}
          src={`https://www.youtube-nocookie.com/embed/${trailerKey}?autoplay=1`}
          title={label}
          allow="autoplay; encrypted-media; picture-in-picture"
          allowFullScreen
        />
      )}
    </dialog>
  );
};

export default TrailerModal;
