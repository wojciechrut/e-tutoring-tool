import { RequestHandler } from "express";
import {
  FileUploadResponseLocals,
  UploadedIdsResponseLocals,
} from "../@types/api/file";
import FileRepository from "../repositories/file";
import { createError } from "../utils/helpers/create-error";

const saveFiles: RequestHandler<
  any,
  any,
  any,
  any,
  FileUploadResponseLocals & UploadedIdsResponseLocals
> = async (_request, response, next) => {
  const { uploads, _id } = response.locals;
  try {
    if (uploads) {
      const savedFiles = await FileRepository.createMany(
        uploads.map((upload) => ({ ...upload, uploader: _id }))
      );
      response.locals.uploadedIds = savedFiles.map((file) => file._id);
      next();
    }
  } catch (error) {
    next(createError(500, "Error occurred while saving files."));
  }
};

export default saveFiles;
