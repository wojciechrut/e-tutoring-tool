import { FC } from "react";
import styles from "./register-form.module.scss";
import { FormInputs, renderFormInputs } from "helpers/form-inputs";
import { Button } from "components/common/button";
import { useForm } from "react-hook-form";
import { useAuth } from "contexts/auth";

type FieldValues = {
  nickname: string;
  email: string;
  password: string;
  avatar?: string;
};

export const RegisterForm: FC = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
  } = useForm<FieldValues>();
  const { register: registerUser } = useAuth();

  const onSubmit = (values: FieldValues) => {
    registerUser(values);
  };

  const inputs: FormInputs<FieldValues> = [
    {
      name: "nickname",
      type: "text",
      htmlType: "text",
      label: "Nickname",
      registerOptions: {
        required: "Please specify your nickname.",
        pattern: {
          value: /^[A-Za-z0-9żźćńółęąśŻŹĆĄŚĘŁÓŃ]{5,14}$/,
          message: "Nickname should have 5-14 alphanumeric characters.",
        },
      },
    },
    {
      name: "email",
      type: "text",
      htmlType: "email",
      label: "Email",
      placeholder: "example@gmail.com",
      registerOptions: {
        required: "Please enter an email",
        pattern: {
          value: /^\S+@\S+\.\S+$/,
          message: "Invalid email address.",
        },
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
        pattern: {
          value:
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-ZżźćńółęąśŻŹĆĄŚĘŁÓŃ!@#$%^&*()\d]{8,25}$/,
          message: "Password too weak.",
        },
      },
    },
    {
      name: "avatar",
      type: "file",
      multiple: false,
      accept: "image",
      label: "Profile picture",
      registerOptions: {
        required: false,
      },
      watchedValue: watch("avatar") || undefined,
    },
  ];

  return (
    <form
      encType="multipart/form-data"
      className={styles.form}
      onSubmit={handleSubmit(onSubmit)}
    >
      {renderFormInputs(inputs, register, errors)}
      <Button type={"submit"} styleType={"primary"}>
        Register
      </Button>
    </form>
  );
};
