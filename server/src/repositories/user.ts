import Model, { User } from '../models/user';

enum Selectors {
  STANDARD = '-password -_id',
}

const findOne = async (query: Partial<User>) => {
  return Model.findOne(query).select(Selectors.STANDARD);
};

const create = async (query: Pick<User, 'email' | 'nickname' | 'password'>) => {
  Model.create(query);
};

export default { findOne, create };
