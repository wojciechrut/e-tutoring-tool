import { Message } from "../../models/message";

export interface ServerToClientEvents {
  connected: () => void;
  messageReceived: ((message: Message) => void) | undefined;
  objectReceived: ((object: any) => void) | undefined;
}

export interface ClientToServerEvents {
  setup: (userId: string) => void;
  joinChat: (chatId: string) => void;
  sendMessage: (message: Message) => void;
  joinWhiteboard: (whiteboardId: string) => void;
  leaveWhiteboard: (whiteboardId: string) => void;
  addObject: (whiteboardId: string, object: any) => void;
}
