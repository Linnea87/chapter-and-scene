import styles from "./AuthLayout.module.css";

// ===== Auth layout =====
// Centred card shared by the log in and sign up pages.
// children is the form, footer is the link to the other page.

const AuthLayout = ({ title, subtitle, children, footer }) => (
  <div className="container">
    <section className={styles.card}>
      <h1 className={styles.title}>{title}</h1>
      <p className={styles.subtitle}>{subtitle}</p>

      {children}

      <p className={styles.footer}>{footer}</p>
    </section>
  </div>
);

export default AuthLayout;
