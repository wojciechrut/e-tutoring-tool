import { commonSchemaOptions } from "./config/common-config";
import { Chat } from "./chat";
import { User } from "./user";
import { model, Schema, Types } from "mongoose";
import { File } from "./file";
import { ModelId } from "./types/_id";

export interface Message {
  _id: ModelId;
  sender: User;
  chat: Chat;
  text?: string;
  files?: File[];
}

const messageSchema = new Schema<Message>(
  {
    sender: { type: Types.ObjectId, required: true, ref: "User" },
    chat: { type: Types.ObjectId, required: true, ref: "Chat" },
    text: { type: String, default: "" },
    files: [{ type: Types.ObjectId, default: [], ref: "File" }],
  },
  commonSchemaOptions
);

const Model = model("Message", messageSchema);

export default Model;
