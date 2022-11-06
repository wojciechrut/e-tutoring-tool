import { FC } from "react";
import styles from "./chat-box.module.scss";
import { ChatResponseBody } from "@types";

type ChatBoxProps = {
  chat: ChatResponseBody;
};

export const ChatBox: FC<ChatBoxProps> = ({ chat }) => {
  return <div className={styles.container}>AA</div>;
};
