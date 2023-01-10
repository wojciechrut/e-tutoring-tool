import { commonSchemaOptions } from "./config/common-config";
import { model, ObjectId, Schema, Types } from "mongoose";
import { ModelId } from "./types/_id";

export interface File {
  _id: ModelId;
  uploader: ObjectId;
  type: "image" | "document";
  path: string;
  originalName: string;
  chat?: ObjectId;
  createdAt: Date;
}

const fileSchema = new Schema<File>(
  {
    path: { type: String, required: true },
    type: { type: String, enum: ["image", "document"], required: true },
    uploader: { type: Types.ObjectId, ref: "User", required: true },
    originalName: { type: String, required: true },
    chat: { type: Types.ObjectId, ref: "Chat", required: false },
  },
  commonSchemaOptions
);

const Model = model("File", fileSchema);

export default Model;
