import { useEffect, useState } from "react";

// ===== useDebouncedValue =====
// Returns a value only after it has stopped changing for a short time.
// Used to wait until the user stops typing before a request is sent.

const useDebouncedValue = (value, delay = 400) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timeoutId = setTimeout(() => setDebouncedValue(value), delay);

    // Cleanup: a new change cancels the previous timer
    return () => clearTimeout(timeoutId);
  }, [value, delay]);

  return debouncedValue;
};

export default useDebouncedValue;
