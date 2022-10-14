import { createError } from './../../utils/helpers/create-error';
import { RequestHandler } from 'express';
import { ChatAccessQuery, ErrorStatus } from '../../@types';
import UserRepository from '../../repositories/user';
import { _id } from '../../utils/helpers/mongo';

const accessChat: RequestHandler<{}, {}, {}, ChatAccessQuery> = async (
  request,
  response,
  next
) => {
  try {
    const { userId, meetingId } = request.query;

    if (!(userId || meetingId)) {
      throw createError(
        ErrorStatus.BAD_REQUEST,
        'Missing id of user or meeting.'
      );
    }

    if (meetingId) {
      console.log('chat by meeting id todo');
    }

    if (userId) {
      const userExists = await UserRepository.exists({ _id: _id(userId) });
      if (!userExists) {
        throw createError(ErrorStatus.BAD_REQUEST, 'User does not exist');
      }
    }

    next();
  } catch (error) {
    next(error);
  }
};

export default { accessChat };
