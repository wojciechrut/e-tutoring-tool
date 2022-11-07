import { FC } from "react";
import styles from "./message.module.scss";
import { FileData } from "@types";
import clsx from "clsx";
import { UserAvatar } from "components/common/user-avatar";

type MessageProps = {
  text?: string;
  date: string;
  files?: Array<FileData>;
  sender: string;
  senderAvatar: string;
  lastOfSender: boolean;
  mine: boolean;
};

export const Message: FC<MessageProps> = ({
  text,
  files,
  sender,
  mine,
  date,
  lastOfSender,
  senderAvatar,
}) => {
  return (
    <div
      className={clsx(
        styles.message,
        mine && styles.messageMine,
        lastOfSender && styles.messageLastOfSender
      )}
    >
      {lastOfSender && (
        <UserAvatar
          className={styles.messageAvatar}
          avatar={senderAvatar}
          size={25}
        />
      )}
      {text}
    </div>
  );
};
