import { createError } from "../utils/helpers/create-error";
import { id } from "../utils/helpers/mongo";
import {
  ErrorStatus,
  InviteSendQuery,
  InviteSetAcceptedParams,
  InviteSetAcceptedQuery,
  InviteStatusRequestQuery,
  InviteStatusResponseBody,
  MeResponseLocals,
  MultipleInvitesResponseBody,
} from "../@types";
import { RequestHandler } from "express";
import InviteRepository from "../repositories/invite";
import UserRepository from "../repositories/user";

const send: RequestHandler<
  {},
  {},
  {},
  InviteSendQuery,
  MeResponseLocals & { parsedId?: string }
> = async (request, response, next) => {
  const { userId: receiverId } = request.query;
  const { _id: senderId } = response.locals;

  const invite = await InviteRepository.create({
    receiver: response.locals.parsedId || receiverId,
    sender: id(senderId),
  });

  if (!invite) {
    next(createError(ErrorStatus.SERVER, "Could not send invite."));
    return;
  }

  response.send("Invite sent successfully");
};

const getAll: RequestHandler<{}, MultipleInvitesResponseBody> = async (
  _request,
  response,
  next
) => {
  const allInvites = await InviteRepository.findAll({});

  if (!allInvites) {
    next(createError(ErrorStatus.SERVER));
    return;
  }

  response.send(allInvites);
};

const setAccepted: RequestHandler<
  InviteSetAcceptedParams,
  {},
  { senderId: string },
  InviteSetAcceptedQuery,
  MeResponseLocals
> = async (request, response) => {
  const { accept } = request.query;
  const { inviteId } = request.params;
  const { senderId: sender } = request.body;
  const { _id: receiver } = response.locals;

  await InviteRepository.setInactive({
    _id: inviteId,
  });

  if (accept === "true") {
    await UserRepository.makeFriends(id(receiver), sender);
    response.send("Invite accepted.");
  } else {
    response.send("Invite declined.");
  }
};

const getInviteStatus: RequestHandler<
  {},
  InviteStatusResponseBody,
  {},
  InviteStatusRequestQuery,
  MeResponseLocals
> = async (request, response, next) => {
  const { _id: requesterId, friends: requesterFriends } = response.locals;
  const { user } = request.query;

  if (!user || user === requesterId) {
    next(
      createError(
        ErrorStatus.BAD_REQUEST,
        "You must specify user other than ourself"
      )
    );
  }

  const isFriend = requesterFriends.some((friend) => {
    return friend._id.toString() === user;
  });
  if (isFriend) {
    response.send({ status: "friend", inviteId: undefined });
    return;
  }

  const isSent = await InviteRepository.exists({
    sender: requesterId,
    receiver: user,
    active: true,
  });
  if (isSent) {
    response.send({ status: "invite sent", inviteId: undefined });
    return;
  }

  const receivedInvite = await InviteRepository.findOne({
    sender: user,
    receiver: requesterId.toString(),
    active: true,
  });
  if (receivedInvite) {
    response.send({
      status: "invited by",
      inviteId: receivedInvite._id.toString(),
    });
    return;
  }

  response.send({ status: "can invite", inviteId: undefined });
};

const getMine: RequestHandler<
  {},
  MultipleInvitesResponseBody,
  {},
  {},
  MeResponseLocals
> = async (_request, response, _next) => {
  const invites = await InviteRepository.findUsersActive(
    response.locals._id.toString()
  );

  response.send(invites);
};

const getMineReceived: RequestHandler<
  {},
  MultipleInvitesResponseBody,
  {},
  {},
  MeResponseLocals
> = async (_request, response, _next) => {
  const invites = await InviteRepository.findUsersReceived(
    response.locals._id.toString()
  );

  response.send(invites);
};

export default {
  send,
  getAll,
  setAccepted,
  getInviteStatus,
  getMine,
  getMineReceived,
};
