import { RequestHandler } from "express";
import {
  ErrorStatus,
  FileUploadResponseLocals,
  UploadedIdsResponseLocals,
} from "../@types";
import FileRepository from "../repositories/file";
import { createError } from "../utils/helpers/create-error";

const saveFiles: RequestHandler<
  any,
  any,
  any,
  any,
  FileUploadResponseLocals & UploadedIdsResponseLocals
> = async (request, response, next) => {
  const { uploads, _id } = response.locals;
  try {
    const { chat } = request.query;
    if (uploads) {
      const savedFiles = await FileRepository.createMany(
        uploads.map((upload) => ({ ...upload, uploader: _id, chat }))
      );
      response.locals.uploadedIds = savedFiles.map((file) => file._id);
    }

    next();
  } catch (error) {
    next(createError(ErrorStatus.SERVER, "Error occurred while saving files."));
  }
};

export default saveFiles;
