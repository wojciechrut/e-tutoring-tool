import { ErrorStatus, HttpError } from '../../../../@types';

const DEFAULT_MESSAGE = 'Something went wrong.';

export const createError = (
  status: ErrorStatus,
  messages?: string[] | string
) => {
  return {
    status,
    messages: Array.isArray(messages)
      ? messages
      : [messages || DEFAULT_MESSAGE],
  } as HttpError;
};
