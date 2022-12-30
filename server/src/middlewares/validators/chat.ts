import { createError } from "../../utils/helpers/create-error";
import { RequestHandler } from "express";
import { ChatFetchQuery, ErrorStatus, UserResponseBody } from "../../@types";
import UserRepository from "../../repositories/user";
import { _id } from "../../utils/helpers/mongo";
import ChatRepository from "../../repositories/chat";

const get: RequestHandler<{}, {}, UserResponseBody, ChatFetchQuery> = async (
  request,
  _response,
  next
) => {
  const { userId, chatId } = request.query;
  if (!(userId || chatId)) {
    next(
      createError(ErrorStatus.BAD_REQUEST, "Missing id of user or meeting.")
    );
    return;
  }

  if (userId && chatId) {
    next(
      createError(
        ErrorStatus.BAD_REQUEST,
        "Specify id of either user or meeting, not both."
      )
    );
    return;
  }

  if (chatId) {
    if (!(await ChatRepository.exists({ _id: chatId }))) {
      next(createError(ErrorStatus.BAD_REQUEST, "Chat does not exist."));
      return;
    }
  }

  if (userId) {
    if (!(await UserRepository.exists({ _id: _id(userId) }))) {
      next(createError(ErrorStatus.BAD_REQUEST, "User does not exist"));
      return;
    }
  }
  next();
};

export default { get };
