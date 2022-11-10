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

const singleChatPopulator: Parameters<typeof Model.populate>[0] = [
  {
    path: "chat",
    select: "users",
    populate: [{ path: "users", select: "_id nickname" }],
  },
  {
    path: "sender",
    select: "-friends",
  },
  {
    path: "files",
    select: "-uploader",
  },
];

const create = async (query: Query) => {
  const message = await Model.create(query);
  const { _id } = message.toObject();
  return findOne({ _id });
};

const findAll = (query: Query) => {
  return Model.find(query).select(MessageSelector.STANDARD);
};

const findOne = (query: Query) => {
  return Model.findOne(query)
    .select(MessageSelector.STANDARD)
    .populate(singleChatPopulator);
};

export default { create, findAll, findOne };
