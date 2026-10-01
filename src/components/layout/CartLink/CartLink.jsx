import { NavLink } from "react-router";
import { ShoppingBasket } from "lucide-react";
import getNavLinkClass from "../../../utils/getNavLinkClass";
import styles from "./CartLink.module.css";

// Adds the active class when the cart page is open
const getLinkClass = getNavLinkClass(styles.cartLink, styles.active);

// The item count badge is added in CS-018, when the cart state exists
const CartLink = ({ onNavigate }) => {
  return (
    <NavLink
      to="/cart"
      className={getLinkClass}
      onClick={onNavigate}
      aria-label="Cart"
    >
      <ShoppingBasket size={24} strokeWidth={1.8} aria-hidden="true" />
    </NavLink>
  );
};

export default CartLink;
