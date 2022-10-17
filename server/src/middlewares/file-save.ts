import { RequestHandler } from "express";
import { FileUploadResponseLocals } from "../@types/api/file";
import FileRepository from "../repositories/file";
import { createError } from "../utils/helpers/create-error";

const saveFiles: RequestHandler<
  any,
  any,
  any,
  any,
  FileUploadResponseLocals
> = async (_request, response, next) => {
  const { uploads, _id } = response.locals;
  try {
    if (uploads) {
      await FileRepository.createMany(
        uploads.map((upload) => ({ ...upload, uploader: _id }))
      );
      next();
    }
  } catch (error) {
    next(createError(500, "Error occurred while saving files."));
  }
};

export default saveFiles;
