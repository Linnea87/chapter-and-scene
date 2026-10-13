// ===== Hours to milliseconds =====
// Turns hours into milliseconds, e.g. to add a rental time to a date: 48 → 172800000

import { MS_PER_HOUR } from "./timeUnits";

const hoursToMs = (hours) => hours * MS_PER_HOUR;

export default hoursToMs;
