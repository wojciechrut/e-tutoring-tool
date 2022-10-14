import { User } from './user';
import { commonSchemaOptions } from './config/common-config';
import { Schema, Types, model } from 'mongoose';
import { Message } from './message';

export interface Chat {
  _id: Types.ObjectId;
  users: Array<User>;
  messages: Array<Message>;
  lastMessage: Message;
}

const chatSchema = new Schema<Chat>(
  {
    users: [{ type: Types.ObjectId, required: true, ref: 'User' }],
    messages: [{ type: Types.ObjectId, default: [], ref: 'Message' }],
    lastMessage: { type: Types.ObjectId, required: false, ref: 'Message' },
  },
  commonSchemaOptions
);

const Model = model('Chat', chatSchema);

export default Model;
