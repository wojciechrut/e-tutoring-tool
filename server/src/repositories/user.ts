import { UserRegisterRequestBody, UserCredentials } from './../@types/user';
import Model, { User } from '../models/user';
import { comparePassword, hashPassword } from '../utils/helpers/password';

enum Selector {
  STANDARD = '-password -_id',
  WITH_ID = '-password',
  WITH_PASSWORD = '-_id',
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
const findByCredentials = async (query: UserCredentials) => {
  const { email, password } = query;
  const user = await Model.findOne({ email });
  if (user && (await comparePassword(password, user.password))) {
    return user;
  }
  return null;
};

const create = async (query: UserRegisterRequestBody) => {
  const { email, password } = query;
  const hashedPassword = await hashPassword(password);

  await Model.create({ ...query, password: hashedPassword });
  return Model.findOne({ email }).select(Selector.WITH_ID);
};

export default { findAll, findOne, findByCredentials, create, exists };
