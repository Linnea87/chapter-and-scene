import { Link, useNavigate } from "react-router";
import signUpUser from "../../services/supabase/auth/signUpUser";
import AuthForm from "../../components/auth/AuthForm/AuthForm";
import AuthLayout from "../../components/auth/AuthLayout/AuthLayout";

// ===== Sign up page =====

const SignUpPage = () => {
  const navigate = useNavigate();

  // Throws on failure, AuthForm shows the message
  const handleSubmit = async (credentials) => {
    await signUpUser(credentials);
    navigate("/");
  };

  return (
    <AuthLayout
      title="Create account"
      subtitle="Save your library and orders."
      footer={
        <>
          Have an account? <Link to="/login">Log in</Link>
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
