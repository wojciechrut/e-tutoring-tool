import { RequestHandler } from "express";
import { MultipleFilesResponseBody } from "../@types";
import FileRepository from "../repositories/file";

//TODO - dev only
const getAll: RequestHandler<{}, MultipleFilesResponseBody> = async (
  _request,
  response,
  _next
) => {
  const files = await FileRepository.findAll({});

  response.send(files);
};

const Controller = { getAll };
export default Controller;
