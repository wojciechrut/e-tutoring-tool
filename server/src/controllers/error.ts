import { ErrorRequestHandler } from 'express';

const WRONG_ENDPOINT_MESSAGE = 'Wrong endpoint';
const UNKNOWN_ERROR = 'Unknown error.';

export const errorLogger: ErrorRequestHandler = (
  error,
  _request,
  _response,
  next
) => {
  console.log(
    `error ${error.message ? error.message : JSON.stringify(error, null, 2)}`
  );
  next(error);
};

export const errorResponder: ErrorRequestHandler = (
  error,
  _request,
  response,
  _next
) => {
  const status = error.status || 400;

  response.status(status).send(error ? error : UNKNOWN_ERROR);
};

export const errorWrongEndpoint: ErrorRequestHandler = (
  _error,
  _request,
  response,
  _next
) => {
  response.status(404).send(WRONG_ENDPOINT_MESSAGE);
};
