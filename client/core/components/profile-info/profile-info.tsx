import { FC } from "react";
import styles from "./profile-info.module.scss";
import { useAuth } from "contexts/auth";
import { UserAvatar } from "components/common/user-avatar";

export const ProfileInfo: FC = () => {
  const { user, logout } = useAuth();

  if (!user) {
    return <>todo...</>;
  }

  const { avatar, nickname, email, friends } = user;

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <UserAvatar avatar={avatar} size={100} className={styles.avatar} />
        <div className={styles.userInfo}>
          <p>{nickname}</p>
          <p>{email}</p>
        </div>
      </div>
    </div>
  );
};
