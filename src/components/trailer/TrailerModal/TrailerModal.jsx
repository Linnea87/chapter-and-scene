// ===== Trailer modal =====
// Plays a YouTube trailer in a MediaDialog, so the user stays on the page.
// isPlayer: player mode, used in My library. Fills the window, is labelled
// "Now playing" and can show a notice above the video.

import MediaDialog from "../../ui/media/MediaDialog/MediaDialog";
import styles from "./TrailerModal.module.css";

const TrailerModal = ({
  trailerKey,
  title,
  isOpen,
  onClose,
  isPlayer = false,
  notice,
}) => {
  const label = isPlayer ? `Now playing: ${title}` : `${title} trailer`;
  const playerClass = isPlayer
    ? `${styles.player} ${styles.fitWindow}`
    : styles.player;

  return (
    <MediaDialog
      label={label}
      closeLabel={isPlayer ? "Close player" : "Close trailer"}
      isOpen={isOpen}
      onClose={onClose}
      fullWindow={isPlayer}
      notice={notice}
    >
      <iframe
        className={playerClass}
        src={`https://www.youtube-nocookie.com/embed/${trailerKey}?autoplay=1`}
        title={label}
        allow="autoplay; encrypted-media; picture-in-picture"
        allowFullScreen
      />
    </MediaDialog>
  );
};

export default TrailerModal;
