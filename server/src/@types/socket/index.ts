import { Message } from "../../models/message";

export interface ServerToClientEvents {
  connected: () => void;
  //chat
  messageReceived: ((message: Message) => void) | undefined;
  //whiteboard
  objectReceived: ((object: any) => void) | undefined;
  //voicecall
  voicecallNewUser: ((userId: string) => void) | undefined;
  voicecallUserLeft: ((userId: string) => void) | undefined;
}

export interface ClientToServerEvents {
  setup: (userId: string) => void;
  joinChat: (chatId: string) => void;
  sendMessage: (message: Message) => void;
  joinWhiteboard: (whiteboardId: string) => void;
  leaveWhiteboard: (whiteboardId: string) => void;
  joinVoicecall: (meetingId: string, userId: string) => void;
  leaveVoicecall: (meetingId: string, userId: string) => void;
  addObject: (whiteboardId: string, object: any) => void;
}
