import { UseFormRegisterReturn } from "react-hook-form";
import { FC, useEffect, useRef, useState } from "react";
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
  noText?: boolean;
  className?: string;
  watchedValue?: FileList;
};

export const FileInput: FC<FileInputProps> = ({
  register,
  errorMessage,
  label,
  accept = "all",
  multiple = false,
  noText = false,
  className,
  watchedValue,
}) => {
  const { ref, ...restRegister } = register;
  const [fileValue, setFileValue] = useState<string | null>();
  const inputRef = useRef<HTMLInputElement | null>();

  useEffect(() => {
    setFileValue("");
    const files = watchedValue;
    if (files && files.length > 0) {
      const names = Array.from(files).map(({ name }) =>
        name.replace(/^.*[\\\/]/, "")
      );
      setFileValue(names.join(", "));
      return;
    }
  }, [watchedValue, restRegister]);

  return (
    <div className={styles.inputGroup}>
      <label
        className={clsx(
          styles.inputReplacement,
          noText && styles.inputReplacementNoText,
          className
        )}
        htmlFor={register.name}
      >
        <i className={clsx(styles.uploadIcon, "fa-solid fa-file-arrow-up")} />
        <span>Search files...</span>
      </label>
      {label && <div className={styles.inputLabel}>{label}</div>}
      <input
        id={register.name}
        className={clsx(styles.input)}
        type="file"
        {...restRegister}
        ref={(e) => {
          ref(e);
          inputRef.current = e;
        }}
        multiple={multiple}
        accept={fileTypes[accept]}
      />
      <div className={styles.filenames}>{fileValue}</div>
      {errorMessage && <div>{errorMessage}</div>}
    </div>
  );
};
