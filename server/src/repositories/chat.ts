import { UserSelector as UserSelector } from "./user";
import Model from "../models/chat";
import { ModelId } from "../models/types/_id";
import { FileSelector } from "./file";

type SingleChatQuery = {
  users?: Array<string>;
  _id?: ModelId;
};

type ManyChatsQuery = {
  users?: ModelId;
};

type AddMessageQuery = {
  chat: ModelId;
  message: ModelId;
};

export enum ChatSelector {
  STANDARD = "-createdAt -updatedAt",
}

const populator: Parameters<typeof Model.populate>[0] = [
  { path: "users", select: UserSelector.STANDARD },
  { path: "lastMessage" },
  {
    path: "messages",
    options: {
      sort: { createdAt: 1 },
      populate: [
        { path: "files", select: FileSelector.STANDARD },
        { path: "sender", select: "nickname avatar" },
      ],
    },
  },
];

const allPopulator = [
  { path: "users", select: UserSelector.STANDARD },
  { path: "lastMessage" },
];

const findOrCreate = async (users: SingleChatQuery) => {
  const chatExists = await exists(users);

  if (!chatExists) {
    await create(users);
  }

  return findOne(users);
};

const create = async ({ users }: SingleChatQuery) => {
  const { _id } = await Model.create({
    users,
  });

  return Model.findOne({ _id });
};

const exists = async ({ users, ...rest }: SingleChatQuery) => {
  return Model.exists({
    $and:
      users &&
      users.map((user) => ({
        users: {
          $elemMatch: {
            $eq: user,
          },
        },
      })),
    ...rest,
  });
};

const findOne = async ({ users, ...rest }: SingleChatQuery) => {
  return Model.findOne({
    $and:
      users &&
      users.map((user) => ({
        users: {
          $elemMatch: {
            $eq: user,
          },
        },
      })),
    ...rest,
  })
    .populate(populator)
    .select(ChatSelector.STANDARD);
};

const findAll = async (query: ManyChatsQuery) => {
  return Model.find(query)
    .sort({ updatedAt: -1 })
    .select(ChatSelector.STANDARD)
    .populate(allPopulator);
};

const userHasAccess = async (user: string, chat: string) => {
  return Model.exists({
    users: user,
    _id: chat,
  });
};

const addMessage = async ({ chat, message }: AddMessageQuery) => {
  return Model.updateOne(
    { _id: chat },
    { lastMessage: message, $push: { messages: message } }
  );
};

const ChatRepository = {
  findOrCreate,
  create,
  exists,
  findOne,
  findAll,
  userHasAccess,
  addMessage,
};

export default ChatRepository;
