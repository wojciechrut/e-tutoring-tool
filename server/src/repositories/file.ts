import Model, { File } from "../models/file";
import { ModelId } from "../models/types/_id";

type Query = Partial<File | { uploader: ModelId }>;

export enum FileSelector {
  STANDARD = "_id path uploader type",
}

const create = async (query: Query) => {
  return Model.create(query);
};

const findAll = async (query: Query) => {
  return Model.find(query);
};

const findOne = async (query: Query) => {
  return Model.findOne(query);
};

const createMany = async (query: Array<Query>) => {
  return Model.insertMany(query);
};

const FileRepository = { create, createMany, findAll, findOne };
export default FileRepository;
