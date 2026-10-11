import { useSelector } from "react-redux";
import {
  selectAmountToFreeShipping,
  selectHasPhysicalItems,
  selectShipping,
  selectSubtotal,
  selectTotal,
} from "../../../features/cart/cartSelectors";
import Price from "../../pricing/Price/Price";
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
// Subtotal, shipping and total for the cart.
// Shipping is only shown when the cart has a physical book.
// Amounts show a conversion next to them when another currency is selected.
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
        <SummaryRow label="Subtotal" value={<Price amount={subtotal} />} />

        {hasPhysicalItems && (
          <SummaryRow
            label="Shipping"
            value={shipping === 0 ? "Free" : <Price amount={shipping} />}
          />
        )}

        <SummaryRow label="Total" value={<Price amount={total} />} isTotal />
      </dl>

      {/* --- Free shipping hint, only while shipping is charged --- */}
      {amountToFreeShipping > 0 && (
        <p className={styles.hint}>
          Add <Price amount={amountToFreeShipping} /> more for free shipping
        </p>
      )}
    </section>
  );
};

export default CartSummary;
