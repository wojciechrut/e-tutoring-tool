import { FC } from "react";
import styles from "./profile-info.module.scss";
import { useAuth } from "contexts/auth";
import Image from "next/image";
import { staticSource } from "helpers/static-path";

export const ProfileInfo: FC = () => {
  const { user, logout } = useAuth();

  if (!user) {
    return <>todo...</>;
  }

  const { avatar, nickname, email, friends } = user;

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.avatarWrapper}>
          <Image
            className={styles.avatar}
            src={staticSource(user.avatar)}
            alt=""
            width={100}
            height={100}
            objectFit={"cover"}
          />
        </div>
        <div className={styles.userInfo}>
          <p>{nickname}</p>
          <p>{email}</p>
        </div>
      </div>
    </div>
  );
};
