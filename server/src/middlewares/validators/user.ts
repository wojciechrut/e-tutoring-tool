import { createError } from "../../utils/helpers/create-error";
import { ErrorStatus, UserRegisterRequestBody } from "../../@types";
import UserRepository from "../../repositories/user";
import { RequestHandler } from "express";

const register: RequestHandler<{}, {}, UserRegisterRequestBody> = async (
  request,
  _response,
  next
) => {
  const { nickname, email } = request.body;
  const errorMessages: Array<string> = [];

  if (await UserRepository.exists({ nickname }))
    errorMessages.push("This nickname is taken.");

  if (await UserRepository.exists({ email }))
    errorMessages.push("This email is taken");

  if (errorMessages.length > 0) {
    throw createError(ErrorStatus.BAD_REQUEST, errorMessages);
  }

  next();
};

export default { register };
