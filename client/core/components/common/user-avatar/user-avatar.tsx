import { FC } from "react";
import Image from "next/image";
import { staticSource } from "helpers/static-path";
import clsx from "clsx";
import styles from "./user-avatar.module.scss";

type UserAvatarProps = {
  avatar: string;
  className?: string;
  size: number;
};

export const UserAvatar: FC<UserAvatarProps> = ({
  avatar,
  size,
  className,
}) => {
  return (
    <div className={clsx(styles.wrapper, className)}>
      <Image
        className={styles.avatar}
        src={staticSource(avatar)}
        alt="user-avatar"
        width={size}
        height={size}
        objectFit={"cover"}
      />
    </div>
  );
};
