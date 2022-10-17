import { createError } from "../utils/helpers/create-error";
import { id } from "../utils/helpers/mongo";
import { MeResponseLocals } from "../@types";
import {
  InviteSendQuery,
  InviteSetAcceptedParams,
  InviteSetAcceptedQuery,
  MultipleInvitesResponseBody,
} from "../@types";
import { RequestHandler } from "express";
import InviteRepository from "../repositories/invite";
import { ErrorStatus } from "../@types";
import UserRepository from "../repositories/user";

const send: RequestHandler<
  {},
  {},
  {},
  InviteSendQuery,
  MeResponseLocals
> = async (request, response) => {
  const { userId: receiverId } = request.query;
  const { _id: senderId } = response.locals;

  const invite = await InviteRepository.create({
    receiver: receiverId,
    sender: id(senderId),
  });

  if (!invite) {
    throw createError(ErrorStatus.SERVER, "Could not send invite.");
  }

  response.send("Invite sent successfully");
};

const getAll: RequestHandler<{}, MultipleInvitesResponseBody> = async (
  _request,
  response
) => {
  const allInvites = await InviteRepository.findAll({});

  if (!allInvites) {
    throw createError(ErrorStatus.SERVER);
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

export default { send, getAll, setAccepted };
