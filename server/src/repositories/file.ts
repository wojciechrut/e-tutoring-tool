import Model, { File } from "../models/file";
import { ModelId } from "../models/types/_id";

type Query = Partial<File | { uploader: ModelId }>;

const create = async (query: Query) => {
  return Model.create(query);
};

const createMany = async (query: Array<Query>) => {
  return Model.insertMany(query);
};

export default { create, createMany };
