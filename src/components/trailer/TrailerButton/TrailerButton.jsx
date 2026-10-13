// ===== Trailer button =====
// Opens the trailer in a modal. Renders nothing when there is no trailer.

import { Play } from "lucide-react";
import useDisclosure from "../../../hooks/useDisclosure";
import Button from "../../ui/buttons/Button/Button";
import TrailerModal from "../TrailerModal/TrailerModal";

const TrailerButton = ({ trailerKey, title }) => {
  const { isOpen, open, close } = useDisclosure();

  if (!trailerKey) return null;

  return (
    <>
      <Button onClick={open}>
        <Play size={20} fill="currentColor" aria-hidden="true" />
        Watch trailer
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
