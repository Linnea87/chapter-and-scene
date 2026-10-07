import { isPhysicalFormat } from "./cartHelpers";
import { SHIPPING_COST, FREE_SHIPPING_THRESHOLD } from "./cartConfig";

// ===== Cart selectors =====
// Components read cart data through these, so they do not depend on the state shape.
// All prices are in USD and converted to the selected currency when displayed.

// Rounds to two decimals to avoid floating point errors, e.g. 0.1 + 0.2
const roundPrice = (value) => Math.round(value * 100) / 100;

export const selectCartItems = (state) => state.cart.cartItems;

// Total number of items, counting quantity
export const selectCartCount = (state) =>
  state.cart.cartItems.reduce((total, item) => total + item.quantity, 0);

export const selectSubtotal = (state) =>
  roundPrice(
    selectCartItems(state).reduce(
      (total, item) => total + item.unitPrice * item.quantity,
      0,
    ),
  );

// Shipping only applies when the cart contains at least one physical book
export const selectHasPhysicalItems = (state) =>
  selectCartItems(state).some((item) => isPhysicalFormat(item.format));

export const selectShipping = (state) => {
  if (!selectHasPhysicalItems(state)) return 0;

  return selectSubtotal(state) >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_COST;
};

export const selectTotal = (state) =>
  roundPrice(selectSubtotal(state) + selectShipping(state));

// Returns the cart row with this key, or undefined if it is not in the cart.
// Takes the key first and returns a selector, so it can be used as
// useSelector(selectCartItem(key))
export const selectCartItem = (key) => (state) =>
  selectCartItems(state).find((item) => item.key === key);
