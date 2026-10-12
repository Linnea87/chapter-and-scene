import { Link } from "react-router";
import AccountMenu from "../AccountMenu/AccountMenu";
import CartLink from "../CartLink/CartLink";
import NavMenu from "../NavMenu/NavMenu";
import styles from "./Header.module.css";

// ===== Header =====
// The site name on top, linking to the home page.
// Below it, icons only, on every screen size: the account menu on the left,
// the main pages in the middle and the cart on the right.

const Header = () => (
  <header className={styles.header}>
    {/* Text logo in a handwritten font until a real logo is designed */}
    <Link to="/" className={styles.logo}>
      Chapter & Scene
    </Link>

    <div className={styles.accountArea}>
      <AccountMenu />
    </div>

    <NavMenu />

    <div className={styles.actionsArea}>
      <CartLink />
    </div>
  </header>
);

export default Header;
