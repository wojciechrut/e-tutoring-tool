import { RequestHandler } from "express";
import {
  LeafletPostRequestBody,
  LeafletSearchQuery,
  LeafletSearchResponseBody,
} from "../@types/api/leaflet";
import { MeResponseLocals } from "../@types";
import LeafletRepository from "../repositories/leaflet";
import { createError } from "../utils/helpers/create-error";

const post: RequestHandler<
  {},
  string,
  LeafletPostRequestBody,
  {},
  MeResponseLocals
> = async (request, response, next) => {
  const { _id: user } = response.locals;
  const { title, description, levels, lookingFor, subjects } = request.body;

  const leaflet = await LeafletRepository.create({
    title,
    description,
    levels,
    lookingFor,
    subjects,
    user,
  });

  if (!leaflet) {
    next(createError(500, "Error occurred while creating leaflet."));
    return;
  }

  response.send("Leaflet posted successfully.");
};

const search: RequestHandler<
  {},
  LeafletSearchResponseBody,
  {},
  LeafletSearchQuery
> = async (request, response, next) => {
  const { title, lookingFor, levels, subjects, user, page } = request.query;

  const searchResult = await LeafletRepository.findAll(
    {
      title,
      lookingFor,
      levels,
      subjects,
      user,
    },
    page ? parseInt(page, 10) : 1
  );

  if (!searchResult) {
    next(500);
    return;
  }

  response.send(searchResult);
};

export default { post, search };
