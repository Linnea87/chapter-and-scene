// ===== Play button =====
// Plays a movie or series from My library in the player.
// The trailer from TMDb stands in for the full content.
// Renders nothing while loading or when the title has no trailer.
// item: a library item with mediaType "movie" or "tv"

import { Play } from "lucide-react";
import useDisclosure from "../../../hooks/useDisclosure";
import { useGetTitleDetailsQuery } from "../../../services/tmdb/tmdbApi";
import { PLAYER_NOTICE } from "../../../features/library/libraryConfig";
import Button from "../../ui/buttons/Button/Button";
import TrailerModal from "../../trailer/TrailerModal/TrailerModal";
import styles from "./PlayButton.module.css";

const PlayButton = ({ item }) => {
  const { isOpen, open, close } = useDisclosure();
  const { currentData: details } = useGetTitleDetailsQuery({
    mediaType: item.mediaType,
    id: item.id,
  });

  if (!details?.trailerKey) return null;

  return (
    <>
      <Button variant="secondary" size="small" onClick={open}>
        <span className={styles.content}>
          <Play size={16} fill="currentColor" aria-hidden="true" />
          Play
          <span className="visually-hidden"> {item.title}</span>
        </span>
      </Button>

      <TrailerModal
        trailerKey={details.trailerKey}
        title={item.title}
        isOpen={isOpen}
        onClose={close}
        isPlayer
        notice={PLAYER_NOTICE}
      />
    </>
  );
};

export default PlayButton;
