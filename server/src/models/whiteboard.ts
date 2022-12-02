import { model, Schema } from "mongoose";
import { commonSchemaOptions } from "./config/common-config";
import { ModelId } from "./types/_id";

export interface Whiteboard {
  _id: ModelId;
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
