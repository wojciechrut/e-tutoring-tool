import { UserResponseBody } from '../../@types/api/user';
import { InviteSendParameters } from '../../@types/api/invite';
import { RequestHandler } from 'express';
import UserRepository from '../../repositories/user';
import InviteRepository from '../../repositories/invite';
import { createError } from '../../utils/helpers/create-error';
import { ErrorStatus } from '../../@types';
import { id, _id } from '../../utils/helpers/mongo';

const send: RequestHandler<
  {},
  {},
  UserResponseBody,
  InviteSendParameters
> = async (request, _response, next) => {
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

export default { send };
