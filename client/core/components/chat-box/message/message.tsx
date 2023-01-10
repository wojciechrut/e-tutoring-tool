import { FC } from "react";
import styles from "./message.module.scss";
import { FileData } from "@types";
import clsx from "clsx";
import { UserAvatar } from "components/common/user-avatar";
import { FileDownload } from "components/common/file-download";

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
        styles.container,
        mine && styles.containerMine,
        lastOfSender && styles.containerLastOfSender
      )}
    >
      {text && <span className={clsx(styles.message)}>{text}</span>}
      {files && files.length > 0 && (
        <div className={styles.files}>
          {files.map(({ _id, originalName, path, type }) => (
            <FileDownload
              key={_id.toString()}
              name={originalName}
              path={path}
              type={type}
              className={mine ? styles.fileDownloadMine : ""}
            />
          ))}
        </div>
      )}
      {lastOfSender && (
        <>
          <UserAvatar
            className={styles.avatar}
            avatar={senderAvatar}
            size={25}
          />
          <div className={styles.nickname}>{sender}</div>
        </>
      )}
    </div>
  );
};
