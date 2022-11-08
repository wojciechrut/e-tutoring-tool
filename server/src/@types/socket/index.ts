import { Message } from "../../models/message";

export interface ServerToClientEvents {
  connected: () => void;
  messageReceived: ((message: Message) => void) | undefined;
}

export interface ClientToServerEvents {
  setup: (userId: string) => void;
  joinChat: (chatId: string) => void;
  sendMessage: (message: Message) => void;
}
