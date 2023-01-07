import { UserSelector as UserSelector } from "./user";
import Model from "../models/chat";
import { ModelId } from "../models/types/_id";
import { FileSelector } from "./file";
import { isMoreThanDayAgo } from "../utils/helpers/date";

type SingleChatQuery = {
  users?: Array<string>;
  _id?: ModelId;
  isMeetingChat?: boolean;
};

type ManyChatsQuery = {
  users?: ModelId;
  isMeetingChat?: boolean;
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

const findOrCreate = async (query: SingleChatQuery) => {
  const chatExists = await exists(query);

  if (!chatExists) {
    await create(query);
  }

  return findOne(query);
};

const create = async (query: SingleChatQuery) => {
  const { _id } = await Model.create(query);

  return Model.findOne({ _id });
};

const exists = async ({ users, ...rest }: SingleChatQuery) => {
  if (users) {
    return Model.exists({
      $and: users.map((user) => ({
        users: {
          $elemMatch: {
            $eq: user,
          },
        },
      })),
      ...rest,
    });
  } else {
    return Model.exists({ ...rest });
  }
};

const findOne = async ({ users, ...rest }: SingleChatQuery) => {
  if (users) {
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
  } else {
    return Model.findOne({
      ...rest,
    })
      .populate(populator)
      .select(ChatSelector.STANDARD);
  }
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

const shouldNotifyNewMessage = async (id: ModelId) => {
  const chat = await Model.findOne({ _id: id }).populate([
    {
      path: "messages",
      options: {
        sort: { createdAt: -1 },
        limit: 1,
      },
    },
    { path: "users", select: UserSelector.STANDARD },
  ]);

  if (
    chat &&
    !chat.isMeetingChat &&
    (!chat.messages[0] || isMoreThanDayAgo(chat.messages[0].createdAt))
  ) {
    return chat.users;
  }
  return null;
};

const ChatRepository = {
  findOrCreate,
  create,
  exists,
  findOne,
  findAll,
  userHasAccess,
  addMessage,
  shouldNotifyNewMessage,
};

export default ChatRepository;
