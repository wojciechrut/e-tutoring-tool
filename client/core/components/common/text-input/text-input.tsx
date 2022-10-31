import styles from "./text-input.module.scss";
import { UseFormRegisterReturn } from "react-hook-form";
import { FC } from "react";
import clsx from "clsx";

export type TextInputProps = {
  htmlType: "text" | "password" | "email";
  placeholder?: string;
  register: UseFormRegisterReturn<string>;
  errorMessage?: string;
  label: string;
};

export const TextInput: FC<TextInputProps> = ({
  htmlType,
  placeholder,
  register,
  label,
  errorMessage,
}) => {
  return (
    <div className={styles.inputGroup}>
      <label className={styles.label} htmlFor={register.name}>
        {label}
      </label>
      <input
        id={register.name}
        className={clsx(styles.input, errorMessage && styles.inputWithError)}
        type={htmlType}
        placeholder={placeholder}
        {...register}
      />
      {errorMessage && <p className={styles.errorMessage}>{errorMessage}</p>}
    </div>
  );
};
