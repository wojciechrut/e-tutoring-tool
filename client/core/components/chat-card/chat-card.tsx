import { FC } from "react";
import styles from "./chat-card.module.scss";
import { UserAvatar } from "components/common/user-avatar";
import { useRouter } from "next/router";
import clsx from "clsx";

type ChatCardProps = {
  userId: string;
  avatar: string;
  nickname: string;
  lastMessage?: string;
  lastMessageDate?: string;
  isFriend: boolean;
  setCurrentUser: (user: string) => void;
};

export const ChatCard: FC<ChatCardProps> = ({
  avatar,
  nickname,
  lastMessage,
  lastMessageDate,
  isFriend,
  userId,
  setCurrentUser,
}) => {
  const router = useRouter();

  const showChat = () => {
    router
      .push("/chats", { query: { user: userId } }, { shallow: true })
      .then(() => setCurrentUser(userId));
  };

  return (
    <div className={clsx(styles.container)} onClick={showChat}>
      <UserAvatar className={styles.avatar} avatar={avatar} size={60} />
      <div className={styles.textSection}>
        <span className={styles.nickname}>{nickname}</span>
        <span className={styles.lastMessage}>
          {lastMessage || "Chat empty"}
        </span>
        <span className={styles.lastMessageDate}>
          {lastMessageDate}2011-11-10
        </span>
      </div>
    </div>
  );
};
