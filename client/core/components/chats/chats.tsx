import { FC, useEffect, useState } from "react";
import { ChatResponseBody, MultipleChatsResponseBody } from "@types";
import ChatService from "services/chat";
import styles from "./chats.module.scss";
import { ChatCard } from "components/chat-card";
import { useAuth } from "contexts/auth";

type ChatsProps = {
  currentUser?: string;
};

export const Chats: FC<ChatsProps> = ({ currentUser }) => {
  const [chats, setChats] = useState<MultipleChatsResponseBody | null>();
  const [loadingChats, setLoadingChats] = useState<boolean>(true);
  const [currentChat, setCurrentChat] = useState<ChatResponseBody | null>();
  const [loadingCurrentChat, setLoadingCurrentChat] = useState<boolean>(true);
  const { user: userData } = useAuth();

  useEffect(() => {
    currentUser &&
      ChatService.accessChat({
        userId: currentUser,
        meetingId: undefined,
      }).then((chat) => {
        setCurrentChat(chat);
        setLoadingCurrentChat(false);
      });
  }, [currentUser]);

  useEffect(() => {
    ChatService.getMyChats().then((chats) => {
      setChats(chats);
      setLoadingChats(false);
    });
  }, []);

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.chats}>
          {chats ? (
            <ul className={styles.chatList}>
              {chats.map(({ users, lastMessage, _id }) => {
                const user = users.find((user) => user._id !== userData?._id);
                const isFriend =
                  userData?.friends.includes(user?._id || "") || false;
                return (
                  user && (
                    <ChatCard
                      avatar={user.avatar}
                      nickname={user.nickname}
                      lastMessage={lastMessage?.text}
                      isFriend={isFriend}
                      userId={user._id.toString()}
                    />
                  )
                );
              })}
            </ul>
          ) : (
            "You don't have any active chats yet"
          )}
        </div>
        <div className={styles.currentChat}></div>
      </div>
    </div>
  );
};
