// ===== Pluralize =====
// Adds an "s" when the count is not 1, e.g. 1 season / 3 seasons

const pluralize = (count, word) =>
  `${count} ${count === 1 ? word : `${word}s`}`;

export default pluralize;
