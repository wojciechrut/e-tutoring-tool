import { commonSchemaOptions } from './config/common-config';
import { Chat } from './chat';
import { User } from './user';
import { Types, Schema, model } from 'mongoose';
import { File } from './file';

export interface Message {
  _id: Types.ObjectId;
  sender: User;
  chat: Chat;
  text: string;
  files: File[];
}

const messageSchema = new Schema<Message>(
  {
    sender: { type: Types.ObjectId, required: true, ref: 'User' },
    chat: { type: Types.ObjectId, required: true, ref: 'Chat' },
    text: { type: String, required: true },
    files: [{ type: Types.ObjectId, default: [], ref: 'File' }],
  },
  commonSchemaOptions
);

const Model = model('Message', messageSchema);

export default Model;
