import {
  ErrorStatus,
  InviteSendQuery,
  InviteSetAcceptedParams,
  InviteSetAcceptedQuery,
  MeResponseLocals,
} from "../../@types";
import { RequestHandler } from "express";
import UserRepository from "../../repositories/user";
import InviteRepository from "../../repositories/invite";
import { createError } from "../../utils/helpers/create-error";
import { _id, id } from "../../utils/helpers/mongo";

const send: RequestHandler<
  {},
  {},
  {},
  InviteSendQuery,
  MeResponseLocals
> = async (request, response, next) => {
  const { userId: receiverId } = request.query;
  const sender = response.locals;

  if (!receiverId) {
    next(createError(ErrorStatus.BAD_REQUEST, "Missing user id parameter."));
    return;
  }

  if (id(sender._id) === receiverId) {
    next(createError(ErrorStatus.BAD_REQUEST, "You are already friends."));
    return;
  }

  const receiver = (
    await UserRepository.findOne({ _id: _id(receiverId) })
  )?.toObject();

  if (!receiver) {
    next(
      createError(ErrorStatus.BAD_REQUEST, "Couldn't find user with this id.")
    );
    return;
  }

  if (receiver._id === sender._id) {
    next(createError(ErrorStatus.BAD_REQUEST, "Can't invite yourself."));
    return;
  }

  const isInviteSentAlready = await InviteRepository.exists({
    sender: id(sender._id),
    receiver: receiverId,
    active: true,
  });

  if (isInviteSentAlready) {
    next(createError(ErrorStatus.BAD_REQUEST, "You already invited this user"));
    return;
  }

  next();
};

const setAccepted: RequestHandler<
  InviteSetAcceptedParams,
  {},
  { senderId?: string },
  InviteSetAcceptedQuery,
  MeResponseLocals
> = async (request, response, next) => {
  const { inviteId } = request.params;
  const { accept } = request.query;
  const { _id: userId } = response.locals;

  if (!accept) {
    next(
      createError(ErrorStatus.BAD_REQUEST, "Missing accept query parameter.")
    );
    return;
  }

  const invite = await InviteRepository.findOne({
    _id: inviteId,
    receiver: id(userId),
    active: true,
  });

  if (!invite) {
    next(
      createError(
        ErrorStatus.BAD_REQUEST,
        "Invite does not exist or you are not receiver of it."
      )
    );
    return;
  }

  request.body.senderId = id(invite.sender._id);

  next();
};

export default { send, setAccepted };
