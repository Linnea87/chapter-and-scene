import { NavLink, useNavigate } from "react-router";
import { LogIn, User } from "lucide-react";
import { useSelector } from "react-redux";
import {
  selectIsAuthLoading,
  selectIsLoggedIn,
} from "../../../features/auth/authSelectors";
import useDisclosure from "../../../hooks/useDisclosure";
import signOutUser from "../../../services/supabase/auth/signOutUser";
import Button from "../../ui/buttons/Button/Button";
import IconButton from "../../ui/buttons/IconButton/IconButton";
import styles from "./AccountMenu.module.css";

// ===== Account menu =====
// Logged out: a link to the log in page.
// Logged in: an account icon that opens a small menu with "Log out".

const AccountMenu = () => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const isLoading = useSelector(selectIsAuthLoading);
  const { isOpen, toggle, close } = useDisclosure();
  const navigate = useNavigate();

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
  // so a logged in user does not see the log in icon for a moment
  if (isLoading) return null;

  if (!isLoggedIn) {
    return (
      <NavLink to="/login" className={styles.link} aria-label="Log in">
        <LogIn size={24} strokeWidth={1.8} aria-hidden="true" />
      </NavLink>
    );
  }

  return (
    <div className={styles.account}>
      <IconButton
        icon={User}
        label="Account"
        iconSize={24}
        aria-expanded={isOpen}
        onClick={toggle}
      />

      {isOpen && (
        <div className={styles.menu}>
          <Button variant="text" size="small" onClick={handleLogOut}>
            Log out
          </Button>
        </div>
      )}
    </div>
  );
};

export default AccountMenu;
