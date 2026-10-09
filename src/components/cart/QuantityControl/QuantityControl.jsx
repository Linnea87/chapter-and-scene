import { useDispatch } from "react-redux";
import { Minus, Plus } from "lucide-react";
import {
  decreaseQuantity,
  increaseQuantity,
} from "../../../features/cart/cartSlice";
import IconButton from "../../ui/buttons/IconButton/IconButton";
import styles from "./QuantityControl.module.css";

// ===== Quantity control =====
// Minus, quantity and plus for one cart row.
// Minus is disabled at 1, the row is removed with the remove button.
// item: a row from the cart state

const QuantityControl = ({ item }) => {
  const dispatch = useDispatch();
  const itemName = `${item.title}, ${item.label}`;

  return (
    <div
      className={styles.control}
      role="group"
      aria-label={`Quantity of ${itemName}`}
    >
      <IconButton
        icon={Minus}
        label={`Decrease quantity of ${itemName}`}
        disabled={item.quantity <= 1}
        onClick={() => dispatch(decreaseQuantity(item.key))}
      />

      {/* --- Current quantity, read aloud when it changes --- */}
      <span className={styles.quantity} aria-live="polite">
        {item.quantity}
      </span>

      <IconButton
        icon={Plus}
        label={`Increase quantity of ${itemName}`}
        onClick={() => dispatch(increaseQuantity(item.key))}
      />
    </div>
  );
};

export default QuantityControl;
