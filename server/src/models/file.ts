import { commonSchemaOptions } from "./config/common-config";
import { model, Schema } from "mongoose";
import { ModelId } from "./types/_id";

export interface File {
  _id: ModelId;
  type: "image" | "document";
  path: string;
}

const fileSchema = new Schema<File>(
  {
    path: { type: String, required: true },
    type: { type: String, enum: ["image", "document"], required: true },
  },
  commonSchemaOptions
);

const Model = model("File", fileSchema);

export default Model;
