import { User } from "./user";
import { leafletCategories as categories } from "../utils/constants/leaflet-categories";
import { model, Schema } from "mongoose";
import { commonSchemaOptions } from "./config/common-config";

export interface Leaflet {
  user: User;
  title: string;
  description: string;
  lookingFor: typeof categories.lookingFor[number];
  levels: [typeof categories.levels[number]];
  subjects: [typeof categories.subjects];
}

const leafletSchema = new Schema<Leaflet>(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    lookingFor: { type: String, enum: categories.lookingFor, required: true },
    levels: [{ type: String, enum: categories.levels, required: true }],
    subjects: [{ type: String, enum: categories.subjects, required: true }],
  },
  commonSchemaOptions
);

const Model = model("Leaflet", leafletSchema);

export default Model;
