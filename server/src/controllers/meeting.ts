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
          getMeetingDateTag(meeting.startsAt) === date
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
  const { _id: organiser } = response.locals;

  const chat = await ChatRepository.create({
    users: [organiser.toString(), ...invited],
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

  response.send(meeting);
};

const get = () => 3;

export default { getAll, create, get, getMine };
