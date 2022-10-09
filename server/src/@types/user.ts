import { PickRequiredOptional } from './util';
import { User } from '../models/user';
export { User } from '../models/user';

export type UserRegisterRequestBody = PickRequiredOptional<
  User,
  'email' | 'password' | 'nickname',
  'avatar'
>;
