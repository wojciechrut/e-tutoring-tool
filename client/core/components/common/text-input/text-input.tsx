import styles from "./text-input.module.scss";
import { Path, UseFormRegisterReturn } from "react-hook-form";
import { FC } from "react";
import clsx from "clsx";

export type TextInputProps = {
  htmlType: "text" | "password" | "email";
  name: Path<string>;
  placeholder?: string;
  register: UseFormRegisterReturn<string>;
  errorMessage?: string;
  label: string;
};

export const TextInput: FC<TextInputProps> = ({
  htmlType,
  name,
  placeholder,
  register,
  label,
  errorMessage,
}) => {
  return (
    <div className={styles.inputGroup}>
      <label className={styles.label} htmlFor={name.toString()}>
        {label}
      </label>
      <input
        className={clsx(styles.input, errorMessage && styles.inputWithError)}
        type={htmlType}
        placeholder={placeholder}
        {...register}
      />
      {errorMessage && <p className={styles.errorMessage}>{errorMessage}</p>}
    </div>
  );
};
