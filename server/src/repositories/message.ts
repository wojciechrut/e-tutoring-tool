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

export enum MessageSelector {
  STANDARD = "-createdAt -updatedAt",
}

const create = (query: Query) => {
  return Model.create(query);
};

const findAll = (query: Query) => {
  return Model.find(query).select(MessageSelector.STANDARD);
};

const findOne = (query: Query) => {
  return Model.findOne(query).select(MessageSelector.STANDARD);
};

export default { create, findAll, findOne };
