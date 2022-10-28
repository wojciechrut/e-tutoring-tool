import React, { ReactNode } from "react";
import styles from "./layout.module.scss";
import { Header } from "components/header";

type LayoutProps = {
  children: ReactNode;
};

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className={styles.globalWrapper}>
      <Header />
      <main className={styles.contentWrapper}>
        <div className={styles.mainContainer}>{children}</div>
      </main>
    </div>
  );
};
