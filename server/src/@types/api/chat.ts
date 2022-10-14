import { UserResponseBody } from './user';
import { Chat } from '../../models/chat';
import { ModelId } from '../../models/types/_id';

export type ChatFetchQuery =
  | {
      userId: string;
      meetingId: undefined;
    }
  | {
      userId: undefined;
      meetingId: string;
    };

export type ChatAccessRequestBody = UserResponseBody & {
  chat: ModelId;
};

export type ChatResponseBody = Chat;

export type MultipleChatResponseBody = Array<Chat>;
