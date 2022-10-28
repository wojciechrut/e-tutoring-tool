import { FC, ReactNode } from "react";
import Link from "next/link";
import styles from "./styled.link.module.scss";
import clsx from "clsx";

export type StyledLinkProps = {
  children: ReactNode;
  path: string;
  type?: "primary" | "secondary" | "transparent";
  size?: "normal" | "big";
  className?: string;
};

export const StyledLink: FC<StyledLinkProps> = ({
  children,
  path,
  type = "primary",
  size = "normal",
  className,
}) => {
  const styleClass =
    type === "primary"
      ? styles.linkPrimary
      : type === "secondary"
      ? styles.linkSecondary
      : styles.linkTransparent;

  const sizeClass = size === "big" && styles.linkBig;

  return (
    <Link
      href={path}
      className={clsx(styles.link, styleClass, sizeClass, className)}
    >
      <a>{children}</a>
    </Link>
  );
};
