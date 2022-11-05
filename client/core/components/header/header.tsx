import React, { useEffect, useState } from "react";
import styles from "./header.module.scss";
import clsx from "clsx";
import Link from "next/link";
import { useScroll } from "hooks/useScroll";
import { useAuth } from "contexts/auth";
import { NavLinks } from "components/nav-links";
import { Button } from "components/common/button";
import { useRouter } from "next/router";

export const Header: React.FC = () => {
  const isScrolled = useScroll();
  const { asPath } = useRouter();
  const { user } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [asPath]);

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
        <nav
          className={clsx(
            styles.navigation,
            isMenuOpen && styles.navigationOpenMobile
          )}
        >
          <NavLinks authenticated={!!user} />
        </nav>
        <Button
          styleType={"plain"}
          onClick={() => setIsMenuOpen((prev) => !prev)}
          className={styles.hamburger}
        >
          <i className="fa-solid fa-bars" />
        </Button>
        <div
          className={clsx(styles.blanket, isMenuOpen && styles.blanketShow)}
          onClick={() => setIsMenuOpen(false)}
        />
      </div>
    </div>
  );
};
