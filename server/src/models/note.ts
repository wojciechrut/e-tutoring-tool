import { ModelId } from "./types/_id";
import { User } from "./user";
import { Meeting } from "./meeting";
import { model, Schema, Types } from "mongoose";

export interface Note {
  _id: ModelId;
  owner: User;
  image?: File;
  text: string;
  meeting: Meeting;
}

const noteSchema = new Schema<Note>({
  owner: { type: Types.ObjectId, required: true, ref: "User" },
  image: { type: Types.ObjectId, required: false, ref: "File" },
  text: { type: String, required: true },
  meeting: { type: Types.ObjectId, required: true, ref: "Meeting" },
});

const Model = model("Note", noteSchema);

export default Model;
