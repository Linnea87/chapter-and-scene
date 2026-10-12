import { useRef } from "react";
import { useNavigate } from "react-router";
import { User } from "lucide-react";
import { useSelector } from "react-redux";
import useCloseOnOutside from "../../../hooks/useCloseOnOutside";
import useDisclosure from "../../../hooks/useDisclosure";
import signOutUser from "../../../services/supabase/auth/signOutUser";
import {
  selectIsAuthLoading,
  selectIsLoggedIn,
} from "../../../features/auth/authSelectors";
import CurrencySelect from "../CurrencySelect/CurrencySelect";
import Button from "../../ui/buttons/Button/Button";
import ButtonLink from "../../ui/buttons/ButtonLink/ButtonLink";
import IconButton from "../../ui/buttons/IconButton/IconButton";
import styles from "./AccountMenu.module.css";

// ===== Account menu =====
// An account icon on the left of the header that opens a small menu.
// Logged out: "Log in". The log in page links on to "Create account".
// Logged in: "My library", "Order history" and "Log out".
// The currency is chosen at the bottom of the menu for everyone.
// Closes on a click outside the menu or on Escape.

const AccountMenu = () => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const isLoading = useSelector(selectIsAuthLoading);
  const { isOpen, toggle, close } = useDisclosure();
  const navigate = useNavigate();

  // The icon and the menu, so a click on either does not close it
  const menuRef = useRef(null);
  useCloseOnOutside(menuRef, isOpen, close);

  // --- Handlers ---
  const handleLogOut = async () => {
    try {
      await signOutUser();
      close();
      navigate("/");
    } catch (error) {
      console.warn("Could not log out", error);
    }
  };

  // --- Render ---
  // Nothing is shown until Supabase has told us who is signed in,
  // so a logged in user does not see the logged out menu for a moment
  if (isLoading) return null;

  return (
    <div ref={menuRef} className={styles.account}>
      <IconButton
        icon={User}
        label="Account menu"
        iconSize={24}
        aria-expanded={isOpen}
        onClick={toggle}
      />

      {isOpen && (
        <div className={styles.menu}>
          {isLoggedIn ? (
            <>
              <ButtonLink to="/library" variant="text" onClick={close}>
                My library
              </ButtonLink>
              <ButtonLink to="/orders" variant="text" onClick={close}>
                Order history
              </ButtonLink>
              <Button variant="text" size="small" onClick={handleLogOut}>
                Log out
              </Button>
            </>
          ) : (
            <ButtonLink to="/login" variant="text" onClick={close}>
              Log in
            </ButtonLink>
          )}

          {/* --- Currency, for everyone --- */}
          <div className={styles.currency}>
            <CurrencySelect />
          </div>
        </div>
      )}
    </div>
  );
};

export default AccountMenu;
