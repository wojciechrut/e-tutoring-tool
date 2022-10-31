import { UseFormRegisterReturn } from "react-hook-form";
import { FC, useRef, useState } from "react";
import styles from "./file-input.module.scss";
import clsx from "clsx";

const fileTypes = {
  image: "image/*",
  document:
    "application/msword, application/vnd.ms-excel, application/vnd.ms-powerpoint, text/plain, application/pdf",
  all: "application/msword, application/vnd.ms-excel, application/vnd.ms-powerpoint, text/plain, application/pdf, image/*",
};

export type FileInputProps = {
  register: UseFormRegisterReturn<string>;
  errorMessage?: string;
  label: string;
  accept: keyof typeof fileTypes;
  multiple?: boolean;
};

export const FileInput: FC<FileInputProps> = ({
  register,
  errorMessage,
  label,
  accept = "all",
  multiple = false,
}) => {
  const { ref, ...reflessRegister } = register;
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [fileValue, setFileValue] = useState("");

  const onChange = () => {
    inputRef.current &&
      setFileValue(inputRef.current.value.replace(/^.*[\\\/]/, ""));
  };

  return (
    <div className={styles.inputGroup}>
      <div className={styles.inputLabel}>{label}</div>
      <label className={styles.inputReplacement} htmlFor={register.name}>
        <i className={clsx(styles.uploadIcon, "fa-solid fa-file-arrow-up")} />
        Search files...
      </label>
      <input
        id={register.name}
        className={clsx(styles.input)}
        type="file"
        {...reflessRegister}
        ref={(e) => {
          ref(e);
          inputRef.current = e;
        }}
        multiple={multiple}
        accept={fileTypes[accept]}
        onChange={onChange}
      />
      {inputRef.current && <div className={styles.filenames}>{fileValue}</div>}
      {errorMessage && (
        <div className={styles.errorMessage}>{errorMessage}</div>
      )}
    </div>
  );
};
