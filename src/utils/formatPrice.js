// ===== Format price =====
// Formats an amount as a price, e.g. 5.99 → "$5.99".
// The currency switcher in Week 2 will pass a different currency.

const formatPrice = (amount, currency = "USD") =>
  new Intl.NumberFormat("en-US", { style: "currency", currency }).format(
    amount,
  );

export default formatPrice;
