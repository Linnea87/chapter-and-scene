// ===== Milliseconds to hours =====
// Turns a time difference in milliseconds into hours,
// e.g. the difference between two dates → 30.2

const MS_PER_HOUR = 60 * 60 * 1000;

const msToHours = (ms) => ms / MS_PER_HOUR;

export default msToHours;
