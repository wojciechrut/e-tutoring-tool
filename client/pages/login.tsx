import type { NextPage } from "next";
import { AuthRedirect } from "components/auth-redirect";
import { AuthForms } from "components/auth-forms";

const Login: NextPage = () => {
  return (
    <AuthRedirect redirect={"authorized"}>
      <AuthForms />
    </AuthRedirect>
  );
};

export default Login;
