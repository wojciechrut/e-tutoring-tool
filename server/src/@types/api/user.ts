import { PickRequiredOptional } from './util';
import { User } from '../../models/user';

export type UserRegisterRequestBody = PickRequiredOptional<
  User,
  'email' | 'password' | 'nickname',
  'avatar'
>;

export type UserResponseBody = Omit<User, 'password'>;

export type MeResposneLocals = UserResponseBody & {
  token: string;
};

export type MultipleUsersResponseBody = Array<UserResponseBody>;

export type UserCredentials = Pick<User, 'email' | 'password'>;

export type UserAuthorizationRequestBody = { token: string };
