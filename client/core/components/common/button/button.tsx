import { FC, ReactNode, useState } from "react";
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
  disabled?: boolean;
  confirm?: boolean;
};

export const Button: FC<ButtonProps> = ({
  children,
  onClick,
  className,
  styleType = "primary",
  loading = false,
  disabled = false,
  type,
  confirm,
}) => {
  const [isConfirm, setConfirm] = useState(false);

  const finalOnClick =
    !confirm || isConfirm
      ? () => {
          onClick && onClick();
          setConfirm(false);
        }
      : () => {
          setConfirm(true);
        };

  return (
    <button
      onClick={finalOnClick}
      type={type}
      className={clsx(
        styles.button,
        styleType === "link-like" && styles.buttonLinkLike,
        styleType === "primary" && styles.buttonPrimary,
        styleType === "secondary" && styles.buttonSecondary,
        className
      )}
      disabled={disabled || loading}
    >
      {loading ? (
        <Spinner className={styles.spinner} />
      ) : isConfirm ? (
        <>
          Confirm
          <button
            className={styles.confirmButton}
            onClick={() => setConfirm(false)}
          >
            X
          </button>
        </>
      ) : (
        children
      )}
    </button>
  );
};
