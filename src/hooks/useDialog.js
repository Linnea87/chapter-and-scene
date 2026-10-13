// ===== Dialog hook =====
// Keeps a native <dialog> in sync with React state.
// Returns a ref to put on the <dialog> element.
// On open the dialog itself gets focus, so screen readers read its label
// and no focus ring shows on the first button after a tap.
// The <dialog> needs tabIndex={-1} to be able to take focus.

import { useEffect, useRef } from "react";

const useDialog = (isOpen) => {
  const dialogRef = useRef(null);

  // showModal() and close() are browser methods, so they are called in an effect
  useEffect(() => {
    const dialog = dialogRef.current;

    if (isOpen && !dialog.open) {
      dialog.showModal();
      dialog.focus();
    }
    if (!isOpen && dialog.open) dialog.close();
  }, [isOpen]);

  return dialogRef;
};

export default useDialog;
