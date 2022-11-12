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
import { ChatBox } from "components/chat-box";
import { InviteFriendButton } from "components/common/invite-friend-button";

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

  const refetchChats = () => {
    ChatService.getMyChats().then((chats) => {
      setChats(chats);
      setLoadingChats(false);
    });
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
            <ul className={styles.chatsList}>
              {chats.map(({ users, lastMessage, _id }) => {
                const user = users.find((user) => user._id !== userData?._id);
                const filesCount = lastMessage?.files?.length || 0;
                const lastMessageLabel =
                  lastMessage?.text ||
                  (filesCount > 0 && `Files: ${filesCount}`) ||
                  "Chat empty";
                return (
                  user && (
                    <li key={_id.toString()}>
                      <ChatCard
                        avatar={user.avatar}
                        nickname={user.nickname}
                        lastMessage={lastMessageLabel}
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
          ) : currentChat && currentUser ? (
            <div className={styles.currentChatContainer}>
              <div className={styles.currentChatTop}>
                <div className={styles.currentChatUser}>
                  <UserAvatar avatar={currentUser.avatar} size={35} />
                  <span>{currentUser.nickname}</span>
                  <InviteFriendButton userId={currentUser._id.toString()} />
                </div>
                <Button
                  className={styles.currentChatBackButton}
                  styleType={"link-like"}
                  onClick={() => showAllChats()}
                >
                  chats &rarr;
                </Button>
              </div>
              <ChatBox
                className={styles.chatBox}
                chat={currentChat}
                updateLastMessage={refetchChats}
              />
            </div>
          ) : (
            <>Select chat</>
          )}
        </div>
      </div>
    </div>
  );
};
