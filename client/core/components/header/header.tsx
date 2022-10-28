import React from "react";
import styles from "./header.module.scss";
import clsx from "clsx";
import Link from "next/link";
import { useScroll } from "hooks/useScroll";

export const Header: React.FC = () => {
  const isScrolled = useScroll();

  return (
    <div className={clsx(styles.header, isScrolled && styles.headerHighlight)}>
      <div className={styles.container}>
        <Link href="/">
          <a>
            <div className={styles.logo}>
              <i
                className={clsx(
                  styles.logoIcon,
                  "fa-sharp fa-solid fa-chalkboard"
                )}
              />
              eTutoringTool
            </div>
          </a>
        </Link>
        <nav className={styles.navigation}></nav>
      </div>
    </div>
  );
};
