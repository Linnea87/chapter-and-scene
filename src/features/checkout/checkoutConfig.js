// ===== Checkout configuration =====
// Shared values for the checkout, kept in one place so they are easy to change

// Shipping address fields, shown only when the cart has a physical book.
// autoComplete lets the browser fill in a saved address.
export const ADDRESS_FIELDS = [
  { name: "fullName", label: "Full name", autoComplete: "name" },
  { name: "street", label: "Street address", autoComplete: "street-address" },
  { name: "postalCode", label: "Postal code", autoComplete: "postal-code" },
  { name: "city", label: "City", autoComplete: "address-level2" },
  { name: "country", label: "Country", autoComplete: "country-name" },
];

// Starting value for the address form, one empty string per field
export const EMPTY_ADDRESS = Object.fromEntries(
  ADDRESS_FIELDS.map((field) => [field.name, ""]),
);

// Payment methods in the checkout. Payment is simulated, so no details are asked for.
export const PAYMENT_METHODS = [
  { id: "card", label: "Card" },
  { id: "paypal", label: "PayPal" },
  { id: "invoice", label: "Invoice" },
];

// Shown in the checkout, payment is simulated
export const DEMO_NOTICE =
  "This is a demo shop. No payment is taken and nothing is shipped.";
