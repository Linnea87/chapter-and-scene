import { Play } from "lucide-react";
import useDisclosure from "../../../hooks/useDisclosure";
import Button from "../../buttons/Button/Button";
import TrailerModal from "../TrailerModal/TrailerModal";
import styles from "./TrailerButton.module.css";

// ===== Trailer button =====
// Opens the trailer in a modal. Renders nothing when there is no trailer.

const TrailerButton = ({ trailerKey, title }) => {
  const { isOpen, open, close } = useDisclosure();

  if (!trailerKey) return null;

  return (
    <>
      <Button onClick={open}>
        <span className={styles.content}>
          <Play size={20} aria-hidden="true" />
          Watch trailer
        </span>
      </Button>

      <TrailerModal
        trailerKey={trailerKey}
        title={title}
        isOpen={isOpen}
        onClose={close}
      />
    </>
  );
};

export default TrailerButton;
