import { Link, useNavigate } from "react-router";
import signInUser from "../../services/supabase/auth/signInUser";
import AuthForm from "../../components/auth/AuthForm/AuthForm";
import AuthLayout from "../../components/auth/AuthLayout/AuthLayout";

// ===== Log in page =====

const LoginPage = () => {
  const navigate = useNavigate();

  // Throws on failure, AuthForm shows the message
  const handleSubmit = async (credentials) => {
    await signInUser(credentials);
    navigate("/");
  };

  return (
    <AuthLayout
      title="Log in"
      subtitle="Welcome."
      footer={
        <>
          No account? <Link to="/signup">Sign up</Link>
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
