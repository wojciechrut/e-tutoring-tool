import { MeResposneLocals } from './../@types/api/user';
import { createError } from './../utils/helpers/create-error';
import { RequestHandler } from 'express';
import multerUpload, { UploadType } from '../utils/helpers/multer-upload';
import { ErrorStatus } from '../@types';

const multerCodeMessages: Record<string, string> = {
  LIMIT_UNEXPECTED_FILE: 'Too many files.',
};

export const upload =
  (
    type: UploadType,
    fieldName = 'files'
  ): RequestHandler<{}, {}, any, {}, MeResposneLocals> =>
  async (request, response, next) => {
    try {
      const upload = multerUpload(type, fieldName);

      upload(request, response, async (error) => {
        try {
          if (error) {
            const { code } = error;

            const codeMessage = multerCodeMessages[code];
            next(
              createError(ErrorStatus.BAD_REQUEST, codeMessage || error.message)
            );
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

export default upload;
