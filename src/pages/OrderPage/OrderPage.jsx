import { Link, useLocation, useParams } from "react-router";
import { ArrowLeft } from "lucide-react";
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
// After a purchase it is the confirmation (CS-027), with links to keep shopping.
// From the order history (CS-028) it shows the order details and a link back.
// Only reachable when signed in, see ProtectedRoute.

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
          <Link to="/orders" className={styles.backLink}>
            <ArrowLeft size={18} aria-hidden="true" />
            Back to order history
          </Link>
        )}

        <h1>
          {isFromOrderHistory ? "Order details" : "Thank you for your purchase"}
        </h1>
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

        {/* --- Actions, only after a purchase --- */}
        {/* My library is the main action when the order has digital items */}
        {!isFromOrderHistory && (
          <div className={styles.actions}>
            <ButtonLink to="/explore" variant="secondary">
              Keep exploring
            </ButtonLink>
            {hasDigitalItems(order.items) && (
              <ButtonLink to="/library">Go to My library</ButtonLink>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderPage;
