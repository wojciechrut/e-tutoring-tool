import { Schema, model, ObjectId } from 'mongoose';

export interface User {
  _id: ObjectId;
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
      default: 'avatars/default.jpg',
    },
  },
  { timestamps: true, versionKey: false }
);

const Model = model('User', userSchema);

export default Model;
