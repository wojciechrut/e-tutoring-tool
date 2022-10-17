import {
  MeResponseLocals,
  MultipleUsersResponseBody,
  UserCredentials,
  UserRegisterRequestBody,
} from "../@types";
import { createError } from "../utils/helpers/create-error";
import UserRepository from "./../repositories/user";
import { RequestHandler } from "express";
import JWT from "./../utils/helpers/jtw";

const register: RequestHandler<
  {},
  MeResponseLocals,
  UserRegisterRequestBody
> = async (request, response) => {
  const { file } = request;
  const avatar = file && `static/avatars/${file.filename}`;
  const user = await UserRepository.create({ ...request.body, avatar });
  if (!user) {
    throw createError(500);
  }

  const { _id, ...userData } = user.toObject();
  const token = JWT.generate(_id);

  response.send({ token, _id, ...userData });
};

const getAll: RequestHandler<{}, MultipleUsersResponseBody> = async (
  _request,
  response,
  _next
) => {
  const allUsers = await UserRepository.findAll();
  if (!allUsers) {
    throw createError(500);
  }

  response.send(allUsers);
};

const login: RequestHandler<{}, MeResponseLocals, UserCredentials> = async (
  request,
  response,
  _next
) => {
  const user = await UserRepository.findByCredentials(request.body);
  if (!user) {
    throw createError(401, "Wrong credentials.");
  }

  const { _id, ...userData } = user.toObject();
  const token = JWT.generate(_id);

  response.send({ token, _id, ...userData });
};

const me: RequestHandler<{}, {}, {}, {}, MeResponseLocals> = async (
  _request,
  response
) => {
  if (!response.locals.email) {
    throw createError(500, "Error parsing user data.");
  }

  response.send(response.locals);
};

export default { register, getAll, login, me };
