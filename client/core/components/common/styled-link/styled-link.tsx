import { FC, ReactNode } from "react";
import Link from "next/link";
import styles from "./styled.link.module.scss";
import clsx from "clsx";
import { useRouter } from "next/router";

export type StyledLinkProps = {
  children: ReactNode;
  path: string;
  className?: string;
  activeClassName?: string;
};

export const StyledLink: FC<StyledLinkProps> = ({
  children,
  path,
  className,
  activeClassName,
}) => {
  const { asPath } = useRouter();
  const active = asPath === path;

  return (
    <Link
      href={path}
      className={clsx(styles.link, className, active && activeClassName)}
    >
      <a>{children}</a>
    </Link>
  );
};
