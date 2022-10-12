import { createError } from './../utils/helpers/create-error';
import { id } from './../utils/helpers/mongo';
import { UserResponseBody } from '../@types/api/user';
import {
  InviteSendQuery,
  InviteSetAcceptedParams,
  InviteSetAcceptedQuery,
  MultipleInvitesResponseBody,
} from '../@types/api/invite';
import { RequestHandler } from 'express';
import InviteRepository from '../repositories/invite';
import { ErrorStatus } from '../@types';

const send: RequestHandler<{}, {}, UserResponseBody, InviteSendQuery> = async (
  request,
  response,
  next
) => {
  try {
    const { userId: receiverId } = request.query;
    const { _id: senderId } = request.body;

    const invite = await InviteRepository.create({
      receiver: receiverId,
      sender: id(senderId),
    });

    if (!invite) {
      throw createError(ErrorStatus.SERVER, 'Could not send invite.');
    }

    response.send('Invite sent successfully');
  } catch (error) {
    next(error);
  }
};

const getAll: RequestHandler<{}, MultipleInvitesResponseBody> = async (
  _request,
  response,
  next
) => {
  try {
    const allInvites = await InviteRepository.findAll({});

    if (!allInvites) {
      throw createError(ErrorStatus.SERVER);
    }

    response.send(allInvites);
  } catch (error) {
    next(error);
  }
};

const setAccepted: RequestHandler<
  InviteSetAcceptedParams,
  {},
  UserResponseBody & { senderId?: string },
  InviteSetAcceptedQuery
> = async (request, response, next) => {
  try {
    response.send(request.body);
  } catch (error) {
    next(error);
  }
};

export default { send, getAll, setAccepted };
