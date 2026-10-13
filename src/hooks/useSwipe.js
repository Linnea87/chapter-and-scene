// ===== Swipe hook =====
// Calls onSwipeLeft or onSwipeRight when the user swipes sideways
// on a touch screen, e.g. to change slide in a carousel.
// Returns touch handlers to spread on the element that can be swiped.

import { useRef } from "react";

// Shortest sideways move in pixels that counts as a swipe, so a tap is not a swipe
const MIN_SWIPE_DISTANCE = 50;

const useSwipe = ({ onSwipeLeft, onSwipeRight }) => {
  // Where the finger touched down. A ref, since it does not change what is shown
  const start = useRef(null);

  // --- Handlers ---
  const onTouchStart = (e) => {
    const touch = e.touches[0];
    start.current = { x: touch.clientX, y: touch.clientY };
  };

  const onTouchEnd = (e) => {
    if (!start.current) return;

    const touch = e.changedTouches[0];
    const distanceX = touch.clientX - start.current.x;
    const distanceY = touch.clientY - start.current.y;
    start.current = null;

    // Mostly up or down is scrolling the page, not a swipe
    if (Math.abs(distanceX) < Math.abs(distanceY)) return;

    if (distanceX <= -MIN_SWIPE_DISTANCE) onSwipeLeft();
    if (distanceX >= MIN_SWIPE_DISTANCE) onSwipeRight();
  };

  return { onTouchStart, onTouchEnd };
};

export default useSwipe;
