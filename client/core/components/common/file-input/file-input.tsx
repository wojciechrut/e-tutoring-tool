import { Path, UseFormRegisterReturn } from "react-hook-form";
import { FC } from "react";
import styles from "./file-input.module.scss";
import clsx from "clsx";

const fileTypes = {
  image: "image/*",
  document:
    "application/msword, application/vnd.ms-excel, application/vnd.ms-powerpoint, text/plain, application/pdf",
  all: "application/msword, application/vnd.ms-excel, application/vnd.ms-powerpoint, text/plain, application/pdf, image/*",
};

export type FileInputProps = {
  name: Path<string>;
  register: UseFormRegisterReturn<string>;
  errorMessage?: string;
  label: string;
  accept: keyof typeof fileTypes;
  multiple?: boolean;
};

export const FileInput: FC<FileInputProps> = ({
  name,
  register,
  errorMessage,
  label,
  accept = "all",
  multiple = false,
}) => {
  return (
    <input
      className={clsx(styles.input)}
      type="file"
      {...register}
      multiple={multiple}
      accept={fileTypes[accept]}
    />
  );
};
