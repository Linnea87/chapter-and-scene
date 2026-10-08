import { useState } from "react";
import Button from "../../buttons/Button/Button";
import TextField from "../../forms/TextField/TextField";
import styles from "./AuthForm.module.css";

// ===== Auth form =====
// Email and password form shared by the log in and sign up pages.
// onSubmit receives { email, password } and may throw, the message is shown in the form.

const AuthForm = ({ submitLabel, passwordAutoComplete, onSubmit }) => {
  // --- State ---
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // --- Handlers ---
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setIsSubmitting(true);

    try {
      await onSubmit({ email, password });
    } catch (error) {
      setErrorMessage(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  // --- Render ---
  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <TextField
        label="Email"
        type="email"
        value={email}
        onChange={setEmail}
        autoComplete="email"
      />

      <TextField
        label="Password"
        type="password"
        value={password}
        onChange={setPassword}
        autoComplete={passwordAutoComplete}
      />

      {/* Always rendered, so the layout does not jump when an error appears */}
      <p className={styles.error} role="alert">
        {errorMessage}
      </p>

      <Button type="submit" disabled={isSubmitting}>
        {submitLabel}
      </Button>
    </form>
  );
};

export default AuthForm;
