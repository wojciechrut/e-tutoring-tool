import { Message } from "../../models/message";

export interface ServerToClientEvents {
  connected: () => void;
  //chat
  messageReceived: ((message: Message) => void) | undefined;
  //whiteboard
  objectReceived: ((object: any) => void) | undefined;
  objectModified: ((object: any) => void) | undefined;
  objectsRemoved: ((objects: any) => void) | undefined;
  //voicecall
  voicecallNewUser: ((userId: string) => void) | undefined;
  voicecallUserLeft: ((userId: string) => void) | undefined;
  //meeting
  meetingFinished: (() => void) | undefined;
}

export interface ClientToServerEvents {
  setup: (userId: string) => void;
  //chat
  joinChat: (chatId: string) => void;
  sendMessage: (message: Message) => void;
  //whiteboard
  joinWhiteboard: (whiteboardId: string) => void;
  leaveWhiteboard: (whiteboardId: string) => void;
  addObject: (whiteboardId: string, object: any) => void;
  modifyObject: (whiteboardId: string, object: any) => void;
  removeObjects: (whiteboardId: string, objects: any) => void;
  //voicecall
  joinVoicecall: (meetingId: string, userId: string) => void;
  leaveVoicecall: (meetingId: string, userId: string) => void;
  //meeting
  joinMeeting: ((meetingId: string) => void) | undefined;
  leaveMeeting: ((meetingId: string) => void) | undefined;
  finishMeeting: ((meetingId: string) => void) | undefined;
}
