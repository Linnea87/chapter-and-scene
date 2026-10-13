// ===== Order history page =====
// Lists the signed-in user's orders, newest first. Each order opens the order page.
// Only reachable when signed in, see ProtectedRoute.

import { Receipt } from "lucide-react";
import { useGetOrdersQuery } from "../../services/supabase/supabaseApi";
import OrderListItem from "../../components/orders/OrderListItem/OrderListItem";
import LoadError from "../../components/ui/feedback/LoadError/LoadError";
import Loader from "../../components/ui/feedback/Loader/Loader";
import StatusMessage from "../../components/ui/feedback/StatusMessage/StatusMessage";
import styles from "./OrderHistoryPage.module.css";

const OrderHistoryPage = () => {
  const { data: orders, isLoading, isError, refetch } = useGetOrdersQuery();

  // --- Loading and errors ---
  if (isLoading) return <Loader label="Loading your orders" />;

  if (isError) {
    return (
      <div className="container">
        <LoadError title="Could not load your orders" onRetry={refetch} />
      </div>
    );
  }

  // --- No orders yet ---
  if (orders.length === 0) {
    return (
      <div className="container">
        <StatusMessage
          icon={Receipt}
          titleAs="h1"
          title="No orders yet"
          message="Your orders will show up here after your first purchase."
          actionLabel="Explore stories"
          actionTo="/explore"
        />
      </div>
    );
  }

  // --- Orders ---
  return (
    <div className="container">
      <div className="narrow-column">
        <h1 className="page-title">Order history</h1>

        <ul className={styles.list}>
          {orders.map((order) => (
            <OrderListItem key={order.id} order={order} />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default OrderHistoryPage;
