import { createError } from './../utils/helpers/create-error';
import { RequestHandler } from 'express';
import { ChatAccessQuery, ErrorStatus } from '../@types';
import UserRepository from '../repositories/user';
import { _id } from '../utils/helpers/mongo';

const accessChat: RequestHandler<{}, {}, {}, ChatAccessQuery> = async (
  request,
  response,
  next
) => {
  try {
    const { userId, meetingId } = request.query;

    if (meetingId) {
      response.send('accessing by meeting todo');
      return;
    }

    if (userId) {
      const userExists = await UserRepository.exists({ _id: _id(userId) });
      if (!userExists) {
        throw createError(ErrorStatus.BAD_REQUEST, 'User does not exist');
      }
    }
  } catch (error) {
    next(error);
  }
};

export default { accessChat };
