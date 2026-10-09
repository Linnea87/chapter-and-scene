import { useState } from "react";
import {
  ADDRESS_FIELDS,
  DEMO_NOTICE,
  EMPTY_ADDRESS,
  PAYMENT_METHODS,
} from "../../../features/checkout/checkoutConfig";
import Button from "../../ui/buttons/Button/Button";
import TextField from "../../ui/forms/TextField/TextField";
import styles from "./CheckoutForm.module.css";

// ===== Checkout form =====
// Shipping address (only when needsAddress is true), a demo notice and "Place order".
// onSubmit receives the address, or null for digital orders, and may throw.
// The error message is then shown in the form.

const CheckoutForm = ({ needsAddress, onSubmit }) => {
  // --- State ---
  const [address, setAddress] = useState(EMPTY_ADDRESS);
  const [paymentMethod, setPaymentMethod] = useState(PAYMENT_METHODS[0].id);
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // --- Handlers ---
  // Updates one field and keeps the others
  const handleAddressChange = (name, value) => {
    setAddress((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setIsSubmitting(true);

    try {
      await onSubmit(needsAddress ? address : null);
    } catch (error) {
      setErrorMessage(error.message);
      setIsSubmitting(false);
    }
  };

  // --- Render ---
  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      {needsAddress && (
        <fieldset className={styles.fieldset}>
          <legend className={styles.legend}>Shipping address</legend>

          {ADDRESS_FIELDS.map((field) => (
            <TextField
              key={field.name}
              label={field.label}
              value={address[field.name]}
              autoComplete={field.autoComplete}
              onChange={(value) => handleAddressChange(field.name, value)}
            />
          ))}
        </fieldset>
      )}

      {/* --- Payment method, simulated --- */}
      <fieldset className={styles.fieldset}>
        <legend className={styles.legend}>Payment method</legend>

        {PAYMENT_METHODS.map((method) => (
          <label key={method.id} className={styles.option}>
            <input
              type="radio"
              name="paymentMethod"
              value={method.id}
              checked={paymentMethod === method.id}
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
            {method.label}
          </label>
        ))}
      </fieldset>

      <p className={styles.notice}>{DEMO_NOTICE}</p>

      {/* Always rendered, so the layout does not jump when an error appears */}
      <p className={styles.error} role="alert">
        {errorMessage}
      </p>

      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Placing order…" : "Place order"}
      </Button>
    </form>
  );
};

export default CheckoutForm;
