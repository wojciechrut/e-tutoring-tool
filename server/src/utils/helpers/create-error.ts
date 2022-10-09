import { ErrorStatus, HttpError } from '../../@types';

export const createError = (status: ErrorStatus, messages: string[]) => {
  return {
    status,
    messages,
  } as HttpError;
};
