import { BodyConstraints } from './fields';

export enum Action {
  REGISTER_USER = 'register-user',
}

export const actionConstraints: Record<Action, BodyConstraints> = {
  'register-user': {
    required: ['email', 'password', 'nickname'],
    regexValidated: ['email', 'password', 'nickname'],
  },
};
