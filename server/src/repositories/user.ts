import Model, { User } from '../models/user';

enum Selector {
  STANDARD = '-password -_id',
}

const findOne = async (query: Partial<User>) => {
  return Model.findOne(query).select(Selector.STANDARD);
};

const create = async (query: Pick<User, 'email' | 'nickname' | 'password'>) => {
  Model.create(query);
};

export default { findOne, create };
