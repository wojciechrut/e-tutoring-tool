import React from "react";
import styles from "./layout.module.scss";

type LayoutProps = {};

export const Layout: React.FC<LayoutProps> = () => {
  return <div className={styles.layout}>ABC</div>;
};
