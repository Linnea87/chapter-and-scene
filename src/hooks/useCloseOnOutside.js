// ===== Close on outside hook =====
// Calls onClose when the user clicks outside the element in ref
// or presses Escape, e.g. to close a dropdown menu.
// Only listens while isOpen is true, so closed menus cost nothing.

import { useEffect } from "react";

const useCloseOnOutside = (ref, isOpen, onClose) => {
  useEffect(() => {
    if (!isOpen) return;

    // --- Handlers ---
    // contains is true for the element itself and everything inside it
    const handlePointerDown = (e) => {
      if (!ref.current?.contains(e.target)) onClose();
    };

    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);

    // Removes the listeners when the menu closes or the component is removed
    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [ref, isOpen, onClose]);
};

export default useCloseOnOutside;
