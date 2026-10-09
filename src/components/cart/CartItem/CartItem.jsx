import { useDispatch } from "react-redux";
import { Trash2 } from "lucide-react";
import { removeItem } from "../../../features/cart/cartSlice";
import {
  getDeliveryLabel,
  isPhysicalFormat,
} from "../../../features/cart/cartHelpers";
import formatPrice from "../../../utils/formatPrice";
import IconButton from "../../ui/buttons/IconButton/IconButton";
import QuantityControl from "../QuantityControl/QuantityControl";
import Thumbnail from "../../ui/media/Thumbnail/Thumbnail";
import styles from "./CartItem.module.css";

// ===== Cart item =====
// One row in the cart: image, title, format, delivery, price and a remove button.
// Physical books also get a quantity control (CS-020).
// isReadOnly hides the controls, e.g. in the checkout.
// item: a row from the cart state, see createCartItem

const CartItem = ({ item, isReadOnly = false }) => {
  const dispatch = useDispatch();
  const itemClass = isReadOnly
    ? `${styles.item} ${styles.readOnly}`
    : styles.item;

  return (
    <li className={itemClass}>
      <Thumbnail src={item.imageUrl} className={styles.image} />

      {/* --- Title, format and delivery --- */}
      <div className={styles.info}>
        <h2 className={styles.title}>{item.title}</h2>
        <p className={styles.format}>{item.label}</p>
        <p className={styles.delivery}>{getDeliveryLabel(item.format)}</p>

        {!isReadOnly && isPhysicalFormat(item.format) && (
          <div className={styles.quantity}>
            <QuantityControl item={item} />
          </div>
        )}
      </div>

      {/* --- Price and remove --- */}
      <p className={styles.price}>
        {formatPrice(item.unitPrice * item.quantity)}
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
