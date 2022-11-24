import {
  ChatFetchQuery,
  ChatResponseBody,
  ErrorStatus,
  MeResponseLocals,
  MultipleChatsResponseBody,
} from "../@types";
import { createError } from "../utils/helpers/create-error";
import { RequestHandler } from "express";
import { id } from "../utils/helpers/mongo";
import ChatRepository from "../repositories/chat";

const get: RequestHandler<
  {},
  ChatResponseBody,
  {},
  ChatFetchQuery,
  MeResponseLocals
> = async (request, response, next) => {
  const { userId } = request.query;
  const { _id: requesterId } = response.locals;

  // if (meetingId) {
  //   //meeting chats z obiektu meeting
  //   console.log("chats by meeting todo");
  //   return;
  // }

  if (userId) {
    const chat = await ChatRepository.findOrCreate({
      users: [userId, id(requesterId)],
    });

    if (!chat) {
      next(createError(ErrorStatus.SERVER, "Could not access this chat."));
      return;
    }

    response.send(chat);
  }
};

const mine: RequestHandler<
  {},
  MultipleChatsResponseBody,
  {},
  {},
  MeResponseLocals
> = async (_request, response, _next) => {
  const { _id: requesterId } = response.locals;

  const chats = await ChatRepository.findAll({ users: requesterId });

  response.send(chats);
};

export default { get, mine };
