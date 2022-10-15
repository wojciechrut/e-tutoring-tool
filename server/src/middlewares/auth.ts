import { MeResposneLocals } from './../@types/api/user';
import { createError } from './../utils/helpers/create-error';
import { RequestHandler } from 'express';
import { ErrorStatus } from '../@types';
import UserRepository from '../repositories/user';
import JWT from './../utils/helpers/jtw';
import { _id } from '../utils/helpers/mongo';

const auth: RequestHandler<any, any, any, any, MeResposneLocals> = async (
  request,
  response,
  _next
) => {
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

  response.locals = { ...user.toObject(), token };
};

const authMiddleware: RequestHandler<
  any,
  any,
  any,
  any,
  MeResposneLocals
> = async (request, response, next) => {
  try {
    await auth(request, response, next);
    next();
  } catch (error) {
    next(error);
  }
};

export default authMiddleware;
