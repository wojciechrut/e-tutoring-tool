import { RequestHandler } from "express";
import {
  DetailedMultipleFiles,
  ErrorStatus,
  FileDownloadRequestQuery,
  FileDownloadResponseLocals,
  FileSearchRequestQuery,
  MeResponseLocals,
  MultipleFilesResponseBody,
} from "../@types";
import FileRepository from "../repositories/file";
import fs from "fs";
import { createError } from "../utils/helpers/create-error";
import ChatRepository from "../repositories/chat";
import MeetingRepository from "../repositories/meeting";

const getAll: RequestHandler<{}, MultipleFilesResponseBody> = async (
  _request,
  response,
  _next
) => {
  const files = await FileRepository.findAll({});

  response.send(files);
};

const download: RequestHandler<
  {},
  {},
  {},
  FileDownloadRequestQuery,
  MeResponseLocals & FileDownloadResponseLocals
> = async (_request, response, next) => {
  const { filePath } = response.locals;

  const fileExists = fs.existsSync(filePath);

  if (!fileExists) {
    next(createError(ErrorStatus.NOT_FOUND, "File was deleted."));
    return;
  }

  response.download(filePath);
};

const getMine: RequestHandler<
  {},
  DetailedMultipleFiles,
  {},
  FileSearchRequestQuery,
  MeResponseLocals
> = async (request, response, _next) => {
  const { isFromMeeting, subject } = request.query;
  const { _id: userId } = response.locals;
  let chatIds: Array<any> = [];

  if (!(isFromMeeting === "true")) {
    chatIds = await ChatRepository.getIdsOfPrivateChats(userId.toString());
  } else {
    chatIds = (
      await MeetingRepository.getChatIdsBySubject(userId.toString(), subject)
    ).map(({ chat }) => chat._id);
  }

  const files = await FileRepository.findAllWithUsers(chatIds);
  //@ts-ignore
  response.send(files);
};

const Controller = { getAll, download, getMine };
export default Controller;
