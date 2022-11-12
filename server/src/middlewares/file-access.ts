import { RequestHandler } from "express";
import {
  ErrorStatus,
  FileDownloadRequestQuery,
  FileDownloadResponseLocals,
  MeResponseLocals,
} from "../@types";
import FileRepository from "../repositories/file";
import { createError } from "../utils/helpers/create-error";
import ChatRepository from "../repositories/chat";

const fileAccess: RequestHandler<
  {},
  {},
  {},
  FileDownloadRequestQuery,
  MeResponseLocals & FileDownloadResponseLocals
> = async (request, response, next) => {
  const { file } = request.query;
  const { _id: userId } = response.locals;
  const fileData = await FileRepository.findOne({ _id: file });

  if (!fileData) {
    next(createError(ErrorStatus.BAD_REQUEST, "File doesn't exists."));
    return;
  }

  const { uploader, chat, path } = fileData;
  const isUploader = uploader.toString() === userId.toString();
  const hasChatAccess =
    chat &&
    (await ChatRepository.userHasAccess(userId.toString(), chat.toString()));

  if (!(isUploader || hasChatAccess)) {
    next(
      createError(ErrorStatus.FORBIDDEN, "You don't have access to this file")
    );
    return;
  }

  response.locals = { ...response.locals, filePath: path };
  next();
};

export default fileAccess;
