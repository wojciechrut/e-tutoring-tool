import { ModelId } from "./types/_id";
import { User } from "./user";
import { Meeting } from "./meeting";
import * as mongoose from "mongoose";
import { model, Schema, Types } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";
import { leafletCategories } from "../utils/constants/leaflet-categories";
import { commonSchemaOptions } from "./config/common-config";
import { File } from "./file";

export interface Note {
  _id: ModelId;
  owner: User;
  image?: File;
  text: string;
  meeting: Meeting;
  createdAt: Date;
  subjects: typeof leafletCategories.subjects;
}

const noteSchema = new Schema<Note>(
  {
    owner: { type: Types.ObjectId, required: true, ref: "User" },
    image: { type: Types.ObjectId, required: false, ref: "File" },
    text: { type: String, required: true },
    meeting: { type: Types.ObjectId, required: true, ref: "Meeting" },
    subjects: [
      {
        type: String,
        required: true,
        enum: leafletCategories.subjects,
      },
    ],
  },
  commonSchemaOptions
);

noteSchema.plugin(mongoosePaginate);
interface NoteDocument extends Document, Note {}

const Model = model<Note, mongoose.PaginateModel<NoteDocument>>(
  "Note",
  noteSchema
);

export default Model;
