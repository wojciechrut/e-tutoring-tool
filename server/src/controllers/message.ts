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
import { sendNewMessageEmail } from "../utils/mailer";

const send: RequestHandler<
  {},
  any,
  MessageSendRequestBody,
  ChatAccessQuery,
  FileUploadResponseLocals & UploadedIdsResponseLocals
> = async (request, response, next) => {
  const { _id: sender, uploadedIds: files, nickname } = response.locals;
  const { chat } = request.query;
  const { text } = request.body;

  const message = await MessageRepository.create({
    sender,
    files,
    chat,
    text,
  });

  if (!message || !chat) {
    next(createError(ErrorStatus.SERVER));
    return;
  }

  const userToNotify = (
    await ChatRepository.shouldNotifyNewMessage(chat)
  )?.filter(({ _id }) => _id.toString() !== sender.toString())[0];
  await ChatRepository.addMessage({ chat, message: message._id });

  if (userToNotify) {
    sendNewMessageEmail(nickname, userToNotify.email, sender.toString());
  }

  response.send(message);
};

export default { send };
