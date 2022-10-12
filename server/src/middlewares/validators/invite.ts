import {
  InviteSetAcceptedParams,
  InviteSetAcceptedQuery,
} from './../../@types/api/invite';
import { UserResponseBody } from '../../@types/api/user';
import { InviteSendQuery } from '../../@types/api/invite';
import { RequestHandler } from 'express';
import UserRepository from '../../repositories/user';
import InviteRepository from '../../repositories/invite';
import { createError } from '../../utils/helpers/create-error';
import { ErrorStatus } from '../../@types';
import { id, _id } from '../../utils/helpers/mongo';

const send: RequestHandler<{}, {}, UserResponseBody, InviteSendQuery> = async (
  request,
  _response,
  next
) => {
  try {
    const { userId: receiverId } = request.query;
    const sender = request.body;

    if (!receiverId) {
      throw createError(ErrorStatus.BAD_REQUEST, 'Missing user id parameter.');
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
      throw createError(
        ErrorStatus.BAD_REQUEST,
        'You already invited this user'
      );
    }

    next();
  } catch (error) {
    next(error);
  }
};

const setAccepted: RequestHandler<
  InviteSetAcceptedParams,
  {},
  UserResponseBody & { senderId?: string },
  InviteSetAcceptedQuery
> = async (request, _response, next) => {
  try {
    const { inviteId } = request.params;
    const { accept } = request.query;
    const { _id: userId } = request.body;

    if (!accept) {
      throw createError(
        ErrorStatus.BAD_REQUEST,
        'Missing accept query parameter.'
      );
    }

    const invite = await InviteRepository.findOne({
      _id: inviteId,
      receiver: id(userId),
      // active: 'true,
    });

    if (!invite) {
      throw createError(
        ErrorStatus.BAD_REQUEST,
        'Invite does not exist or you are not receiver of it.'
      );
    }

    request.body.senderId = id(invite.sender._id);

    next();
  } catch (error) {
    next(error);
  }
};

export default { send, setAccepted };
