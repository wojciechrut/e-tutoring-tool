import { Selector as UserSelector } from "./user";
import Model from "../models/chat";
import { Types } from "mongoose";
import { ModelId } from "../models/types/_id";

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

const populator = [
  { path: "users", select: UserSelector.STANDARD },
  { path: "lastMessage" },
];

const findOrCreate = async (users: SingleChatQuery) => {
  const existingChat = await findOne(users);

  if (existingChat) {
    return existingChat;
  }

  return create(users);
};

const create = async ({ users }: SingleChatQuery) => {
  const chat = await Model.create({
    users,
  });

  return chat.populate(populator);
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
  }).populate(populator);
};

const findAll = async (query: ManyChatsQuery) => {
  return Model.find(query);
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
