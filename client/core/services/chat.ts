import { AxiosResponse } from "axios";
import {
  ChatFetchQuery,
  ChatResponseBody,
  MultipleChatsResponseBody,
} from "@types";
import UserService from "services/user";
import api from "./api";

enum Paths {
  MINE = "chat/mine",
  ACCESS = "chat",
}

const getMyChats = async () => {
  UserService.setAuthFromStorage();
  const { data: chats }: AxiosResponse<MultipleChatsResponseBody> =
    await api.get(Paths.MINE);
  return chats;
};

const accessChat = async ({ userId, meetingId }: ChatFetchQuery) => {
  UserService.setAuthFromStorage();
  if (meetingId) {
    console.log("todo chats by meeting");
    return;
  } else if (userId) {
    const { data: chat }: AxiosResponse<ChatResponseBody> = await api.get(
      Paths.ACCESS,
      {
        params: { userId },
      }
    );
    return chat;
  }
};

const ChatService = { getMyChats, accessChat };
export default ChatService;
