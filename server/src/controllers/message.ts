import { RequestHandler } from "express";
import {
  FileUploadResponseLocals,
  UploadedIdsResponseLocals,
} from "../@types/api/file";
import { createError } from "../utils/helpers/create-error";
import MessageRepository from "../repositories/message";
import ChatRepository from "../repositories/chat";
import { ChatAccessQuery, MessageSendRequestBody } from "../@types";

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

    const { _id: message } = await MessageRepository.create({
      sender,
      files,
      chat,
      text,
    });

    await ChatRepository.addMessage({ chat, message });

    response.send("Message sent successfully");
  } catch (error) {
    next(createError(500, "Error occurred while sending a message"));
  }
};

export default { send };
