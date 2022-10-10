import { BodyConstraints } from './fields';

export enum Action {
  REGISTER_USER = 'register-user',
  LOGIN_USER = 'login-user',
  SEND_INVITE = 'send-invite',
}

export const actionConstraints: Record<Action, BodyConstraints> = {
  'register-user': {
    required: ['email', 'password', 'nickname'],
    regexValidated: ['email', 'password', 'nickname'],
  },
  'login-user': {
    required: ['email', 'password'],
    regexValidated: [],
  },
  'send-invite': {
    required: ['email'],
    regexValidated: [],
  },
};
