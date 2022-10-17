import { ErrorStatus, MessageSendRequestBody } from "../../@types";
import { RequestHandler } from "express";
import { createError } from "../../utils/helpers/create-error";

const send: RequestHandler<{}, {}, MessageSendRequestBody> = (
  request,
  _response,
  next
) => {
  const { text, files } = request.body;

  if (!text && (!files || files.length < 1)) {
    throw createError(ErrorStatus.BAD_REQUEST, "Cannot send an empty message.");
  }

  next();
};

export default { send };
