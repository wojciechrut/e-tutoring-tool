import { User } from "./user";
import { leafletCategories as categories } from "../utils/constants/leaflet-categories";
import mongoose, { model, Schema } from "mongoose";
import { commonSchemaOptions } from "./config/common-config";
import mongoosePaginate from "mongoose-paginate-v2";

export interface Leaflet {
  _id: string;
  user: User;
  title: string;
  parsedTitle: string;
  description: string;
  lookingFor: typeof categories.lookingFor[number];
  levels: typeof categories.levels;
  subjects: typeof categories.subjects;
}

const leafletSchema = new Schema<Leaflet>(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    title: { type: String, required: true },
    parsedTitle: { type: String, required: true },
    description: { type: String, required: true },
    lookingFor: { type: String, enum: categories.lookingFor, required: true },
    levels: [{ type: String, enum: categories.levels, required: true }],
    subjects: [{ type: String, enum: categories.subjects, required: true }],
  },
  commonSchemaOptions
);

leafletSchema.plugin(mongoosePaginate);
interface LeafletDocument extends Document, Leaflet {}

const Model = model<LeafletDocument, mongoose.PaginateModel<LeafletDocument>>(
  "Leaflet",
  leafletSchema
);

export default Model;
