import Model, { File } from "../models/file";
import { ModelId } from "../models/types/_id";
import User, { UserSelector } from "./user";

type Query = Partial<File | { uploader: ModelId }>;

export enum FileSelector {
  STANDARD = "_id path uploader type originalName",
}

const create = async (query: Query) => {
  return Model.create(query);
};

const findAll = async (query: Query) => {
  return Model.find(query);
};

const findAllWithUsers = async (chats: Array<ModelId>) => {
  return Model.find({ chat: { $in: chats } }).populate<{
    uploader: typeof User;
  }>({
    path: "uploader",
    select: UserSelector.STANDARD,
  });
};

const findOne = async (query: Query) => {
  return Model.findOne(query);
};

const createMany = async (query: Array<Query>) => {
  return Model.insertMany(query);
};

const FileRepository = {
  create,
  createMany,
  findAll,
  findOne,
  findAllWithUsers,
};
export default FileRepository;
