import { useDispatch } from "react-redux";
import { Trash2 } from "lucide-react";
import { removeItem } from "../../../features/cart/cartSlice";
import {
  getDeliveryLabel,
  isPhysicalFormat,
} from "../../../features/cart/cartHelpers";
import { DELIVERY_STATUS_LABELS } from "../../../features/orders/orderConfig";
import IconButton from "../../ui/buttons/IconButton/IconButton";
import QuantityControl from "../QuantityControl/QuantityControl";
import Price from "../../pricing/Price/Price";
import Thumbnail from "../../ui/media/Thumbnail/Thumbnail";
import styles from "./CartItem.module.css";

// ===== Cart item =====
// One row in the cart: image, title, format, delivery, price and a remove button.
// Physical books also get a quantity control.
// isReadOnly hides the controls, e.g. in the checkout.
// showConversion: false on the order page, where prices are only shown in USD.
// Order items also show their delivery status.
// item: a row from the cart state, see createCartItem

const CartItem = ({ item, isReadOnly = false, showConversion = true }) => {
  const dispatch = useDispatch();
  const itemClass = isReadOnly
    ? `${styles.item} ${styles.readOnly}`
    : styles.item;

  // Order items with a delivery status show it before the delivery time,
  // e.g. "Processing · Delivered in 2–4 days". Cart items have no status.
  const deliveryLabel = getDeliveryLabel(item.format);
  const deliveryText = item.deliveryStatus
    ? `${DELIVERY_STATUS_LABELS[item.deliveryStatus]} · ${deliveryLabel}`
    : deliveryLabel;

  return (
    <li className={itemClass}>
      <Thumbnail src={item.imageUrl} className={styles.image} />

      {/* --- Title, format and delivery --- */}
      <div className={styles.info}>
        <h2 className={styles.title}>{item.title}</h2>
        <p className={styles.format}>{item.label}</p>
        <p className={styles.delivery}>{deliveryText}</p>

        {!isReadOnly && isPhysicalFormat(item.format) && (
          <div className={styles.quantity}>
            <QuantityControl item={item} />
          </div>
        )}
      </div>

      {/* --- Price and remove --- */}
      <p className={styles.price}>
        <Price
          amount={item.unitPrice * item.quantity}
          showConversion={showConversion}
        />
      </p>

      {!isReadOnly && (
        <IconButton
          icon={Trash2}
          label={`Remove ${item.title}, ${item.label}`}
          className={styles.remove}
          onClick={() => dispatch(removeItem(item.key))}
        />
      )}
    </li>
  );
};

export default CartItem;
