// ===== Local storage =====
// Small wrappers around localStorage that never throw.
// Saved values are stored as JSON strings.
// Errors are logged for developers, the app keeps working without storage.

// --- Load ---
// Returns the saved value, or the fallback if nothing is saved or the data is invalid
export const loadFromStorage = (key, fallback) => {
  try {
    const savedValue = localStorage.getItem(key);
    return savedValue === null ? fallback : JSON.parse(savedValue);
  } catch (error) {
    console.warn(`Could not load "${key}" from localStorage`, error);
    return fallback;
  }
};

// --- Save ---
// Can fail when storage is full or blocked, e.g. in private mode
export const saveToStorage = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.warn(`Could not save "${key}" to localStorage`, error);
  }
};
