import { createError } from "../utils/helpers/create-error";
import { RequestHandler } from "express";
import ChatRepository from "../repositories/chat";
import { id } from "../utils/helpers/mongo";
import { ErrorStatus, MeResponseLocals } from "../@types";

const chatAccess: RequestHandler<{}, {}, any, {}, MeResponseLocals> = async (
  request,
  response,
  next
) => {
  const { chat } = request.body;
  const { _id } = response.locals;

  if (!chat) {
    next(createError(ErrorStatus.BAD_REQUEST, "You must specify chat."));
    return;
  }

  if (!(await ChatRepository.userHasAccess(id(_id), id(chat)))) {
    next(
      createError(ErrorStatus.FORBIDDEN, "You don't have access to this chat.")
    );
    return;
  }
};

const chatAccessMiddleware: RequestHandler<
  {},
  {},
  any,
  {},
  MeResponseLocals
> = async (request, response, next) => {
  await chatAccess(request, response, next);

  next();
};

export default chatAccessMiddleware;
