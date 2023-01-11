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
  MeResponseLocals & { parsedId?: string}
> = async (request, response, next) => {
  let{ userId: receiverId } = request.query;
  const sender = response.locals;

  const userByNickname = await UserRepository.findOne({ nickname: receiverId });
  if(userByNickname) {
    response.locals.parsedId = userByNickname._id.toString();
    receiverId = userByNickname._id.toString();
  }

  if (!receiverId) {
    next(createError(ErrorStatus.BAD_REQUEST, "Missing user id parameter."));
    return;
  }

  const userFound =  (
    await UserRepository.findOne({ _id: receiverId })
  )?.toObject();

  if (!userFound) {
      next(createError(ErrorStatus.BAD_REQUEST, "Couldn't find this user"));
      return;
  }

  if (receiverId.toString() === sender._id.toString()) {
    next(createError(ErrorStatus.BAD_REQUEST, "Can't invite yourself."));
    return;
  }

  const isInviteSentAlready = await InviteRepository.exists({
    sender: sender._id.toString(),
    receiver:  receiverId,
    active: true,
  });

  if (isInviteSentAlready) {
    next(createError(ErrorStatus.BAD_REQUEST, "You already invited this user"));
    return;
  }

  const isInviteReceivedAlready = await InviteRepository.exists({
    sender: receiverId,
    receiver:  sender._id.toString(),
    active: true,
  });

  if (isInviteReceivedAlready) {
    next(createError(ErrorStatus.BAD_REQUEST, "This user already invited you!"));
    return;
  }


  const areFriends = sender.friends.map(({_id}) => (_id.toString())).includes(receiverId.toString());
  if(areFriends) {
    next(createError(ErrorStatus.BAD_REQUEST, "You are already friends."));
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
