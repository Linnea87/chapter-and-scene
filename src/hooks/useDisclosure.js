import { useState } from "react";

// ===== Disclosure hook =====
// Open and closed state for anything that can be shown and hidden,
// e.g. the mobile menu or the trailer modal.

const useDisclosure = (initialState = false) => {
  const [isOpen, setIsOpen] = useState(initialState);

  const open = () => setIsOpen(true);
  const close = () => setIsOpen(false);
  const toggle = () => setIsOpen((prev) => !prev);

  return { isOpen, open, close, toggle };
};

export default useDisclosure;
