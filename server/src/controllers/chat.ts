import { ChatResponseBody } from './../@types/api/chat';
import { createError } from './../utils/helpers/create-error';
import { RequestHandler } from 'express';
import { ChatFetchQuery, ErrorStatus, UserResponseBody } from '../@types';
import { id, _id } from '../utils/helpers/mongo';
import ChatRepository from '../repositories/chat';

const get: RequestHandler<
  {},
  ChatResponseBody,
  UserResponseBody,
  ChatFetchQuery
> = async (request, response, next) => {
  try {
    const { userId, meetingId } = request.query;
    const { _id: requesterId } = request.body;

    if (meetingId) {
      //meeting chat z obiektu meeting
      console.log('chat by meeting todo');
      return;
    }

    if (userId) {
      const chat = await ChatRepository.findOrCreate({
        users: [userId, id(requesterId)],
      });

      if (!chat) {
        throw createError(ErrorStatus.SERVER, 'Could not access this chat.');
      }

      response.send(chat);
    }
  } catch (error) {
    next(error);
  }
};

export default { get };
