import { Schema, model, Types } from 'mongoose';
import { commonSchemaOptions } from './config/common-config';

export interface User {
  _id: Types.ObjectId;
  nickname: string;
  email: string;
  password: string;
  avatar: string;
  friends: Array<User>;
}

const userSchema = new Schema<User>(
  {
    nickname: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    avatar: {
      type: String,
      default: '/static/avatars/default.jpg',
    },
    friends: [{ type: Types.ObjectId, default: [], ref: 'User' }],
  },
  commonSchemaOptions
);

const Model = model('User', userSchema);

export default Model;
