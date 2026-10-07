import { useSelector } from "react-redux";
import {
  selectAmountToFreeShipping,
  selectHasPhysicalItems,
  selectShipping,
  selectSubtotal,
  selectTotal,
} from "../../../features/cart/cartSelectors";
import formatPrice from "../../../utils/formatPrice";
import styles from "./CartSummary.module.css";

// ===== Summary row =====
// One label and amount, only used inside CartSummary
const SummaryRow = ({ label, value, isTotal = false }) => (
  <div className={isTotal ? `${styles.row} ${styles.total}` : styles.row}>
    <dt>{label}</dt>
    <dd className={styles.value}>{value}</dd>
  </div>
);

// ===== Cart summary =====
// Subtotal, shipping and total for the cart (CS-021).
// Shipping is only shown when the cart has a physical book.
// className lets the parent decide the spacing.

const CartSummary = ({ className }) => {
  const subtotal = useSelector(selectSubtotal);
  const shipping = useSelector(selectShipping);
  const total = useSelector(selectTotal);
  const hasPhysicalItems = useSelector(selectHasPhysicalItems);
  const amountToFreeShipping = useSelector(selectAmountToFreeShipping);

  return (
    <section className={className} aria-label="Order summary">
      <dl className={styles.list}>
        <SummaryRow label="Subtotal" value={formatPrice(subtotal)} />

        {hasPhysicalItems && (
          <SummaryRow
            label="Shipping"
            value={shipping === 0 ? "Free" : formatPrice(shipping)}
          />
        )}

        <SummaryRow label="Total" value={formatPrice(total)} isTotal />
      </dl>

      {/* --- Free shipping hint, only while shipping is charged --- */}
      {amountToFreeShipping > 0 && (
        <p className={styles.hint}>
          Add {formatPrice(amountToFreeShipping)} more for free shipping
        </p>
      )}
    </section>
  );
};

export default CartSummary;
