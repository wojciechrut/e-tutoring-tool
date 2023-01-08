import { RequestHandler } from "express";
import {
  ErrorStatus,
  MeetingCreateRequestBody,
  MeetingSearchRequestQuery,
  MeetingSearchResponseBody,
  MeResponseLocals,
  SingleMeetingResponseBody,
} from "../@types";
import MeetingRepository from "../repositories/meeting";
import { createError } from "../utils/helpers/create-error";
import ChatRepository from "../repositories/chat";
import WhiteboardRepository from "../repositories/whiteboard";
import { getMeetingDateTag } from "../utils/helpers/date";
import UserRepository from "../repositories/user";
import { sendNewMeetingEmail } from "../utils/mailer";

const getAll: RequestHandler<
  {},
  MeetingSearchResponseBody,
  {},
  {},
  MeResponseLocals
> = async (_request, response, next) => {
  const meetings = await MeetingRepository.findAll({});

  if (!meetings) {
    next(createError(ErrorStatus.SERVER));
    return;
  }

  response.send(meetings);
};

const getMine: RequestHandler<
  {},
  MeetingSearchResponseBody,
  {},
  MeetingSearchRequestQuery,
  MeResponseLocals
> = async (request, response, next) => {
  const { date } = request.query;
  const { _id } = response.locals;
  const userMeetings = await MeetingRepository.findAllUsers(_id);

  if (!userMeetings) {
    next(createError(ErrorStatus.SERVER));
    return;
  }

  const filteredUserMeetings = !!date
    ? userMeetings.filter((meeting) => {
        return (
          (meeting.finished && date === "finished") ||
          (!meeting.finished && getMeetingDateTag(meeting.startsAt) === date)
        );
      })
    : userMeetings;

  response.send(filteredUserMeetings);
};

const create: RequestHandler<
  {},
  SingleMeetingResponseBody,
  MeetingCreateRequestBody,
  {},
  MeResponseLocals
> = async (request, response, next) => {
  const { startsAt, invited, description, subjects } = request.body;
  const { _id: organiser, nickname } = response.locals;

  const chat = await ChatRepository.create({
    users: [organiser.toString(), ...invited],
    isMeetingChat: true,
  });

  const whiteboard = await WhiteboardRepository.create();

  if (!chat || !whiteboard) {
    next(createError(ErrorStatus.SERVER));
    return;
  }

  const meeting = await MeetingRepository.create({
    startsAt: new Date(startsAt),
    invited,
    description,
    subjects,
    organiser,
    chat: chat._id.toString(),
    whiteboard: whiteboard._id.toString(),
  });

  if (!meeting) {
    next(
      createError(ErrorStatus.SERVER, "Error occurred while creating meeting")
    );
    return;
  }

  const invitedUsers = await UserRepository.findManyById(invited);
  if (invitedUsers) {
    sendNewMeetingEmail(
      nickname,
      invitedUsers.map(({ email }) => email)
    );
  }

  response.send(meeting);
};

const get: RequestHandler<
  { id: string },
  SingleMeetingResponseBody,
  {},
  {},
  MeResponseLocals
> = async (request, response, next) => {
  const { id } = request.params;
  const { _id: userId } = response.locals;

  const meeting = await MeetingRepository.findOne(id);

  if (!meeting) {
    next(
      createError(ErrorStatus.BAD_REQUEST, "Meeting with this id doesn't exist")
    );
    return;
  }

  const participantsIds = [meeting.organiser, ...meeting.invited].map(
    ({ _id }) => _id.toString()
  );

  if (!participantsIds.includes(userId.toString())) {
    console.log(participantsIds, userId);
    next(
      createError(
        ErrorStatus.FORBIDDEN,
        "You don't have access to this meeting"
      )
    );
    return;
  }

  response.send(meeting);
};

const finish: RequestHandler<
  { id: string },
  {},
  {},
  {},
  MeResponseLocals
> = async (request, response, next) => {
  const { id } = request.params;
  const { _id: userId } = response.locals;

  const meeting = await MeetingRepository.findOne(id);

  if (!meeting) {
    next(
      createError(ErrorStatus.BAD_REQUEST, "Meeting with this id doesn't exist")
    );
    return;
  }

  if (!(meeting.organiser._id.toString() === userId.toString())) {
    next(
      createError(
        ErrorStatus.BAD_REQUEST,
        "Only organiser can finish a meeting."
      )
    );
    return;
  }

  if (!meeting.finished) {
    await MeetingRepository.finish(id);
  }

  response.send("Meeting finished.");
};

export default { getAll, create, get, getMine, finish };
