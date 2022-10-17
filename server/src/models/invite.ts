import { commonSchemaOptions } from "./config/common-config";
import { model, Schema, Types } from "mongoose";
import { User } from "./user";
import { ModelId } from "./types/_id";

export interface Invite {
  _id: ModelId;
  sender: User;
  receiver: User;
  active?: boolean;
}

const inviteSchema = new Schema<Invite>(
  {
    sender: { type: Types.ObjectId, required: true, ref: "User" },
    receiver: { type: Types.ObjectId, required: true, ref: "User" },
    active: { type: Boolean, default: true },
  },
  commonSchemaOptions
);

const Model = model("Invite", inviteSchema);

export default Model;
