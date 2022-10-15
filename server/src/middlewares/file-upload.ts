import { MeResposneLocals } from './../@types/api/user';
import { createError } from './../utils/helpers/create-error';
import { FileUploadRequestBody } from './../@types/api/file';
import { RequestHandler } from 'express';
import multerUpload, { UploadType } from '../utils/helpers/multer-upload';
import { ErrorStatus } from '../@types';

export const message: RequestHandler<
  {},
  {},
  FileUploadRequestBody,
  {},
  MeResposneLocals
> = async (request, response, next) => {
  try {
    const upload = multerUpload(UploadType.MESSAGE);

    upload(request, response, async (error) => {
      try {
        if (error) {
          next(createError(ErrorStatus.BAD_REQUEST, error.message));
          return;
        }
        next();
      } catch (err) {
        next(err);
      }
    });
  } catch (error) {
    next(error);
  }
};

export default { message };
