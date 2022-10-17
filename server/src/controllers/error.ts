import { ErrorRequestHandler, RequestHandler } from "express";
import fs from "fs";

const WRONG_ENDPOINT_MESSAGE = "Wrong endpoint";
const UNKNOWN_ERROR = "Unknown error.";

export const errorClearFiles: ErrorRequestHandler = async (
  error,
  request,
  _response,
  next
) => {
  const { files } = request;
  if (files && Array.isArray(files)) {
    for (const file of files) {
      fs.unlink(file.path, console.log);
    }
  }

  next(error);
};

export const errorLogger: ErrorRequestHandler = (
  error,
  request,
  _response,
  next
) => {
  console.log(
    `====ERROR===\n MESSAGE: ${
      error.message || JSON.stringify(error.messages)
    } \n OBJECT: ${JSON.stringify(error)}\n REQUEST BODY: ${JSON.stringify(
      request.body
    )}`
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

export const errorWrongEndpoint: RequestHandler = (_request, response) => {
  response.status(404).send(WRONG_ENDPOINT_MESSAGE);
};
