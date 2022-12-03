import { RequestHandler } from "express";
import WhiteboardRepository from "../repositories/whiteboard";
import { createError } from "../utils/helpers/create-error";
import { ErrorStatus } from "../@types";

const addObject: RequestHandler<
  { id: string },
  {},
  { object: Object }
> = async (request, response, next) => {
  const { id } = request.params;
  const { object } = request.body;
  try {
    await WhiteboardRepository.addObject(id, object);
  } catch {
    next(createError(ErrorStatus.SERVER));
    return;
  }

  response.send("Object added");
};

export default { addObject };
