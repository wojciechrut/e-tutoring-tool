import { Selector as UserSelector } from './user';
import Model, { Chat } from '../models/chat';
import { Types } from 'mongoose';

type SingleChatQuery = {
  users: [string, string];
  _id?: Types.ObjectId;
};

type ManyChatsQuery = {
  users?: string;
};

const populator = [
  { path: 'users', select: UserSelector.STANDARD },
  { path: 'lastMessage' },
];

const access = async (users: SingleChatQuery) => {
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

export default { access, create, exists, findOne, findAll };
