import { Chat } from '../../models/chat';

export type ChatAccessQuery =
  | {
      userId: string;
      meetingId: undefined;
    }
  | {
      userId: undefined;
      meetingId: string;
    };

export type ChatResponseBody = Chat;

export type MultipleChatResponseBody = Array<Chat>;
