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
> = async (request, response, next) => {
  const { file } = request;
  const avatar = file && `static/avatars/${file.filename}`;
  const user = await UserRepository.create({ ...request.body, avatar });
  if (!user) {
    next(createError(500));
    return;
  }
  const { _id, ...userData } = user.toObject();
  const token = JWT.generate(_id);

  response.send({ token, _id, ...userData });
};

const getAll: RequestHandler<{}, MultipleUsersResponseBody> = async (
  _request,
  response,
  next
) => {
  const allUsers = await UserRepository.findAll();
  if (!allUsers) {
    next(createError(500));
    return;
  }

  response.send(allUsers);
};

const login: RequestHandler<{}, MeResponseLocals, UserCredentials> = async (
  request,
  response,
  next
) => {
  const user = await UserRepository.findByCredentials(request.body);
  if (!user) {
    next(createError(401, "Wrong credentials."));
    return;
  }

  const { _id, password, ...userData } = user.toObject();
  const token = JWT.generate(_id);

  response.send({ token, _id, ...userData });
};

const me: RequestHandler<{}, {}, {}, {}, MeResponseLocals> = async (
  _request,
  response,
  next
) => {
  if (!response.locals.email) {
    next(createError(500, "Error parsing user data."));
    return;
  }

  response.send(response.locals);
};

const disfriend: RequestHandler<
  {},
  string,
  { id: string },
  {},
  MeResponseLocals
> = async (request, response, next) => {
  const { id } = request.body;
  const { _id: userId } = response.locals;
  console.log(id, userId);
  await UserRepository.disfriend(userId.toString(), id);

  response.send("Friend removed");
};

export default { register, getAll, login, me, disfriend };
