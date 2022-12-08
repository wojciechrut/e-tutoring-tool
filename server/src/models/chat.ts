import { User } from "./user";
import { commonSchemaOptions } from "./config/common-config";
import { model, Schema, Types } from "mongoose";
import { Message } from "./message";
import { ModelId } from "./types/_id";

export interface Chat {
  _id: ModelId;
  users: Array<User>;
  messages: Array<Message>;
  lastMessage?: Message;
  isMeetingChat: boolean;
}

const chatSchema = new Schema<Chat>(
  {
    users: [{ type: Types.ObjectId, required: true, ref: "User" }],
    messages: [{ type: Types.ObjectId, default: [], ref: "Message" }],
    lastMessage: { type: Types.ObjectId, required: false, ref: "Message" },
    isMeetingChat: { type: Boolean, default: false },
  },
  commonSchemaOptions
);

const Model = model("Chat", chatSchema);

export default Model;
