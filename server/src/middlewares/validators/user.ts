import createError from 'http-errors';
import { UserRegisterRequestBody } from '../../@types/user';
import { RequestHandler } from 'express';

const register: RequestHandler<{}, {}, UserRegisterRequestBody> = (
  request,
  response,
  next
) => {
  throw { asf: 'asdf' };
};

export default { register };
