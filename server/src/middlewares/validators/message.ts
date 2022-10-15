import { MessageSendRequestBody } from './../../@types/api/message';
import { RequestHandler } from 'express';
import { createError } from '../../utils/helpers/create-error';
import { ErrorStatus } from '../../@types';

const send: RequestHandler<{}, {}, MessageSendRequestBody> = (
  request,
  _response,
  next
) => {
  try {
    const { text, files } = request.body;

    if (!text && (!files || files.length < 1)) {
      throw createError(
        ErrorStatus.BAD_REQUEST,
        'Cannot send an empty message.'
      );
    }

    next();
  } catch (error) {
    next(error);
  }
};

export default { send };
