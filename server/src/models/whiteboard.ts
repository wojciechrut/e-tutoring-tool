import { model, Schema } from "mongoose";
import { commonSchemaOptions } from "./config/common-config";

export interface Whiteboard {
  objects: Array<object>;
}

const whiteboardSchema = new Schema<Whiteboard>(
  {
    objects: [{ type: Object, required: true, default: [] }],
  },
  commonSchemaOptions
);

const Model = model("Whiteboard", whiteboardSchema);

export default Model;
