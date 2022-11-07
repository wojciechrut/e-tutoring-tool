import { Message } from "../../models/message";

export type MessageSendRequestBody = {
  text?: string;
  files?: Array<string>;
};

export type MessageSendResponseBody = Message;
