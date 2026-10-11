import roundPrice from "../../utils/roundPrice";

// ===== Currency helpers =====

// Converts a USD price with an exchange rate, e.g. 14.99 at 9.97 → 149.45
export const convertPrice = (amount, rate) => roundPrice(amount * rate);
