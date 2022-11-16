import { User } from "./user";
import { Chat } from "./chat";
import { Whiteboard } from "./whiteboard";
import { leafletCategories } from "../utils/constants/leaflet-categories";
import { commonSchemaOptions } from "./config/common-config";
import { model, Schema } from "mongoose";

export interface Meeting {
  _id: string;
  description: string;
  organiser: User;
  chat: Chat;
  whiteboard: Whiteboard;
  startsAt: string;
  finished: boolean;
  invited: Array<User>;
  subjects: typeof leafletCategories.subjects;
}

const meetingSchema = new Schema<Meeting>(
  {
    description: { type: String, required: false },
    organiser: { type: Schema.Types.ObjectId, ref: "User", required: true },
    chat: { type: Schema.Types.ObjectId, ref: "Chat", required: true },
    whiteboard: {
      type: Schema.Types.ObjectId,
      ref: "Whiteboard",
      required: true,
    },
    startsAt: { type: String, required: true },
    finished: { type: Boolean, default: false },
    invited: [{ type: Schema.Types.ObjectId, ref: "User", required: true }],
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

const Model = model("Meeting", meetingSchema);
export default Model;
