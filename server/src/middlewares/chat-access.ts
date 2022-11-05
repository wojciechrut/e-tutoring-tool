import { createError } from "../utils/helpers/create-error";
import { RequestHandler } from "express";
import ChatRepository from "../repositories/chat";
import { id } from "../utils/helpers/mongo";
import { ChatAccessQuery, ErrorStatus, MeResponseLocals } from "../@types";

const chatAccess: RequestHandler<
  {},
  any,
  {},
  ChatAccessQuery,
  MeResponseLocals
> = async (request, response, next) => {
  const { chat } = request.query;
  const { _id } = response.locals;

  if (!chat) {
    next(createError(ErrorStatus.BAD_REQUEST, "You must specify chats."));
    return;
  }

  if (!(await ChatRepository.userHasAccess(id(_id), id(chat)))) {
    next(
      createError(ErrorStatus.FORBIDDEN, "You don't have access to this chats.")
    );
    return;
  }
  next();
};

export default chatAccess;
