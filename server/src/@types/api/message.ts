import { Message } from "../../models/message";

export type MessageSendRequestBody = {
  text?: string;
  files?: FileList;
};

export type MessageSendResponseBody = Message;
