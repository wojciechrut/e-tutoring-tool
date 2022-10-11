import Model, { Invite } from './../models/invite';

type Query = Partial<{
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
  return Model.find(query);
};

const exists = async (query: Query) => {
  return Model.exists(query);
};

const setInactive = async (query: Query) => {
  const { sender, receiver } = query;
  return Model.updateOne({ sender, receiver }, { active: false });
};

export default { create, findOne, setInactive, exists, findAll };
