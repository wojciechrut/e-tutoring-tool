import { UserRegisterRequestBody } from '../../@types/user';
import { RequestHandler } from 'express';

const register: RequestHandler<{}, {}, UserRegisterRequestBody> = (
  request,
  response,
  next
) => {
  response.send('eksdee');
};

export default { register };
