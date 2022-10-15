import { ChatAccessRequestBody } from './chat';

export type MessageSendRequestBody = ChatAccessRequestBody & {
  text: string;
  files?: Array<string>;
};
