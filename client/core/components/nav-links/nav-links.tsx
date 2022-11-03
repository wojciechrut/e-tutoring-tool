import { FC } from "react";
import { StyledLink, StyledLinkProps } from "components/common/styled-link";
import { Button, ButtonProps } from "components/common/button";
import UserService from "services/user";
import styles from "./nav-links.module.scss";
import clsx from "clsx";

type NavItemCommon = { for: "common" | "auth" | "notAuth"; key: string };
type NavLink = { type: "link" } & StyledLinkProps & NavItemCommon;
type NavButton = { type: "button" } & ButtonProps & NavItemCommon;
type NavItem = NavLink | NavButton;

const isButton = (item: NavItem): item is NavButton => {
  return item.type === "button";
};

const navItems: Array<NavItem> = [
  {
    for: "auth",
    type: "link",
    path: "/meetings",
    children: "meetings",
    key: "meetings",
  },
  {
    for: "auth",
    type: "link",
    path: "/chats",
    children: "chats",
    key: "chats",
  },
  {
    for: "common",
    type: "link",
    path: "/leaflets",
    children: "Leaflets",
    key: "leaflets",
  },
  {
    for: "auth",
    type: "link",
    path: "/profile",
    children: "profile",
    key: "profile",
  },
  {
    for: "auth",
    type: "button",
    onClick: UserService.logout,
    children: "Logout",
    key: "logout",
    styleType: "secondary",
    className: styles.navItemPushRight,
  },
  {
    for: "notAuth",
    type: "link",
    path: "/login",
    children: "Login",
    key: "login",
    styleType: "primary",
    className: styles.navItemPushRight,
  },
];

type NavLinksProps = {
  authenticated: boolean;
};

export const NavLinks: FC<NavLinksProps> = ({ authenticated }) => {
  return (
    <ul className={styles.navLinks}>
      {navItems.map((item) => {
        if (
          (authenticated && item.for === "notAuth") ||
          (!authenticated && item.for === "auth")
        ) {
          return null;
        }
        if (isButton(item)) {
          const { children, key, className, ...props } = item;
          return (
            <li key={key} className={clsx(styles.navItem, className)}>
              <Button {...props}>{children}</Button>
            </li>
          );
        } else {
          const { children, key, className, ...props } = item;
          return (
            <li key={key} className={clsx(styles.navItem, className)}>
              <StyledLink key={key} {...props}>
                {children}
              </StyledLink>
            </li>
          );
        }
      })}
    </ul>
  );
};
