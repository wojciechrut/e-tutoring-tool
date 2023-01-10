import { model, Schema, Types } from "mongoose";
import { commonSchemaOptions } from "./config/common-config";
import { ModelId } from "./types/_id";

export interface User {
  _id: ModelId;
  nickname: string;
  email: string;
  password: string;
  avatar: string;
  friends: Array<User>;
  recommendedBy: Array<string>;
}

const userSchema = new Schema<User>(
  {
    nickname: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    avatar: {
      type: String,
      default: "/static/avatars/default.jpg",
    },
    friends: [{ type: Types.ObjectId, default: [], ref: "User" }],
    recommendedBy: [{ type: Types.ObjectId, default: [], ref: "User" }],
  },
  commonSchemaOptions
);

const Model = model("User", userSchema);

export default Model;
