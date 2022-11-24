import { UserSelector } from "./user";
import Model, { Meeting } from "../models/meeting";
import { ModelId } from "../models/types/_id";

const populator: Parameters<typeof Model.populate>[0] = [
  { path: "whiteboard" },
  { path: "invited", select: UserSelector.STANDARD },
  { path: "organiser", select: UserSelector.STANDARD },
];

type Query = Partial<
  Omit<Meeting, "invited" | "organiser" | "whiteboard" | "chat"> & {
    organiser: ModelId;
    invited: Array<ModelId>;
    chat: ModelId;
    whiteboard: ModelId;
  }
>;

const findOne = async (_id: ModelId) => {
  return Model.findOne({ _id }).populate(populator);
};

const findAll = async (query: Query) => {
  return Model.find(query).populate(populator);
};

const create = async (query: Omit<Query, "_id">) => {
  const meeting = await Model.create(query);
  return findOne(meeting._id);
};

const findAllUsers = async (userId: ModelId) => {
  return Model.find({ $or: [{ organiser: userId }, { invited: userId }] });
};

const MeetingRepository = { findOne, findAll, create, findAllUsers };
export default MeetingRepository;
