import { NavLink } from "react-router";
import getNavLinkClass from "../../../utils/getNavLinkClass";
import styles from "./NavMenu.module.css";

// Adds the active class to the link that matches the current page
const getLinkClass = getNavLinkClass(styles.link, styles.active);

const NavMenu = ({ isOpen, onNavigate }) => {
  // Mobile only: the menu is shown when opened, and always visible from 600px via CSS
  const navClass = isOpen ? `${styles.nav} ${styles.open}` : styles.nav;

  // onNavigate closes the mobile menu after a link is clicked
  return (
    <nav id="main-navigation" aria-label="Main navigation" className={navClass}>
      <ul className={styles.navList}>
        {/* end: only active on the exact root path */}
        <li>
          <NavLink to="/" className={getLinkClass} onClick={onNavigate}>
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to="/explore" className={getLinkClass} onClick={onNavigate}>
            Explore
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default NavMenu;