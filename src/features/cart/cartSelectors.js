// ===== Cart selectors =====
// Components read cart data through these, so they do not depend on the state shape.
// All prices are in USD. Another currency is only shown as a conversion next to them.

import { isPhysicalFormat } from "./cartHelpers";
import { SHIPPING_COST, FREE_SHIPPING_THRESHOLD } from "./cartConfig";
import { getBundleDiscount } from "../pricing/pricingHelpers";
import roundPrice from "../../utils/roundPrice";

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

// The bundle discount when a book and its movie or series are both in the cart.
// Free shipping is still based on the subtotal before the discount.
export const selectBundleDiscount = (state) =>
  getBundleDiscount(selectCartItems(state));

// Shipping only applies when the cart contains at least one physical book
export const selectHasPhysicalItems = (state) =>
  selectCartItems(state).some((item) => isPhysicalFormat(item.format));

// Amount left until free shipping, or 0 when shipping is free or not needed
export const selectAmountToFreeShipping = (state) => {
  if (!selectHasPhysicalItems(state)) return 0;

  const amountLeft = FREE_SHIPPING_THRESHOLD - selectSubtotal(state);
  return Math.max(0, roundPrice(amountLeft));
};

// Shipping is charged until the free shipping threshold is reached
export const selectShipping = (state) =>
  selectAmountToFreeShipping(state) > 0 ? SHIPPING_COST : 0;

export const selectTotal = (state) =>
  roundPrice(
    selectSubtotal(state) - selectBundleDiscount(state) + selectShipping(state),
  );

// Returns the cart row with this key, or undefined if it is not in the cart.
// Takes the key first and returns a selector, so it can be used as
// useSelector(selectCartItem(key))
export const selectCartItem = (key) => (state) =>
  selectCartItems(state).find((item) => item.key === key);
