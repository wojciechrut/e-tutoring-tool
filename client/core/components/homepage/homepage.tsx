import { FC } from "react";
import styles from "./homepage.module.scss";

export const Homepage: FC = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.logo}>
        <span className={styles.icon}>
          <i className="fa-solid fa-chalkboard"></i>
        </span>
        eTutoringTool
      </h1>
      <p className={styles.paragraph}>
        A web application that serves as a complete tutoring and collaborative
        learning environment online.
      </p>
      <p className={styles.paragraph}>
        It allows real-time communication with file uploading, conducting
        meetings with chat and interactive whiteboard, posting announcements to
        find a study partner and more!
      </p>
    </div>
  );
};
