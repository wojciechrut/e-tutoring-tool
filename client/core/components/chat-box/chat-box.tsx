import { FC, useRef } from "react";
import styles from "./chat-box.module.scss";
import { ChatResponseBody } from "@types";
import clsx from "clsx";
import { useAuth } from "contexts/auth";
import { Message } from "components/chat-box/message";
import { useScrollAnchor } from "hooks/useScrollAnchor";
import { Panel } from "components/chat-box/panel";
import { useSocket } from "hooks/useSocket";

type ChatBoxProps = {
  chat: ChatResponseBody;
  className?: string;
};

export const ChatBox: FC<ChatBoxProps> = ({ chat, className }) => {
  const { messages } = chat;
  const { user } = useAuth();
  const anchorRef = useRef<HTMLDivElement>(null);
  const { connected } = useSocket();
  const scrollRefresh = useScrollAnchor(anchorRef);

  return (
    <div className={clsx(styles.container, className)}>
      <div className={styles.messages}>
        {messages.map(({ _id, sender, files, text, createdAt }, index) => (
          <Message
            key={_id.toString()}
            text={text}
            date={createdAt}
            files={files}
            sender={sender.nickname}
            senderAvatar={sender.avatar}
            lastOfSender={sender._id !== messages[index + 1]?.sender._id}
            mine={sender._id === user?._id}
          />
        ))}
        <div ref={anchorRef} />
      </div>
      <div className={styles.panel}>
        <Panel chatId={chat._id.toString()} />
        {connected && "lol"}
      </div>
    </div>
  );
};
