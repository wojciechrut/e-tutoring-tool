import { Chat } from "../../models/chat";
import { ModelId } from "../../models/types/_id";

export type ChatFetchQuery =
  | {
      userId: string;
      meetingId: undefined;
    }
  | {
      userId: undefined;
      meetingId: string;
    };

export type ChatAccessQuery = {
  chat: ModelId;
};

export type ChatResponseBody = Chat;
export type MultipleChatsResponseBody = Array<Omit<Chat, "messages">>;
