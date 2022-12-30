import Model from "../models/note";
import { UserSelector } from "./user";
import { ModelId } from "../models/types/_id";

const populator: Parameters<typeof Model.populate>[0] = [
  {
    path: "owner",
    select: UserSelector.STANDARD,
  },
  {
    path: "file",
  },
];

type Query = {
  owner: ModelId;
  image?: ModelId;
  text: string;
  meeting: ModelId;
};

const create = (query: Query) => {
  return Model.create(query);
};

const getByMeeting = (userId: string, meetingId: string) => {
  return Model.find({ owner: userId, meeting: meetingId }).populate(populator);
};

const NoteRepository = { create, getByMeeting };
export default NoteRepository;
