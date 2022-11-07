import { AxiosResponse } from "axios";
import {
  ChatFetchQuery,
  ChatResponseBody,
  MessageSendRequestBody,
  MultipleChatsResponseBody,
} from "@types";
import UserService from "services/user";
import api from "./api";
import { createFormData } from "helpers/form-data";

enum Paths {
  MINE = "chat/mine",
  ACCESS = "chat",
  SEND_MESSAGE = "message",
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

const sendMessage = async ({
  chat,
  text,
  files,
}: MessageSendRequestBody & { chat: string }) => {
  UserService.setAuthFromStorage();
  const { data: response }: AxiosResponse<string> = await api.post(
    Paths.SEND_MESSAGE,
    createFormData({ text, files }),
    { params: { chat } }
  );
  return response;
};

const ChatService = { getMyChats, accessChat, sendMessage };
export default ChatService;
