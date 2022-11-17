import { MeResponseLocals, ErrorStatus } from "../@types";
import { createError } from "../utils/helpers/create-error";
import { RequestHandler } from "express";
import UserRepository from "../repositories/user";
import JWT from "./../utils/helpers/jtw";
import { _id } from "../utils/helpers/mongo";

const auth: RequestHandler<any, any, any, any, MeResponseLocals> = async (
  request,
  response,
  next
) => {
  const token = JWT.extractFromHeader(request.header("Authorization"));

  if (!token) {
    next(createError(ErrorStatus.UNAUTHORIZED, "Authorization failed"));
    return;
  }

  const decodedId = JWT.decode(token);
  const user = await UserRepository.findOne(
    { _id: _id(decodedId) },
      true
  );

  if (!user) {
    next(createError(ErrorStatus.UNAUTHORIZED, "Invalid token."));
    return;
  } else {
    response.locals = { ...response.locals, ...user.toObject(), token };
    next();
  }
};

export default auth;
