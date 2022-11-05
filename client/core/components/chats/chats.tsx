import { FC, useEffect, useState } from "react";
import { ChatResponseBody, MultipleChatsResponseBody } from "@types";
import ChatService from "services/chat";
import styles from "./chats.module.scss";
import { ChatCard } from "components/chat-card";
import { useAuth } from "contexts/auth";
import Spinner from "assets/spinner.svg";
import clsx from "clsx";
import { useRouter } from "next/router";

export const Chats: FC = () => {
  const { user } = useRouter().query;
  const [currentUser, setCurrentUser] = useState<string | null>();
  const { user: userData } = useAuth();
  const [chats, setChats] = useState<MultipleChatsResponseBody | null>();
  const [loadingChats, setLoadingChats] = useState<boolean>(true);
  const [currentChat, setCurrentChat] = useState<ChatResponseBody | null>();
  const [loadingCurrentChat, setLoadingCurrentChat] = useState<boolean>(true);
  const [showCurrentChat, setShowCurrentChat] = useState<boolean>(
    !!currentUser
  );

  useEffect(() => {
    const queryUser = typeof user === "string" ? user : undefined;
    setCurrentUser(queryUser);
  }, [user]);

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
        <div className={clsx(styles.chats, !currentChat && styles.chatsShow)}>
          {loadingChats ? (
            <Spinner />
          ) : chats ? (
            <ul>
              {chats.map(({ users, lastMessage, _id }) => {
                const user = users.find((user) => user._id !== userData?._id);
                const isFriend =
                  userData?.friends.includes(user?._id || "") || false;
                return (
                  user && (
                    <li key={_id.toString()}>
                      <ChatCard
                        avatar={user.avatar}
                        nickname={user.nickname}
                        lastMessage={lastMessage?.text}
                        isFriend={isFriend}
                        userId={user._id.toString()}
                        setCurrentUser={setCurrentUser}
                      />
                    </li>
                  )
                );
              })}
            </ul>
          ) : (
            "You don't have any active chats yet"
          )}
        </div>
        <div
          className={clsx(
            styles.currentChat,
            !!currentChat && styles.currentChatShow
          )}
        >
          {loadingChats ? <Spinner /> : <div> current chat</div>}
        </div>
      </div>
    </div>
  );
};
