import React, { FC } from "react";
import styles from "./login-form.module.scss";
import { useForm } from "react-hook-form";
import { FormInputs, renderFormInputs } from "helpers/form-inputs";
import { Button } from "components/common/button";
import { useAuth } from "contexts/auth";

type FieldValues = {
  email: string;
  password: string;
};

const inputs: FormInputs<FieldValues> = [
  {
    name: "email",
    type: "text",
    htmlType: "email",
    label: "Email",
    placeholder: "example@gmail.com",
    registerOptions: {
      required: "Please enter an email",
    },
  },
  {
    name: "password",
    type: "text",
    htmlType: "password",
    label: "Password",
    placeholder: "Password",
    registerOptions: {
      required: "Please enter password",
    },
  },
];

export const LoginForm: FC = () => {
  const { login, loginError } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>();

  const onSubmit = async (values: FieldValues) => login(values);

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      {renderFormInputs(inputs, register, errors)}
      <Button type={"submit"} styleType={"primary"}>
        Log In
      </Button>
      <div className={styles.errorMessage}>{loginError?.messages[0]}</div>
    </form>
  );
};
