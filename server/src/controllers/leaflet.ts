import { RequestHandler } from "express";
import {
  ErrorStatus,
  LeafletCategoriesResponseBody,
  LeafletEditRequestBody,
  LeafletPostRequestBody,
  LeafletSearchQuery,
  LeafletSearchResponseBody,
  MeResponseLocals,
  SingleLeafletResponseBody,
} from "../@types";
import LeafletRepository from "../repositories/leaflet";
import { createError } from "../utils/helpers/create-error";
import { getSymmetricLookingFor } from "../utils/constants/leaflet-categories";

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
      lookingFor: lookingFor && getSymmetricLookingFor(lookingFor),
      levels,
      subjects,
      user,
    },
    page ? parseInt(page, 10) : 1
  );

  if (!searchResult) {
    next(createError(ErrorStatus.SERVER));
    return;
  }

  response.send(searchResult);
};

const getCategories: RequestHandler<{}, LeafletCategoriesResponseBody> = async (
  _request,
  response
) => {
  response.send(LeafletRepository.getCategories());
};

const get: RequestHandler<{ id: string }, SingleLeafletResponseBody> = async (
  request,
  response,
  next
) => {
  const { id } = request.params;
  const leaflet = await LeafletRepository.findOne(id);

  if (!leaflet) {
    next(
      createError(ErrorStatus.NOT_FOUND, "Leaflet with this id does not exist")
    );
    return;
  }

  const monthAgo = new Date();
  monthAgo.setMonth(monthAgo.getMonth());

  const expired = new Date(leaflet.createdAt) < monthAgo;
  const responseBody: SingleLeafletResponseBody = leaflet;
  responseBody.expired = expired;
  response.send(responseBody);
};

const update: RequestHandler<
  {},
  SingleLeafletResponseBody,
  LeafletEditRequestBody,
  {},
  MeResponseLocals
> = async (request, response, next) => {
  const { id, title, description } = request.body;
  const leaflet = await LeafletRepository.updateOne(id, { title, description });
  if (!leaflet) {
    next(createError(ErrorStatus.SERVER));
    return;
  }

  response.send(leaflet);
};

const deleteOne: RequestHandler<
  {},
  {},
  { id: string },
  {},
  MeResponseLocals
> = async (request, response) => {
  const { id } = request.body;
  await LeafletRepository.deleteOne(id);

  response.send();
};

export default { post, search, getCategories, get, update, deleteOne };
