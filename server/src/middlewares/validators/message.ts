import {
  ChatAccessQuery,
  ErrorStatus,
  MessageSendRequestBody,
} from "../../@types";
import { RequestHandler } from "express";
import { createError } from "../../utils/helpers/create-error";
import { FileUploadResponseLocals } from "../../@types/api/file";

const send: RequestHandler<
  {},
  {},
  MessageSendRequestBody,
  ChatAccessQuery,
  FileUploadResponseLocals
> = (request, response, next) => {
  const { text } = request.body;
  const { uploads } = response.locals;

  if (!text && (!uploads || uploads.length < 1)) {
    next(createError(ErrorStatus.BAD_REQUEST, "Cannot send an empty message."));
    return;
  }

  next();
};
export default { send };
