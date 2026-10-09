import { Navigate, Outlet, useLocation } from "react-router";
import { useSelector } from "react-redux";
import {
  selectIsAuthLoading,
  selectIsLoggedIn,
} from "../../../features/auth/authSelectors";
import Loader from "../../ui/feedback/Loader/Loader";

// ===== Protected route =====
// Wraps routes that require a signed-in user.
// Guests are sent to the log in page, and the page they came from
// is passed along so they can be sent back after logging in.

const ProtectedRoute = () => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const isLoading = useSelector(selectIsAuthLoading);
  const location = useLocation();

  // Wait until Supabase has told us who is signed in
  if (isLoading) return <Loader label="Checking your account" />;

  if (!isLoggedIn) {
    return <Navigate to="/login" replace state={{ from: location.pathname }} />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
