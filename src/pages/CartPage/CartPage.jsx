import { useSelector } from "react-redux";
import { ShoppingBasket } from "lucide-react";
import { selectCartItems } from "../../features/cart/cartSelectors";
import ButtonLink from "../../components/ui/buttons/ButtonLink/ButtonLink";
import CartItem from "../../components/cart/CartItem/CartItem";
import CartSummary from "../../components/cart/CartSummary/CartSummary";
import StatusMessage from "../../components/ui/feedback/StatusMessage/StatusMessage";
import styles from "./CartPage.module.css";

// ===== Cart page =====
// Lists the items in the cart with a summary of subtotal, shipping and total.

const CartPage = () => {
  const items = useSelector(selectCartItems);

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

      {/* --- Subtotal, shipping and total --- */}
      <CartSummary className={styles.summary} />

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
