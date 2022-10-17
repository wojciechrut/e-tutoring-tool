import Model, { Message } from "../models/message";
import { ModelId } from "../models/types/_id";

type Query = Partial<
  | Message
  | {
      sender: ModelId;
      files: Array<ModelId>;
      chat: ModelId;
    }
>;

const create = (query: Query) => {
  return Model.create(query);
};

const findAll = (query: Query) => {
  return Model.find(query);
};

const findOne = (query: Query) => {
  return Model.findOne(query);
};

export default { create, findAll, findOne };
