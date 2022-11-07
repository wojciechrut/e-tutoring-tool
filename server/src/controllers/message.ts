import { RequestHandler } from "express";
import {
  ChatAccessQuery,
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
  try {
    const { _id: sender, uploadedIds: files } = response.locals;
    const { chat } = request.query;
    const { text } = request.body;

    const message = await MessageRepository.create({
      sender,
      files,
      chat,
      text,
    });

    await ChatRepository.addMessage({ chat, message: message._id });

    response.send(message);
  } catch (error) {
    next(createError(500, "Error occurred while sending a message"));
  }
};

export default { send };
