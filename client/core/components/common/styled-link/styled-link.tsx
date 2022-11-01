import { FC, ReactNode } from "react";
import Link from "next/link";
import styles from "./styled.link.module.scss";
import clsx from "clsx";
import { useRouter } from "next/router";

export type StyledLinkProps = {
  children: ReactNode;
  path: string;
  className?: string;
  styleType?: "primary" | "secondary";
};

export const StyledLink: FC<StyledLinkProps> = ({
  children,
  path,
  className,
  styleType,
}) => {
  const { asPath } = useRouter();
  const active = asPath === path;

  return (
    <Link href={path}>
      <a
        className={clsx(
          styles.link,
          className,
          active && styles.linkActive,
          styleType === "primary" && styles.linkPrimary
        )}
      >
        {children}
      </a>
    </Link>
  );
};
