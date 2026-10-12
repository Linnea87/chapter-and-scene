import { NavLink } from "react-router";
import { Compass, House } from "lucide-react";
import getNavLinkClass from "../../../utils/getNavLinkClass";
import styles from "./NavMenu.module.css";

// ===== Nav menu =====
// The main pages as icon links in the middle of the header.
// The icons have no text, so aria-label names each link for screen readers.
// The link for the current page is highlighted.

// Adds the active class to the link that matches the current page
const getLinkClass = getNavLinkClass(styles.link, styles.active);

const NavMenu = () => (
  <nav aria-label="Main navigation">
    <ul className={styles.navList}>
      {/* end: only active on the exact root path, not on every page */}
      <li>
        <NavLink to="/" end className={getLinkClass} aria-label="Home">
          <House size={24} strokeWidth={1.8} aria-hidden="true" />
        </NavLink>
      </li>
      <li>
        <NavLink to="/explore" className={getLinkClass} aria-label="Explore">
          <Compass size={24} strokeWidth={1.8} aria-hidden="true" />
        </NavLink>
      </li>
    </ul>
  </nav>
);

export default NavMenu;
