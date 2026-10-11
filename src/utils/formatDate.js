// ===== Format date =====
// Formats a date from the database for display, e.g. "2026-10-11T14:03:00Z" → "Oct 11, 2026".
// Uses the same locale as formatPrice, so dates and prices match.

const formatDate = (date) =>
  new Intl.DateTimeFormat("en-US", { dateStyle: "medium" }).format(
    new Date(date),
  );

export default formatDate;
