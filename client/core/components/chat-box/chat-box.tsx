import { FC, useEffect, useRef, useState } from "react";
import styles from "./chat-box.module.scss";
import { ChatResponseBody, MessageSendResponseBody } from "@types";
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
  const { user } = useAuth();
  const { connected, sendMessage, handleMessageReceived } = useSocket(
    user?._id.toString() as string
  );
  const [messages, setMessages] = useState(chat.messages);
  const anchorRef = useRef<HTMLDivElement>(null);
  const scrollRefresh = useScrollAnchor(anchorRef);

  const addMessage = (message: MessageSendResponseBody) => {
    sendMessage(message);
    setMessages((previous) => [...previous, message]);
  };

  useEffect(() => {
    handleMessageReceived((message) => {
      setMessages((previous) => [...previous, message]);
    });
  }, [handleMessageReceived]);

  useEffect(() => {
    scrollRefresh();
  }, [scrollRefresh, messages]);

  return (
    <div className={clsx(styles.container, className)}>
      <div className={styles.messages}>
        {messages.map(
          ({ _id, sender, files, text, createdAt }, index, array) => (
            <Message
              key={`${_id.toString()}-${array.length}`}
              text={text}
              date={createdAt}
              files={files}
              sender={sender.nickname}
              senderAvatar={sender.avatar}
              lastOfSender={sender._id !== messages[index + 1]?.sender._id}
              mine={sender._id === user?._id}
            />
          )
        )}
        <div ref={anchorRef} />
      </div>
      <div className={styles.panel}>
        <Panel chatId={chat._id.toString()} addMessage={addMessage} />
      </div>
    </div>
  );
};
