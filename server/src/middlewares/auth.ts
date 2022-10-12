import { createError } from './../utils/helpers/create-error';
import { RequestHandler } from 'express';
import { ErrorStatus } from '../@types';
import UserRepository from '../repositories/user';
import JWT from './../utils/helpers/jtw';
import { _id } from '../utils/helpers/mongo';

const auth: RequestHandler = async (request, _response, next) => {
  try {
    const token = JWT.extractFromHeader(request.header('Authorization'));
    const { withFriends } = request.query;

    if (!token) {
      throw createError(ErrorStatus.UNAUTHORIZED, 'Authorization failed');
    }

    const decodedId = JWT.decode(token);
    const user = await UserRepository.findOne(
      { _id: _id(decodedId) },
      withFriends === 'true'
    );

    if (!user) {
      throw createError(ErrorStatus.UNAUTHORIZED, 'Invalid token.');
    }

    request.body = { ...request.body, ...user.toObject(), token };
    next();
  } catch (error) {
    next(error);
  }
};

export default auth;
