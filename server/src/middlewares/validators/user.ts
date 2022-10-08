import { UserRegisterRequestBody } from '../../@types/user';
import { RequestHandler } from 'express';

const register: RequestHandler<{}, {}, UserRegisterRequestBody> = (
  request,
  response,
  next
) => {
  console.log('register val todo');
};

export default { register };
