// ===== Cart configuration =====
// Shared values for cart logic, kept in one place so they are easy to change

// Formats that are shipped as physical products and can have a quantity above 1
export const PHYSICAL_FORMATS = ["paperback", "hardcover"];

// Prices are stored in USD
export const SHIPPING_COST = 4.99;
export const FREE_SHIPPING_THRESHOLD = 35;

// Shown on detail pages and cart rows
export const DELIVERY_LABELS = {
  physical: "Delivered in 2–4 days",
  digital: "Instant access",
};

// How long a rented movie can be watched
export const RENTAL_HOURS = 48;

// Display names for every format in the shop (movies, series and books).
// Which formats each title can be bought in is decided elsewhere, e.g. BOOK_FORMATS.
export const FORMAT_LABELS = {
  rent: `Rent for ${RENTAL_HOURS} hours`,
  buy: "Buy",
  paperback: "Paperback",
  hardcover: "Hardcover",
  ebook: "E-book",
};

// The book formats, in the order they are shown
export const BOOK_FORMATS = ["paperback", "hardcover", "ebook"];

// ===== Storage =====
// Key for the guest cart in localStorage
export const CART_STORAGE_KEY = "chapter-and-scene-cart";
