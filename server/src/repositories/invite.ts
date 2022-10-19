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

const exists = async (query: Query) => {
  return Model.exists(query);
};

const setInactive = async (query: Query) => {
  const { sender, receiver, _id } = query;
  return Model.updateOne(
    { _id, sender, receiver },
    { $set: { active: false } }
  );
};

export default { create, findOne, setInactive, exists, findAll };
