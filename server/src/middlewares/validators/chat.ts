import { createError } from "../../utils/helpers/create-error";
import { RequestHandler } from "express";
import { ChatFetchQuery, ErrorStatus, UserResponseBody } from "../../@types";
import UserRepository from "../../repositories/user";
import { _id } from "../../utils/helpers/mongo";

const get: RequestHandler<{}, {}, UserResponseBody, ChatFetchQuery> = async (
  request,
  _response,
  next
) => {
  const { userId, meetingId } = request.query;

  if (!(userId || meetingId)) {
    next(
      createError(ErrorStatus.BAD_REQUEST, "Missing id of user or meeting.")
    );
    return;
  }

  if (userId && meetingId) {
    next(
      createError(
        ErrorStatus.BAD_REQUEST,
        "Specify id of either user or meeting, not both."
      )
    );
    return;
  }

  if (meetingId) {
    console.log("chats by meeting id todo");
  }

  if (userId) {
    if (!(await UserRepository.exists({ _id: _id(userId) }))) {
      next(createError(ErrorStatus.BAD_REQUEST, "User does not exist"));
      return;
    }
  }
  next();
};

export default { get };
