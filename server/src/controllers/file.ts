import { RequestHandler } from "express";
import {
  ErrorStatus,
  FileDownloadRequestQuery,
  FileDownloadResponseLocals,
  MeResponseLocals,
  MultipleFilesResponseBody,
} from "../@types";
import FileRepository from "../repositories/file";
import fs from "fs";
import { createError } from "../utils/helpers/create-error";

//TODO - dev only
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

const Controller = { getAll, download };
export default Controller;
