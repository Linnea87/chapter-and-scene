// ===== Cart link =====
// The basket icon in the header, with the number of items in a badge.
// Highlighted when the cart page is open.

import { NavLink } from "react-router";
import { ShoppingBasket } from "lucide-react";
import { useSelector } from "react-redux";
import { selectCartCount } from "../../../features/cart/cartSelectors";
import getNavLinkClass from "../../../utils/getNavLinkClass";
import pluralize from "../../../utils/pluralize";
import styles from "./CartLink.module.css";

// Adds the active class when the cart page is open
const getLinkClass = getNavLinkClass(styles.cartLink, styles.active);

const CartLink = () => {
  const count = useSelector(selectCartCount);

  // The icon has no text, so the label describes the link for screen readers,
  // e.g. "Cart, 1 item" or "Cart, 3 items"
  const label = `Cart, ${pluralize(count, "item")}`;

  return (
    <NavLink to="/cart" className={getLinkClass} aria-label={label}>
      <ShoppingBasket size={24} strokeWidth={1.8} aria-hidden="true" />

      {/* The badge is hidden when the cart is empty */}
      {count > 0 && <span className={styles.badge}>{count}</span>}
    </NavLink>
  );
};

export default CartLink;
