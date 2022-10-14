import { createError } from './../utils/helpers/create-error';
import { ChatAccessRequestBody } from './../@types/api/chat';
import { RequestHandler } from 'express';
import ChatRepository from '../repositories/chat';
import { id } from '../utils/helpers/mongo';
import { ErrorStatus } from '../@types';

const access: RequestHandler<{}, {}, ChatAccessRequestBody> = async (
  request,
  _response,
  next
) => {
  try {
    const { _id, chat } = request.body;

    if (!(await ChatRepository.userHasAccess(id(_id), id(chat)))) {
      throw createError(
        ErrorStatus.FORBIDDEN,
        "You don't have access to this chat."
      );
    }
  } catch (error) {
    next(error);
  }
};

export default access;
