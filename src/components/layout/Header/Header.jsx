// ===== Header =====
// One row of icons on every screen size: the logo and the account menu
// on the left, the main pages in the middle, and search and the cart on the right.
// The search icon folds out a search bar under the icons.

import { useRef } from "react";
import { Link } from "react-router";
import { Search } from "lucide-react";
import useCloseOnOutside from "../../../hooks/useCloseOnOutside";
import useDisclosure from "../../../hooks/useDisclosure";
import AccountMenu from "../AccountMenu/AccountMenu";
import CartLink from "../CartLink/CartLink";
import NavMenu from "../NavMenu/NavMenu";
import SearchBar from "../SearchBar/SearchBar";
import IconButton from "../../ui/buttons/IconButton/IconButton";
import logoIcon from "../../../assets/logo-icon.webp";
import styles from "./Header.module.css";

const Header = () => {
  // --- Search bar ---
  // Closes on a click outside the header or on Escape
  const {
    isOpen: isSearchOpen,
    toggle: toggleSearch,
    close: closeSearch,
  } = useDisclosure();
  const headerRef = useRef(null);
  useCloseOnOutside(headerRef, isSearchOpen, closeSearch);

  // --- Render ---
  return (
    <header ref={headerRef} className={styles.header}>
      <div className={styles.accountArea}>
        {/* The icon only, the full logo with the name is in the footer.
            The alt text gives the link its name for screen readers */}
        <Link to="/">
          <img
            src={logoIcon}
            alt="Chapter & Scene"
            width="40"
            height="40"
            className={styles.logoImage}
          />
        </Link>
        <AccountMenu />
      </div>

      <NavMenu />

      <div className={styles.actionsArea}>
        <IconButton
          icon={Search}
          label="Search"
          className={styles.searchButton}
          iconSize={22}
          strokeWidth={1.8}
          aria-expanded={isSearchOpen}
          onClick={toggleSearch}
        />
        <CartLink />
      </div>

      {isSearchOpen && (
        <div className={styles.searchArea}>
          <SearchBar />
        </div>
      )}
    </header>
  );
};

export default Header;
