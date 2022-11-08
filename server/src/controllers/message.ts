import { RequestHandler } from "express";
import {
  ChatAccessQuery,
  ErrorStatus,
  FileUploadResponseLocals,
  MessageSendRequestBody,
  UploadedIdsResponseLocals,
} from "../@types";
import { createError } from "../utils/helpers/create-error";
import MessageRepository from "../repositories/message";
import ChatRepository from "../repositories/chat";

const send: RequestHandler<
  {},
  any,
  MessageSendRequestBody,
  ChatAccessQuery,
  FileUploadResponseLocals & UploadedIdsResponseLocals
> = async (request, response, next) => {
  const { _id: sender, uploadedIds: files } = response.locals;
  const { chat } = request.query;
  const { text } = request.body;

  const message = await MessageRepository.create({
    sender,
    files,
    chat,
    text,
  });

  if (!message) {
    next(createError(ErrorStatus.SERVER));
    return;
  }

  await ChatRepository.addMessage({ chat, message: message._id });

  response.send(message);
};

export default { send };
