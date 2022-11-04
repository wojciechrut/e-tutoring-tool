import { FC, ReactNode } from "react";
import styles from "./button.module.scss";
import clsx from "clsx";
import Spinner from "assets/spinner.svg";

export type ButtonProps = {
  children: ReactNode;
  onClick?: () => void;
  className?: string;
  styleType?: "primary" | "secondary" | "link-like" | "plain";
  type?: "submit" | "button" | "reset";
  loading?: boolean;
};

export const Button: FC<ButtonProps> = ({
  children,
  onClick,
  className,
  styleType = "primary",
  loading = false,
  type,
}) => {
  return (
    <button
      onClick={onClick}
      type={type}
      className={clsx(
        styles.button,
        styleType === "link-like" && styles.buttonLinkLike,
        styleType === "primary" && styles.buttonPrimary,
        styleType === "secondary" && styles.buttonSecondary,
        className
      )}
      disabled={loading}
    >
      {loading ? <Spinner className={styles.spinner} /> : children}
    </button>
  );
};
