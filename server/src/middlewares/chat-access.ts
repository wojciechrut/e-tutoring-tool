import { createError } from './../utils/helpers/create-error';
import { RequestHandler } from 'express';
import ChatRepository from '../repositories/chat';
import { id } from '../utils/helpers/mongo';
import { ErrorStatus, MeResposneLocals } from '../@types';

const chatAccess: RequestHandler<{}, {}, any, {}, MeResposneLocals> = async (
  request,
  response,
  _next
) => {
  const { chat } = request.body;
  const { _id } = response.locals;

  if (!chat) {
    throw createError(ErrorStatus.BAD_REQUEST, 'You must specify chat.');
  }

  if (!(await ChatRepository.userHasAccess(id(_id), id(chat)))) {
    throw createError(
      ErrorStatus.FORBIDDEN,
      "You don't have access to this chat."
    );
  }
};

const chatAccessMiddleware: RequestHandler<
  {},
  {},
  any,
  {},
  MeResposneLocals
> = async (request, response, next) => {
  try {
    await chatAccess(request, response, next);

    next();
  } catch (error) {
    next(error);
  }
};

export default chatAccessMiddleware;
