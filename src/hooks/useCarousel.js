import { useState } from "react";

// ===== useCarousel =====
// Keeps track of the current slide and wraps around at both ends.
// count: number of slides

const useCarousel = (count) => {
  const [current, setCurrent] = useState(0);

  // Wraps around, so -1 becomes the last slide and count becomes the first
  const wrap = (index) => (index + count) % count;
  const goTo = (index) => setCurrent(wrap(index));

  return {
    current,
    previousIndex: wrap(current - 1),
    nextIndex: wrap(current + 1),
    goTo,
    next: () => goTo(current + 1),
    previous: () => goTo(current - 1),
  };
};

export default useCarousel;
