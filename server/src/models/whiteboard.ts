import { model, Schema } from "mongoose";
import { commonSchemaOptions } from "./config/common-config";
import { Object } from "fabric/fabric-impl";

type FabricObject = Object;

export interface Whiteboard {
  objects: Array<FabricObject>;
}

const whiteboardSchema = new Schema<Whiteboard>(
  {
    objects: [{ type: Object, required: true, default: [] }],
  },
  commonSchemaOptions
);

const Model = model("Whiteboard", whiteboardSchema);

export default Model;
