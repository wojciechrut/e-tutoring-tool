import { UserResponseBody } from './user';

export type MessageSendRequestBody = UserResponseBody & {
  chat: string;
  text: string;
  files?: Array<string>;
};
