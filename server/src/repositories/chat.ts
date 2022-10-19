import { Selector as UserSelector } from "./user";
import Model from "../models/chat";
import { Types } from "mongoose";
import { ModelId } from "../models/types/_id";
import { FileSelector } from "./file";

type SingleChatQuery = {
  users: [string, string];
  _id?: Types.ObjectId;
};

type ManyChatsQuery = {
  users?: string;
};

type AddMessageQuery = {
  chat: ModelId;
  message: ModelId;
};

export enum ChatSelector {
  STANDARD = "-createdAt -updatedAt",
}

const populator = [
  { path: "users", select: UserSelector.STANDARD },
  { path: "lastMessage" },
  { path: "messages" },
  { path: "messages.files", select: FileSelector.STANDARD },
];

const findOrCreate = async (users: SingleChatQuery) => {
  const chatExists = await exists(users);

  if (!chatExists) {
    await create(users);
  }

  return findOne(users);
};

const create = async ({ users }: SingleChatQuery) => {
  await Model.create({
    users,
  });

  return findOne({ users });
};

const exists = async ({ users, ...rest }: SingleChatQuery) => {
  return Model.exists({
    $and: [
      { users: { $elemMatch: { $eq: users[0] } } },
      { users: { $elemMatch: { $eq: users[1] } } },
    ],
    ...rest,
  });
};

const findOne = async ({ users, ...rest }: SingleChatQuery) => {
  return Model.findOne({
    $and: [
      { users: { $elemMatch: { $eq: users[0] } } },
      { users: { $elemMatch: { $eq: users[1] } } },
    ],
    ...rest,
  })
    .populate(populator)
    .select(ChatSelector.STANDARD);
};

const findAll = async (query: ManyChatsQuery) => {
  return Model.find(query).select(ChatSelector.STANDARD).populate(populator);
};

const userHasAccess = async (user: string, chat: string) => {
  return Model.exists({
    users: user,
    _id: chat,
  });
};

const addMessage = async ({ chat, message }: AddMessageQuery) => {
  return Model.update(
    { _id: chat },
    { lastMessage: message, $push: { messages: message } }
  );
};

export default {
  findOrCreate,
  create,
  exists,
  findOne,
  findAll,
  userHasAccess,
  addMessage,
};
