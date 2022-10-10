import { createError } from './../utils/helpers/create-error';
import {
  UserAuthorizationRequestBody,
  UserAuthorizationParameters,
} from './../@types/user';
import { RequestHandler } from 'express';
import { ErrorStatus } from '../@types';
import UserRepository from '../repositories/user';
import JWT from './../utils/helpers/jtw';
import { _id } from '../utils/helpers/mongo';

const auth: RequestHandler<
  UserAuthorizationParameters,
  {},
  UserAuthorizationRequestBody
> = async (request, _response, next) => {
  try {
    const { token } = request.body;
    const { withFriends } = request.params;

    if (!token) {
      throw createError(
        ErrorStatus.UNAUTHORIZED,
        'Missing authorization token'
      );
    }

    const decodedId = JWT.decode(token);
    const user = await UserRepository.findOne(
      { _id: _id(decodedId) },
      withFriends
    );

    if (!user) {
      throw createError(ErrorStatus.UNAUTHORIZED, 'Invalid token.');
    }

    request.body = { ...user.toObject(), token };
    next();
  } catch (error) {
    next(error);
  }
};

export default auth;
