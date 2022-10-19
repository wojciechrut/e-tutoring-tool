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

const createMany = async (query: Array<Query>) => {
  return Model.insertMany(query);
};

export default { create, createMany, findAll };