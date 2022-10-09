import { UserRegisterRequestBody } from './../@types/user';
import Model, { User } from '../models/user';

enum Selector {
  STANDARD = '-password -_id',
  WITH_ID = '-password',
}

const exists = async (query: Partial<User>) => {
  return Model.exists(query);
};

const findAll = async () => {
  return Model.find();
};

const findOne = async (query: Partial<User>) => {
  return Model.findOne(query).select(Selector.STANDARD);
};

const create = async (query: UserRegisterRequestBody) => {
  await Model.create(query);
  return Model.findOne(query).select(Selector.WITH_ID);
};
export default { findAll, findOne, create, exists };
