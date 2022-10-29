import { FC, ReactNode } from "react";
import styles from "./button.module.scss";
import clsx from "clsx";

type ButtonProps = {
  children: ReactNode;
  onClick?: () => void;
  className?: string;
  styleType?: "primary" | "secondary" | "link-like";
  type?: "submit" | "button" | "reset";
};

export const Button: FC<ButtonProps> = ({
  children,
  onClick,
  className,
  styleType = "primary",
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
        className
      )}
    >
      {children}
    </button>
  );
};
