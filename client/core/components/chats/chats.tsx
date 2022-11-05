import { FC, useEffect, useState } from "react";
import { ChatResponseBody, MultipleChatResponseBody } from "@types";
import ChatService from "services/chat";

type ChatsProps = {
  currentUser: string;
};

export const Chats: FC<ChatsProps> = ({ currentUser }) => {
  const [chats, setChats] = useState<MultipleChatResponseBody | null>();
  const [loadingChats, setLoadingChats] = useState<boolean>(true);
  const [currentChat, setCurrentChat] = useState<ChatResponseBody | null>();
  const [loadingCurrentChat, setLoadingCurrentChat] = useState<boolean>(true);

  useEffect(() => {
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
    <>
      {JSON.stringify(currentChat, undefined, 2)} <br /> <br />
      {"XXXXXXXXXXXXXXXX "}
      {JSON.stringify(chats, undefined, 2)}
    </>
  );
};
