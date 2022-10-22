import type { NextPage } from "next";
import { Layout } from "components/layout";
import { AuthRedirect } from "components/auth-redirect";
import { useAuth } from "contexts/auth";

const Login: NextPage = () => {
  const { login, user } = useAuth();
  return (
    <AuthRedirect redirect={"authorized"}>
      <>{JSON.stringify(user, null, 2)}</>
      <button
        onClick={() =>
          login({ email: "test15@gmail.com", password: "Test1234" })
        }
      >
        login
      </button>
    </AuthRedirect>
  );
};

export default Login;
