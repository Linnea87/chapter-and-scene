import { Link, useLocation, useNavigate } from "react-router";
import signUpUser from "../../services/supabase/auth/signUpUser";
import { getRedirectPath } from "../../features/auth/authHelpers";
import AuthForm from "../../components/auth/AuthForm/AuthForm";
import AuthLayout from "../../components/auth/AuthLayout/AuthLayout";

// ===== Sign up page =====

const SignUpPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const redirectTo = getRedirectPath(location);

  // Throws on failure, AuthForm shows the message
  const handleSubmit = async (credentials) => {
    await signUpUser(credentials);
    navigate(redirectTo, { replace: true });
  };

  return (
    <AuthLayout
      title="Create account"
      subtitle="Save your library and orders."
      footer={
        <>
          Have an account?{" "}
          <Link to="/login" state={location.state}>
            Log in
          </Link>
        </>
      }
    >
      <AuthForm
        submitLabel="Create account"
        passwordAutoComplete="new-password"
        onSubmit={handleSubmit}
      />
    </AuthLayout>
  );
};

export default SignUpPage;
