import { useEffect, useRef } from "react";

// ===== Dialog hook =====
// Keeps a native <dialog> in sync with React state.
// Returns a ref to put on the <dialog> element.

const useDialog = (isOpen) => {
  const dialogRef = useRef(null);

  // showModal() and close() are browser methods, so they are called in an effect
  useEffect(() => {
    const dialog = dialogRef.current;

    if (isOpen && !dialog.open) dialog.showModal();
    if (!isOpen && dialog.open) dialog.close();
  }, [isOpen]);

  return dialogRef;
};

export default useDialog;
