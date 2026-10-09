import { Link, useLocation, useNavigate } from "react-router";
import signInUser from "../../services/supabase/auth/signInUser";
import { getRedirectPath } from "../../features/auth/authHelpers";
import AuthForm from "../../components/auth/AuthForm/AuthForm";
import AuthLayout from "../../components/auth/AuthLayout/AuthLayout";

// ===== Log in page =====

const LoginPage = () => {
  const navigate = useNavigate();

  const location = useLocation();

  const redirectTo = getRedirectPath(location);

  // Throws on failure, AuthForm shows the message
  const handleSubmit = async (credentials) => {
    await signInUser(credentials);
    navigate(redirectTo, { replace: true });
  };

  return (
    <AuthLayout
      title="Log in"
      subtitle="Welcome."
      footer={
        <>
          No account?
          <Link to="/signup" state={location.state}>
            Sign up
          </Link>
        </>
      }
    >
      <AuthForm
        submitLabel="Log in"
        passwordAutoComplete="current-password"
        onSubmit={handleSubmit}
      />
    </AuthLayout>
  );
};

export default LoginPage;
