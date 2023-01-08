import { UserSelector as UserSelector } from "./user";
import Model from "./../models/invite";

type Query = Partial<{
  _id: string;
  sender: string;
  receiver: string;
  active: boolean;
}>;

const create = async (query: Query) => {
  return Model.create(query);
};

const findOne = async (query: Query) => {
  return Model.findOne(query);
};

const findAll = async (query: Query) => {
  return Model.find(query)
    .populate("sender", UserSelector.STANDARD)
    .populate("receiver", UserSelector.STANDARD);
};

const findUsersActive = async (userId: string) => {
  return Model.find({ receiver: userId, active: true }).populate(
    "sender",
    UserSelector.STANDARD
  );
};

const findUsersReceived = async (userId: string) => {
  return Model.find({ receiver: userId, active: true })
    .populate("receiver", UserSelector.STANDARD)
    .populate("sender", UserSelector.STANDARD);
};

const exists = async (query: Parameters<typeof Model.exists>[0]) => {
  return Model.exists(query);
};

const setInactive = async (query: Query) => {
  const { _id } = query;

  return Model.updateOne({ _id }, { $set: { active: false } });
};
const InviteRepository = {
  create,
  findOne,
  setInactive,
  exists,
  findAll,
  findUsersActive,
  findUsersReceived,
};
export default InviteRepository;
