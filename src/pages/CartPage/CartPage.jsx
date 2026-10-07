import { useSelector } from "react-redux";
import { ShoppingBasket } from "lucide-react";
import {
  selectCartItems,
  selectSubtotal,
} from "../../features/cart/cartSelectors";
import formatPrice from "../../utils/formatPrice";
import ButtonLink from "../../components/buttons/ButtonLink/ButtonLink";
import CartItem from "../../components/cart/CartItem/CartItem";
import StatusMessage from "../../components/feedback/StatusMessage/StatusMessage";
import styles from "./CartPage.module.css";

// ===== Cart page =====
// Lists the items in the cart with a remove button on each row.
// Shipping and total are added in CS-021.

const CartPage = () => {
  const items = useSelector(selectCartItems);
  const subtotal = useSelector(selectSubtotal);

  // --- Empty cart ---
  if (items.length === 0) {
    return (
      <div className="container">
        <StatusMessage
          icon={ShoppingBasket}
          titleAs="h1"
          title="Your cart is empty"
          message="Find a story to watch or read."
          actionLabel="Explore stories"
          actionTo="/explore"
        />
      </div>
    );
  }

  return (
    <div className="container">
      <h1>Your cart</h1>

      <ul className={styles.list}>
        {items.map((item) => (
          <CartItem key={item.key} item={item} />
        ))}
      </ul>

      {/* --- Subtotal, updates when a row is removed --- */}
      <p className={styles.subtotal}>
        <span>Subtotal</span>
        <span>{formatPrice(subtotal)}</span>
      </p>

      {/* --- Actions, checkout is added in CS-026 --- */}
      <div className={styles.actions}>
        <ButtonLink to="/explore" variant="secondary">
          Keep exploring
        </ButtonLink>
      </div>
    </div>
  );
};

export default CartPage;
