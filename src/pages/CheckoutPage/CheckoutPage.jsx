import { useState } from "react";
import { Navigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import addLibraryItems from "../../services/supabase/library/addLibraryItems";
import createOrder from "../../services/supabase/orders/createOrder";
import { isPhysicalFormat } from "../../features/cart/cartHelpers";
import { selectUser } from "../../features/auth/authSelectors";
import {
  selectCartItems,
  selectHasPhysicalItems,
  selectShipping,
  selectSubtotal,
  selectTotal,
} from "../../features/cart/cartSelectors";
import { clearCart } from "../../features/cart/cartSlice";
import CartItem from "../../components/cart/CartItem/CartItem";
import CartSummary from "../../components/cart/CartSummary/CartSummary";
import CheckoutForm from "../../components/checkout/CheckoutForm/CheckoutForm";
import styles from "./CheckoutPage.module.css";

// ===== Checkout page =====
// Only reachable when signed in, see ProtectedRoute.
// Saves the order, adds digital items to the library and empties the cart.

const CheckoutPage = () => {
  const dispatch = useDispatch();

  const items = useSelector(selectCartItems);
  const subtotal = useSelector(selectSubtotal);
  const shipping = useSelector(selectShipping);
  const total = useSelector(selectTotal);
  const user = useSelector(selectUser);
  const hasPhysicalItems = useSelector(selectHasPhysicalItems);

  // Set when the order is saved, used to go to the confirmation page
  const [placedOrderId, setPlacedOrderId] = useState(null);

  // --- Handlers ---
  // Throws on failure, CheckoutForm shows the message
  const handlePlaceOrder = async (shippingAddress) => {
    const orderId = await createOrder({
      items,
      subtotal,
      shipping,
      total,
      shippingAddress,
    });

    // Physical books are shipped, everything else goes to the library
    const digitalItems = items.filter((item) => !isPhysicalFormat(item.format));
    await addLibraryItems(digitalItems);

    // Both updates happen in the same render, so the page goes to the
    // confirmation page instead of seeing an empty cart.
    setPlacedOrderId(orderId);
    dispatch(clearCart());
  };

  // --- Render ---
  // The order is placed, go to the order page
  if (placedOrderId) {
    return <Navigate to={`/order/${placedOrderId}`} replace />;
  }

  // Nothing to check out, e.g. after a reload with an empty cart
  if (items.length === 0) return <Navigate to="/cart" replace />;

  return (
    <div className="container">
      <div className={styles.content}>
        <h1>Checkout</h1>
        <p className={styles.account}>
          Ordering as <strong>{user.email}</strong>
        </p>

        <ul className={styles.list}>
          {items.map((item) => (
            <CartItem key={item.key} item={item} isReadOnly />
          ))}
        </ul>

        <CartSummary className={styles.summary} />

        <CheckoutForm
          needsAddress={hasPhysicalItems}
          onSubmit={handlePlaceOrder}
        />
      </div>
    </div>
  );
};

export default CheckoutPage;
