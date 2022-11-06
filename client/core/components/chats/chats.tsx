import { FC, useEffect, useState } from "react";
import { ChatResponseBody, MultipleChatsResponseBody } from "@types";
import ChatService from "services/chat";
import styles from "./chats.module.scss";
import { ChatCard } from "components/chat-card";
import { useAuth } from "contexts/auth";
import Spinner from "assets/spinner.svg";
import clsx from "clsx";
import { useRouter } from "next/router";
import { Button } from "components/common/button";
import { printDatabaseDate } from "helpers/date";
import { UserAvatar } from "components/common/user-avatar";

export const Chats: FC = () => {
  const { push } = useRouter();
  const { user } = useRouter().query;
  const [currentUserId, setCurrentUserId] = useState<string | null>();
  const { user: userData } = useAuth();
  const [chats, setChats] = useState<MultipleChatsResponseBody | null>();
  const [loadingChats, setLoadingChats] = useState<boolean>(true);
  const [currentChat, setCurrentChat] = useState<ChatResponseBody | null>();
  const [loadingCurrentChat, setLoadingCurrentChat] = useState<boolean>(false);

  useEffect(() => {
    const queryUser = typeof user === "string" ? user : undefined;
    setCurrentUserId(queryUser);
  }, [user]);

  useEffect(() => {
    if (currentUserId) {
      setLoadingCurrentChat(true);
      ChatService.accessChat({
        userId: currentUserId,
        meetingId: undefined,
      }).then((chat) => {
        setCurrentChat(chat);
        setLoadingCurrentChat(false);
      });
    }

    if (!currentUserId) {
      setCurrentChat(null);
    }
  }, [currentUserId]);

  useEffect(() => {
    ChatService.getMyChats().then((chats) => {
      setChats(chats);
      setLoadingChats(false);
    });
  }, []);

  const showAllChats = () => {
    push("/chats", { query: undefined }, { shallow: true }).then(() =>
      setCurrentUserId(null)
    );
  };

  const currentUser = currentChat?.users.find(
    (user) => user._id !== userData?._id
  );

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
                        setCurrentUser={setCurrentUserId}
                        lastMessageDate={
                          lastMessage &&
                          printDatabaseDate(lastMessage.createdAt)
                        }
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
          {loadingCurrentChat ? (
            <Spinner />
          ) : (
            <div className={styles.currentChatContainer}>
              {currentChat && currentUser ? (
                <div className={styles.currentChatTop}>
                  <div className={styles.currentChatUser}>
                    <UserAvatar avatar={currentUser.avatar} size={35} />
                    <span>{currentUser.nickname}</span>
                  </div>
                  <Button
                    className={styles.currentChatBackButton}
                    styleType={"link-like"}
                    onClick={() => showAllChats()}
                  >
                    chats &rarr;
                  </Button>
                </div>
              ) : (
                <>Select chat</>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};