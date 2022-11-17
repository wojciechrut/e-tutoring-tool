import { RequestHandler } from "express";
import {
  ErrorStatus,
  MeetingCreateRequestBody,
  MeResponseLocals,
} from "../../@types";
import { isMeetingDateCorrect } from "../../utils/helpers/date";
import { createError } from "../../utils/helpers/create-error";

const create: RequestHandler<
  {},
  {},
  MeetingCreateRequestBody,
  {},
  MeResponseLocals
> = (request, response, next) => {
  const { startsAt, invited, description } = request.body;
  const { friends } = response.locals;
  const friendsIds = friends.map(({ _id }) => _id.toString());

  if (!isMeetingDateCorrect(startsAt)) {
    next(createError(ErrorStatus.BAD_REQUEST, "Incorrect meeting date"));
    return;
  }

  if (!invited.every((invitedId) => friendsIds.includes(invitedId))) {
    next(
      createError(
        ErrorStatus.BAD_REQUEST,
        "You can only create meetings with your friends"
      )
    );
    return;
  }

  if (!!description && description.length > 250) {
    next(
      createError(
        ErrorStatus.BAD_REQUEST,
        "Description can have maximum 250 characters."
      )
    );
    return;
  }

  next();
};

export default { create };
