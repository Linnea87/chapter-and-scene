import { useParams } from "react-router";
import { useGetOrderQuery } from "../../services/supabase/supabaseApi";
import {
  formatOrderNumber,
  hasDigitalItems,
} from "../../features/orders/orderHelpers";
import formatPrice from "../../utils/formatPrice";
import ButtonLink from "../../components/ui/buttons/ButtonLink/ButtonLink";
import CartItem from "../../components/cart/CartItem/CartItem";
import LoadError from "../../components/ui/feedback/LoadError/LoadError";
import Loader from "../../components/ui/feedback/Loader/Loader";
import StatusMessage from "../../components/ui/feedback/StatusMessage/StatusMessage";
import styles from "./OrderPage.module.css";

// ===== Order page =====
// Shows one order: order number, items and total.
// Used as the confirmation after a purchase (CS-027), later also from the order history.
// Only reachable when signed in, see ProtectedRoute.

const OrderPage = () => {
  const { id } = useParams();
  const { data: order, isLoading, isError, refetch } = useGetOrderQuery(id);

  // --- Loading and errors ---
  if (isLoading) return <Loader label="Loading your order" />;

  if (isError) {
    return (
      <div className="container">
        <LoadError title="Could not load your order" onRetry={refetch} />
      </div>
    );
  }

  // The order does not exist, or belongs to someone else
  if (!order) {
    return (
      <div className="container">
        <StatusMessage
          titleAs="h1"
          title="Order not found"
          message="We could not find this order."
          actionLabel="Explore stories"
          actionTo="/explore"
        />
      </div>
    );
  }

  // --- Order ---
  return (
    <div className="container">
      <div className={styles.content}>
        <h1>Thank you for your purchase</h1>
        <p className={styles.number}>
          Order number <strong>{formatOrderNumber(order.id)}</strong>
        </p>

        <ul className={styles.list}>
          {order.items.map((item) => (
            <CartItem key={item.key} item={item} isReadOnly />
          ))}
        </ul>
        <p className={styles.total}>
          <span>Total</span>
          <span>{formatPrice(order.total)}</span>
        </p>

        {/* --- Actions --- */}
        {/* My library is the main action when the order has digital items */}
        <div className={styles.actions}>
          <ButtonLink to="/explore" variant="secondary">
            Keep exploring
          </ButtonLink>
          {hasDigitalItems(order.items) && (
            <ButtonLink to="/library">Go to My library</ButtonLink>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrderPage;
