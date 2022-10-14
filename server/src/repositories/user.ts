import { UserRegisterRequestBody, UserCredentials } from '../@types/api/user';
import Model, { User } from '../models/user';
import { comparePassword, hashPassword } from '../utils/helpers/password';

export enum Selector {
  STANDARD = '-password',
  WITH_PASSWORD = '',
}

const exists = async (query: Partial<User>) => {
  return Model.exists(query);
};

const findAll = async () => {
  return Model.find();
};

const findOne = async (query: Partial<User>, withFriends = false) => {
  const result = await Model.findOne(query).select(Selector.STANDARD);
  return withFriends && result
    ? result.populate('friends', Selector.STANDARD)
    : result;
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
  return Model.findOne({ email }).select(Selector.STANDARD);
};

const makeFriends = async (userId1: string, userId2: string) => {
  return Promise.all([
    Model.updateOne({ _id: userId1 }, { $push: { friends: userId2 } }),
    Model.updateOne({ _id: userId2 }, { $push: { friends: userId1 } }),
  ]);
};

export default {
  findAll,
  findOne,
  findByCredentials,
  create,
  exists,
  makeFriends,
};
