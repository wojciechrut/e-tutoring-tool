import { ErrorStatus, HttpError } from '../../@types';

export const createError = (status: ErrorStatus, errors: string[]) => {
  return {
    status,
    errors,
  } as HttpError;
};
