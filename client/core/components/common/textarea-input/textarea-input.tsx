import { UseFormRegisterReturn } from "react-hook-form";
import { FC } from "react";
import styles from "./textarea-input.module.scss";

type TextAreaInputPros = {
  register: UseFormRegisterReturn<string>;
  placeholder?: string;
  rows: number;
  label?: string;
  className?: string;
  errorMessage?: string;
  defaultValue?: string;
};

export const TextAreaInput: FC<TextAreaInputPros> = ({
  register,
  rows,
  label,
  placeholder,
  errorMessage,
  defaultValue,
}) => {
  return (
    <div className={styles.inputGroup}>
      <label className={styles.label} htmlFor={register.name}>
        {label}
      </label>
      <textarea
        className={styles.textarea}
        id={register.name}
        {...register}
        rows={rows}
        defaultValue={defaultValue}
        placeholder={placeholder}
      />
      {errorMessage && <p className={styles.errorMessage}>{errorMessage}</p>}
    </div>
  );
};
