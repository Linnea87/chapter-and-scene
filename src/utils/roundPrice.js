// ===== Round price =====
// Rounds an amount to two decimals to avoid floating point errors,
// e.g. 0.1 + 0.2 → 0.3 instead of 0.30000000000000004

const roundPrice = (value) => Math.round(value * 100) / 100;

export default roundPrice;
