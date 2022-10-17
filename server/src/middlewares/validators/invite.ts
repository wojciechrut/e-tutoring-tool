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
    throw createError(ErrorStatus.BAD_REQUEST, "Missing user id parameter.");
  }

  if (id(sender._id) === receiverId) {
    throw createError(ErrorStatus.BAD_REQUEST, "You are already friends.");
  }

  const receiver = (
    await UserRepository.findOne({ _id: _id(receiverId) })
  )?.toObject();

  if (!receiver) {
    throw createError(
      ErrorStatus.BAD_REQUEST,
      "Couldn't find user with this id."
    );
  }

  if (receiver._id === sender._id) {
    throw createError(ErrorStatus.BAD_REQUEST, "Can't invite yourself.");
  }

  const isInviteSentAlready = await InviteRepository.exists({
    sender: id(sender._id),
    receiver: receiverId,
  });

  if (isInviteSentAlready) {
    throw createError(ErrorStatus.BAD_REQUEST, "You already invited this user");
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
    throw createError(
      ErrorStatus.BAD_REQUEST,
      "Missing accept query parameter."
    );
  }

  const invite = await InviteRepository.findOne({
    _id: inviteId,
    receiver: id(userId),
    active: true,
  });

  if (!invite) {
    throw createError(
      ErrorStatus.BAD_REQUEST,
      "Invite does not exist or you are not receiver of it."
    );
  }

  request.body.senderId = id(invite.sender._id);

  next();
};

export default { send, setAccepted };
