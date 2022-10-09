import { createError } from './../utils/helpers/create-error';
import { UserRegisterRequestBody, UserResponseBody } from './../@types/user';
import UserRepository from './../repositories/user';
import { RequestHandler } from 'express';
import JWT from './../utils/helpers/jtw';
import { id } from '../utils/helpers/mongo';

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
    const token = JWT.generate(id(_id));

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

export default { register, getAll };
