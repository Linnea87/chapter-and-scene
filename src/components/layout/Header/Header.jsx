import { Link } from "react-router";
import useDisclosure from "../../../hooks/useDisclosure";
import AccountMenu from "../AccountMenu/AccountMenu";
import CartLink from "../CartLink/CartLink";
import MenuToggle from "../MenuToggle/MenuToggle";
import NavMenu from "../NavMenu/NavMenu";
import styles from "./Header.module.css";

const Header = () => {
  // --- State ---
  // Open and closed state for the mobile menu
  const {
    isOpen: isMenuOpen,
    toggle: toggleMenu,
    close: closeMenu,
  } = useDisclosure();

  // --- Render ---
  return (
    <header className={styles.header}>
      {/* Hidden from 600px, where the nav links are always visible */}
      <div className={styles.menuArea}>
        <MenuToggle isOpen={isMenuOpen} onToggle={toggleMenu} />
      </div>

      {/* Text logo until the real logo is designed */}
      <Link to="/" onClick={closeMenu} className={styles.logoLink}>
        Chapter & Scene
      </Link>

      <div className={styles.actionsArea}>
        <AccountMenu />
        <CartLink onNavigate={closeMenu} />
      </div>

      <div className={styles.navArea}>
        <NavMenu isOpen={isMenuOpen} onNavigate={closeMenu} />
      </div>
    </header>
  );
};

export default Header;
