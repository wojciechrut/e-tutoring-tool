import { ErrorStatus, MeResponseLocals } from "../@types";
import { createError } from "../utils/helpers/create-error";
import { RequestHandler } from "express";
import multerUpload, { UploadType } from "../utils/helpers/multer-upload";

const multerCodeMessages: Record<string, string> = {
  LIMIT_UNEXPECTED_FILE: "Unexpected file.",
};

export const upload =
  (type: UploadType): RequestHandler<{}, {}, any, {}, MeResponseLocals> =>
  async (request, response, next) => {
    const upload = multerUpload(type);

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
  };

export default upload;
