import {
  MeResponseLocals,
  ChatResponseBody,
  ErrorStatus,
  ChatFetchQuery,
} from "../@types";
import { createError } from "../utils/helpers/create-error";
import { RequestHandler } from "express";
import { id } from "../utils/helpers/mongo";
import ChatRepository from "../repositories/chat";

const get: RequestHandler<
  {},
  ChatResponseBody,
  any,
  ChatFetchQuery,
  MeResponseLocals
> = async (request, response) => {
  const { userId, meetingId } = request.query;
  const { _id: requesterId } = response.locals;

  if (meetingId) {
    //meeting chat z obiektu meeting
    console.log("chat by meeting todo");
    return;
  }

  if (userId) {
    const chat = await ChatRepository.findOrCreate({
      users: [userId, id(requesterId)],
    });

    if (!chat) {
      throw createError(ErrorStatus.SERVER, "Could not access this chat.");
    }

    response.send(chat);
  }
};

export default { get };
