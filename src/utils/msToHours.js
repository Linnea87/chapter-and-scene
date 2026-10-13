// ===== Milliseconds to hours =====
// Turns a time difference in milliseconds into hours,
// e.g. the difference between two dates → 30.2

import { MS_PER_HOUR } from "./timeUnits";

const msToHours = (ms) => ms / MS_PER_HOUR;

export default msToHours;
