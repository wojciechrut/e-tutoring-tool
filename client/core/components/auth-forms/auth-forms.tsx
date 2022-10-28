import { FC, useState } from "react";
import styles from "./auth-forms.module.scss";
import { Button } from "components/common/button";

export const AuthForms: FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  return (
    <div className={styles.container}>
      <div className={styles.heading}>
        {isLogin ? "Sign in" : "Create account"}
      </div>
      {isLogin ? "Login form" : "Register form"}
      <div className={styles.hint}>
        {isLogin ? "Don't have account yet? " : "Already have an account? "}
        <Button
          onClick={() => setIsLogin((prev) => !prev)}
          styleType={"link-like"}
          className={styles.hintLink}
        >
          Click here
        </Button>
      </div>
    </div>
  );
};
