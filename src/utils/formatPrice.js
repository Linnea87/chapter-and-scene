// ===== Format price =====
// Formats an amount as a price, e.g. 5.99 → "$5.99".
// The currency can be changed, e.g. formatPrice(59.69, "SEK") → "SEK 59.69".

const formatPrice = (amount, currency = "USD") =>
  new Intl.NumberFormat("en-US", { style: "currency", currency }).format(
    amount,
  );

export default formatPrice;
