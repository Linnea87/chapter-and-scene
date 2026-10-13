// ===== Header =====
// The site name on top, linking to the home page.
// Below it, icons only, on every screen size: the account menu on the left,
// the main pages in the middle, and search and the cart on the right.
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
      {/* Text logo in a handwritten font until a real logo is designed */}
      <Link to="/" className={styles.logo}>
        Chapter & Scene
      </Link>

      <div className={styles.accountArea}>
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
