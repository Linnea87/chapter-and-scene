// ===== Nav menu =====
// The main pages as icon links in the middle of the header:
// home, movies and series.
// The icons have no text, so aria-label names each link for screen readers.
// The link for the current page is highlighted.

import { NavLink } from "react-router";
import { Clapperboard, House, Tv } from "lucide-react";
import getNavLinkClass from "../../../utils/getNavLinkClass";
import styles from "./NavMenu.module.css";

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
        <NavLink to="/movies" className={getLinkClass} aria-label="Movies">
          <Clapperboard size={24} strokeWidth={1.8} aria-hidden="true" />
        </NavLink>
      </li>
      <li>
        <NavLink to="/series" className={getLinkClass} aria-label="Series">
          <Tv size={24} strokeWidth={1.8} aria-hidden="true" />
        </NavLink>
      </li>
    </ul>
  </nav>
);

export default NavMenu;
