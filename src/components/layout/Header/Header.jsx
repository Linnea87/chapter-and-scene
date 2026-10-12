import AccountMenu from "../AccountMenu/AccountMenu";
import CartLink from "../CartLink/CartLink";
import CurrencySelect from "../CurrencySelect/CurrencySelect";
import NavMenu from "../NavMenu/NavMenu";
import styles from "./Header.module.css";

// ===== Header =====
// Icons only, on every screen size: the account menu on the left,
// the main pages in the middle and the cart on the right.
// The site name is shown as the heading on the home page instead.

const Header = () => (
  <header className={styles.header}>
    <div className={styles.accountArea}>
      <AccountMenu />
    </div>

    <NavMenu />

    {/* The currency moves into the account menu in the next step */}
    <div className={styles.actionsArea}>
      <CurrencySelect />
      <CartLink />
    </div>
  </header>
);

export default Header;
