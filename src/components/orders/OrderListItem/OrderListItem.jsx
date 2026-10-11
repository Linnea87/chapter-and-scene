import { Link } from "react-router";
import {
  formatOrderNumber,
  getItemCount,
} from "../../../features/orders/orderHelpers";
import formatDate from "../../../utils/formatDate";
import formatPrice from "../../../utils/formatPrice";
import pluralize from "../../../utils/pluralize";
import styles from "./OrderListItem.module.css";

// ===== Order list item =====
// One row in the order history: date, order number, number of items and total.
// The whole row links to the order page, which then shows a link back here.
// order: an order from getOrders, see toOrder

const OrderListItem = ({ order }) => (
  <li>
    <Link
      to={`/order/${order.id}`}
      state={{ fromOrderHistory: true }}
      className={styles.item}
    >
      <span className={styles.info}>
        <span className={styles.date}>{formatDate(order.createdAt)}</span>
        <span className={styles.details}>
          Order {formatOrderNumber(order.id)} ·{" "}
          {pluralize(getItemCount(order.items), "item")}
        </span>
      </span>

      <span className={styles.total}>{formatPrice(order.total)}</span>
    </Link>
  </li>
);

export default OrderListItem;
