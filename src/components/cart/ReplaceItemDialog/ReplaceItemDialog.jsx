import { useId } from "react";
import useDialog from "../../../hooks/useDialog";
import Button from "../../ui/buttons/Button/Button";
import styles from "./ReplaceItemDialog.module.css";

// ===== Replace item dialog =====
// Asks the user what to keep when an option clashes with something in the cart,
// e.g. "Rent for 48 hours" is in the cart and the user adds "Buy".
// Escape or "Keep current" keeps the cart as it is.
// newItem: the item being added, conflictingItems: the items it clashes with

const ReplaceItemDialog = ({
  isOpen,
  newItem,
  conflictingItems,
  onKeep,
  onReplace,
}) => {
  const dialogRef = useDialog(isOpen);
  // Unique id that connects the title to the dialog, since every add button has one
  const titleId = useId();
  const currentLabels = conflictingItems.map((item) => item.label).join(", ");

  return (
    <dialog
      ref={dialogRef}
      className={styles.dialog}
      aria-labelledby={titleId}
      onClose={onKeep}
    >
      <h2 id={titleId} className={styles.title}>
        Already in your cart
      </h2>
      <p className={styles.message}>
        {currentLabels} of {newItem.title} is already in your cart. Do you want
        to replace it with {newItem.label}?
      </p>

      <div className={styles.actions}>
        <Button variant="secondary" onClick={onKeep}>
          Keep current
        </Button>
        <Button onClick={onReplace}>Replace</Button>
      </div>
    </dialog>
  );
};

export default ReplaceItemDialog;
