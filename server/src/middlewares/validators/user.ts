import { createError } from './../../utils/helpers/create-error';
import { UserRegisterRequestBody } from '../../@types/api/user';
import UserRepository from '../../repositories/user';
import { RequestHandler } from 'express';
import { ErrorStatus } from '../../@types';

const register: RequestHandler<{}, {}, UserRegisterRequestBody> = async (
  request,
  _response,
  next
) => {
  try {
    const { nickname, email } = request.body;
    const errorMessages: Array<string> = [];

    if (await UserRepository.exists({ nickname }))
      errorMessages.push('This nickname is taken.');

    if (await UserRepository.exists({ email }))
      errorMessages.push('This email is taken');

    if (errorMessages.length > 0) {
      throw createError(ErrorStatus.BAD_REQUEST, errorMessages);
    }

    next();
  } catch (error) {
    next(error);
  }
};

export default { register };
