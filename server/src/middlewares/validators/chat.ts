import { createError } from './../../utils/helpers/create-error';
import { RequestHandler } from 'express';
import { ChatFetchQuery, ErrorStatus, UserResponseBody } from '../../@types';
import UserRepository from '../../repositories/user';
import { _id } from '../../utils/helpers/mongo';

const get: RequestHandler<{}, {}, UserResponseBody, ChatFetchQuery> = async (
  request,
  _response,
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

    if (userId && meetingId) {
      throw createError(
        ErrorStatus.BAD_REQUEST,
        'Specify id of either user or meeting, not both.'
      );
    }

    if (meetingId) {
      console.log('chat by meeting id todo');
    }

    if (userId) {
      if (!(await UserRepository.exists({ _id: _id(userId) }))) {
        throw createError(ErrorStatus.BAD_REQUEST, 'User does not exist');
      }
    }

    next();
  } catch (error) {
    next(error);
  }
};

export default { get };
