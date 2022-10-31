import { FC } from "react";
import styles from "./auth-forms.module.scss";
import { Button } from "components/common/button";
import { LoginForm } from "components/login-form";
import { RegisterForm } from "components/register-form";
import { useAuth } from "contexts/auth";
import { useStoredState } from "hooks/useStoredState";

export const AuthForms: FC = () => {
  const [currentForm, setCurrentForm] = useStoredState<"login" | "register">(
    "current-auth-form",
    "login"
  );
  const { error } = useAuth();

  const isLogin = currentForm === "login";
  return (
    <div className={styles.container}>
      <div className={styles.heading}>
        {isLogin ? "Sign in" : "Create account"}
      </div>
      {isLogin ? <LoginForm /> : <RegisterForm />}

      <div className={styles.errorMessage}>{error?.messages[0]}</div>
      <div className={styles.hint}>
        {isLogin ? "Don't have account yet? " : "Already have an account? "}
        <Button
          onClick={() => setCurrentForm(isLogin ? "register" : "login")}
          styleType={"link-like"}
          className={styles.hintLink}
        >
          Click here
        </Button>
      </div>
    </div>
  );
};
