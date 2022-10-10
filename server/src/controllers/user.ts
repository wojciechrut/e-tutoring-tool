import { createError } from './../utils/helpers/create-error';
import {
  UserRegisterRequestBody,
  UserResponseBody,
  UserCredentials,
} from './../@types/user';
import UserRepository from './../repositories/user';
import { RequestHandler } from 'express';
import JWT from './../utils/helpers/jtw';
import { _id } from '../utils/helpers/mongo';

const register: RequestHandler<
  {},
  UserResponseBody,
  UserRegisterRequestBody
> = async (request, response, next) => {
  try {
    const user = await UserRepository.create(request.body);
    if (!user) {
      throw createError(500);
    }

    const { _id, ...userData } = user.toObject();
    const token = JWT.generate(_id);

    response.send({ token, ...userData });
  } catch (error) {
    next(error);
  }
};

const getAll: RequestHandler = async (_request, response, next) => {
  try {
    const allUsers = await UserRepository.findAll();
    if (!allUsers) throw createError(500);

    response.send(allUsers);
  } catch (error) {
    next(error);
  }
};

const login: RequestHandler<{}, UserResponseBody, UserCredentials> = async (
  request,
  response,
  next
) => {
  try {
    const user = await UserRepository.findByCredentials(request.body);
    if (!user) {
      throw createError(401, 'Wrong credentials.');
    }

    const { _id, ...userData } = user.toObject();
    const token = JWT.generate(_id);

    response.send({ token, ...userData });
  } catch (error) {
    next(error);
  }
};

const me: RequestHandler<{}, {}, UserResponseBody> = async (
  request,
  response,
  next
) => {
  try {
    if (!request.body.email) {
      throw createError(500, 'Error parsing user data.');
    }

    response.send(request.body);
  } catch (error) {
    next(error);
  }
};

export default { register, getAll, login, me };
