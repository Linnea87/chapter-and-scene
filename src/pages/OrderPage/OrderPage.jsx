// ===== Order page =====
// Shows one order: order number, items and total.
// After a purchase it is the confirmation (CS-027), with links to keep shopping.
// From the order history (CS-028) it shows the order details and a link back.
// Only reachable when signed in, see ProtectedRoute.

import { useLocation, useParams } from "react-router";
import { useGetOrderQuery } from "../../services/supabase/supabaseApi";
import {
  formatOrderNumber,
  hasDigitalItems,
} from "../../features/orders/orderHelpers";
import formatPrice from "../../utils/formatPrice";
import ButtonLink from "../../components/ui/buttons/ButtonLink/ButtonLink";
import BackLink from "../../components/ui/navigation/BackLink/BackLink";
import CartItem from "../../components/cart/CartItem/CartItem";
import LoadError from "../../components/ui/feedback/LoadError/LoadError";
import Loader from "../../components/ui/feedback/Loader/Loader";
import StatusMessage from "../../components/ui/feedback/StatusMessage/StatusMessage";
import styles from "./OrderPage.module.css";

const OrderPage = () => {
  const { id } = useParams();
  const location = useLocation();
  const { data: order, isLoading, isError, refetch } = useGetOrderQuery(id);

  // Set by OrderListItem when the order is opened from the order history
  const isFromOrderHistory = location.state?.fromOrderHistory === true;

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
        {isFromOrderHistory && (
          <BackLink to="/orders" iconOnly className={styles.backLink}>
            Back to order history
          </BackLink>
        )}

        <h1 className={styles.title}>
          {isFromOrderHistory ? "Order details" : "Thank you for your purchase"}
        </h1>
        <p className={styles.number}>
          Order number <strong>{formatOrderNumber(order.id)}</strong>
        </p>

        <ul className={styles.list}>
          {order.items.map((item) => (
            <CartItem
              key={item.key}
              item={item}
              isReadOnly
              showConversion={false}
            />
          ))}
        </ul>

        {/* --- Bundle discount, only when the order had one --- */}
        {order.discount > 0 && (
          <p className={styles.discount}>
            <span>Bundle discount</span>
            <span>−{formatPrice(order.discount)}</span>
          </p>
        )}

        <p className={styles.total}>
          <span>Total</span>
          <span>{formatPrice(order.total)}</span>
        </p>

        {/* --- Actions, only after a purchase --- */}
        {/* The main action is My library when the order has digital items,
            otherwise the order history, where the delivery can be followed */}
        {!isFromOrderHistory && (
          <div className={styles.actions}>
            <ButtonLink to="/explore" variant="secondary">
              Keep exploring
            </ButtonLink>
            {hasDigitalItems(order.items) ? (
              <ButtonLink to="/library">Go to My library</ButtonLink>
            ) : (
              <ButtonLink to="/orders">Go to order history</ButtonLink>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderPage;
